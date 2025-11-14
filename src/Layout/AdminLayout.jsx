import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AdminLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col min-h-screen">
                <main className="flex-1">
                    <Outlet />
                    <ToastContainer />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;