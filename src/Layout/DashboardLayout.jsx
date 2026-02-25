import { use, useEffect, useState } from 'react'
import logoImg from '../../assets/MaritalDesk.png'
import logoDark from '../../assets/MaritalDeskLight.png'
import { AuthContext } from '../../Provider/AuthContext'
import { toast } from 'react-toastify'
import { Link, NavLink, Outlet } from 'react-router'
import { Sun, Moon, ScrollText, User, LayoutDashboard } from 'lucide-react'
import { FaWpforms } from 'react-icons/fa'
import { FaListCheck } from 'react-icons/fa6'
import { GrDocumentVerified } from 'react-icons/gr'
import { MdOutlinePayments } from 'react-icons/md'
import useRole from '../hooks/useRole'

const DashboardLayout = () => {
  const { user, logout } = use(AuthContext)
  const { userData } = useRole()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  console.log('user data==>', userData)

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  // Apply theme
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
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='drawer lg:drawer-open max-w-7xl mx-auto'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Navbar */}
        <div className='bg-base-100 dark:bg-gray-900 shadow-lg dark:shadow-gray-800/30 border-b-2 border-gray-200 dark:border-gray-500 '>
          <div className='navbar max-w-6xl mx-auto '>
            <div className='navbar-start'>
              <label
                htmlFor='my-drawer-4'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost'
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2'
                  fill='none'
                  stroke='currentColor'
                  className='my-1.5 inline-block size-4'
                >
                  <path d='M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z'></path>
                  <path d='M9 4v16'></path>
                  <path d='M14 10l2 2l-2 2'></path>
                </svg>
              </label>
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
                {/* dark  */}
                <img
                  src={logoDark}
                  alt='MaritalDesk logo (dark)'
                  className='w-15 hidden dark:block'
                />
                <span className='hidden md:block text-4xl font-light text-orange-600 dark:text-orange-400'>
                  |
                </span>
                <span className='hidden md:block font-bold sm:text-2xl text-green-800 dark:text-green-300'>
                  MaritalDesk
                </span>
              </Link>
            </div>
            <div className='navbar-end'>
              {/* Theme Toggle */}
              <div className='mr-4'>
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
                {userData ? (
                  <div className='profile-dropdown-container relative'>
                    {/* Profile Dropdown Trigger */}
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className='flex items-center gap-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200'
                    >
                      <img
                        src={userData.photoURL || '/default-avatar.png'}
                        alt='user'
                        referrerPolicy='no-referrer'
                        className='rounded-full w-10 h-10 border-2 border-white dark:border-gray-700'
                      />
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
                            to='/dashboard'
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
                    to='/auth/login'
                    className='btn bg-gradient-to-r from-[#013223] to-[#006747] text-white'
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className='bg-base-300 min-h-screen'>
          <Outlet></Outlet>
        </div>
      </div>

      <div className='drawer-side is-drawer-close:overflow-visible'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='flex min-h-full flex-col items-start bg-green-900 dark:bg-gray-700 text-white  shadow-sm is-drawer-close:w-14 is-drawer-open:w-64'>
          {/* Sidebar content here */}
          <ul className='menu w-full grow space-y-3'>
            {/* List item */}
            <li className='hover:text-yellow-400'>
              <Link
                to='/'
                className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                data-tip='Homepage'
              >
                {/* Home icon */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  strokeLinejoin='round'
                  strokeLinecap='round'
                  strokeWidth='2'
                  fill='none'
                  stroke='currentColor'
                  className='my-1.5 inline-block size-4'
                >
                  <path d='M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8'></path>
                  <path d='M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                </svg>
                <span className='is-drawer-close:hidden'>Homepage</span>
              </Link>
            </li>

            {/* Our list items */}
            {/* my content */}
            <NavLink to='/dashboard'>
              <li className='hover:text-yellow-400'>
                <div
                  className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                  data-tip='Dashboard'
                >
                  <div>
                    <LayoutDashboard size={18} />
                  </div>
                  <span className='is-drawer-close:hidden'>Dashboard</span>
                </div>
              </li>
            </NavLink>
            {/* ------------User------------- */}
            {userData.role === 'user' && (
              <>
                {/* form */}
                <NavLink to='/dashboard/marriage-application-form'>
                  <li className='hover:text-yellow-400'>
                    <div
                      className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                      data-tip='Marriage Application'
                    >
                      <div>
                        <FaWpforms size={18} />
                      </div>
                      <span className='is-drawer-close:hidden'>
                        Marriage Application
                      </span>
                    </div>
                  </li>
                </NavLink>
                {/* payment */}
                <NavLink to='/dashboard/payment'>
                  <li className='hover:text-yellow-400'>
                    <div
                      className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                      data-tip='Payment'
                    >
                      <div>
                        <MdOutlinePayments size={18} />
                      </div>
                      <span className='is-drawer-close:hidden'>Payment</span>
                    </div>
                  </li>
                </NavLink>
              </>
            )}

            <NavLink to='/dashboard/marriage-request'>
              <li className='hover:text-yellow-400'>
                <div
                  className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                  data-tip='Marriage Requests'
                >
                  <div>
                    <FaListCheck size={18} />
                  </div>
                  <span className='is-drawer-close:hidden'>
                    Marriage Requests
                  </span>
                </div>
              </li>
            </NavLink>
            <NavLink to='/dashboard/marriage-verification'>
              <li className='hover:text-yellow-400'>
                <div
                  className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                  data-tip='Marriage Verification'
                >
                  <div>
                    <GrDocumentVerified size={18} />
                  </div>
                  <span className='is-drawer-close:hidden'>
                    Marriage Verification
                  </span>
                </div>
              </li>
            </NavLink>

            <NavLink to='/dashboard/marriage-certificate'>
              <li className='hover:text-yellow-400'>
                <div
                  className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                  data-tip='Certificates'
                >
                  <div>
                    <ScrollText className='my-1.5 inline-block size-4' />
                  </div>
                  <span className='is-drawer-close:hidden'>Certificates</span>
                </div>
              </li>
            </NavLink>
            <NavLink to='/dashboard/profile'>
              <li className='hover:text-yellow-400'>
                <div
                  className='is-drawer-close:tooltip is-drawer-close:tooltip-right'
                  data-tip='Profile'
                >
                  <div>
                    <User className='my-1.5 inline-block size-4' />
                  </div>
                  <span className='is-drawer-close:hidden'>Profile</span>
                </div>
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
