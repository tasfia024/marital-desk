import React, { useEffect, useState, use } from "react";
import { useNavigate, useParams } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';
import { BASE_URL } from '../../../config/baseUrl';

const MarriageProposalView = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [proposal, setProposal] = useState(null);
    const [groomUser, setGroomUser] = useState(null);
    const [brideUser, setBrideUser] = useState(null);
    const [kazi, setKazi] = useState(null);
    const [proposedByUser, setProposedByUser] = useState(null);
    const [groomMaritalStatus, setGroomMaritalStatus] = useState(null);
    const [brideMaritalStatus, setBrideMaritalStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProposal();
    }, [id]);

    const fetchProposal = async () => {
        try {
            setLoading(true);
            const res = await apiClient(`api/v1/marital-desk/marriage-applications/${id}`);
            const proposal = res.application;
            setProposal(proposal);

            // Backend already includes groom, bride, kazi, and proposedByUser objects
            setGroomUser(proposal.groom);
            setBrideUser(proposal.bride);
            setKazi(proposal.kazi);
            setProposedByUser(proposal.proposedByUser);

            // Fetch marital status for both groom and bride
            const [groomStatusRes, brideStatusRes] = await Promise.all([
                apiClient(`api/v1/marital-desk/users/${proposal.groomId}/marital-status`),
                apiClient(`api/v1/marital-desk/users/${proposal.brideId}/marital-status`)
            ]);

            setGroomMaritalStatus(groomStatusRes);
            setBrideMaritalStatus(brideStatusRes);
        } catch (err) {
            setError("Failed to fetch proposal details");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'accepted': return 'bg-green-100 text-green-800';
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

    if (!proposal) {
        return (
            <main className="flex-1 p-10">
                <p className="text-center text-red-600">Proposal not found</p>
            </main>
        );
    }

    const isProposedBy = proposal.proposedBy === user?.id;

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Marriage Proposal Details</h2>
                <button
                    className="px-4 py-2 bg-gray-300 rounded font-semibold hover:bg-gray-400"
                    onClick={() => navigate("/marital-desk/marriage-proposals")}
                >
                    Back
                </button>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <section className="bg-white rounded-lg shadow-lg p-8">
                {/* Status Section */}
                <div className="mb-8 pb-6 border-b">
                    <h3 className="text-xl font-bold mb-4">Proposal Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Proposal Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${getStatusBadgeColor(proposal.proposalStatus)}`}>
                                {proposal.proposalStatus}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Application Status</p>
                            <span className="inline-block px-3 py-1 rounded-full font-semibold text-sm bg-blue-100 text-blue-800">
                                {proposal.maritalStatus}
                            </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Proposed By</p>
                            <p className="text-sm font-semibold">{isProposedBy ? "You" : proposedByUser?.name || "N/A"}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded border">
                            <p className="text-sm text-gray-600 mb-2">Proposed Date</p>
                            <p className="text-sm font-semibold">{proposal.proposalDate ? new Date(proposal.proposalDate).toLocaleDateString() : "N/A"}</p>
                        </div>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomFather}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomMother}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomReligion}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomOccupation}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomEducation}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.groomAddress}</p>
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
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideFather}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideMother}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideReligion}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideOccupation}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideEducation}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <p className="p-3 bg-gray-50 rounded">{proposal.brideAddress}</p>
                        </div>
                    </div>
                </div>

                {/* Kazi Section */}
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
                <div className="mt-8 pt-6 border-t flex justify-end gap-2">
                    <button
                        className="px-6 py-2 bg-gray-400 text-white rounded font-semibold hover:bg-gray-500"
                        onClick={() => navigate("/marital-desk/marriage-proposals")}
                    >
                        Close
                    </button>
                </div>
            </section>
        </main>
    );
};

export default MarriageProposalView;
