import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.scss"; // Reuse login styles for consistency
import Img1 from "src/assets/img/img1.png";
import googleImg from "src/assets/img/google.png";

export default function Register() {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function submit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/register", {
        firstname: form.firstname,
        lastname: form.lastname,
        company: form.company,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center bg-white">
      <div className="row g-0 w-100">

        {/* Left Section (Image) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4 bg-light left-section">
          <img
            src={Img1}
            alt="Dummy Mobile"
            className="img-fluid w-75 w-md-100"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
          <div className="box-1 w-100" style={{ maxWidth: "450px" }}>
            <h2 className="mb-2 heading-1">Create Account</h2>
            <p className="text-muted mb-4 heading-2">
              Register to start using GoDesign
            </p>
            <form onSubmit={submit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-2 mb-md-0">
                  <input
                    type="text"
                    name="firstname"
                    className="form-control input-1"
                    placeholder="First Name"
                    value={form.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lastname"
                    className="form-control input-1"
                    placeholder="Last Name"
                    value={form.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control input-1"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control input-1"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control input-1"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control input-1"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control input-1"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheck"
                    name="terms"
                    checked={form.terms}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="termsCheck" className="small ms-1 terms-label">
                    I agree to the Terms & Privacy
                  </label>
                </div>
              </div>

              {error && <div className="text-danger mb-3 small">{error}</div>}

              <button
                type="submit"
                className="btn btn-primary w-100 btn-1"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="mt-3 small text-center signup-text">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Sign in
              </Link>
            </p>

            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="px-2 text-muted small">or</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-flex justify-content-center">
              <button className="google-login-btn d-flex align-items-center">
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
    </div>
  );
}
