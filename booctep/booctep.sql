/*
SQLyog Community v13.1.1 (64 bit)
MySQL - 10.4.18-MariaDB : Database - booctop
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`booctop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `booctop`;

/*Table structure for table `auth_group` */

DROP TABLE IF EXISTS `auth_group`;

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `auth_group` */

insert  into `auth_group`(`id`,`name`) values 
(1,'admin'),
(2,'student'),
(3,'teacher');

/*Table structure for table `auth_group_permissions` */

DROP TABLE IF EXISTS `auth_group_permissions`;

CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `auth_group_permissions` */

/*Table structure for table `auth_permission` */

DROP TABLE IF EXISTS `auth_permission`;

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `auth_permission` */

insert  into `auth_permission`(`id`,`name`,`content_type_id`,`codename`) values 
(1,'Can add User',1,'add_user'),
(2,'Can change User',1,'change_user'),
(3,'Can delete User',1,'delete_user'),
(4,'Can view User',1,'view_user'),
(5,'Can add user_become',2,'add_user_become'),
(6,'Can change user_become',2,'change_user_become'),
(7,'Can delete user_become',2,'delete_user_become'),
(8,'Can view user_become',2,'view_user_become'),
(9,'Can add user_profile',3,'add_user_profile'),
(10,'Can change user_profile',3,'change_user_profile'),
(11,'Can delete user_profile',3,'delete_user_profile'),
(12,'Can view user_profile',3,'view_user_profile'),
(13,'Can add user_categories',4,'add_user_categories'),
(14,'Can change user_categories',4,'change_user_categories'),
(15,'Can delete user_categories',4,'delete_user_categories'),
(16,'Can view user_categories',4,'view_user_categories'),
(17,'Can add user_activation',5,'add_user_activation'),
(18,'Can change user_activation',5,'change_user_activation'),
(19,'Can delete user_activation',5,'delete_user_activation'),
(20,'Can view user_activation',5,'view_user_activation'),
(21,'Can add notifications',6,'add_notifications'),
(22,'Can change notifications',6,'change_notifications'),
(23,'Can delete notifications',6,'delete_notifications'),
(24,'Can view notifications',6,'view_notifications'),
(25,'Can add log entry',7,'add_logentry'),
(26,'Can change log entry',7,'change_logentry'),
(27,'Can delete log entry',7,'delete_logentry'),
(28,'Can view log entry',7,'view_logentry'),
(29,'Can add permission',8,'add_permission'),
(30,'Can change permission',8,'change_permission'),
(31,'Can delete permission',8,'delete_permission'),
(32,'Can view permission',8,'view_permission'),
(33,'Can add group',9,'add_group'),
(34,'Can change group',9,'change_group'),
(35,'Can delete group',9,'delete_group'),
(36,'Can view group',9,'view_group'),
(37,'Can add content type',10,'add_contenttype'),
(38,'Can change content type',10,'change_contenttype'),
(39,'Can delete content type',10,'delete_contenttype'),
(40,'Can view content type',10,'view_contenttype'),
(41,'Can add session',11,'add_session'),
(42,'Can change session',11,'change_session'),
(43,'Can delete session',11,'delete_session'),
(44,'Can view session',11,'view_session'),
(45,'Can add categories',12,'add_categories'),
(46,'Can change categories',12,'change_categories'),
(47,'Can delete categories',12,'delete_categories'),
(48,'Can view categories',12,'view_categories'),
(49,'Can add courses',13,'add_courses'),
(50,'Can change courses',13,'change_courses'),
(51,'Can delete courses',13,'delete_courses'),
(52,'Can view courses',13,'view_courses'),
(53,'Can add questions',14,'add_questions'),
(54,'Can change questions',14,'change_questions'),
(55,'Can delete questions',14,'delete_questions'),
(56,'Can view questions',14,'view_questions'),
(57,'Can add questions1',15,'add_questions1'),
(58,'Can change questions1',15,'change_questions1'),
(59,'Can delete questions1',15,'delete_questions1'),
(60,'Can view questions1',15,'view_questions1'),
(61,'Can add sections',16,'add_sections'),
(62,'Can change sections',16,'change_sections'),
(63,'Can delete sections',16,'delete_sections'),
(64,'Can view sections',16,'view_sections'),
(65,'Can add student_mark',17,'add_student_mark'),
(66,'Can change student_mark',17,'change_student_mark'),
(67,'Can delete student_mark',17,'delete_student_mark'),
(68,'Can view student_mark',17,'view_student_mark'),
(69,'Can add todo',18,'add_todo'),
(70,'Can change todo',18,'change_todo'),
(71,'Can delete todo',18,'delete_todo'),
(72,'Can view todo',18,'view_todo'),
(73,'Can add transactions',19,'add_transactions'),
(74,'Can change transactions',19,'change_transactions'),
(75,'Can delete transactions',19,'delete_transactions'),
(76,'Can view transactions',19,'view_transactions'),
(77,'Can add video uploads',20,'add_videouploads'),
(78,'Can change video uploads',20,'change_videouploads'),
(79,'Can delete video uploads',20,'delete_videouploads'),
(80,'Can view video uploads',20,'view_videouploads'),
(81,'Can add subcategories',21,'add_subcategories'),
(82,'Can change subcategories',21,'change_subcategories'),
(83,'Can delete subcategories',21,'delete_subcategories'),
(84,'Can view subcategories',21,'view_subcategories'),
(85,'Can add answers',22,'add_answers'),
(86,'Can change answers',22,'change_answers'),
(87,'Can delete answers',22,'delete_answers'),
(88,'Can view answers',22,'view_answers'),
(89,'Can add student_certificate',23,'add_student_certificate'),
(90,'Can change student_certificate',23,'change_student_certificate'),
(91,'Can delete student_certificate',23,'delete_student_certificate'),
(92,'Can view student_certificate',23,'view_student_certificate'),
(93,'Can add student_register_courses',24,'add_student_register_courses'),
(94,'Can change student_register_courses',24,'change_student_register_courses'),
(95,'Can delete student_register_courses',24,'delete_student_register_courses'),
(96,'Can view student_register_courses',24,'view_student_register_courses'),
(97,'Can add student_rating_courses',25,'add_student_rating_courses'),
(98,'Can change student_rating_courses',25,'change_student_rating_courses'),
(99,'Can delete student_rating_courses',25,'delete_student_rating_courses'),
(100,'Can view student_rating_courses',25,'view_student_rating_courses'),
(101,'Can add student_performance',26,'add_student_performance'),
(102,'Can change student_performance',26,'change_student_performance'),
(103,'Can delete student_performance',26,'delete_student_performance'),
(104,'Can view student_performance',26,'view_student_performance'),
(105,'Can add student_favourite_courses',27,'add_student_favourite_courses'),
(106,'Can change student_favourite_courses',27,'change_student_favourite_courses'),
(107,'Can delete student_favourite_courses',27,'delete_student_favourite_courses'),
(108,'Can view student_favourite_courses',27,'view_student_favourite_courses'),
(109,'Can add student_cart_courses',28,'add_student_cart_courses'),
(110,'Can change student_cart_courses',28,'change_student_cart_courses'),
(111,'Can delete student_cart_courses',28,'delete_student_cart_courses'),
(112,'Can view student_cart_courses',28,'view_student_cart_courses'),
(113,'Can add payment',29,'add_payment'),
(114,'Can change payment',29,'change_payment'),
(115,'Can delete payment',29,'delete_payment'),
(116,'Can view payment',29,'view_payment'),
(117,'Can add course_comments',30,'add_course_comments'),
(118,'Can change course_comments',30,'change_course_comments'),
(119,'Can delete course_comments',30,'delete_course_comments'),
(120,'Can view course_comments',30,'view_course_comments'),
(121,'Can add association',31,'add_association'),
(122,'Can change association',31,'change_association'),
(123,'Can delete association',31,'delete_association'),
(124,'Can view association',31,'view_association'),
(125,'Can add code',32,'add_code'),
(126,'Can change code',32,'change_code'),
(127,'Can delete code',32,'delete_code'),
(128,'Can view code',32,'view_code'),
(129,'Can add nonce',33,'add_nonce'),
(130,'Can change nonce',33,'change_nonce'),
(131,'Can delete nonce',33,'delete_nonce'),
(132,'Can view nonce',33,'view_nonce'),
(133,'Can add user social auth',34,'add_usersocialauth'),
(134,'Can change user social auth',34,'change_usersocialauth'),
(135,'Can delete user social auth',34,'delete_usersocialauth'),
(136,'Can view user social auth',34,'view_usersocialauth'),
(137,'Can add partial',35,'add_partial'),
(138,'Can change partial',35,'change_partial'),
(139,'Can delete partial',35,'delete_partial'),
(140,'Can view partial',35,'view_partial'),
(141,'Can add discount',36,'add_discount'),
(142,'Can change discount',36,'change_discount'),
(143,'Can delete discount',36,'delete_discount'),
(144,'Can view discount',36,'view_discount'),
(145,'Can add PayPal IPN',37,'add_paypalipn'),
(146,'Can change PayPal IPN',37,'change_paypalipn'),
(147,'Can delete PayPal IPN',37,'delete_paypalipn'),
(148,'Can view PayPal IPN',37,'view_paypalipn'),
(149,'Can add user',38,'add_user'),
(150,'Can change user',38,'change_user'),
(151,'Can delete user',38,'delete_user'),
(152,'Can view user',38,'view_user'),
(153,'Can add admin',39,'add_admin'),
(154,'Can change admin',39,'change_admin'),
(155,'Can delete admin',39,'delete_admin'),
(156,'Can view admin',39,'view_admin'),
(157,'Can add test video',40,'add_testvideo'),
(158,'Can change test video',40,'change_testvideo'),
(159,'Can delete test video',40,'delete_testvideo'),
(160,'Can view test video',40,'view_testvideo'),
(161,'Can add position',41,'add_position'),
(162,'Can change position',41,'change_position'),
(163,'Can delete position',41,'delete_position'),
(164,'Can view position',41,'view_position');

/*Table structure for table `discount_discount` */

DROP TABLE IF EXISTS `discount_discount`;

CREATE TABLE `discount_discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `promo_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `discount_percent` int(11) NOT NULL DEFAULT 0,
  `expire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `days` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `discount_course` (`course_id`),
  CONSTRAINT `discount_course` FOREIGN KEY (`course_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `discount_discount` */

insert  into `discount_discount`(`id`,`course_id`,`promo_code`,`discount_percent`,`expire`,`days`) values 
(3,30,'first coupon',20,'2021-08-15',60);

/*Table structure for table `django_admin_log` */

DROP TABLE IF EXISTS `django_admin_log`;

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `object_repr` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_home_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `django_admin_log` */

insert  into `django_admin_log`(`id`,`action_time`,`object_id`,`object_repr`,`action_flag`,`change_message`,`content_type_id`,`user_id`) values 
(1,'2021-02-14 13:11:26.498851','1','discount object (1)',1,'[{\"added\": {}}]',36,1);

/*Table structure for table `django_content_type` */

DROP TABLE IF EXISTS `django_content_type`;

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `django_content_type` */

insert  into `django_content_type`(`id`,`app_label`,`model`) values 
(7,'admin','logentry'),
(9,'auth','group'),
(8,'auth','permission'),
(38,'auth','user'),
(10,'contenttypes','contenttype'),
(36,'discount','discount'),
(39,'home','admin'),
(6,'home','notifications'),
(41,'home','position'),
(1,'home','user'),
(5,'home','user_activation'),
(2,'home','user_become'),
(4,'home','user_categories'),
(3,'home','user_profile'),
(37,'ipn','paypalipn'),
(11,'sessions','session'),
(31,'social_django','association'),
(32,'social_django','code'),
(33,'social_django','nonce'),
(35,'social_django','partial'),
(34,'social_django','usersocialauth'),
(30,'student','course_comments'),
(29,'student','payment'),
(28,'student','student_cart_courses'),
(23,'student','student_certificate'),
(27,'student','student_favourite_courses'),
(26,'student','student_performance'),
(25,'student','student_rating_courses'),
(24,'student','student_register_courses'),
(22,'teacher','answers'),
(12,'teacher','categories'),
(13,'teacher','courses'),
(14,'teacher','questions'),
(15,'teacher','questions1'),
(16,'teacher','sections'),
(17,'teacher','student_mark'),
(21,'teacher','subcategories'),
(40,'teacher','testvideo'),
(18,'teacher','todo'),
(19,'teacher','transactions'),
(20,'teacher','videouploads');

/*Table structure for table `django_migrations` */

DROP TABLE IF EXISTS `django_migrations`;

CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `django_migrations` */

insert  into `django_migrations`(`id`,`app`,`name`,`applied`) values 
(1,'teacher','0001_initial','2021-02-14 11:01:01.970745'),
(2,'contenttypes','0001_initial','2021-02-14 11:01:08.937304'),
(3,'contenttypes','0002_remove_content_type_name','2021-02-14 11:01:13.404350'),
(4,'auth','0001_initial','2021-02-14 11:01:16.896812'),
(5,'auth','0002_alter_permission_name_max_length','2021-02-14 11:01:33.452890'),
(6,'auth','0003_alter_user_email_max_length','2021-02-14 11:01:33.629935'),
(7,'auth','0004_alter_user_username_opts','2021-02-14 11:01:33.780075'),
(8,'auth','0005_alter_user_last_login_null','2021-02-14 11:01:33.884148'),
(9,'auth','0006_require_contenttypes_0002','2021-02-14 11:01:33.998589'),
(10,'auth','0007_alter_validators_add_error_messages','2021-02-14 11:01:34.165520'),
(11,'auth','0008_alter_user_username_max_length','2021-02-14 11:01:34.242484'),
(12,'auth','0009_alter_user_last_name_max_length','2021-02-14 11:01:34.343493'),
(13,'auth','0010_alter_group_name_max_length','2021-02-14 11:01:34.613355'),
(14,'auth','0011_update_proxy_permissions','2021-02-14 11:01:34.776053'),
(15,'auth','0012_alter_user_first_name_max_length','2021-02-14 11:01:34.899018'),
(16,'home','0001_initial','2021-02-14 11:01:39.153555'),
(17,'admin','0001_initial','2021-02-14 11:01:55.744870'),
(18,'admin','0002_logentry_remove_auto_add','2021-02-14 11:02:02.291772'),
(19,'admin','0003_logentry_add_action_flag_choices','2021-02-14 11:02:02.538149'),
(20,'discount','0001_initial','2021-02-14 11:02:04.021183'),
(21,'sessions','0001_initial','2021-02-14 11:02:05.575941'),
(22,'default','0001_initial','2021-02-14 11:02:11.051271'),
(23,'social_auth','0001_initial','2021-02-14 11:02:11.217591'),
(24,'default','0002_add_related_name','2021-02-14 11:02:19.754114'),
(25,'social_auth','0002_add_related_name','2021-02-14 11:02:19.836753'),
(26,'default','0003_alter_email_max_length','2021-02-14 11:02:20.285116'),
(27,'social_auth','0003_alter_email_max_length','2021-02-14 11:02:20.493346'),
(28,'default','0004_auto_20160423_0400','2021-02-14 11:02:20.587883'),
(29,'social_auth','0004_auto_20160423_0400','2021-02-14 11:02:20.815405'),
(30,'social_auth','0005_auto_20160727_2333','2021-02-14 11:02:22.856046'),
(31,'social_django','0006_partial','2021-02-14 11:02:24.459448'),
(32,'social_django','0007_code_timestamp','2021-02-14 11:02:26.300358'),
(33,'social_django','0008_partial_timestamp','2021-02-14 11:02:27.589318'),
(34,'social_django','0009_auto_20191118_0520','2021-02-14 11:02:29.774932'),
(35,'social_django','0010_uid_db_index','2021-02-14 11:02:30.593661'),
(36,'student','0001_initial','2021-02-14 11:02:36.921225'),
(37,'social_django','0004_auto_20160423_0400','2021-02-14 11:03:14.260482'),
(38,'social_django','0005_auto_20160727_2333','2021-02-14 11:03:14.346250'),
(39,'social_django','0001_initial','2021-02-14 11:03:14.457266'),
(40,'social_django','0003_alter_email_max_length','2021-02-14 11:03:14.557725'),
(41,'social_django','0002_add_related_name','2021-02-14 11:03:14.802327'),
(42,'student','0002_course_comments_approved_by_teacher','2021-02-18 12:20:11.952303'),
(43,'student','0003_student_register_courses_last_completed_section_id','2021-02-19 12:09:00.110377'),
(44,'student','0004_auto_20210219_2024','2021-02-19 20:24:58.909836'),
(45,'student','0005_auto_20210219_2026','2021-02-19 20:26:51.809321'),
(46,'student','0006_student_register_courses_date_created','2021-02-19 21:41:33.536319'),
(47,'home','0002_user_receive_notifications','2021-02-20 07:47:49.617470'),
(48,'home','0003_notifications_created_at','2021-02-20 10:50:36.588353'),
(49,'ipn','0001_initial','2021-02-23 10:42:52.678857'),
(50,'ipn','0002_paypalipn_mp_id','2021-02-23 10:42:57.342433'),
(51,'ipn','0003_auto_20141117_1647','2021-02-23 10:43:04.229203'),
(52,'ipn','0004_auto_20150612_1826','2021-02-23 10:44:27.680915'),
(53,'ipn','0005_auto_20151217_0948','2021-02-23 10:44:29.489624'),
(54,'ipn','0006_auto_20160108_1112','2021-02-23 10:44:34.464788'),
(55,'ipn','0007_auto_20160219_1135','2021-02-23 10:44:34.748533'),
(56,'ipn','0008_auto_20181128_1032','2021-02-23 10:44:34.914062');

/*Table structure for table `django_session` */

DROP TABLE IF EXISTS `django_session`;

CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `django_session` */

insert  into `django_session`(`session_key`,`session_data`,`expire_date`) values 
('1eai4tdy0rf5mvanta26tvjrsuaev693','NTdhZjM4YThiMzk4NjAyYzViMmVkMzNmZDkyYTc4YmM4MGY3NzMwNTp7IjEyNy4wLjAuMSI6ImFyLWxpZ2h0IiwiX2xhbmd1YWdlIjoiYXIiLCJfYXV0aF91c2VyX2lkIjoiNDAiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6ImVjYzQ0NWM1ZTUwN2MwMjhlNmE3MDU4YmU3YWRjMjJhNTZjMjY5MjciLCJ1c2VyX2lkIjoiNDAiLCJwYXNzd29yZCI6IkVsenViYWlyMSIsInJlbWVtYmVyIjoidHJ1ZSIsInVzZXJfdHlwZSI6InRlYWNoZXIifQ==','2026-06-19 01:27:19.519495'),
('6zv2oqxhexq72j41gzreptbl2j6392kv','MjQ3MzIwNzBlNjdjNzJlMDg5MDhlNzBkODljYTdiOTUyMjg5ODUyOTp7IjEyNy4wLjAuMSI6ImFyLWxpZ2h0IiwiX2xhbmd1YWdlIjoiYXIiLCJfYXV0aF91c2VyX2lkIjoiMiIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImRqYW5nby5jb250cmliLmF1dGguYmFja2VuZHMuTW9kZWxCYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiZWNjNDQ1YzVlNTA3YzAyOGU2YTcwNThiZTdhZGMyMmE1NmMyNjkyNyIsInVzZXJfaWQiOiIyIiwidXNlcl90eXBlIjoic3R1ZGVudCIsInBhc3N3b3JkIjoiRWx6dWJhaXIxIn0=','2026-06-19 02:25:35.385921');

/*Table structure for table `home_admin` */

DROP TABLE IF EXISTS `home_admin`;

CREATE TABLE `home_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `date_joined` datetime DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` tinyint(4) DEFAULT 1 COMMENT '0: admin 1: super user 2: employee',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position_id` tinyint(4) DEFAULT NULL COMMENT 'employee or superuser''s position. 0: not allocated',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_admin` */

insert  into `home_admin`(`id`,`email`,`password`,`last_login`,`date_joined`,`name`,`img`,`role`,`address`,`position_id`) values 
(1,'yarxalo@gmail.com','pbkdf2_sha256$260000$s8CRdADTgZN8cdr8H7a25E$pUQJ0DPEMGNeImSCcPXgM9OEXg7RGfyoeasLF7pc9fY=','2021-06-16 05:05:27','2021-05-07 05:40:43','Yaroslav Xalabuda','/img/user_images/72f277bb-287c-4da7-af40-b03c0b5a62fc.png',0,'Moscow',1),
(4,'ivan@gmail.com','pbkdf2_sha256$216000$sSQGOeaqskf7$M2wE3i4h3BkLOBtYSELPSKz5gKBD0IYDRut+tnWZweg=','2021-05-13 10:12:07','2021-05-07 05:40:43','ronaldinho','/img/user_images/5d0c01e2-737b-43f0-8c74-3aafe3f20cdd.png',2,'moscow',2),
(6,'ronaldo@gmail.com','pbkdf2_sha256$260000$d4rgS6cS83isDIiyj9xpPU$7qw0dWnX7zqJj3F710beod2yh5jpNW1Prc27Xo3Cb9w=','2021-05-06 03:34:18','2021-05-07 05:40:43','Ronaldo','',2,'risbon',7),
(7,'messi@gma.net','pbkdf2_sha256$260000$ePxqA57fZc8ocqGdw6BBzf$KFqygJ2m5swJTtj4NwZoHoa1DaGnQDcPfxYeWqdobOI=','2021-05-06 03:45:08','2021-05-07 05:40:43','mes','',1,'madrid',8),
(9,'demaria@gmail.com','pbkdf2_sha256$260000$bGEoe1ELh6I4k2uvOKyKaN$oH3nlO9UYlda+oU2gD7mie6JkxQDTXZFjRbZvu8HcYg=','2021-05-06 17:20:06','2021-05-07 05:40:43','demaria','',2,'',1),
(10,'officialcontactservices@gmail.com','pbkdf2_sha256$216000$PsHgox2tqSDC$yx9k669xd+PKmyHaWbEQcwkkpVWcd2lTCTDX3H7/UCg=','2021-05-09 09:08:54','2021-05-09 07:49:43','Elzubair1','/img/user_images/f06d78c1-dc9b-4e52-a18f-70877f0370d2.png',2,'KSA',3),
(11,'booctepdotcom2030@gmail.com','pbkdf2_sha256$216000$gi9Su98oGCnl$565IbwTzP6KYGLGpt6uxuR0zWzDop6kWjmzq2jIhxtM=','2021-05-09 09:15:46',NULL,'Ahmed','',1,'London',1),
(12,'hilalu@gmail.com','pbkdf2_sha256$216000$NCqLTykPS0rC$EvN6udP7gETpMrJb0okyniXjQ7aZvU3MaqnjXLb97FI=','2021-05-09 10:41:50',NULL,'Khalid','',1,'London',1),
(13,'test@gmail.com','pbkdf2_sha256$216000$3DTVXnq2Zp8U$ZZcSmcix8YZO21sc4GLboL2p9j1VzglkWF0TtAxh4eA=','2021-05-09 10:41:58',NULL,'test super user','',1,'sdfsdfsdf',4),
(14,'ma@gmail.com','pbkdf2_sha256$216000$R9C7d4AAEU8Z$nvL+PJECPdhc9c4V9G5Czh9BfU9j5bNNugdvwWGj22o=','2021-05-09 10:46:35',NULL,'Test','',1,'London',1),
(15,'ak@gmail.com','pbkdf2_sha256$216000$rUeYf1rgw6LJ$aeJcCyxYA2ykjPjD3VJOaaKYiD0aiMzwk78I440q1LM=','2021-05-09 10:48:11',NULL,'Another','',1,'ryiadh',2);

/*Table structure for table `home_admincontrol` */

DROP TABLE IF EXISTS `home_admincontrol`;

CREATE TABLE `home_admincontrol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` int(11) DEFAULT NULL,
  `student_tax` int(11) DEFAULT NULL,
  `teacher_tax` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_admincontrol` */

insert  into `home_admincontrol`(`id`,`priority`,`student_tax`,`teacher_tax`) values 
(1,0,0,0);

/*Table structure for table `home_adminnotifications` */

DROP TABLE IF EXISTS `home_adminnotifications`;

CREATE TABLE `home_adminnotifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `is_read` tinyint(4) DEFAULT 0,
  `good_bad` tinyint(4) DEFAULT NULL COMMENT '1: good 2: bad 0: all',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_adminnotifications` */

insert  into `home_adminnotifications`(`id`,`title`,`content`,`sender_id`,`receiver_id`,`time`,`is_read`,`good_bad`) values 
(1,'Hello ser','this is good news',1,4,'2021-05-07 06:32:05',0,1),
(2,'hello teacher','You are successfully rgistgeed',1,6,'2021-05-07 11:19:13',0,1),
(3,'HHH','wwwww',1,4,'2021-05-07 12:12:25',1,2),
(5,'every body','goooddddd',1,4,'2021-05-07 12:12:41',1,1),
(6,'every body','goooddddd',1,4,'2021-05-07 12:12:41',1,1),
(7,'are you there?','It is not good',1,4,'2021-05-07 12:44:38',1,2),
(8,'Change something','yarxalo@gmail.com',1,6,'2021-05-09 07:52:57',0,1),
(10,'Hi','bad job',1,10,'2021-05-09 07:55:14',1,2),
(12,'Change something','Hello',10,7,'2021-05-09 07:55:54',0,3),
(17,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,7,'2021-05-13 10:12:43',0,3),
(19,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,11,'2021-05-13 10:12:43',0,3),
(20,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,12,'2021-05-13 10:12:43',0,3),
(21,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,13,'2021-05-13 10:12:43',0,3),
(22,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,14,'2021-05-13 10:12:43',0,3),
(23,'Thanks','ivan@gmail.com\nivan@gmail.com\nivan@gmail.com\n',4,15,'2021-05-13 10:12:43',0,3);

/*Table structure for table `home_admintarget` */

DROP TABLE IF EXISTS `home_admintarget`;

CREATE TABLE `home_admintarget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_target` int(11) NOT NULL,
  `course_target` int(11) NOT NULL,
  `user_target` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_admintarget` */

insert  into `home_admintarget`(`id`,`sale_target`,`course_target`,`user_target`) values 
(1,10,800,0);

/*Table structure for table `home_card` */

DROP TABLE IF EXISTS `home_card`;

CREATE TABLE `home_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `card_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_user` (`user_id`),
  CONSTRAINT `bank_user` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_card` */

insert  into `home_card`(`id`,`user_id`,`card_name`,`card_number`,`bank_number`) values 
(8,40,'debit card','1234567890','1920');

/*Table structure for table `home_discount` */

DROP TABLE IF EXISTS `home_discount`;

CREATE TABLE `home_discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `discount` int(3) NOT NULL DEFAULT 0,
  `not_apply_course` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `expire_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `description` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_discount` */

insert  into `home_discount`(`id`,`discount`,`not_apply_course`,`expire_date`,`description`) values 
(4,30,',29','2021-07-16','this is the first discount.\nplease relax our offers');

/*Table structure for table `home_expense` */

DROP TABLE IF EXISTS `home_expense`;

CREATE TABLE `home_expense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` float NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_expense` */

/*Table structure for table `home_logtime` */

DROP TABLE IF EXISTS `home_logtime`;

CREATE TABLE `home_logtime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `in_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `out_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_logtime` */

insert  into `home_logtime`(`id`,`user_id`,`in_time`,`out_time`) values 
(1,1,'2021-05-09 13:09:44',''),
(2,1,'2021-05-09 13:18:04',''),
(3,1,'2021-05-09 13:19:06',''),
(4,1,'2021-05-09 14:10:41',''),
(5,1,'2021-05-09 14:15:21',''),
(6,1,'2021-05-11 10:01:53',''),
(7,1,'2021-05-11 11:46:19',''),
(8,1,'2021-05-11 12:10:14',''),
(9,4,'2021-05-11 12:14:01',''),
(10,1,'2021-05-11 12:16:44',''),
(11,4,'2021-05-11 12:18:39',''),
(12,1,'2021-05-11 12:29:54',''),
(13,1,'2021-05-11 12:51:48',''),
(14,1,'2021-05-11 12:57:05',''),
(15,4,'2021-05-11 13:09:14',''),
(16,4,'2021-05-11 13:26:42',''),
(17,4,'2021-05-11 13:29:55','2021-05-11 14:19:09'),
(18,1,'2021-05-11 14:19:49','2021-05-11 14:43:20'),
(20,4,'2021-05-11 14:44:28',''),
(21,1,'2021-05-11 17:50:56',''),
(22,4,'2021-05-11 17:57:22',''),
(23,1,'2021-05-12 01:54:27',''),
(24,1,'2021-05-12 04:46:41',''),
(26,4,'2021-05-12 06:15:23','2021-05-12 06:15:58'),
(27,1,'2021-05-12 06:16:17','2021-05-12 06:18:19'),
(28,4,'2021-05-12 06:18:29','2021-05-12 06:23:55'),
(29,1,'2021-05-12 06:24:17','2021-05-12 06:25:16'),
(30,4,'2021-05-12 06:25:38',''),
(31,1,'2021-05-12 06:33:02',''),
(32,4,'2021-05-12 06:34:11',''),
(33,4,'2021-05-12 06:36:55','2021-05-12 07:17:54'),
(34,1,'2021-05-12 07:19:50','2021-05-12 07:19:56');

/*Table structure for table `home_messages` */

DROP TABLE IF EXISTS `home_messages`;

CREATE TABLE `home_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delete_id` int(11) DEFAULT 0 COMMENT 'who is deleted',
  `is_read` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0:unread 1:read',
  PRIMARY KEY (`id`),
  KEY `message_sender_user` (`sender_id`),
  KEY `message_receiver_user` (`receiver_id`),
  CONSTRAINT `message_receiver_user` FOREIGN KEY (`receiver_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `message_sender_user` FOREIGN KEY (`sender_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_messages` */

insert  into `home_messages`(`id`,`sender_id`,`receiver_id`,`course_id`,`text`,`time`,`delete_id`,`is_read`) values 
(15,1,40,29,'Hi','2021-05-20 17:48:03',40,1),
(16,40,1,29,'Ok','2021-05-20 19:35:35',40,1),
(17,2,40,29,'Hi','2021-05-20 19:36:46',0,1),
(18,2,40,29,'there','2021-05-20 19:36:49',0,1),
(19,1,40,29,'OK OK','2021-05-20 19:37:45',40,1),
(20,40,1,29,'Hi','2021-05-20 19:38:41',40,1),
(21,40,1,29,'Hi','2021-05-20 19:38:44',40,1),
(22,40,1,29,'Hi','2021-05-20 19:38:45',40,1),
(23,1,40,29,'Ok as','2021-05-20 19:39:35',40,1),
(24,2,40,29,'Test','2021-05-20 19:40:16',0,1),
(25,40,1,29,'Ok','2021-05-20 19:41:19',40,1),
(26,40,2,29,'hhhhhhhhhhhh','2021-05-20 19:41:46',0,1),
(27,40,1,29,'hhhhhhhhhhhh','2021-05-20 19:41:55',40,1),
(28,40,2,29,'Hi','2021-05-20 19:47:49',0,1),
(29,40,2,29,'OK','2021-05-20 20:02:54',0,1),
(30,40,1,29,'MKL','2021-05-20 20:02:59',40,1),
(31,2,40,29,'HII','2021-05-20 20:04:36',0,1),
(32,1,40,29,'OKK','2021-05-20 20:05:17',40,1),
(33,40,2,29,'Hi','2021-05-20 20:09:28',0,1),
(34,1,40,29,'UI','2021-05-21 06:28:23',40,1),
(35,1,40,29,'OK','2021-05-21 06:30:15',40,1);

/*Table structure for table `home_notifications` */

DROP TABLE IF EXISTS `home_notifications`;

CREATE TABLE `home_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` int(11) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `created_at` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint(4) NOT NULL COMMENT 'type:0  teacher -> student 1: admin -> teacher or student',
  PRIMARY KEY (`id`),
  KEY `home_notifications_sender_id_7936b019_fk_home_user_id` (`sender_id`),
  CONSTRAINT `home_notifications_sender_id_7936b019_fk_home_user_id` FOREIGN KEY (`sender_id`) REFERENCES `home_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_notifications` */

insert  into `home_notifications`(`id`,`user_id`,`title`,`text`,`is_read`,`course_id`,`sender_id`,`created_at`,`type`) values 
(9,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:53',1),
(10,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:53',1),
(11,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:53',1),
(12,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:53',1),
(13,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:53',1),
(14,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:54',1),
(15,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:54',1),
(16,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:54',1),
(17,40,'Why','NDJ',0,999,17,'2021-05-24 09:28:54',1),
(18,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:34',1),
(19,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:36',1),
(20,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:36',1),
(21,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:36',1),
(22,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:37',1),
(23,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:37',1),
(24,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:37',1),
(25,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:37',1),
(26,40,'test ','send noti to all',0,999,1,'2021-05-24 10:41:37',1),
(27,2,'test notification ','Are you there?',0,999,1,'2021-06-10 22:07:50',1),
(28,2,'test notification ','Are you there?',0,999,1,'2021-06-10 22:08:46',1),
(29,2,'test notification ','Are you there?',0,999,1,'2021-06-10 22:10:25',1),
(30,2,'test notification ','Are you there?',0,999,1,'2021-06-10 22:11:21',1),
(31,2,'test notification ','Are you there?',0,999,1,'2021-06-10 22:15:10',1),
(32,2,'test notification','hey hey',0,999,1,'2021-06-10 22:22:13',1),
(33,2,'test notification','hey hey',0,999,1,'2021-06-10 22:25:56',1),
(34,2,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(35,4,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(36,5,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(37,6,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(38,7,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(39,8,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(40,35,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(41,38,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(42,39,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(43,43,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(44,46,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(45,53,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(46,54,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(47,55,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(48,56,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(49,57,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(50,58,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(51,60,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(52,61,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(53,64,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(54,65,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(55,66,'listen to me all student','I am admin',0,999,1,'2021-06-10 22:26:15',1),
(56,40,'test notification','thisi is test',0,999,1,'2021-06-10 22:27:54',1),
(57,1,'test notification','thisi is test',0,999,1,'2021-06-10 22:28:18',1),
(58,40,'hello abraham','there?\n',0,999,1,'2021-06-10 23:23:42',1),
(59,40,'hello abraham','there?\n',0,999,1,'2021-06-11 00:41:00',1),
(60,40,'hello abraham','there?\n',0,999,1,'2021-06-11 00:43:06',1),
(61,1,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(62,9,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(63,10,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(64,11,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(65,12,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(66,13,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(67,14,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(68,15,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(69,17,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(70,18,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(71,19,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(72,20,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(73,23,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(74,36,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(75,40,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(76,45,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(77,47,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(78,48,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(79,49,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(80,50,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(81,51,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(82,52,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(83,59,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(84,62,'test broadcast','hello all teachers!!!',0,999,1,'2021-06-11 00:43:34',1),
(85,40,'test noti','hey',0,999,1,'2021-06-11 01:02:55',1),
(86,40,'test noti','hey',0,999,1,'2021-06-11 01:03:30',1),
(87,1,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(88,9,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(89,10,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(90,11,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(91,12,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(92,13,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(93,14,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(94,15,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(95,17,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(96,18,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(97,19,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(98,20,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(99,23,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(100,36,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(101,40,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(102,45,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(103,47,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(104,48,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(105,49,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(106,50,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(107,51,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(108,52,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(109,59,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(110,62,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:05:00',1),
(111,1,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(112,9,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(113,10,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(114,11,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(115,12,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(116,13,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(117,14,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(118,15,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(119,17,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(120,18,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(121,19,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(122,20,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(123,23,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(124,36,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(125,40,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(126,45,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(127,47,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(128,48,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(129,49,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(130,50,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(131,51,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(132,52,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(133,59,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1),
(134,62,'sdfsd','sdfsdfsdf',0,999,1,'2021-06-11 01:07:44',1);

/*Table structure for table `home_position` */

DROP TABLE IF EXISTS `home_position`;

CREATE TABLE `home_position` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_position` */

insert  into `home_position`(`id`,`name`,`comment`) values 
(1,'Ai Director',''),
(2,'Programmer',''),
(3,'Designer',''),
(4,'Course Publiser',''),
(5,'Photographer',''),
(6,'Deployer',''),
(7,'Dev Ops',''),
(8,'Manager of Finance ','');

/*Table structure for table `home_refund` */

DROP TABLE IF EXISTS `home_refund`;

CREATE TABLE `home_refund` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_status` int(11) DEFAULT 1,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_refund` */

/*Table structure for table `home_spam` */

DROP TABLE IF EXISTS `home_spam`;

CREATE TABLE `home_spam` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_status` int(11) DEFAULT 1,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_spam` */

insert  into `home_spam`(`id`,`teacher_id`,`student_id`,`course_id`,`title`,`content`,`approval_status`,`date_created`) values 
(5,40,2,30,'aaa','Hiee ',1,'2021-05-24 14:17:53'),
(6,40,2,29,'aaaa','aaaa',1,'2021-05-24 14:43:23'),
(7,40,2,29,'','',2,'2021-05-26 17:20:45');

/*Table structure for table `home_task` */

DROP TABLE IF EXISTS `home_task`;

CREATE TABLE `home_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `done_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `priority` tinyint(4) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_task` */

insert  into `home_task`(`id`,`title`,`description`,`start_date`,`end_date`,`done_date`,`priority`,`sender_id`,`receiver_id`,`file_url`,`answer`) values 
(11,'to check','to check it only','2021-05-12','2021-05-13','',1,1,4,'',''),
(12,'new task','new task','2021-05-12','2021-05-13','',1,1,4,'',''),
(13,'New Task','New tasks','2021-05-12','2021-05-13','',1,1,4,'',''),
(14,'new tasks','new tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasksnew tasks','2021-05-12','2021-05-13','',1,1,4,'',''),
(15,'مهمة جديدة مهمة جديدة مهمة جديدة مهمة جديدة مهمة جديدة','مهمة جديدة مهمة جديدة مهمة جديدة مهمة جديدة مهمة جديدة','2021-05-12','2021-05-13','',1,1,4,'','');

/*Table structure for table `home_user` */

DROP TABLE IF EXISTS `home_user`;

CREATE TABLE `home_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `date_joined` datetime(6) DEFAULT NULL,
  `first_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `receive_notifications` tinyint(1) NOT NULL,
  `receive_email` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `home_user_group_id_ab9cda55_fk_auth_group_id` (`group_id`),
  CONSTRAINT `home_user_group_id_ab9cda55_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_user` */

insert  into `home_user`(`id`,`password`,`last_login`,`email`,`is_staff`,`is_active`,`is_superuser`,`date_joined`,`first_name`,`last_name`,`phone_number`,`image`,`group_id`,`receive_notifications`,`receive_email`) values 
(1,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-06-14 18:05:41.819101','admin@gmail.com',1,1,1,'2020-06-15 04:44:35.052800','Parshotam','Kumar ',NULL,'/user_images/349b34ad-d01e-4b37-a225-80bb95b78e66.png',2,1,0),
(2,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-06-20 02:25:35.089365','test@test.com',1,1,0,'2020-06-15 08:21:13.245323','beauty','beautyful','09781804565','/user_images/7275173f-1565-4fca-ab52-1d7b4b86ab2e.jpg',1,1,1),
(4,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-06-11 13:53:07.662398','student@test.com',0,1,0,'2020-06-15 12:13:43.888853','student','test','09781804565','/user_images/03cf48ae-eab3-48f0-b82c-5c40be57eb97.jpg',1,1,0),
(5,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@1.com',0,0,0,'2020-06-18 02:53:19.925709','test','test','+123456789','/user_images/cabe52a5-ef8e-402e-b5ab-e0252e6539a2.png',1,1,0),
(6,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@2.com',0,0,0,'2020-06-18 02:53:19.925709','test','test','+12456789','/user_images/71f4b0da-2a22-422d-9f35-609a6433c57d.png',1,1,0),
(7,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@gmail.com',0,0,0,'2020-06-18 05:54:53.496232','test','test','123456789','/user_images/9b027baa-4760-480f-9881-f22550ba2d51.png',1,1,0),
(8,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@tt.com',0,0,0,'2020-06-18 05:57:01.752994','test','test','123456','/user_images/a4104da7-0ddb-4978-bb56-3c03ba6a7268.png',1,1,0),
(9,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@11.com',0,0,0,'2020-06-18 05:57:01.752994','test','test','123456','/assets/img/man.jpg',3,1,0),
(10,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@3.com',0,0,0,'2020-06-18 09:27:25.940813','testing','test','123456789','/user_images/809a2a33-84ea-47db-846f-2a10e53f8fe7.png',3,1,0),
(11,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'test@4.com',0,0,0,'2020-06-18 09:27:25.940813','test','test','123456789','/user_images/065dc4c9-42bb-450e-91fa-300de55a6715.png',2,1,0),
(12,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'jackson@test.com',0,0,0,'2020-06-18 09:48:00.364321','jackson','v','123456789','/user_images/9a070c69-f885-4314-96aa-2bbb3402de5a.png',3,1,0),
(13,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-06-23 06:42:42.031176','jackey@test.com',0,1,0,'2020-06-23 06:11:59.139771','Jackey','jenis','123456789','/user_images/5d7941a6-ee87-49bc-9b6b-92e64b32882a.jpg',3,1,0),
(14,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-06-23 07:28:02.162262','test123@gmail.com',0,1,0,'2020-06-23 07:14:48.212016','Jackey','John','12345678911','/user_images/ceb9c481-e878-41b7-929d-ebde889dfb89.jpg',3,1,0),
(15,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'jjj@1.com',0,0,0,'2020-06-25 15:49:42.038890','jackey','jjj','none','/assets/img/man.jpg',3,1,0),
(17,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'jjj@3.com',0,0,0,'2020-06-25 15:49:42.038890','jjjj','jjjj','123456789','/assets/img/man.jpg',3,1,0),
(18,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'jjj@5.com',0,0,0,'2020-06-25 15:49:42.038890','jjj','jjj','none','/assets/img/man.jpg',3,1,0),
(19,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'jjj@6.com',0,0,0,'2020-06-25 15:49:42.038890','jjj','jjj','none','/assets/img/man.jpg',2,1,0),
(20,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'Hello@dd.com',0,1,0,'2020-06-30 08:32:53.339761','sdf','sdf','none','/user_images/7c586b74-138a-4018-86c6-9ca1edab4486.png',3,1,0),
(23,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-11-25 09:33:11.163138','john@bool.com',1,1,1,'2020-11-04 15:07:01.049878','john','bool','none','/assets/img/man.jpg',2,1,0),
(35,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-06-15 07:04:30.052927','yarxalo@gmail.com',0,1,0,'2020-11-23 08:45:55.229224','Yaroslav','Xalabuda','none','/assets/img/man.jpg',1,1,0),
(36,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-11-23 10:44:35.035160','booctepdotcom2030@gmail.com',0,1,0,'2020-11-23 09:50:59.713614','Elzubair','Mohammed','none','/user_images/74f15e43-e4e6-483f-94fb-466706008871.png',2,1,0),
(38,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-11-23 10:07:55.718606','mkaaaaani@gmail.com',0,1,0,'2020-11-23 10:07:14.991897','Elzubair ','Mohamed','none','/assets/img/man.jpg',1,1,0),
(39,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2020-11-24 20:42:17.328926','mkaaaani@gmail.com',0,1,0,'2020-11-23 10:46:46.632032','Bandar','Emad','none','/user_images/2a521e24-b318-4932-97bb-7b191e353966.png',1,1,0),
(40,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-06-16 05:08:06.688134','officialcontactservices@gmail.com',0,1,0,'2020-11-23 12:25:29.324248','Khaled','Abraham','none','/user_images/db15f9e7-16c8-465b-9db1-784a78b983ee.png',2,1,1),
(43,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-03-02 13:15:05.004424','alzober1414@gmail.com',0,1,0,'2020-11-29 11:36:44.934900','Elzubair','Mohammed','none','/user_images/3f2c0b2e-bf52-4ae5-a526-d179886c726a.png',1,0,0),
(45,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-01-16 13:44:57.302180','hello@gmail.com',0,1,0,'2021-01-16 05:44:15.261946','hello','love','none','/user_images/3689cb65-0a4d-4ad2-ae14-8a70050f0155.jpg',2,1,0),
(46,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'ebari2017@yandex.com',0,0,0,'2021-01-20 10:38:05.351369','Farabi','Siddique','none','/user_images/869d50c4-3d6a-4653-855d-3be6bbe6ce9e.png',1,1,0),
(47,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'amifarabi@fara.com',0,0,0,'2021-02-14 12:10:08.149865','Gamal','Naser','none','/user_images/172a4f9f-727e-4e07-97c0-d615188d957a.jpg',2,1,0),
(48,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'zz@zz.com',0,0,0,'2021-02-14 12:13:03.573707','Gamal','Naser','none','/user_images/41a8cc9a-c937-4dcf-b971-3ec078a6f0cc.jpg',2,1,0),
(50,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'flsohwgjeguuwqscuo@wqcefp.com',0,0,0,'2021-02-14 12:28:02.085032','Ka','Ka','none','/user_images/2a0b4938-1013-4e4d-b370-6a57290f8426.jpg',2,1,0),
(51,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'yuycsbecbvoicfsgcz@twzhhq.online',0,0,0,'2021-02-14 12:40:09.980534','Ja','Ja','none','/user_images/e9b03d36-567d-461e-bdb4-0b83dfae516b.jpg',2,1,0),
(52,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'ulmzdemfetbxbnlkkp@twzhhq.com',0,0,0,'2021-02-14 12:50:29.337522','A','B','none','/user_images/5c0e0fef-d949-48e3-abc5-67cfa8d188ee.jpg',2,1,0),
(53,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-02-21 03:07:40.555825','okw56095@zwoho.com',0,1,0,'2021-02-21 02:46:45.668445','adsada','sfsfdf','none','/user_images/c86ef74d-773f-468b-a234-ec7a13ea63a2.jpg',1,1,0),
(54,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-02-21 04:13:50.235049','tns45086@cuoly.com',0,1,0,'2021-02-21 03:57:52.065720','sdsdf','sdfdsf','none','/user_images/63c24633-8ed4-4fd2-b702-eece75c815ba.jpg',1,1,0),
(55,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=','2021-02-21 06:18:35.181201','okv26267@zwoho.com',0,1,0,'2021-02-21 05:35:29.181431','fdf','fdsdf','none','/user_images/33366e52-f9df-4919-b69f-3320ce77517f.jpg',1,1,0),
(56,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'wyk90703@cuoly.com',0,1,0,'2021-02-21 07:07:27.676765','fdf','fsdf','none','/user_images/4b04dbc1-9294-49ea-a5e2-701d36aeb7c4.jpeg',1,1,0),
(57,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'tjw64926@cuoly.com',0,1,0,'2021-02-22 12:39:41.360226','bhjbhj','bhhkh','none','/user_images/5a367837-b0bc-4624-aced-abe3870bf7ae.jpeg',1,1,0),
(58,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'lyx74109@cuoly.com',0,1,0,'2021-02-22 12:51:20.708227','ghjg','gjgjg','none','/user_images/5a9c4e71-079f-4b91-a56e-2b22c1522a3a.jpg',1,1,0),
(59,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'wwwwwww@gmail.com',0,0,0,'2021-05-17 18:50:07.150784','test','sfsdf','none','/assets/img/man.jpg',2,1,0),
(60,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'testsese@gmail.com',0,0,0,'2021-05-17 19:16:05.831839','liman','testtest','none','/assets/img/man.jpg',1,1,0),
(61,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'admin@hotmail.com',0,0,0,'2021-05-17 19:17:19.515552','liman','wfwefwef','none','/assets/img/man.jpg',1,1,0),
(62,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'555@gmail.com',0,0,0,'2021-05-17 19:21:22.808380','555','555','none','/assets/img/man.jpg',2,1,0),
(64,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'sdfsdf@gmail.com',0,0,0,'2021-05-18 10:54:42.450477','test','sdfsdf','none','/assets/img/man.jpg',1,1,0),
(65,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'sdsfdf@gmail.com',0,0,0,'2021-05-18 11:05:19.641495','test','sdfsdf','none','/assets/img/man.jpg',1,1,0),
(66,'pbkdf2_sha256$180000$11O3s9QkPPr4$7XiibiCfnny8rlUXK/TcA0d/f+82PpZ9wb2+/9Km0Zg=',NULL,'admin@agdsf.com',0,0,0,'2021-05-18 17:27:07.734215','sdsdf','sdfsdf','none','/assets/img/man.jpg',1,1,0),
(68,'!zMw0AERyobhtOarub7uIvmKFZFe1dc25MpLCJx5S','2021-06-15 00:34:30.899370','ernestpapyan96@gmail.com',0,1,0,NULL,'Ernest','Papyan',NULL,NULL,3,1,0);

/*Table structure for table `home_user_activation` */

DROP TABLE IF EXISTS `home_user_activation`;

CREATE TABLE `home_user_activation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `home_user_activation_user_id_eb286180_fk_home_user_id` (`user_id`),
  CONSTRAINT `home_user_activation_user_id_eb286180_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_user_activation` */

insert  into `home_user_activation`(`id`,`code`,`updated_at`,`created_at`,`user_id`) values 
(1,'0ed5bc6b-9c0c-4bf9-bd9f-b96f57ba3521','2020-06-15 08:22:55.262948','2020-06-15 08:22:55.263008',2),
(3,'6a02ed30-7687-43c2-8929-98e1d5771983','2020-06-15 12:17:30.910789','2020-06-15 12:15:26.767434',4),
(4,'6519f11f-338c-4314-91eb-b2758c81a3a0','2020-06-18 02:58:22.080473','2020-06-18 02:58:22.080473',5),
(5,'a47e6f99-dc04-433c-876c-9a22268b224d','2020-06-18 03:34:35.476094','2020-06-18 03:34:35.476094',6),
(6,'497847f5-b774-4362-a7db-80be33938c53','2020-06-18 05:55:56.402675','2020-06-18 05:55:56.402675',7),
(7,'5e19049e-f111-4fa0-b447-6cbfc4494da9','2020-06-18 05:57:28.160966','2020-06-18 05:57:28.160966',8),
(8,'61e1ddc6-dcbb-47a1-b417-5039d6c8284f','2020-06-18 05:58:28.488558','2020-06-18 05:58:28.488558',9),
(9,'fdeae4b5-8b4f-4c72-a796-9d2aca4d6d3d','2020-06-18 09:29:14.726907','2020-06-18 09:29:14.726907',10),
(10,'38f067c1-6174-42e0-9353-6316a548e978','2020-06-18 09:30:42.403362','2020-06-18 09:30:42.403362',11),
(11,'0bd8bdd1-d55c-4632-acd7-55a00e60f06a','2020-06-18 10:00:24.081245','2020-06-18 10:00:24.081245',12),
(12,'55e09932-79c5-4939-a768-9a0d9b9fdc5f','2020-06-23 06:39:50.316507','2020-06-23 06:39:50.316507',13),
(13,'49e612ce-e895-46d3-a2a0-704dfcdab6eb','2020-06-23 07:25:15.530899','2020-06-23 07:25:15.530899',14),
(14,'564c41ac-8547-44da-9280-6e7916ee6c43','2020-06-25 16:00:49.427755','2020-06-25 16:00:49.427755',15),
(16,'ebf95753-bb0d-40cb-93bd-5944aa2ce786','2020-06-25 16:02:21.208823','2020-06-25 16:02:21.208823',17),
(17,'f92449bc-b79a-4493-a72a-8059011877c0','2020-06-25 16:03:23.786296','2020-06-25 16:03:23.786296',18),
(18,'6a00f9af-f72a-4769-adb0-ac3dcb2a44f2','2020-06-25 16:04:18.375247','2020-06-25 16:04:18.375247',19),
(19,'59c199b4-4a1e-4e09-abe4-6448db58213d','2020-06-30 10:01:52.805918','2020-06-30 10:01:52.805918',20),
(22,'b08823d3-1ac4-4eca-a7ec-15c1f081eff4','2020-11-04 12:07:01.316418','2020-11-04 12:07:01.316418',23),
(34,'eadec692-4857-4faf-88b1-c485296e9cee','2020-11-23 08:46:49.191199','2020-11-23 08:45:55.271230',35),
(35,'b01f5b90-b815-4c97-ac49-dbc88b7e9676','2020-11-23 09:52:03.937733','2020-11-23 09:50:59.757005',36),
(37,'eacebb87-ee7b-4be3-8d02-0b4c541e515e','2020-11-23 10:11:23.582564','2020-11-23 10:07:15.044036',38),
(38,'7ff316b4-1007-424a-ba9c-b47721b4ef01','2020-11-23 10:46:46.674346','2020-11-23 10:46:46.674379',39),
(39,'ec964748-a422-4880-8a20-46ef8a7719d1','2020-11-23 12:26:19.874807','2020-11-23 12:25:29.366042',40),
(42,'170ee7e3-11fc-4cb2-974e-c2589a67ec21','2020-11-29 11:36:45.118970','2020-11-29 11:36:45.119004',43),
(44,'86cc85b8-d9d0-45f6-9117-1915e8631b56','2021-01-16 13:44:15.608944','2021-01-16 13:44:15.608944',45),
(45,'6b4be902-62e8-475d-b1bd-e70dbbbb7b1a','2021-01-20 10:38:06.212931','2021-01-20 10:38:06.212983',46),
(46,'366b0534-0169-4459-9fde-5e58cea3fba2','2021-02-14 12:10:08.757433','2021-02-14 12:10:08.757488',47),
(47,'5a08eba4-db72-4920-b8ab-4f5695594270','2021-02-14 12:13:04.083305','2021-02-14 12:13:04.083432',48),
(49,'bd66042e-afa0-480c-8779-439aadf24f9f','2021-02-14 12:28:02.695259','2021-02-14 12:28:02.695337',50),
(50,'08c98406-8a6e-44bd-b136-41c8bfd33f2f','2021-02-14 12:40:10.491030','2021-02-14 12:40:10.491112',51),
(51,'5cd5d36e-1508-4c5d-aaad-9c43514de992','2021-02-14 12:50:30.586891','2021-02-14 12:50:30.587029',52),
(52,'13061214-c83c-43ab-afaa-d776c941d743','2021-02-21 02:47:39.580106','2021-02-21 02:46:46.219301',53),
(53,'aa9584da-e028-4900-b17f-20df0627e0aa','2021-02-21 03:59:10.452802','2021-02-21 03:57:53.276682',54),
(54,'c3dcf83e-1073-40da-a04d-f07441377e56','2021-02-21 05:36:47.373094','2021-02-21 05:35:29.819279',55),
(55,'6fd6a455-ae1f-407e-8268-e74b464b5347','2021-02-21 07:07:51.163219','2021-02-21 07:07:28.490634',56),
(56,'87a09f7c-6c5e-4408-87be-0bbbb00d1b0d','2021-02-22 12:40:55.415532','2021-02-22 12:39:45.674969',57),
(57,'1ef9264d-3852-452e-aa00-aaf910f8494d','2021-02-22 12:52:08.408516','2021-02-22 12:51:21.526384',58),
(58,'a2ad2730-e5f6-4395-b7e7-2fac5176df16','2021-05-14 16:28:34.403295','2021-05-14 16:28:34.403337',59),
(59,'c71eb122-deb0-47cd-9b7d-ecf3a81b19af','2021-05-17 16:44:00.317969','2021-05-17 16:44:00.318036',60),
(60,'fa9c4168-9a5f-4be6-894b-d97f0f09e32f','2021-05-18 14:14:08.233403','2021-05-18 14:14:08.233448',64),
(61,'932b2d7a-78d9-4f1b-aa12-b27364b975dc','2021-05-18 14:49:05.610331','2021-05-18 14:49:05.610376',65),
(62,'1fbf9e29-401e-4ffc-a83f-6d3dd3a2e2d3','2021-05-19 12:57:40.284124','2021-05-19 12:56:49.564633',66);

/*Table structure for table `home_user_become` */

DROP TABLE IF EXISTS `home_user_become`;

CREATE TABLE `home_user_become` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `sub_catid` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `permit` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_user_become` */

/*Table structure for table `home_user_categories` */

DROP TABLE IF EXISTS `home_user_categories`;

CREATE TABLE `home_user_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `home_user_categories_category_id_fa0b8c7f_fk_teacher_s` (`category_id`),
  KEY `home_user_categories_user_id_1fff0465_fk_home_user_id` (`user_id`),
  CONSTRAINT `home_user_categories_category_id_fa0b8c7f_fk_teacher_s` FOREIGN KEY (`category_id`) REFERENCES `teacher_subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `home_user_categories_user_id_1fff0465_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_user_categories` */

insert  into `home_user_categories`(`id`,`category_id`,`user_id`) values 
(2,11,48),
(4,13,50),
(5,13,51),
(6,13,52);

/*Table structure for table `home_user_profile` */

DROP TABLE IF EXISTS `home_user_profile`;

CREATE TABLE `home_user_profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `bio` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `header_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `subcat_ids` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebook_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `twitter_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notification` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `home_user_profile` */

insert  into `home_user_profile`(`id`,`user_id`,`bio`,`header_img`,`cat_id`,`subcat_ids`,`facebook_url`,`instagram_url`,`twitter_url`,`website_url`,`notification`,`updated_at`,`created_at`) values 
(1,40,'sfasdadasdasdas','/user_images/02af5cda-bd0d-48f2-923a-aa2b3618b869.jpeg',1,'2','','','','','0','2021-06-07 08:31:45.105853','2021-06-02 03:44:07.941802');

/*Table structure for table `paypal_ipn` */

DROP TABLE IF EXISTS `paypal_ipn`;

CREATE TABLE `paypal_ipn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `business` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `charset` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `custom` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notify_version` decimal(64,2) DEFAULT NULL,
  `parent_txn_id` varchar(19) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiver_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `residence_country` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `test_ipn` tinyint(1) NOT NULL,
  `txn_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `txn_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verify_sign` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_country` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_city` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_country_code` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_state` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_street` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_zip` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payer_business_name` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payer_email` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payer_id` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_amount` decimal(64,2) DEFAULT NULL,
  `auth_exp` varchar(28) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_id` varchar(19) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exchange_rate` decimal(64,16) DEFAULT NULL,
  `invoice` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_name` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_number` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mc_currency` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mc_fee` decimal(64,2) DEFAULT NULL,
  `mc_gross` decimal(64,2) DEFAULT NULL,
  `mc_handling` decimal(64,2) DEFAULT NULL,
  `mc_shipping` decimal(64,2) DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_cart_items` int(11) DEFAULT NULL,
  `option_name1` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_name2` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payer_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_gross` decimal(64,2) DEFAULT NULL,
  `payment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pending_reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `protection_eligibility` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `reason_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remaining_settle` decimal(64,2) DEFAULT NULL,
  `settle_amount` decimal(64,2) DEFAULT NULL,
  `settle_currency` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shipping` decimal(64,2) DEFAULT NULL,
  `shipping_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` decimal(64,2) DEFAULT NULL,
  `transaction_entity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auction_buyer_id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auction_closing_date` datetime(6) DEFAULT NULL,
  `auction_multi_item` int(11) DEFAULT NULL,
  `for_auction` decimal(64,2) DEFAULT NULL,
  `amount` decimal(64,2) DEFAULT NULL,
  `amount_per_cycle` decimal(64,2) DEFAULT NULL,
  `initial_payment_amount` decimal(64,2) DEFAULT NULL,
  `next_payment_date` datetime(6) DEFAULT NULL,
  `outstanding_balance` decimal(64,2) DEFAULT NULL,
  `payment_cycle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recurring_payment_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rp_invoice_id` varchar(127) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_created` datetime(6) DEFAULT NULL,
  `amount1` decimal(64,2) DEFAULT NULL,
  `amount2` decimal(64,2) DEFAULT NULL,
  `amount3` decimal(64,2) DEFAULT NULL,
  `mc_amount1` decimal(64,2) DEFAULT NULL,
  `mc_amount2` decimal(64,2) DEFAULT NULL,
  `mc_amount3` decimal(64,2) DEFAULT NULL,
  `password` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reattempt` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recur_times` int(11) DEFAULT NULL,
  `recurring` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `retry_at` datetime(6) DEFAULT NULL,
  `subscr_date` datetime(6) DEFAULT NULL,
  `subscr_effective` datetime(6) DEFAULT NULL,
  `subscr_id` varchar(19) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `case_creation_date` datetime(6) DEFAULT NULL,
  `case_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `case_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receipt_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_code` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `handling_amount` decimal(64,2) DEFAULT NULL,
  `transaction_subject` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ipaddress` char(39) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flag` tinyint(1) NOT NULL,
  `flag_code` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `flag_info` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `query` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `response` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `from_view` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mp_id` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `option_selection1` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `option_selection2` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paypal_ipn_txn_id_8fa22c44` (`txn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `paypal_ipn` */

/*Table structure for table `social_auth_association` */

DROP TABLE IF EXISTS `social_auth_association`;

CREATE TABLE `social_auth_association` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `handle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issued` int(11) NOT NULL,
  `lifetime` int(11) NOT NULL,
  `assoc_type` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_association_server_url_handle_078befa2_uniq` (`server_url`,`handle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `social_auth_association` */

/*Table structure for table `social_auth_code` */

DROP TABLE IF EXISTS `social_auth_code`;

CREATE TABLE `social_auth_code` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(254) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_code_email_code_801b2d02_uniq` (`email`,`code`),
  KEY `social_auth_code_code_a2393167` (`code`),
  KEY `social_auth_code_timestamp_176b341f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `social_auth_code` */

/*Table structure for table `social_auth_nonce` */

DROP TABLE IF EXISTS `social_auth_nonce`;

CREATE TABLE `social_auth_nonce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `server_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` int(11) NOT NULL,
  `salt` varchar(65) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_nonce_server_url_timestamp_salt_f6284463_uniq` (`server_url`,`timestamp`,`salt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `social_auth_nonce` */

/*Table structure for table `social_auth_partial` */

DROP TABLE IF EXISTS `social_auth_partial`;

CREATE TABLE `social_auth_partial` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `next_step` smallint(5) unsigned NOT NULL,
  `backend` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `timestamp` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `social_auth_partial_token_3017fea3` (`token`),
  KEY `social_auth_partial_timestamp_50f2119f` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `social_auth_partial` */

/*Table structure for table `social_auth_usersocialauth` */

DROP TABLE IF EXISTS `social_auth_usersocialauth`;

CREATE TABLE `social_auth_usersocialauth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `extra_data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created` datetime(6) NOT NULL,
  `modified` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_auth_usersocialauth_provider_uid_e6b5e668_uniq` (`provider`,`uid`),
  KEY `social_auth_usersocialauth_user_id_17d28448_fk_home_user_id` (`user_id`),
  KEY `social_auth_usersocialauth_uid_796e51dc` (`uid`),
  CONSTRAINT `social_auth_usersocialauth_user_id_17d28448_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `social_auth_usersocialauth` */

insert  into `social_auth_usersocialauth`(`id`,`provider`,`uid`,`extra_data`,`user_id`,`created`,`modified`) values 
(1,'google-oauth2','yarxalo@gmail.com','{\"auth_time\": 1623740669, \"expires\": 3597, \"token_type\": \"Bearer\", \"access_token\": \"ya29.a0AfH6SMCdGPazLzyOV9jFqIrN2KIPG2UvtfVoGKOT7sYw7ysyXnYLtHKv3dgEzRfFMXNm5ZceQJy3sqCiq6QnaqZS9gRbzhPuG6-WTWm62qMi0Mka6kIKnsUcJXnKOaxQV5qCNXBNSPdyicTYNFCgT1xFcBZ8qg\"}',35,'2021-06-15 00:04:49.212724','2021-06-15 07:04:29.941485'),
(2,'google-oauth2','mikhaildevpay@gmail.com','{\"auth_time\": 1623717234, \"expires\": 3599, \"token_type\": \"Bearer\", \"access_token\": \"ya29.a0AfH6SMB_jHkVdxofCVps5uHZIgJwiAA_U7erzvSgDUcIW_-DBRj87APTrmdVAHq8h0fJPOnED72msKXo6C-1HW8O-VQAWresZpZElSrhYdvH93UpYzPW6OjXsNz_lD_4AIY0pYmI84dL_loA67zaIsUoAZZc\"}',35,'2021-06-15 00:23:09.495962','2021-06-15 00:33:54.292076'),
(3,'google-oauth2','ernestpapyan96@gmail.com','{\"auth_time\": 1623717270, \"expires\": 3599, \"token_type\": \"Bearer\", \"access_token\": \"ya29.a0AfH6SMBr9O5cEjNpqVqW8e1AXbXWkM2ivSQlxEr1DUTSihT5A-EtrfQVkycJEWyVJ8DWu_RIb7NAz_NaaNSSzLL9Dx4HukNIhRG2gU7AxkcDfT7yzSxFZQBDNzNKglLBKeKXWPzRdRdCecvZ81TVmEAmFjpX\"}',68,'2021-06-15 00:26:39.876997','2021-06-15 00:34:30.748895');

/*Table structure for table `student_course_comments` */

DROP TABLE IF EXISTS `student_course_comments`;

CREATE TABLE `student_course_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `reply` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime(6) NOT NULL,
  `date_updated` datetime(6) NOT NULL,
  `course_id_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `approved_by_teacher` tinyint(1) NOT NULL COMMENT '0: not added to profile, 1: added to profile',
  PRIMARY KEY (`id`),
  KEY `student_course_comme_course_id_id_484b0f1c_fk_teacher_c` (`course_id_id`),
  KEY `student_course_comments_user_id_ed721845_fk_home_user_id` (`user_id`),
  CONSTRAINT `student_course_comme_course_id_id_484b0f1c_fk_teacher_c` FOREIGN KEY (`course_id_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_course_comments_user_id_ed721845_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_course_comments` */

insert  into `student_course_comments`(`id`,`comment`,`rating`,`reply`,`date`,`date_updated`,`course_id_id`,`user_id`,`approved_by_teacher`) values 
(1,'user comment 1',4.5,'','2021-06-14 09:29:30.561156','2021-06-14 09:29:30.561156',29,2,0),
(4,'user comment 2',4.7,'','2021-06-14 09:29:26.658932','2021-06-14 09:29:26.658932',29,4,0),
(5,'user comment 3',4.8,'','2021-06-14 09:29:22.699201','2021-06-14 09:29:22.699201',29,5,0),
(8,'user comment 4',4.5,'','2021-06-14 09:29:18.655050','2021-06-14 09:29:18.655050',29,6,0),
(12,'user comment 5',4.5,'','2021-06-02 21:42:25.000000','2021-06-02 21:42:30.000000',30,5,1),
(13,'user comment 6',4.8,NULL,'2021-06-14 12:18:58.000000','2021-06-14 12:19:08.000000',29,7,1);

/*Table structure for table `student_payment` */

DROP TABLE IF EXISTS `student_payment`;

CREATE TABLE `student_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `card_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cvv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `student_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `student_payment_student_id_50961a5c_fk_home_user_id` (`student_id`),
  CONSTRAINT `student_payment_student_id_50961a5c_fk_home_user_id` FOREIGN KEY (`student_id`) REFERENCES `home_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_payment` */

insert  into `student_payment`(`id`,`card_no`,`cvv`,`month`,`year`,`student_id`) values 
(1,'4520171666197100','333',12,2021,43);

/*Table structure for table `student_student_cart_courses` */

DROP TABLE IF EXISTS `student_student_cart_courses`;

CREATE TABLE `student_student_cart_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id_id` int(11) DEFAULT NULL,
  `student_id_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_student_cart_course_id_id_529cc64c_fk_teacher_c` (`course_id_id`),
  KEY `student_student_cart_student_id_id_406bf019_fk_home_user` (`student_id_id`),
  CONSTRAINT `student_student_cart_course_id_id_529cc64c_fk_teacher_c` FOREIGN KEY (`course_id_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_student_cart_student_id_id_406bf019_fk_home_user` FOREIGN KEY (`student_id_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_cart_courses` */

insert  into `student_student_cart_courses`(`id`,`course_id_id`,`student_id_id`) values 
(96,29,40);

/*Table structure for table `student_student_certificate` */

DROP TABLE IF EXISTS `student_student_certificate`;

CREATE TABLE `student_student_certificate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_certificate` */

insert  into `student_student_certificate`(`id`,`student_id`,`course_id`,`url`,`no`) values 
(2,2,29,'/certificates/beauty_beautyful_35360547.pdf','96388838');

/*Table structure for table `student_student_favourite_courses` */

DROP TABLE IF EXISTS `student_student_favourite_courses`;

CREATE TABLE `student_student_favourite_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id_id` int(11) DEFAULT NULL,
  `student_id_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_student_favo_course_id_id_6184b43a_fk_teacher_c` (`course_id_id`),
  KEY `student_student_favo_student_id_id_50cb2362_fk_home_user` (`student_id_id`),
  CONSTRAINT `student_student_favo_course_id_id_6184b43a_fk_teacher_c` FOREIGN KEY (`course_id_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_student_favo_student_id_id_50cb2362_fk_home_user` FOREIGN KEY (`student_id_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_favourite_courses` */

insert  into `student_student_favourite_courses`(`id`,`course_id_id`,`student_id_id`) values 
(138,29,40),
(139,30,40),
(140,29,2);

/*Table structure for table `student_student_performance` */

DROP TABLE IF EXISTS `student_student_performance`;

CREATE TABLE `student_student_performance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `total_cnt` int(11) DEFAULT NULL,
  `answer_cnt` int(11) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_student_performance_user_id_f15a4565_fk_home_user_id` (`user_id`),
  CONSTRAINT `student_student_performance_user_id_f15a4565_fk_home_user_id` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_performance` */

/*Table structure for table `student_student_rating_courses` */

DROP TABLE IF EXISTS `student_student_rating_courses`;

CREATE TABLE `student_student_rating_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` double DEFAULT NULL,
  `course_id_id` int(11) DEFAULT NULL,
  `student_id_id` int(11) DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_student_rati_course_id_id_a636893f_fk_teacher_c` (`course_id_id`),
  KEY `student_student_rati_student_id_id_d6eb3c4c_fk_home_user` (`student_id_id`),
  CONSTRAINT `student_student_rati_course_id_id_a636893f_fk_teacher_c` FOREIGN KEY (`course_id_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_student_rati_student_id_id_d6eb3c4c_fk_home_user` FOREIGN KEY (`student_id_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_rating_courses` */

insert  into `student_student_rating_courses`(`id`,`rating`,`course_id_id`,`student_id_id`,`comment`) values 
(1,3,29,2,'Not Good course');

/*Table structure for table `student_student_register_courses` */

DROP TABLE IF EXISTS `student_student_register_courses`;

CREATE TABLE `student_student_register_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id_id` int(11) DEFAULT NULL,
  `student_id_id` int(11) DEFAULT NULL,
  `last_completed_section_id` int(11) NOT NULL,
  `date_created` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `withdraw` tinyint(3) NOT NULL DEFAULT 0 COMMENT '0: none 1: hold 2: ready 3: done',
  `approve_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT 'time that admin approve this withdraw',
  PRIMARY KEY (`id`),
  KEY `student_student_regi_course_id_id_890510c7_fk_teacher_c` (`course_id_id`),
  KEY `student_student_regi_student_id_id_dcba9c6f_fk_home_user` (`student_id_id`),
  CONSTRAINT `student_student_regi_course_id_id_890510c7_fk_teacher_c` FOREIGN KEY (`course_id_id`) REFERENCES `teacher_courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `student_student_regi_student_id_id_dcba9c6f_fk_home_user` FOREIGN KEY (`student_id_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `student_student_register_courses` */

insert  into `student_student_register_courses`(`id`,`course_id_id`,`student_id_id`,`last_completed_section_id`,`date_created`,`withdraw`,`approve_date`) values 
(1,29,1,0,'2021-05-10 20:52:58',2,''),
(8,29,2,0,'2021-04-20 12:20:10',3,'2021-06-07 22:17:02'),
(9,30,2,0,'2021-04-20 12:20:10',3,'2021-06-07 22:17:02');

/*Table structure for table `teacher_answers` */

DROP TABLE IF EXISTS `teacher_answers`;

CREATE TABLE `teacher_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `answer` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `result` int(11) NOT NULL,
  `pending` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `course_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_answers_course_id_b393bd3c_fk_teacher_courses_id` (`course_id`),
  KEY `teacher_answers_question_id_b202c822_fk_teacher_questions_id` (`question_id`),
  CONSTRAINT `teacher_answers_course_id_b393bd3c_fk_teacher_courses_id` FOREIGN KEY (`course_id`) REFERENCES `teacher_courses` (`id`),
  CONSTRAINT `teacher_answers_question_id_b202c822_fk_teacher_questions_id` FOREIGN KEY (`question_id`) REFERENCES `teacher_questions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_answers` */

/*Table structure for table `teacher_categories` */

DROP TABLE IF EXISTS `teacher_categories`;

CREATE TABLE `teacher_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_categories` */

insert  into `teacher_categories`(`id`,`name`,`image`,`updated_at`,`created_at`) values 
(1,'Web Development','assets/img/categories/single_categories/p-languages.svg','2020-06-15 04:48:03.233279','2020-06-15 04:45:36.220035'),
(3,'Design','assets/img/categories/single_categories/design.svg','2020-06-15 04:48:28.184719','2020-06-15 04:48:28.184776'),
(4,'Drama & Cinema','assets/img/categories/single_categories/drama.svg','2020-06-15 04:48:37.472006','2020-06-15 04:48:37.472109'),
(5,'Mathmatics','assets/img/categories/single_categories/math.svg','2020-06-15 04:48:51.188720','2020-06-15 04:48:51.188797'),
(6,'Aviation','assets/img/categories/single_categories/aviation.svg','2020-06-15 04:49:31.913913','2020-06-15 04:49:31.913959'),
(7,'Engineering','assets/img/categories/single_categories/Engineer.svg','2020-06-15 04:49:42.566084','2020-06-15 04:49:42.566132'),
(8,'Art','assets/img/categories/single_categories/art.svg','2020-06-15 04:50:02.291568','2020-06-15 04:50:02.291674'),
(9,'Food','assets/img/categories/single_categories/food.svg\r\n','2020-06-15 04:50:19.272292','2020-06-15 04:50:19.272474'),
(10,'softwares Programming','assets/img/categories/single_categories/softwares.svg\r\n','2020-06-15 04:50:39.513182','2020-06-15 04:50:39.513246'),
(11,'skills','assets/img/categories/single_categories/skills.svg\r\n','2020-06-15 04:51:18.457590','2020-06-15 04:51:18.457636'),
(12,'sewiing','assets/img/categories/single_categories/sewiing.svg\r\n','2020-06-15 04:51:33.474797','2020-06-15 04:51:33.474892'),
(13,'Self Development','assets/img/categories/single_categories/self-dev.svg\r\n','2020-06-15 04:51:55.006838','2020-06-15 04:51:55.006895'),
(14,'Information Technology','assets/img/categories/single_categories/robot.svg\r\n','2020-06-15 04:52:12.510722','2020-06-15 04:52:12.510774');

/*Table structure for table `teacher_courses` */

DROP TABLE IF EXISTS `teacher_courses`;

CREATE TABLE `teacher_courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requirements` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gains` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scat_id` int(11) DEFAULT NULL,
  `subcat_id` int(11) DEFAULT 0,
  `spam` int(11) DEFAULT 0,
  `price` double NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `students_admitted` int(11) NOT NULL,
  `students_passed` int(11) NOT NULL,
  `header_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `course_level` tinyint(4) NOT NULL DEFAULT 1 COMMENT '0: all levels, 1: beginer, 2: immediate, 3: advanced',
  `dripping` tinyint(4) DEFAULT NULL COMMENT '0: normal 1: dripping',
  `pending` int(11) NOT NULL,
  `approval_status` tinyint(4) NOT NULL COMMENT '0: none, 1: send to admin 2: approved',
  PRIMARY KEY (`id`),
  KEY `course_user` (`user_id`),
  CONSTRAINT `course_user` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_courses` */

insert  into `teacher_courses`(`id`,`name`,`description`,`requirements`,`gains`,`scat_id`,`subcat_id`,`spam`,`price`,`user_id`,`user_name`,`type`,`students_admitted`,`students_passed`,`header_img`,`cover_img`,`course_url`,`created_at`,`course_level`,`dripping`,`pending`,`approval_status`) values 
(29,'happy course 1','<p>qwesdfsdfsdfsdfsdfsdfdsfsdfsdfsdfsdfsdgsdfsdgsdfsdf</p><p>qwesdfsdfsdfsdfsdfsdfdsfsdfsdfsdfsdfsdgsdfsdfsdfsdfsdfsdgsdfsdf</p>','<p>qwe</p><p>sdfgsdfsdsvsdvs</p>','<p>qwe</p><p><br></p>',1,1,0,1000,40,'Khaled Abraham',0,0,0,'/user_images/60dece45-923c-439f-b69e-e3be15a24267.jpg','/user_images/8633d7d8-c081-4267-84a1-ff732c116a5b.jpg','happy_course_1','2021-06-20 02:45:18.606428',1,0,0,2),
(30,'happy course 2','<p>sdf</p>','<p>sdf</p>','<p>sdf</p>',1,1,0,1000,40,'Khaled Saleh',0,0,0,'/user_images/bd4bd246-b639-4399-9185-a5d1a138ffbe.jpg','/user_images/bd4bd246-b639-4399-9185-a5d1a138ffbe.jpg','happy_course_2','2021-05-09 11:12:21.410274',1,0,4,2),
(34,'happy course 4','test\ntest\ntest\n','dsfsdf\n','sdfsdf\n',1,0,0,0,40,'Khaled Abraham',0,0,0,'','','','2021-06-13 16:09:06.840896',0,0,1,0),
(35,'test course 1','<p>this is my test</p><p><br></p>','<p>hello everybody</p><p><br></p>','<p>this i smy work...</p><p><br></p>',1,0,0,0,40,'Khaled Abraham',0,0,0,'/user_images/bb3c0e97-beaf-4bf4-80b6-18c18979fb45.jpg','/user_images/f03cd784-df30-4a02-83e7-215382ecd3e7.jpg','test_course_1','2021-06-14 13:52:44.090216',0,0,0,0);

/*Table structure for table `teacher_questions` */

DROP TABLE IF EXISTS `teacher_questions`;

CREATE TABLE `teacher_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section_id` int(11) DEFAULT NULL,
  `title` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `answer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_questions` */

insert  into `teacher_questions`(`id`,`section_id`,`title`,`content`,`answer`,`nos`) values 
(1,4,'HTML?','Hyper Text Markup Language,','true,',1),
(2,7,'Okay?','ok,','true,',1),
(3,11,'okay?','ok,','true,',1),
(4,15,'Okay?','Ok,','true,',1),
(5,32,'Full Meaning CCNA?','Cisco Certified Network Associate,','true,',1),
(6,35,'Okay?','ok,','true,',1),
(7,39,'Okay?','ok,','true,',1),
(8,43,'Cool?','cool,','true,',1),
(9,46,'Who was Batman\'s butler?','Alfred,Robin,Jhon,','true,false,false,',1),
(10,49,'Konta?','Sotto,ff,ffgdfgdf,hgh,','true,false,false,false,',1),
(11,49,'Eta?','eta vai,dgdg,dfgdgfd,dgdfgfdg,','true,false,false,false,',2),
(12,49,'tarpor?','hmm,fgdfgfdg,dgdfgdfg,dgdfgdfg,','true,false,false,false,',3),
(13,52,'Okay?','Ok,fsdf,ffsdfds,ffdsfffff,','true,false,false,false,',1),
(14,52,'Tare nare?','yes,dfds,hhh,hgfdsrfe,','true,false,false,false,',2),
(15,52,'alright?','dfsdfsd,yay,jks,qqq,','false,true,false,false,',3),
(16,53,'Hmm?','yes,ewe,kjhf,rrwe,','true,false,false,false,',4),
(17,53,'Will you?','kkg,ggdd,hmm,uio,','false,false,true,false,',5),
(18,55,'dfdfd','dfdd,','true,',1),
(27,67,'test1','sdf,sdf,sdf,sdf,','false,false,false,true,',1),
(30,67,'test2','asdfsdf,sadfasdfas,fasdfasdf,sadfasdf,','false,false,false,true,',2),
(31,67,'test3','scsdcs,sgfdsfsfe,fwefwef,csdcsdc,','false,false,false,true,',3),
(32,67,'test4','gfdfg,fscdsc,vgfdgdf,bdfbdfv,','false,false,false,true,',4),
(33,67,'test5','asd,cascx,asdsd,dqwdqwd,','false,true,false,false,',5),
(34,68,'test1','sdfsdf,sdfsdf,sdfsdf,sdfsdf,','false,false,false,true,',1),
(35,68,'test2','sdfsdf,sdgsdfs,sdfsdf,sdwdwe,','false,false,true,false,',2),
(36,68,'test3','xcvsddsf,vdsf,vsdvsdfs,sassad,','false,true,false,false,',3),
(37,68,'test4','qwwef,gfdgf,fdgdf,sdfsdf,','true,false,false,false,',4),
(38,68,'test5','sdgsdf,sdfsdf,sdfs,asdasd,','false,false,true,false,',5),
(39,79,'question 1','sdfsdfsdf,sdf,sdf,sdf,','false,false,false,true,',1),
(40,79,'question 2','sdfsdf,sdfsd,sdfsdf,sdfsdf,','false,false,true,false,',2),
(41,79,'question 3','sgdfsdf,sdf,sdf,sdfsdf,','true,false,false,false,',3),
(42,79,'question 4','sdfsdf,sdgdsf,sdgsfd,sdgsdf,','false,false,true,false,',4),
(43,79,'question 5','gdfsf,dfgdfg,dfg,dfhdfgd,','true,false,false,false,',5),
(44,81,'question 1','sdfsdf,sdfsdf,sdfsdf,sdfsdf,','false,false,false,true,',1),
(45,81,'question 2','sgdf,dfsfsd,gfgfd,dfgdfg,','true,false,false,false,',2),
(46,81,'question 3','gdsfd,sdfs,asdasd,asdasd,','false,false,false,true,',3),
(47,81,'question 4','dfgdfg,sdf,sdgdfg,dfgdfg,','false,true,false,false,',4),
(48,81,'question 5','dfgdfg,dfg,dfg,dfg,','true,false,false,false,',5),
(49,85,'question 1','sdfsdf,sdfsdf,sdfsd,sdf,','false,false,false,true,',1),
(50,85,'question 2','sdfsdf,sdfsdf,sdfsdf,sdfsdf,','true,false,false,false,',2),
(51,85,'question 3','sdfsgd,sdfsdf,sdf,gfdgdfg,','true,false,false,false,',3),
(52,85,'question 4','sgdsfs,sdgsdf,sdfsdf,vsdvf,','true,false,false,false,',4),
(53,85,'question 5','sdfsf,sdfsd,sdf,gdfdgfg,','false,true,false,false,',5),
(54,88,'question 1','sds,sdf,sdf,sdf,','false,false,false,true,',1),
(55,88,'question 2','sdsd,ssd,sdf,sdf,','false,false,true,false,',2),
(56,88,'question 3','sdf,sdf,sdf,sdd,','false,true,false,false,',3),
(57,88,'question 4','sdf,sdf,sdf,sdf,','false,false,false,true,',4),
(58,88,'question 5','sdf,sdf,sdf,sdf,','false,false,true,false,',5),
(59,92,'A1','sdf,sdf,sdf,sdf,','false,false,false,true,',1),
(60,92,'A2','sd,sd,sd,sd,','false,false,true,false,',2),
(61,92,'A3','sdf,sdf,sdf,sdf,','false,false,false,true,',3),
(62,92,'A4','sdf,sdf,sdf,sdf,','false,false,true,false,',4),
(63,92,'A5','sdf,sdf,sdf,sdf,','false,false,false,true,',5),
(64,96,'B1','sdf,sdf,sdf,sdf,','false,false,false,true,',1),
(65,96,'B2','sdf,sdf,sdf,sdf,','false,false,true,false,',2),
(66,96,'B3','sdf,sdf,sdf,sdf,','false,false,false,true,',3),
(67,96,'B4','sdf,sdf,sdf,sdg,','false,true,false,false,',4),
(68,96,'B5','sdf,sdf,sdf,sdf,','false,false,false,true,',5),
(69,100,'C1','sdf,sdf,sdf,sdf,','false,false,true,false,',1),
(70,100,'C2','sdf,sdf,sdf,sdf,','false,false,true,false,',2),
(71,100,'C3','sd,sdf,sdf,sdf,','false,false,false,true,',3),
(72,100,'C4','sdf,sdf,sdf,sdf,','false,false,true,false,',4),
(73,100,'C5','sdf,sdf,sdf,sdf,','true,false,false,false,',5);

/*Table structure for table `teacher_questions1` */

DROP TABLE IF EXISTS `teacher_questions1`;

CREATE TABLE `teacher_questions1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `aw_1_type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_1_result` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_1_data` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aw_2_type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_2_result` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_2_data` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aw_3_type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_3_result` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_3_data` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aw_4_type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_4_result` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `aw_4_data` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_questions1` */

/*Table structure for table `teacher_sections` */

DROP TABLE IF EXISTS `teacher_sections`;

CREATE TABLE `teacher_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `type` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nos` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_sections` */

insert  into `teacher_sections`(`id`,`name`,`course_id`,`type`,`nos`) values 
(89,'sec1',29,'video','1'),
(90,'sec2',29,'video','2'),
(91,'sec3',29,'video','3'),
(92,'quiz section',29,'question','1'),
(93,'sec11',30,'video','1'),
(94,'sec12',30,'video','2'),
(95,'sec13',30,'video','3'),
(96,'quiz section',30,'question','1'),
(97,'sec21',31,'video','1'),
(98,'sec22',31,'video','2'),
(99,'sec23',31,'video','3'),
(100,'quiz section',31,'question','1'),
(101,'sec1',29,'video','4'),
(102,'sec1',29,'video','5'),
(103,'sec1',29,'video','6'),
(104,'sec1',29,'video','7'),
(105,'sec1',29,'video','8');

/*Table structure for table `teacher_student_mark` */

DROP TABLE IF EXISTS `teacher_student_mark`;

CREATE TABLE `teacher_student_mark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  `mark` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_student_mark` */

insert  into `teacher_student_mark`(`id`,`course_id`,`student_id`,`mark`) values 
(1,1,43,1),
(2,11,43,1),
(3,13,43,0.6),
(4,7,43,1);

/*Table structure for table `teacher_subcategories` */

DROP TABLE IF EXISTS `teacher_subcategories`;

CREATE TABLE `teacher_subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `categories_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacher_subcategorie_categories_id_36e8aa60_fk_teacher_c` (`categories_id`),
  CONSTRAINT `teacher_subcategorie_categories_id_36e8aa60_fk_teacher_c` FOREIGN KEY (`categories_id`) REFERENCES `teacher_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_subcategories` */

insert  into `teacher_subcategories`(`id`,`name`,`image`,`updated_at`,`created_at`,`categories_id`) values 
(1,'HTML Language','assets/img/categories/p-language.svg','2020-06-15 04:53:34.033123','2020-06-15 04:53:34.033196',1),
(2,'Python Langauage','assets/img/categories/p-language.svg','2020-06-15 04:54:01.954997','2020-06-15 04:54:01.955099',1),
(4,'Figma to HTML','assets/img/categories/p-language.svg','2020-06-15 06:04:24.133294','2020-06-15 06:04:24.133341',3),
(5,'Bootstrap','assets/img/categories/p-language.svg','2020-06-15 06:05:07.612448','2020-06-15 06:05:07.612495',3),
(6,'Drama','assets/img/categories/p-language.svg','2020-06-15 06:05:32.872232','2020-06-15 06:05:32.872287',4),
(7,'Cinema','assets/img/categories/p-language.svg','2020-06-15 06:05:48.467563','2020-06-15 06:05:48.467613',4),
(8,'Film Theory','assets/img/categories/p-language.svg','2020-06-15 06:06:07.292197','2020-06-15 06:06:07.292249',4),
(9,'Algebra','assets/img/categories/p-language.svg','2020-06-15 06:06:29.103482','2020-06-15 06:06:29.103566',5),
(10,'Geometry','assets/img/categories/p-language.svg','2020-06-15 06:06:42.985701','2020-06-15 06:06:42.985749',5),
(11,'Flight','assets/img/categories/p-language.svg','2020-06-15 06:06:54.468098','2020-06-15 06:06:54.468189',6),
(12,'Parachute','assets/img/categories/p-language.svg','2020-06-15 06:07:05.942984','2020-06-15 06:07:05.943037',6),
(13,'Helicopter','assets/img/categories/p-language.svg','2020-06-15 06:07:17.965425','2020-06-15 06:07:17.965484',6),
(14,'Machine','assets/img/categories/p-language.svg','2020-06-15 06:07:35.279371','2020-06-15 06:07:35.279450',7),
(15,'Force','assets/img/categories/p-language.svg','2020-06-15 06:07:49.035951','2020-06-15 06:07:49.036038',7),
(16,'Noble','assets/img/categories/p-language.svg','2020-06-15 06:08:05.320043','2020-06-15 06:08:05.320134',8),
(17,'Music','assets/img/categories/p-language.svg','2020-06-15 06:08:16.924817','2020-06-15 06:08:16.924915',8),
(18,'Dance','assets/img/categories/p-language.svg','2020-06-15 06:08:32.277649','2020-06-15 06:08:32.277705',8),
(19,'Cooking','assets/img/categories/p-language.svg','2020-06-15 06:08:42.709775','2020-06-15 06:08:42.709996',9),
(20,'Noodle','assets/img/categories/p-language.svg','2020-06-15 06:08:53.389245','2020-06-15 06:08:53.389363',9),
(21,'C++','assets/img/categories/p-language.svg','2020-06-15 06:09:04.308025','2020-06-15 06:09:04.308080',10),
(22,'Java Developing','assets/img/categories/p-language.svg','2020-06-15 06:09:13.934983','2020-06-15 06:09:13.935090',10),
(23,'Bitcoin','assets/img/categories/p-language.svg','2020-06-15 06:09:24.220757','2020-06-15 06:09:24.220807',11),
(24,'Data mining','assets/img/categories/p-language.svg','2020-06-15 06:09:34.875003','2020-06-15 06:09:34.875052',11),
(25,'SEO','assets/img/categories/p-language.svg','2020-06-15 06:09:44.929468','2020-06-15 06:09:44.929631',11),
(26,'Sewing_machine','assets/img/Categories/p-language.svg','2020-06-15 06:09:55.590051','2020-06-15 06:09:55.590096',12),
(27,'Good to know sewing','assets/img/Categories/p-language.svg','2020-06-15 06:10:14.454531','2020-06-15 06:10:14.454581',12),
(28,'Architecturing','assets/img/Categories/p-language.svg','2020-06-15 06:10:31.983094','2020-06-15 06:10:31.983196',13),
(29,'DB Structure','assets/img/Categories/p-language.svg','2020-06-15 06:10:46.728059','2020-06-15 06:10:46.728115',13),
(30,'Data collecting','assets/img/Categories/p-language.svg','2020-06-15 06:11:02.110872','2020-06-15 06:11:02.110934',14),
(31,'Blockchain','assets/img/Categories/p-language.svg','2020-06-15 06:11:16.458510','2020-06-15 06:11:16.458558',14),
(32,'Maintence','assets/img/Categories/p-language.svg','2020-06-15 06:11:28.909687','2020-06-15 06:11:28.909750',14),
(33,'Testing','assets/img/Categories/p-language.svg','2020-06-15 06:11:52.952747','2020-06-15 06:11:52.952828',10);

/*Table structure for table `teacher_testvideo` */

DROP TABLE IF EXISTS `teacher_testvideo`;

CREATE TABLE `teacher_testvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `review` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `testvideo_user` (`user_id`),
  CONSTRAINT `testvideo_user` FOREIGN KEY (`user_id`) REFERENCES `home_user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_testvideo` */

insert  into `teacher_testvideo`(`id`,`name`,`url`,`user_id`,`review`) values 
(43,'kkk.mp4','/uploads/courses/videos/4bfeaeae-0e91-4a4f-8bfb-7c85e5ff1dbb.mp4',40,0);

/*Table structure for table `teacher_todo` */

DROP TABLE IF EXISTS `teacher_todo`;

CREATE TABLE `teacher_todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_todo` */

/*Table structure for table `teacher_transactions` */

DROP TABLE IF EXISTS `teacher_transactions`;

CREATE TABLE `teacher_transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fees` double NOT NULL,
  `revenue` double NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_transactions` */

/*Table structure for table `teacher_videouploads` */

DROP TABLE IF EXISTS `teacher_videouploads`;

CREATE TABLE `teacher_videouploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `section_id` int(11) DEFAULT NULL,
  `url` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `promo` int(11) NOT NULL,
  `duration` int(11) DEFAULT NULL,
  `lock` int(3) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `Video_section` (`section_id`),
  CONSTRAINT `Video_section` FOREIGN KEY (`section_id`) REFERENCES `teacher_sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `teacher_videouploads` */

insert  into `teacher_videouploads`(`id`,`name`,`section_id`,`url`,`promo`,`duration`,`lock`) values 
(174,'kkk.mp4',89,'/uploads/courses/videos/135402da-02d5-45ec-9b86-a3031cc53efc.mp4',0,6,1),
(175,'kkk.mp4',89,'/uploads/courses/videos/62cfe59e-17f2-496e-864f-865417ac75b3.mp4',0,6,0),
(176,'kkk.mp4',89,'/uploads/courses/videos/192ffdd7-20f1-4e44-b918-72de82bdf49a.mp4',0,6,1),
(177,'kkk.mp4',89,'/uploads/courses/videos/f0d8463c-3b8c-4b70-966c-13649110420b.mp4',0,6,1),
(178,'kkk.mp4',89,'/uploads/courses/videos/ecc7c999-33f5-490d-8bf8-d3d49625ea29.mp4',0,6,0),
(179,'kkk.mp4',90,'/uploads/courses/videos/253e640c-923a-43d3-8d59-709bc54047dd.mp4',0,6,1),
(180,'kkk.mp4',90,'/uploads/courses/videos/36c83e95-2c57-4fe0-b6cd-7b5eb669d70a.mp4',1,6,0),
(181,'kkk.mp4',90,'/uploads/courses/videos/dffd8808-03e0-4969-9a17-1a2f1ad8c641.mp4',0,6,0),
(182,'kkk.mp4',91,'/uploads/courses/videos/7ba794e2-cb7a-4897-a946-bc35673802ae.mp4',0,6,0),
(183,'kkk.mp4',91,'/uploads/courses/videos/41a20744-f80d-433a-989f-8ceda863af44.mp4',0,6,1),
(184,'kkk.mp4',93,'/uploads/courses/videos/73b6a8ff-d5e0-4c27-86d6-b1d826cd2ee5.mp4',0,6,0),
(185,'kkk.mp4',93,'/uploads/courses/videos/f0e9c8c6-bf95-492c-bc59-03a8f8e0c7c0.mp4',0,6,1),
(186,'kkk.mp4',93,'/uploads/courses/videos/6ff01687-527f-4ffd-bc18-0b9bbb52058a.mp4',0,6,1),
(187,'kkk.mp4',93,'/uploads/courses/videos/7a79dc35-32c5-4dc0-b9d8-d48f31aeb4f1.mp4',0,6,0),
(188,'kkk.mp4',93,'/uploads/courses/videos/5266f636-a5a8-48e3-92bc-0df3ab9c01b8.mp4',0,6,1),
(189,'kkk.mp4',93,'/uploads/courses/videos/f52ace21-ac2b-43e7-ae58-a2e223aa9980.mp4',0,6,1),
(190,'kkk.mp4',93,'/uploads/courses/videos/6d5c0c50-3924-48c7-a25f-bfb1994462f2.mp4',0,6,0),
(191,'kkk.mp4',93,'/uploads/courses/videos/61e32626-977a-4d49-b821-8440234a1285.mp4',0,6,1),
(192,'kkk.mp4',94,'/uploads/courses/videos/1cc5b710-6b83-43e7-97f4-443b859a19db.mp4',0,6,0),
(193,'kkk.mp4',95,'/uploads/courses/videos/6f485a6c-b9f1-437f-a58a-4d6f377ca2e8.mp4',0,6,0),
(194,'kkk.mp4',97,'/uploads/courses/videos/c64fad66-1cff-4112-bc92-fc3e80b6e6d2.mp4',0,6,0),
(195,'kkk.mp4',97,'/uploads/courses/videos/09672bf3-48a3-49f7-855d-4e1aea9d21f3.mp4',0,6,1),
(196,'kkk.mp4',97,'/uploads/courses/videos/0e523221-a8be-4486-ba1e-d63a2ae60b55.mp4',0,6,0),
(197,'kkk.mp4',97,'/uploads/courses/videos/82df3e97-0a41-4420-8e34-b456993d04c3.mp4',0,6,1),
(198,'kkk.mp4',97,'/uploads/courses/videos/c26a791a-94a1-4d2e-9d29-a085c9ccc95c.mp4',0,6,1),
(199,'kkk.mp4',97,'/uploads/courses/videos/420a7255-e4ec-4a0c-89c9-48f44c7c4ff2.mp4',0,6,1),
(200,'kkk.mp4',98,'/uploads/courses/videos/538fe0a4-905d-4095-a49c-3b277a2b3062.mp4',0,6,0),
(201,'kkk.mp4',98,'/uploads/courses/videos/08ca0775-20d5-4de5-a058-d96d3444125b.mp4',0,6,1),
(202,'kkk.mp4',99,'/uploads/courses/videos/1299c6c0-268c-4e23-98af-340ee5c635e8.mp4',0,6,0),
(203,'kkk.mp4',99,'/uploads/courses/videos/253739aa-2f0e-455f-a1af-ec11c98b06b9.mp4',0,6,0);

/*Table structure for table `video_cache` */

DROP TABLE IF EXISTS `video_cache`;

CREATE TABLE `video_cache` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `cache_str` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `video_cache` */

insert  into `video_cache`(`id`,`key`,`cache_str`) values 
(1,'2-29','{\"checkList\":[1,1,1,1,1,1,1,1,1,1],\"cur_video\":6,\"question_no\":5}'),
(2,'2-30','{\"checkList\":[0,0,0,0,0,0,0,0,0,0],\"cur_video\":6}');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
