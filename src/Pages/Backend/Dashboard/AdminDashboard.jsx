import React from 'react';

const AdminDashboard = () => {

    const responsibilities = [
        'Final verification of all marital records',
        'Issuing official marriage certificates',
        'Maintaining central registry data',
        'Ensuring legal compliance of all entries',
    ];

    return (
        <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Administrative Control Panel</h1>
                <p className="text-gray-600 dark:text-gray-300">Monitor, verify, and approve all marital records across the system.</p>
            </div>

            {/* Authority Responsibilities */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Authority Responsibilities</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Certificate System Info */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-300 text-sm">
                    🧾 Approved applications will automatically generate a digital certificate with a unique verification ID.
                </p>
            </div>

            {/* Security Notice */}
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                    🔐 All actions are logged and monitored for accountability and transparency.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;