import React from 'react';
import { Link, NavLink } from "react-router";
import { HeartCrack, HeartHandshake, LayoutDashboard, ScrollText, User } from "lucide-react";

const AdminSidebar = (props) => {
    const { open, onClose } = props;
    const sidebarClass = `fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-r from-[#013223] to-[#006747] text-white p-6 space-y-6 transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:block`;

    return (
        <>
            {/* Overlay for mobile when sidebar is open */}
            {open && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={onClose}></div>
            )}
            <aside className={sidebarClass}>
                {/* Close button for mobile */}
                <button
                    className="md:hidden absolute top-4 right-4 p-2 rounded-full bg-yellow-300 text-[#013223] hover:bg-yellow-400 z-50"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    &times;
                </button>
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src="https://ui-avatars.com/api/?name=Admin&background=013223&color=fff&size=96"
                        alt="Profile"
                        className="w-24 h-24 rounded-full border-4 border-yellow-300 shadow-lg mb-2"
                    />
                    <span className="text-lg font-semibold">Admin Name</span>
                    <span className="text-sm text-yellow-200">admin@maritaldesk.com</span>
                </div>

                <hr></hr>
                <nav className="flex flex-col space-y-3">
                    <NavLink to="/dashboard" className="hover:text-yellow-300 flex gap-2 items-center"><LayoutDashboard />Dashboard</NavLink>
                    <NavLink to="/marriage" className="hover:text-yellow-300 flex gap-2 items-center"><HeartHandshake />Marriage</NavLink>
                    <NavLink to="/divorce" className="hover:text-yellow-300 flex gap-2 items-center"><HeartCrack />Divorce</NavLink>
                    <NavLink to="/certificate" className="hover:text-yellow-300 flex gap-2 items-center"><ScrollText />Certificate</NavLink>
                    <NavLink to="/profile" className="hover:text-yellow-300 flex gap-2 items-center"><User />Profile</NavLink>
                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;
