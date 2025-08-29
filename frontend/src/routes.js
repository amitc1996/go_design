import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Wallet = React.lazy(() => import('./pages/Wallet'))
const AccountSettings = React.lazy(() => import('./pages/AccountSettings'))
const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Login },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/wallet', name: 'Wallet', element: Wallet },
  { path: '/account-settings', name: 'Account Settings', element: AccountSettings },
  { path: '/login', name: 'Login', element: Login },
  { path: '/register', name: 'Register', element: Register },
  { path: '/forgot-password', name: 'Forgot Password', element: ForgotPassword },
  { path: '/reset-password', name: 'Reset Password', element: ResetPassword },
]

export default routes