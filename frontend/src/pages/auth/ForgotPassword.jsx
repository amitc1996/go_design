import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Password.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/forgot", { email });
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="login-block">
        {!sent ? (
          <>
            <h2 className="forgot-title">Forgot password?</h2>
            <p className="forgot-subtitle">
              Enter your details to receive a reset link
            </p>

            <form id="forgotForm" className="w-100" onSubmit={submit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-send"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>

            <Link to="/login" className="back-link">
              &lt; Back to Sign in
            </Link>
          </>
        ) : (
          <>
            <h2 className="forgot-title">Check your email</h2>
            <p className="forgot-subtitle">
              We've sent a password reset link to your email.
            </p>
            <Link to="/login" className="back-link">
              &lt; Back to Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
