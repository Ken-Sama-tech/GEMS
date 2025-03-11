-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 11, 2025 at 01:56 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_record`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `articleID` int NOT NULL AUTO_INCREMENT,
  `studentID` int DEFAULT NULL,
  `article` varchar(255) DEFAULT NULL,
  `articleDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`articleID`),
  KEY `idx_of_student_id` (`studentID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`articleID`, `studentID`, `article`, `articleDescription`) VALUES
(1, NULL, 'A', 'PAGLABAG SA AKADEMIKONG PAG-UNLAD'),
(2, NULL, 'B', 'PAGLABAS SA KILOS NG PAGIGING MAG-AARAL'),
(3, NULL, 'C', 'PAGLABAG SA KARAPATAN NG IBA'),
(4, NULL, 'D', 'PAGLABAG SA KARANGALAN NG PAARALAN');

-- --------------------------------------------------------

--
-- Table structure for table `articlesections`
--

DROP TABLE IF EXISTS `articlesections`;
CREATE TABLE IF NOT EXISTS `articlesections` (
  `articleSectionID` int NOT NULL AUTO_INCREMENT,
  `articleID` int DEFAULT NULL,
  `articleSection` varchar(255) DEFAULT NULL,
  `articleSectionDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`articleSectionID`),
  KEY `idx_of_article_id` (`articleID`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articlesections`
--

INSERT INTO `articlesections` (`articleSectionID`, `articleID`, `articleSection`, `articleSectionDescription`) VALUES
(1, 1, 'SECTION 1', 'PAGGAMIT NG CELLULAR PHONE HABANG NAGKAKKLASE.'),
(2, 1, 'SECTION 2', 'HINDI MAITUTURING NA PAGLABAG KUNG ANG PAGGAMIT AY EMERGENCY AT KINAKAILANGAN TALAGA SUBALIT DAPAT MAGPAALAM SA GURO NA LALABAS NG SILID ARALAN ANG BATA UPANG HINDI MAKISTORBO.'),
(3, 1, 'SECTION 3', 'PAGGAMIT NG GADGET NA NAKAKALIKHA NG INGYAY HABANG MAYROONG KLASSE LIBAN NA LAMANG KUNG ITO AY PINAPAYAGANG GAMITIN NG GURO AT MAKATULONG SA GAWAING PANG-AKADEMIKO'),
(4, 1, 'SECTION 4', 'PALAGIANG PAGLIBAN SA KLASSE NG HIGIT ISANG LINGGO KADA BUWAN AT HINDI PAGPAPASA NG LIHAM PAGPAPALIWANAG'),
(5, 1, 'SECTION 5', 'PALAGIANG PAGPASOK NG HULI SA MGA KLASSE NA UMAABOT NA NG ISANG LINGGO'),
(6, 1, 'SECTION 6', 'MALIMIT NA PAGKACUTTING CLASSES'),
(7, 1, 'SECTION 7', 'PAGLABAS NG SILID ARALAN NG WALANG PAALAM SA MGA GURO AT PAGPAPAKITA NG KAWALANG GALANG'),
(8, 1, 'SECTION 8', 'PAGTAKAS SA GATE NG PAARALAN NG WALANG KAUKULANG PAALAM NA ITINATALA SA GWARYA NA PINAPAYAGAN NA UMUWI ANG BATA NG GURO'),
(9, 1, 'SECTION 9', 'MAARI LAMANG NA LUMABAS ANG MGA ESTUDYANTE KUNG SILA AY MAY LBM O SAKIT NA DI KAYANG LUNASAN NG PAARALAN AT NANGANGAILANGAN NG MEDIKAL NA ATENSYON NA ALAM NG MAGULANG. NARARAPAT NA MAY PASS SLIP NA NAITALA SA GWARYA AT SINAMAHAN NG SINUMANG KAWANI O IPIN'),
(10, 2, 'SECTION 1', 'HINDI PAGSUUSOT NG TAMANG UNIPORME'),
(11, 2, 'SECTION 2', 'HINDI PAG-SUSUOT NG PAGKAKAKILANLAN O ID'),
(12, 2, 'SECTION 3', 'PAGSUSUOT NG HIKAW AT PAGKAKAROON NG BODY PIERCING NG MGA KALALAKIHAN O PIERCING SA KABABAIHAN NA NAGBIBIGAY NG HINDI MAGANDANG IMPRESYON SA PAGIGING ESTUDYANTE'),
(13, 2, 'SECTION 4', 'PAGSUSUOT NG SINGSING NA MAY SPIKE AT MALALAKING'),
(14, 2, 'SECTION 5', 'METAL NA BUCKLES NG SINTURON NA MAARING GAMITIN UPANG MAKAPANAKIT NG MGA KAMAG-ARAL'),
(15, 2, 'SECTION 6', 'PAGDADALA NG BARIL, PATALIM O MGA NAKAKASAKIT AT NAKAKAMATAY NA MGA BAGAY.'),
(16, 2, 'SECTION 7', 'PAGDADALA NG PAMPASABOG O MGA BAGAY NA MAY KINALAMAN SA TERORISMO'),
(17, 2, 'SECTION 8', 'VANDALISMO AT IBA’T IBANG URI NITO. PAGLILINIS O PAGPIPINTURA NG LUGAR NA DINUMIHAN O SINULATAN AT KOMPEREHENSIYA SA MGA MAGULANG.'),
(18, 2, 'SECTION 9', 'PAGDURA SA KUNG SAAN SAAN'),
(19, 2, 'SECTION 10', 'PAG-IWAN SA CR NG MADUMI MATAPOS ITO GAMITIN'),
(20, 2, 'SECTION 11', 'PANINIGARILYO SA LOOB NG KAMPUS'),
(21, 2, 'SECTION 12', 'INTENSYONAL NA PAGSIRA NG MGA SILYA, PINTO, PAGBASAG NG BINTANA O MGA ILAW O ANUMANG NASA SA LOOB NG SILID ARALAN AT PAARALAN'),
(22, 2, 'SECTION 13', 'PAGDADALA, PAG-IINOM NG NAKALALASING NA INUMIN O PAGPASOK NG LASING'),
(23, 2, 'SECTION 14', 'PAGPAPASOK O PAGGAMIT NG DROGA O KAHALINTULAD NITO GAYA NG MARIJUANA, SHABU, ATBP.'),
(24, 2, 'SECTION 16', 'PAGPAPAKITA NG MAHALAY NA GAWI SA LOOB NG PAARALAN.'),
(25, 2, 'SECTION 17', 'PAGSIRA SA ID'),
(26, 2, 'SECTION 18', 'PAGGAMIT NG IBA PANG ID UPANG MAKAPASOK SA PAARALAN'),
(27, 2, 'SECTION 19', 'PAGPAPAHIRAM NG SARILING ID SA IBA PANG ESTUDYANTE LIBAN NA LAMANG KUNG MANGHIHIRAM NG GAMIT SA SILID AKLATAN O SA LABORATORYO O KATULAD NA GAWAIN'),
(28, 2, 'SECTION 20', 'HINDI PAGSA-SAULI NG MGA GAMIT NA IPINAHIRAM NG PAARALANG GAYA NG LEARNER’S MATERIAL, MGA KAGAMITAN SA SILID AKLATAN, AT MGA LABORATORYO'),
(29, 2, 'SECTION 21', 'PAGNANAKAW NG GAMIT NG PAARALAN O NG KAGAMITAN NG MGA GURO O KAWANI NITO.'),
(30, 2, 'SECTION 22', 'PANDARAYA O PALSIPIKASYON NG MGA TALA NG PAARALAN'),
(31, 2, 'SECTION 23', 'PAMEMEKE NG LAGDA NG MAGULANG O TAGAPAG-ALAGA, GURO O KAWANI NG PAARALAN.'),
(32, 2, 'SECTION 24', 'PANDARAYA SA MGA PAGSUSULIT, EKSAMINASYON O MGA GAWAING PANG-AKADEMIKO'),
(33, 2, 'SECTION 25', 'PAGDADALA NG MAHAHALE NA MAGAZIN O BABASAHIN O PELIKULANG IPINAPANUOOD SA IBA'),
(34, 2, 'SECTION 26', 'PAGLIKHA NG INGYAY NA NAKAKAABALA SA MGA KLASSE'),
(35, 2, 'SECTION 27', 'PAGTAMBA SA PASILYO NA LUMILIKHA NG INGYAY O KAGULUHAN NA NAKAKA-ABALA SA MGA KLASSE'),
(36, 2, 'SECTION 28', 'PAGTATAPON NG BASURA SA KUNG SAAN SAAN.'),
(37, 2, 'SECTION 29', 'KAWALANG GALANG SA MGA GURO AT KAWANI NG PAARALAN.'),
(38, 3, 'SECTION 1', 'PAGHAHA-MON NG AWAY O PAG-AAMOK NA NAGDULOT NG KAGULUHAN SA LOOB O LABAS NG PAARALAN'),
(39, 3, 'SECTION 2', 'PAMBUBULLY SA KAHIT SINO SA PAARALAN: - MAARING PASALITANG PAGBABANTA, PANANAKOT O MALABIS NA PANGHIHIYA - SIKOLOHIKAL O EMOSYONAL - PANUNUKSO NG LABIS - PANGO-NGOTONG NG SALAPI O BAGAY - PAGPIGIL SA KAHIT SINO NA MAKAPASOK SA PA'),
(40, 3, 'SECTION 3', 'PAGMUMURA NG LABIS AT PAGSASALITA NG MAY KABASTUSAN NA NAKAKASAKIT NG DAMDAMIN NG IBA'),
(41, 3, 'SECTION 4', 'SEKSUAL NA PANG-AABUSO: - MAARING PASALITA - PANGHIHIPO SA MASESELANG BAHAGI - PAGPAPAKITA NG ARI - PANGGAGAHASA O ANUPAMANG NASA SA PROBISYON NG CPP'),
(42, 3, 'SECTION 5', 'PANANAKIT NG KAPWA ESTUDYANTE O GURO.'),
(43, 3, 'SECTION 6', 'PAGPATAY SA KAPWA ESTUDYANTE O SINUMAN SA PAARALAN'),
(44, 3, 'SECTION 7', 'KAWALANG GALANG SA MGA GURO AT KAWANI NG PAARALAN AT PANANAKIT SA SINUMAN DITO'),
(45, 3, 'SECTION 8', 'PAGSALI SA FRATERNITY O SORORITY NA NAGDUDULOT NG PAHA-MAK O KAGULUHAN SA KAPWA ESTUDYANTE'),
(46, 3, 'SECTION 9', 'PAGSISIMULA NG RAMBOL O RIOT SA LOOB AT LABAS NG PAARALAN NA IKINAPAHAMAK NG SINUMAN DITO.'),
(47, 3, 'SECTION 10', 'PAKAKASANGKOT SA INISYASYON O HAZING NA MAARING IKAMATAY NG KAPWA ESTUDYANTE AT DEPENDE SA NAGING EPEKTO NITO SA BIKTIMA'),
(48, 3, 'SECTION 11', 'PAGPAPALAGANAP NG MGA MAHAHALE NA MATERYAL'),
(49, 4, 'SECTION 1', 'PAGSOSOLICIT SA LABAS NG PAARALAN NG HINDI LEGAL AT PINAPAYAGAN NITO.'),
(50, 4, 'SECTION 2', 'PANLOLOKO O PANLILINLANG SA MAGULANG O TAGAPAMATNUBAY SA MGA INAPRUBAHANG GAWAIN AT KOLEKSIYON SA PAARALAN KUNG MAYROON MAN'),
(51, 4, 'SECTION 3', 'PAGBEBENTA NG TIKET NA HINDI PINAYAGAN NG PAMUNUAN NG PAARALAN'),
(52, 4, 'SECTION 4', 'PAMEMEKE NG LAGDA NG KAHIT SINO SA PAARALAN AT PAGGAMIT NITO SA KALOKOHAN '),
(53, 4, 'SECTION 5', 'PAGGAMIT NG PANGALAN NG PAARALAN SA KALOKOHAN O SA MGA BAGAY NA IKASISIRA NG MAGANDA NITONG IMAHE');

-- --------------------------------------------------------

--
-- Table structure for table `gradelevels`
--

DROP TABLE IF EXISTS `gradelevels`;
CREATE TABLE IF NOT EXISTS `gradelevels` (
  `gradeLevelID` int NOT NULL AUTO_INCREMENT,
  `educationLevel` enum('JR HIGH','SR HIGH') DEFAULT NULL,
  `gradeLevel` varchar(255) NOT NULL,
  PRIMARY KEY (`gradeLevelID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gradelevels`
--

INSERT INTO `gradelevels` (`gradeLevelID`, `educationLevel`, `gradeLevel`) VALUES
(1, 'JR HIGH', 'GRADE 7'),
(2, 'JR HIGH', 'GRADE 8'),
(3, 'JR HIGH', 'GRADE 9'),
(4, 'JR HIGH', 'GRADE 10'),
(5, 'SR HIGH', 'GRADE 11'),
(6, 'SR HIGH', 'GRADE 12');

-- --------------------------------------------------------

--
-- Table structure for table `gradesections`
--

DROP TABLE IF EXISTS `gradesections`;
CREATE TABLE IF NOT EXISTS `gradesections` (
  `sectionID` int NOT NULL AUTO_INCREMENT,
  `gradeLevelID` int NOT NULL,
  `section` varchar(255) DEFAULT NULL,
  `schoolYearID` int NOT NULL,
  PRIMARY KEY (`sectionID`),
  KEY `idx_of_grade_level_id` (`gradeLevelID`),
  KEY `idx_of_school_year_id` (`schoolYearID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `gradesections`
--

INSERT INTO `gradesections` (`sectionID`, `gradeLevelID`, `section`, `schoolYearID`) VALUES
(1, 6, 'CASTILLO', 1),
(2, 6, 'LAZATIN', 1),
(3, 6, 'MACARAEG', 1),
(4, 6, 'GALUPE', 1),
(5, 6, 'SALVIEJO', 1),
(6, 5, 'ERMITANIO', 1),
(7, 5, 'VALEROSO', 1),
(8, 5, 'HILARIO', 1),
(9, 5, 'MAGBALOT', 1);

-- --------------------------------------------------------

--
-- Table structure for table `registrations`
--

DROP TABLE IF EXISTS `registrations`;
CREATE TABLE IF NOT EXISTS `registrations` (
  `registrationID` int NOT NULL AUTO_INCREMENT,
  `registrationDate` date DEFAULT NULL,
  `studentID` int DEFAULT NULL,
  `gradeSectionID` int DEFAULT NULL,
  `schoolYearID` int DEFAULT NULL,
  PRIMARY KEY (`registrationID`),
  UNIQUE KEY `uniq_year_per_std` (`studentID`,`schoolYearID`),
  KEY `idx_of_student_id` (`studentID`),
  KEY `idx_of_grade_section_id` (`gradeSectionID`),
  KEY `idx_of_schoolyear_id` (`schoolYearID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `registrations`
--

INSERT INTO `registrations` (`registrationID`, `registrationDate`, `studentID`, `gradeSectionID`, `schoolYearID`) VALUES
(1, '2025-03-08', 34, 1, 1),
(9, '2025-03-08', 44, 1, 1),
(11, '2025-03-08', 33, 1, 1),
(12, '2025-03-09', 45, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sanctions`
--

DROP TABLE IF EXISTS `sanctions`;
CREATE TABLE IF NOT EXISTS `sanctions` (
  `sanctionID` int NOT NULL AUTO_INCREMENT,
  `sanction` varchar(255) DEFAULT NULL,
  `category` enum('MINOR','MAJOR','CRITICAL') DEFAULT NULL,
  PRIMARY KEY (`sanctionID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sanctions`
--

INSERT INTO `sanctions` (`sanctionID`, `sanction`, `category`) VALUES
(1, 'PAGPAPA-ALALA', 'MINOR'),
(2, 'PAGKUMPIKSA AT PAGPAPATAWAG SA MAGULANG', 'MAJOR'),
(3, 'PAGDAAN SA PROGRAMANG PAGGABAY (COUNSELING)', 'MINOR'),
(4, 'PAGPASOK SA INTERBENSYON AT PROGRAMANG PAGGABAY', 'MAJOR'),
(5, 'DI-PAGPASA SA MGA ASIGNATURA DAHIL SA DI PAGPASOK', 'MAJOR'),
(6, 'PAGPAPATAWAG AT PAGPAPALIWANAG NG MAGULANG', 'MAJOR'),
(7, 'PAGPAPATAW NG KARAMPATANG PARUSA NA NAAAYON SA POLISIYA AT BATAS', 'MAJOR'),
(8, 'SUSPENSIYON NA DI LALAMPAS NG LIMANG ARAW', 'MAJOR'),
(9, 'SUSPENSIYON NA DI LALAMPAS NG LIMANG ARAW AT PAGPASOK SA INTERBENSYON AT PROGRAMANG PAGGABAY KASAMA ANG MAGULANG', 'MAJOR'),
(10, 'EKSPULSYON AT DI IISYUHAN NG CERTIFICATE OF GOOD MORAL CHARACTER', 'CRITICAL'),
(11, 'PANANAGOT SA JUVENILE DELINQUENCY ACT OF 2006 O RA 9344', 'CRITICAL'),
(12, 'PAGLILINIS O PAGPIPINTURA NG LUGAR NA DINUMIHAN O SINULATAN', 'MINOR'),
(13, 'PAGLILINIS NG PALIKURAN', 'MINOR'),
(14, 'PAGPAPALIT O PAGBABAYAD NG HALAGA NG NASIRANG KAGAMITAN', 'MAJOR'),
(15, 'PAGPAPASAULI NG MGA GAMIT NA HINIRAM', 'MINOR'),
(16, 'PAGPAPALIT O PAGBABAYAD NG HALAGA NG DI-NAISAULING LM O KAGAMITAN', 'MAJOR'),
(17, 'PAGPAPATAWAG AT PAGPAPALIWANAG NG MAGULANG, SUSPENSIYON NA DI LALAMPAS NG LIMANG ARAW, AT PAGBABAYAD NG DANYOS', 'MAJOR'),
(18, 'EKSPULSYON AT DI IISYUHAN NG CERTIFICATE OF GOOD MORAL CHARACTER AT PANANAGOT SA BATAS NG CYBER BULLYING KUNG KINAKAILANGAN', 'CRITICAL'),
(19, 'PANANAGOT SA R.A. 9344', 'CRITICAL'),
(20, 'PANANAGOT SA BATAS NA NAAAYON SA DSWD', 'CRITICAL');

-- --------------------------------------------------------

--
-- Table structure for table `schoolyears`
--

DROP TABLE IF EXISTS `schoolyears`;
CREATE TABLE IF NOT EXISTS `schoolyears` (
  `schoolYearID` int NOT NULL AUTO_INCREMENT,
  `schoolYear` varchar(10) NOT NULL,
  PRIMARY KEY (`schoolYearID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schoolyears`
--

INSERT INTO `schoolyears` (`schoolYearID`, `schoolYear`) VALUES
(1, '2024-2025'),
(2, '2025-2026');

-- --------------------------------------------------------

--
-- Table structure for table `studentinfo`
--

DROP TABLE IF EXISTS `studentinfo`;
CREATE TABLE IF NOT EXISTS `studentinfo` (
  `studentID` int NOT NULL AUTO_INCREMENT,
  `learnerReferenceNumber` bigint NOT NULL,
  `studentImg` varchar(255) DEFAULT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `extensionName` varchar(20) DEFAULT NULL,
  `birthDate` date NOT NULL,
  `sex` enum('MALE','FEMALE') DEFAULT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `civilStatus` enum('SINGLE','IN A RELATIONSHIP','MARRIED','DIVORCED','WIDOWED') DEFAULT NULL,
  `religion` varchar(50) DEFAULT NULL,
  `current_address` varchar(255) NOT NULL,
  `permanent_address` varchar(255) DEFAULT NULL,
  `nationality` varchar(50) NOT NULL,
  `disability` varchar(100) DEFAULT 'NOT STATED',
  `guardianLastName` varchar(50) DEFAULT NULL,
  `guardianFirstName` varchar(50) DEFAULT NULL,
  `guardianMiddleName` varchar(50) DEFAULT NULL,
  `guardianExtensionName` varchar(20) DEFAULT NULL,
  `guardianPhoneNumber` varchar(20) DEFAULT NULL,
  `motherLastName` varchar(50) DEFAULT NULL,
  `motherFirstName` varchar(50) DEFAULT NULL,
  `motherMiddleName` varchar(50) DEFAULT NULL,
  `motherMaidenName` varchar(50) DEFAULT NULL,
  `motherPhoneNumber` varchar(50) DEFAULT NULL,
  `fatherLastName` varchar(50) DEFAULT NULL,
  `fatherFirstName` varchar(50) DEFAULT NULL,
  `fatherMiddleName` varchar(50) DEFAULT NULL,
  `fatherExtensionName` varchar(50) DEFAULT NULL,
  `fatherPhoneNumber` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`studentID`),
  UNIQUE KEY `learnerReferenceNumber` (`learnerReferenceNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `studentinfo`
--

INSERT INTO `studentinfo` (`studentID`, `learnerReferenceNumber`, `studentImg`, `lastName`, `firstName`, `middleName`, `extensionName`, `birthDate`, `sex`, `phoneNumber`, `email`, `civilStatus`, `religion`, `current_address`, `permanent_address`, `nationality`, `disability`, `guardianLastName`, `guardianFirstName`, `guardianMiddleName`, `guardianExtensionName`, `guardianPhoneNumber`, `motherLastName`, `motherFirstName`, `motherMiddleName`, `motherMaidenName`, `motherPhoneNumber`, `fatherLastName`, `fatherFirstName`, `fatherMiddleName`, `fatherExtensionName`, `fatherPhoneNumber`) VALUES
(2, 105427130063, '../../imgs/studentProfile/profile.png', 'ANGELES', 'PRINCE', 'MATEO', '', '2007-07-30', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(3, 105571120004, '../../imgs/studentProfile/profile.png', 'BALTAZAR', 'CYRUS FELIX', 'MARIGSA', '', '2007-05-06', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'ESCAñO GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(4, 105427100006, '../../imgs/studentProfile/profile.png', 'BAYOGO', 'CHRISTIAN  REY', 'DIMALIWAT', '', '2005-08-20', 'MALE', '09557608989', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'PASONG INCHIK', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(5, 161002120716, '../../imgs/studentProfile/profile.png', 'DACUYA', 'JOHN ZEDRIC', 'MINTAR', '', '2007-05-06', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN MIGUEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(6, 105427130069, '../../imgs/studentProfile/profile.png', 'DELOS SANTOS', 'JOE KRIS', 'DE GUZMAN', '', '2006-04-05', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(7, 105419120003, '../../imgs/studentProfile/profile.png', 'ESLABRA', 'JOHN PAUL', 'DUQUE', '', '2007-10-04', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'MACAMIAS GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(8, 105425120007, '../../imgs/studentProfile/profile.png', 'FERRER', 'JHERSON LEE', 'MANZANO', '', '0007-10-08', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'MACAMIAS GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(9, 105420130051, '../../imgs/studentProfile/profile.png', 'MANUEL', 'PAULO', 'LAPURGA', '', '2007-10-16', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(10, 105427130071, '../../imgs/studentProfile/profile.png', 'OBISPADO', 'ARELL', 'SANTIAGO', '', '2007-01-04', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'PASONG INCHIK GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(11, 105270120039, '../../imgs/studentProfile/profile.png', 'QUIMSON', 'ALJUNE', 'TABLADILLO', '', '2007-06-04', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN MIGUEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(12, 105414120016, '../../imgs/studentProfile/profile.png', 'ROSARIO', 'VIRGILIO', 'SALAZAR', 'III', '2007-08-14', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'GALVAN GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(13, 105997130166, '../../imgs/studentProfile/profile.png', 'SABADO', 'JENARD RYAN', 'MAGSINO', '', '2006-11-16', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'PARTIDA 1 GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(14, 105427120074, '../../imgs/studentProfile/profile.png', 'SEBASTIAN', 'JEROME', 'VILLARAMA', '', '2007-03-14', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(16, 136569100176, '../../imgs/studentProfile/profile.png', 'SULIVA', 'JONATHAN', 'DELA CRUZ', '', '2004-12-01', 'MALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN MIGUEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(17, 105414130027, '../../imgs/studentProfile/profile.png', 'TORRES', 'DENVER', 'POSADAS', '', '2006-12-24', 'MALE', '00000', 'test@gmail.com', 'SINGLE', '', 'GALVAN GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(18, 105419120014, '../../imgs/studentProfile/profile.png', 'ALCANTARA', 'ANGELICA', 'ANUA', '', '2007-08-13', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'MACAMIAS GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(19, 106706120024, '../../imgs/studentProfile/profile.png', 'CULLADO', 'GYPSI BERLYN', 'VIJILLA', '', '2007-10-01', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', '', 'PARTIDA 1 GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(20, 105420120034, '../../imgs/studentProfile/profile.png', 'DE GUZMAN', 'ANNABELLE', 'LADESMA', '', '2007-07-16', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', '', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(21, 105427130082, '../../imgs/studentProfile/profile.png', 'DE VERA', 'KYLA', 'MATIAS', '', '2007-10-30', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'PASONG INCHIK GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(22, 105433130002, '../../imgs/studentProfile/profile.png', 'FACUNLA', 'JANELLE', 'CATIGAY', '', '2007-09-12', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', '', 'YUSON GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(24, 105405120030, '../../imgs/studentProfile/profile.png', 'MACADANGDANG', 'MAJESTY', 'PAGALING', '', '2006-12-18', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', '', 'BAGONG BARRIO GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(25, 105427130086, '../../imgs/studentProfile/profile.png', 'MAGALONG', 'SHERIELYN', 'MANGULABNAN', '', '2006-11-29', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(26, 105405120032, '../../imgs/studentProfile/profile.png', 'PAGALING', 'AVHEGELL', 'CAPINDING', '', '2007-03-25', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'BAGONG BARRIO GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(27, 105427120037, '../../imgs/studentProfile/profile.png', 'PACUAL', 'ABEGAIL', 'CANOY', '', '2007-03-30', 'FEMALE', '00000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(28, 105427120061, '../../imgs/studentProfile/profile.png', 'ROSALDO', 'JANE', 'OBRA', '', '2007-09-25', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN RAFAEL GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(29, 105433120020, '../../imgs/studentProfile/profile.png', 'SALVADOR', 'FEBIE JANE', 'FACUNLA', '', '2007-02-17', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'YUSON GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(30, 105571120028, '../../imgs/studentProfile/profile.png', 'SORIANO', 'ROSELYN', 'FEDERIS', '', '2006-12-13', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'MONIC NAMPICUAN NUEVE ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(31, 105571120029, '../../imgs/studentProfile/profile.png', 'VICTORIA', 'ABEGAIL', 'BUGARIN', '', '2007-08-05', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'MONIC NAMPICUAN NUEVE ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(33, 105428120022, '../../imgs/studentProfile/profile.png', 'ALCANTARA', 'VINCENT', 'MATA', '', '2006-08-04', 'MALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN AGUSTIN GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(34, 105414120013, '../../imgs/studentProfile/profile.png', 'GALLARDE', 'KEN', 'MACADANGDANG', '', '2007-10-21', 'MALE', '00000000', 'test@gmail.com', 'MARRIED', '', 'GALVAN GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(35, 136505120208, '../../imgs/studentProfile/profile.png', 'MATUDAN', 'PRINCE BIEN', 'IDMILAO', '', '2007-03-11', 'MALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN AGUSTIN GUIMBA NUEVA ECIJA', '', 'FILIPINO', 'AUTISTIC', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(36, 136523130082, '../../imgs/studentProfile/profile.png', 'RAMISCAL', 'ALWIN', 'MARQUEZ', '', '2007-08-30', 'MALE', '00000000', 'alwinramiscal@gmail.com', 'SINGLE', 'BORN AGAIN/CHRISTIAN', 'PARTIDA 1 GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(37, 105420120067, '../../imgs/studentProfile/profile.png', 'SALVIEJO', 'EDRIAN', 'GATTOC', '', '2006-12-08', 'MALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(38, 105459120021, '../../imgs/studentProfile/profile.png', 'SANTILLAN', 'JUNEL', 'SY', '', '2007-06-09', 'MALE', '00000000', 'test@gmail.com', 'SINGLE', '', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(39, 105428120017, '../../imgs/studentProfile/profile.png', 'ALCANTARA', 'KEY', 'CAGBAY', '', '2007-01-07', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'SAN AGUSTIN GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(40, 105420120031, '../../imgs/studentProfile/profile.png', 'CARIAZO', 'JOANNA MARIE', 'MANAOIS', '', '2007-01-19', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', '', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(41, 105425120019, '../../imgs/studentProfile/profile.png', 'ESLABRA', 'BABYLYN', 'GUBALA', '', '2007-08-30', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'PARTIDA 1 GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(42, 114359120045, '../../imgs/studentProfile/profile.png', 'IGLESIA', 'LIE ANNE', 'ALCOVENDAS', '', '2006-12-21', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', '', 'GALVAN GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(43, 105415120107, '../../imgs/studentProfile/profile.png', 'PAGATPATAN', 'JESSA MAE', 'MARIÑO', '', '2007-03-06', 'FEMALE', '00000000', 'test@gmail.com', 'SINGLE', 'CATHOLIC', 'MANGGANG MARIKIT GUIMBA NUEVA ECIJA', '', 'FILIPINO', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(44, 105427120062, '../../imgs/studentProfile/profile.png', 'ABULENCIA', 'GENESIS', '', '', '2007-02-19', 'MALE', '00000000', 'test@gmail.com', 'SINGLE', '', 'PASONG INCHIK GUIMBA NUEVA ECIJA', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(45, 105414120032, '../../imgs/studentProfile/profile.png', 'GALLARDE', 'KEN', '', '', '0221-10-21', 'MALE', '09770961649', 'test@gmail.com', 'SINGLE', '', 'GALVAN', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `todolists`
--

DROP TABLE IF EXISTS `todolists`;
CREATE TABLE IF NOT EXISTS `todolists` (
  `toDoListID` int NOT NULL AUTO_INCREMENT,
  `toDo` varchar(255) DEFAULT NULL,
  `toDoStatus` enum('PENDING','COMPLETED') DEFAULT NULL,
  `lastUpdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`toDoListID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `todolists`
--

INSERT INTO `todolists` (`toDoListID`, `toDo`, `toDoStatus`, `lastUpdate`) VALUES
(2, 'A TASK', 'COMPLETED', '2025-03-08 12:16:06'),
(3, 'TASK AGAIN', 'COMPLETED', '2025-03-08 12:16:21'),
(4, '%%^&#38;3723738971283782312&#38;(&#38;*219', 'COMPLETED', '2025-03-10 02:24:43'),
(5, '1001010010010011001001010010110101010101010100100101010101010101010101010101010101010101001010', 'COMPLETED', '2025-03-10 02:24:42');

-- --------------------------------------------------------

--
-- Table structure for table `violationlogs`
--

DROP TABLE IF EXISTS `violationlogs`;
CREATE TABLE IF NOT EXISTS `violationlogs` (
  `violationLogID` int NOT NULL AUTO_INCREMENT,
  `studentID` int DEFAULT NULL,
  `articleID` int DEFAULT NULL,
  `articleSectionID` int DEFAULT NULL,
  `sanctionID` int DEFAULT NULL,
  `violationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `violationStatus` enum('PENDING','IN-PROGRESS','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `lastUpdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`violationLogID`),
  KEY `idx_of_article_id` (`articleID`),
  KEY `idx_of_article_section_id` (`articleSectionID`),
  KEY `idx_of_sanction_Id` (`sanctionID`),
  KEY `idx_of_student_id` (`studentID`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `violationlogs`
--

INSERT INTO `violationlogs` (`violationLogID`, `studentID`, `articleID`, `articleSectionID`, `sanctionID`, `violationDate`, `violationStatus`, `lastUpdate`) VALUES
(1, 8, 1, 3, 5, '2024-01-15 02:30:00', 'COMPLETED', '2025-03-10 01:53:51'),
(2, 2, 2, 10, 7, '2024-02-10 06:45:00', 'COMPLETED', '2025-03-10 01:53:56'),
(3, 3, 1, 15, 12, '2024-03-20 01:15:00', 'COMPLETED', '2025-03-10 01:53:58'),
(4, 4, 2, 20, 2, '2024-04-05 08:00:00', 'COMPLETED', '2025-03-10 01:54:01'),
(5, 5, 1, 30, 14, '2024-05-12 00:45:00', 'IN-PROGRESS', '2025-03-10 02:09:48'),
(6, 7, 1, 1, 1, '2025-03-08 16:00:00', 'COMPLETED', '2025-03-10 01:54:10'),
(7, 6, 1, 2, 2, '2025-03-08 16:00:00', 'COMPLETED', '2025-03-10 01:54:03'),
(8, 6, 1, 1, 1, '2025-03-08 16:00:00', 'PENDING', '2025-03-09 02:25:08'),
(9, 6, 2, 11, 1, '2025-03-08 16:00:00', 'PENDING', '2025-03-09 02:25:18'),
(10, 6, 2, 11, 1, '2025-03-08 16:00:00', 'IN-PROGRESS', '2025-03-10 00:57:07'),
(11, 26, 1, 1, 1, '2025-03-08 16:00:00', 'PENDING', '2025-03-09 02:55:20'),
(12, 6, 1, 1, 1, '2025-03-08 16:00:00', 'PENDING', '2025-03-09 02:59:26'),
(13, 20, 1, 1, 1, '2025-03-09 03:00:00', 'PENDING', '2025-03-09 03:00:43'),
(14, 2, 2, 12, 9, '2025-03-17 03:14:00', 'PENDING', '2025-03-09 03:14:32'),
(15, 34, 1, 1, 19, '2025-03-07 16:00:00', 'COMPLETED', '2025-03-10 01:54:14'),
(16, 34, 1, 1, 19, '2025-03-09 03:37:00', 'COMPLETED', '2025-03-10 01:54:16'),
(17, 34, 1, 5, 5, '2025-03-09 05:35:00', 'COMPLETED', '2025-03-10 00:31:05'),
(18, 2, 1, 1, 1, '2025-03-09 05:47:00', 'PENDING', '2025-03-09 05:47:58'),
(19, 2, 1, 1, 1, '2025-03-09 05:35:00', 'PENDING', '2025-03-09 05:35:52'),
(20, 2, 1, 1, 1, '2025-03-09 05:36:00', 'PENDING', '2025-03-09 05:36:22'),
(21, 34, 1, 1, 1, '2025-03-09 14:03:00', 'COMPLETED', '2025-03-10 00:40:01'),
(22, 2, 1, 1, 1, '2025-03-10 00:31:00', 'PENDING', '2025-03-10 00:31:59'),
(23, 2, 1, 1, 1, '2025-03-09 16:06:00', 'PENDING', '2025-03-09 16:07:01'),
(24, 21, 1, 1, 19, '2025-03-05 01:00:00', 'IN-PROGRESS', '2025-03-10 01:00:04'),
(25, 21, 1, 1, 19, '2025-03-10 00:33:00', 'PENDING', '2025-03-10 00:33:48'),
(26, 13, 2, 16, 16, '2025-03-05 00:37:00', 'IN-PROGRESS', '2025-03-10 00:39:57'),
(27, 20, 3, 46, 1, '2025-03-10 01:10:00', 'PENDING', '2025-03-10 01:10:54'),
(28, 2, 1, 1, 1, '2025-03-10 01:15:00', 'PENDING', '2025-03-10 01:15:18'),
(29, 4, 2, 12, 2, '2025-03-10 01:15:00', 'PENDING', '2025-03-10 01:15:29'),
(30, 11, 1, 1, 2, '2025-03-10 01:23:00', 'PENDING', '2025-03-10 01:23:19'),
(31, 22, 1, 1, 1, '2025-03-10 01:23:00', 'PENDING', '2025-03-10 01:23:07'),
(32, 6, 1, 1, 1, '2025-03-10 01:23:00', 'PENDING', '2025-03-10 01:23:35'),
(33, 13, 1, 1, 1, '2025-03-10 01:23:00', 'PENDING', '2025-03-10 01:23:47'),
(76, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:54:19'),
(77, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:54:21'),
(78, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:54:23'),
(79, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:54:31'),
(80, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:54:28'),
(81, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 02:00:01'),
(82, 45, 1, 9, 19, '2025-03-10 01:51:00', 'COMPLETED', '2025-03-10 01:59:59'),
(83, 45, 1, 9, 19, '2025-01-10 01:51:00', 'PENDING', '2025-03-10 01:52:01'),
(84, 45, 1, 9, 19, '2025-01-10 01:51:00', 'COMPLETED', '2025-03-10 01:59:53'),
(85, 45, 1, 9, 19, '2025-01-10 01:51:00', 'PENDING', '2025-03-10 01:52:08'),
(86, 45, 1, 9, 19, '2025-01-10 01:51:00', 'COMPLETED', '2025-03-10 02:00:07'),
(87, 45, 1, 9, 19, '2025-01-10 01:51:00', 'COMPLETED', '2025-03-10 01:59:49'),
(88, 45, 1, 9, 19, '2025-01-10 01:51:00', 'PENDING', '2025-03-10 01:52:14'),
(89, 45, 1, 9, 19, '2026-06-22 01:51:00', 'COMPLETED', '2025-03-10 01:59:45'),
(90, 45, 1, 9, 19, '2026-06-22 01:51:00', 'COMPLETED', '2025-03-10 01:54:34'),
(91, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:00:48'),
(92, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:00:51'),
(93, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:00:53'),
(94, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:00:57'),
(95, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:00:58'),
(96, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:01'),
(97, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:03'),
(98, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:05'),
(99, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:08'),
(100, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:10'),
(101, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:12'),
(102, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:14'),
(103, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:16'),
(104, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:18'),
(105, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:20'),
(106, 34, 1, 1, 19, '2025-02-10 02:00:00', 'PENDING', '2025-03-10 02:01:20'),
(107, 34, 2, 13, 2, '2025-02-10 02:01:00', 'PENDING', '2025-03-10 02:02:14'),
(108, 34, 2, 13, 2, '2025-02-10 02:01:00', 'PENDING', '2025-03-10 02:02:17'),
(109, 34, 2, 13, 2, '2025-02-10 02:01:00', 'PENDING', '2025-03-10 02:02:18'),
(110, 34, 2, 13, 2, '2025-02-10 02:01:00', 'PENDING', '2025-03-10 02:02:21'),
(111, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:28'),
(112, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:30'),
(113, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:34'),
(114, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:36'),
(115, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:38'),
(116, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:40'),
(117, 34, 2, 13, 2, '2025-04-10 02:01:00', 'PENDING', '2025-03-10 02:02:40'),
(118, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:15'),
(119, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:19'),
(120, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:20'),
(121, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:22'),
(122, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:24'),
(123, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:26'),
(124, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:30'),
(125, 6, 1, 1, 13, '2024-01-01 02:02:00', 'PENDING', '2025-03-10 02:03:33'),
(126, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:31'),
(127, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:34'),
(128, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:36'),
(129, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:39'),
(130, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:45'),
(131, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:48'),
(132, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:50'),
(133, 34, 1, 1, 17, '2025-03-11 02:04:00', 'PENDING', '2025-03-10 02:04:52'),
(134, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:04:58'),
(135, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:00'),
(136, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:02'),
(137, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:04'),
(138, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:06'),
(139, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:08'),
(140, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:10'),
(141, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:13'),
(142, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:15'),
(143, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:16'),
(144, 34, 1, 1, 17, '2025-03-12 02:04:00', 'PENDING', '2025-03-10 02:05:18'),
(145, 34, 1, 1, 17, '2025-03-13 02:04:00', 'PENDING', '2025-03-10 02:05:22'),
(146, 34, 1, 1, 17, '2025-03-13 02:04:00', 'PENDING', '2025-03-10 02:05:24'),
(147, 34, 1, 1, 17, '2025-03-13 02:04:00', 'PENDING', '2025-03-10 02:05:26'),
(148, 34, 1, 1, 17, '2025-03-13 02:04:00', 'PENDING', '2025-03-10 02:05:28'),
(149, 34, 1, 1, 17, '2025-03-14 02:04:00', 'PENDING', '2025-03-10 02:05:34'),
(150, 34, 1, 1, 17, '2025-03-14 02:04:00', 'PENDING', '2025-03-10 02:05:36'),
(151, 36, 4, 49, 20, '2025-04-10 02:07:00', 'PENDING', '2025-03-10 02:07:27'),
(152, 36, 4, 49, 20, '2025-04-16 02:07:00', 'PENDING', '2025-03-10 02:07:34');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `studentinfo` (`studentID`);

--
-- Constraints for table `articlesections`
--
ALTER TABLE `articlesections`
  ADD CONSTRAINT `articlesections_ibfk_1` FOREIGN KEY (`articleID`) REFERENCES `articles` (`articleID`);

--
-- Constraints for table `gradesections`
--
ALTER TABLE `gradesections`
  ADD CONSTRAINT `gradesections_ibfk_1` FOREIGN KEY (`gradeLevelID`) REFERENCES `gradelevels` (`gradeLevelID`),
  ADD CONSTRAINT `gradesections_ibfk_2` FOREIGN KEY (`schoolYearID`) REFERENCES `schoolyears` (`schoolYearID`);

--
-- Constraints for table `registrations`
--
ALTER TABLE `registrations`
  ADD CONSTRAINT `registrations_ibfk_1` FOREIGN KEY (`studentID`) REFERENCES `studentinfo` (`studentID`),
  ADD CONSTRAINT `registrations_ibfk_2` FOREIGN KEY (`gradeSectionID`) REFERENCES `gradesections` (`sectionID`),
  ADD CONSTRAINT `registrations_ibfk_3` FOREIGN KEY (`schoolYearID`) REFERENCES `schoolyears` (`schoolYearID`);

--
-- Constraints for table `violationlogs`
--
ALTER TABLE `violationlogs`
  ADD CONSTRAINT `violationlogs_ibfk_1` FOREIGN KEY (`articleID`) REFERENCES `articles` (`articleID`),
  ADD CONSTRAINT `violationlogs_ibfk_2` FOREIGN KEY (`articleSectionID`) REFERENCES `articlesections` (`articleSectionID`),
  ADD CONSTRAINT `violationlogs_ibfk_3` FOREIGN KEY (`sanctionID`) REFERENCES `sanctions` (`sanctionID`),
  ADD CONSTRAINT `violationlogs_ibfk_4` FOREIGN KEY (`studentID`) REFERENCES `studentinfo` (`studentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
