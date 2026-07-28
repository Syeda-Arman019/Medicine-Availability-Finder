import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Register() {
  // Password Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Changes Dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Submit Handler connected with Flask Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      alert(data.message || "Request completed!");

      // Reset Form Inputs
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  // Google Sign-In Demo Handler
  const handleGoogleSignIn = () => {
    alert("Google Sign-In functionality coming soon!");
  };

  return (
    <div className="login-page">
      {/* ===== HEADER ===== */}
      <header className="login-header">
        <Link to="/" className="login-logo">
          <span className="login-logo-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" className="mf-logos-svg">
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
            <span className="mf-styled-letter">M</span>ed
            <span className="mf-styled-letter mf-brand-accent">F</span>inder
          </span>
        </Link>

        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </header>

      {/* ===== MAIN SECTION ===== */}
      <section className="login-container">
        {/* ===== LEFT SIDE ===== */}
        <div className="login-left">
          <span className="login-tag">JOIN MEDFINDER TODAY</span>

          <h1>
            Create An
            <br />
            Account
          </h1>

          <p>
            Join MedFinder to search medicines, check real-time availability,
            reserve medicines instantly, and connect with nearby verified
            pharmacies.
          </p>

          {/* ===== FEATURE CARDS ===== */}
          <div className="login-features">
            <Link to="/medicines" className="feature-card-link">
              <div className="feature-card">
                <span>💊</span>
                <h4>Medicine Search</h4>
              </div>
            </Link>

            <Link to="#" className="feature-card-link">
              <div className="feature-card">
                <span>📍</span>
                <h4>Nearby Pharmacies</h4>
              </div>
            </Link>

            <Link to="/medicines" className="feature-card-link">
              <div className="feature-card">
                <span>⚡</span>
                <h4>Fast Reservations</h4>
              </div>
            </Link>

            <Link to="#" className="feature-card-link">
              <div className="feature-card">
                <span>🕒</span>
                <h4>24/7 Availability</h4>
              </div>
            </Link>
          </div>
        </div>

        {/* ===== REGISTER CARD ===== */}
        <div className="login-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="input-group">
              <label htmlFor="reg-name">Full Name</label>
              <input
                id="reg-name"
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Address */}
            <div className="input-group">
              <label htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="input-group">
              <label htmlFor="reg-phone">Phone Number</label>
              <input
                id="reg-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="reg-password">Password</label>
              <div className="password-box">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="reg-confirm-password">Confirm Password</label>
              <div className="password-box">
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login Now</Link>
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="login-footer">
        <div className="login-footer-content">
          <h3 className="footer-logo">
            <svg viewBox="0 0 40 40" className="mf-Footerlogo-svg">
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

            <span className="mf-brand-text">
              <span className="mf-styled-letter">M</span>ed
              <span className="mf-styled-letter mf-brand-accent">F</span>inder
            </span>
          </h3>

          <p>
            Helping patients find medicine availability across nearby pharmacies in
            real time.
          </p>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="#">Contact</Link>
            <Link to="#">FAQs</Link>
          </div>

          <div className="footer-copy">
            © {new Date().getFullYear()} MedFinder. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}