import React, { useEffect, useState, use } from "react";
import { Link, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const KaziApplication = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await apiClient("api/v1/marital-desk/kazi-applications");
            setApplications(res.applications || []);
        } catch (err) {
            setError("Failed to fetch applications");
        }
        setLoading(false);
    };

    const handleEdit = (id) => {
        navigate(`/marital-desk/kazi-applications/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/marital-desk/kazi-applications/view/${id}`);
    };

    const handleStatus = async (id) => {
        if (!window.confirm("Are you sure to approve this application?")) return;
        try {
            await apiClient(`api/v1/marital-desk/kazi-applications/${id}/update-status`, "PUT");
            fetchApplications();
        } catch (err) {
            setError("Failed to delete application");
        }
    };

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">Kazi Application</h2>
                <button className="px-4 py-2 bg-green-700 text-white rounded" onClick={() => navigate("/marital-desk/kazi-applications/new")}>Apply</button>
            </header>

            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <section>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Kazi Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Mobile</th>
                                    <th className="p-3">Registration No.</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((req, idx) => (
                                    <tr key={req.id} className="border-b hover:bg-gray-50 text-gray-800">
                                        <td className="p-3">{idx + 1}</td>
                                        <td className="p-3">{req.name}</td>
                                        <td className="p-3">{req.email}</td>
                                        <td className="p-3">{req.phone}</td>
                                        <td className="p-3">{req.registrationNo}</td>
                                        <td className="p-3">{req.status}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                onClick={() => handleView(req.id)}
                                            >
                                                View
                                            </button>
                                            {req.status !== 'approved' && (
                                                <button
                                                    className="px-3 ms-2 py-1 bg-green-700 text-white rounded hover:bg-green-800"
                                                    onClick={() => handleEdit(req.id)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                            {req.status !== 'approved' && user.role === 'super-admin' && (
                                                <button className="px-3 ms-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={() => handleStatus(req.id)}>
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {applications.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="p-3 text-center text-gray-600">No applications found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </main>
    );
};

export default KaziApplication;
