import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const MarriageApplicationView = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
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
            setApplication(res.application);
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

    if (loading) {
        return (
            <main className="flex-1 p-10">
                <div className="text-center">Loading...</div>
            </main>
        );
    }

    if (!application) {
        return (
            <main className="flex-1 p-10">
                <div className="bg-red-100 border border-red-400 text-red-700 rounded p-4" role="alert">
                    <p>{error || "Application not found"}</p>
                    <button
                        onClick={() => navigate("/marital-desk/marriage-applications")}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Back to Applications
                    </button>
                </div>
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
                <h2 className="text-2xl font-bold text-green-900">Marriage Application Details</h2>
                <button
                    onClick={() => navigate("/marital-desk/marriage-applications")}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back
                </button>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}

            <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Status Cards */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Application Status</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-gray-600">Proposal Status:</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${application.proposalStatus === 'accepted' ? 'bg-green-100 text-green-800' :
                                application.proposalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {application.proposalStatus}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Approval Status:</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${application.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                application.approvalStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                                    application.approvalStatus === 'checked' ? 'bg-purple-100 text-purple-800' :
                                        'bg-blue-100 text-blue-800'
                                }`}>
                                {application.approvalStatus}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Marital Status:</p>
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {application.maritalStatus}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Approval Timeline */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Approval Timeline</h3>
                    <div className="space-y-3">
                        {application.marriageDate && (
                            <div>
                                <p className="text-sm text-gray-600">
                                    {application.approvalStatus === "rejected" ? "Rejection Date:" : "Kazi Check Date:"}
                                </p>
                                <p className="font-semibold">{new Date(application.marriageDate).toLocaleString()}</p>
                            </div>
                        )}
                        {application.approvalDate && (
                            <div>
                                <p className="text-sm text-gray-600">Final Approval Date (by Marital Desk Admin):</p>
                                <p className="font-semibold">{new Date(application.approvalDate).toLocaleString()}</p>
                            </div>
                        )}
                        {!application.marriageDate && (
                            <div>
                                <p className="text-sm text-gray-500 italic">Awaiting Kazi check...</p>
                            </div>
                        )}
                        {application.marriageDate && application.approvalStatus === "checked" && !application.approvalDate && (
                            <div>
                                <p className="text-sm text-gray-500 italic">Awaiting Admin final approval...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Groom Information */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Groom Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Name:</p>
                        <p className="font-semibold">{application.groom?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Email:</p>
                        <p className="font-semibold">{application.groom?.email || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Father's Name:</p>
                        <p className="font-semibold">{application.groomFather}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Mother's Name:</p>
                        <p className="font-semibold">{application.groomMother}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Occupation:</p>
                        <p className="font-semibold">{application.groomOccupation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Education:</p>
                        <p className="font-semibold">{application.groomEducation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Religion:</p>
                        <p className="font-semibold">{application.groomReligion}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Mobile:</p>
                        <p className="font-semibold">{application.groom?.mobile || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-600">Address:</p>
                        <p className="font-semibold">{application.groomAddress}</p>
                    </div>
                </div>
            </div>

            {/* Bride Information */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Bride Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Name:</p>
                        <p className="font-semibold">{application.bride?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Email:</p>
                        <p className="font-semibold">{application.bride?.email || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Father's Name:</p>
                        <p className="font-semibold">{application.brideFather}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Mother's Name:</p>
                        <p className="font-semibold">{application.brideMother}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Occupation:</p>
                        <p className="font-semibold">{application.brideOccupation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Education:</p>
                        <p className="font-semibold">{application.brideEducation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Religion:</p>
                        <p className="font-semibold">{application.brideReligion}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Mobile:</p>
                        <p className="font-semibold">{application.bride?.mobile || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-600">Address:</p>
                        <p className="font-semibold">{application.brideAddress}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white p-6 rounded-lg shadow flex gap-4 justify-center">
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
        </main>
    );
};

export default MarriageApplicationView;
