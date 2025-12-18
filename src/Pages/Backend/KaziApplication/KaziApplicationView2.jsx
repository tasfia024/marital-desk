import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";

const KaziApplicationView2 = () => {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-2"><span className="font-medium text-green-900">Father's Name:</span> <span className="text-gray-900">{kazi.fatherName}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Mother's Name:</span> <span className="text-gray-900">{kazi.motherName}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Date of Birth:</span> <span className="text-gray-900">{kazi.dateOfBirth ? new Date(kazi.dateOfBirth).toLocaleDateString() : "-"}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Gender:</span> <span className="text-gray-900">{kazi.gender}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Religion:</span> <span className="text-gray-900">{kazi.religion}</span></div>
                    </div>
                    <div>
                        <div className="mb-2"><span className="font-medium text-green-900">Email:</span> <span className="text-gray-900">{kazi.email}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Mobile:</span> <span className="text-gray-900">{kazi.phone}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">NID Number:</span> <span className="text-gray-900">{kazi.nid}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">District:</span> <span className="text-gray-900">{kazi.district}</span></div>
                        <div className="mb-2"><span className="font-medium text-green-900">Upazila:</span> <span className="text-gray-900">{kazi.upazila}</span></div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="mb-2"><span className="font-medium text-green-900">Present Address:</span> <span className="text-gray-900">{kazi.address}</span></div>
                    <div className="mb-2"><span className="font-medium text-green-900">Office Address:</span> <span className="text-gray-900">{kazi.officeAddress}</span></div>
                </div>
            </section>
        </main>
    );
};

export default KaziApplicationView2;
