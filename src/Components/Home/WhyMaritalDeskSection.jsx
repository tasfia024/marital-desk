import React from 'react';
import { FaCheck, FaDatabase, FaFileSignature, FaShieldAlt, FaBolt, FaQrcode } from 'react-icons/fa';
import { MdOutlineVerified } from 'react-icons/md';

const WhyMaritalDeskSection = () => {
    const features = [
        {
            icon: <FaDatabase className="w-6 h-6" />,
            title: "Centralized and secure marital record management",
            color: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
            iconColor: "text-blue-600 dark:text-blue-400"
        },
        {
            icon: <FaFileSignature className="w-6 h-6" />,
            title: "Reduced paperwork and manual errors",
            color: "from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
            iconColor: "text-green-600 dark:text-green-400"
        },
        {
            icon: <MdOutlineVerified className="w-6 h-6" />,
            title: "Transparent verification and approval workflow",
            color: "from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30",
            iconColor: "text-purple-600 dark:text-purple-400"
        },
        {
            icon: <FaBolt className="w-6 h-6" />,
            title: "Faster processing and real-time status tracking",
            color: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30",
            iconColor: "text-amber-600 dark:text-amber-400"
        },
        {
            icon: <FaQrcode className="w-6 h-6" />,
            title: "Digitally stored certificates with QR verification",
            color: "from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30",
            iconColor: "text-pink-600 dark:text-pink-400"
        },
        {
            icon: <FaShieldAlt className="w-6 h-6" />,
            title: "Comprehensive audit trail for all transactions",
            color: "from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30",
            iconColor: "text-indigo-600 dark:text-indigo-400"
        }
    ];

    return (
        <div className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center">
                            <FaCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">
                            Why Choose MaritalDesk?
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        Experience the future of marital services with our comprehensive digital platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className={feature.iconColor}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <div className="flex items-center">
                                        <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            Certified & Verified
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2">100%</div>
                            <div className="text-gray-600 dark:text-gray-300">Digital Process</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2">24/7</div>
                            <div className="text-gray-600 dark:text-gray-300">Service Availability</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-800 dark:text-green-300 mb-2">0</div>
                            <div className="text-gray-600 dark:text-gray-300">Paper Documents</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyMaritalDeskSection;