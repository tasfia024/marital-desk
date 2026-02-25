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

    console.log("user info-->", userData)

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

    if (loading) return (
        <div className="flex-1 p-10 flex justify-center items-center">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent dark:border-green-400 dark:border-r-transparent"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading profile...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="flex-1 p-10">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
        </div>
    );
    
    if (!userData) return (
        <div className="flex-1 p-10">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-600 dark:text-yellow-400 text-center">No profile data found.</p>
            </div>
        </div>
    );

    return (
        <main className="flex-1 p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900 dark:text-green-300">Profile Details</h2>
                <button 
                    className="px-4 py-2 bg-blue-300 dark:bg-blue-600 rounded text-green-900 dark:text-white font-semibold hover:bg-blue-400 dark:hover:bg-blue-700 transition-colors" 
                    onClick={() => navigate("/marital-desk/profile/edit")}
                >
                    Edit Profile
                </button>
            </header>
            
            <section className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-700/50 w-full border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-700 dark:border-green-300 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
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
                            <span className="text-gray-400 dark:text-gray-500">No Photo</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">{userData.name}</h3>
                        <div className="text-gray-700 dark:text-gray-300 mb-1">
                            <span className="font-semibold">Role:</span> 
                            <span className="text-gray-900 dark:text-gray-200 ml-1">{userData.role}</span>
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mb-1">
                            <span className="font-semibold">Status:</span> 
                            <span className={`ml-2 px-2 py-1 rounded text-sm ${
                                userData.status === 'pending' 
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' 
                                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            }`}>
                                {userData.status}
                            </span>
                        </div>
                    </div>
                </div>
                
                <table className="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            <td width="20%" className="p-3 font-medium text-green-900 dark:text-green-300">Date of Birth</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.dob ? new Date(userData.dob).toLocaleDateString() : "Not provided"}
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">Gender</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.gender || "Not provided"}
                            </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">Email</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.email}
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">Mobile</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.mobile || "Not provided"}
                            </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">NID Number</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.nid || "Not provided"}
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">Address</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                : {userData.address || "Not provided"}
                            </td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-700/50">
                            <td className="p-3 font-medium text-green-900 dark:text-green-300">Signature</td>
                            <td className="p-3 text-gray-900 dark:text-gray-300">
                                {userData.signature ? (
                                    <div className="flex items-center">
                                        <span className="mr-2">:</span>
                                        <img 
                                            src={`${BASE_URL}${userData.signature}`} 
                                            alt="Current" 
                                            crossOrigin="anonymous" 
                                            className="h-18 w-50 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 p-1" 
                                        />
                                    </div>
                                ) : (
                                    ": Not provided"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
};

export default Profile;