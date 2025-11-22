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
        toast.success('Logged out successfully!!')
        // .then(() => {
        //     toast.success('Logged out successfully!!')
        // }).catch((error) => {
        //     console.log(error)
        // });
    }

    const links = <>
        <li className="text-lg text-green-800 font-bold"><NavLink
            to='/'
            className={({ isActive }) => isActive ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white' : ''}>Home</NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/services'
            className={({ isActive }) => isActive ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white' : ''}>
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

        {/* <li className='text-lg text-green-800 font-bold'><NavLink
            to='/kaziDashboard'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>Kazi </NavLink></li>

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/adminDashboard'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}> Admin</NavLink></li> */}

        <li className='text-lg text-green-800 font-bold'><NavLink
            to='/about'
            className={({ isActive }) => isActive ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white' : ''}>About Us</NavLink></li>

        {
            user && user.email ? <li className='text-lg text-green-800 font-bold'><NavLink
                to='/marital-desk/dashboard'
                className={({ isActive }) => isActive ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white' : ''}> Dashboard</NavLink></li> : ''
        }

        {/* <li className='text-lg text-green-800 font-bold'><NavLink
            to='/profile'
            className={({ isActive }) => isActive && 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'}>Profile</NavLink></li> */}

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
                    <div>
                        {
                            user && user.email ? <div className="mr-2 flex gap-2">
                                {/* <img
                                    src={user.photoURL}
                                    alt="user"
                                    referrerPolicy="no-referrer"
                                    className='rounded-full w-12' /> */}

                                <button onClick={handleLogout} className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white hover:text-gray-300">Logout</button>
                            </div> : <Link to='/login' className="btn bg-gradient-to-r from-[#013223] to-[#006747] text-white hover:text-gray-300">Login</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;