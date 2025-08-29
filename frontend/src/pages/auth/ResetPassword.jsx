import React, { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/auth/reset', { token, password })
      alert('Password reset successful')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Reset password</h2>
        <form onSubmit={submit}>
          <label className="block mb-4">
            <div className="text-sm mb-1">Reset token</div>
            <input className="w-full border rounded px-3 py-2" value={token} onChange={(e) => setToken(e.target.value)} required />
          </label>

          <label className="block mb-4">
            <div className="text-sm mb-1">New password</div>
            <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <button type="submit" className="w-full py-2 rounded bg-indigo-600 text-white" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  )
}
