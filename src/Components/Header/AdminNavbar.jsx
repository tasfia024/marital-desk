import React from 'react';
import logoImg from './../../assets/Maritaldesk.jpeg'

const AdminNavbar = ({ onSidebarToggle }) => {
    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow-md">
            {/* Sidebar toggle button for mobile */}
            <button
                className="md:hidden mr-2 p-2 rounded hover:bg-gray-700 focus:outline-none"
                onClick={onSidebarToggle}
                aria-label="Toggle sidebar"
            >
                {/* i icon or hamburger */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="text-xl flex items-center justify-center gap-1 font-bold">
                <img
                    src={logoImg}
                    alt="logo"
                    className='w-15 hidden md:block'
                />
                <span className='text-4xl font-light text-gray-100'>|</span>
                <span className='font-bold text-2xl text-gray-100'>MaritalDesk</span>
            </div>
            <ul className="flex space-x-6">
                {/* <li><a href="/admin/settings" className="hover:text-gray-300">Settings</a></li> */}
                <li><a href="/" className="hover:text-gray-300">Logout</a></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
