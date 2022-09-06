CREATE DATABASE  IF NOT EXISTS `planilla` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `planilla`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: planilla
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_category_salary`
--

DROP TABLE IF EXISTS `tbl_category_salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_category_salary` (
  `categorySalaryId` int NOT NULL AUTO_INCREMENT,
  `categorySalarySalary` decimal(10,2) NOT NULL,
  `categorySalaryYear` int NOT NULL,
  `employeeCategoryId` int NOT NULL,
  PRIMARY KEY (`categorySalaryId`),
  KEY `employeeCategoryId_idx` (`employeeCategoryId`),
  CONSTRAINT `ForeignKey` FOREIGN KEY (`employeeCategoryId`) REFERENCES `tbl_employee_category` (`employeeCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_category_salary`
--

LOCK TABLES `tbl_category_salary` WRITE;
/*!40000 ALTER TABLE `tbl_category_salary` DISABLE KEYS */;
INSERT INTO `tbl_category_salary` VALUES (1,1300.00,2022,1),(2,1500.00,2024,2),(3,1000.00,2022,1),(4,1000.00,2022,2),(5,1000.00,2022,1),(6,1000.00,2022,2);
/*!40000 ALTER TABLE `tbl_category_salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_employee`
--

DROP TABLE IF EXISTS `tbl_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_employee` (
  `employeeId` int NOT NULL AUTO_INCREMENT,
  `employeeDni` varchar(8) NOT NULL,
  `employeeFullname` varchar(100) NOT NULL,
  `employeeStatus` tinyint NOT NULL,
  `categorySalaryId` int NOT NULL,
  PRIMARY KEY (`employeeId`),
  UNIQUE KEY `employeeDni_UNIQUE` (`employeeDni`),
  UNIQUE KEY `employeeId_UNIQUE` (`employeeId`),
  KEY `categorySalaryId` (`categorySalaryId`),
  CONSTRAINT `tbl_employee_ibfk_1` FOREIGN KEY (`categorySalaryId`) REFERENCES `tbl_category_salary` (`categorySalaryId`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_employee`
--

LOCK TABLES `tbl_employee` WRITE;
/*!40000 ALTER TABLE `tbl_employee` DISABLE KEYS */;
INSERT INTO `tbl_employee` VALUES (2,'46093799','carlongas',0,2),(4,'46093791','Carlos Aguirre Rivera',1,2),(5,'46093793','Carlos Aguirre Rivera',1,2),(11,'46093794','Carlos Aguirre Rivera',1,2),(13,'14040040','aguirre',1,1),(18,'14040041','aguirre',1,1),(30,'14040042','aguirre',1,1),(71,'14040043','aguirre',1,1),(72,'46093796','Carlos Aguirre Rivera',1,2),(73,'46093712','Carlos Aguirre Rivera',1,2),(74,'46093713','Carlos Aguirre Rivera',1,2);
/*!40000 ALTER TABLE `tbl_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_employee_category`
--

DROP TABLE IF EXISTS `tbl_employee_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_employee_category` (
  `employeeCategoryId` int NOT NULL AUTO_INCREMENT,
  `employeeCategoryDescription` varchar(100) NOT NULL,
  `employeeCategoryShortDescription` varchar(10) NOT NULL,
  PRIMARY KEY (`employeeCategoryId`),
  UNIQUE KEY `employeeCategoryShortDescription_UNIQUE` (`employeeCategoryShortDescription`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_employee_category`
--

LOCK TABLES `tbl_employee_category` WRITE;
/*!40000 ALTER TABLE `tbl_employee_category` DISABLE KEYS */;
INSERT INTO `tbl_employee_category` VALUES (1,'funcionario nivel 1','F1'),(2,'funcionario nivel 2','F2'),(5,'asdasd','f3');
/*!40000 ALTER TABLE `tbl_employee_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `userFirstName` varchar(30) DEFAULT NULL,
  `userLastName` varchar(30) DEFAULT NULL,
  `userEmail` varchar(100) DEFAULT NULL,
  `userDni` varchar(8) DEFAULT NULL,
  `userStatus` tinyint NOT NULL,
  `userCreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `userEmail_UNIQUE` (`userEmail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'carlos','aguirre','carlos@hotmail.com','46093790',1,'2022-09-05 02:58:32','2022-09-05 02:58:32'),(2,'carlos','Aguirre','carlos3@asdasdasd.com','46093777',1,'2022-09-05 17:30:38','2022-09-05 17:30:38');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-05 23:51:43
