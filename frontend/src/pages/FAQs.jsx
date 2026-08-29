import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FAQs.css";
import faqIllustration from "../assets/images/faq-illustration.png";
import supportHeadphone from "../assets/images/support-headphone.png";
import "./Home.css";
import { useTheme } from "../context/ThemeContext";

const CATEGORIES = [
  { key: "all", label: "All Questions", icon: "▦" },
  { key: "orders", label: "Orders & Delivery", icon: "🚚" },
  { key: "medicines", label: "Medicines", icon: "💊" },
  { key: "payments", label: "Payments", icon: "💳" },
  { key: "account", label: "Account", icon: "👤" },
  { key: "general", label: "General", icon: "❓" },
];

const FAQ_DATA = [
  {
    category: "medicines",
    question: "How can I search for a medicine?",
    answer:
      "Use the search bar on the Home page or Medicines page. Type the medicine name and MediFinder will show you nearby pharmacies that currently have it in stock.",
  },
  {
    category: "medicines",
    question: "How do I know if a medicine is available nearby?",
    answer:
      "Every medicine listing shows live availability status from partner pharmacies near your selected location, updated in real time.",
  },
  {
    category: "orders",
    question: "Can I reserve a medicine before going to the pharmacy?",
    answer:
      "Yes. Add the medicine to your cart and choose 'Reserve' — the pharmacy will hold it for you for a limited time so you can pick it up.",
  },
  {
    category: "payments",
    question: "How is the medicine price displayed?",
    answer:
      "Prices shown are provided directly by the partner pharmacy and may vary slightly by location. The final price is confirmed at pickup or checkout.",
  },
  {
    category: "medicines",
    question: "What if I can't find my medicine?",
    answer:
      "If a medicine isn't listed, use the 'Contact Us' page to request it — our team will try to connect you with a pharmacy that stocks it.",
  },
  {
    category: "account",
    question: "Is my personal information safe?",
    answer:
      "Yes. MediFinder uses secure encryption for all personal and account data, and we never share your information with third parties without consent.",
  },
  {
    category: "general",
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team anytime via the Contact Us page, email, or phone — details are available in the footer of every page.",
  },
];

export default function FAQs() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs =
    activeCategory === "all"
      ? FAQ_DATA
      : FAQ_DATA.filter((f) => f.category === activeCategory);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`mf-page mf-faq-page ${darkMode ? "dark-theme" : ""}`}>

      {/* ================= TOP BAR (MATCHED WITH CONTACT/HOME) ================= */}
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
              <span className="mf-styled-letter">M</span>edi<span className="mf-styled-letter mf-brand-accent">F</span>inder
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

      {/* ================= NAVBAR (MATCHED WITH CONTACT/HOME) ================= */}
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
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
             
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Patient Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/faqs">FAQs</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= FAQ HERO ================= */}
      <section className="mf-faq-hero">
        <div className="container mf-faq-hero-inner">
          <div className="mf-faq-hero-left">
            <span className="mf-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
            <h1 className="mf-faq-title">
              How can <span className="mf-brand-accent">we</span> help you?
            </h1>
            <p className="mf-faq-subtext">
              Find quick answers to common questions about medicines, orders,
              payments and our services.
            </p>
          </div>

          <div className="mf-faq-hero-right">
            <img
              src={faqIllustration}
              alt="Frequently Asked Questions"
              className="mf-faq-illustration"
            />
          </div>
        </div>
      </section>

      {/* ================= CATEGORY TABS & ACCORDION ================= */}
      <section className="mf-faq-body">
        <div className="container mf-faq-body-grid">
          <div className="mf-faq-main">

            <div className="mf-faq-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className={`mf-faq-tab ${activeCategory === cat.key ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setOpenIndex(null);
                  }}
                >
                  <span className="mf-faq-tab-icon">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* ACCORDION LIST */}
            <div className="mf-faq-list">
              {filteredFaqs.map((faq, index) => (
                <div className="mf-faq-item" key={index}>
                  <button
                    className="mf-faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="mf-faq-q-icon">?</span>
                    <span className="mf-faq-q-text">{faq.question}</span>
                    <span className={`mf-faq-chevron ${openIndex === index ? "open" : ""}`}>
                      ⌄
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="mf-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* SIDEBAR: STILL NEED HELP */}
          <aside className="mf-faq-sidebar">
            <img
              src={supportHeadphone}
              alt="Customer Support"
              className="mf-faq-sidebar-img"
            />
            <h3>Still Need Help?</h3>
            <p>
              Our support team is here for you. Reach out and we'll get back
              as soon as possible.
            </p>
            <Link to="/contact" className="mf-faq-sidebar-btn">
              ✉ Contact Us
            </Link>
          </aside>
        </div>
      </section>

      {/* ================= FOOTER (MATCHED WITH CONTACT/HOME) ================= */}
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
            © {new Date().getFullYear()} MediFinder. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}

