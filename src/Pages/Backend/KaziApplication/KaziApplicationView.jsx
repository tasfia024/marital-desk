import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { apiClient } from '../../../config/api'
import { BASE_URL } from '../../../config/baseUrl'

const KaziApplicationView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [kazi, setKazi] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    apiClient(`api/v1/marital-desk/kazi-applications/${id}`)
      .then(res => setKazi(res.application))
      .catch(() => setError('Failed to fetch Kazi information'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className='p-10'>Loading...</div>
  if (error) return <div className='p-10 text-red-600'>{error}</div>
  if (!kazi) return <div className='p-10'>No data found.</div>

  return (
    <main className='flex-1 p-4 sm:p-6 lg:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <header className='border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <h2 className='text-2xl font-bold text-green-900 dark:text-green-300'>
          Kazi Application Details
        </h2>
        <button
          className='px-4 py-2 bg-gray-300 dark:bg-gray-700 text-green-900 dark:text-green-300 rounded font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto'
          onClick={() => navigate('/marital-desk/kazi-applications')}
        >
          Back
        </button>
      </header>

      <section className='bg-white dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg dark:shadow-gray-900 w-full border border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8'>
          <div className='w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-green-700 dark:border-green-500 bg-gray-100 dark:bg-gray-700 flex items-center justify-center'>
            {kazi?.kaziUser?.image ? (
              <img
                src={`${BASE_URL}${kazi.kaziUser.image}`}
                alt='Kazi'
                crossOrigin='anonymous'
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-gray-400 dark:text-gray-500 text-sm'>
                No Photo
              </span>
            )}
          </div>
          <div className='flex-1 text-center md:text-left'>
            <h3 className='text-xl font-bold text-green-800 dark:text-green-300 mb-2'>
              {kazi.name}
            </h3>
            <div className='text-gray-700 dark:text-gray-300 mb-1'>
              <span className='font-semibold'>Registration No:</span>
              <span className='text-gray-900 dark:text-white ml-1'>
                {kazi.registrationNo}
              </span>
            </div>
            <div className='text-gray-700 dark:text-gray-300 mb-1'>
              <span className='font-semibold'>Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded text-sm ${
                  kazi.status === 'pending'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                }`}
              >
                {kazi.status}
              </span>
            </div>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden'>
            <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300 w-1/3'>
                  Father's Name
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.fatherName}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Mother's Name
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.motherName}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Date of Birth
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.dateOfBirth
                    ? new Date(kazi.dateOfBirth).toLocaleDateString()
                    : '-'}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Gender
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.gender}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Religion
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.religion}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Email
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300 break-all'>
                  {kazi.email}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Mobile
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.phone}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  NID Number
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.nid}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  District
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.district}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Upazila
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.upazila}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Present Address
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.address}
                </td>
              </tr>
              <tr className='bg-white dark:bg-gray-800'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Office Address
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi.officeAddress}
                </td>
              </tr>
              <tr className='bg-gray-50 dark:bg-gray-700/50'>
                <td className='p-3 font-medium text-green-900 dark:text-green-300'>
                  Signature
                </td>
                <td className='p-3 text-gray-900 dark:text-gray-300'>
                  {kazi?.kaziUser?.signature ? (
                    <img
                      src={`${BASE_URL}${kazi.kaziUser.signature}`}
                      alt='Kazi Signature'
                      crossOrigin='anonymous'
                      className='h-16 sm:h-18 w-auto max-w-full mb-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-700 p-1'
                    />
                  ) : (
                    <span className='text-gray-400 dark:text-gray-500'>
                      No Signature
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default KaziApplicationView
