import React, { useEffect, useState, use } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';
import { BASE_URL } from '../../../config/baseUrl';

const Profile = () => {
    const { updateUser } = use(AuthContext);
    const navigate = useNavigate();
    const [userData, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        apiClient(`api/auth/user-profile`)
            .then(res => {
                setProfile(res.user);
                updateUser(res.user);
            })
            .catch(() => setError("Failed to fetch User Data Information"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (error) return <div className="p-10 text-red-600">{error}</div>;
    if (!userData) return <div className="p-10">No data found.</div>;

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">Profile Details</h2>
                <button className="px-4 py-2 bg-blue-300 rounded text-green-900 font-semibold" onClick={() => navigate("/marital-desk/profile/edit")}>Edit</button>
            </header>
            <section className="bg-white p-8 rounded-lg shadow-lg w-full">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700 bg-gray-100 flex items-center justify-center">
                        {userData.image ? (
                            <img
                                src={`${BASE_URL}${userData.image}`}
                                alt="User"
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous"
                                onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                }}
                            />
                        ) : (
                            <span className="text-gray-400">No Photo</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-green-800 mb-2">{userData.name}</h3>
                        <div className="text-gray-700 mb-1"><span className="font-semibold">Role:</span> <span className="text-gray-900">{userData.role}</span></div>
                        <div className="text-gray-700 mb-1"><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded ${userData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{userData.status}</span></div>
                    </div>
                </div>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                        <tr className="bg-gray-50">
                            <td width="20%" className="p-3 font-medium text-green-900">Date of Birth</td>
                            <td className="p-3 text-gray-900">: {userData.dob ? new Date(userData.dob).toLocaleDateString() : ""}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Gender</td>
                            <td className="p-3 text-gray-900">: {userData.gender}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">Email</td>
                            <td className="p-3 text-gray-900">: {userData.email}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Mobile</td>
                            <td className="p-3 text-gray-900">: {userData.mobile}</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium text-green-900">NID Number</td>
                            <td className="p-3 text-gray-900">: {userData.nid}</td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-3 font-medium text-green-900">Address</td>
                            <td className="p-3 text-gray-900">: {userData.address}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default Profile;
