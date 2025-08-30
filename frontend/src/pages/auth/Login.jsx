import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch, login } from "../../store/AuthContext";
import { useForm } from "react-hook-form";
import "./Login.scss";
import Img1 from "src/assets/img/img1.png";
import googleImg from "src/assets/img/google.png";

export default function Login() {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);

    try {
      await login(dispatch, {
        email: data.email,
        password: data.password,
        remember: true,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center bg-white">
      <div className="row g-0 w-100">
        {/* Left Section (Image) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4 bg-light left-section">
          <img src={Img1} alt="Dummy Mobile" className="img-fluid w-75 w-md-100" />
        </div>

        {/* Right Section (Form) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="box-1 w-100" style={{ maxWidth: "400px" }}>
            <h2 className="mb-2 heading-1">Get Started Now</h2>
            <p className="text-muted mb-4 heading-2">Login into your account to continue</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
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

              {/* Password */}
              <div className="mb-2">
                <input
                  type="password"
                  id="password"
                  className={`form-control input-1 ${errors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password.message}</div>
                )}
              </div>

              {/* Terms & Forgot password */}
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="form-check">
                  <input
                    className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
                    type="checkbox"
                    id="termsCheck"
                    {...register("terms", {
                      required: "You must agree to the Terms & Privacy",
                    })}
                  />
                  <label htmlFor="termsCheck" className="small ms-1 terms-label">
                    I agree to the Terms & Privacy
                  </label>
                  {errors.terms && (
                    <div className="invalid-feedback d-block">{errors.terms.message}</div>
                  )}
                </div>

                <Link
                  to="/forgot"
                  className="small text-decoration-none mt-2 mt-sm-0 forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Server error */}
              {error && <div className="text-danger mb-3 small">{error}</div>}

              {/* Submit */}
              <button type="submit" className="btn btn-primary w-100 btn-1" disabled={loading}>
                {loading ? "Signing..." : "Log in"}
              </button>
            </form>

            <p className="mt-3 small text-center signup-text">
              Don't have an account?{" "}
              <Link to="/register" className="fw-semibold text-decoration-none">
                Sign up
              </Link>
            </p>

            {/* Divider */}
            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="px-2 text-muted small">or</span>
              <hr className="flex-grow-1" />
            </div>

            {/* Google login */}
            <div className="d-flex justify-content-center">
              <button type="button" className="google-login-btn d-flex align-items-center">
                <img src={googleImg} alt="Google logo" className="google-icon me-2" />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
