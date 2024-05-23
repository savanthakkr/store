-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 23, 2024 at 06:28 AM
-- Server version: 8.2.0
-- PHP Version: 8.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `createdAt`) VALUES
(1, 'savanponda11@gmail.com', 'savanponda', '2024-05-23 04:55:33');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(100) DEFAULT NULL,
  `createdBy` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `createdBy` (`createdBy`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `categoryName`, `createdBy`) VALUES
(1, 'test', 1),
(4, 'cloth', 1),
(5, 'football', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `categoryId` int DEFAULT NULL,
  `categoryName` varchar(150) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `images` text,
  `createdBy` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `createdBy` (`createdBy`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `categoryId`, `categoryName`, `price`, `images`, `createdBy`) VALUES
(3, 'shirt', 'good shirt', 1, '', 99.55, '', NULL),
(4, 't-shirt', 'casual shirt', 1, '', 109.00, '', NULL),
(5, 'pant', 'formal pant', 1, '', 109.00, '', NULL),
(7, 'savan', '  savan product', 1, '', 1000.00, '', NULL),
(8, 'savan', '  savan product', 1, '', 1000.00, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `productsimage`
--

DROP TABLE IF EXISTS `productsimage`;
CREATE TABLE IF NOT EXISTS `productsimage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `images` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
CREATE TABLE IF NOT EXISTS `register` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `hobbies` text NOT NULL,
  `profile_pic` blob NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `hobbies` text,
  `userRole` enum('Admin','User') DEFAULT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `gender`, `hobbies`, `userRole`, `profile_pic`) VALUES
(1, 'dhruval', 'hingu', 'dhruval@mail.com', '$2b$10$.n2J8iWsBzcuWubJj3zWN.E2757KxUfS8Alg0036WfJIpMkkh/gAy', 'Male', 'read, write', 'Admin', ''),
(2, 'yagnesh', 'patel', 'yagnesh@mail.com', '$2b$10$N5kRMzEJZvgcdL9Pc0eOqut80hfgGETLfhCOmIz6G5r8f6H/TZ3vO', 'Male', 'read, write', 'User', ''),
(3, 'mail', 'mail', 'mail@mail.com', '$2b$10$36SueSJ2sq8kn2zNm3fFlOMy54o.JpDTzSmVyRkejqBYMP2iJAg4u', 'Male', 'read, write', 'Admin', ''),
(5, 'savan', 'ponda', 'savanponda11@gmail.com', '$2b$10$Ekg1wB3IdFatkz/tnqhmeezScja4NbKLqk99CqH6m59QKDAgSc48u', 'Male', 'cricket,football', NULL, '/public/assets/1716435535362.md');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
