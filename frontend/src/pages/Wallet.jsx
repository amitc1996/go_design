import React from 'react'
import { useAuthState } from '../store/AuthContext'
import MainLayout from '../layout/MainLayout'

export default function Dashboard() {
  const { user } = useAuthState()

  return (
    <MainLayout>
      <div className="container">
        <h1 className="text-2xl mb-4">Welcome, {user?.name || 'user'}!</h1>
        <p>This is a protected dashboard. Add charts, cards, and widgets here.</p>
      </div>
    </MainLayout>
  )
}
