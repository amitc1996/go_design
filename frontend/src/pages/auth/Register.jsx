import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./Login.scss"; // Reuse login styles for consistent look
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
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
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
      alert(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-white">
      <div className="row align-items-center justify-content-center m-4 w-100">
        {/* Left Section */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="left-section d-flex justify-content-center align-items-center p-4 h-100">
            <img src={Img1} alt="Dummy Mobile" className="img-fluid" />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <div className="right-section d-flex justify-content-center align-items-center h-100">
            <div className="login-box">
              <h2>Create Account</h2>
              <p className="subheading-text">Register to start using GoDesign</p>
              <form onSubmit={submit}>
                {/* Firstname & Lastname inline */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstname"
                      className="form-control"
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
                      className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
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
                    <label
                      className="form-check-label terms-label"
                      htmlFor="termsCheck"
                    >
                      I agree to the Terms & Privacy
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-login w-100"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create account"}
                </button>
              </form>
              <p className="mt-3 signup-text">
                Already have an account?{" "}
                <Link to="/login" className="signup-link">
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
    </div>
  );
}
