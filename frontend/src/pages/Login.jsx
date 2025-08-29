import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthDispatch, login } from '../store/AuthContext'

export default function Login() {
  const dispatch = useAuthDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(dispatch, { email, password, remember })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Sign in</h2>
        <form onSubmit={submit}>
          <label className="block mb-4">
            <div className="text-sm mb-1">Email</div>
            <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="block mb-4">
            <div className="text-sm mb-1">Password</div>
            <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <label className="flex items-center text-sm mb-4">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2" /> Remember me
          </label>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <button type="submit" className="w-full py-2 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? 'Signing...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-sm flex justify-between">
          <Link to="/forgot">Forgot password?</Link>
          <Link to="/register">Create account</Link>
        </div>
      </div>
    </div>
  )
}
