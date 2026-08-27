import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  Trash2,
  LogOut,
  Save,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

import "./Home.css";
import "./AccountSettings.css";
import { useTheme } from "../context/ThemeContext";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Load user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  // Profile Form States
  const [profileData, setProfileData] = useState({
    fullName: storedUser?.full_name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    country: storedUser?.country || "",
    location: storedUser?.location || "",
  });

  // Password Form State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password Visibility States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification Preferences State (Marketing Emails Removed)
  const [notifications, setNotifications] = useState({
    emailAlerts: storedUser?.email_alerts ?? true,
    securityAlerts: storedUser?.security_alerts ?? true,
  });

  // Delete Account States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  // Clear messages when switching tabs
  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [activeTab]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Notification Toggle Handler
  const handleNotificationToggle = async (key) => {
    const previousState = { ...notifications };
    const updatedNotifications = {
      ...notifications,
      [key]: !notifications[key],
    };

    setNotifications(updatedNotifications);

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser?.user_id) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/update-notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          email_alerts: updatedNotifications.emailAlerts,
          security_alerts: updatedNotifications.securityAlerts,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...currentUser,
          email_alerts: updatedNotifications.emailAlerts,
          security_alerts: updatedNotifications.securityAlerts,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMessage("Notification preferences saved.");
        setTimeout(() => setSuccessMessage(""), 2500);
      } else {
        setNotifications(previousState);
        setErrorMessage(data.error || "Failed to update notification preferences.");
      }
    } catch (error) {
      console.error("Notification update error:", error);
      setNotifications(previousState);
      setErrorMessage("Unable to save settings. Check if backend server is running.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Profile Update Handler
  const handleSave = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!currentUser?.user_id) {
      alert("User session not found. Please login again.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          full_name: profileData.fullName,
          email: profileData.email,
          phone: profileData.phone,
          country: profileData.country,
          location: profileData.location,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...currentUser,
          full_name: profileData.fullName,
          email: profileData.email,
          phone: profileData.phone,
          country: profileData.country,
          location: profileData.location,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setSuccessMessage("Your profile details have been updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(data.error || data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setErrorMessage("Unable to connect to server. Please make sure Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  // Password Change Handler
  const handlePasswordSave = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    if (!currentUser?.user_id) {
      alert("User session not found. Please login again.");
      navigate("/login");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Your password has been changed successfully!");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(data.error || data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Password change error:", error);
      setErrorMessage("Unable to connect to server. Please make sure Flask is running.");
    } finally {
      setLoading(false);
    }
  };

  // Account Delete Handler
  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser?.user_id) return;

    if (!deletePassword) {
      setErrorMessage("Please enter your password to confirm deletion.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://127.0.0.1:5000/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: currentUser.user_id,
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("user");
        alert("Your account has been permanently deleted.");
        navigate("/login");
      } else {
        setErrorMessage(data.error || "Failed to delete account. Check your password.");
      }
    } catch (error) {
      console.error("Delete account error:", error);
      setErrorMessage("Server error during account deletion.");
    } finally {
      setLoading(false);
    }
  };

  const avatarInitial = profileData.fullName
    ? profileData.fullName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className={`mf-page ${darkMode ? "dark-theme" : ""}`}>
      {/* Top Bar */}
      <div className="mf-topbar">
        <div className="container mf-topbar-inner">
          <Link to="/" className="mf-brand">
            <span className="mf-logo" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="mf-logo-svg">
                <rect
                  x="4"
                  y="16"
                  width="32"
                  height="8"
                  rx="4"
                  transform="rotate(-45 20 20)"
                  fill="#7ccbe6"
                />
                <rect
                  x="20"
                  y="16"
                  width="16"
                  height="8"
                  rx="4"
                  transform="rotate(-45 20 20)"
                  fill="#d1f3ed"
                />
              </svg>
            </span>
            <span className="mf-brand-text">
              <span className="mf-styled-letter">M</span>edi
              <span className="mf-styled-letter mf-brand-accent">F</span>inder
            </span>
          </Link>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg mf-navbar">
        <div className="container mf-navbar-inner">
          <button
            className="navbar-toggler mf-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mfNav"
            aria-controls="mfNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mfNav">
            <ul className="navbar-nav mf-nav-links">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicines">Medicines</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Patient Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faqs">FAQs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/settings">Account Settings</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-4 settings-body-content">
        {successMessage && (
          <div className="alert alert-success d-flex align-items-center gap-2 mb-4 rounded-3" role="alert">
            <CheckCircle size={18} /> {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="alert alert-danger d-flex align-items-center gap-2 mb-4 rounded-3" role="alert">
            <AlertCircle size={18} /> {errorMessage}
          </div>
        )}

        <div className="row g-4">
          {/* Navigation Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div className="settings-card p-3 mb-3 text-center">
              <div className="settings-avatar mb-2">{avatarInitial}</div>
              <h6 className="mb-0 fw-bold">{profileData.fullName || "User"}</h6>
              <small className="text-muted">{profileData.email}</small>
            </div>

            <div className="settings-nav-container d-flex flex-column gap-2">
              <button
                type="button"
                className={`settings-nav-pill ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} /> Profile Info
              </button>
              <button
                type="button"
                className={`settings-nav-pill ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <Lock size={18} /> Security
              </button>
              <button
                type="button"
                className={`settings-nav-pill ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={18} /> Notifications
              </button>
              <button
                type="button"
                className={`settings-nav-pill ${activeTab === "danger" ? "active-danger" : ""}`}
                onClick={() => setActiveTab("danger")}
              >
                <Trash2 size={18} /> Danger Zone
              </button>
            </div>
          </div>

          {/* Active Tab Panel */}
          <div className="col-lg-9 col-md-8">
            <div className="settings-card p-4">
              
              {/* TAB 1: PROFILE */}
              {activeTab === "profile" && (
                <div>
                  <h4 className="fw-bold mb-1">Profile Information</h4>
                  <p className="text-muted mb-4 small">Update your personal details.</p>

                  <form onSubmit={handleSave}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          name="country"
                          value={profileData.country}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>

                    <div className="mt-4 d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary rounded-pill px-4"
                        disabled={loading}
                      >
                        <Save size={16} className="me-2" />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger rounded-pill px-3"
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="me-1" /> Logout
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: SECURITY */}
              {activeTab === "security" && (
                <div>
                  <h4 className="fw-bold mb-1">Password & Security</h4>
                  <p className="text-muted mb-4 small">Change your account password below.</p>
                  
                  <form onSubmit={handlePasswordSave}>
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          className="form-control"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                        >
                          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          className="form-control"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          aria-label={showNewPassword ? "Hide password" : "Show password"}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Confirm New Password</label>
                      <div className="password-input-wrapper">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="password-toggle-btn"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary rounded-pill px-4"
                      disabled={loading}
                    >
                      <Save size={16} className="me-2" />
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS (Marketing Emails Toggle Removed) */}
              {activeTab === "notifications" && (
                <div>
                  <h4 className="fw-bold mb-1">Notification Preferences</h4>
                  <p className="text-muted mb-4 small">Manage your notification alerts and preferences.</p>

                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded-3">
                      <div>
                        <h6 className="mb-0 fw-bold">Email Alerts</h6>
                        <small className="text-muted">Receive notifications about reservations & orders</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={notifications.emailAlerts}
                          onChange={() => handleNotificationToggle("emailAlerts")}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between p-3 border rounded-3">
                      <div>
                        <h6 className="mb-0 fw-bold">Security Alerts</h6>
                        <small className="text-muted">Get notified about logins from new devices</small>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={notifications.securityAlerts}
                          onChange={() => handleNotificationToggle("securityAlerts")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DANGER ZONE */}
              {activeTab === "danger" && (
                <div>
                  <h4 className="fw-bold text-danger mb-1">Danger Zone</h4>
                  <p className="text-muted mb-4 small">Irreversible and destructive actions.</p>

                  <div className="border border-danger border-opacity-25 rounded-3 p-4 bg-danger bg-opacity-10">
                    <div className="d-flex align-items-center gap-2 text-danger mb-2">
                      <AlertTriangle size={20} />
                      <h6 className="mb-0 fw-bold">Delete Account</h6>
                    </div>
                    <p className="small text-muted mb-3">
                      Once you delete your account, there is no going back. All your saved data, reservations, and history will be permanently deleted.
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger rounded-pill"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      Delete My Account
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                  <AlertTriangle size={22} /> Delete Account Permanently
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletePassword("");
                  }}
                ></button>
              </div>
              <form onSubmit={handleDeleteAccount}>
                <div className="modal-body">
                  <p className="small text-muted">
                    This action **cannot** be undone. Enter your current password to confirm permanent account deletion.
                  </p>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showDeletePassword ? "text" : "password"}
                        className="form-control"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={() => setShowDeletePassword(!showDeletePassword)}
                      >
                        {showDeletePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-pill"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletePassword("");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger rounded-pill"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;