import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MapPin, Clock } from "lucide-react";
import "./CartPage.css";
import { useTheme } from "../context/ThemeContext";

export default function CartPage({ cart = [], updateQuantity, removeFromCart }) {
  console.log(cart);

  const { darkMode, toggleDarkMode } = useTheme();

  // State matches the dropdown key directly
  const [selectedPharmacy, setSelectedPharmacy] = useState("MedPlus Pharmacy");

  const subtotal = cart.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  const handleReservation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user.user_id) {
        alert("Please log in to confirm your reservation.");
        return;
      }

      const pharmacyMap = {
        "MedPlus Pharmacy": 1,
        "Care Pharmacy": 2,
        "City Health Pharmacy": 3,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/reserve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.user_id,
          pharmacy_id: pharmacyMap[selectedPharmacy],
          total_amount: subtotal,
          cart_items: cart.map((item) => ({
            medicine_id: item.medicine_id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Reservation confirmed successfully!");
        
        // Clear items from cart state after success
       cart.map((item) => item.medicine_id)
    .forEach((id) => removeFromCart(id));
      } else {
        alert(data.error || "Reservation failed. Please try again.");
      }

    } catch (error) {
      console.error("Reservation Error:", error);
      alert("Reservation failed. Please check backend server.");
    }
  };

  return (
    <div className={`cart-page-wrapper ${darkMode ? "dark-theme" : ""}`}>
      <div className="container py-5">
        <div className="cart-top-row d-flex justify-content-between align-items-center">
          <Link to="/medicines" className="back-link">
            <ArrowLeft size={18} /> Continue Browsing
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

        <h1 className="cart-heading my-4">
          <ShoppingBag className="me-2" /> Reserved Medicines Cart
        </h1>

        {cart.length === 0 ? (
          <div className="empty-cart-box">
            <h3>Your Reservation Cart is Empty</h3>
            <p>Looks like you haven't selected any medicines to reserve yet.</p>
            <Link to="/medicines" className="btn btn-primary mt-3">
              Browse Medicines
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="cart-items-card">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.medicine_id}>
                        <td>
                          <div className="cart-item-info">
                            {item.image && (
                              <img src={item.image} alt={item.medicine_name} />
                            )}
                            <div>
                              <h5 className="mb-0">{item.medicine_name}</h5>
                              <small className="text-muted">
                                {item.description}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>Rs. {item.price}</td>
                        <td>
                          <div className="qty-controls">
                            <button onClick={() => updateQuantity(item.medicine_id, -1)}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.medicine_id, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="item-total">
                          Rs. {(parseFloat(item.price) || 0) * item.quantity}
                        </td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.medicine_id)}
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="order-summary-card">
                <h3>Pickup & Hold Summary</h3>
                <hr />

                {/* Pickup Pharmacy Selection */}
                <div className="mb-3">
                  <label className="form-label d-flex align-items-center gap-1 fw-bold">
                    <MapPin size={16} className="text-primary" /> Select Pickup Pharmacy
                  </label>
                  <select 
                    className="form-select"
                    value={selectedPharmacy}
                    onChange={(e) => setSelectedPharmacy(e.target.value)}
                  >
                    <option value="MedPlus Pharmacy">MedPlus Pharmacy - Unit 7, Latifabad</option>
                    <option value="Care Pharmacy">Care Pharmacy - Qasimabad</option>
                    <option value="City Health Pharmacy">City Health Pharmacy - Saddar</option>
                  </select>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Hold / Pickup Fee</span>
                  <span className="text-success fw-bold">FREE</span>
                </div>
                
                <hr />
                
                <div className="summary-row grand-total">
                  <span>Total Payable at Counter</span>
                  <span>Rs. {subtotal}</span>
                </div>

                {/* Hold Time Note */}
                <div className="hold-info-box mt-3 p-2 border rounded bg-light">
                  <small className="d-flex align-items-center gap-1 text-secondary">
                    <Clock size={14} /> Medicines will be held for <strong>4 Hours</strong> after reservation.
                  </small>
                </div>

                <button className="checkout-btn mt-3" onClick={handleReservation}>
                  Confirm Reservation & Hold
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

