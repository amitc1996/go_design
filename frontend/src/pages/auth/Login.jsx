import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthDispatch, login } from "../../store/AuthContext";
import "./Login.scss";
import Img1 from "src/assets/img/img1.png";
import googleImg from "src/assets/img/google.png";

export default function Login() {
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", terms: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(dispatch, { email: form.email, password: form.password, remember: true });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          <div className="box-1 w-100" style={{ maxWidth: "400px" }}>
            <h2 className="mb-2 heading-1">Get Started Now</h2>
            <p className="text-muted mb-4 heading-2">Login into your account to continue</p>
            <form onSubmit={submit}>
              <div className="mb-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control input-1"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control input-1"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
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
                  />
                  <label htmlFor="termsCheck" className="small ms-1 terms-label">
                    I agree to the Terms & Privacy
                  </label>
                </div>
                <Link to="/forgot" className="small text-decoration-none mt-2 mt-sm-0 forgot-password">
                  Forgot Password?
                </Link>
              </div>

              {error && <div className="text-danger mb-3 small">{error}</div>}

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
