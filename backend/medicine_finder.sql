-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 28, 2026 at 09:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medicine_finder`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(11) NOT NULL,
  `medicine_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `medicine_id`, `quantity`) VALUES
(1, 1, 50),
(2, 2, 40),
(3, 3, 35),
(4, 4, 25),
(5, 5, 60),
(6, 6, 15),
(7, 7, 20),
(8, 8, 30),
(9, 9, 18),
(10, 10, 22),
(11, 11, 45),
(12, 12, 28);

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `medicine_id` int(11) NOT NULL,
  `medicine_name` varchar(100) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`medicine_id`, `medicine_name`, `category`, `description`, `price`, `image`) VALUES
(1, 'Panadol Extra', 'Pain Relief', 'Pain relief tablets', 120.00, '/images/panadol.png'),
(2, 'Augmentin 625mg', 'Antibiotic', 'Antibiotic tablets', 450.00, '/images/Augmentin.png'),
(3, 'Disprin 300mg', 'Pain Relief', 'Pain relief tablets', 40.00, '/images/Disprin.png'),
(4, 'Brufen 400mg', 'Pain Relief', 'Pain relief tablets', 180.00, '/images/Brufen.png'),
(5, 'Calpol Syrup', 'Fever & Cold', 'Fever syrup', 160.00, '/images/Calpol.png'),
(6, 'Insulin Glargine', 'Diabetes', 'Insulin injection', 1650.00, '/images/Insulin Glargine.png'),
(7, 'Vitamin D3', 'Supplements', 'Vitamin supplement', 210.00, '/images/Vitamin D3.png'),
(8, 'ORS Sachets', 'First Aid', 'Oral rehydration salts', 75.00, '/images/ORS Sachets.png'),
(9, 'Flagyl 400mg', 'Antibiotic', 'Antibiotic tablets', 195.00, '/images/flagyl.png'),
(10, 'Surbex Z', 'Supplements', 'Multivitamin tablets', 380.00, '/images/surbex.png'),
(11, 'Arinac Forte', 'Fever & Cold', 'Cold and flu tablets', 110.00, '/images/arinac.png'),
(12, 'Glucophage 500mg', 'Diabetes', 'Diabetes medicine', 320.00, '/images/glucophage.png');

-- --------------------------------------------------------

--
-- Table structure for table `pharmacies`
--

CREATE TABLE `pharmacies` (
  `pharmacy_id` int(11) NOT NULL,
  `pharmacy_name` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `opening_hours` varchar(100) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pharmacies`
--

INSERT INTO `pharmacies` (`pharmacy_id`, `pharmacy_name`, `address`, `phone`, `opening_hours`, `status`) VALUES
(1, 'MedPlus Pharmacy', 'Unit 7, Latifabad, Hyderabad', '0300-1234567', '9 AM - 11 PM', 'Open'),
(2, 'Care Pharmacy', 'Qasimabad, Hyderabad', '0301-7654321', '9 AM - 11 PM', 'Open'),
(3, 'City Health Pharmacy', 'Saddar, Hyderabad', '0302-9876543', '9 AM - 11 PM', 'Open');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pharmacy_id` int(11) DEFAULT NULL,
  `reservation_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `expiry_time` datetime DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Reserved'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `user_id`, `pharmacy_id`, `reservation_time`, `expiry_time`, `total_amount`, `status`) VALUES
(1, 2, 1, '2026-07-27 12:01:32', '2026-07-27 21:01:32', 1860.00, 'Pending'),
(2, 1, 1, '2026-07-27 12:59:28', '2026-07-27 21:59:28', 200.00, 'Pending'),
(3, 2, 1, '2026-07-27 14:51:39', '2026-07-27 23:51:39', 490.00, 'Pending'),
(4, 2, 1, '2026-07-27 14:51:56', '2026-07-27 23:51:56', 490.00, 'Pending'),
(5, 1, 1, '2026-07-27 15:40:53', '2026-07-28 00:40:53', 1470.00, 'Pending'),
(6, 1, 1, '2026-07-27 18:51:01', '2026-07-28 03:51:01', 445.00, 'Pending'),
(7, 1, 1, '2026-07-27 18:53:27', '2026-07-28 03:53:27', 1860.00, 'Pending'),
(8, 1, 1, '2026-07-27 19:12:12', '2026-07-28 04:12:12', 570.00, 'Pending'),
(9, 1, 1, '2026-07-28 07:34:56', '2026-07-28 16:34:56', 285.00, 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_items`
--

CREATE TABLE `reservation_items` (
  `reservation_item_id` int(11) NOT NULL,
  `reservation_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_items`
--

INSERT INTO `reservation_items` (`reservation_item_id`, `reservation_id`, `medicine_id`, `quantity`, `price`) VALUES
(1, 1, 6, 1, 1650.00),
(2, 1, 7, 1, 210.00),
(3, 2, 1, 2, 100.00),
(4, 3, 2, 1, 450.00),
(5, 3, 3, 1, 40.00),
(6, 4, 2, 1, 450.00),
(7, 4, 3, 1, 40.00),
(8, 5, 2, 2, 450.00),
(9, 5, 7, 2, 210.00),
(10, 5, 8, 2, 75.00),
(11, 6, 5, 1, 160.00),
(12, 6, 7, 1, 210.00),
(13, 6, 8, 1, 75.00),
(14, 7, 6, 1, 1650.00),
(15, 7, 7, 1, 210.00),
(16, 8, 1, 1, 120.00),
(17, 8, 2, 1, 450.00),
(18, 9, 7, 1, 210.00),
(19, 9, 8, 1, 75.00);

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stock_id` int(11) NOT NULL,
  `pharmacy_id` int(11) DEFAULT NULL,
  `medicine_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT 0,
  `last_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stock_id`, `pharmacy_id`, `medicine_id`, `quantity`, `last_updated`) VALUES
(1, 1, 1, 50, '2026-07-26 19:11:54'),
(2, 1, 2, 20, '2026-07-26 19:11:54'),
(3, 1, 3, 40, '2026-07-26 19:11:54'),
(4, 1, 4, 35, '2026-07-26 19:11:54'),
(5, 1, 5, 25, '2026-07-26 19:11:54'),
(6, 1, 6, 10, '2026-07-26 19:11:54'),
(7, 1, 8, 60, '2026-07-26 19:11:54'),
(8, 2, 1, 30, '2026-07-26 19:11:54'),
(9, 2, 5, 20, '2026-07-26 19:11:54'),
(10, 2, 7, 15, '2026-07-26 19:11:54'),
(11, 2, 9, 25, '2026-07-26 19:11:54'),
(12, 2, 10, 18, '2026-07-26 19:11:54'),
(13, 2, 11, 22, '2026-07-26 19:11:54'),
(14, 3, 2, 15, '2026-07-26 19:11:54'),
(15, 3, 3, 20, '2026-07-26 19:11:54'),
(16, 3, 4, 25, '2026-07-26 19:11:54'),
(17, 3, 7, 30, '2026-07-26 19:11:54'),
(18, 3, 10, 15, '2026-07-26 19:11:54'),
(19, 3, 12, 18, '2026-07-26 19:11:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `phone`, `password`, `created_at`) VALUES
(1, 'Test User', 'test@gmail.com', '03001234567', 'testuser', '2026-07-26 19:58:01'),
(2, 'Syeda Arman Shah', 'syedaarman11@gmail.com', '03301234567', 'testuser', '2026-07-27 11:29:44'),
(3, 'Kashaf Fatima', 'kashafnawaz9876@gmail.com', '03303253292', '1234567', '2026-07-27 11:50:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`medicine_id`);

--
-- Indexes for table `pharmacies`
--
ALTER TABLE `pharmacies`
  ADD PRIMARY KEY (`pharmacy_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- Indexes for table `reservation_items`
--
ALTER TABLE `reservation_items`
  ADD PRIMARY KEY (`reservation_item_id`),
  ADD KEY `reservation_id` (`reservation_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stock_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`),
  ADD KEY `medicine_id` (`medicine_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `medicine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `pharmacies`
--
ALTER TABLE `pharmacies`
  MODIFY `pharmacy_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reservation_items`
--
ALTER TABLE `reservation_items`
  MODIFY `reservation_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`pharmacy_id`);

--
-- Constraints for table `reservation_items`
--
ALTER TABLE `reservation_items`
  ADD CONSTRAINT `reservation_items_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`),
  ADD CONSTRAINT `reservation_items_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`pharmacy_id`) REFERENCES `pharmacies` (`pharmacy_id`),
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`medicine_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
