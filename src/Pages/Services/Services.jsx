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
            icon: <HeartCrack className="w-10 h-10 text-green-700" />,
            title: "Divorce",
            desc: "Apply for divorce online through an authorized Kazi, ensuring confidentiality and legal accuracy at every step.",
        },
        {
            id: 3,
            icon: <ScrollText className="w-10 h-10 text-green-700" />,
            title: "Download Certificate",
            desc: "Easily download your verified marriage or divorce certificate with a secure QR code for authenticity.",
        },
        {
            id: 4,
            icon: <TrendingUp className="w-10 h-10 text-green-700" />,
            title: "Check Application Status",
            desc: "Track your marriage or divorce application anytime to see updates from Kazi and Admin in real time.",
        }
    ];
    return (
        <section className="bg-gray-100 py-16 px-6 md:px-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-900 mb-4" data-aos="fade-down" data-aos-delay="100">Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto" data-aos="fade-down">
                    Follow these simple steps to apply for your marriage or divorce certificate online.
                    The process is secure, transparent, and paperless.
                </p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-8" data-aos="fade-up">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        className="flex flex-col items-center text-center  p-6 rounded-2xl shadow-sm hover:shadow-md transition border-gray-200 border-1"
                    >
                        <div className=" p-4 rounded-full mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-green-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;