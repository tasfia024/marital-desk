import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaTimesCircle, FaHome, FaCreditCard } from 'react-icons/fa';

const PaymentCancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('User cancelled payment');
    }, []);

    return (
        <div className=" bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <div className="bg-white mt-20 rounded-2xl shadow-xl p-8 text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <FaTimesCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
                        Payment Cancelled
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Your payment process was cancelled. No charges were made to your account.
                    </p>

                    {/* Details */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                            <span className="font-medium text-red-600 dark:text-red-400">Cancelled</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
                        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                            What happens next?
                        </h3>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span>No charges were made to your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span>Your application is still pending</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span>You can retry payment at any time</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full btn bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                        >
                            <FaCreditCard className="w-5 h-5" />
                            Retry Payment
                        </button>

                        <div className="flex gap-4">
                            <Link
                                to="/marital-desk/dashboard"
                                className="flex-1 btn bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                </svg>
                                Dashboard
                            </Link>

                            <Link
                                to="/"
                                className="flex-1 btn bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FaHome className="w-5 h-5" />
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;