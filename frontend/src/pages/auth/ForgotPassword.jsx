import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";

import "./Password.scss";
import AuthLayout from "../../layout/AuthLayout";
import Img1 from "src/assets/img/img1.png";
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
    <AuthLayout>
      <div className="row g-0 w-100">
        {/* Left Section */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4 bg-light left-section">
          <img src={Img1} alt="Dummy Mobile" className="img-fluid w-75 w-md-100" />
        </div>

        {/* Right Section */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="box-1 w-100">
            <div className="text-center mb-4">
              <img src={logoImg} alt="Logo" className="mb-2" style={{ maxWidth: "180px" }} />
              <h2 className="mb-2 heading-1">Forgot Password</h2>
              <p className="text-muted mb-4 heading-2">
                Enter your email to receive a password reset link
              </p>
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <input
                    type="email"
                    id="email"
                    className={`form-control input-1 ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email address"
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

                {error && <div className="text-danger mb-3 small">{error}</div>}

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-1"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send reset link"}
                </button>

                <p className="mt-3 small text-center">
                  <Link to="/login" className="fw-semibold text-decoration-none">
                    Back to sign in
                  </Link>
                </p>
              </form>
            ) : (
              <div className="text-center">
                <h4 className="mb-2">Check your email</h4>
                <p className="text-muted mb-3">
                  We’ve sent a password reset link to your email.
                </p>
                <Link to="/login" className="btn btn-info">
                  Back to sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
