DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE `chat`;
USE `chat`;
CREATE TABLE `rooms` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL UNIQUE,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `messages` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `room_id` int(11) NOT NULL,
    `message` text NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);