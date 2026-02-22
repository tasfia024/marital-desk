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
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">Marriage Certificates</h2>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : applications.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                    <p className="text-gray-600">No marriage certificates found</p>
                </div>
            ) : (
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-sm border-collapse">
                            <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
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
                                        <tr key={proposal.id} className="border-b hover:bg-gray-50 text-gray-800">
                                            <td className="p-3">{idx + 1}</td>
                                            <td className="p-3">{generateCertificateNumber(proposal.groom, proposal.bride)}</td>
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
                                                    className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                                                    onClick={() => handleView(proposal.id)}
                                                >
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

