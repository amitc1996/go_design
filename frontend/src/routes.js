import React from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function lazyWithDelay(factory, ms = 2000) {
  return React.lazy(() =>
    Promise.all([factory(), sleep(ms)]).then(([module]) => module)
  );
}

const routes = [
  { path: "/", name: "Home", element: lazyWithDelay(() => import("./pages/Dashboard"), 1000), isPrivate: true },
  { path: "/dashboard", name: "Dashboard", element: lazyWithDelay(() => import("./pages/Dashboard"), 1000), isPrivate: true },
  { path: "/transactions", name: "Transactions", element: lazyWithDelay(() => import("./pages/Transactions"), 1000), isPrivate: true },
  { path: "/wallet", name: "Wallet", element: lazyWithDelay(() => import("./pages/Wallet"), 2000), isPrivate: true },
  { path: "/settings", name: "Account Settings", element: lazyWithDelay(() => import("./pages/AccountSettings"), 1000), isPrivate: true },
  { path: "/login", name: "Login", element: lazyWithDelay(() => import("./pages/auth/Login"), 500), isPrivate: false },
  { path: "/register", name: "Register", element: lazyWithDelay(() => import("./pages/auth/Register"), 500), isPrivate: false },
  { path: "/forgot-password", name: "Forgot Password", element: lazyWithDelay(() => import("./pages/auth/ForgotPassword"), 500), isPrivate: false },
  { path: "/reset-password", name: "Reset Password", element: lazyWithDelay(() => import("./pages/auth/ResetPassword"), 500), isPrivate: false },
];

export default routes;
