-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2018 at 01:45 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `business_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, '×ž××¤×™×'),
(2, '×œ×—×ž×™×'),
(3, '×©×ª×™×™×”'),
(4, '×ž×•×¦×¨×™ ×—×œ×‘'),
(5, '×—×•×ž×¨×™ ×’×œ×'),
(6, '×ž×ª×•×§×™×'),
(7, '×¢×•×’×•×ª'),
(8, '×§×˜×’×•×¨×™×” ×œ×™×©×™'),
(9, '×™×¨×§×•×ª'),
(10, '×¤×™×¨×•×ª'),
(11, '×¤×™×ª×•×ª'),
(12, '×—×™×¦×•× ×™'),
(13, '×§×˜×’×•×¨×™×” ×™×•× ×™'),
(14, '×’×“×¨×•×ª');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `phone`) VALUES
(1, '×¨×ž×™ ×œ×•×™', '04-6958472'),
(2, '×©×•×¤×¨×¡×œ', '050-3822-6100'),
(3, '×§×¤×” ×§×¤×”', '04-6949-927'),
(4, '×ž× ×©×” ×ž×©×§××•×ª', '050-3499-299'),
(5, '×¤×œ××¤×œ ×¢×ž×¨', '04-6949-123'),
(6, '×¨×•×œ×“×™×Ÿ', '04-695-8827'),
(7, 'Biga', ''),
(8, '××¨×•×ž×”', '× ×™×™×“: 050-123-4567'),
(9, '×œ×§×•×— ×œ×™×©×™', '050-3500-488'),
(10, '×¤× ×™×ž×™', ''),
(11, '×’×•×’×œ', '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `version` tinyint(4) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `supply_date` datetime NOT NULL,
  `notes` tinytext NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `version`, `customer_id`, `order_date`, `supply_date`, `notes`, `status`) VALUES
(1, 0, 3, '2018-01-06 20:34:28', '2018-01-07 08:30:28', '×”×–×ž× ×ª ×‘×•×§×¨', 8),
(2, 5, 8, '2018-01-06 21:12:42', '2018-01-06 21:25:43', '×ž×¢×•×“×›×Ÿ', 8),
(3, 0, 7, '2018-01-06 21:33:13', '2018-01-07 09:20:13', '', 9),
(4, 1, 4, '2018-01-08 18:43:57', '2018-01-08 19:15:57', '×”×–×ž× ×” ×ž×¢×•×“×›× ×ª', 8),
(5, 4, 2, '2018-01-08 20:15:32', '2018-01-08 21:25:32', '×”×–×ž× ×” ×˜×œ×¤×•× ×™×ª', 8),
(6, 0, 7, '2018-01-08 21:50:01', '2018-01-09 05:00:01', '', 8),
(7, 3, 1, '2018-01-08 22:17:53', '2018-01-09 19:05:53', '', 8),
(8, 0, 3, '2018-01-09 19:20:53', '2018-01-10 12:30:53', '', 8),
(9, 5, 3, '2018-01-09 19:46:22', '2018-01-10 12:15:23', '', 8),
(10, 1, 6, '2018-01-09 19:48:05', '2018-01-10 05:00:05', '×–×ž× ×™× ×—×©×•×‘×™× ×ž××•×“', 8),
(11, 0, 1, '2018-01-09 20:13:19', '2018-01-10 08:00:19', '', 8),
(12, 0, 2, '2018-01-09 20:13:53', '2018-01-10 07:00:53', '', 8),
(13, 0, 5, '2018-01-09 20:14:08', '2018-01-10 05:00:08', '', 8),
(14, 1, 9, '2018-01-09 20:24:53', '2018-01-11 10:00:53', '×”×–×ž× ×ª ×©×¢×¨ ×—×©×ž×œ×™', 8),
(15, 0, 9, '2018-01-09 20:48:49', '2018-01-10 10:00:50', '', 8),
(16, 2, 6, '2018-01-09 22:31:25', '2018-01-11 10:30:25', '', 8),
(17, 0, 1, '2018-01-10 18:53:40', '2018-01-10 19:15:40', '', 7),
(18, 0, 2, '2018-01-10 22:21:06', '2018-01-11 07:00:06', '', 4),
(19, 1, 3, '2018-01-11 08:40:40', '2018-01-11 17:30:40', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders_history`
--

CREATE TABLE `orders_history` (
  `id` int(11) NOT NULL,
  `version` tinyint(4) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` datetime NOT NULL,
  `supply_date` datetime NOT NULL,
  `notes` tinytext NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders_history`
--

INSERT INTO `orders_history` (`id`, `version`, `customer_id`, `order_date`, `supply_date`, `notes`, `status`) VALUES
(2, 0, 8, '2018-01-06 21:12:42', '2018-01-06 21:30:43', '', 2),
(2, 1, 8, '2018-01-06 21:12:42', '2018-01-06 21:30:43', '×ž×¢×•×“×›×Ÿ', 3),
(2, 2, 8, '2018-01-06 21:12:42', '2018-01-06 21:25:43', '×ž×¢×•×“×›×Ÿ', 4),
(2, 3, 8, '2018-01-06 21:12:42', '2018-01-06 21:25:43', '×ž×¢×•×“×›×Ÿ', 4),
(2, 4, 8, '2018-01-06 21:12:42', '2018-01-06 21:25:43', '×ž×¢×•×“×›×Ÿ', 4),
(4, 0, 4, '2018-01-08 18:43:57', '2018-01-08 19:15:57', '', 4),
(5, 0, 2, '2018-01-08 20:15:32', '2018-01-08 21:00:32', '×”×–×ž× ×” ×˜×œ×¤×•× ×™×ª', 2),
(5, 1, 2, '2018-01-08 20:15:32', '2018-01-08 21:20:32', '×”×–×ž× ×” ×˜×œ×¤×•× ×™×ª', 3),
(5, 2, 2, '2018-01-08 20:15:32', '2018-01-08 21:10:32', '×”×–×ž× ×” ×˜×œ×¤×•× ×™×ª', 3),
(5, 3, 2, '2018-01-08 20:15:32', '2018-01-08 21:20:32', '×”×–×ž× ×” ×˜×œ×¤×•× ×™×ª', 4),
(7, 1, 1, '2018-01-08 22:17:53', '2018-01-09 09:00:53', '', 2),
(7, 2, 1, '2018-01-08 22:17:53', '2018-01-09 19:00:53', '', 3),
(9, 1, 3, '2018-01-09 19:46:22', '2018-01-10 12:30:23', '', 2),
(10, 0, 6, '2018-01-09 19:48:05', '2018-01-10 05:00:05', '×–×ž× ×™× ×—×©×•×‘×™×', 2),
(16, 1, 6, '2018-01-09 22:31:25', '2018-01-11 10:30:25', '', 2),
(19, 0, 3, '2018-01-11 08:40:40', '2018-01-11 17:30:40', '', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_rows`
--

CREATE TABLE `order_rows` (
  `order_id` int(11) NOT NULL,
  `order_version` tinyint(4) NOT NULL,
  `row_num` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `notes` tinytext NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_rows`
--

INSERT INTO `order_rows` (`order_id`, `order_version`, `row_num`, `product_id`, `amount`, `notes`, `status`) VALUES
(1, 0, 1, 3, 250, '', 4),
(1, 0, 2, 4, 250, '×¤×¨×•×¡ ×˜×•×‘', 4),
(1, 0, 3, 5, 300, '', 4),
(2, 5, 1, 3, 200, '', 4),
(2, 5, 2, 4, 250, '×¤×¨×•×¡ ×“×§', 4),
(2, 5, 3, 5, 300, '', 4),
(2, 5, 4, 14, 360, '360', 4),
(2, 5, 5, 8, 120, '', 4),
(3, 0, 1, 8, 200, '', 0),
(3, 0, 2, 6, 300, '', 0),
(4, 1, 1, 8, 230, '', 4),
(4, 1, 2, 6, 230, '', 4),
(4, 1, 3, 16, 230, '', 4),
(4, 1, 4, 18, 230, '', 4),
(4, 1, 5, 17, 110, '', 4),
(5, 4, 1, 3, 120, '', 4),
(5, 4, 2, 4, 200, '×¤×¨×•×¡ ×˜×•×‘', 4),
(5, 4, 3, 5, 220, '', 4),
(5, 4, 4, 14, 300, '', 4),
(6, 0, 1, 2, 400, '', 4),
(7, 3, 1, 2, 240, '×—× ×ž×”×ª× ×•×¨', 4),
(8, 0, 1, 4, 240, '', 4),
(8, 0, 2, 3, 160, '', 4),
(9, 5, 1, 3, 251, '', 4),
(9, 5, 2, 5, 10, '×—×“×©', 4),
(10, 1, 1, 4, 80, '', 4),
(10, 1, 2, 7, 43, '', 4),
(10, 1, 3, 6, 110, '', 4),
(11, 0, 1, 1, 5, '', 4),
(12, 0, 1, 2, 5, '', 4),
(13, 0, 1, 4, 5, '', 4),
(14, 1, 1, 23, 100, '', 4),
(14, 1, 2, 25, 20, '', 4),
(14, 1, 3, 24, 1, '', 4),
(14, 1, 4, 26, 30, '', 4),
(14, 1, 5, 6, 1, '', 4),
(15, 0, 1, 6, 1, '', 4),
(16, 2, 1, 2, 20, '', 4),
(16, 2, 2, 3, 50, '', 4),
(16, 2, 3, 4, 120, '', 4),
(17, 0, 1, 3, 220, '', 4),
(17, 0, 2, 4, 310, '×¤×¨×•×¡ ×˜×•×‘', 4),
(18, 0, 1, 1, 222, '', 4),
(19, 1, 1, 1, 90, '×”×¨×‘×” ×©×•×§×•×œ×“', 0),
(19, 1, 2, 2, 80, '', 0),
(19, 1, 3, 3, 15, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_rows_history`
--

CREATE TABLE `order_rows_history` (
  `order_id` int(11) NOT NULL,
  `order_version` tinyint(4) NOT NULL,
  `row_num` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `notes` tinytext NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_rows_history`
--

INSERT INTO `order_rows_history` (`order_id`, `order_version`, `row_num`, `product_id`, `amount`, `notes`, `status`) VALUES
(2, 0, 1, 3, 200, '', 0),
(2, 1, 1, 3, 200, '', 3),
(2, 1, 2, 4, 250, '×¤×¨×•×¡ ×“×§', 0),
(2, 2, 1, 3, 200, '', 4),
(2, 2, 2, 4, 250, '×¤×¨×•×¡ ×“×§', 4),
(2, 2, 3, 5, 300, '', 4),
(2, 3, 1, 3, 200, '', 4),
(2, 3, 2, 4, 250, '×¤×¨×•×¡ ×“×§', 4),
(2, 3, 3, 5, 300, '', 4),
(2, 3, 4, 14, 350, '', 4),
(2, 4, 1, 3, 200, '', 4),
(2, 4, 2, 4, 250, '×¤×¨×•×¡ ×“×§', 4),
(2, 4, 3, 5, 300, '', 4),
(2, 4, 4, 14, 360, '360', 4),
(4, 0, 1, 8, 230, '', 4),
(4, 0, 2, 6, 230, '', 4),
(4, 0, 3, 16, 230, '', 4),
(4, 0, 4, 18, 230, '', 4),
(5, 0, 1, 3, 120, '', 0),
(5, 0, 2, 4, 200, '×¤×¨×•×¡ ×˜×•×‘', 0),
(5, 0, 3, 5, 220, '', 0),
(5, 0, 4, 14, 300, '', 0),
(5, 1, 1, 3, 120, '', 3),
(5, 1, 2, 4, 200, '×¤×¨×•×¡ ×˜×•×‘', 0),
(5, 1, 3, 5, 220, '', 0),
(5, 1, 4, 14, 300, '', 0),
(5, 2, 1, 3, 120, '', 4),
(5, 2, 2, 4, 200, '×¤×¨×•×¡ ×˜×•×‘', 4),
(5, 2, 3, 5, 220, '', 4),
(5, 2, 4, 14, 300, '', 3),
(5, 3, 1, 3, 120, '', 4),
(5, 3, 2, 4, 200, '×¤×¨×•×¡ ×˜×•×‘', 4),
(5, 3, 3, 5, 220, '', 4),
(5, 3, 4, 14, 300, '', 4),
(7, 1, 1, 2, 240, '', 0),
(7, 2, 1, 2, 240, '', 3),
(9, 1, 1, 3, 250, '', 0),
(9, 1, 2, 4, 120, '×¤×¨×•×¡ ×˜×•×‘', 0),
(10, 0, 1, 4, 80, '', 0),
(10, 0, 2, 3, 110, '', 0),
(10, 0, 3, 8, 300, '×§×¨', 0),
(16, 1, 1, 2, 20, '', 0),
(16, 1, 2, 3, 50, '', 0),
(16, 1, 3, 4, 120, '', 0),
(19, 0, 1, 1, 80, '×”×¨×‘×” ×©×•×§×•×œ×“', 0),
(19, 0, 2, 2, 80, '', 0),
(19, 0, 3, 3, 15, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`) VALUES
(1, 1, '×§×¨×•××¡×•×Ÿ ×©×•×§×•×œ×“'),
(2, 1, '×¨×•×’×œ×š'),
(3, 2, '×œ×—× ×§×œ'),
(4, 2, '×œ×—× ×¤×¨×•×¡'),
(5, 2, '×œ×—× ×“×’× ×™×'),
(6, 3, '×¤×× ×˜×”'),
(7, 2, '×—×œ×”'),
(8, 3, '×§×•×œ×”'),
(9, 4, '×—×œ×‘ 3 ××—×•×–'),
(10, 7, '×¢×•×’×ª ×“×‘×© ×ž×ª×•×§×”'),
(11, 7, '×¢×•×’×ª ×©×•×§×•×œ×“'),
(12, 8, '×ž×•×¦×¨ ×œ×™×©×™'),
(13, 2, '×œ×—×ž× ×™×” ×ž×ª×•×§×”'),
(14, 2, '×œ×—× ×©×—×•×¨'),
(15, 3, '× ×¡×˜×™'),
(16, 5, '×§×ž×—'),
(17, 5, '×¡×•×›×¨ ×—×•×'),
(18, 5, '×¡×•×›×¨ ×œ×‘×Ÿ'),
(19, 11, '×¤×™×ª×”'),
(20, 11, '×¤×™×ª×” ×ž×§×ž×— ×ž×œ×'),
(21, 5, '×©×ž×¨×™×'),
(22, 5, '×§×¤×” ×©×—×•×¨'),
(23, 14, '×¤×¨×•×¤×™×œ ××œ×•×ž×™× ×™×•× 5'),
(24, 14, '×ž× ×•×¢ ×—×©×ž×œ×™ 12V'),
(25, 14, '×¤×¨×•×¤×™×œ ×ž×¡×’×¨×ª 30'),
(26, 14, '×¤×¡ ×–×›×•×›×™×ª');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `name` varchar(40) NOT NULL,
  `value` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`name`, `value`) VALUES
('monitor_active_order_hours', '22');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `orders_history`
--
ALTER TABLE `orders_history`
  ADD KEY `id` (`id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `order_rows`
--
ALTER TABLE `order_rows`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `order_rows_history`
--
ALTER TABLE `order_rows_history`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
