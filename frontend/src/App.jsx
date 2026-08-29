import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Medicines from "./pages/Medicines";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";
import CartPage from "./pages/CartPage";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./components/Chatbot";
import AccountSettings from "./pages/AccountSettings";

export default function App() {
  // 1. Cart State & Helper Logic
  const [cart, setCart] = useState([]);

  // Helper function to safely extract the item ID
  // Handles medicine_id from Flask OR id
  const getItemId = (item) => item.medicine_id ?? item.id;

  const addToCart = (medicine) => {
    const medId = getItemId(medicine);

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => getItemId(item) === medId
      );

      if (existingItem) {
        return prevCart.map((item) =>
          getItemId(item) === medId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (getItemId(item) === id) {
            const newQty = item.quantity + delta;

            return newQty > 0
              ? { ...item, quantity: newQty }
              : null;
          }

          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => getItemId(item) !== id)
    );
  };

  // 2. Render Routes
  return (
    <>
      {/* Scroll page to top whenever route changes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/faqs" element={<FAQs />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* Account Settings */}
        <Route
          path="/settings"
          element={<AccountSettings />}
        />

        {/* Medicines */}
        <Route
          path="/medicines"
          element={
            <Medicines
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          }
        />

        {/* Terms */}
        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}