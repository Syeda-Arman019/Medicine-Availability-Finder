import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import "./Home.css"; // Shared styles for Header and Footer

import ourStoryImage from "../assets/images/our-story.png";
import missionImage from "../assets/images/our-mission.png";
import visionImage from "../assets/images/our-vision.png";
import aboutBanner from "../assets/images/about-banner.png";

export default function About() {
  return (
    <div className="mf-page about-page">
      {/* ================= TOP BAR (WITHOUT SEARCH & CART) ================= */}
      <div className="mf-topbar">
        <div className="container mf-topbar-inner">
          <Link to="/" className="mf-brand">
            <span className="mf-logo" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="mf-logo-svg">
                <rect x="4" y="16" width="32" height="8" rx="4" transform="rotate(-45 20 20)" fill="#7ccbe6" />
                <rect x="20" y="16" width="16" height="8" rx="4" transform="rotate(-45 20 20)" fill="#d1f3ed" />
              </svg>
            </span>
            <span className="mf-brand-text">
              <span className="mf-styled-letter">M</span>ed<span className="mf-styled-letter mf-brand-accent">F</span>inder
            </span>
          </Link>
        </div>
      </div>

      {/* ================= NAVBAR (WITHOUT CREATE ACCOUNT BUTTON) ================= */}
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
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/medicines">Medicines</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login / Register</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Patient Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/faqs">FAQs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= ABOUT BANNER ================= */}
      <header className="mf-banner">
        <div className="container">
          <img
            src={aboutBanner}
            alt="About MedFinder"
            className="mf-banner-img"
          />
        </div>
      </header>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-tag">
              WHY CHOOSE US
            </span>

            <h2>
              Why People Trust MedFinder
            </h2>

            <p>
              We make medicine searching faster, easier and more reliable
              by connecting patients with trusted nearby pharmacies.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">💊</div>
              <h4>Live Availability</h4>
              <p>
                Check medicine stock instantly before visiting any pharmacy.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">🏥</div>
              <h4>Verified Pharmacies</h4>
              <p>
                Search medicines from trusted and registered pharmacies.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">📍</div>
              <h4>Nearby Search</h4>
              <p>
                Find medicines available at pharmacies near your location.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon">⚡</div>
              <h4>Fast Results</h4>
              <p>
                Get accurate medicine availability within seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            {/* Mission */}
            <div className="mission-card">
              <div className="mission-image">
                <img
                  src={missionImage}
                  alt="Our Mission"
                  className="mission-img"
                />
              </div>

              <div className="mission-content">
                <span className="section-tag">
                  OUR MISSION
                </span>

                <h2>
                  Making Healthcare More Accessible
                </h2>

                <p>
                  Our mission is to simplify medicine searching by connecting
                  patients with trusted pharmacies through one reliable platform.
                  We help users quickly find medicines without unnecessary delays.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="mission-card reverse">
              <div className="mission-content">
                <span className="section-tag">
                  OUR VISION
                </span>

                <h2>
                  A Smarter Healthcare Future
                </h2>

                <p>
                  We aim to build a digital healthcare ecosystem where everyone
                  can easily find medicines anytime, anywhere through trusted
                  pharmacy partners.
                </p>
              </div>

              <div className="mission-image">
                <img
                  src={visionImage}
                  alt="Our Vision"
                  className="vision-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="container cta-box">
          <div>
            <h2>Can't Find Your Medicine?</h2>

            <p>
              Search thousands of medicines available in nearby pharmacies
              with MedFinder.
            </p>
          </div>

          <Link
            to="/medicines"
            className="cta-btn"
          >
            Search Now
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
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
                  <rect x="4" y="16" width="32" height="8" rx="4" transform="rotate(-45 20 20)" fill="#7ccbe6" />
                  <rect x="20" y="16" width="16" height="8" rx="4" transform="rotate(-45 20 20)" fill="#d1f3ed" />
                </svg>
                <h2 className="mf-footer-title">
                  <span className="mf-styled-letter">M</span>ed<span className="mf-styled-letter mf-footer-accent">F</span>finder
                </h2>
              </div>
              <p>
                Helping patients find medicine availability across nearby
                pharmacies in real time.
              </p>
            </div>

            <div>
              <h4>Explore</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/medicines">Medicines</Link></li>
                <li><Link to="/about">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/terms">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h4>Account</h4>
              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
          </div>

          <div className="mf-footer-bottom">
            © {new Date().getFullYear()} MedFinder. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}