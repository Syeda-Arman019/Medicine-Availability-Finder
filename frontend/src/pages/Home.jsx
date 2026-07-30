import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { MEDICINES } from "./MedicinesData";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext"; // 👈 1. ThemeContext Import
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
  const { darkMode } = useTheme(); // 👈 2. Context se darkMode value read ki
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
    // 👈 3. Root div par dynamic `dark-theme` class attach ki
      <div className={`mf-page ${darkMode ? "dark-theme" : ""}`}>
       return (
          <div className="mf-db-wrapper">
            {/* TOP BAR */}
            <header className="mf-db-topbar">
              <div className="mf-db-topbar-inner">
                <div className="mf-db-brand-wrap">
                  <button
                    className="mf-db-mobile-toggle d-lg-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Navigation"
                  >
                    {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                  <Link to="/" className="mf-brand">
                    <span className="mf-logo">
                      <svg viewBox="0 0 40 40" className="mf-logo-svg">
                        <rect x="4" y="16" width="32" height="8" rx="4" transform="rotate(-45 20 20)" fill="#7ccbe6" />
                        <rect x="20" y="16" width="16" height="8" rx="4" transform="rotate(-45 20 20)" fill="#d1f3ed" />
                      </svg>
                    </span>
                    <span className="mf-brand-text ms-2">
                      <span className="mf-styled-letter">M</span>edi<span className="mf-styled-letter mf-brand-accent">F</span>inder
                    </span>
                  </Link>
                </div>
      
                <div className="mf-db-top-search">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search medicines, pharmacies or active holds..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
      
                <div className="mf-db-user-actions">
                  {/* Theme Toggle Button */}
                  <button
                    className="mf-db-icon-btn"
                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    onClick={toggleDarkMode} // 👈 Updated to Context Toggle Method
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
      
                  <button className="mf-db-icon-btn" title="Notifications">
                    <Bell size={20} />
                    <span className="badge-dot"></span>
                  </button>
                  
                  <div className="mf-db-profile-pill">
                    <div className="avatar-circle">{user.name.charAt(0).toUpperCase()}</div>
                    <div className="user-info d-none d-md-block">
                      <span className="user-name">{user.name}</span>
                      <span className="user-role">{user.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>
      </div>

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

      {/* ---------- PRODUCT SECTION ---------- */}
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
            <h2><AnimatedNumber target={3} /></h2>
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
                  <span className="mf-styled-letter">M</span>edi<span className="mf-styled-letter mf-footer-accent">F</span>inder
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
            © {new Date().getFullYear()} MediFinder. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}