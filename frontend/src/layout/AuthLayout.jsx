import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <div className="auth-content container-fluid d-flex align-items-center justify-content-center py-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
