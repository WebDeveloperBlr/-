-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 24, 2018 at 12:59 PM
-- Server version: 5.6.38
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auto-crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `auto`
--

CREATE TABLE `auto` (
  `id_auto` int(11) NOT NULL,
  `number` varchar(45) NOT NULL,
  `id_person` int(11) NOT NULL,
  `id_checkup` int(11) DEFAULT NULL,
  `id_model` int(11) NOT NULL,
  `id_oil` int(11) NOT NULL,
  `disabled` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `auto`
--

INSERT INTO `auto` (`id_auto`, `number`, `id_person`, `id_checkup`, `id_model`, `id_oil`, `disabled`) VALUES
(2, '6666AE-5', 1, 12, 1, 3, NULL),
(3, '1324BB-7', 1, NULL, 1, 1, NULL),
(4, '15616ЗР', 1, NULL, 5, 1, NULL),
(7, '666АУ-6', 21, NULL, 5, 1, NULL),
(8, '666АУ-6', 21, NULL, 18, 2, NULL),
(19, '7777HN-2', 33, NULL, 7, 4, NULL),
(20, 'asdsad', 34, NULL, 5, 3, NULL),
(21, 'HSKKKA', 35, 2, 4, 3, NULL),
(22, '1234РО-1', 36, 3, 8, 3, NULL),
(23, '1224124', 39, NULL, 12, 2, NULL),
(24, '91899', 38, NULL, 12, 2, NULL),
(25, '1111111', 42, 13, 4, 3, NULL),
(26, '123124', 43, NULL, 1, 1, NULL),
(27, '5676878', 44, 14, 13, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id_brand` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id_brand`, `name`) VALUES
(1, 'Nissan'),
(2, 'Toyota'),
(3, 'Subaru'),
(4, 'Suzuki'),
(5, 'Lexus'),
(6, 'Ferrari'),
(7, 'Opel'),
(8, 'Volkswagen'),
(9, 'Audi'),
(10, 'BMW'),
(11, 'Fiat'),
(13, 'Jeep'),
(14, 'Fiat'),
(15, 'Tesla'),
(16, 'Lada'),
(33, 'Peugeot');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C');

-- --------------------------------------------------------

--
-- Table structure for table `checkup`
--

CREATE TABLE `checkup` (
  `id_checkup` int(11) NOT NULL,
  `dateStart` date DEFAULT NULL,
  `dateEnd` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `checkup`
--

INSERT INTO `checkup` (`id_checkup`, `dateStart`, `dateEnd`) VALUES
(1, '2012-02-20', '2012-02-20'),
(2, '2018-05-16', '2018-05-31'),
(3, '2018-04-11', '2018-05-25'),
(4, '2012-02-02', '2013-03-03'),
(5, '2012-02-20', '2012-02-20'),
(6, '2012-02-20', '2012-02-20'),
(7, '2012-02-20', '2012-02-20'),
(8, '2012-02-20', '2012-02-20'),
(9, '2012-02-20', '2012-02-20'),
(10, '2012-02-20', '2012-02-20'),
(11, '2012-02-20', '2012-02-20'),
(12, '2018-05-17', '2018-05-27'),
(13, '2018-05-11', '2018-05-26'),
(14, '2018-05-17', '2018-05-24');

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `id_model` int(11) NOT NULL,
  `id_brand` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`id_model`, `id_brand`, `name`, `id_category`) VALUES
(1, 1, 'Almera', 1),
(2, 1, 'Skyline', 1),
(3, 1, 'GTR', 1),
(4, 9, 'RS6', 1),
(5, 2, 'Corolla', 3),
(6, 7, 'Astra', 1),
(7, 10, 'M6 Turbo', 1),
(8, 33, '406', 1),
(9, 3, 'Legacy', 1),
(10, 3, 'Impreza WRX', 1),
(11, 3, 'Impreza WRX STi', 1),
(12, 3, 'Forester', 1),
(13, 7, 'Insignia', 1),
(14, 2, 'Supra', 1),
(15, 2, 'Camry', 1),
(16, 2, 'Camry', 1),
(17, 2, 'asdad', 1),
(18, 10, 'M3', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oil`
--

CREATE TABLE `oil` (
  `id_oil` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `oil`
--

INSERT INTO `oil` (`id_oil`, `name`) VALUES
(1, 'ДТ'),
(2, 'АИ-92'),
(3, 'АИ-95'),
(4, 'АИ-98');

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id_person` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `secondName` varchar(45) NOT NULL,
  `thirdName` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id_person`, `name`, `secondName`, `thirdName`, `address`, `phone`) VALUES
(1, 'Дмитрий', 'Королёв', 'Евгеньевич', '40 лет Победы', '32134234'),
(7, 'Dima', 'Korolev', 'Vladimirovich', NULL, NULL),
(8, 'Venua', 'Korolev', 'Vladimirovich', NULL, NULL),
(9, 'Евгений', 'Зайцев', 'Васильевич', NULL, NULL),
(10, 'Сергей', 'Левашев', 'Евгеньевич', 'г. Слуцк', '+375296573212'),
(11, 'Алексей', 'Рябцев', 'Евгеньевич', 'г. Москва', '+375296573212'),
(12, 'Павел ', 'Рыбаков', 'Артемович', 'г. Зеленоград', '+375667831254'),
(21, 'Алексей', 'Горлан', 'Дмитриевич', 'г. Минск', '+375994351212'),
(22, 'Алексей', 'Горлан', 'Дмитриевич', 'г. Минск', '+375994351212'),
(33, 'Василий ', 'Тряпкин', 'Антонович', '', '12312312'),
(34, 'Леонид', 'Агутин', '', '', ''),
(35, 'Геннадий', 'Орловский', 'Викторович', '', '+362788231212'),
(36, 'Андрей', 'Кирилевский', '', '', '123'),
(37, 'Алексей', 'Навальный', '', '', ''),
(38, 'Леха ', 'Навальный', '', '', ''),
(39, 'Навальный', 'Леха', '', '', ''),
(40, 'Навальный', 'Леха', '', '', ''),
(41, 'Леха', 'Навальный', '', '', ''),
(42, 'Дмитрий', 'Медведев', '', '', ''),
(43, 'Гена', 'Букин', '', '', ''),
(44, 'Евгений ', 'Колдун', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id_auto`),
  ADD KEY `fk_modelToModel_idx` (`id_model`),
  ADD KEY `fk_modelToCheckup_idx` (`id_checkup`),
  ADD KEY `fk_autoToPerson_idx` (`id_person`),
  ADD KEY `fk_autoToOil_idx` (`id_oil`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id_brand`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `checkup`
--
ALTER TABLE `checkup`
  ADD PRIMARY KEY (`id_checkup`);

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id_model`),
  ADD KEY `fk_modelToBrand_idx` (`id_brand`),
  ADD KEY `fk_modelToCategory_idx` (`id_category`);

--
-- Indexes for table `oil`
--
ALTER TABLE `oil`
  ADD PRIMARY KEY (`id_oil`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id_person`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auto`
--
ALTER TABLE `auto`
  MODIFY `id_auto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id_brand` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `checkup`
--
ALTER TABLE `checkup`
  MODIFY `id_checkup` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `id_model` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `oil`
--
ALTER TABLE `oil`
  MODIFY `id_oil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id_person` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `fk_autoToCheckup` FOREIGN KEY (`id_checkup`) REFERENCES `checkup` (`id_checkup`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_autoToModel` FOREIGN KEY (`id_model`) REFERENCES `model` (`id_model`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_autoToOil` FOREIGN KEY (`id_oil`) REFERENCES `oil` (`id_oil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_autoToPerson` FOREIGN KEY (`id_person`) REFERENCES `person` (`id_person`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `fk_modelToBrand` FOREIGN KEY (`id_brand`) REFERENCES `brand` (`id_brand`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_modelToCategory` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
