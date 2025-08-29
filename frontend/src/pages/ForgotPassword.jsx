import React, { useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/auth/forgot', { email })
      setSent(true)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Forgot password</h2>
        {!sent ? (
          <form onSubmit={submit}>
            <label className="block mb-4">
              <div className="text-sm mb-1">Email</div>
              <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <button type="submit" className="w-full py-2 rounded bg-yellow-600 text-white" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        ) : (
          <div>
            <p>We've sent a password reset link to your email (simulated).</p>
            <div className="mt-3">
              <Link to="/login" className="underline">Return to login</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
