import React, { Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./store/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import Layout from "./Layout"
import routes from "./routes"

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element, exact }, idx) => (
              <Route
                key={idx}
                path={path}
                element={React.createElement(element)}
                exact={exact}
              />
            ))}

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}
