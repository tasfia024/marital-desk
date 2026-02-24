import React, { use, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../Provider/AuthContext';
import { apiClient } from "../../../config/api";

const Payment = () => {
    const { user } = use(AuthContext)
    const navigate = useNavigate()
    const { id: marriageApplicationId } = useParams()
    const [isProcessing, setIsProcessing] = useState(false)
    const [showDetails, setShowDetails] = useState(true)
    const [error, setError] = useState(null)

    const paymentDetails = {
        registryFee: 700,
        kaziFee: 1500,
        serviceFee: 250,
        charge: 50
    }

    const calculateTotal = () => {
        return (
            paymentDetails.registryFee +
            paymentDetails.kaziFee +
            paymentDetails.serviceFee +
            paymentDetails.charge
        )
    }

    const handlePayment = async () => {
        setIsProcessing(true)
        setError(null)

        try {
            if (!user?.name || !user?.email) {
                setError("User information is missing. Please log in again.")
                setIsProcessing(false)
                return
            }

            const paymentInfo = {
                price: calculateTotal(),
                userName: user?.name,
                userEmail: user?.email,
                marriageApplicationId: marriageApplicationId
            }

            console.log('Initiating payment with:', paymentInfo)

            const res = await apiClient("api/v1/marital-desk/marriage-applications/checkout", "POST", paymentInfo)

            console.log('Checkout response:', res.data)

            // Redirect to Stripe Checkout
            if (res.url) {
                window.location.href = res.url
            } else {
                setError("Failed to initiate payment. Please try again.")
            }
        } catch (error) {
            console.error('Payment error:', error)
            setError(error?.response?.message || 'Payment initiation failed. Please try again.')
            setIsProcessing(false)
        }
    }

    return (
        <div className='max-w-6xl mx-auto p-3 md:p-5'>
            <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden'>
                {/* Header */}
                <div className='bg-gradient-to-r from-green-700 to-green-800 p-6 text-white'>
                    <h1 className='text-2xl md:text-3xl font-bold'>
                        Complete Your Marriage Application Payment
                    </h1>
                    <p className='text-green-100 mt-2'>
                        Secure payment gateway • Instant confirmation
                    </p>
                </div>

                <div className='p-6 md:p-8'>
                    {/* Error Message */}
                    {error && (
                        <div className='mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
                            <p className='text-red-700 dark:text-red-300'>{error}</p>
                        </div>
                    )}

                    {/* Payment Summary */}
                    <div className='mb-8'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-bold text-gray-800 dark:text-white'>
                                Payment Summary
                            </h2>
                            <button
                                onClick={() => setShowDetails(!showDetails)}
                                className='text-green-600 dark:text-green-400 font-medium hover:text-green-700 dark:hover:text-green-300 flex items-center gap-1'
                            >
                                {showDetails ? (
                                    <>
                                        <svg
                                            className='w-4 h-4'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 15l7-7 7 7'
                                            />
                                        </svg>
                                        Hide Details
                                    </>
                                ) : (
                                    <>
                                        <svg
                                            className='w-4 h-4'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M19 9l-7 7-7-7'
                                            />
                                        </svg>
                                        Show Details
                                    </>
                                )}
                            </button>
                        </div>

                        {showDetails && (
                            <div className='space-y-4 bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6'>
                                {[
                                    {
                                        name: 'Registry Fee',
                                        description: 'Government registration fee',
                                        amount: paymentDetails.registryFee,
                                        icon: (
                                            <svg
                                                className='w-5 h-5 text-green-600 dark:text-green-400'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                                />
                                            </svg>
                                        ),
                                        color: 'green'
                                    },
                                    {
                                        name: 'Kazi Fee',
                                        description: 'Authorized Kazi service charge',
                                        amount: paymentDetails.kaziFee,
                                        icon: (
                                            <svg
                                                className='w-5 h-5 text-blue-600 dark:text-blue-400'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                                                />
                                            </svg>
                                        ),
                                        color: 'blue'
                                    },
                                    {
                                        name: 'MaritalDesk Service Fee',
                                        description: 'Platform & verification fee',
                                        amount: paymentDetails.serviceFee,
                                        icon: (
                                            <svg
                                                className='w-5 h-5 text-purple-600 dark:text-purple-400'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                                                />
                                            </svg>
                                        ),
                                        color: 'purple'
                                    },
                                    {
                                        name: 'Processing Charge',
                                        description: 'Transaction & service charge',
                                        amount: paymentDetails.charge,
                                        icon: (
                                            <svg
                                                className='w-5 h-5 text-yellow-600 dark:text-yellow-400'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                />
                                            </svg>
                                        ),
                                        color: 'yellow'
                                    }
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <div
                                                className={`w-10 h-10 rounded-full bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center`}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className='font-medium text-gray-800 dark:text-gray-200'>
                                                    {item.name}
                                                </h3>
                                                <p className='text-sm text-gray-600 dark:text-gray-400'>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <span className='font-bold text-gray-800 dark:text-white'>
                                            ৳{item.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Total Amount */}
                        <div className='bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6'>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                                        Total Amount
                                    </h3>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                        Inclusive of all charges
                                    </p>
                                </div>
                                <div className='text-right'>
                                    <div className='text-3xl font-bold text-green-700 dark:text-green-400'>
                                        ৳{calculateTotal()}
                                    </div>
                                    <p className='text-gray-600 dark:text-gray-400 text-sm'>
                                        BDT
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Info */}
                    <div className='mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'>
                        <div className='flex items-center gap-3 mb-4'>
                            <div className='w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center'>
                                <svg
                                    className='w-6 h-6 text-blue-600 dark:text-blue-400'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
                                    />
                                </svg>
                            </div>
                            <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
                                Stripe Payment Gateway
                            </h3>
                        </div>
                        <p className='text-gray-600 dark:text-gray-400 mb-4'>
                            Your payment will be processed securely through Stripe. We accept
                            all major credit and debit cards.
                        </p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <span className='font-medium text-gray-700 dark:text-gray-300'>
                                    Visa
                                </span>
                            </div>
                            <div className='px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <span className='font-medium text-gray-700 dark:text-gray-300'>
                                    MasterCard
                                </span>
                            </div>
                            <div className='px-3 py-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700'>
                                <span className='font-medium text-gray-700 dark:text-gray-300'>
                                    American Express
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex flex-col md:flex-row gap-4'>
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={`flex-1 btn ${isProcessing
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700'
                                } text-white font-bold py-4 rounded-xl transition-all duration-300 ${!isProcessing && 'hover:scale-[1.02]'
                                }`}
                        >
                            {isProcessing ? (
                                <span className='flex items-center justify-center gap-2'>
                                    <svg
                                        className='animate-spin h-5 w-5 text-white'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                    >
                                        <circle
                                            className='opacity-25'
                                            cx='12'
                                            cy='12'
                                            r='10'
                                            stroke='currentColor'
                                            strokeWidth='4'
                                        ></circle>
                                        <path
                                            className='opacity-75'
                                            fill='currentColor'
                                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                        ></path>
                                    </svg>
                                    Processing Payment...
                                </span>
                            ) : (
                                <span className='flex items-center justify-center gap-2'>
                                    <svg
                                        className='w-5 h-5'
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
                                        />
                                    </svg>
                                    Pay Now ৳{calculateTotal()}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Security Info */}
                    <div className='mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl'>
                        <div className='flex items-center gap-3 mb-2'>
                            <svg
                                className='w-5 h-5 text-green-600 dark:text-green-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                                />
                            </svg>
                            <h4 className='font-medium text-gray-800 dark:text-gray-200'>
                                Secure Payment
                            </h4>
                        </div>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Your payment information is encrypted and secure. We never store
                            your credit card details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
