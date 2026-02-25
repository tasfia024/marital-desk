import React, { useEffect, useState, use } from "react";
import { useParams, useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const MarriageApplicationForm = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(id ? true : false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [formData, setFormData] = useState({
        groomFather: "",
        groomMother: "",
        groomReligion: "",
        groomOccupation: "",
        groomEducation: "",
        groomAddress: "",
        brideFather: "",
        brideMother: "",
        brideReligion: "",
        brideOccupation: "",
        brideEducation: "",
        brideAddress: "",
    });

    const [application, setApplication] = useState(null);

    useEffect(() => {
        if (id) {
            fetchApplication();
        }
    }, [id]);

    const fetchApplication = async () => {
        setLoading(true);
        try {
            const res = await apiClient(`api/v1/marital-desk/marriage-applications/${id}`);
            setApplication(res.application);

            // Check if application can be edited
            if (res.application.approvalStatus === "checked" || res.application.approvalStatus === "rejected") {
                setError("This application is locked and cannot be edited.");
                setLoading(false);
                return;
            }

            setFormData({
                groomFather: res.application.groomFather || "",
                groomMother: res.application.groomMother || "",
                groomReligion: res.application.groomReligion || "",
                groomOccupation: res.application.groomOccupation || "",
                groomEducation: res.application.groomEducation || "",
                groomAddress: res.application.groomAddress || "",
                brideFather: res.application.brideFather || "",
                brideMother: res.application.brideMother || "",
                brideReligion: res.application.brideReligion || "",
                brideOccupation: res.application.brideOccupation || "",
                brideEducation: res.application.brideEducation || "",
                brideAddress: res.application.brideAddress || "",
            });
        } catch (err) {
            setError("Failed to fetch application details");
            console.error(err);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            setError("No application ID provided");
            return;
        }

        try {
            setError("");
            await apiClient(`api/v1/marital-desk/marriage-applications/${id}`, "PUT", formData);
            setSuccessMsg("Application updated successfully!");
            setTimeout(() => {
                navigate(`/marital-desk/marriage-applications`);
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to update application");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <main className="flex-1 p-10">
                <div className="text-center">Loading...</div>
            </main>
        );
    }

    if (error && application?.approvalStatus === "checked") {
        return (
            <main className="flex-1 p-10">
                <div className="bg-red-100 border border-red-400 text-red-700 rounded p-4">
                    <p>{error}</p>
                    <button
                        onClick={() => navigate("/marital-desk/marriage-applications")}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Back to Applications
                    </button>
                </div>
            </main>
        );
    }

    return (
    <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {id ? "Edit Marriage Application" : "Create Marriage Application"}
            </h2>
            <button
                onClick={() => navigate("/marital-desk/marriage-applications")}
                className="px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-700 font-semibold transition-colors w-full sm:w-auto"
            >
                Cancel
            </button>
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

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900 p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSubmit}>
                {/* Groom Information */}
                <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-6 text-blue-700 dark:text-blue-400">Groom Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Father's Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="groomFather"
                                value={formData.groomFather}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Mother's Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="groomMother"
                                value={formData.groomMother}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Religion <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="groomReligion"
                                value={formData.groomReligion}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Occupation <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="groomOccupation"
                                value={formData.groomOccupation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Education <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="groomEducation"
                                value={formData.groomEducation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Address <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                name="groomAddress"
                                value={formData.groomAddress}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Bride Information */}
                <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-6 text-pink-700 dark:text-pink-400">Bride Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Father's Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="brideFather"
                                value={formData.brideFather}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Mother's Name <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="brideMother"
                                value={formData.brideMother}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Religion <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="brideReligion"
                                value={formData.brideReligion}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Occupation <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="brideOccupation"
                                value={formData.brideOccupation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Education <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="brideEducation"
                                value={formData.brideEducation}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Address <span className="text-red-600">*</span>
                            </label>
                            <textarea
                                name="brideAddress"
                                value={formData.brideAddress}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                    <button
                        type="submit"
                        className="px-8 py-2 bg-green-600 dark:bg-green-700 text-white rounded hover:bg-green-700 dark:hover:bg-green-800 font-semibold transition-colors w-full sm:w-auto"
                    >
                        Save Application
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/marital-desk/marriage-applications")}
                        className="px-8 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded hover:bg-gray-600 dark:hover:bg-gray-700 font-semibold transition-colors w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    </main>
);
};

export default MarriageApplicationForm;
