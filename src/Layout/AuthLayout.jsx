import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            
            <main className='min-h-[50vh] '>
                <Outlet></Outlet>
                <ToastContainer></ToastContainer>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;