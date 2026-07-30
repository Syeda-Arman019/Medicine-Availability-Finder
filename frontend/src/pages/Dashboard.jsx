import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // 👈 ThemeContext Hook Import
import {
  Search,
  Building2,
  Bookmark,
  CalendarCheck,
  MapPin,
  Clock,
  ArrowRight,
  User as UserIcon,
  LogOut,
  ShoppingBag,
  Bell,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  PhoneCall,
  ChevronRight,
  Activity,
  FileText,
  Settings,
  HelpCircle,
  Pill,
  Heart,
  Sun,
  Moon
} from "lucide-react";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme(); // 👈 Context se State aur Toggle use kar rahe hain

  const [user, setUser] = useState({ 
    name: "User", 
    email: "", 
    role: "Patient", 
    location: "Hyderabad, Sindh" 
  });
  
  const [reservations, setReservations] = useState([]);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [pharmacies, setPharmacies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Fetch User Data & Reservations
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        console.log("Logged User:", parsed);
        console.log("User ID:", parsed.user_id);

        setUser((prev) => ({
          ...prev,
          name: parsed.full_name || parsed.name || "User",
          email: parsed.email || "",
          role: "Patient",
          location: "Hyderabad, Sindh",
        }));

        if (parsed.user_id) {
          fetch(`http://127.0.0.1:5000/my-reservations/${parsed.user_id}`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Fetched Reservations JSON:", JSON.stringify(data, null, 2));

              if (Array.isArray(data)) {
                setReservations(data);
              }
              setLoadingReservations(false);
            })
            .catch((err) => {
              console.error("Error fetching reservations:", err);
              setLoadingReservations(false);
            });
        } else {
          setLoadingReservations(false);
        }

      } catch (error) {
        console.error("Error parsing user storage:", error);
        setLoadingReservations(false);
      }
    } else {
      setLoadingReservations(false);
    }

    // 2. Fetch Medicines from Backend
    fetch("http://127.0.0.1:5000/medicines")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMedicines(data);
        }
      })
      .catch((err) => console.error("Error fetching medicines:", err));

    // 3. Fetch Pharmacies from Backend
    fetch("http://127.0.0.1:5000/pharmacies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPharmacies(data);
        }
      })
      .catch((err) => console.error("Error fetching pharmacies:", err));

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredMedicines = medicines.filter((item) =>
    item.medicine_name && item.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestReservation = reservations.length > 0 ? reservations[0] : null;

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

      {/* MAIN LAYOUT */}
      <div className="mf-db-container">
        {/* SIDEBAR NAVIGATION */}
        <aside className={`mf-db-sidebar ${mobileMenuOpen ? "open" : ""}`}>
          <div className="sidebar-nav">
            <span className="sidebar-label">MAIN MENU</span>
            <button
              className={`sidebar-link ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
            >
              <Activity size={18} />
              <span>Dashboard</span>
            </button>
            <Link to="/medicines" className="sidebar-link">
              <Pill size={18} />
              <span>Medicines Search</span>
            </Link>
            <Link to="/cart" className="sidebar-link">
              <ShoppingBag size={18} />
              <span>My Reservation Cart</span>
            </Link>
            <button
              className={`sidebar-link ${activeTab === "pharmacies" ? "active" : ""}`}
              onClick={() => { setActiveTab("pharmacies"); setMobileMenuOpen(false); }}
            >
              <Building2 size={18} />
              <span>Connected Pharmacies</span>
            </button>

            <span className="sidebar-label mt-4">PATIENT HUB</span>
            <button className="sidebar-link">
              <CalendarCheck size={18} />
              <span>Reservations History</span>
            </button>
            <button className="sidebar-link">
              <Heart size={18} />
              <span>Saved Medicines</span>
            </button>
            <button className="sidebar-link">
              <FileText size={18} />
              <span>Prescription Records</span>
            </button>

            <span className="sidebar-label mt-4">PREFERENCES</span>
            <button className="sidebar-link">
              <Settings size={18} />
              <span>Account Settings</span>
            </button>
            <button className="sidebar-link">
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </button>
          </div>

          <div className="sidebar-footer">
            <div className="support-card">
              <PhoneCall size={24} className="support-icon" />
              <h6>Need Assistance?</h6>
              <p>24/7 MedFinder Help Desk available for stock verification.</p>
              <Link to="/contact" className="btn btn-sm btn-outline-light w-100 rounded-pill">Contact Support</Link>
            </div>

            <button className="btn-logout mt-3" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* DASHBOARD CONTENT BODY */}
        <main className="mf-db-main">
          {/* WELCOME BANNER */}
          <section className="mf-db-welcome-banner">
            <div className="welcome-text">
              <h2>Welcome Back, {user.name}! 👋</h2>
              <p>Find medicines instantly, check real-time stock at connected pharmacies, and place temporary holds before you visit.</p>
              <div className="welcome-tags">
                <span className="tag"><MapPin size={14} /> Location: {user.location}</span>
                <span className="tag"><Clock size={14} /> Hold Duration: 4 Hours Max</span>
              </div>
            </div>
            <div className="welcome-illustration d-none d-lg-block">
              <div className="illustration-card">
                <span className="pill-icon">💊</span>
                <span className="hospital-icon">🏥</span>
              </div>
            </div>
          </section>

          {/* DASHBOARD STATISTICS CARDS */}
          <section className="mf-db-stats-grid">
            <div className="stat-card">
              <div className="stat-icon-bg cyan">
                <Search size={22} />
              </div>
              <div className="stat-details">
                <span className="stat-title">Medicines Available</span>
                <h3 className="stat-value">{medicines.length}</h3>
                <span className="stat-sub text-success">Live from DB</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-bg blue">
                <Building2 size={22} />
              </div>
              <div className="stat-details">
                <span className="stat-title">Pharmacies Connected</span>
                <h3 className="stat-value">{pharmacies.length}</h3>
                <span className="stat-sub text-primary">All Live in Hyderabad</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-bg purple">
                <Bookmark size={22} />
              </div>
              <div className="stat-details">
                <span className="stat-title">Saved Items</span>
                <h3 className="stat-value">8</h3>
                <span className="stat-sub">For quick re-order</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-bg yellow">
                <CalendarCheck size={22} />
              </div>
              <div className="stat-details">
                <span className="stat-title">Active Holds</span>
                <h3 className="stat-value">{reservations.length}</h3>
                <span className="stat-sub text-warning">Total reservations stored</span>
              </div>
            </div>
          </section>

          {/* TWO COLUMN GRID CONTENT */}
          <div className="mf-db-content-grid">
            {/* LEFT COLUMN */}
            <div className="grid-left">
              {/* MY RESERVATIONS SECTION */}
              <div className="db-card p-4 mb-4">
                <h4 className="db-card-title mb-3">
                  <CalendarCheck size={20} className="me-2 text-primary" />
                  My Reservations
                </h4>

                {loadingReservations ? (
                  <p className="text-muted">Loading reservations...</p>
                ) : reservations.length === 0 ? (
                  <div className="text-muted">No reservations found.</div>
                ) : (
                  reservations.map((res, index) => (
                    <div
                      key={`${res.reservation_id || res.id || 'res'}-${index}`}
                      className="border rounded p-3 mb-3 bg-light"
                    >
                      <h6 className="fw-bold">
                        💊 Reservation #{res.reservation_id || res.id}
                      </h6>

                      <p className="mb-2">
                        <strong>Medicines:</strong>
                        <br />
                        <span className="text-primary fw-semibold">
                          {res.medicine_names || res.medicine_name || "N/A"}
                        </span>
                      </p>

                      <p className="mb-1 text-dark">
                        💰 <strong>Total Amount:</strong> Rs. {res.total_amount || res.price || "0"}
                      </p>

                      <p className="mb-2 text-muted small">
                        📅 <strong>Time:</strong> {res.reservation_time || res.created_at || "N/A"}
                      </p>

                      <span className="badge bg-warning text-dark">
                        {res.status || "Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* SEARCH MEDICINES SECTION */}
              <div className="db-card p-4 mb-4">
                <div className="db-card-header mb-3">
                  <h4 className="db-card-title"><Search size={20} className="me-2 text-primary" /> Search Medicine Availability</h4>
                </div>
                <div className="input-group mf-custom-input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by medicine name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary px-4 fw-bold" type="button">
                    Search Now
                  </button>
                </div>
                <div className="popular-searches mt-3 d-flex align-items-center flex-wrap gap-2">
                  <small className="text-muted fw-bold">Popular Searches:</small>
                  {["Panadol", "Augmentin", "Calpol", "Disprin", "Brufen"].map((item, idx) => (
                    <button
                      key={idx}
                      className="btn btn-sm btn-light border-0 rounded-pill px-3 text-secondary"
                      onClick={() => setSearchQuery(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* RECENT AVAILABILITY TABLE */}
              <div className="db-card p-4 mb-4">
                <div className="db-card-header d-flex justify-content-between align-items-center mb-3">
                  <h4 className="db-card-title"><Pill size={20} className="me-2 text-primary" /> Recent Medicine Availability</h4>
                  <Link to="/medicines" className="view-link">View All <ChevronRight size={16} /></Link>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle custom-table mb-0">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Company</th>
                        <th>Pharmacy</th>
                        <th>Availability</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMedicines.map((item, idx) => (
                        <tr key={item.medicine_id || item.id || idx}>
                          <td>
                            <strong className="medicine-name">{item.medicine_name}</strong>
                          </td>
                          <td className="text-muted"><small>-</small></td>
                          <td>
                            <span className="pharmacy-badge">Available</span>
                          </td>
                          <td>
                            <span className="status-tag success">
                              In Stock
                            </span>
                          </td>
                          <td className="fw-bold text-dark">Rs. {item.price}</td>
                          <td>
                            <Link to="/cart" className="btn btn-sm btn-primary-soft rounded-pill px-3">
                              Reserve
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {filteredMedicines.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-muted">
                            No medicines matched your search terms.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CONNECTED PHARMACIES CARDS */}
              <div className="db-card p-4">
                <div className="db-card-header d-flex justify-content-between align-items-center mb-3">
                  <h4 className="db-card-title"><Building2 size={20} className="me-2 text-primary" /> Connected Pharmacies</h4>
                  <span className="badge bg-light text-primary border px-3 py-2 rounded-pill">
                    {pharmacies.length} Active Partners
                  </span>
                </div>

                <div className="row g-3">
                  {pharmacies.map((pharm, idx) => (
                    <div className="col-md-4" key={pharm.pharmacy_id || pharm.id || idx}>
                      <div className="pharmacy-card h-100 p-3 border rounded">
                        <div className="pharm-header mb-2">
                          <h6 className="pharm-name fw-bold mb-1">{pharm.pharmacy_name}</h6>
                          <span className="badge bg-success-subtle text-success border">
                            {pharm.status || "Open"}
                          </span>
                        </div>
                        <p className="pharm-address text-muted small mb-1">
                          <MapPin size={14} className="me-1" /> {pharm.address}
                        </p>
                        <p className="pharm-phone text-muted small mb-1">
                          <PhoneCall size={14} className="me-1" /> {pharm.phone}
                        </p>
                        <p className="pharm-hours text-muted small mb-0">
                          <Clock size={14} className="me-1" /> {pharm.opening_hours || "09:00 AM - 11:00 PM"}
                        </p>
                      </div>
                    </div>
                  ))}
                  {pharmacies.length === 0 && (
                    <div className="col-12 text-center text-muted py-3">
                      No connected pharmacies fetched from database.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="grid-right">
              {/* PATIENT PROFILE SUMMARY CARD */}
              <div className="db-card p-4 text-center mb-4">
                <div className="profile-avatar-large mx-auto mb-3">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h5 className="mb-1 fw-bold">{user.name}</h5>
                <p className="text-muted small mb-1">{user.role} • {user.location}</p>
                <p className="text-muted small mb-3">{user.email}</p>
                
                <button className="btn btn-sm btn-outline-primary rounded-pill px-4">
                  Edit Profile
                </button>
              </div>

              {/* DYNAMIC ACTIVE RESERVATION STATUS CARD */}
              <div className="db-card p-4 mb-4 highlight-card">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0 text-primary">
                    <CheckCircle2 size={18} className="me-1" /> Active Reservation
                  </h6>
                  <span className={`badge ${latestReservation ? 'bg-success' : 'bg-secondary'}`}>
                    {latestReservation ? 'Confirmed' : 'No Active Hold'}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="reservation-details">
                  {latestReservation ? (
                    <>
                      <p className="mb-1 fw-bold text-dark">
                        💊 {latestReservation.medicine_names || latestReservation.medicine_name || "Reserved Items"}
                      </p>
                      <p className="small text-muted mb-2">
                        Pharmacy: <strong>{latestReservation.pharmacy_name || "Connected Pharmacy"}</strong>
                      </p>
                      <div className="hold-counter p-2 rounded bg-light border text-center">
                        <small className="text-danger fw-bold d-block">
                          <Clock size={14} className="me-1" /> Reserved Active
                        </small>
                        <small className="text-muted">
                          Show Code <strong>#MF-{latestReservation.reservation_id || latestReservation.id}</strong> at Pickup counter
                        </small>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-2 text-muted">
                      <small>No active holds found. Reserve medicines from search list to view here.</small>
                    </div>
                  )}
                </div>
              </div>

              {/* HEALTH REMINDER / QUICK ACTIONS */}
              <div className="db-card p-4">
                <h6 className="fw-bold mb-3 d-flex align-items-center">
                  <AlertCircle size={18} className="me-2 text-warning" /> Health Reminders
                </h6>
                <div className="reminder-item mb-3 p-3 rounded border-start border-4 border-info bg-light">
                  <strong className="d-block text-dark small">Daily Medication Alert</strong>
                  <small className="text-muted">Don't forget your evening dose of Augmentin at 08:00 PM.</small>
                </div>

                <div className="quick-links-list">
                  <h6 className="fw-bold mb-2 small text-uppercase text-muted">Quick Actions</h6>
                  <Link to="/medicines" className="quick-link">
                    <span>Browse All Medicines</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/cart" className="quick-link">
                    <span>Go to Hold Cart</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/contact" className="quick-link">
                    <span>Report Missing Medicine</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* UPDATED FOOTER */}
      <footer className="mf-footer">
        <div className="mf-footer-top">
          <div className="mf-feature">
            <span>💊</span>
            <div>
              <h5>Live Medicine Search</h5>
              <p>Find medicines instantly</p>
            </div>
          </div>

          <div className="mf-feature">
            <span>🏥</span>
            <div>
              <h5>Connected Pharmacies</h5>
              <p>Check nearby stock availability</p>
            </div>
          </div>

          <div className="mf-feature">
            <span>📦</span>
            <div>
              <h5>Quick Reservations</h5>
              <p>Reserve medicines before visiting</p>
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
                  <span className="mf-styled-letter">M</span>edi
                  <span className="mf-styled-letter mf-footer-accent">F</span>inder
                </h2>
              </div>

              <p>
                Helping patients find medicine availability across nearby pharmacies
                in real time.
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
              <h4>Patient Hub</h4>
              <ul>
                <li><Link to="/dashboard">Patient Dashboard</Link></li>
                <li><Link to="/cart">My Cart</Link></li>
                <li><Link to="/cart">Reservations</Link></li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
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