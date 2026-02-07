import React, { useEffect, useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';
import { BASE_URL } from '../../../config/baseUrl';

const MarriageProposal = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        setLoading(true);
        try {
            const res = await apiClient("api/v1/marital-desk/marriage-applications");
            setProposals(res.applications || []);
        } catch (err) {
            setError("Failed to fetch proposals");
        }
        setLoading(false);
    };

    const handleEdit = (id) => {
        navigate(`/marital-desk/marriage-proposals/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/marital-desk/marriage-proposals/view/${id}`);
    };

    const handleAccept = async (id) => {
        if (!window.confirm("Accept this marriage proposal?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-applications/${id}/update-status`, "PUT", {
                proposalStatus: "accepted"
            });
            setSuccessMsg("Proposal accepted successfully!");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchProposals();
        } catch (err) {
            setError("Failed to accept proposal");
        }
    };

    const handleReject = async (id) => {
        if (!window.confirm("Reject this marriage proposal?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-applications/${id}/update-status`, "PUT", {
                proposalStatus: "rejected"
            });
            setSuccessMsg("Proposal rejected!");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchProposals();
        } catch (err) {
            setError("Failed to reject proposal");
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

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">Marriage Proposals</h2>
                <button className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800" onClick={() => navigate("/marital-desk/marriage-proposals/new")}>New Proposal</button>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : proposals.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <p className="text-gray-600">No marriage proposals found</p>
                </div>
            ) : (
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Groom</th>
                                    <th className="p-3 text-left">Bride</th>
                                    <th className="p-3 text-left">Kazi</th>
                                    <th className="p-3 text-left">Proposed By</th>
                                    <th className="p-3 text-left">Proposal Status</th>
                                    <th className="p-3 text-left">Marital Status</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {proposals.map((proposal, idx) => {
                                    // Check if current user is the one who proposed
                                    const isProposedBy = proposal.proposedBy === user?.id;
                                    // Check if current user is groom or bride
                                    const isGroom = proposal.groomId === user?.id;
                                    const isBride = proposal.brideId === user?.id;
                                    const canEdit = isProposedBy && proposal.proposalStatus === 'pending';

                                    return (
                                        <tr key={proposal.id} className="border-b hover:bg-gray-50 text-gray-800">
                                            <td className="p-3">{idx + 1}</td>
                                            <td className="p-3 font-medium">{proposal.groomFather}</td>
                                            <td className="p-3 font-medium">{proposal.brideFather}</td>
                                            <td className="p-3">{proposal.kaziId ? proposal.kaziId.substring(0, 8) + '...' : 'N/A'}</td>
                                            <td className="p-3 text-xs">{proposal.proposedBy.substring(0, 8)}...</td>
                                            <td className="p-3">
                                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(proposal.proposalStatus)}`}>
                                                    {proposal.proposalStatus}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                    {proposal.maritalStatus}
                                                </span>
                                            </td>
                                            <td className="p-3 text-center space-x-1 flex justify-center">
                                                <button
                                                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                                    onClick={() => handleView(proposal.id)}
                                                >
                                                    View
                                                </button>
                                                {canEdit && (
                                                    <button
                                                        className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                                                        onClick={() => handleEdit(proposal.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                {isBride && proposal.proposalStatus === 'pending' && (
                                                    <>
                                                        <button
                                                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                                            onClick={() => handleAccept(proposal.id)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                            onClick={() => handleReject(proposal.id)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                {isGroom && proposal.proposalStatus === 'pending' && (
                                                    <>
                                                        <button
                                                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                                            onClick={() => handleAccept(proposal.id)}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                            onClick={() => handleReject(proposal.id)}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    );
};

export default MarriageProposal;

