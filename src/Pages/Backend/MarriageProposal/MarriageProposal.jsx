import React, { useEffect, useState, use } from 'react'
import { Link, useNavigate } from 'react-router'
import { apiClient } from '../../../config/api'
import { AuthContext } from '../../../Provider/AuthContext'
import { BASE_URL } from '../../../config/baseUrl'

const MarriageProposal = () => {
  const { user } = use(AuthContext)
  const navigate = useNavigate()
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    setLoading(true)
    try {
      const res = await apiClient('api/v1/marital-desk/marriage-applications')
      setProposals(res.applications || [])
    } catch (err) {
      setError('Failed to fetch proposals')
      console.log(err)
    }
    setLoading(false)
  }

  const handleEdit = id => {
    navigate(`/marital-desk/marriage-proposals/edit/${id}`)
  }

  const handleView = id => {
    navigate(`/marital-desk/marriage-proposals/view/${id}`)
  }

  const handleAccept = async id => {
    if (!window.confirm('Accept this marriage proposal?')) return
    try {
      await apiClient(
        `api/v1/marital-desk/marriage-applications/${id}/update-status`,
        'PUT',
        {
          proposalStatus: 'accepted'
        }
      )
      setSuccessMsg('Proposal accepted successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
      fetchProposals()
    } catch (err) {
      setError('Failed to accept proposal')
      console.log(err)
    }
  }

  const handleReject = async id => {
    if (!window.confirm('Reject this marriage proposal?')) return
    try {
      await apiClient(
        `api/v1/marital-desk/marriage-applications/${id}/update-status`,
        'PUT',
        {
          proposalStatus: 'rejected'
        }
      )
      setSuccessMsg('Proposal rejected!')
      setTimeout(() => setSuccessMsg(''), 3000)
      fetchProposals()
    } catch (err) {
      setError('Failed to reject proposal')
      console.log(err)
    }
  }

  const getStatusBadgeColor = status => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this proposal?'))
      return
    try {
      await apiClient(
        `api/v1/marital-desk/marriage-applications/${id}`,
        'DELETE'
      )
      fetchProposals()
    } catch (err) {
      setError('Failed to delete proposal')
      console.log(err)
    }
  }

  return (
    <main className='flex-1 p-10 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      <header className='border-b border-gray-300 dark:border-gray-700 pb-4 mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-green-900 dark:text-green-300'>
          Marriage Proposals
        </h2>
        <button
          className='px-4 py-2 bg-green-700 dark:bg-green-600 text-white rounded hover:bg-green-800 dark:hover:bg-green-700 transition-colors'
          onClick={() => navigate('/marital-desk/marriage-proposals/new')}
        >
          New Proposal
        </button>
      </header>

      {error && (
        <div className='mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded'>
          {error}
        </div>
      )}

      {successMsg && (
        <div className='mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded'>
          {successMsg}
        </div>
      )}

      {loading ? (
        <div className='flex justify-center items-center py-10'>
          <div className='text-center'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent dark:border-green-300 dark:border-r-transparent'></div>
            <p className='mt-2 text-gray-600 dark:text-gray-400'>
              Loading proposals...
            </p>
          </div>
        </div>
      ) : proposals.length === 0 ? (
        <div className='bg-white dark:bg-gray-800 p-8 rounded-lg shadow dark:shadow-gray-700/50 text-center border border-gray-200 dark:border-gray-700'>
          <p className='text-gray-600 dark:text-gray-400'>
            No marriage proposals found
          </p>
        </div>
      ) : (
        <section>
  <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700/50 border border-gray-200 dark:border-gray-700">
    <table className="min-w-full text-left border-collapse text-xs sm:text-sm">
      <thead className="bg-gradient-to-r from-[#013223] to-[#006747] text-white text-sm sm:text-base">
        <tr>
          <th className="p-2 sm:p-3">#</th>
          <th className="p-2 sm:p-3">Groom</th>
          <th className="p-2 sm:p-3">Bride</th>
          <th className="p-2 sm:p-3 hidden md:table-cell">Kazi</th>
          <th className="p-2 sm:p-3 hidden sm:table-cell">Proposed By</th>
          <th className="p-2 sm:p-3">Proposal Status</th>
          <th className="p-2 sm:p-3 text-center min-w-[240px] sm:min-w-[320px]">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="text-gray-700 dark:text-gray-300">
        {proposals.map((proposal, idx) => {
          const isProposedBy = proposal.proposedBy === user?.id
          const isGroom   = proposal.groomId === user?.id
          const isBride   = proposal.brideId === user?.id
          const canEdit   = isProposedBy && proposal.proposalStatus === 'pending'

          return (
            <tr
              key={proposal.id}
              className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <td className="p-2 sm:p-3">{idx + 1}</td>
              <td className="p-2 sm:p-3 font-medium dark:text-gray-200">{proposal.groomName}</td>
              <td className="p-2 sm:p-3 font-medium dark:text-gray-200">{proposal.brideName}</td>
              <td className="p-2 sm:p-3 hidden md:table-cell dark:text-gray-300">{proposal.kaziName}</td>
              <td className="p-2 sm:p-3 hidden sm:table-cell dark:text-gray-300">{proposal.proposedByName}</td>
              <td className="p-2 sm:p-3">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(
                    proposal.proposalStatus
                  )}`}
                >
                  {proposal.proposalStatus}
                </span>
              </td>
              <td className="p-2 sm:p-3">
                <div className="flex flex-wrap gap-2 justify-center items-center">
                  <button
                    className="px-3 py-1.5 bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 text-xs sm:text-sm font-medium transition-colors min-w-[70px]"
                    onClick={() => handleView(proposal.id)}
                  >
                    View
                  </button>

                  {canEdit && (
                    <>
                      <button
                        className="px-3 py-1.5 bg-yellow-500 dark:bg-yellow-600 text-white rounded hover:bg-yellow-600 dark:hover:bg-yellow-500 text-xs sm:text-sm font-medium transition-colors min-w-[70px]"
                        onClick={() => handleEdit(proposal.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1.5 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 text-xs sm:text-sm font-medium transition-colors min-w-[70px]"
                        onClick={() => handleDelete(proposal.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}

                  {(isBride || isGroom) && !isProposedBy && proposal.proposalStatus === 'pending' && (
                    <>
                      <button
                        className="px-3 py-1.5 bg-green-700 dark:bg-green-800 text-white rounded hover:bg-green-800 dark:hover:bg-green-700 text-xs sm:text-sm font-medium transition-colors min-w-[70px]"
                        onClick={() => handleAccept(proposal.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-3 py-1.5 bg-red-600 dark:bg-red-700 text-white rounded hover:bg-red-700 dark:hover:bg-red-600 text-xs sm:text-sm font-medium transition-colors min-w-[70px]"
                        onClick={() => handleReject(proposal.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</section>
      )}
    </main>
  )
}

export default MarriageProposal
