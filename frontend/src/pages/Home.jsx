import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { MEDICINES } from "./MedicinesData";
import "./Home.css";

// ================= ANIMATED NUMBER =================
const AnimatedNumber = ({ target }) => {
  const [count, setCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const numberRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnimation(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAnimation) return;

    let start = 0;
    const increment = target / 75;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [startAnimation, target]);

  return <span ref={numberRef}>{count.toLocaleString()}+</span>;
};

// ================= HOME =================
export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Search aur Category filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (medicine) => {
    setCart((prev) => [...prev, medicine]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Filtering Logic (Search Box + Category Filter)
  const filteredMedicines = MEDICINES.filter((med) => {
    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;

    const matchesSearch = med.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mf-page">
      {/* ---------- TOP BAR: brand + search + cart ---------- */}
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

          {/* Connected Search Box */}
          <form className="mf-topbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search medicines, e.g. Panadol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24">
                <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </form>

          <div className="mf-cart-wrap">
            <button
              className="mf-cart-btn"
              onClick={() => setCartOpen((open) => !open)}
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="21" r="1.4" fill="currentColor" />
                <circle cx="17" cy="21" r="1.4" fill="currentColor" />
              </svg>
              <span className="mf-cart-badge">{cart.length}</span>
            </button>

            {cartOpen && (
              <div className="mf-cart-dropdown">
                <div className="mf-cart-dropdown-head">
                  <span>Your cart</span>
                  <button onClick={() => setCartOpen(false)} aria-label="Close cart">✕</button>
                </div>
                {cart.length === 0 ? (
                  <p className="mf-cart-empty">No medicines added yet.</p>
                ) : (
                  <>
                    <ul className="mf-cart-list">
                      {cart.map((item, i) => (
                        <li key={i}>
                          <span>{item.medicine_name || item.name}</span>
                          <span className="mf-cart-price">{item.price}</span>
                          <button
                            onClick={() => removeFromCart(i)}
                            aria-label="Remove"
                            className="mf-delete-btn"
                          >
                            <Trash2 size={18} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CART PAGE LINK ADDED HERE */}
                    <div style={{ padding: '8px 0', borderTop: '1px solid #e2e8f0', marginTop: '10px' }}>
                      <Link 
                        to="/cart" 
                        className="mf-cart-checkout"
                        onClick={() => setCartOpen(false)}
                      >
                        View Full Cart & Reserve →
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
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
              <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/medicines">Medicines</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login / Register</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Patient Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/faqs">FAQs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <Link to="/login" className="mf-header-btn">
            Create Account
          </Link>
        </div>
      </nav>

      {/* ---------- HERO BANNER ---------- */}
      <header className="mf-banner">
        <div className="container mf-banner-inner">
          <div className="mf-banner-copy">
            <div className="mf-banner-image">
              <img
                src="/images/medi_banner.png"
                alt="Medicine Availability Finder"
                className="mf-banner-img"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ---------- PRODUCT SECTION (WITH FILTER & CATEGORY CHIPS) ---------- */}
      <section className="mf-products">
        <div className="container mf-products-head">
          <div>
            <span className="mf-section-label">MOST SEARCHED MEDICINES</span>
            <h2>Popular Medicines</h2>
          </div>
          <Link to="/medicines" className="mf-view-all">
            View all →
          </Link>
        </div>

        {/* Category Buttons */}
        <div className="category-chips container my-3" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {["All", "Pain relief", "Antibiotic", "Diabetes", "Supplements"].map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filtered Medicine List */}
        <div className="mf-product-scroll">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((m) => (
              <div className="mf-product-card" key={m.id}>
                <img src={m.image} alt={m.name} className="mf-product-image" />
                <h4>{m.name}</h4>
                <span className="mf-product-pack">{m.pack}</span>
                <div className="mf-product-price">{m.price}</div>
                <button className="mf-add-cart-btn" onClick={() => addToCart(m)}>
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p style={{ padding: '20px', textAlign: 'center', width: '100%' }}>No medicines found.</p>
          )}
        </div>

        <div className="mf-products-btn-wrap">
          <Link to="/medicines" className="mf-banner-btn">
            Browse All Medicines
          </Link>
        </div>
      </section>

      {/* ---------- QUOTE + CAPSULE SECTION ---------- */}
      <section className="mf-split-section">
        <div className="mf-quote-section">
          <span className="mf-eyebrow">Stop calling ten pharmacies</span>
          <h1 className="mf-headline">
            Find the medicine you need,
            <br />
            right now,
          </h1>
          <p className="mf-subtext">
            Search any medicine, check live stock at pharmacies near you, and reserve it before you even leave the house.
          </p>
          <div className="mf-headline-accent">right nearby.</div>
        </div>

        <div className="mf-capsule-section">
          <div className="mf-capsule-stage">
            <div className="mf-capsule-glow"></div>
            <div className="mf-orbit-ring"></div>
            <div className="mf-capsule">
              <div className="mf-capsule-half mf-capsule-half-left"></div>
              <div className="mf-capsule-half mf-capsule-half-right"></div>
            </div>
            <div className="mf-tablet t1"></div>
            <div className="mf-tablet t2"></div>
            <div className="mf-tablet t3"></div>
            <div className="mf-tablet t4"></div>
            <div className="mf-tablet t5"></div>
            <div className="mf-tablet t6"></div>
            <div className="mf-tablet t7"></div>
            <div className="mf-tablet t8"></div>
          </div>

          <p className="mf-capsule-tagline">
            One search opens up every nearby pharmacy that has it in stock.
          </p>
        </div>
      </section>

      {/* ---------- MEDIFINDER STATS SECTION ---------- */}
      <section className="mf-stats-section">
        <div className="mf-stats-container">
          <div className="mf-stat-card">
            <div className="mf-stat-icon">💊</div>
            <h2><AnimatedNumber target={500} /></h2>
            <p>Medicines Listed</p>
          </div>

          <div className="mf-stat-card">
            <div className="mf-stat-icon">🏥</div>
            <h2><AnimatedNumber target={5} /></h2>
            <p>Pharmacies Connected</p>
          </div>

          <div className="mf-stat-card">
            <div className="mf-stat-icon">🔍</div>
            <h2><AnimatedNumber target={100} /></h2>
            <p>Availability Checks</p>
          </div>

          <div className="mf-stat-card">
            <div className="mf-stat-icon">📦</div>
            <h2><AnimatedNumber target={300} /></h2>
            <p>Reservation Requests</p>
          </div>
        </div>
      </section>

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
                  <rect x="4" y="16" width="32" height="8" rx="4" transform="rotate(-45 20 20)" fill="#7ccbe6" />
                  <rect x="20" y="16" width="16" height="8" rx="4" transform="rotate(-45 20 20)" fill="#d1f3ed" />
                </svg>
                <h2 className="mf-footer-title">
                  <span className="mf-styled-letter">M</span>ed<span className="mf-styled-letter mf-footer-accent">F</span>inder
                </h2>
              </div>
              <p>Helping patients find medicine availability across nearby pharmacies in real time.</p>
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