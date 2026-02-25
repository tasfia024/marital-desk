import React, { useEffect, useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const MarriageApplication = () => {
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
            const res = await apiClient("api/v1/marital-desk/marriage-approval-applications");
            setProposals(res.applications || []);
        } catch (err) {
            setError("Failed to fetch proposals");
            console.error(err);
        }
        setLoading(false);
    };

    const handleEdit = (id) => {
        navigate(`/marital-desk/marriage-applications/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/marital-desk/marriage-applications/view/${id}`);
    };

    const handlePayment = (id) => {
        navigate(`/marital-desk/marriage-applications/payment/${id}`);
    };

    // New: Kazi check/approval
    const handleKaziCheck = async (id) => {
        if (!window.confirm("Check and approve this marriage application? This will lock it for further edits.")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/kazi-approval`, "PUT", {});
            setSuccessMsg("Application checked successfully! Waiting for Admin final approval.");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchProposals();
        } catch (err) {
            setError(err.message || "Failed to check application");
        }
    };

    // New: Kazi rejection
    const handleKaziReject = async (id) => {
        if (!window.confirm("Reject this marriage application?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/kazi-rejection`, "PUT", {});
            setSuccessMsg("Application rejected by Kazi!");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchProposals();
        } catch (err) {
            setError(err.message || "Failed to reject application");
        }
    };

    // New: Admin final approval
    const handleAdminApprove = async (id) => {
        if (!window.confirm("Give final approval to this marriage application?")) return;
        try {
            await apiClient(`api/v1/marital-desk/marriage-approval-applications/${id}/admin-approval`, "PUT", {});
            setSuccessMsg("Application approved by Admin!");
            setTimeout(() => setSuccessMsg(""), 3000);
            fetchProposals();
        } catch (err) {
            setError(err.message || "Failed to approve application");
        }
    };

    const getProposalStatusBadge = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'accepted': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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

    const isKazi = user?.role === "kazi";
    const isAdmin = user?.role === "super-admin";
    const isGroomBride = user?.role === "user";

    return (
        <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-300">Marriage Applications</h2>
    </header>

    {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
            {error}
        </div>
    )}
    
    {successMsg && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded">
            {successMsg}
        </div>
    )}

    {loading ? (
        <div className="flex justify-center items-center py-10">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent dark:border-green-300 dark:border-r-transparent"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading applications...</p>
            </div>
        </div>
    ) : proposals.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow dark:shadow-gray-700/50 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">No marriage applications found</p>
        </div>
    ) : (
        <section>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gradient-to-r from-[#013223] to-[#006747] dark:from-[#013223] dark:to-[#006747] text-white">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Application Date</th>
                            <th className="p-3 text-left">Groom</th>
                            <th className="p-3 text-left">Bride</th>
                            <th className="p-3 text-left">Kazi</th>
                            <th className="p-3 text-left">Proposal Status</th>
                            <th className="p-3 text-left">Approval Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.map((proposal, idx) => {
                            const canEditByKazi = isKazi && proposal.approvalStatus !== "checked" && proposal.approvalStatus !== "rejected";
                            const showKaziActions = isKazi && proposal.proposalStatus === "accepted" && proposal.approvalStatus !== "checked" && proposal.approvalStatus !== "approved" && proposal.approvalStatus !== "rejected";
                            const showAdminActions = isAdmin && proposal.approvalStatus === "checked" && proposal.approvalStatus !== "approved";

                            return (
                                <tr key={proposal.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200">
                                    <td className="p-3">{idx + 1}</td>
                                    <td className="p-3 font-medium">
                                        {new Date(proposal.updatedAt).toLocaleDateString()} {new Date(proposal.updatedAt).toLocaleTimeString()}
                                    </td>
                                    <td className="p-3 font-medium">{proposal.groom?.name || proposal.groomName || 'N/A'}</td>
                                    <td className="p-3 font-medium">{proposal.bride?.name || proposal.brideName || 'N/A'}</td>
                                    <td className="p-3">{proposal.kazi?.name || proposal.kaziName || 'N/A'}</td>
                                    <td className="p-3">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getProposalStatusBadge(proposal.proposalStatus)}`}>
                                            {proposal.proposalStatus}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getApprovalStatusBadge(proposal.approvalStatus)}`}>
                                            {proposal.approvalStatus}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center space-x-1 flex justify-center flex-wrap gap-1">
                                        <button
                                            className="px-2 py-1 bg-blue-500 dark:bg-blue-600 text-white text-xs rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                            onClick={() => handleView(proposal.id)}
                                        >
                                            View
                                        </button>
                                        {!proposal.isPaid && isGroomBride && (
                                            <button
                                                className="px-2 py-1 bg-blue-500 dark:bg-blue-600 text-white text-xs rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                                                onClick={() => handlePayment(proposal.id)}
                                            >
                                                Pay
                                            </button>
                                        )}

                                        {/* Kazi Actions */}
                                        {showKaziActions && (
                                            <>
                                                <button
                                                    className="px-2 py-1 bg-yellow-500 dark:bg-yellow-600 text-white text-xs rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
                                                    onClick={() => handleEdit(proposal.id)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-2 py-1 bg-green-600 dark:bg-green-700 text-white text-xs rounded hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
                                                    onClick={() => handleKaziCheck(proposal.id)}
                                                >
                                                    Check & Approve
                                                </button>
                                                <button
                                                    className="px-2 py-1 bg-red-600 dark:bg-red-700 text-white text-xs rounded hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
                                                    onClick={() => handleKaziReject(proposal.id)}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {/* Admin Final Approval */}
                                        {showAdminActions && proposal.isPaid && (
                                            <button
                                                className="px-2 py-1 bg-green-700 dark:bg-green-800 text-white text-xs rounded hover:bg-green-800 dark:hover:bg-green-900 transition-colors"
                                                onClick={() => handleAdminApprove(proposal.id)}
                                            >
                                                Approve (Admin)
                                            </button>
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

export default MarriageApplication;

