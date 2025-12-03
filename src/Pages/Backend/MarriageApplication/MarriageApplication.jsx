import React from "react";

const MarriageApplication = () => {
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
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-green-900">Marriage Application List</h2>
            </header>

            <section>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
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
                                <tr key={form.id} className="border-b hover:bg-gray-100 text-gray-800">
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
    );
};

export default MarriageApplication;
