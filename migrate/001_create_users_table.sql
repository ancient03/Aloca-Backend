-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: aloca-db
-- Generation Time: Jun 16, 2026 at 04:22 AM
-- Server version: 8.0.46
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aloca_management_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `kantong`
--

CREATE TABLE `kantong` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `nama` varchar(100) NOT NULL,
  `deskripsi` text,
  `goal` decimal(12,2) DEFAULT '0.00',
  `saldo` decimal(12,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kantong`
--

INSERT INTO `kantong` (`id`, `user_id`, `nama`, `deskripsi`, `goal`, `saldo`, `created_at`) VALUES
(2, 2, 'Tabungan Laptop', 'MacBook Air M4', 18000000.00, 100000.00, '2026-06-16 03:55:18');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `kantong_id` int NOT NULL,
  `jenis` enum('pemasukan','pengeluaran') NOT NULL,
  `nominal` decimal(15,2) NOT NULL,
  `keterangan` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `user_id`, `kantong_id`, `jenis`, `nominal`, `keterangan`, `created_at`) VALUES
(2, 2, 2, 'pemasukan', 500000.00, 'Gaji freelance', '2026-06-16 03:56:31'),
(3, 2, 2, 'pemasukan', 500000.00, 'Gaji freelance', '2026-06-16 03:58:41'),
(4, 2, 2, 'pemasukan', 100000.00, 'test', '2026-06-16 04:04:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `updated_at`) VALUES
(2, 'dika', 'dika@test.com', '$2b$10$v1woJiaQ9F5H7W7EizRZcuzkP7RQqyQ9E4XI4H7ZetHfrGIu929ni', '2026-06-16 03:28:35', '2026-06-16 03:28:35'),
(3, 'admin', 'admin@test.com', '$2b$10$xo0ZeAl73ai7QPDl/1nW3OvxbW5bscBZ8V.ZF6W3.i2ceuOyjS6KG', '2026-06-16 03:35:59', '2026-06-16 03:35:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kantong`
--
ALTER TABLE `kantong`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `kantong_id` (`kantong_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kantong`
--
ALTER TABLE `kantong`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `kantong`
--
ALTER TABLE `kantong`
  ADD CONSTRAINT `kantong_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`kantong_id`) REFERENCES `kantong` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
