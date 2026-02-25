import React, { use, useState, useEffect } from 'react'
import logoImg from '../../assets/maritaldesk-light.png'
import logoDark from '../../assets/maritaldesk.png'
import { AuthContext } from '../../Provider/AuthContext'
import { useNavigate } from 'react-router-dom'
import { User, LogOut, Sun, Moon, Menu } from 'lucide-react'
import { Link } from 'react-router-dom' // Ensure this is 'react-router-dom'

const AdminNavbar = ({ onSidebarToggle }) => {
  const { user, logout } = use(AuthContext)
  const navigate = useNavigate()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
    html.classList.toggle('dark', theme === 'dark') // Important for Tailwind 'dark:' classes
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown-container')) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isProfileOpen])

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileOpen(false)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700   z-40'>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>

          {/* Left section */}
          <div className='flex items-center gap-2'>
            <button
              className='md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none'
              onClick={onSidebarToggle}
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link to='/' className='flex items-center gap-2 shrink-0'>
              {/* Simplified Logo Logic */}
              <img
                src={theme === 'dark' ? logoImg : logoDark}
                alt='MaritalDesk logo'
                className='h-8 w-auto'
              />
              <div className='hidden sm:flex items-center gap-2'>
                <span className='text-2xl font-light text-gray-300 dark:text-gray-600'>|</span>
                <span className='font-bold text-xl tracking-tight text-green-800 dark:text-green-300'>
                  MaritalDesk
                </span>
              </div>
            </Link>
          </div>

          {/* Right section */}
          <div className='flex items-center space-x-2 sm:space-x-4'>
            <button
              onClick={handleThemeToggle}
              className='p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            >
              {theme === 'light' ? <Moon className='w-5 h-5' /> : <Sun className='w-5 h-5 text-yellow-400' />}
            </button>

            <div className='relative profile-dropdown-container'>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className='flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all'
              >
                <div className="relative w-8 h-8">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt='profile'
                      className='rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-700'
                    />
                  ) : (
                    <div className='rounded-full w-8 h-8 bg-gray-200 dark:bg-gray-700 flex items-center justify-center'>
                      <User className='w-4 h-4 text-gray-500' />
                    </div>
                  )}
                </div>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {isProfileOpen && (
                <div className='absolute right-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 py-1 z-50'>
                  <div className='px-4 py-3 border-b border-gray-100 dark:border-gray-700'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>{user?.displayName || 'Admin'}</p>
                    <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>{user?.email}</p>
                  </div>
                  <button onClick={() => { navigate('/marital-desk/profile'); setIsProfileOpen(false); }} className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                    <User className='w-4 h-4' /> Profile
                  </button>
                  <button onClick={() => { navigate('/marital-desk/dashboard'); setIsProfileOpen(false); }} className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' /></svg>
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className='flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 border-t border-gray-100 dark:border-gray-700'>
                    <LogOut className='w-4 h-4' /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar