import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import "./Password.scss";
import logoImg from "src/assets/img/logo2.png";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/forgot-password", { email: data.email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

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

        {/* Card */}
        <div className="login-block">
          {!sent ? (
            <>
              <h2 className="forgot-title">Forgot password?</h2>
              <p className="forgot-subtitle">
                Enter your email to receive a reset link
              </p>

              <form id="forgotForm" className="w-100" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <input
                    type="email"
                    className={`form-control input-1 ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                {error && <div className="text-danger small mb-2">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-send w-100"
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
              <div className="alert alert-success">
                We've sent a password reset link to your email.
              </div>
              <Link to="/login" className="back-link">
                &lt; Back to Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
