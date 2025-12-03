import React from "react";
import { Link } from "react-router";

const KaziList = () => {
    //  demo data
    const pending = [
        { id: 1, name: "Rohim", regi_no: "12000-3333-333" },
        { id: 2, name: "Korim", regi_no: "12000-3333-333" },
    ];

    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-green-900">List of Kazi</h2>
            </header>

            <section>
                <div className="overflow-x-auto bg-white rounded-lg shado">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Kazi Name</th>
                                <th className="p-3">REGISTRATION NO.</th>
                                <th className="p-3 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pending.map((req) => (
                                <tr key={req.id} className="border-b hover:bg-gray-50 text-gray-800">
                                    <td className="p-3">{req.id}</td>
                                    <td className="p-3">{req.name}</td>
                                    <td className="p-3">{req.regi_no}</td>
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
        </main>
    );
};

export default KaziList;
