import React from "react";

const MarriageCertificate = () => {
    //  demo data
    const forms = [
        {
            id: 1,
            certificate_no: "1000002",
            applicant_name: "Karima Begum",
            mobile: "01700000001",
            email: "karima@gmail.com",
            date: "15.11.2025",
        },
        {
            id: 2,
            certificate_no: "1000002",
            applicant_name: "Kodu Mia",
            mobile: "01700000002",
            email: "kodumia@gmail.com",
            date: "03.12.2025",
        },
    ];
    return (
        <main className="flex-1 p-10">
            <header className="border-b border-gray-300 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-green-900">Marriage Certificate List</h2>
            </header>

            <section>
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Certificate No.</th>
                                <th className="p-3">Applicant Name</th>
                                <th className="p-3">Mobile</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {forms.map((form) => (
                                <tr key={form.id} className="border-b hover:bg-gray-100 text-gray-800">
                                    <td className="p-3">{form.id}</td>
                                    <td className="p-3">{form.certificate_no}</td>
                                    <td className="p-3">{form.applicant_name}</td>
                                    <td className="p-3">{form.mobile}</td>
                                    <td className="p-3">{form.email}</td>
                                    <td className="p-3">{form.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default MarriageCertificate;
