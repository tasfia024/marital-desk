import React from 'react';
import { FaUser, FaUserShield, FaUserTie } from 'react-icons/fa';
import { GiArchiveRegister } from 'react-icons/gi';

const WhoCanUseSection = () => {
    return (
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center">
                            <FaUser className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300">
                            Who Is This Platform For?
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                        MaritalDesk serves three key stakeholders in the marital services ecosystem
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Citizen Card */}
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <FaUser className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                            Citizens <span className="text-sm font-normal text-gray-500 dark:text-gray-400">(Bride & Groom)</span>
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Apply for marriage or divorce online</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Upload required documents securely</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Track application progress in real-time</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Download digital certificates instantly</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kazi Card */}
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <GiArchiveRegister className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                            Registered Kazis
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Verify marriage/divorce applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Validate documents digitally</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Submit official confirmations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Access digital record management tools</span>
                            </li>
                        </ul>
                    </div>

                    {/* Admin Card */}
                    <div className="group bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <FaUserShield className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
                            System Administrators
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Review verified applications</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Approve official records</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Generate official certificates</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">Monitor system integrity</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhoCanUseSection;