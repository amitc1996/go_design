import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/auth/register', { name, email, password })
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Register failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Create account</h2>
        <form onSubmit={submit}>
          <label className="block mb-4">
            <div className="text-sm mb-1">Full name</div>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label className="block mb-4">
            <div className="text-sm mb-1">Email</div>
            <input className="w-full border rounded px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className="block mb-4">
            <div className="text-sm mb-1">Password</div>
            <input className="w-full border rounded px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <button type="submit" className="w-full py-2 rounded bg-green-600 text-white" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  )
}
