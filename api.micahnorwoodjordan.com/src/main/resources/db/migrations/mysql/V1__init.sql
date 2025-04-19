CREATE DATABASE IF NOT EXISTS `staging_micahnorwoodjordan_com` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `staging_micahnorwoodjordan_com`;

-- MySQLShell dump 2.0.1  Distrib Ver 9.2.0 for macos15 on arm64 - for MySQL 9.2.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Table: email_message
-- ------------------------------------------------------
-- Server version	8.0.35

--
-- Table structure for table `email_message`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `email_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message_body` varchar(255) DEFAULT NULL,
  `sender_email_address` varchar(255) DEFAULT NULL,
  `sender_first_name` varchar(255) DEFAULT NULL,
  `sender_last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */;
-- MySQLShell dump 2.0.1  Distrib Ver 9.2.0 for macos15 on arm64 - for MySQL 9.2.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Table: project
-- ------------------------------------------------------
-- Server version	8.0.35

--
-- Table structure for table `project`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `project_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
