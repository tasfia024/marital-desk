import React from 'react';
import logoDarkImg from '../../assets/MaritalDesk-light.png'
const Footer = () => {
    return (
        <div className=' '>
            <footer className=" bg-black text-white p-10 ">
                <div className='footer sm:footer-horizontal max-w-6xl mx-auto flex justify-between items-center'>
                    <aside className="">
                        <img src={logoDarkImg} alt="" className='w-20' />
                        <p>
                            <span className='font-bold text-2xl'>MaritalDesk</span>
                            <br />
                            Supporting you through the journey of <br /> marriage and beyond!
                        </p>
                        <p className='mt-3'>Copyright © {new Date().getFullYear()} - All right reserved</p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </div>
            </footer>
 
        </div>
    );
};

export default Footer;