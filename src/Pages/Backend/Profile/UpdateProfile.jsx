import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from "../../../Provider/AuthContext";
import { BASE_URL } from "../../../config/baseUrl";

const UpdateProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        dob: "",
        gender: "",
        email: "",
        mobile: "",
        nid: "",
        address: "",
        image: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        apiClient("api/auth/user-profile")
            .then(res => {
                const u = res.user;
                setForm({
                    name: u.name || "",
                    dob: u.dob ? u.dob.split("T")[0] : "",
                    gender: u.gender || "",
                    email: u.email || "",
                    mobile: u.mobile || "",
                    nid: u.nid || "",
                    address: u.address || "",
                    image: u.image || "",
                });
            })
            .catch(() => setError("Failed to load profile"));
    }, []);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.dob || !form.gender || !form.nid || !form.mobile || !form.name || (!form.image && !imageFile)) {
            setError("All required fields must be filled.");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) =>
                formData.append(key, value)
            );

            if (imageFile) {
                formData.append("image", imageFile);
            }

            // formData.append("dob", form.dob);

            await apiClient(
                `api/v1/marital-desk/users/${user.id}`,
                "PUT",
                formData
            );

            navigate("/marital-desk/profile");
        } catch (err) {
            setError(err.message || "Update failed");
        }
    };

    return (
        <main className="flex-1 p-10">
            <header className="border-b pb-4 mb-6 flex justify-between">
                <h2 className="text-2xl font-bold text-green-900">Update Profile</h2>
                <button
                    onClick={() => navigate("/marital-desk/profile")}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Back
                </button>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
                {error && <p className="text-red-600 mb-4">{error}</p>}

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-medium mb-1 text-green-900">Name <span className="text-red-600">*</span></label>
                        <input
                            value={form.name}
                            onChange={handleChange}
                            name="name"
                            className="border rounded p-2 w-full"
                            placeholder="Name"
                        />

                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">Date of Birth <span className="text-red-600">*</span></label>
                        <input
                            type="date"
                            name="dob"
                            value={form.dob}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">Gender <span className="text-red-600">*</span></label>
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">Email <span className="text-red-600">*</span></label>
                        <input
                            value={form.email}
                            readOnly
                            className="border rounded p-2 w-full bg-gray-100"
                            placeholder="Email"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">Mobile <span className="text-red-600">*</span></label>
                        <input
                            value={form.mobile}
                            onChange={handleChange}
                            className="border rounded p-2 w-full bg-gray-100"
                            placeholder="Mobile"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">NID <span className="text-red-600">*</span></label>
                        <input
                            name="nid"
                            value={form.nid}
                            onChange={handleChange}
                            className="border rounded p-2 w-full"
                            placeholder="NID"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1 text-green-900">Address</label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            className="border rounded p-2 w-full md:col-span-2"
                            placeholder="Address"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <label className="block font-medium mb-1 text-green-900">Photo <span className="text-red-600">*</span></label>
                        {form.image && !imageFile && (
                            <img src={`${BASE_URL}${form.image}`} alt="Current" crossOrigin="anonymous" className="h-24 mb-2 rounded border" />
                        )}
                        <input className="border rounded p-2 w-full"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </div>
                </div>

                <button type="submit" className="mt-6 bg-green-700 text-white px-6 py-2 rounded">
                    Update
                </button>
            </form>
        </main>
    );
};

export default UpdateProfile;
