import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <title>Home | MaritalDesk</title>
            <Navbar></Navbar>
            <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                    <Outlet></Outlet>
                    <ToastContainer></ToastContainer>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Root;