import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./store/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import routes from "./routes";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element: Component, isPrivate }, idx) => (
              <Route
                key={idx}
                path={path}
                element={
                  isPrivate ? (
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
                  ) : (
                    <Component />
                  )
                }
              />
            ))}

            {/* Redirect root to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
