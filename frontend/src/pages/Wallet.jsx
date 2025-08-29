import React from 'react'
import { useAuthState } from '../store/AuthContext'
import DefaultLayout from '../layout/DefaultLayout'

export default function Dashboard() {
  const { user } = useAuthState()

  return (
    <DefaultLayout>
      <div className="container">
        <h1 className="text-2xl mb-4">Welcome, {user?.name || 'user'}!</h1>
        <p>This is a protected dashboard. Add charts, cards, and widgets here.</p>
      </div>
    </DefaultLayout>
  )
}
