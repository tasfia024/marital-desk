import React from "react";
import { Link } from "react-router";
import {LayoutDashboard,HeartHandshake,HeartCrack, ScrollText,User,} from "lucide-react";

const AdminDashboard = () => {
    //  demo data
    const forms = [
        {
            id: 1,
            groomName: "Rahim ",
            brideName: "Karima Begum",
            kaziName: "Abdul Kazi",
            status: "Pending",
        },
        {
            id: 2,
            groomName: "Kodu mia",
            brideName: "Fatema Akter",
            kaziName: "Jalal Uddin",
            status: "Verified",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* sidebar */}
            <aside className="w-64 bg-gradient-to-r from-[#013223] to-[#006747] text-white min-h-[70vh] p-6 space-y-6">
                <h2 className="text-2xl font-bold tracking-wide">MaritalDesk</h2>
                <nav className="flex flex-col space-y-3">
                    <Link to="/kaziDashboard" className="hover:text-yellow-300 flex items-center gap-2">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="#" className="hover:text-yellow-300 flex items-center gap-2">
                        <HeartHandshake size={18} /> Marriage Requests
                    </Link>
                    <Link to="#" className="hover:text-yellow-300 flex items-center gap-2">
                        <HeartCrack size={18} /> Divorce Requests
                    </Link>
                    <Link to="#" className="hover:text-yellow-300 flex items-center gap-2">
                        <ScrollText size={18} /> Certificates
                    </Link>
                    <Link to="#" className="hover:text-yellow-300 flex items-center gap-2">
                        <User size={18} /> Profile
                    </Link>
                </nav>
            </aside>

            {/* dashboard */}
            <main className="flex-1 p-10">
                <header className="border-b border-gray-300 pb-4 mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-900">Admin Dashboard</h1>
                </header>

                <section>
                    <h2 className="text-xl font-medium text-gray-700 mb-4">Marriage Form Submissions</h2>

                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full text-left border-collapse">
                            <thead className=" bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Groom</th>
                                    <th className="p-3">Bride</th>
                                    <th className="p-3">Kazi</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms.map((form) => (
                                    <tr key={form.id} className="border-b hover:bg-gray-100">
                                        <td className="p-3">{form.id}</td>
                                        <td className="p-3">{form.groomName}</td>
                                        <td className="p-3">{form.brideName}</td>
                                        <td className="p-3">{form.kaziName}</td>
                                        <td className="p-3 font-semibold">
                                            <span
                                                className={`px-2 py-1 rounded text-xs ${form.status === "Verified"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {form.status}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center space-x-2">
                                            {form.status === "Pending" ? (
                                                <>
                                                    <button className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-800">
                                                        Verify
                                                    </button>
                                                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                                        Reject
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                                    Generate Certificate
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
