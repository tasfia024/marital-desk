import React, { use, useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import logoImg from '../../assets/MaritalDesk.png'
import { AuthContext } from '../../Provider/AuthContext'
import { toast } from 'react-toastify'
import { Sun, Moon } from 'lucide-react'
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = use(AuthContext)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // Apply theme on mount and when theme changes
  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Handle theme toggle
  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isProfileOpen &&
        !event.target.closest('.profile-dropdown-container')
      ) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProfileOpen])

  // Logout
  const handleLogout = e => {
    e.preventDefault()
    logout()
      .then(() => {
        toast.success('Logged out successfully!!')
        setIsProfileOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const links = (
    <>
      <li className='text-lg text-green-800 font-bold dark:text-green-200'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive
              ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'
              : 'text-green-800 dark:text-green-200'
          }
        >
          Home
        </NavLink>
      </li>

      <li className='text-lg text-green-800 font-bold dark:text-green-200'>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive
              ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'
              : 'text-green-800 dark:text-green-200'
          }
        >
          About Us
        </NavLink>
      </li>

      <li className='text-lg font-bold dark:text-green-200'>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive
              ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'
              : 'text-green-800 dark:text-green-200'
          }
        >
          Contact
        </NavLink>
      </li>

      {/* {user && user.email ? (
        <li className='text-lg text-green-800 font-bold dark:text-green-200'>
          <NavLink
            to='/marital-desk/dashboard'
            className={({ isActive }) =>
              isActive
                ? 'btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'
                : 'text-green-800 dark:text-green-200'
            }
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        ''
      )} */}
    </>
  )

  return (
    <div className='bg-base-100 dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30 border-b-2 border-gray-200 dark:border-gray-500 top-0 left-0 fixed right-0 z-50'>
      <div className='navbar max-w-6xl mx-auto '>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost lg:hidden dark:text-white'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box z-50 mt-3 w-52 p-2 shadow dark:shadow-gray-700'
            >
              {links}
            </ul>
          </div>
          <Link
            to='/'
            className='text-xl flex items-center justify-center gap-1'
          >
            {/* light mode logo */}
            <img
              src={logoImg}
              alt='logo'
              className='w-15 block dark:hidden md:block'
            />
            {/* dark mode logo */}
            <img
              src={logoImg}
              alt='MaritalDesk logo (dark)'
              className='w-15 hidden dark:block'
            />
            <span className='hidden md:block text-4xl font-light text-orange-600 dark:text-orange-400'>
              |
            </span>
            <span className='hidden md:block font-bold text-2xl text-green-800 dark:text-green-300'>
              MaritalDesk
            </span>
          </Link>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>{links}</ul>
        </div>
        <div className='navbar-end'>
          {/* Theme Toggle Button */}
          <div className='mr-4 hidden md:block'>
            <button
              onClick={handleThemeToggle}
              className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
              aria-label='Toggle theme'
            >
              {theme === 'light' ? (
                <Moon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
              ) : (
                <Sun className='w-5 h-5 text-yellow-400' />
              )}
            </button>
          </div>

          {/* User Profile and Auth */}
          <div>
            {user && user.email ? (
              <div className='profile-dropdown-container relative'>
                {/* Profile Dropdown Trigger */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center gap-2 p-1.5 rounded-full  hover:bg-gray-500 dark:hover:bg-gray-800 transition-all duration-200'
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt='user'
                      referrerPolicy='no-referrer'
                      className='rounded-full w-10 h-10 border-2 border-white dark:border-gray-700 object-cover'
                    />
                  ) : (
                    <FaUserCircle className='w-10 h-10 text-gray-400 dark:text-gray-500' />
                  )}
                  <svg
                    className='w-4 h-4 text-gray-600 dark:text-gray-300'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50'>
                    {/* User Info */}
                    <div className='px-4 py-3 border-b border-gray-100 dark:border-gray-700'>
                      <p className='font-semibold text-gray-800 dark:text-white truncate'>
                        {user.displayName || user.email}
                      </p>
                      <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>
                        {user.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className='py-2'>
                      <Link
                        to='/profile'
                        className='flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors'
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className='w-6 h-6 flex items-center justify-center'>
                          👤
                        </div>
                        <span>Profile</span>
                      </Link>

                      <Link
                        to='/marital-desk/dashboard'
                        className='flex items-center gap-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors'
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className='w-6 h-6 flex items-center justify-center'>
                          📊
                        </div>
                        <span>Dashboard</span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className='flex items-center gap-3 w-full px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors border-t border-gray-100 dark:border-gray-700 mt-2'
                      >
                        <div className='w-6 h-6 flex items-center justify-center'>
                          🚪
                        </div>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to='/login'
                className='btn bg-gradient-to-r from-[#013223] to-[#006747] text-white hover:text-gray-300'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
