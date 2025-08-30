import React from "react";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Wallet = React.lazy(() => import("./pages/Wallet"));
const AccountSettings = React.lazy(() => import("./pages/AccountSettings"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const ForgotPassword = React.lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/auth/ResetPassword"));

const routes = [
  { path: "/", name: "Home", element: Login, isPrivate: false },
  { path: "/dashboard", name: "Dashboard", element: Dashboard, isPrivate: true },
  { path: "/wallet", name: "Wallet", element: Wallet, isPrivate: true },
  { path: "/account-settings", name: "Account Settings", element: AccountSettings, isPrivate: true },
  { path: "/login", name: "Login", element: Login, isPrivate: false },
  { path: "/register", name: "Register", element: Register, isPrivate: false },
  { path: "/forgot-password", name: "Forgot Password", element: ForgotPassword, isPrivate: false },
  { path: "/reset-password", name: "Reset Password", element: ResetPassword, isPrivate: false },
];

export default routes;
