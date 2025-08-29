import React, { useState } from 'react'
import { useAuthState, useAuthDispatch } from '../store/AuthContext'
import api from '../services/api'

export default function AccountSettings() {
  const { user } = useAuthState()
  const dispatch = useAuthDispatch()
  const [name, setName] = useState(user?.name || '')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.put('/me', { name })
      dispatch({ type: 'UPDATE_USER', payload: res.data.user })
      alert('Profile updated')
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Account settings</h2>
        <form onSubmit={submit}>
          <label className="block mb-4">
            <div className="text-sm mb-1">Full name</div>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <button type="submit" className="py-2 px-4 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
