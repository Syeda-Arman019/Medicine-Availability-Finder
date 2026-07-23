import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, MapPin, Clock } from "lucide-react";
import "./CartPage.css";

export default function CartPage({ cart = [], updateQuantity, removeFromCart }) {
  const [selectedPharmacy, setSelectedPharmacy] = useState("MedPlus Pharmacy - Main Branch");

  const subtotal = cart.reduce((acc, item) => acc + (item.numericPrice || 0) * item.quantity, 0);

  const handleReservation = () => {
    alert(`🟢 Reservation Successful!\n\nYour medicines have been reserved at: ${selectedPharmacy}.\n\nPlease show your reservation code #MF-${Math.floor(1000 + Math.random() * 9000)} at the counter within 4 hours.`);
  };

  return (
    <div className="cart-page-wrapper">
      <div className="container py-5">
        <Link to="/medicines" className="back-link">
          <ArrowLeft size={18} /> Continue Browsing
        </Link>

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
                      <tr key={item.id}>
                        <td>
                          <div className="cart-item-info">
                            {item.image && (
                              <img src={item.image} alt={item.name} />
                            )}
                            <div>
                              <h5 className="mb-0">{item.name}</h5>
                              <small className="text-muted">{item.pack}</small>
                            </div>
                          </div>
                        </td>
                        <td>Rs. {item.numericPrice}</td>
                        <td>
                          <div className="qty-controls">
                            <button onClick={() => updateQuantity(item.id, -1)}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="item-total">
                          Rs. {item.numericPrice * item.quantity}
                        </td>
                        <td>
                          <button
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
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
                    <option value="MedPlus Pharmacy - Main Branch">MedPlus Pharmacy - Main Branch</option>
                    <option value="Care Pharmacy - Station Road">Care Pharmacy - Station Road</option>
                    <option value="City Health Pharmacy - Saddar">City Health Pharmacy - Saddar</option>
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