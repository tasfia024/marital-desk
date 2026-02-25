import React from 'react';
import { Link } from 'react-router';

const UserDashboard = () => {
    const quickActions = [
        { icon: '💍', title: 'Apply for Marriage', desc: 'Start a new marriage application' },
        { icon: '📄', title: 'Apply for Divorce', desc: 'File for divorce proceedings' },
        { icon: '🔍', title: 'Check Application Status', desc: 'Track your applications' },
        { icon: '📜', title: 'Download Certificate', desc: 'Get your digital certificate' },
    ];

    const workflowSteps = ['Submit Application', 'Kazi Verification', 'Government Approval', 'Certificate Issued'];

    return (
        <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
            {/* Welcome Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to MaritalDesk</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your marriage and divorce applications easily and securely.</p>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                        <div className="text-2xl mb-2">{action.icon}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{action.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
                    </div>
                ))}
            </div>

            {/* How it Works */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">How it Works</h2>
                <div className="flex flex-wrap gap-4">
                    {workflowSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                            <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 flex items-center justify-center font-semibold">
                                {idx + 1}
                            </span>
                            <span className="ml-2 text-gray-700 dark:text-gray-300">{step}</span>
                            {idx < workflowSteps.length - 1 && <span className="mx-2 text-gray-400 dark:text-gray-600">→</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                    ⚠️ Please ensure all information is accurate before submission. False information may lead to rejection.
                </p>
            </div>

            {/* Help Section */}
            <div className="flex gap-4">
                <Link to="/support" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Support</Link>
                <Link to="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">Read FAQ</Link>
            </div>
        </div>
    );
};

export default UserDashboard;