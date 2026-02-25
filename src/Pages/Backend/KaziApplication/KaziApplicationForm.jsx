
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
        dateOfBirth: user?.dob ? user.dob.split('T')[0] : "",
        gender: user?.gender || "",
        religion: "",
        email: user?.email || "",
        phone: user?.mobile || "",
        nid: user?.nid || "",
        address: user?.address || "",
        registrationNo: "",
        officeAddress: "",
        district: "",
        upazila: "",
        photo: user?.image || "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isEditable, setIsEditable] = useState(true);
    console.log(loading);

    useEffect(() => {
        if (id) {
            setLoading(true);
            apiClient(`api/v1/marital-desk/kazi-applications/${id}`)
                .then(res => {
                    const app = res.application;
                    setForm({
                        ...app,
                        dateOfBirth: app.dateOfBirth ? app.dateOfBirth.split('T')[0] : "",
                        photo: app.photo || "",
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
    <main className="flex-1 p-4 sm:p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <header className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kazi Application Form</h2>
            <button 
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-green-300 rounded font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto"
                onClick={() => navigate("/marital-desk/kazi-applications")}
            >
                Back
            </button>
        </header>
        
        <section>
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg dark:shadow-gray-900 w-full border border-gray-200 dark:border-gray-700">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded">
                        {error}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Full Name <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            value={form.name} 
                            disabled 
                            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Father's Name <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="fatherName" 
                            value={form.fatherName} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Mother's Name <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="motherName" 
                            value={form.motherName} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Date of Birth <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="date" 
                            name="dateOfBirth" 
                            value={form.dateOfBirth} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700" 
                            disabled 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Gender <span className="text-red-600">*</span>
                        </label>
                        <select 
                            name="gender" 
                            value={form.gender} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700" 
                            disabled
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Religion <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="religion" 
                            value={form.religion} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Email <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            value={form.email} 
                            disabled 
                            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Phone <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="phone" 
                            value={form.phone} 
                            disabled 
                            className="w-full border rounded px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 cursor-not-allowed" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            NID Number <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="nid" 
                            value={form.nid} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700" 
                            disabled 
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Present Address <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="address" 
                            value={form.address} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Office Address <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="officeAddress" 
                            value={form.officeAddress} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            District <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="district" 
                            value={form.district} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Upazila <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="upazila" 
                            value={form.upazila} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none" 
                        />
                    </div>
                    
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Kazi Registration No. <span className="text-red-600">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="registrationNo" 
                            value={form.registrationNo} 
                            onChange={handleChange} 
                            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700" 
                            disabled={!isEditable} 
                        />
                    </div>
                </div>
                
                {isEditable && (
                    <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6">
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-green-700 dark:bg-green-600 text-white rounded font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors w-full sm:w-auto"
                        >
                            Submit Application
                        </button>
                    </div>
                )}
            </form>
        </section>
    </main>
);
};

export default KaziApplicationForm;
