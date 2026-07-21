import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Layout.css";

export default function Header() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
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
              Med<span className="mf-brand-accent">Finder</span>
            </span>
          </Link>

          <form className="mf-topbar-search">
            <input
              type="text"
              placeholder="Search medicines, e.g. Panadol..."
            />

            <button type="submit">
              <svg viewBox="0 0 24 24">
                <circle
                  cx="10"
                  cy="10"
                  r="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="15"
                  x2="21"
                  y2="21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </form>

          <div className="mf-cart-wrap">
            <button
              className="mf-cart-btn"
              onClick={() => setCartOpen(!cartOpen)}
            >
              🛒
              <span className="mf-cart-badge">{cart.length}</span>
            </button>

            {cartOpen && (
              <div className="mf-cart-dropdown">
                <div className="mf-cart-dropdown-head">
                  <span>Your cart</span>

                  <button onClick={() => setCartOpen(false)}>
                    ✕
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="mf-cart-empty">
                    No medicines added yet.
                  </p>
                ) : (
                  <ul className="mf-cart-list">
                    {cart.map((item, i) => (
                      <li key={i}>
                        <span>{item.name}</span>

                        <button
                          onClick={() => removeFromCart(i)}
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg mf-navbar">
        <div className="container mf-navbar-inner">

          <button
            className="navbar-toggler mf-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mfNav"
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
                <Link className="nav-link" to="/login">
                  Login / Register
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
                <Link className="nav-link" to="/terms">
                  Terms of Service
                </Link>
              </li>

            </ul>
          </div>

          <Link to="/login" className="mf-header-btn">
            Create Account
          </Link>

        </div>
      </nav>
    </>
  );
}