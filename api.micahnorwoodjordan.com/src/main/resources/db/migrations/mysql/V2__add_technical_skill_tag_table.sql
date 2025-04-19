-- MySQLShell dump 2.0.1  Distrib Ver 9.2.0 for macos15 on arm64 - for MySQL 9.2.0 (MySQL Community Server (GPL)), for macos15 (arm64)
--
-- Table: technical_skill_tag
-- ------------------------------------------------------
-- Server version	8.0.35

--
-- Table structure for table `technical_skill_tag`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE IF NOT EXISTS `technical_skill_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
