import React, { useEffect } from 'react';
import logoDarkImg from '../../assets/MaritalDesk-light.png'
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
  
    return (
        <div className='bg-gradient-to-r from-[#013223] via-[#006747] to-[#014B34] '>
            <div className="hero max-w-6xl  mx-auto m-b0">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <img
                            src={logoDarkImg}
                            alt="logo"
                            className='w-25 h-25 mx-auto'
                            data-aos="fade-down" 
                            data-aos-delay="100"
                        />
                        <h1 className='text-white text-4xl font-bold' data-aos="fade-down">MaritalDesk</h1>
                        <p className="py-6 text-white" data-aos="fade-up">
                            We didn't just digitalize marriage registration.
                            We engineered a secure, automated, and verifiable marriage ecosystem with validation, digital certification, and role-based authority — built for Bangladesh's future e-governance framework.
                        </p>
                        <Link to='/auth/register' className="btn " data-aos="fade-up" data-aos-delay="100">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;