import React, { useEffect } from 'react';
import { HeartCrack, HouseHeart, ScrollText, TrendingUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Services = () => {
    // animation
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
            once: true,
        });
    }, []);

    const steps = [
        {
            id: 1,
            icon: <HouseHeart className="w-10 h-10 text-green-700" />,
            title: "Apply for Marriage",
            desc: "Submit your online marriage application with verified personal details and documents — quick, secure, and paperless.",
        },
        {
            id: 2,
            icon: <TrendingUp className="w-10 h-10 text-green-700" />,
            title: "Check Application Status",
            desc: "Track your marriage or divorce application anytime to see updates from Kazi and Admin in real time.",
        },
        {
            id: 3,
            icon: <ScrollText className="w-10 h-10 text-green-700" />,
            title: "Download Certificate",
            desc: "Easily download your verified marriage or divorce certificate with a secure QR code for authenticity.",
        }
    ];
    return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-20">
        <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 
                className="text-3xl md:text-4xl font-bold text-green-900 dark:text-green-300 mb-4" 
                data-aos="fade-down" 
                data-aos-delay="100"
            >
                Our Services
            </h2>
            <p 
                className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto" 
                data-aos="fade-down"
            >
                Follow these simple steps to apply for your marriage or divorce certificate online.
                The process is secure, transparent, and paperless.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" data-aos="fade-up">
            {steps.map((step) => (
                <div
                    key={step.id}
                    className="flex flex-col items-center text-center p-6 rounded-2xl 
                               bg-white dark:bg-gray-800 
                               shadow-sm hover:shadow-xl 
                               border border-gray-200 dark:border-gray-700
                               transition-all duration-300 
                               hover:-translate-y-2 
                               group cursor-pointer"
                >
                    <div className="p-4 rounded-full mb-4 
                                    bg-green-50 dark:bg-green-900/30 
                                    transition-all duration-500 
                                    group-hover:scale-110 group-hover:bg-green-100 dark:group-hover:bg-green-800/50">
                        <div className="text-green-700 dark:text-green-400 text-2xl">
                            {step.icon}
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-2 
                                   transition-colors duration-300 
                                   group-hover:text-green-800 dark:group-hover:text-green-200">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 
                                 transition-colors duration-300 
                                 group-hover:text-gray-800 dark:group-hover:text-gray-300">
                        {step.desc}
                    </p>
                </div>
            ))}
        </div>
    </section>
);
};

export default Services;