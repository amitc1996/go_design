import React from 'react'
import { useAuthState, useAuthDispatch, logout } from '../store/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()

  function doLogout() {
    logout(dispatch)
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between">
        <div className="text-lg font-semibold">GoDesign</div>
        <div className="flex items-center gap-4">
          <div className="text-sm">{user?.name}</div>
          <Link to="/account" className="text-sm underline">
            Account
          </Link>
          <button onClick={doLogout} className="py-1 px-3 rounded bg-red-600 text-white text-sm">
            Sign out
          </button>
        </div>
      </header>

      <main className="p-6 container">
        <h1 className="text-2xl mb-4">Welcome, {user?.name || 'user'}!</h1>
        <p>This is a protected dashboard. Add charts, cards, and widgets here.</p>
      </main>
    </div>
  )
}
