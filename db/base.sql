/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.26 : Database - rbacsystem
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`rbacsystem` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `rbacsystem`;

/*Table structure for table `org` */

DROP TABLE IF EXISTS `org`;

CREATE TABLE `org` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `orgName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `org` */

insert  into `org`(`id`,`orgName`,`createdAt`,`updatedAt`) values (1,'w3chool','2021-03-31 11:21:20','2021-03-31 11:21:22'),(2,'apple','2021-03-31 11:22:08','2021-03-31 11:22:10'),(3,'MI','2021-03-31 11:23:42','2021-03-31 11:23:43'),(5,'用户创建的项目','2021-03-31 12:29:17','2021-03-31 12:29:17');

/*Table structure for table `org_tasks` */

DROP TABLE IF EXISTS `org_tasks`;

CREATE TABLE `org_tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `orgId` int(11) DEFAULT NULL,
  `taskId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0:未完成，1：完成',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `org_tasks` */

insert  into `org_tasks`(`id`,`orgId`,`taskId`,`createdAt`,`updatedAt`,`userId`,`status`) values (1,1,3,'2021-03-31 11:47:19','2021-03-31 08:05:25',NULL,1),(2,2,2,'2021-03-31 11:48:08','2021-03-31 11:48:10',NULL,1),(3,3,3,'2021-03-31 11:49:06','2021-03-31 11:49:07',NULL,1),(4,1,1,'2021-03-31 07:57:44','2021-03-31 11:58:09',5,1),(5,4,6,'2021-03-31 12:18:34','2021-03-31 12:20:55',NULL,0);

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `title` varchar(50) DEFAULT NULL,
  `action` varchar(64) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

/*Data for the table `permission` */

insert  into `permission`(`id`,`title`,`action`,`status`,`createdAt`,`updatedAt`,`remark`) values (1,'主页','/',1,'2021-03-30 12:20:17','2021-03-30 12:20:19','跳转到主页'),(2,'查询用户','/users/page',1,'2021-03-25 10:15:11','2021-03-21 10:15:13','用户'),(3,'添加用户','/users/add',1,'2021-03-31 10:17:02','2021-03-31 10:17:04','用户'),(4,'更改用户信息','/users/upd',1,'2021-03-31 10:17:26','2021-03-31 10:17:28','用户'),(5,'删除用户','/users/del',1,'2021-03-31 10:17:43','2021-03-31 10:17:45','用户'),(6,'登录','/users/login',1,'2021-03-31 11:03:39','2021-03-31 11:03:41','用户'),(7,'注销','/users/logout',1,'2021-03-31 11:03:58','2021-03-31 11:04:00','用户'),(8,'查询角色','/role/page',1,'2021-03-31 11:04:31','2021-03-31 11:04:32','角色'),(9,'增加角色','/role/add',1,'2021-03-31 11:06:10','2021-03-31 11:06:12','角色'),(10,'删除角色','/role/del',1,'2021-03-31 11:06:37','2021-03-31 11:06:39','角色'),(11,'更新角色','/role/upd',1,'2021-03-31 11:07:05','2021-03-31 11:07:08','角色'),(12,'分配任务','/orgTask/userAddTask',1,'2021-03-31 16:53:09','2021-03-31 16:53:11','任务'),(13,'添加任务','/task/add',1,'2021-03-31 16:53:37','2021-03-31 16:53:40','任务'),(14,'添加组织','/org/add',1,'2021-03-31 16:59:47','2021-03-31 16:59:48','组织'),(15,'删除组织','/org/del',1,'2021-03-31 16:59:59','2021-03-31 17:00:01','组织'),(16,'更新组织','/org/upd',1,'2021-03-27 17:00:28','2021-03-31 17:00:30','组织'),(17,'查看所有组织','/org/page',1,'2021-03-31 17:01:57','2021-03-31 17:01:59','组织'),(18,'把用户添加到组织','/userOrg/add',1,'2021-03-31 17:49:30','2021-03-31 17:49:36','用户和组织'),(19,'把用户踢出组织','/userOrg/del',1,'2021-03-31 17:50:20','2021-03-31 17:50:26','用户和组织'),(20,'查看用户和组织表','/userOrg/page',1,'2021-03-31 17:54:05','2021-03-31 17:54:07','用户和组织'),(21,'为用户添加任务','/orgTask/userAddTask',1,'2021-03-31 17:57:14','2021-03-31 17:57:16','用户和任务'),(22,'取任务负责人','/orgTask/userDelTask',1,'2021-03-31 19:55:02','2021-03-31 19:55:03','用户和任务'),(23,'查看任务','/task/page',1,'2021-03-31 20:12:26','2021-03-31 20:12:27','任务'),(24,'任务分配到组织','/orgTask/add',1,'2021-03-31 20:18:05','2021-03-31 20:18:07','任务和组织'),(25,'删除任务','/task/del',1,'2021-03-31 21:10:11','2021-03-31 21:10:12','任务');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `roleName` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `role` */

insert  into `role`(`id`,`roleName`,`status`,`createdAt`,`updatedAt`,`remark`) values (1,'superAdmin',1,'2021-03-30 12:01:07','2021-03-30 12:01:09','经理'),(2,'admin',1,'2021-03-30 13:49:53','2021-03-30 13:49:55','用户'),(4,'director',1,'2021-03-31 16:45:59','2021-03-31 16:46:00','项目负责人'),(5,'menber',1,'2021-03-31 16:46:40','2021-03-31 16:46:42','项目参与人'),(6,'assignee',1,'2021-03-31 16:48:00','2021-03-31 16:48:01','受让人'),(7,'Journalist',1,'2021-03-31 21:17:22','2021-03-31 21:17:24','记者');

/*Table structure for table `role_permission` */

DROP TABLE IF EXISTS `role_permission`;

CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `role_id` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT '1',
  `permission_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

/*Data for the table `role_permission` */

insert  into `role_permission`(`id`,`role_id`,`status`,`permission_id`,`createdAt`,`updatedAt`) values (1,1,1,1,'2021-03-31 16:49:43','2021-03-31 16:49:44'),(2,1,1,2,'2021-03-31 16:49:49','2021-03-31 16:49:51'),(3,1,1,3,'2021-03-31 16:51:47','2021-03-31 16:51:48'),(4,1,1,4,'2021-03-31 16:51:56','2021-03-31 16:51:58'),(5,1,1,5,'2021-03-31 16:52:07','2021-03-31 16:52:09'),(6,1,1,14,'2021-03-31 17:01:01','2021-03-31 17:01:03'),(7,1,1,15,'2021-03-31 17:01:09','2021-03-31 17:01:11'),(8,1,1,16,'2021-03-31 17:01:17','2021-03-31 17:01:18'),(9,1,1,17,'2021-03-03 17:02:15','2021-03-31 17:02:18'),(10,1,1,18,'2021-03-31 17:52:29','2021-03-31 17:52:31'),(11,1,1,19,'2021-03-31 17:52:36','2021-03-31 17:52:37'),(12,1,1,20,'2021-03-31 17:54:23','2021-03-31 17:54:25'),(13,1,1,12,'2021-03-31 19:49:07','2021-03-31 19:49:09'),(14,1,1,22,'2021-03-31 19:55:26','2021-03-31 19:55:28'),(15,1,1,13,'2021-03-31 20:09:51','2021-03-31 20:09:52'),(16,1,1,23,'2021-03-31 20:12:44','2021-03-31 20:12:46'),(17,1,1,24,'2021-03-31 20:18:26','2021-03-31 20:18:28'),(18,2,1,14,'2021-03-31 20:29:09','2021-03-31 20:29:10'),(19,2,1,2,'2021-03-31 20:30:38','2021-03-31 20:30:39'),(20,2,1,20,'2021-03-31 20:44:56','2021-03-31 20:44:58'),(21,2,1,18,'2021-03-31 20:58:06','2021-03-31 20:58:09'),(22,4,1,18,'2021-03-31 21:13:30','2021-03-31 21:13:32'),(23,4,1,19,'2021-03-31 21:13:42','2021-03-31 21:13:43'),(24,4,1,13,'2021-03-31 21:13:50','2021-03-31 21:13:51'),(25,4,1,25,'2021-03-31 21:13:57','2021-03-31 21:13:59'),(26,4,1,21,'2021-03-31 21:14:06','2021-03-31 21:14:07'),(27,4,1,22,'2021-03-31 21:14:17','2021-03-31 21:14:19'),(28,5,1,18,'2021-03-31 21:16:07','2021-03-31 21:16:08'),(29,5,1,13,'2021-03-31 21:16:14','2021-03-31 21:16:15'),(30,7,1,22,'2021-03-31 21:19:38','2021-03-31 21:19:41'),(31,7,1,25,'2021-03-31 21:19:49','2021-03-31 21:19:50'),(32,7,1,21,'2021-03-31 21:21:59','2021-03-31 21:22:01'),(33,6,1,21,'2021-03-31 21:22:12','2021-03-31 21:22:14'),(34,6,1,22,'2021-03-31 21:22:21','2021-03-31 21:22:23');

/*Table structure for table `tasks` */

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `taskName` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `status` varchar(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tasks` */

insert  into `tasks`(`id`,`taskName`,`remark`,`createdAt`,`updatedAt`,`status`) values (1,'发明html',NULL,'2021-03-31 11:41:35','2021-03-31 11:41:37','0'),(2,'Iphone15',NULL,'2021-03-31 11:47:43','2021-03-31 11:47:45','0'),(3,'电动车',NULL,'2021-03-31 11:48:53','2021-03-31 11:48:56','0'),(5,'测试一下你','','2021-03-31 07:12:37','2021-03-31 07:15:38','1'),(6,'经理的大项目','ok','2021-03-31 12:10:50','2021-03-31 12:10:50','0');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(10) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `remak` varchar(255) DEFAULT NULL,
  `roleId` int(1) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`pwd`,`createdAt`,`updatedAt`,`remak`,`roleId`,`status`) values (5,'kinfai','123456','2021-03-31 01:42:24','2021-03-31 03:31:20',NULL,1,1),(6,'Joker','123456','2021-03-31 01:42:53','2021-03-31 01:42:53',NULL,2,1),(7,'Milk','123456','2021-03-31 09:57:26','2021-03-31 09:57:28',NULL,2,1),(8,'testa','123456','2021-03-31 03:09:19','2021-03-31 03:31:40',NULL,2,1),(9,'testa1','123456','2021-03-31 03:15:05','2021-03-31 03:15:05',NULL,2,1);

/*Table structure for table `user_org` */

DROP TABLE IF EXISTS `user_org`;

CREATE TABLE `user_org` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `userId` varchar(255) DEFAULT NULL,
  `orgId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_org_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_org` */

insert  into `user_org`(`id`,`userId`,`orgId`,`createdAt`,`updatedAt`) values (1,'5','1','2021-03-31 16:29:39','2021-03-31 16:29:41'),(2,'5','2','2021-03-31 16:29:45','2021-03-31 16:29:47'),(3,'5','3','2021-03-31 16:29:51','2021-03-31 16:29:53'),(4,'6','3','2021-03-31 20:49:17','2021-03-31 20:49:19'),(7,'13','4','2021-03-31 12:58:13','2021-03-31 12:58:13'),(14,'9','4','2021-03-31 13:06:52','2021-03-31 13:06:52'),(15,'9','4','2021-03-31 13:07:48','2021-03-31 13:07:48');

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `uid` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user_role` */

insert  into `user_role`(`id`,`uid`,`role_id`,`createdAt`,`updatedAt`) values (1,1,1,'2021-03-30 12:01:48','2021-03-30 12:01:50');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
