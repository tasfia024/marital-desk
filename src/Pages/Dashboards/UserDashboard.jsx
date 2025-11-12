import { HeartCrack, HeartHandshake, LayoutDashboard, ScrollText, User } from "lucide-react";
import React from "react";
import { FaWpforms } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const UserDashboard = () => {
    return (
        <div className="bg-gray-100">
            <div className="flex min-h-[60vh]">
                {/* sidebar */}
                <aside className="w-64 bg-gradient-to-r from-[#013223] to-[#006747] text-white min-h-[70vh] p-6 space-y-6">
                    <h2 className="text-2xl font-bold tracking-wide">MaritalDesk</h2>
                    <nav className="flex flex-col space-y-3">
                        <NavLink to="/dashboard" className="hover:text-yellow-300 flex gap-2 items-center"><LayoutDashboard />Dashboard</NavLink>
                        <NavLink to="/marriage" className="hover:text-yellow-300 flex gap-2 items-center"><HeartHandshake />Marriage</NavLink>
                        <NavLink to="/divorce" className="hover:text-yellow-300 flex gap-2 items-center"><HeartCrack />Divorce</NavLink>
                        <NavLink to="/certificate" className="hover:text-yellow-300 flex gap-2 items-center"><ScrollText />Certificate</NavLink>
                        <NavLink to="/profile" className="hover:text-yellow-300 flex gap-2 items-center"><User />Profile</NavLink>
                    </nav>
                </aside>

                {/* dashboard */}
                <main className="flex-1 p-10">
                    <header className="border-b border-gray-300 pb-4 mb-6">
                        <h1 className="text-3xl font-bold text-green-900">Dashboard</h1>
                    </header>

                    <section className="grid md:grid-cols-3 grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-medium text-gray-800 mb-2 flex gap-2 items-center"><FaWpforms />My Applications</h3>
                            <p className="text-sm text-gray-600">
                                View and track your marriage or divorce application status.
                            </p>
                            <button className="mt-4 px-4 py-2 btn bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                View Applications
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-medium text-gray-800 mb-2 flex gap-2 items-center"><ScrollText />Certificates</h3>
                            <p className="text-sm text-gray-600">
                                Download or verify your issued certificates.
                            </p>
                            <button className="mt-4 px-4 py-2  btn bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                View Certificates
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-medium text-gray-800 mb-2 flex gap-2 items-center"><User />Profile</h3>
                            <p className="text-sm text-gray-600">
                                Manage your personal information and account settings.
                            </p>
                            <Link to={'/profile'} className="mt-4 px-4 py-2  btn bg-gradient-to-r from-[#013223] to-[#006747] text-white">
                                Edit Profile
                            </Link >
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
