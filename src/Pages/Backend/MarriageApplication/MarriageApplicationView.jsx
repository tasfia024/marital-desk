import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';
import { BASE_URL } from '../../../config/baseUrl';

const MarriageApplicationView = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [groomUser, setGroomUser] = useState(null);
    const [brideUser, setBrideUser] = useState(null);
    const [kazi, setKazi] = useState(null);
    const [groomMaritalStatus, setGroomMaritalStatus] = useState(null);
    const [brideMaritalStatus, setBrideMaritalStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        setLoading(true);
        try {
            const res = await apiClient(`api/v1/marital-desk/marriage-applications/${id}`);
            const app = res.application;
            setApplication(app);

            // Backend already includes groom, bride, kazi, and proposedByUser objects
            setGroomUser(app.groom);
            setBrideUser(app.bride);
            setKazi(app.kazi);

            // Fetch marital status for both groom and bride
            const [groomStatusRes, brideStatusRes] = await Promise.all([
                apiClient(`api/v1/marital-desk/users/${app.groomId}/marital-status`),
                apiClient(`api/v1/marital-desk/users/${app.brideId}/marital-status`)
            ]);

            setGroomMaritalStatus(groomStatusRes);
            setBrideMaritalStatus(brideStatusRes);
        } catch (err) {
            setError("Failed to fetch application details");
            console.error(err);
        }
        setLoading(false);
    };

    const handleKaziCheck = async () => {
        if (!window.confirm("Check and approve this marriage application? This will lock it for further edits.")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/kazi-approval`, "PUT", {});
            setSuccessMsg("Application checked successfully! Waiting for Admin final approval.");
            setTimeout(() => {
                fetchApplication();
            }, 1500);
        } catch (err) {
            setError(err.message || "Failed to check application");
        }
    };

    const handleKaziReject = async () => {
        if (!window.confirm("Reject this marriage application?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/kazi-rejection`, "PUT", {});
            setSuccessMsg("Application rejected!");
            setTimeout(() => {
                fetchApplication();
            }, 1500);
        } catch (err) {
            setError(err.message || "Failed to reject application");
        }
    };

    const handleAdminApprove = async () => {
        if (!window.confirm("Give final approval to this marriage application?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/admin-approval`, "PUT", {});
            setSuccessMsg("Application approved by Admin!");
            setTimeout(() => {
                fetchApplication();
            }, 1500);
        } catch (err) {
            setError(err.message || "Failed to approve application");
        }
    };

    const handleEdit = () => {
        navigate(`/marital-desk/marriage-applications/edit/${id}`);
    };

    const calculateAge = (dob) => {
        if (!dob) return null;
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getApprovalStatusBadge = (status) => {
        switch (status) {
            case 'pending': return 'bg-blue-100 text-blue-800';
            case 'checked': return 'bg-purple-100 text-purple-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <main className="flex-1 p-10">
                <p className="text-center">Loading...</p>
            </main>
        );
    }

    if (!application) {
        return (
            <main className="flex-1 p-10">
                <p className="text-center text-red-600">Application not found</p>
            </main>
        );
    }

    const isKazi = user?.role === "kazi";
    const isAdmin = user?.role === "admin";
    const canEditKazi = isKazi && application.approvalStatus !== "checked" && application.approvalStatus !== "rejected";
    const canApproveKazi = isKazi && application.proposalStatus === "accepted" && application.approvalStatus !== "checked" && application.approvalStatus !== "rejected";
    const canApproveAdmin = isAdmin && application.approvalStatus === "checked" && application.approvalStatus !== "approved";

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Marriage Application Details</h2>
                <button
                    className="px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400"
                    onClick={() => navigate("/marital-desk/marriage-applications")}
                >
                    Back
                </button>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}

            <section className="bg-white rounded-lg shadow-lg p-8">
                {/* Status Section */}
                <div className="mb-8 pb-6 border-b">
                    <h3 className="text-xl font-bold mb-4">Application Status & Approval Timeline</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Proposal Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${application.proposalStatus === 'accepted' ? 'bg-green-100 text-green-800' : application.proposalStatus === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {application.proposalStatus}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Approval Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getApprovalStatusBadge(application.approvalStatus)}`}>
                                {application.approvalStatus}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Marital Status</p>
                            <span className="inline-block px-3 py-1 rounded-full font-semibold text-sm bg-blue-100 text-blue-800">
                                {application.maritalStatus}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Application Date</p>
                            <p className="text-sm font-semibold">{new Date(application.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {application.marriageDate && (
                            <div className="p-4 bg-purple-50 rounded border-l-4 border-purple-500">
                                <p className="text-sm text-gray-600 mb-2">
                                    {application.approvalStatus === "rejected" ? "Rejection Date:" : "Kazi Check Date:"}
                                </p>
                                <p className="font-semibold">{new Date(application.marriageDate).toLocaleString()}</p>
                            </div>
                        )}
                        {application.approvalDate && (
                            <div className="p-4 bg-green-50 rounded border-l-4 border-green-500">
                                <p className="text-sm text-gray-600 mb-2">Final Approval Date (Admin):</p>
                                <p className="font-semibold">{new Date(application.approvalDate).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Groom Section */}
                <div className="mb-8 pb-6 border-b">
                    <h3 className="text-xl font-bold mb-4 text-blue-700">Groom Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {groomUser && (
                            <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-500 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                    {groomUser.image ? (
                                        <img src={`${BASE_URL}${groomUser.image}`} crossOrigin="anonymous" alt={groomUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-bold text-xl">
                                            {groomUser.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{groomUser.name}</p>
                                    <p className="text-sm text-gray-600">{groomUser.email}</p>
                                    <p className="text-sm text-gray-600">{groomUser.mobile}</p>
                                </div>
                            </div>
                        )}
                        {groomMaritalStatus && (
                            <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-500">
                                <h4 className="font-bold text-blue-800 mb-3">Marital Status</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                            {groomMaritalStatus.maritalStatus}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Marriages:</span>
                                        <span className="font-semibold text-blue-900">{groomMaritalStatus.marriageCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Divorces:</span>
                                        <span className="font-semibold text-blue-900">{groomMaritalStatus.divorceCount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                            <p className="p-3 bg-gray-50 rounded">{groomUser?.dob ? new Date(groomUser.dob).toLocaleDateString() : "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                            <p className="p-3 bg-gray-50 rounded">{groomUser?.dob ? calculateAge(groomUser.dob) + " years" : "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">NID</label>
                            <p className="p-3 bg-gray-50 rounded">{groomUser?.nid || "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                            <p className="p-3 bg-gray-50 rounded">{groomUser?.gender || "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomFather}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomMother}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomReligion}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomOccupation}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomEducation}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <p className="p-3 bg-gray-50 rounded">{application.groomAddress}</p>
                        </div>
                    </div>
                </div>

                {/* Bride Section */}
                <div className="mb-8 pb-6 border-b">
                    <h3 className="text-xl font-bold mb-4 text-pink-700">Bride Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {brideUser && (
                            <div className="p-4 bg-pink-50 rounded border-l-4 border-pink-500 flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                                    {brideUser.image ? (
                                        <img src={`${BASE_URL}${brideUser.image}`} crossOrigin="anonymous" alt={brideUser.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white font-bold text-xl">
                                            {brideUser.name?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{brideUser.name}</p>
                                    <p className="text-sm text-gray-600">{brideUser.email}</p>
                                    <p className="text-sm text-gray-600">{brideUser.mobile}</p>
                                </div>
                            </div>
                        )}
                        {brideMaritalStatus && (
                            <div className="p-4 bg-pink-50 rounded border-l-4 border-pink-500">
                                <h4 className="font-bold text-pink-800 mb-3">Marital Status</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Status:</span>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                                            {brideMaritalStatus.maritalStatus}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Marriages:</span>
                                        <span className="font-semibold text-pink-900">{brideMaritalStatus.marriageCount}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Divorces:</span>
                                        <span className="font-semibold text-pink-900">{brideMaritalStatus.divorceCount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                            <p className="p-3 bg-gray-50 rounded">{brideUser?.dob ? new Date(brideUser.dob).toLocaleDateString() : "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Age</label>
                            <p className="p-3 bg-gray-50 rounded">{brideUser?.dob ? calculateAge(brideUser.dob) + " years" : "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">NID</label>
                            <p className="p-3 bg-gray-50 rounded">{brideUser?.nid || "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                            <p className="p-3 bg-gray-50 rounded">{brideUser?.gender || "N/A"}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideFather}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideMother}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideReligion}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideOccupation}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideEducation}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <p className="p-3 bg-gray-50 rounded">{application.brideAddress}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-green-700">Kazi (Marriage Registrar) Information</h3>
                    {kazi ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.phone}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">District</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.district}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Upazila</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.upazila}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Registration No</label>
                                <p className="p-3 bg-gray-50 rounded">{kazi.registrationNo}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">Kazi information not available</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap">
                    {canEditKazi && (
                        <button
                            onClick={handleEdit}
                            className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold"
                        >
                            Edit Application
                        </button>
                    )}

                    {canApproveKazi && (
                        <>
                            <button
                                onClick={handleKaziCheck}
                                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                            >
                                Check & Approve
                            </button>
                            <button
                                onClick={handleKaziReject}
                                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                            >
                                Reject
                            </button>
                        </>
                    )}

                    {canApproveAdmin && (
                        <button
                            onClick={handleAdminApprove}
                            className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 font-semibold"
                        >
                            Approve (Admin)
                        </button>
                    )}

                    {!canEditKazi && !canApproveKazi && !canApproveAdmin && application.approvalStatus === "approved" && (
                        <div className="text-center text-green-700 font-semibold">
                            ✓ Application is fully approved.
                        </div>
                    )}

                    {application.approvalStatus === "rejected" && (
                        <div className="text-center text-red-700 font-semibold">
                            ✗ Application has been rejected.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default MarriageApplicationView;
