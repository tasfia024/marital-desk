import React from 'react';
import { FaUserLock, FaFileVerify, FaDatabase, FaQrcode, FaBalanceScale } from 'react-icons/fa';
import { MdSecurity, MdVerifiedUser } from 'react-icons/md';

const TrustComplianceSection = () => {
    const complianceFeatures = [
        {
            icon: <FaUserLock className="w-8 h-8" />,
            title: "Role-Based Access Control",
            description: "Strict separation of access for Users, Kazis, and Administrators",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <FaFileVerify className="w-8 h-8" />,
            title: "Document Verification",
            description: "All documents verified by authorized Kazis before processing",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: <FaDatabase className="w-8 h-8" />,
            title: "Secure Digital Storage",
            description: "End-to-end encrypted storage with regular automated backups",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: <FaQrcode className="w-8 h-8" />,
            title: "QR Code Verification",
            description: "Instant certificate authenticity verification via unique QR codes",
            color: "from-amber-500 to-orange-500"
        },
        {
            icon: <FaBalanceScale className="w-8 h-8" />,
            title: "Legal Compliance",
            description: "Fully aligned with marital procedures in Bangladesh",
            color: "from-red-500 to-pink-500"
        },
        {
            icon: <MdVerifiedUser className="w-8 h-8" />,
            title: "Audit Trail",
            description: "Complete transaction history for accountability and transparency",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    return (
        <div className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center">
                            <MdSecurity className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">
                            Secure, Verified & Compliant
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
                        We prioritize security, compliance, and trust in every aspect of our platform. 
                        Your marital records are handled with the highest level of security and legal compliance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {complianceFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 group-hover:scale-105 transition-transform duration-300`}>
                                    <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
                                        <div className="text-gray-800 dark:text-white">
                                            {feature.icon}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-green-800 dark:text-green-300">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Compliance Badge */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-green-100 dark:border-green-900/30">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="lg:w-2/3">
                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                                Government-Approved Process
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                MaritalDesk follows all legal requirements and procedures as mandated by 
                                the Government of Bangladesh. Our digital workflow maintains the integrity 
                                of traditional marital procedures while enhancing efficiency and accessibility.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    🔒 Data Protection
                                </span>
                                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    ⚖️ Legal Compliance
                                </span>
                                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                                    📋 Audit Ready
                                </span>
                            </div>
                        </div>
                        <div className="lg:w-1/3 flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 rounded-full bg-gradient-to-r from-green-400 to-teal-400 animate-pulse opacity-20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-5xl mb-2">✅</div>
                                        <div className="text-green-800 dark:text-green-300 font-bold">Verified</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-300">Compliant Platform</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustComplianceSection;