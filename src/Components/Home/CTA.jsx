import React from 'react';
import { FaArrowRight, FaUserPlus, FaFileContract, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router';

const CallToActionSection = () => {
    const actions = [
        {
            icon: <FaUserPlus className="w-6 h-6" />,
            title: "Create Account",
            description: "Sign up and start your marital journey",
            link: "/auth/register",
            color: "from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
            iconBg: "bg-blue-100 dark:bg-blue-900/30"
        },
        {
            icon: <FaFileContract className="w-6 h-6" />,
            title: "Apply for Marriage",
            description: "Submit your marriage application online",
            link: "/dashboard/marriage-application-form",
            color: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
            iconBg: "bg-green-100 dark:bg-green-900/30"
        },
        {
            icon: <FaUserTie className="w-6 h-6" />,
            title: "Become a Kazi",
            description: "Register as a certified Kazi on our platform",
            link: "/become-kazi",
            color: "from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600",
            iconBg: "bg-purple-100 dark:bg-purple-900/30"
        }
    ];

    return (
        <div className="py-20 bg-gradient-to-br from-[#013223] to-[#006747] dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white dark:text-green-300 mb-4">
                        Get Started with MaritalDesk Today
                    </h2>
                    <p className="text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto">
                        Join thousands of users who have simplified their marital procedures with our digital platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {actions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.link}
                            className="group block"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
                                <div className={`w-16 h-16 rounded-full ${action.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-gray-800 dark:text-white">
                                        {action.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                                    {action.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {action.description}
                                </p>
                                <div className="flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                                    <span>Get Started</span>
                                    <FaArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="text-center">
                    <div className="inline-flex flex-wrap gap-6 justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-green-100 dark:text-green-200">No registration fees</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-green-100 dark:text-green-200">24/7 support available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-green-100 dark:text-green-200">100% secure platform</span>
                        </div>
                    </div>

                    {/* Main CTA Button */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/auth/register"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-800 dark:bg-gray-800 dark:text-green-300 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Start Your Journey Now
                            <FaArrowRight className="ml-3 w-5 h-5" />
                        </Link>
                        <Link
                            to=""
                            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white dark:border-green-300 text-white dark:text-green-300 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                            Watch Platform Demo
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CallToActionSection;