import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="mf-login-page">
      <div className="container">
        <div className="mf-login-wrapper">

          {/* LEFT SIDE */}
          <div className="mf-login-left">

            <span className="mf-login-tag">
              Welcome Back
            </span>

            <h1>
              Access Your
              <span> MedFinder </span>
              Account
            </h1>

            <p>
              Find medicines faster, manage reservations,
              and connect with verified pharmacies near you.
            </p>

            <div className="mf-login-features">

              <div className="mf-login-feature">
                <span>💊</span>
                <div>
                  <h5>Medicine Search</h5>
                  <p>Instant availability updates</p>
                </div>
              </div>

              <div className="mf-login-feature">
                <span>📍</span>
                <div>
                  <h5>Nearby Pharmacies</h5>
                  <p>Locate trusted pharmacies</p>
                </div>
              </div>

              <div className="mf-login-feature">
                <span>⚡</span>
                <div>
                  <h5>Quick Reservations</h5>
                  <p>Reserve before you travel</p>
                </div>
              </div>

            </div>

            <img
              src="/images/login-doctor.png"
              alt="Doctor"
              className="mf-login-image"
            />

            <div className="mf-login-stats">

              <div>
                <h3>500+</h3>
                <span>Medicines</span>
              </div>

              <div>
                <h3>100+</h3>
                <span>Pharmacies</span>
              </div>

              <div>
                <h3>24/7</h3>
                <span>Availability</span>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="mf-login-card">

            <h2>Login</h2>

            <form>

              <div className="mf-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mf-input-group">

                <label>Password</label>

                <div className="mf-password-wrap">

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="mf-eye-btn"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <FiEyeOff />
                    ) : (
                      <FiEye />
                    )}
                  </button>

                </div>

              </div>

              <div className="mf-login-options">

                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              <button
                type="submit"
                className="mf-login-btn"
              >
                Login
              </button>

            </form>

            <div className="mf-divider">
              <span>OR</span>
            </div>

            <div className="mf-social-login">

              <button className="mf-social-btn">
                <FaGoogle />
                Continue with Google
              </button>

              <button className="mf-social-btn">
                <FaFacebookF />
                Continue with Facebook
              </button>

            </div>

            <Link
              to="/register"
              className="mf-register-btn"
            >
              Create New Account
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}