-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2018 at 04:26 PM
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
CREATE DATABASE IF NOT EXISTS `business_manager` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `business_manager`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_box_deliveries`
--

CREATE TABLE `chat_box_deliveries` (
  `id` int(11) NOT NULL,
  `sent_on` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` varchar(40) NOT NULL,
  `msg` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_box_management`
--

CREATE TABLE `chat_box_management` (
  `id` int(11) NOT NULL,
  `sent_on` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` varchar(40) NOT NULL,
  `msg` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_box_monitor`
--

CREATE TABLE `chat_box_monitor` (
  `id` int(11) NOT NULL,
  `sent_on` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` varchar(40) NOT NULL,
  `msg` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_box_orders`
--

CREATE TABLE `chat_box_orders` (
  `id` int(11) NOT NULL,
  `sent_on` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `session_id` varchar(40) NOT NULL,
  `msg` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_rooms`
--

CREATE TABLE `chat_rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_rooms`
--

INSERT INTO `chat_rooms` (`id`, `name`) VALUES
(1, 'MANAGEMENT'),
(2, 'ORDERS'),
(3, 'MONITOR'),
(4, 'DELIVERIES');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `is_notes_resolved` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `is_notes_resolved` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `is_notes_resolved` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `is_notes_resolved` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
('chat_mode', '0'),
('comments_enforcement', '1'),
('deliveries_refresh_rate_minutes', '5'),
('monitor_active_order_hours', '24'),
('monitor_refresh_rate_minutes', '1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `is_deleted`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 0),
(2, 'manager', '1d0258c2440a8d19e716292b231e3190', 0),
(3, 'yoni', 'b1bd441640687fb9d62ce755d1b010d4', 1),
(4, 'yoni2', '4a317ce72b6c73e0e6d7842bff05a07a', 1),
(5, 'yoni3', 'b99b1754b8b634df31fa9933c2d10aa7', 1),
(6, 'yoni4', '4124bc0a9335c27f086f24ba207a4912', 1),
(7, 'yoyo', '48dc8d29308eb256edc76f25def07251', 1),
(8, 'only_monitor', '81dc9bdb52d04dc20036dbd8313ed055', 0),
(9, 'lishay', '81dc9bdb52d04dc20036dbd8313ed055', 0),
(10, 'yyy', 'f0a4058fd33489695d53df156b77c724', 1),
(11, 'lishay_m', '81dc9bdb52d04dc20036dbd8313ed055', 0),
(12, 'lishay_s', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(13, 'repo', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(14, 'shirli', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(15, 'nisim', '81dc9bdb52d04dc20036dbd8313ed055', 1),
(16, 'yosi', 'bebceff7cb66cf7232478306cba94d8e', 0),
(17, 'saar', 'aa20d239b0ab4229c275d88a1c33879d', 0),
(18, 'aviel_work', '81dc9bdb52d04dc20036dbd8313ed055', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_access`
--

CREATE TABLE `users_access` (
  `user_id` int(11) NOT NULL,
  `access_home` tinyint(4) NOT NULL DEFAULT '0',
  `access_products` tinyint(4) NOT NULL DEFAULT '0',
  `access_customers` tinyint(4) NOT NULL DEFAULT '0',
  `access_orders` tinyint(4) NOT NULL DEFAULT '0',
  `access_monitor` tinyint(4) NOT NULL DEFAULT '0',
  `access_deliveries` tinyint(4) NOT NULL DEFAULT '0',
  `access_reports` tinyint(4) NOT NULL,
  `access_system` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_access`
--

INSERT INTO `users_access` (`user_id`, `access_home`, `access_products`, `access_customers`, `access_orders`, `access_monitor`, `access_deliveries`, `access_reports`, `access_system`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1),
(2, 1, 0, 0, 1, 0, 0, 0, 0),
(3, 1, 0, 0, 1, 0, 0, 0, 0),
(4, 1, 1, 1, 0, 0, 0, 0, 0),
(5, 0, 0, 0, 0, 0, 0, 0, 0),
(6, 1, 0, 0, 0, 0, 0, 0, 1),
(7, 0, 0, 0, 0, 1, 0, 0, 0),
(8, 0, 0, 0, 0, 1, 0, 0, 0),
(9, 0, 0, 0, 0, 1, 0, 0, 0),
(10, 0, 0, 0, 0, 1, 0, 0, 0),
(11, 0, 0, 0, 0, 1, 0, 0, 0),
(12, 0, 0, 0, 0, 0, 1, 0, 0),
(13, 0, 0, 0, 0, 0, 0, 1, 0),
(14, 0, 1, 1, 1, 0, 0, 0, 0),
(15, 0, 0, 0, 0, 1, 0, 0, 0),
(16, 0, 0, 0, 0, 1, 0, 0, 0),
(17, 1, 0, 0, 0, 0, 0, 0, 0),
(18, 0, 0, 0, 0, 1, 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_box_deliveries`
--
ALTER TABLE `chat_box_deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `chat_box_management`
--
ALTER TABLE `chat_box_management`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `chat_box_monitor`
--
ALTER TABLE `chat_box_monitor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `chat_box_orders`
--
ALTER TABLE `chat_box_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
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
-- Indexes for table `users_access`
--
ALTER TABLE `users_access`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `chat_box_deliveries`
--
ALTER TABLE `chat_box_deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_box_management`
--
ALTER TABLE `chat_box_management`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_box_monitor`
--
ALTER TABLE `chat_box_monitor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `chat_box_orders`
--
ALTER TABLE `chat_box_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_rooms`
--
ALTER TABLE `chat_rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
