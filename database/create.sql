DROP DATABASE IF EXISTS `chat`;
CREATE DATABASE `chat`;
USE `chat`;
CREATE TABLE `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `rooms` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(255) NOT NULL UNIQUE,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `messages` (
    `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` int(11) NOT NULL,
    `room_id` int(11) NOT NULL,
    `message` text NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);