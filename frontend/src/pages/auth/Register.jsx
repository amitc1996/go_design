import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import "./Login.scss"; // Reuse login styles
import Img1 from "src/assets/img/img1.png";
import googleImg from "src/assets/img/google.png";
import logoImg from "src/assets/img/logo2.png";
import AuthLayout from "../../layout/AuthLayout";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);

    try {
      await api.post("/auth/signup", {
        first_name: data.firstname,
        last_name: data.lastname,
        company_name: data.company,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setServerError(err.response?.data?.message || "Register failed");
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
            <div className="text-center">
              <img
                src={logoImg}
                alt="Logo"
                className="mb-2"
                style={{ maxWidth: "180px" }}
              />
              <h2 className="mb-2 heading-1">Create Account</h2>
              <p className="text-muted mb-4 heading-2">
                Register to start using goDesyn
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First + Last Name */}
              <div className="row mb-3">
                <div className="col-md-6 mb-2 mb-md-0">
                  <input
                    type="text"
                    className={`form-control input-1 ${
                      errors.firstname ? "is-invalid" : ""
                    }`}
                    placeholder="First Name"
                    {...register("firstname", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstname && (
                    <div className="invalid-feedback">{errors.firstname.message}</div>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className={`form-control input-1 ${
                      errors.lastname ? "is-invalid" : ""
                    }`}
                    placeholder="Last Name"
                    {...register("lastname", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname.message}</div>
                  )}
                </div>
              </div>

              {/* Company */}
              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control input-1 ${
                    errors.company ? "is-invalid" : ""
                  }`}
                  placeholder="Company Name"
                  {...register("company", { required: "Company name is required" })}
                />
                {errors.company && (
                  <div className="invalid-feedback">{errors.company.message}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <input
                  type="email"
                  className={`form-control input-1 ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email Address"
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

              {/* Phone */}
              <div className="mb-3">
                <input
                  type="tel"
                  className={`form-control input-1 ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Phone must be 10 digits",
                    },
                  })}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control input-1 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Password"
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

              {/* Confirm Password */}
              <div className="mb-3">
                <input
                  type="password"
                  className={`form-control input-1 ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="form-check">
                  <input
                    className={`form-check-input ${
                      errors.terms ? "is-invalid" : ""
                    }`}
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
                    <div className="invalid-feedback d-block">
                      {errors.terms.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Server Error */}
              {serverError && (
                <div className="text-danger mb-3 small">{serverError}</div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 btn-1"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* Already have account */}
            <p className="mt-3 small text-center signup-text">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Sign in
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
              <button
                type="button"
                className="google-login-btn d-flex align-items-center"
              >
                <img
                  src={googleImg}
                  alt="Google logo"
                  className="google-icon me-2"
                />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
