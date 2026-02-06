import React, { use } from 'react';
import logoImg from './../../assets/Maritaldesk.jpeg'
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

const AdminNavbar = ({ onSidebarToggle }) => {
    const { user, logout } = use(AuthContext);
    const navigate = useNavigate();

    // Logout
    const handleLogout = (e) => {
        e.preventDefault();
        logout()
        // toast.success('Logged out successfully!!');
        // navigate("/");
        // .then(() => {
        //     toast.success('Logged out successfully!!')
        // }).catch((error) => {
        //     console.log(error)
        // });
    }

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
            <a href='/' className="text-xl flex items-center justify-center gap-1 font-bold">
                <img
                    src={logoImg}
                    alt="logo"
                    className='w-15 hidden md:block'
                />
                <span className='text-4xl font-light text-gray-100'>|</span>
                <span className='font-bold text-2xl text-gray-100'>MaritalDesk</span>
            </a>
            <ul className="flex space-x-3">
                {/* <li><a href="/admin/settings" className="hover:text-gray-300">Settings</a></li> */}
                <li>
                    <a href="javascript:void(0);" onClick={() => navigate("/marital-desk/profile")} className="btn bg-secondary text-white hover:text-gray-300"><User />Profile</a>
                </li>
                <li><a href="javascript:void(0)" onClick={handleLogout} className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white hover:text-gray-300"><LogOut /> Logout</a></li>
            </ul>
        </nav>
    );
};

export default AdminNavbar;
