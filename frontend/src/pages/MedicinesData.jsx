import React from "react";

export const MEDICINES = [
  {
    id: 1,
    name: "Panadol Extra",
    pack: "20 tablets",
    price: "Rs. 120",
    numericPrice: 120,
    category: "Pain relief",
    image: "/images/panadol.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" },
      { id: 102, name: "Al-Razi Medicos", location: "Latifabad Unit 7, Hyderabad", distance: "2.5 km", status: "In Stock", phone: "0301-7654321" },
      { id: 103, name: "Awan Pharmacy", location: "Auto Bhan Road, Hyderabad", distance: "4.0 km", status: "Out of Stock", phone: "0302-9876543" }
    ]
  },
  {
    id: 2,
    name: "Augmentin 625mg",
    pack: "10 tablets",
    price: "Rs. 450",
    numericPrice: 450,
    category: "Antibiotic",
    image: "/images/Augmentin.png",
    pharmacies: [
      { id: 102, name: "Al-Razi Medicos", location: "Latifabad Unit 7, Hyderabad", distance: "2.5 km", status: "In Stock", phone: "0301-7654321" },
      { id: 103, name: "Awan Pharmacy", location: "Auto Bhan Road, Hyderabad", distance: "4.0 km", status: "Low Stock", phone: "0302-9876543" }
    ]
  },
  {
    id: 3,
    name: "Disprin 300mg",
    pack: "10 tablets",
    price: "Rs. 40",
    numericPrice: 40,
    category: "Pain relief",
    image: "/images/Disprin.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" },
      { id: 103, name: "Awan Pharmacy", location: "Auto Bhan Road, Hyderabad", distance: "4.0 km", status: "In Stock", phone: "0302-9876543" }
    ]
  },
  {
    id: 4,
    name: "Brufen 400mg",
    pack: "20 tablets",
    price: "Rs. 180",
    numericPrice: 180,
    category: "Pain relief",
    image: "/images/Brufen.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" }
    ]
  },
  {
    id: 5,
    name: "Calpol Syrup",
    pack: "60ml",
    price: "Rs. 160",
    numericPrice: 160,
    category: "Fever & Cold",
    image: "/images/Calpol.png",
    pharmacies: [
      { id: 102, name: "Al-Razi Medicos", location: "Latifabad Unit 7, Hyderabad", distance: "2.5 km", status: "In Stock", phone: "0301-7654321" }
    ]
  },
  {
    id: 6,
    name: "Insulin Glargine",
    pack: "1 vial",
    price: "Rs. 1,650",
    numericPrice: 1650,
    category: "Diabetes",
    image: "/images/Insulin Glargine.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "Low Stock", phone: "0300-1234567" }
    ]
  },
  {
    id: 7,
    name: "Vitamin D3",
    pack: "10 tablets",
    price: "Rs. 210",
    numericPrice: 210,
    category: "Supplements",
    image: "/images/Vitamin D3.png",
    pharmacies: [
      { id: 103, name: "Awan Pharmacy", location: "Auto Bhan Road, Hyderabad", distance: "4.0 km", status: "In Stock", phone: "0302-9876543" }
    ]
  },
  {
    id: 8,
    name: "ORS Sachets",
    pack: "5 sachets",
    price: "Rs. 75",
    numericPrice: 75,
    category: "First Aid",
    image: "/images/ORS Sachets.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" }
    ]
  },
  {
    id: 9,
    name: "Flagyl 400mg",
    pack: "20 tablets",
    price: "Rs. 195",
    numericPrice: 195,
    category: "Antibiotic",
    image: "/images/flagyl.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" }
    ]
  },
  {
    id: 10,
    name: "Surbex Z",
    pack: "30 tablets",
    price: "Rs. 380",
    numericPrice: 380,
    category: "Supplements",
    image: "/images/surbex.png",
    pharmacies: [
      { id: 102, name: "Al-Razi Medicos", location: "Latifabad Unit 7, Hyderabad", distance: "2.5 km", status: "In Stock", phone: "0301-7654321" }
    ]
  },
  {
    id: 11,
    name: "Arinac Forte",
    pack: "10 tablets",
    price: "Rs. 110",
    numericPrice: 110,
    category: "Fever & Cold",
    image: "/images/arinac.png",
    pharmacies: [
      { id: 103, name: "Davago Pharmacy", location: "Auto Bhan Road, Hyderabad", distance: "4.0 km", status: "In Stock", phone: "0302-9876543" }
    ]
  },
  {
    id: 12,
    name: "Glucophage 500mg",
    pack: "50 tablets",
    price: "Rs. 320",
    numericPrice: 320,
    category: "Diabetes",
    image: "/images/glucophage.png",
    pharmacies: [
      { id: 101, name: "City Care Pharmacy", location: "Saddar, Hyderabad", distance: "1.2 km", status: "In Stock", phone: "0300-1234567" }
    ]
  }
];