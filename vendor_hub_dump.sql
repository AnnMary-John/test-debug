-- Vendor Hub & Fleet Management Database Dump
-- Database: myapp
-- ------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- Table: vendor
CREATE TABLE IF NOT EXISTS `vendor` (
  `id` varchar(255) NOT NULL,
  `companyName` varchar(255) NOT NULL,
  `businessAddress` varchar(255) NOT NULL,
  `contactPhone` varchar(255) NOT NULL,
  `totalDrivers` int(11) NOT NULL,
  `totalCars` int(11) NOT NULL,
  `complianceStatus` varchar(255) NOT NULL,
  `complianceIssues` json DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: vendor_application
CREATE TABLE IF NOT EXISTS `vendor_application` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `businessName` varchar(255) NOT NULL,
  `numberOfCars` int(11) NOT NULL,
  `numberOfVehicles` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'NEW',
  `internalNotes` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: user
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('platform_user','vendor') NOT NULL DEFAULT 'platform_user',
  `vendorId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: car
CREATE TABLE IF NOT EXISTS `car` (
  `id` varchar(36) NOT NULL,
  `make` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `licensePlate` varchar(255) NOT NULL,
  `vendorId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licensePlate_UNIQUE` (`licensePlate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Table: driver
CREATE TABLE IF NOT EXISTS `driver` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `licenseNumber` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `vendorId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licenseNumber_UNIQUE` (`licenseNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- DUMPING DATA
-- ------------------------------------------------------

-- Vendors
INSERT INTO `vendor` (`id`, `companyName`, `businessAddress`, `contactPhone`, `totalDrivers`, `totalCars`, `complianceStatus`, `complianceIssues`, `email`, `isActive`) VALUES
('VND-001', 'Metro Fleet Services', '123 Main St, New York, NY 10001', '(212) 555-0101', 45, 38, 'compliant', '[]', 'ops@metrofleet.com', 1),
('VND-002', 'City Wheels Transport', '456 Oak Ave, Los Angeles, CA 90012', '(323) 555-0202', 120, 95, 'non-compliant', '[]', 'admin@citywheels.com', 1);

-- Users
INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `vendorId`) VALUES
(UUID(), 'admin@opsportal.com', 'admin123', 'Admin User', 'platform_user', NULL),
(UUID(), 'vendor@test.com', 'vendor123', 'Test Vendor', 'vendor', 'VND-001');

-- Cars
INSERT INTO `car` (`id`, `make`, `model`, `year`, `licensePlate`, `vendorId`) VALUES
(UUID(), 'Toyota', 'Camry', 2022, 'ABC-1234', 'VND-001'),
(UUID(), 'Honda', 'Civic', 2021, 'XYZ-5678', 'VND-001'),
(UUID(), 'Ford', 'Transit', 2023, 'FLX-9900', 'VND-002');

-- Drivers
INSERT INTO `driver` (`id`, `name`, `licenseNumber`, `phoneNumber`, `vendorId`) VALUES
(UUID(), 'John Doe', 'DL-990011', '(555) 123-4567', 'VND-001'),
(UUID(), 'Jane Smith', 'DL-887766', '(555) 987-6543', 'VND-001'),
(UUID(), 'Bob Wilson', 'DL-552233', '(555) 444-3322', 'VND-002'),
(UUID(), 'Pam Beesly', 'DL-222222', '(555) 123-2222', 'VND-001'),
(UUID(), 'Jim Halpert', 'DL-333333', '(555) 123-3333', 'VND-001'),
(UUID(), 'Dwight Schrute', 'DL-444444', '(555) 123-4444', 'VND-001'),
(UUID(), 'Angela Martin', 'DL-555555', '(555) 123-5555', 'VND-002'),
(UUID(), 'Kevin Malone', 'DL-666666', '(555) 123-6666', 'VND-002'),
(UUID(), 'Oscar Martinez', 'DL-777777', '(555) 123-7777', 'VND-002'),
(UUID(), 'Stanley Hudson', 'DL-888888', '(555) 123-8888', 'VND-002'),
(UUID(), 'Phyllis Vance', 'DL-999999', '(555) 123-9999', 'VND-001'),
(UUID(), 'Kelly Kapoor', 'DL-101010', '(555) 123-1010', 'VND-001'),
(UUID(), 'Ryan Howard', 'DL-202020', '(555) 123-2020', 'VND-001'),
(UUID(), 'Toby Flenderson', 'DL-303030', '(555) 123-3030', 'VND-002'),
(UUID(), 'Meredith Palmer', 'DL-404040', '(555) 123-4040', 'VND-002'),
(UUID(), 'Creed Bratton', 'DL-505050', '(555) 123-5050', 'VND-002'),
(UUID(), 'Darryl Philbin', 'DL-606060', '(555) 123-6060', 'VND-001'),
(UUID(), 'Erin Hannon', 'DL-707070', '(555) 123-7070', 'VND-001'),
(UUID(), 'Gabe Lewis', 'DL-808080', '(555) 123-8080', 'VND-002'),
(UUID(), 'Robert California', 'DL-909090', '(555) 123-9090', 'VND-002'),
(UUID(), ''' OR ''1''=''1'' -- ', 'DL-SQL-INJ', '(000) 000-0000', 'VND-001'),
(UUID(), 'Nellie Bertram', 'DL-012345', '(555) 123-0123', 'VND-001'),
(UUID(), 'Clark Green', 'DL-678901', '(555) 123-6789', 'VND-001');

-- Vendor Applications
INSERT INTO `vendor_application` (`businessName`, `numberOfCars`, `numberOfVehicles`, `email`, `phone`, `status`, `internalNotes`) VALUES
('Express Logistics', 10, 10, 'contact@expresslog.com', '(555) 0110', 'NEW', 'Interested in expanding to East Coast'),
('Green Transport Co', 5, 5, 'info@greentransport.org', '(555) 0220', 'PENDING', 'Waiting for insurance verification'),
('Skywide Haulers', 25, 25, 'apply@skywide.com', '(555) 0330', 'REJECTED', 'Failed compliance check in 2024'),
('Urban Move', 8, 8, 'hello@urbanmove.io', '(555) 0440', 'APPROVED', 'Onboarding scheduled for next week'),
('Apex Fleet Solutions', 15, 15, 'onboarding@apexfleet.com', '(555) 0550', 'NEW', 'New entrant in the Midwest region'),
('Blue Sky Logistics', 12, 12, 'sales@blueskylogistics.net', '(555) 0660', 'NEW', 'Requesting bulk vehicle inspection'),
('Swift Delivery Inc', 20, 20, 'hr@swiftdelivery.com', '(555) 0770', 'NEW', 'Urgent application for peak season');