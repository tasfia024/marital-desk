import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaCheckCircle, FaUser, FaEnvelopeOpen, FaCommentAlt } from 'react-icons/fa';
import { MdSupportAgent, MdFeedback } from 'react-icons/md';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: 'citizen'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = [
        {
            icon: <FaPhone className="w-6 h-6" />,
            title: "Phone Support",
            details: ["+880 1700-000000", "+880 1900-000001"],
            description: "Available 9 AM - 6 PM, Sunday to Thursday",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-100 dark:bg-blue-900/30"
        },
        {
            icon: <FaEnvelope className="w-6 h-6" />,
            title: "Email Support",
            details: ["support@maritaldesk.gov.bd", "info@maritaldesk.gov.bd"],
            description: "Response within 24 hours",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-100 dark:bg-green-900/30"
        },
        {
            icon: <FaMapMarkerAlt className="w-6 h-6" />,
            title: "Office Address",
            details: ["Level 5, ICT Tower", "Agargaon, Dhaka 1207", "Bangladesh"],
            description: "Visits by appointment only",
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-100 dark:bg-purple-900/30"
        },
        {
            icon: <FaClock className="w-6 h-6" />,
            title: "Working Hours",
            details: ["Sunday - Thursday: 9 AM - 6 PM", "Friday - Saturday: Closed"],
            description: "Emergency support available",
            color: "from-amber-500 to-orange-500",
            bgColor: "bg-amber-100 dark:bg-amber-900/30"
        }
    ];

    const userTypes = [
        { value: 'citizen', label: 'Citizen (Bride/Groom)', icon: '👰' },
        { value: 'kazi', label: 'Registered Kazi', icon: '📜' },
        { value: 'admin', label: 'Administrator', icon: '👨‍💼' },
        { value: 'other', label: 'Other', icon: '❓' }
    ];

    const commonQueries = [
        {
            category: "Marriage Application",
            questions: [
                "How to apply for marriage online?",
                "What documents are required?",
                "How long does the process take?"
            ]
        },
        {
            category: "Divorce Process",
            questions: [
                "Digital divorce application process",
                "Required documentation",
                "Processing timeline"
            ]
        },
        {
            category: "Kazi Registration",
            questions: [
                "How to become a registered Kazi?",
                "Verification process",
                "Platform usage guidelines"
            ]
        },
        {
            category: "Technical Support",
            questions: [
                "Account recovery process",
                "Document upload issues",
                "Certificate download problems"
            ]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success('Message sent successfully! We will contact you within 24 hours.');
            setIsSubmitted(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                userType: 'citizen'
            });

            // Reset success message after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-18">
            <title>Contact Us | MaritalDesk</title>
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#013223] to-[#006747] dark:from-gray-900 dark:to-gray-800 text-white py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-green-100 dark:text-green-200 max-w-3xl mx-auto">
                            Get in touch with our support team. We're here to help you with all your marital service needs.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className={`w-14 h-14 rounded-full ${info.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <div className={`bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}>
                                    {info.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                                {info.title}
                            </h3>
                            <div className="space-y-2 mb-3">
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600 dark:text-gray-300">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {info.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Contact Form */}
                    <div className="space-y-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center">
                                    <FaEnvelopeOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
                                        Send Us a Message
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Fill out the form below and we'll get back to you soon.
                                    </p>
                                </div>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                                        <FaCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-3">
                                        Message Sent Successfully!
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Thank you for contacting us. Our support team will respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* User Type Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            I am a:
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {userTypes.map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, userType: type.value }))}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${formData.userType === type.value
                                                            ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
                                                            : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'
                                                        }`}
                                                >
                                                    <span className="text-2xl mb-1">{type.icon}</span>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {type.label}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaUser className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                                placeholder="+880 1XXX-XXXXXX"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="marriage-application">Marriage Application</option>
                                                <option value="divorce-process">Divorce Process</option>
                                                <option value="kazi-registration">Kazi Registration</option>
                                                <option value="technical-support">Technical Support</option>
                                                <option value="certificate-issues">Certificate Issues</option>
                                                <option value="feedback">Feedback & Suggestions</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Your Message *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-3 pointer-events-none">
                                                <FaCommentAlt className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200 resize-none"
                                                placeholder="Please describe your issue or inquiry in detail..."
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#013223] to-[#006747] text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed ${isSubmitting ? 'animate-pulse' : ''
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <FaPaperPlane className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                                            * Required fields
                                        </p>
                                    </div>
                                </form>
                            )}
                        </div>
                        {/* Live Chat & Social */}
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4">
                                Additional Support Channels
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <span className="font-medium text-gray-800 dark:text-white">Live Chat</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Online Now</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
                                        <span className="text-2xl">📱</span>
                                    </div>
                                    <span className="font-medium text-gray-800 dark:text-white">WhatsApp</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Quick Response</span>
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Right Column: FAQ & Support */}
                    <div className="space-y-8">
                        {/* Emergency Support */}
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-900/30">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                    <MdSupportAgent className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">
                                        Emergency Support
                                    </h3>
                                    <p className="text-red-700 dark:text-red-400 mb-3">
                                        For urgent matters requiring immediate attention
                                    </p>
                                    <div className="space-y-2">
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <span className="font-semibold">Hotline:</span> +880 9600-000000
                                        </p>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            <span className="font-semibold">Available:</span> 24/7 for critical issues
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Common Queries */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                                    <MdFeedback className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">
                                    Common Queries
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {commonQueries.map((category, index) => (
                                    <div key={index} className="border-l-4 border-green-500 dark:border-green-400 pl-4">
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                            {category.category}
                                        </h3>
                                        <ul className="space-y-2">
                                            {category.questions.map((question, qIndex) => (
                                                <li key={qIndex} className="flex items-start gap-2">
                                                    <span className="text-green-500 dark:text-green-400 mt-1">•</span>
                                                    <span className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors duration-200">
                                                        {question}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Can't find your answer? Check our comprehensive{' '}
                                    <a href="/faq" className="text-green-600 dark:text-green-400 font-semibold hover:underline">
                                        FAQ section
                                    </a>
                                    {' '}or contact our support team directly.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>

                {/* Response Time Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Average response time: 2-4 hours during business hours</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;