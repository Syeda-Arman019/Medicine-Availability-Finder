import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "./Home.css";
import "./Terms.css";
import { useTheme } from "../context/ThemeContext";

export default function Terms() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTerm, setActiveTerm] = useState("");

  // Cart and Search States for Header
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`mf-page ${darkMode ? "dark-theme" : ""}`}>
      {/* ---------- TOP BAR: BRAND + SEARCH + CART ---------- */}
      <div className="mf-topbar">
        <div className="container mf-topbar-inner">
          {/* Brand Logo */}
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

          {/* Dark Mode Toggle */}
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

      {/* ---------- NAVBAR ---------- */}
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/medicines">
                  Medicines
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>
          
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Patient Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/faqs">
                  FAQs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        
        </div>
      </nav>

      {/* ---------- TERMS HERO SECTION ---------- */}
      <section className="terms-hero">
        <div className="terms-hero-content">
          <span className="terms-badge">TERMS OF SERVICE</span>
          <h1>
            Policies, Privacy &<span> User Responsibilities</span>
          </h1>
          <p>
            Learn how MediFinder protects your information, manages reservations,
            and ensures a secure medicine search experience.
          </p>
        </div>
      </section>

      {/* ---------- TERMS CARDS SECTION ---------- */}
      <div className="terms-left">
        {/* Acceptance of Terms */}
        <div className={`terms-card ${activeTerm === "acceptance" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>📜</span>
            <h3>Acceptance of Terms</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "acceptance" ? "" : "acceptance")
              }
            >
              {activeTerm === "acceptance" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "acceptance" && (
            <div className="terms-card-content">
              <ul>
                <li>Users must agree to all MediFinder policies before using the platform.</li>
                <li>Continued use of the website indicates acceptance of updated terms.</li>
                <li>Users should regularly review the Terms of Service page.</li>
                <li>MediFinder reserves the right to modify policies when required.</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Accounts */}
        <div className={`terms-card ${activeTerm === "accounts" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>👤</span>
            <h3>User Accounts</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "accounts" ? "" : "accounts")
              }
            >
              {activeTerm === "accounts" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "accounts" && (
            <div className="terms-card-content">
              <ul>
                <li>Users must provide accurate registration information.</li>
                <li>Account credentials should remain confidential.</li>
                <li>Users are responsible for activities performed through their accounts.</li>
                <li>Unauthorized access should be reported immediately.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Privacy Policy */}
        <div className={`terms-card ${activeTerm === "privacy" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>🔒</span>
            <h3>Privacy Policy</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "privacy" ? "" : "privacy")
              }
            >
              {activeTerm === "privacy" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "privacy" && (
            <div className="terms-card-content">
              <ul>
                <li>User information is stored securely.</li>
                <li>Personal data will not be sold to third parties.</li>
                <li>Information is collected only to improve services.</li>
                <li>Security measures are regularly updated to protect users.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Medicine Availability */}
        <div className={`terms-card ${activeTerm === "medicine" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>💊</span>
            <h3>Medicine Availability</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "medicine" ? "" : "medicine")
              }
            >
              {activeTerm === "medicine" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "medicine" && (
            <div className="terms-card-content">
              <ul>
                <li>Medicine stock depends on participating pharmacies.</li>
                <li>Availability information may change without notice.</li>
                <li>Displayed stock is based on the latest available updates.</li>
                <li>MediFinder cannot guarantee stock until pharmacy confirmation.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Reservation Policy */}
        <div className={`terms-card ${activeTerm === "reservation" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>📦</span>
            <h3>Reservation Policy</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "reservation" ? "" : "reservation")
              }
            >
              {activeTerm === "reservation" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "reservation" && (
            <div className="terms-card-content">
              <ul>
                <li>Reservations are requests and not guaranteed purchases.</li>
                <li>Pharmacies may cancel reservations if stock becomes unavailable.</li>
                <li>Users should collect reserved medicines within the specified time.</li>
                <li>Reservation confirmation will depend on pharmacy approval.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Limitation of Liability */}
        <div className={`terms-card ${activeTerm === "liability" ? "active" : ""}`}>
          <div className="terms-card-header">
            <span>⚠️</span>
            <h3>Limitation of Liability</h3>
            <button
              onClick={() =>
                setActiveTerm(activeTerm === "liability" ? "" : "liability")
              }
            >
              {activeTerm === "liability" ? "−" : "+"}
            </button>
          </div>
          {activeTerm === "liability" && (
            <div className="terms-card-content">
              <ul>
                <li>MediFinder provides information for convenience purposes only.</li>
                <li>We are not responsible for pharmacy pricing differences.</li>
                <li>We are not liable for stock inaccuracies or delays.</li>
                <li>Users should verify critical information directly with pharmacies.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ---------- FOOTER ---------- */}
      <footer className="mf-footer">
        <div className="mf-footer-top">
          <div className="mf-feature">
            <span>🚚</span>
            <div>
              <h5>Fast Delivery</h5>
              <p>Medicine reservation made easy</p>
            </div>
          </div>

          <div className="mf-feature">
            <span>💊</span>
            <div>
              <h5>Verified Pharmacies</h5>
              <p>Trusted pharmacy partners</p>
            </div>
          </div>

          <div className="mf-feature">
            <span>📍</span>
            <div>
              <h5>Nearby Search</h5>
              <p>Find medicines around you</p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mf-footer-grid">
            <div className="mf-footer-brand">
              <div className="mf-footer-logo">
                <svg viewBox="0 0 40 40" className="mf-footer-logo-svg">
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
                <h2 className="mf-footer-title">
                  <span className="mf-styled-letter">M</span>edi
                  <span className="mf-styled-letter mf-footer-accent">F</span>inder
                </h2>
              </div>
              <p>
                Helping patients find medicine availability across nearby pharmacies in
                real time.
              </p>
            </div>

            <div>
              <h4>Explore</h4>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/medicines">Medicines</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/faqs">FAQs</Link>
                </li>
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4>Account</h4>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link></li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mf-footer-bottom">
            © {new Date().getFullYear()} MediFinder. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

