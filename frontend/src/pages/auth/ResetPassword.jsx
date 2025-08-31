import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Password.scss";
import logoImg from "src/assets/img/logo2.png";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // assuming token comes from query param
      const token = new URLSearchParams(window.location.search).get("token");
      if (!token) {
        alert("Invalid or missing reset token");
        return;
      }

      await api.post("/auth/reset", { email, token, password });
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
       <div className="d-flex flex-column align-items-center">
              {/* Logo OUTSIDE card */}
              <img
                src={logoImg}
                alt="Logo"
                className="mb-4"
                style={{ maxWidth: "180px" }}
              />
      <div className="login-block">
        <h2 className="forgot-title">Reset password</h2>
        <p className="forgot-subtitle">
          Enter your email and new password to continue
        </p>

        <form className="w-100" onSubmit={submit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control input-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control input-1"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control input-1"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-send" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <Link to="/login" className="back-link">
          &lt; Back to Sign in
        </Link>
      </div>
    </div>
    </div>
  );
}
