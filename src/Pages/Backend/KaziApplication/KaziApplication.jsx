import React, { useEffect, useState, use } from 'react'
import { Link, useNavigate } from 'react-router'
import { apiClient } from '../../../config/api'
import { AuthContext } from '../../../Provider/AuthContext'

const KaziApplication = () => {
  const { user } = use(AuthContext)
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const res = await apiClient('api/v1/marital-desk/kazi-applications')
      setApplications(res.applications || [])
    } catch (err) {
      setError('Failed to fetch applications')
      console.log(err)
    }
    setLoading(false)
  }

  const handleEdit = id => {
    navigate(`/marital-desk/kazi-applications/edit/${id}`)
  }

  const handleView = id => {
    navigate(`/marital-desk/kazi-applications/view/${id}`)
  }

  const handleStatus = async id => {
    if (!window.confirm('Are you sure to approve this application?')) return
    try {
      await apiClient(
        `api/v1/marital-desk/kazi-applications/${id}/update-status`,
        'PUT'
      )
      fetchApplications()
    } catch (err) {
      setError('Failed to delete application')
      console.log(err)
    }
  }

  return (
    <main className='flex-1 p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <header className='border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-green-900 dark:text-green-300'>
          Kazi Application
        </h2>
        <button
          className='px-4 py-2 bg-green-700 dark:bg-green-600 text-white rounded hover:bg-green-800 dark:hover:bg-green-700 transition-colors'
          onClick={() => navigate('/marital-desk/kazi-applications/new')}
        >
          Apply
        </button>
      </header>

      {error && (
        <div className='text-red-600 dark:text-red-400 mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded'>
          {error}
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <div className='text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent dark:border-green-300 dark:border-r-transparent'></div>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>
              Loading applications...
            </p>
          </div>
        </div>
      ) : (
        <section>
          <div className='overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700'>
            <table className='w-full text-left border-collapse'>
              <thead className='bg-gradient-to-r from-[#013223] to-[#006747] dark:from-[#013223] dark:to-[#006747] text-white'>
                <tr>
                  <th className='p-3'>#</th>
                  <th className='p-3'>Kazi Name</th>
                  <th className='p-3'>Email</th>
                  <th className='p-3'>Mobile</th>
                  <th className='p-3'>Registration No.</th>
                  <th className='p-3'>Status</th>
                  <th className='p-3 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((req, idx) => (
                  <tr
                    key={req.id}
                    className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-800 dark:text-gray-200'
                  >
                    <td className='p-3'>{idx + 1}</td>
                    <td className='p-3'>{req.name}</td>
                    <td className='p-3'>{req.email}</td>
                    <td className='p-3'>{req.phone}</td>
                    <td className='p-3'>{req.registrationNo}</td>
                    <td className='p-3'>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          req.status === 'approved'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className='p-3 text-center'>
                      <button
                        className='px-3 py-1 bg-yellow-500 dark:bg-yellow-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors'
                        onClick={() => handleView(req.id)}
                      >
                        View
                      </button>
                      {req.status !== 'approved' && (
                        <button
                          className='px-3 ms-2 py-1 bg-green-700 dark:bg-green-600 text-white rounded hover:bg-green-800 dark:hover:bg-green-700 transition-colors'
                          onClick={() => handleEdit(req.id)}
                        >
                          Edit
                        </button>
                      )}
                      {req.status !== 'approved' &&
                        user.role === 'super-admin' && (
                          <button
                            className='px-3 ms-2 py-1 bg-yellow-600 dark:bg-yellow-700 text-white rounded hover:bg-yellow-700 dark:hover:bg-yellow-800 transition-colors'
                            onClick={() => handleStatus(req.id)}
                          >
                            Approve
                          </button>
                        )}
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td
                      colSpan='7'
                      className='p-3 text-center text-gray-600 dark:text-gray-400'
                    >
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  )
}

export default KaziApplication
