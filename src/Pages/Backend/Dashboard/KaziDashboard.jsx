// import React, { useState } from "react";
import { Link } from "react-router";
import {LayoutDashboard,HeartHandshake,HeartCrack, ScrollText,User,} from "lucide-react";


const KaziDashboard = () => {
    const pending = [
        { id: 1, name: "Rohim", date: "12.12.12" },
        { id: 2, name: "Korim", date: "15.12.12" },
    ];
    const verified = [
        { id: 3, name: "Shanto", date: "20.12.12" },
        { id: 4, name: "Rina", date: "25.12.12" },
    ];
    const rejected = [
        { id: 5, name: "Sadia", date: "30.12.12", reason: "Incomplete documents" },
    ];

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <aside className="w-64 bg-gradient-to-r from-[#013223] to-[#006747] text-white min-h-screen p-6 space-y-6">
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

            <main className="flex-1 p-10">
                <header className="border-b border-gray-300 pb-4 mb-6 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-green-900">Kazi Dashboard</h1>
                </header>

                {/* pending*/}
                <section className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-semibold text-yellow-600 mb-4 flex items-center gap-2">
                        Pending Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-yellow-100 text-gray-800">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Applicant</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map((req) => (
                                    <tr key={req.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{req.id}</td>
                                        <td className="p-3">{req.name}</td>
                                        <td className="p-3">{req.date}</td>
                                        <td className="p-3 text-center">
                                            <Link
                                                to="#"
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* verified req */}
                <section className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-semibold text-green-900 hover:text-green-800 mb-4">
                        Verified Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-green-100 text-green-800">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Applicant</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3 text-center">Certificate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {verified.map((req) => (
                                    <tr key={req.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{req.id}</td>
                                        <td className="p-3">{req.name}</td>
                                        <td className="p-3">{req.date}</td>
                                        <td className="p-3 text-center">
                                            <Link
                                                to="#"
                                                className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800"
                                            >
                                                View Certificate
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* reject */}
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">
                        Rejected Requests
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-red-100 text-red-800">
                                <tr>
                                    <th className="p-3">#</th>
                                    <th className="p-3">Applicant</th>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rejected.map((req) => (
                                    <tr key={req.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{req.id}</td>
                                        <td className="p-3">{req.name}</td>
                                        <td className="p-3">{req.date}</td>
                                        <td className="p-3 text-red-600 ">"{req.reason}"</td>
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

export default KaziDashboard;
