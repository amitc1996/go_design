import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './store/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Layout from './Layout'

import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import AccountSettings from './pages/AccountSettings'

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/reset" element={<ResetPassword/>} />

          <Route element={<PrivateRoute><Layout/></PrivateRoute>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/account" element={<AccountSettings/>} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
