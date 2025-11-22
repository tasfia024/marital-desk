import React from 'react';
import AdminNavbar from '../Components/Header/AdminNavbar';
import AdminFooter from '../Components/Footer/AdminFooter';
import AdminSidebar from '../Components/Header/AdminSidebar';
import { useState } from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
    const handleSidebarClose = () => setSidebarOpen(false);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <AdminNavbar onSidebarToggle={handleSidebarToggle} />
            <div className="flex flex-1">
                {/* Sidebar: hidden on mobile, overlay when open */}
                <AdminSidebar open={sidebarOpen} onClose={handleSidebarClose} />
                <main className="flex-1 p-6">
                    <Outlet />
                    <ToastContainer />
                </main>
            </div>
            <AdminFooter />
        </div>
    );
};

export default AdminLayout;