import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";


const MEDICINES = [
  { id: 1, name: "Panadol Extra", pack: "20 tablets", price: "Rs. 120", image: "/images/panadol.png" },
  { id: 2, name: "Augmentin 625mg", pack: "10 tablets", price: "Rs. 450", image: "/images/Augmentin.png" },
  { id: 3, name: "Disprin", pack: "10 tablets", price: "Rs. 40", image: "/images/Disprin.png" },
  { id: 4, name: "Brufen 400mg", pack: "20 tablets", price: "Rs. 180", image: "/images/Brufen.png"},
  { id: 5, name: "Calpol Syrup", pack: "60ml", price: "Rs. 160", image: "/images/Calpol.png" },
  { id: 6, name: "Insulin Glargine", pack: "1 vial", price: "Rs. 1,650", image: "/images/Insulin Glargine.png" },
  { id: 7, name: "Vitamin D3", pack: "10 tablets", price: "Rs. 210", image: "/images/Vitamin D3.png"},
  { id: 8, name: "ORS Sachets", pack: "5 sachets", price: "Rs. 75", image: "/images/ORS Sachets.png"
   },
];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (medicine) => {
    setCart((prev) => [...prev, medicine]);
    setCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

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
              Med<span className="mf-brand-accent">Finder</span>
            </span>
          </Link>

          <form className="mf-topbar-search" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Search medicines, e.g. Panadol..." />
            <button type="submit" aria-label="Search">
              <svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="15" y1="15" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </form>

          <div className="mf-cart-wrap">
            <button
              className="mf-cart-btn"
              onClick={() => setCartOpen((open) => !open)}
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24">
                <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="21" r="1.4" fill="currentColor"/>
                <circle cx="17" cy="21" r="1.4" fill="currentColor"/>
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
                  <ul className="mf-cart-list">
                    {cart.map((item, i) => (
                      <li key={i}>
                        <span>{item.name}</span>
                        <span className="mf-cart-price">{item.price}</span>
                        <button onClick={() => removeFromCart(i)} aria-label="Remove">✕</button>
                      </li>
                    ))}
                  </ul>
                )}
                <Link to="/medicines" className="mf-cart-checkout">
                  Go to Medicines Page
                </Link>
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



{/* ---------- PRODUCT SCROLL ---------- */}
<section className="mf-products">

  <div className="container mf-products-head">

    <div>
      <span className="mf-section-label">
        MOST SEARCHED MEDICINES
      </span>

      <h2>Popular Medicines</h2>
    </div>

    <Link to="/medicines" className="mf-view-all">
      View all →
    </Link>

  </div>

  <div className="mf-product-scroll">

    {MEDICINES.map((m) => (
      <div className="mf-product-card" key={m.id}>

        <img
          src={m.image}
          alt={m.name}
          className="mf-product-image"
        />

        <h4>{m.name}</h4>

        <span className="mf-product-pack">
          {m.pack}
        </span>

        <div className="mf-product-price">
          {m.price}
        </div>

        <button
          className="mf-cart-btn"
          onClick={() => addToCart(m)}
        >
          Add to Cart
        </button>

      </div>
    ))}

  </div>

  {/* Browse Button */}
  <div className="mf-products-btn-wrap">
    <Link to="/medicines" className="mf-banner-btn">
      Browse All Medicines
    </Link>
  </div>

</section>

{/* ---------- QUOTE + CAPSULE SECTION ---------- */}
<section className="mf-split-section">

  {/* LEFT SIDE */}
  <div className="mf-quote-section">

    <span className="mf-eyebrow">
      Stop calling ten pharmacies
    </span>

  <h1 className="mf-headline">
  Find the medicine you need,
  <br />
  right now,
</h1>

<p className="mf-subtext">
  Search any medicine, check live stock at pharmacies near you,
  and reserve it before you even leave the house.
</p>

<div className="mf-headline-accent">
  right nearby.
</div>
   
  </div>

  {/* RIGHT SIDE */}
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
        <h2>
          Med<span>Finder</span>
        </h2>

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
