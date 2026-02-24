import React from 'react';
import { FaUsers, FaBullseye, FaLightbulb, FaHandshake, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { GiStoneBridge, GiArchiveRegister } from 'react-icons/gi';
import { MdAccessTime, MdSecurity } from 'react-icons/md';
import { RiTeamFill } from 'react-icons/ri';
import { IoIosDocument } from 'react-icons/io';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
            <title>About Us | MaritalDesk</title>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 mt-4 animate-fade-in">
                    <h1 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-300 mb-4 transition-all duration-300 hover:scale-105 hover:text-green-900 dark:hover:text-green-200 inline-block">
                        About MaritalDesk
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#013223] to-[#006747] mx-auto mb-6 transition-all duration-500 hover:w-32"></div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-300 hover:text-gray-800 dark:hover:text-gray-100">
                        Modernizing marital services in Bangladesh through digital transformation
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Content */}
                        <div className="lg:w-2/3">
                            <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-6 transition-colors duration-300 hover:text-green-900 dark:hover:text-green-200">
                                Our Mission & Vision
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-100">
                                MaritalDesk is a centralized digital platform designed to modernize and simplify marital services in Bangladesh. The platform brings together citizens, registered Kazis, and administrators into a single, secure system for managing marriage and divorce processes efficiently and transparently.
                            </p>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-100">
                                Traditionally, marital procedures involve manual paperwork, physical visits, and fragmented record-keeping, which often lead to delays, errors, and lack of traceability. MaritalDesk addresses these challenges by digitizing the entire workflow — from application submission and verification to approval and certificate generation — while maintaining compliance with legal and procedural requirements.
                            </p>
                        </div>

                        {/* Right Stats */}
                        <div className="lg:w-1/3">
                            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 transition-colors duration-300 hover:text-green-900 dark:hover:text-green-200">
                                    Quick Facts
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: <GiArchiveRegister />, title: "Digital Process", desc: "End-to-end digital workflow" },
                                        { icon: <MdAccessTime />, title: "Time Saving", desc: "Reduces processing time significantly" },
                                        { icon: <MdSecurity />, title: "Secure & Compliant", desc: "Legal compliance maintained" }
                                    ].map((fact, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md cursor-pointer group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 dark:group-hover:bg-green-800/50">
                                                <div className="w-6 h-6 text-green-600 dark:text-green-400 transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300">
                                                    {fact.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-green-700 dark:text-green-400 transition-colors duration-300 group-hover:text-green-800 dark:group-hover:text-green-300">
                                                    {fact.title}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                                                    {fact.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-8 transition-all duration-300 hover:scale-105 hover:text-green-900 dark:hover:text-green-200 inline-block">
                        Our Platform Features
                    </h2>

                    <div className="tabs tabs-lift tabs-lg mb-6">
                        {[
                            { label: "For Citizens", icon: <FaUsers />, title: "Citizen-Centric Services", benefits: "Reduced paperwork, no physical visits required, transparent process tracking, and instant access to marital records." },
                            { label: "For Kazis", icon: <IoIosDocument />, title: "Kazi Dashboard", benefits: "Enhanced workflow efficiency, reduced manual errors, organized digital records, and improved service delivery time." },
                            { label: "Technology", icon: <FaShieldAlt />, title: "Security & Infrastructure", benefits: "Modern MERN stack (MongoDB, Express.js, React, Node.js) with additional security layers and scalable cloud infrastructure." }
                        ].map((tab, tabIndex) => (
                            <React.Fragment key={tabIndex}>
                                <input
                                    type="radio"
                                    name="about_tabs"
                                    className="tab text-lg font-semibold text-green-800 dark:text-green-300 transition-all duration-300 hover:text-green-900 dark:hover:text-green-200"
                                    aria-label={tab.label}
                                    defaultChecked={tabIndex === 0}
                                />
                                <div className="tab-content bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="md:w-1/2">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center mb-4 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                                                <div className="w-8 h-8 text-green-600 dark:text-green-400 transition-colors duration-300 hover:text-green-700 dark:hover:text-green-300">
                                                    {tab.icon}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 transition-colors duration-300 hover:text-green-900 dark:hover:text-green-200">
                                                {tab.title}
                                            </h3>
                                            <ul className="space-y-3">
                                                {[
                                                    "Easy online application submission for marriage/divorce",
                                                    "Real-time application status tracking",
                                                    "Digital certificate download and verification",
                                                    "Secure document upload and storage"
                                                ].map((item, itemIndex) => (
                                                    <li
                                                        key={itemIndex}
                                                        className="flex items-start gap-2 p-2 rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-gray-700"
                                                    >
                                                        <span className="text-green-600 dark:text-green-400 mt-1 transition-colors duration-300">✓</span>
                                                        <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-100">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="md:w-1/2">
                                            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <h4 className="font-bold text-green-700 dark:text-green-400 mb-2 transition-colors duration-300 hover:text-green-800 dark:hover:text-green-300">
                                                    {tabIndex === 0 ? "Benefits" : tabIndex === 1 ? "Advantages" : "Tech Stack"}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">
                                                    {tab.benefits}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Our Team Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-3 mb-4 transition-all duration-300 hover:gap-4">
                            <RiTeamFill className="w-10 h-10 text-green-600 dark:text-green-400 transition-colors duration-300 hover:text-green-700 dark:hover:text-green-300" />
                            <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 transition-all duration-300 hover:scale-105 hover:text-green-900 dark:hover:text-green-200">
                                Meet Our Team
                            </h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-100">
                            A dedicated team of professionals working together to revolutionize marital services in Bangladesh.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Nusrat Jahan", role: "Frontend Developer", icon: "🎨", color: "from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30" },
                            { name: "Tasfia Sultana", role: "Backend Developer", icon: "⚙️", color: "from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30" },
                            { name: "Mahfuzur Rahman", role: "UX Designer", icon: "✨", color: "from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30" },
                            { name: "Arzun Majumder", role: "Model/Logic Architect", icon: "🧠", color: "from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30" },
                            { name: "Abu Naser", role: "Data Collector", icon: "👨‍💼", color: "from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30" }
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] group cursor-pointer"
                            >
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-3xl mb-4 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}>
                                    {member.icon}
                                </div>
                                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-1 transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-400">
                                    {member.name}
                                </h3>
                                <p className="text-center text-green-600 dark:text-green-400 font-medium mb-3 transition-colors duration-300 group-hover:text-green-800 dark:group-hover:text-green-300">
                                    {member.role}
                                </p>
                                <div className="text-center">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                                        Contributing expertise to make MaritalDesk a success
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-300 mb-10 transition-all duration-300 hover:scale-105 hover:text-green-900 dark:hover:text-green-200">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <FaLightbulb />, title: "Innovation", desc: "Leveraging technology to solve traditional problems" },
                            { icon: <FaHandshake />, title: "Transparency", desc: "Clear processes and open communication" },
                            { icon: <GiStoneBridge />, title: "Accessibility", desc: "Services available to all citizens equally" },
                            { icon: <FaChartLine />, title: "Efficiency", desc: "Streamlined processes reducing time and effort" }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                                    <div className="w-8 h-8 text-green-600 dark:text-green-400 transition-colors duration-300 group-hover:text-green-700 dark:group-hover:text-green-300">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2 transition-colors duration-300 group-hover:text-green-900 dark:group-hover:text-green-200">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Mission Statement */}
                <div className="mt-12 text-center transition-all duration-300 hover:-translate-y-2">
                    <div className="inline-block p-1 bg-gradient-to-r from-[#013223] to-[#006747] rounded-full mb-6 transition-all duration-500 hover:scale-110 hover:shadow-lg">
                        <div className="bg-white dark:bg-gray-800 rounded-full p-4 transition-all duration-300 group hover:bg-green-50 dark:hover:bg-gray-700">
                            <FaBullseye className="w-12 h-12 text-green-600 dark:text-green-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-green-700 dark:group-hover:text-green-300" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4 transition-colors duration-300 hover:text-green-900 dark:hover:text-green-200">
                        Our Ultimate Goal
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto italic transition-colors duration-300 hover:text-gray-900 dark:hover:text-gray-100">
                        "We believe that essential civic services should be accessible, secure, and easy to use. MaritalDesk is built with that belief at its core — bridging technology and governance to make marital services more efficient for everyone involved."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;