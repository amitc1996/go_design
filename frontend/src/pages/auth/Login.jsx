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
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-white">
      <div className="row align-items-center justify-content-center m-4 w-100">
        {/* Left Section */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="left-section d-flex justify-content-center align-items-center p-4 h-100">
            <img src={Img1} alt="Dummy Mobile" className="img-fluid login-img1" />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <div className="right-section d-flex justify-content-center align-items-center h-100">
            <div className="login-box">
              <h2>Get Started Now</h2>
              <p className="subheading-text">Login into your account to continue</p>

              <form onSubmit={submit}>
                <div className="mb-3">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
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
                    className="form-control"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
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
                    />
                    <span className="small terms-label">I agree to the Terms & Privacy</span>
                  </div>
                  <Link to="/forgot" className="forgot-password">Forgot Password?</Link>
                </div>

                {error && <div className="text-red-600 mb-3">{error}</div>}

                <button type="submit" className="btn btn-login w-100" disabled={loading}>
                  {loading ? "Signing..." : "Log in"}
                </button>
              </form>

              <p className="mt-3 signup-text">
                Don't have an account?{" "}
                <Link to="/register" className="signup-link">Sign up</Link>
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
