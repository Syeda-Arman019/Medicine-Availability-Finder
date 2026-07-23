import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// Pages folder waali files (sahi paths):
import Home from "./pages/Home";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Medicines from "./pages/Medicines";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQs from "./pages/FAQs";

// Agar CartPage ko bhi pages folder me move kar diya hai to:
import CartPage from "./pages/CartPage";
// (Agar CartPage abhi tak src me hi hai, to isko: import CartPage from "./CartPage"

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (medicine) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...medicine, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
      <Route path="/terms" element={<Terms />} />
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
  );
}