import React from 'react';
import { Link } from 'react-router';

const KaziDashboard = () => {

    const responsibilities = [
        'Verifying bride and groom information',
        'Ensuring legal compliance',
        'Approving or rejecting applications',
        'Submitting verified records to authority',
    ];

    return (
        <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, Kazi</h1>
                <p className="text-gray-600 dark:text-gray-300">Review and verify marriage and divorce requests assigned to you.</p>
            </div>

            {/* Responsibilities */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Your Responsibilities</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Workflow Reminder */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-300 text-sm">
                    🔄 Application → Kazi Verification → Admin Approval → Certificate Issued
                </p>
            </div>

            {/* Compliance Notice */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-300 text-sm">
                    ⚠️ Any false verification or negligence may lead to cancellation of Kazi authorization.
                </p>
            </div>
        </div>
    );
};

export default KaziDashboard;