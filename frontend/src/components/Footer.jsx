import React from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Footer() {
  return (
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
            <h2>
              Med<span>Finder</span>
            </h2>

            <p>
              Helping patients find medicine availability
              across nearby pharmacies in real time.
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
          © {new Date().getFullYear()} MedFinder.
          All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}