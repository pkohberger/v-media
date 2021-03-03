--create database etc
CREATE DATABASE vice_media;

USE vice_media;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(15) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `created` datetime NOT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--seed database
INSERT INTO `vice_media`.`comments` (`id`, `ip`, `text`,`created`) VALUES ('1', '194.192.96.152','I love programming so much!',NOW());