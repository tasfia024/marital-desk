import React, { use } from 'react';
import { Link, NavLink } from "react-router";
import { HeartCrack, HeartHandshake, LayoutDashboard, ScrollText, User, ShieldUser } from "lucide-react";
import { AuthContext } from '../../Provider/AuthContext';

const AdminSidebar = (props) => {
    const { user } = use(AuthContext);

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
                    <span className="text-lg font-semibold">{user.name}</span>
                    <span className="text-sm text-yellow-200">{user.email}</span>
                </div>

                <hr></hr>
                <nav className="flex flex-col space-y-3">
                    <NavLink to="/marital-desk/dashboard" className="hover:text-yellow-300 flex gap-2 items-center"><LayoutDashboard />Dashboard</NavLink>

                    {
                        user && ((user.role === 'super-admin') || (user.role === 'kazi')) ? (
                            <NavLink to="/marital-desk/marriage-applications" className="hover:text-yellow-300 flex gap-2 items-center"><HeartHandshake />Marriage Application</NavLink>
                        ) : null
                    }

                    {
                        user && (user.role === 'super-admin') || (user.role === 'kazi') ? (
                            <NavLink to="/marital-desk/divorce-applications" className="hover:text-yellow-300 flex gap-2 items-center"><HeartCrack />Divorce Application</NavLink>
                        ) : null
                    }

                    {
                        user && (user.role === 'super-admin') || (user.role === 'kazi') ? (
                            <NavLink to="/marital-desk/marriage-certificates" className="hover:text-yellow-300 flex gap-2 items-center"><ScrollText />Marriage Certificate</NavLink>
                        ) : null
                    }

                    <NavLink to="/marital-desk/kazi-applications" className="hover:text-yellow-300 flex gap-2 items-center"><User />Kazi Application</NavLink>

                    {
                        user && user.role === 'super-admin' ? (
                            <NavLink to="/marital-desk/manage-users" className="hover:text-yellow-300 flex gap-2 items-center"><ShieldUser />Manage User</NavLink>
                        ) : null
                    }

                </nav>
            </aside>
        </>
    );
};

export default AdminSidebar;
