import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";

const KaziApplicationView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kazi, setKazi] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        apiClient(`api/v1/marital-desk/kazi-applications/${id}`)
            .then(res => setKazi(res.application))
            .catch(() => setError("Failed to fetch Kazi information"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-10">Loading...</div>;
    if (error) return <div className="p-10 text-red-600">{error}</div>;
    if (!kazi) return <div className="p-10">No data found.</div>;

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">Kazi Application Details</h2>
                <button className="px-4 py-2 bg-gray-300 rounded text-green-900 font-semibold" onClick={() => navigate("/marital-desk/kazi-applications")}>Back</button>
            </header>
            <section className="bg-white p-8 rounded-lg shadow-lg w-full">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700 bg-gray-100 flex items-center justify-center">
                        {kazi.photo ? (
                            <img src={kazi.photo} alt="Kazi" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400">No Photo</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-green-800 mb-2">{kazi.name}</h3>
                        <div className="text-gray-700 mb-1"><span className="font-semibold">Registration No:</span> <span className="text-gray-900">{kazi.registrationNo}</span></div>
                        <div className="text-gray-700 mb-1"><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${kazi.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{kazi.status}</span></div>
                    </div>
                </div>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900 w-1/3">Father's Name</td>
                            <td className="p-3 text-gray-900">{kazi.fatherName}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Mother's Name</td>
                            <td className="p-3 text-gray-900">{kazi.motherName}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Date of Birth</td>
                            <td className="p-3 text-gray-900">{kazi.dateOfBirth ? new Date(kazi.dateOfBirth).toLocaleDateString() : "-"}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Gender</td>
                            <td className="p-3 text-gray-900">{kazi.gender}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Religion</td>
                            <td className="p-3 text-gray-900">{kazi.religion}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Email</td>
                            <td className="p-3 text-gray-900">{kazi.email}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Mobile</td>
                            <td className="p-3 text-gray-900">{kazi.phone}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">NID Number</td>
                            <td className="p-3 text-gray-900">{kazi.nid}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">District</td>
                            <td className="p-3 text-gray-900">{kazi.district}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Upazila</td>
                            <td className="p-3 text-gray-900">{kazi.upazila}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Present Address</td>
                            <td className="p-3 text-gray-900">{kazi.address}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Office Address</td>
                            <td className="p-3 text-gray-900">{kazi.officeAddress}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default KaziApplicationView;
