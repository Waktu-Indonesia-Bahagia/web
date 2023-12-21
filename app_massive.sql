-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2023 at 04:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_massive`
--

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(250) NOT NULL,
  `asal_kampus` varchar(250) NOT NULL,
  `no_telepon` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `program_pilihan` varchar(250) NOT NULL,
  `keterangan` varchar(250) NOT NULL DEFAULT 'Magang',
  `tgl_mulai` date NOT NULL,
  `tgl_akhir` date NOT NULL,
  `status` enum('Aktif','Tidak-Aktif') NOT NULL DEFAULT 'Aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pembimbing`
--

CREATE TABLE `pembimbing` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nip` varchar(255) NOT NULL,
  `telepon` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permohonan`
--

CREATE TABLE `permohonan` (
  `id` int(11) NOT NULL,
  `nama` varchar(250) NOT NULL,
  `asal_kampus` varchar(250) NOT NULL,
  `no_telepon` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `keterangan` varchar(250) DEFAULT 'Magang',
  `tgl_permohonan` date NOT NULL DEFAULT current_timestamp(),
  `program_pilihan` varchar(250) NOT NULL,
  `status` enum('Proses','Di-terima','Di-tolak') DEFAULT 'Proses',
  `ktp` varchar(250) NOT NULL,
  `ktm` varchar(250) NOT NULL,
  `surat_permohonan` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permohonan`
--

INSERT INTO `permohonan` (`id`, `nama`, `asal_kampus`, `no_telepon`, `email`, `keterangan`, `tgl_permohonan`, `program_pilihan`, `status`, `ktp`, `ktm`, `surat_permohonan`) VALUES
(1, 'Bram Kahlil Romadhan', 'Universitas Indonesia', '081382252325', 'bramkromadhan@gmail.com', 'Magang', '2023-12-19', 'Web Development', 'Di-terima', '', '', 'surat_permohonan_1702954781904.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `sertifikat`
--

CREATE TABLE `sertifikat` (
  `id` int(11) NOT NULL,
  `nama` varchar(250) NOT NULL,
  `keahlian` varchar(250) NOT NULL,
  `tanggal` date NOT NULL DEFAULT current_timestamp(),
  `file_sertifikat` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(250) NOT NULL,
  `asal_kampus` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `no_telepon` varchar(20) NOT NULL,
  `alamat` varchar(350) NOT NULL,
  `foto_profil` varchar(20) NOT NULL,
  `role` enum('admin','member') NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `asal_kampus`, `email`, `password`, `no_telepon`, `alamat`, `foto_profil`, `role`, `is_active`) VALUES
(1, 'Bram Kahlil Romadhan', 'Universitas Bhayangkara Jakarta Raya', 'bram@gmail.com', '$2b$10$CttPuYipy1iCzqmrUfaRyOI17lhkgI7FPKfnj2bvLoxsMbci1xRc2', '', '', '', 'member', 1),
(2, 'Bambang', '', 'admin@gmail.com', '$2b$10$SIkZjx3KAXBJ.RimxPV8meGzw.iv.7Jr89Ft3Qt7Ariu5KE3ok.KO', '081382', 'Bekasi, Jawab Barat', '', 'admin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pembimbing`
--
ALTER TABLE `pembimbing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permohonan`
--
ALTER TABLE `permohonan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sertifikat`
--
ALTER TABLE `sertifikat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pembimbing`
--
ALTER TABLE `pembimbing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permohonan`
--
ALTER TABLE `permohonan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sertifikat`
--
ALTER TABLE `sertifikat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
