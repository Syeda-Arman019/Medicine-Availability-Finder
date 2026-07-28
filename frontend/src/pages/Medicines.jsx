import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "./Medicines.css";

export default function Medicines({ cart = [], addToCart, removeFromCart }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // State to store medicines fetched from backend
  const [medicines, setMedicines] = useState([]);

  // Fetch medicines data from Flask API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/medicines")
      .then((response) => response.json())
      .then((data) => {
        setMedicines(data);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, []);

  // Unique categories derived from database records
  const categories = [
    "All",
    ...new Set(medicines.map((med) => med.category)),
  ];

  // Search & category filter logic
  const filteredMedicines = medicines.filter((med) => {
    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;
    const matchesSearch = (med.medicine_name || "")
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="mf-page medicines-page">
      {/* ---------- TOP BAR: BRAND + SEARCH + CART ---------- */}
      <div className="mf-topbar">
        <div className="container mf-topbar-inner">
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
              <span className="mf-styled-letter">M</span>ed
              <span className="mf-styled-letter mf-brand-accent">F</span>inder
            </span>
          </Link>

          {/* Connected Search Box */}
          <form
            className="mf-topbar-search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search medicines, e.g. Panadol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
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
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </form>

          {/* Cart Dropdown */}
          <div className="mf-cart-wrap">
            <button
              className="mf-cart-btn"
              onClick={() => setCartOpen((open) => !open)}
              aria-label="Open cart"
            >
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="10" cy="21" r="1.4" fill="currentColor" />
                <circle cx="17" cy="21" r="1.4" fill="currentColor" />
              </svg>
              <span className="mf-cart-badge">{totalCartCount}</span>
            </button>

            {cartOpen && (
              <div className="mf-cart-dropdown">
                <div className="mf-cart-dropdown-head">
                  <span>Your cart</span>
                  <button
                    onClick={() => setCartOpen(false)}
                    aria-label="Close cart"
                  >
                    ✕
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="mf-cart-empty">No medicines added yet.</p>
                ) : (
                  <>
                    <ul className="mf-cart-list">
                      {cart.map((item, i) => (
                     <li key={item.medicine_id || item.id || i}>
  <div className="mf-cart-info">
    <span>{item.medicine_name || item.name}</span>
    {item.quantity && <small>x{item.quantity}</small>}
  </div>
  <span className="mf-cart-price">{item.price}</span>
  <button
    onClick={() =>
      removeFromCart(item.medicine_id !== undefined ? item.medicine_id : (item.id !== undefined ? item.id : i))
    }
    className="mf-delete-btn"
    aria-label="Remove"
  >
    <Trash2 size={16} />
  </button>
</li>
                      ))}
                    </ul>
                    <Link to="/cart" className="mf-cart-checkout">
                      View Full Cart
                    </Link>
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
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/medicines">
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
        </div>
      </nav>

      {/* ---------- HEADER BANNER ---------- */}
      <header className="med-header-banner">
        <div className="container">
          <span className="med-tag">AVAILABLE IN NEARBY PHARMACIES</span>
          <h1>Explore Medicines</h1>
          <p>
            Find genuine medicines, check live availability, and add them to your
            cart.
          </p>
        </div>
      </header>

      {/* ---------- MAIN CONTENT SECTION ---------- */}
      <section className="med-content-section container">
        {/* Category Chips */}
        <div className="med-filter-bar">
          <h3>Categories</h3>
          <div className="med-category-chips">
            {categories.map((category) => (
              <button
                key={category}
                className={`med-chip ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="med-grid-wrap">
          <div className="med-results-count">
            Showing <strong>{filteredMedicines.length}</strong> medicine(s)
          </div>

          {filteredMedicines.length > 0 ? (
            <div className="med-grid">
              {filteredMedicines.map((m) => (
                <div className="med-card" key={m.medicine_id}>
                  {/* Medicine Image */}
                  {m.image && (
                    <img
                      src={m.image}
                      alt={m.medicine_name}
                      className="mf-product-image"
                    />
                  )}
                  <div className="med-card-body">
                    <span className="med-category-label">{m.category}</span>
                    <h4 className="med-title">{m.medicine_name}</h4>
                    <p className="med-pack">{m.description || m.pack}</p>
                    <div className="med-card-footer">
                      <span className="med-price">{m.price}</span>
                      <button
                        className="med-add-btn"
                        onClick={() => addToCart(m)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="med-no-results">
              <h3>No Medicines Found</h3>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="med-reset-btn"
              >
                Reset Filters
              </button>
            </div>
          )}
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
                  <span className="mf-styled-letter">M</span>ed
                  <span className="mf-styled-letter mf-footer-accent">F</span>
                  inder
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