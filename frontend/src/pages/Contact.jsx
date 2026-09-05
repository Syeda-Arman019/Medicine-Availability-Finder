import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import contactMobile from "../assets/images/contact-mobile.png";
import "./Home.css";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={`mf-page contact-page ${darkMode ? "dark-theme" : ""}`}>

      {/* TOP BAR */}
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
              <span className="mf-styled-letter">M</span>edi
              <span className="mf-styled-letter mf-brand-accent">F</span>inder
            </span>
          </Link>

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


      {/* NAVBAR */}
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
                <Link className="nav-link active" to="/contact">
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


      {/* HERO */}
      <section className="mf-contact-hero">

        <div className="container mf-contact-container">

          {/* LEFT SIDE */}
          <div className="mf-contact-left">

            <span className="mf-eyebrow">
              CONTACT US
            </span>

            <h1 className="mf-contact-title">
              We're Here <br />
              To Help You
            </h1>

            <p className="mf-contact-text">
              Need help finding medicines or locating nearby pharmacies?
              Our MediFinder team is always ready to assist you with
              medicine availability, pharmacy information and healthcare support.
            </p>


            {/* CONTACT INFO */}
            <div className="mf-contact-info">

              <div className="mf-info-card">

                <div className="mf-info-icon">
                  📞
                </div>

                <div>
                  <h4>Phone</h4>

                  <a
                    href="tel:+923001234567"
                    className="mf-info-link"
                  >
                    +92 300 1234567
                  </a>
                </div>

              </div>


              <div className="mf-info-card">

                <div className="mf-info-icon">
                  📧
                </div>

                <div>
                  <h4>Email</h4>

                  <a
                    href="mailto:medifinder.project@gmail.com"
                    className="mf-info-link"
                  >
                    medifinder.project@gmail.com
                  </a>
                </div>

              </div>


              <div className="mf-info-card">

                <div className="mf-info-icon">
                  📍
                </div>

                <div>
                  <h4>Address</h4>

                  <p className="mf-info-text">
                    Plot 12, Auto Bhan Road
                  </p>

                  <p className="mf-info-text">
                    Hyderabad, Sindh, Pakistan
                  </p>
                </div>

              </div>


              <div className="mf-info-card">

                <div className="mf-info-icon">
                  🕒
                </div>

                <div>
                  <h4>Working Hours</h4>

                  <p className="mf-info-text">
                    Monday – Saturday
                  </p>

                  <p className="mf-info-text">
                    9:00 AM – 6:00 PM
                  </p>
                </div>

              </div>

            </div>


            {/* BUTTONS */}
            <div className="mf-contact-buttons">

              <Link
                to="/medicines"
                className="mf-banner-btn"
              >
                Find Medicines
              </Link>

              <Link
                to="/about"
                className="mf-contact-btn2"
              >
                Learn More
              </Link>

            </div>

          </div>


          {/* RIGHT SIDE */}
          <div className="mf-contact-right">

            <div className="mf-phone-stage">

              <div className="mf-contact-circle"></div>

              <img
                src={contactMobile}
                alt="Contact MediFinder"
                className="mf-contact-image"
              />

            </div>


            {/* MESSAGE FORM */}
            <form
              action="https://formsubmit.co/c1b29c770d654639ba6230da6550668d"
              method="POST"
              className="mf-message-box"
            >

              {/* EMAIL SUBJECT */}
              <input
                type="hidden"
                name="_subject"
                value="MediFinder Contact Message"
              />

              {/* DISABLE CAPTCHA */}
              <input
                type="hidden"
                name="_captcha"
                value="false"
              />

              <h3>
                Send Us a Message
              </h3>

              <p>
                We'd love to hear from you. Fill out the form and our team
                will contact you shortly.
              </p>


              <input
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                autoComplete="name"
                required
              />
              
              <input
                id="email"
                name="_replyto"
                placeholder="Email Address"
                type="email"
                autoComplete="email"
                required
              />

              <input
                id="phone"
                name="phone"
                placeholder="Phone Number"
                type="tel"
                autoComplete="tel"
              />


              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message..."
                autoComplete="off"
                required
              ></textarea>


              <button type="submit">
                Send Message
                <span>➤</span>
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* LOCATION */}
      <section className="mf-location-section">

        <div className="container">

          <div className="mf-location-header">

            <span className="mf-eyebrow">
              OUR LOCATION
            </span>

            <h2>
              Visit Our Office
            </h2>

            <p>
              Our MediFinder support team is always available to help you.
              You can visit our office during working hours or contact us online.
            </p>

          </div>


          <div className="mf-location-grid">

            <div className="mf-location-card">

              <h3>
                📍 MediFinder Office
              </h3>

              <p>
                Plot 12, Auto Bhan Road
              </p>

              <p>
                Hyderabad, Sindh, Pakistan
              </p>

              <p>
                Monday – Saturday
              </p>

              <p>
                9:00 AM – 6:00 PM
              </p>

            </div>


            <div className="mf-map">

              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Hyderabad%20Sindh%20Pakistan&output=embed"
                loading="lazy"
              ></iframe>

            </div>

          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="mf-footer">

        <div className="mf-footer-top">

          <div className="mf-feature">

            <span>🚚</span>

            <div>
              <h5>
                Fast Delivery
              </h5>

              <p>
                Medicine reservation made easy
              </p>
            </div>

          </div>


          <div className="mf-feature">

            <span>💊</span>

            <div>
              <h5>
                Verified Pharmacies
              </h5>

              <p>
                Trusted pharmacy partners
              </p>
            </div>

          </div>


          <div className="mf-feature">

            <span>📍</span>

            <div>
              <h5>
                Nearby Search
              </h5>

              <p>
                Find medicines around you
              </p>
            </div>

          </div>

        </div>


        <div className="container">

          <div className="mf-footer-grid">

            <div className="mf-footer-brand">

              <div className="mf-footer-logo">

                <svg
                  viewBox="0 0 40 40"
                  className="mf-footer-logo-svg"
                >

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

                  <span className="mf-styled-letter">
                    M
                  </span>

                  edi

                  <span className="mf-styled-letter mf-footer-accent">
                    F
                  </span>

                  inder

                </h2>

              </div>


              <p>
                Helping patients find medicine availability across nearby
                pharmacies in real time.
              </p>

            </div>


            <div>

              <h4>
                Explore
              </h4>

              <ul>

                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/medicines">
                    Medicines
                  </Link>
                </li>

                <li>
                  <Link to="/about">
                    About Us
                  </Link>
                </li>

              </ul>

            </div>


            <div>

              <h4>
                Support
              </h4>

              <ul>

                <li>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link to="/faqs">
                    FAQs
                  </Link>
                </li>

                <li>
                  <Link to="/terms">
                    Terms
                  </Link>
                </li>

              </ul>

            </div>


            <div>

              <h4>
                Account
              </h4>

              <ul>

                <li>
                  <Link to="/login">
                    Login
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link to="/register">
                    Register
                  </Link>
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
