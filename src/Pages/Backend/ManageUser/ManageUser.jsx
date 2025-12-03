import React from "react";

const ManageUser = () => {
    //  demo data
    const forms = [
        {
            id: 1,
            name: "Karima Begum",
            mobile: "01700000001",
            email: "karima@gmail.com",
            date: "15.11.2025",
            status: "Active",
        },
        {
            id: 2,
            name: "Kodu Mia",
            mobile: "01700000002",
            email: "kodumia@gmail.com",
            date: "03.12.2025",
            status: "Inactive",
        },
    ];
    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-green-900">User List</h2>
            </header>

            <section>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Mobile</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((form) => (
                                <tr key={form.id} className="border-b hover:bg-gray-100 text-gray-800">
                                    <td className="p-3">{form.id}</td>
                                    <td className="p-3">{form.name}</td>
                                    <td className="p-3">{form.mobile}</td>
                                    <td className="p-3">{form.email}</td>
                                    <td className="p-3">{form.date}</td>
                                    <td className="p-3 font-semibold">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${form.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {form.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-center space-x-2">
                                        <button className="px-3 py-1 bg-green-900 text-white rounded hover:bg-green-800">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                                            Decline
                                        </button>
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

export default ManageUser;
