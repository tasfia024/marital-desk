
import React, { useState, useEffect, use } from "react";
import { useNavigate, useParams } from "react-router";
import { apiClient } from "../../../config/api";
import { AuthContext } from '../../../Provider/AuthContext';

const KaziApplicationForm = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: user?.name || "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        gender: "",
        religion: "",
        email: user?.email || "",
        phone: user?.mobile || "",
        nid: "",
        address: "",
        registrationNo: "",
        officeAddress: "",
        district: "",
        upazila: "",
        photo: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            apiClient(`api/v1/marital-desk/kazi-applications/${id}`)
                .then(res => {
                    const app = res.application;
                    setForm({
                        ...app,
                        dateOfBirth: app.dateOfBirth ? app.dateOfBirth.split('T')[0] : ""
                    });
                    setIsEditable(app.status === "pending");
                })
                .catch(err => setError("Failed to fetch application"))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleChange = (e) => {
        if (!isEditable) return;
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate required fields
        if (!form.name || !form.fatherName || !form.motherName || !form.dateOfBirth || !form.gender || !form.religion || !form.email || !form.phone || !form.nid || !form.address || !form.registrationNo || !form.officeAddress || !form.district || !form.upazila) {
            setError("All mandatory fields are required.");
            return;
        }
        setError("");
        try {
            if (id) {
                await apiClient(`api/v1/marital-desk/kazi-applications/${id}`, "PUT", {
                    ...form,
                    dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth) : null
                });
            } else {
                await apiClient("api/v1/marital-desk/kazi-applications", "POST", {
                    ...form,
                    dateOfBirth: form.dateOfBirth ? new Date(form.dateOfBirth) : null
                });
            }
            navigate("/marital-desk/kazi-applications");
        } catch (err) {
            // Prisma unique constraint error handling
            if (err.message && err.message.includes('Unique constraint failed')) {
                // Extract field name from error message
                const match = err.message.match(/fields: \(`(.+?)`\)/);
                const field = match ? match[1] : null;
                setError(field ? `The ${field} you entered is already in use. Please use a different ${field}.` : "One of the fields is already in use. Please check your input.");
            } else if (err.field && err.message) {
                setError(`${err.field.charAt(0).toUpperCase() + err.field.slice(1)}: ${err.message}`);
            } else {
                setError(err.message);
            }
        }
    };

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Kazi Application Form</h2>
                <a href="javascript:void(0);" className="px-4 py-2 bg-gray-300 rounded font-semibold" onClick={() => navigate("/marital-desk/kazi-applications")}>Back</a>
            </header>
            <section>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full">
                    {error && <div className="mb-2 text-red-600">{error}</div>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-1 font-medium">Full Name <span className="text-red-600">*</span></label>
                            <input type="text" name="name" value={form.name} disabled className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Father's Name <span className="text-red-600">*</span></label>
                            <input type="text" name="fatherName" value={form.fatherName} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Mother's Name <span className="text-red-600">*</span></label>
                            <input type="text" name="motherName" value={form.motherName} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Date of Birth <span className="text-red-600">*</span></label>
                            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Gender <span className="text-red-600">*</span></label>
                            <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable}>
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Religion <span className="text-red-600">*</span></label>
                            <input type="text" name="religion" value={form.religion} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Email <span className="text-red-600">*</span></label>
                            <input type="email" name="email" value={form.email} disabled className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Phone <span className="text-red-600">*</span></label>
                            <input type="text" name="phone" value={form.phone} disabled className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">NID Number <span className="text-red-600">*</span></label>
                            <input type="text" name="nid" value={form.nid} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div className=" md:col-span-2">
                            <label className="block mb-1 font-medium">Present Address <span className="text-red-600">*</span></label>
                            <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div className=" md:col-span-2">
                            <label className="block mb-1 font-medium">Office Address <span className="text-red-600">*</span></label>
                            <input type="text" name="officeAddress" value={form.officeAddress} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">District <span className="text-red-600">*</span></label>
                            <input type="text" name="district" value={form.district} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">Upazila <span className="text-red-600">*</span></label>
                            <input type="text" name="upazila" value={form.upazila} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium">Kazi Registration No. <span className="text-red-600">*</span></label>
                            <input type="text" name="registrationNo" value={form.registrationNo} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" disabled={!isEditable} />
                        </div>
                        <div className=" md:col-span-2">
                            <label className="block mb-1 font-medium">Photo (URL)</label>
                            <input type="text" name="photo" value={form.photo} onChange={handleChange} className="w-full border rounded px-3 py-2 bg-white" placeholder="Paste photo URL or leave blank" disabled={!isEditable} />
                        </div>
                    </div>
                    {isEditable && (
                        <div className="flex justify-end gap-2 mt-6">
                            <button type="submit" className="px-6 py-2 bg-green-700 text-white rounded font-semibold">Submit</button>
                        </div>
                    )}
                </form>
            </section>
        </main>
    );
};

export default KaziApplicationForm;
