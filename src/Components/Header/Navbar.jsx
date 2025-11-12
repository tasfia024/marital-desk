import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import logoImg from '../../assets/Maritaldesk.jpeg'
import { AuthContext } from '../../Provider/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { user, logout } = use(AuthContext);

    // Logout
    const handleLogout = (e) => {
        e.preventDefault();
        logout()
            .then(() => {
                toast.success('Logged out successfully!!')
            }).catch((error) => {
                console.log(error)
            });
    }

    const links = <>
        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>Home</NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/services'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>
            <div className="dropdown">
                <div tabIndex={0} role="button" className=" mx-1">Services</div>
                {/* <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-green-900">
                    <li><Link>Apply for Marriage</Link></li>
                    <li><Link>Download Certificate</Link></li>
                    <li><Link>Check Application Status</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link>Settings</Link></li>
                </ul> */}
            </div>
        </NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/userDashboard'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}> Dashboard</NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/kaziDashboard'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>Kazi </NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/adminDashboard'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}> Admin</NavLink></li>     

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/about'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>About Us</NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/profile'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>Profile</NavLink></li>

        

    </>
    return (
        <div className='bg-base-100 shadow-lg'>
            <div className="navbar  max-w-6xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className=" text-xl flex items-center justify-center gap-1">
                        <img
                            src={logoImg}
                            alt="logo"
                            className='w-15 hidden md:block'
                        />
                        <span className='text-4xl font-light text-orange-600'>|</span>
                        <span className='font-bold text-2xl text-green-800'>MaritalDesk</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul
                        className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className='navbar-end '>
                    <div >
                        {
                            user && user.photoURL ? <div className="mr-2 flex gap-2">
                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    referrerPolicy="no-referrer"
                                    className='rounded-full w-12' />
                                <button onClick={handleLogout} className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white">Logout</button>
                            </div> : <Link to='/auth/login' className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white">Login</Link>
                        }
                    </div>
                    <label className="swap swap-rotate ">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" className="theme-controller" value="dark" />

                        {/* sun icon */}
                        <svg
                            className="swap-off h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-8 w-8 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;