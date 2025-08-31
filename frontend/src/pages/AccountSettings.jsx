import React, { useState } from "react";
import { useAuthState, useAuthDispatch } from "../store/AuthContext";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import "./AccountSettings.scss";
import "./Dashboard.scss";

export default function AccountSettings() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const [basicInfo, setBasicInfo] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    companyName: user?.company_name || "",
    phone: user?.phone || "",
  });

  const [email, setEmail] = useState(user?.email || "");
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Handlers
  const handleBasicChange = (e) =>
    setBasicInfo({ ...basicInfo, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  // API calls
  async function updateBasicInfo(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/me/basic", basicInfo);
      dispatch({ type: "UPDATE_USER", payload: res.data.user });
      alert("Basic info updated");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function updateEmail(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put("/me/email", { email });
      dispatch({ type: "UPDATE_USER", payload: res.data.user });
      alert("Email updated");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function updatePassword(e) {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return alert("New password and confirm password do not match");
    }
    setLoading(true);
    try {
      await api.put("/me/password", passwords);
      alert("Password updated");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="container account-settings">
        <h2 className="mb-4">Account Settings</h2>
        <div className="row g-4">
          {/* Basic Info Card */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h4 className="mb-0">Basic Info</h4>
              </div>
              <form className="card-body" onSubmit={updateBasicInfo}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-control"
                    name="firstName"
                    value={basicInfo.firstName}
                    onChange={handleBasicChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-control"
                    name="lastName"
                    value={basicInfo.lastName}
                    onChange={handleBasicChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    className="form-control"
                    name="companyName"
                    value={basicInfo.companyName}
                    onChange={handleBasicChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    className="form-control"
                    name="phone"
                    value={basicInfo.phone}
                    onChange={handleBasicChange}
                  />
                </div>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>

          {/* Email Card */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h4 className="mb-0">Change Email</h4>
              </div>
              <form className="card-body" onSubmit={updateEmail}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Update Email"}
                </button>
              </form>
            </div>
          </div>

          {/* Password Card */}
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h4 className="mb-0">Change Password</h4>
              </div>
              <form className="card-body" onSubmit={updatePassword}>
                <div className="mb-3">
                  <label className="form-label">Old Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="oldPassword"
                    value={passwords.oldPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Saving..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
