import React, { useEffect } from 'react';
import logoDarkImg from '../../assets/MaritalDeskLight.png'
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
    // animation
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 100,
            once: true,
        });
    }, []);

    // Sample images 
    const bannerImages = [
        "https://i.ibb.co.com/SbNksdp/photo-1644337111604-aa1816b542a1-q-80-w-1171-auto-format-fit-crop-ixlib-rb-4-1.jpg",
        "https://i.ibb.co.com/YBg4PCqN/photo-1606800052052-a08af7148866-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
        "https://i.ibb.co.com/ZpdhPHML/premium-photo-1669366650300-537265d8a957-q-80-w-687-auto-format-fit-crop-ixlib-rb-4-1.jpg"
    ];

    return (
        <div className='bg-gradient-to-r from-[#013223] via-[#006747] to-[#014B34] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-16 md:mt-8'>
            <div className="max-w-6xl mx-auto py-8 md:py-16 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">

                    {/* Left Column: Text Content */}
                    <div className="text-left space-y-6" data-aos="fade-right">
                        <div className="flex items-center gap-4 mb-2">
                            <img
                                src={logoDarkImg}
                                alt="logo"
                                className='w-16 h-16 md:w-20 md:h-20 transition-all duration-500 hover:scale-110 hover:rotate-3'
                            />
                            <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-300 hover:scale-105'>
                                MaritalDesk
                            </h1>
                        </div>

                        <p className="text-white/80 text-lg md:text-xl leading-relaxed transition-colors duration-300 hover:text-white/90">
                            We engineered a secure, automated, and verifiable marriage ecosystem with validation, digital certification, and role-based authority — built for Bangladesh's future e-governance framework.
                        </p>

                        <div className="space-y-4">

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    to='/register'
                                    className="btn bg-white text-green-900 font-semibold border-0 px-6 py-3 
                                               transition-all duration-300 hover:bg-green-50 hover:scale-105 hover:shadow-lg 
                                               dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700
                                               flex-1 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    Create an account
                                </Link>

                                <Link
                                    to='/login'
                                    className="btn bg-transparent text-white font-semibold border-2 border-white/50 px-6 py-3 
                                               transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg 
                                               hover:border-white flex-1 text-center"
                                    data-aos="fade-up"
                                    data-aos-delay="150"
                                >
                                    Login
                                </Link>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span className="text-white/60 text-sm">Secure Platform</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span className="text-white/60 text-sm">24/7 Support</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <span className="text-white/60 text-sm">Govt. Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Images Grid */}
                    <div className="grid grid-cols-2 gap-4 h-full" data-aos="fade-left" data-aos-delay="200">
                        {/* Top row: 2 images */}
                        <div className="space-y-4">
                            <div className="relative h-48 md:h-56 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                                <img
                                    src={bannerImages[0]}
                                    alt="Marriage registration process"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="relative h-48 md:h-56 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                                <img
                                    src={bannerImages[1]}
                                    alt="Digital certification"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>

                        {/* Bottom row: 1 larger image */}
                        <div className="relative h-full row-span-1 rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl group">
                            <img
                                src={bannerImages[2]}
                                alt="E-governance framework"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white text-sm font-medium">Digital Transformation in Action</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;