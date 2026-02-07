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
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-900">
                    {id ? "Edit Marriage Application" : "Create Marriage Application"}
                </h2>
                <button
                    onClick={() => navigate("/marital-desk/marriage-applications")}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </header>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            {successMsg && <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">{successMsg}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
                {/* Groom Information */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Groom Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <input
                                type="text"
                                name="groomFather"
                                value={formData.groomFather}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <input
                                type="text"
                                name="groomMother"
                                value={formData.groomMother}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <input
                                type="text"
                                name="groomReligion"
                                value={formData.groomReligion}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <input
                                type="text"
                                name="groomOccupation"
                                value={formData.groomOccupation}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <input
                                type="text"
                                name="groomEducation"
                                value={formData.groomEducation}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <textarea
                                name="groomAddress"
                                value={formData.groomAddress}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Bride Information */}
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-700 mb-4 border-b pb-2">Bride Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Father's Name</label>
                            <input
                                type="text"
                                name="brideFather"
                                value={formData.brideFather}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mother's Name</label>
                            <input
                                type="text"
                                name="brideMother"
                                value={formData.brideMother}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Religion</label>
                            <input
                                type="text"
                                name="brideReligion"
                                value={formData.brideReligion}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Occupation</label>
                            <input
                                type="text"
                                name="brideOccupation"
                                value={formData.brideOccupation}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                            <input
                                type="text"
                                name="brideEducation"
                                value={formData.brideEducation}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                            <textarea
                                name="brideAddress"
                                value={formData.brideAddress}
                                onChange={handleChange}
                                required
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-semibold"
                    >
                        Save Application
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/marital-desk/marriage-applications")}
                        className="px-8 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
};

export default MarriageApplicationForm;
