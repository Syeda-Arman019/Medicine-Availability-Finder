import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
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
        <div className="login-left">
          <span className="login-tag">MEDICINE AVAILABILITY FINDER</span>

          <h1>
            Welcome Back
            <br />
            To MedFinder
          </h1>

          <p>
            Login to search medicines, check availability, reserve medicines and
            connect with nearby verified pharmacies in real-time.
          </p>

          {/* ===== FEATURE CARDS WITH UPDATED LINKS ===== */}
          <div className="login-features">
            {/* Medicine Search */}
            <Link to="/medicines" className="feature-card-link">
              <div className="feature-card">
                <span>💊</span>
                <h4>Medicine Search</h4>
              </div>
            </Link>

            {/* Nearby Pharmacies - Dummy Link */}
            <Link to="#" className="feature-card-link">
              <div className="feature-card">
                <span>📍</span>
                <h4>Nearby Pharmacies</h4>
              </div>
            </Link>

            {/* Fast Reservations */}
            <Link to="/medicines" className="feature-card-link">
              <div className="feature-card">
                <span>⚡</span>
                <h4>Fast Reservations</h4>
              </div>
            </Link>

            {/* 24/7 Availability - Dummy Link */}
            <Link to="#" className="feature-card-link">
              <div className="feature-card">
                <span>🕒</span>
                <h4>24/7 Availability</h4>
              </div>
            </Link>
          </div>
        </div>

        <div className="login-card">
          <h2>Login Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>

              <div className="password-box">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            <div className="login-options">
              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <button type="button" className="google-btn">
            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/register">Register Now</Link>
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