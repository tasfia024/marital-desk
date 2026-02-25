import React, { useEffect, useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const generateCertificateNumber = (groom, bride) => {
    if (!groom || !bride || !groom.nid || !bride.nid || !bride.name) {
        return 'N/A';
    }

    const groomNidLast6 = groom.nid.toString().slice(-6);
    const groomFirstLetter = groom.name.charAt(0).toUpperCase();
    const brideFirstLetter = bride.name.charAt(0).toUpperCase();
    const brideNidLast6 = bride.nid.toString().slice(-6);
    return `${groomFirstLetter}${brideFirstLetter}-${groomNidLast6}-${brideNidLast6}`;
};

const MarriageCertificate = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [applications, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await apiClient("api/v1/marital-desk/marriage-certificates");
            setProposals(res.applications || []);
        } catch (err) {
            setError("Failed to fetch proposals");
            console.error(err);
        }
        setLoading(false);
    };

    const handleView = (id) => {
        navigate(`/marital-desk/marriage-certificates/view/${id}`);
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

    return (
        <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
    <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-300">Marriage Certificates</h2>
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
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading certificates...</p>
            </div>
        </div>
    ) : applications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow dark:shadow-gray-700/50 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">No marriage certificates found</p>
        </div>
    ) : (
        <section>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm border-collapse">
                    <thead className="bg-gradient-to-r from-[#013223] to-[#006747] dark:from-[#013223] dark:to-[#006747] text-white">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Certificate No.</th>
                            <th className="p-3 text-left">Groom</th>
                            <th className="p-3 text-left">Bride</th>
                            <th className="p-3 text-left">Kazi</th>
                            <th className="p-3 text-left">Proposal Status</th>
                            <th className="p-3 text-left">Approval Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((proposal, idx) => {
                            return (
                                <tr key={proposal.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200">
                                    <td className="p-3">{idx + 1}</td>
                                    <td className="p-3 font-mono text-sm">
                                        {generateCertificateNumber(proposal.groom, proposal.bride)}
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
                                    <td className="p-3 text-center">
                                        <button
                                            className="px-3 py-1.5 bg-blue-500 dark:bg-blue-600 text-white text-xs rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors inline-flex items-center gap-1"
                                            onClick={() => handleView(proposal.id)}
                                        >
                                            <svg 
                                                className="w-3.5 h-3.5" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                                                />
                                            </svg>
                                            View Certificate
                                        </button>
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

export default MarriageCertificate;

