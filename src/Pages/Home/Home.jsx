import React, { useEffect } from 'react';
import Banner from '../../Components/Header/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';

const Home = () => {

    // animation
      useEffect(() => {
        AOS.init({
          duration: 1000,
          offset: 100,
          once: true,
        });
      }, []);

    return (
        <div className='bg-gray-00'>
            <Banner></Banner>
            {/* How it works */}
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;