import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'
import { FaDownload, FaCheckCircle, FaHome } from 'react-icons/fa';
import logo from "../../../assets/MaritalDesk-dark.PNG"
import { apiClient } from "../../../config/api";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams({})
    const [transactionId, setTransactionId] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [paymentData, setPaymentData] = useState(null)
    const receiptRef = useRef()

    const sessionId = searchParams.get('session_id')

    useEffect(() => {
        const verifyPayment = async () => {
            setIsLoading(true)
            setError(null)

            try {
                if (!sessionId) {
                    setError("Session ID not found. Please complete your payment again.")
                    setIsLoading(false)
                    return
                }

                console.log('Verifying session:', sessionId)

                const res = await apiClient("api/v1/marital-desk/marriage-applications/payment-success", "POST", {
                    sessionId: sessionId
                })

                console.log('Payment verification response:', res)

                if (res.success) {
                    setTransactionId(res.transactionId)
                    setPaymentData({
                        email: res.customerEmail,
                        amount: res.amount,
                        status: res.paymentStatus,
                        sessionId: res.sessionId
                    })
                }
            } catch (err) {
                console.error('Verification error:', err)
                setError(err?.response?.message || 'Failed to verify payment. Please contact support.')
            } finally {
                setIsLoading(false)
            }
        }

        if (sessionId) {
            verifyPayment()
        } else {
            setError("No payment session found.")
            setIsLoading(false)
        }
    }, [sessionId])

    // Payment details
    const paymentDetails = [
        { name: 'Registry Fee', amount: 700 },
        { name: 'Kazi Fee', amount: 1500 },
        { name: 'Service Fee', amount: 250 },
        { name: 'Processing Charge', amount: 50 }
    ]

    const totalAmount = 2500

    const downloadPDF = async () => {
        if (isGenerating || !receiptRef.current) return

        setIsGenerating(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 300))

            const canvas = await html2canvas(receiptRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            })

            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            })

            const pdfWidth = pdf.internal.pageSize.getWidth()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = pdfWidth / imgWidth
            const imgY = 10

            pdf.addImage(imgData, 'PNG', 0, imgY, imgWidth * ratio, imgHeight * ratio)

            const fileName = transactionId
                ? `Payment_Receipt_${transactionId}.pdf`
                : `Payment_Receipt_${Date.now()}.pdf`

            pdf.save(fileName)
        } catch (err) {
            console.error('PDF generation failed:', err)
            alert('Failed to generate PDF')
        } finally {
            setIsGenerating(false)
        }
    }

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gray-50 p-4 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full mb-4'></div>
                    <p className='text-gray-600 dark:text-gray-400'>Verifying your payment...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gray-50 p-4'>
                <div className='max-w-2xl mx-auto'>
                    <div className='bg-white rounded-xl shadow-lg p-6 text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4'>
                            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </div>
                        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-300 mb-2'>
                            Payment Verification Failed
                        </h1>
                        <p className='text-gray-600 dark:text-gray-500 mb-6'>
                            {error}
                        </p>
                        <Link
                            to="/marital-desk/dashboard"
                            className='inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors'
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-5 p-4'>
            <div className='max-w-2xl mx-auto'>
                {/* Header */}
                <div className='text-center mb-8'>
                    <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
                        <FaCheckCircle className='w-8 h-8 text-green-600' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-300 mb-2'>
                        Payment Successful
                    </h1>
                    <p className='text-gray-600 dark:text-gray-500'>
                        Your payment has been processed successfully
                    </p>
                </div>

                {/* Receipt */}
                <div
                    ref={receiptRef}
                    className='bg-white rounded-xl shadow-lg p-6 mb-8 relative'
                >

                    <div className='flex items-center gap-3 mb-6'>
                        <img src={logo} alt="logo" className='h-16 w-16' />
                        <h2 className='text-xl font-bold text-gray-800'>Payment Receipt</h2>
                    </div>

                    {/* Watermark */}
                    <div className='absolute inset-40 opacity-[0.07] pointer-events-none select-none text-[7rem] leading-none font-black text-center text-green-900'>
                        Marital Desk
                    </div>

                    {/* Transaction ID */}
                    <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                        <p className='text-gray-600 mb-1'>Transaction ID</p>
                        <p className='font-mono text-lg font-bold text-gray-800 break-all'>
                            {transactionId || 'Loading...'}
                        </p>
                    </div>

                    {/* Customer Info */}
                    {paymentData && (
                        <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                            <p className='text-gray-600 mb-1'>Customer Email</p>
                            <p className='font-medium text-gray-800 break-all'>
                                {paymentData.email}
                            </p>
                        </div>
                    )}

                    {/* Payment Details */}
                    <div className='mb-6'>
                        <h3 className='font-bold text-gray-700 mb-4'>Payment Details</h3>
                        <div className='space-y-3'>
                            {paymentDetails.map((item, index) => (
                                <div
                                    key={index}
                                    className='flex justify-between items-center py-2 border-b border-gray-100'
                                >
                                    <span className='text-gray-600'>{item.name}</span>
                                    <span className='font-medium text-gray-900'>৳{item.amount}</span>
                                </div>
                            ))}

                            {/* Total */}
                            <div className='flex justify-between items-center py-3 border-t border-gray-200 pt-4'>
                                <span className='font-bold text-gray-800'>Total Amount</span>
                                <span className='text-xl font-bold text-green-700'>
                                    ৳{totalAmount}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='text-center text-gray-500 text-sm border-t pt-4'>
                        <p>Thank you for using MaritalDesk</p>
                        <p>Received: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                    </div>
                </div>

                {/* Download Button */}
                <div className='text-center mb-6'>
                    <button
                        onClick={downloadPDF}
                        disabled={isGenerating}
                        className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all ${isGenerating
                            ? 'bg-gray-400 cursor-wait'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                    >
                        {isGenerating ? (
                            <>
                                <span className='animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full'></span>
                                Generating PDF...
                            </>
                        ) : (
                            <>
                                <FaDownload className='w-5 h-5' />
                                Download Receipt (PDF)
                            </>
                        )}
                    </button>
                </div>

                {/* Return Button */}
                <div className='text-center'>
                    <Link
                        to="/marital-desk/dashboard"
                        className='inline-flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors'
                    >
                        <FaHome className='w-5 h-5' />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentSuccess
