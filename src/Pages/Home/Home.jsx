import React, { useEffect } from 'react';
import Banner from '../../Components/Header/Banner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import FAQ from '../../Pages/FAQ/FAQ';
import Services from '../Services/Services';
import WhoCanUseSection from '../../Components/Home/WhoCanUseSection';
import WhyMaritalDeskSection from '../../Components/Home/WhyMaritalDeskSection';
import CallToActionSection from '../../Components/Home/CTA';

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
      <Services />
      {/* How it works */}
      <HowItWorks></HowItWorks>
      <WhoCanUseSection />
      <WhyMaritalDeskSection />
      <FAQ></FAQ>
      <CallToActionSection></CallToActionSection>
    </div>
  );
};

export default Home;