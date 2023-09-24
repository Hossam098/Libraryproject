-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2023 at 05:33 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libraryprojectsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
(1, 'nader', 'nader@info.com', '$2b$10$TTStusaK2l/exURNFTlwHOYgBxRDdzjJq1.eL7Sy6aANvl/9J/Ysq');

-- --------------------------------------------------------

--
-- Table structure for table `best_message_service`
--

CREATE TABLE `best_message_service` (
  `id` int(11) NOT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `research_number` tinyint(1) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `research1_image_pdf` varchar(255) DEFAULT NULL,
  `research1_image_word` varchar(255) DEFAULT NULL,
  `research2_image_pdf` varchar(255) DEFAULT NULL,
  `research2_image_word` varchar(255) DEFAULT NULL,
  `research3_image_pdf` varchar(255) DEFAULT NULL,
  `research3_image_word` varchar(255) DEFAULT NULL,
  `research4_image_pdf` varchar(255) DEFAULT NULL,
  `research4_image_word` varchar(255) DEFAULT NULL,
  `research5_image_pdf` varchar(255) DEFAULT NULL,
  `research5_image_word` varchar(255) DEFAULT NULL,
  `research6_image_pdf` varchar(255) DEFAULT NULL,
  `research6_image_word` varchar(255) DEFAULT NULL,
  `research7_image_pdf` varchar(255) DEFAULT NULL,
  `research7_image_word` varchar(255) DEFAULT NULL,
  `research8_image_pdf` varchar(255) DEFAULT NULL,
  `research8_image_word` varchar(255) DEFAULT NULL,
  `research9_image_pdf` varchar(255) DEFAULT NULL,
  `research9_image_word` varchar(255) DEFAULT NULL,
  `research10_image_pdf` varchar(255) DEFAULT NULL,
  `research10_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `formation_service`
--

CREATE TABLE `formation_service` (
  `id` int(11) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `message_word_ar` varchar(255) DEFAULT NULL,
  `message_pdf_ar` varchar(255) DEFAULT NULL,
  `message_word_en` varchar(255) DEFAULT NULL,
  `message_pdf_en` varchar(255) DEFAULT NULL,
  `quote_check_form` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grant_service`
--

CREATE TABLE `grant_service` (
  `id` int(11) NOT NULL,
  `message_pdf_en` varchar(255) NOT NULL,
  `message_word_en` varchar(255) NOT NULL,
  `message_pdf_ar` varchar(255) NOT NULL,
  `message_word_ar` varchar(255) NOT NULL,
  `decision` varchar(255) NOT NULL,
  `level` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_bank_service`
--

CREATE TABLE `knowledge_bank_service` (
  `id` int(11) NOT NULL,
  `subscription_status` tinyint(1) DEFAULT NULL COMMENT 'حاله الاشتراك \r\nمش مشترك =0\r\nتفعيل =1\r\nافاده او اثبات انه مشترك =2',
  `proof_of_subscription` varchar(255) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `academic` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `magazine_checking_service`
--

CREATE TABLE `magazine_checking_service` (
  `id` int(11) NOT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `research1_image_pdf` varchar(255) DEFAULT NULL,
  `research1_image_word` varchar(255) DEFAULT NULL,
  `research2_image_pdf` varchar(255) DEFAULT NULL,
  `research2_image_word` varchar(255) DEFAULT NULL,
  `research3_image_pdf` varchar(255) DEFAULT NULL,
  `research3_image_word` varchar(255) DEFAULT NULL,
  `research4_image_pdf` varchar(255) DEFAULT NULL,
  `research4_image_word` varchar(255) DEFAULT NULL,
  `research5_image_pdf` varchar(255) DEFAULT NULL,
  `research5_image_word` varchar(255) DEFAULT NULL,
  `research6_image_pdf` varchar(255) DEFAULT NULL,
  `research6_image_word` varchar(255) DEFAULT NULL,
  `research7_image_pdf` varchar(255) DEFAULT NULL,
  `research7_image_word` varchar(255) DEFAULT NULL,
  `research8_image_pdf` varchar(255) DEFAULT NULL,
  `research8_image_word` varchar(255) DEFAULT NULL,
  `research9_image_pdf` varchar(255) DEFAULT NULL,
  `research9_image_word` varchar(255) DEFAULT NULL,
  `research10_image_pdf` varchar(255) DEFAULT NULL,
  `research10_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `mname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `service_id` int(11) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `mname`, `email`, `password`, `service_id`, `role`) VALUES
(2, 'شيماء عبدالله', 'shimaa@info.com', '$2b$10$otq0Lx/ZHC..pV8pX2FUZOXbfEzLvikMhUFW85XH8RNa69Y3ZhrQq', 1, 0),
(3, 'امل حسن', 'amal@info.com', '12345678', 2, 0),
(4, 'ايمان زغلول', 'eman@info.com', '$2b$10$n/WKv9PPHwo0MgQUGqbaZOMNuV7ML10FIiIkjWsX2BxQZO.WMfDUK', 3, 0),
(5, ' ايمان زغلول', 'emanP@info.com', '12345678', 4, 0),
(6, 'نجلاء فتحي', 'Nagla@info.com', '12345678', 5, 0),
(8, 'امل حسن', 'amal@info.com', '12345678', 7, 0),
(9, 'احمد ابراهيم', 'ahmed@info.com', '$2b$10$zv91znuDW6/4y5MRu2U4fuVbz6.dfgpk4cMAnWahZ.7vLzn.6FotS', 8, 0),
(10, 'احمد ابراهيم', 'ahmedcode@info.com', '$2b$10$vCYLJ/8nq9KAyM3ZHiGAluUJlMXF/kb9PrFynbwbU3//.0z1LdIKO', 9, 0),
(11, ' ايمان زغلول', 'emanBest@info.com', '12345678', 6, 0),
(12, ' ايمان زغلول', 'emanCode@info.com', '12345678', 9, 0),
(13, 'ايمان محمد فتحي', 'emanMohamed@info.com', '$2b$10$KFNaRHq6vpPPhOyCCPBnVOAhEIz8NlUysid3qwc0xrXgjIwuonJS.', 2, 0),
(14, 'نانا محسن', 'nanamohsen@info.com', '12345678', 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `personal_examination_service`
--

CREATE TABLE `personal_examination_service` (
  `id` int(11) NOT NULL,
  `photo_college_letter` varchar(255) DEFAULT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `accept_date` date DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `research1_image_pdf` varchar(255) DEFAULT NULL,
  `research1_image_word` varchar(255) DEFAULT NULL,
  `research2_image_pdf` varchar(255) DEFAULT NULL,
  `research2_image_word` varchar(255) DEFAULT NULL,
  `research3_image_pdf` varchar(255) DEFAULT NULL,
  `research3_image_word` varchar(255) DEFAULT NULL,
  `research4_image_pdf` varchar(255) DEFAULT NULL,
  `research4_image_word` varchar(255) DEFAULT NULL,
  `research5_image_pdf` varchar(255) DEFAULT NULL,
  `research5_image_word` varchar(255) DEFAULT NULL,
  `research6_image_pdf` varchar(255) DEFAULT NULL,
  `research6_image_word` varchar(255) DEFAULT NULL,
  `research7_image_pdf` varchar(255) DEFAULT NULL,
  `research7_image_word` varchar(255) DEFAULT NULL,
  `research8_image_pdf` varchar(255) DEFAULT NULL,
  `research8_image_word` varchar(255) DEFAULT NULL,
  `research9_image_pdf` varchar(255) DEFAULT NULL,
  `research9_image_word` varchar(255) DEFAULT NULL,
  `research10_image_pdf` varchar(255) DEFAULT NULL,
  `research10_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `registration_services`
--

CREATE TABLE `registration_services` (
  `id` int(11) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `research_plan_ar_pdf` varchar(255) DEFAULT NULL,
  `research_plan_ar_word` varchar(255) DEFAULT NULL,
  `research_plan_en_pdf` varchar(255) DEFAULT NULL,
  `research_plan_en_word` varchar(255) DEFAULT NULL,
  `translation_paper` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_name_ar` varchar(255) NOT NULL,
  `pref` varchar(255) NOT NULL,
  `pref_ar` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_name_ar`, `pref`, `pref_ar`, `enabled`) VALUES
(1, 'Extracting a statement that the title of the thesis plan is not previously registered', 'استخراج افادة بأن عنوان مخطط الرسالة ليس مسجل ', 'Procedures for applying for issuance of statements with titles of academic plans (scientific theses under study) for the purpose of registration for master\'s and doctoral degrees for postgraduate students', 'اجراءات التقدم لإستخراج افادات بعناوين المخططات العلمية (الرسائل العلمية قيد الدراسة) بغرض التسجيل لدرجة الماجستير والدكتوراه لطلاب الدراسات العليا', 1),
(2, 'Examination of citation of scientific theses for the purpose of formation', 'فحص الاقتباس من الرسائل العلمية لغرض التشكيل', 'Procedures for applying for examining academic theses (Master\'s and PhD) for the purpose of formation and discussion for postgraduate students', 'اجراءات التقدم لفحص الرسائل العلمية (الماجستير والدكتوراه)  بغرض التشكيل و المناقشة  لطلاب الدراسات العليا', 0),
(3, 'Examination of scientific production for the purpose of personal examination', 'فحص الانتاج العلمي لغرض الفحص الشخصى', 'Examination of scientific production for the purpose of personal examination', 'فحص الانتاج العلمي لغرض الفحص الشخصى', 1),
(4, 'Examination of scientific research for the purpose of publication in scientific journals', 'فحص الابحاث العلمية بغرض النشر فى المجلات العلمية', 'Procedures for applying to examine scientific research for the purpose of publishing in scientific journals for faculty members and postgraduate students', 'اجراءات التقدم لفحص الابحاث العلمية بغرض النشر فى المجلات العلمية للسادة اعضاء هيئة التدريس وطلاب الدراسات العليا', 1),
(5, 'Examination of scientific research for the purpose of promotion', 'فحص الابحاث العلمية لغرض الترقية', 'Procedures for applying at Helwan University to examine scientific research for the purpose of promotion for faculty members', ' اجراءات التقدم بجامعة حلوان  لفحص الابحاث العلمية بغرض الترقية للسادة اعضاء هيئة التدريس', 1),
(6, 'Examination of the best scientific thesis', 'فحص احسن رساله علميه', 'Procedures for applying to examine scientific production for the purpose of applying for the best thesis competition', 'اجراءات التقدم لفحص الانتاج العلمي بغرض التقدم لمسابقة افضل رسالة', 1),
(7, 'Grant service', 'اجراءات تسليم نسخة الكترونية', 'Procedures for submitting an electronic copy of theses (Master\'s and PhD) after discussion', 'اجراءات تسليم نسخة الكترونية من الرسائل العلمية (الماجستير والدكتوراه) بعد المناقشة', 1),
(8, 'Knowledge bank service', 'خدمة بنك المعرفة', 'Egyptian Knowledge Bank service', ' خدمة بنك المعرفة المصري', 1),
(9, 'Payment code', 'كود الدفع', '..', '..', 0);

-- --------------------------------------------------------

--
-- Table structure for table `submit`
--

CREATE TABLE `submit` (
  `id` int(11) NOT NULL,
  `ser_reg` int(11) DEFAULT NULL,
  `ser_formation` int(11) DEFAULT NULL,
  `ser_grant` int(11) DEFAULT NULL,
  `ser_personal` int(11) DEFAULT NULL,
  `ser_upgrade` int(11) DEFAULT NULL,
  `ser_knowledge` int(11) DEFAULT NULL,
  `ser_magazine` int(11) DEFAULT NULL,
  `ser_best` int(11) DEFAULT NULL,
  `payment_code` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0 => req code\r\n1 => sent code\r\n2 => req steptwo\r\n3 => edit step two\r\n4 => edit req code att\r\n5 => acc\r\n6 => reg',
  `files_numbers` int(11) DEFAULT NULL,
  `response_text` varchar(255) DEFAULT NULL,
  `response_pdf` varchar(255) DEFAULT NULL,
  `req_code_date` date DEFAULT NULL,
  `submit_date` date DEFAULT NULL,
  `edit_date` date DEFAULT NULL,
  `response_date` date DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `role` tinyint(1) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `manager_status` tinyint(1) DEFAULT NULL COMMENT ' 1    =>  req acc\r\n2     => req rej\r\n3     => req edit step2\r\n4     => req edit step1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_manager`
--

CREATE TABLE `sub_manager` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_manager`
--

INSERT INTO `sub_manager` (`id`, `name`, `email`, `password`) VALUES
(1, 'fff', 'ffff', 'fff');

-- --------------------------------------------------------

--
-- Table structure for table `upgrade_service`
--

CREATE TABLE `upgrade_service` (
  `id` int(11) NOT NULL,
  `research_list` varchar(255) DEFAULT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL,
  `research1_image_pdf` varchar(255) DEFAULT NULL,
  `research1_image_word` varchar(255) DEFAULT NULL,
  `research2_image_pdf` varchar(255) DEFAULT NULL,
  `research2_image_word` varchar(255) DEFAULT NULL,
  `research3_image_pdf` varchar(255) DEFAULT NULL,
  `research3_image_word` varchar(255) DEFAULT NULL,
  `research4_image_pdf` varchar(255) DEFAULT NULL,
  `research4_image_word` varchar(255) DEFAULT NULL,
  `research5_image_pdf` varchar(255) DEFAULT NULL,
  `research5_image_word` varchar(255) DEFAULT NULL,
  `research6_image_pdf` varchar(255) DEFAULT NULL,
  `research6_image_word` varchar(255) DEFAULT NULL,
  `research7_image_pdf` varchar(255) DEFAULT NULL,
  `research7_image_word` varchar(255) DEFAULT NULL,
  `research8_image_pdf` varchar(255) DEFAULT NULL,
  `research8_image_word` varchar(255) DEFAULT NULL,
  `research9_image_pdf` varchar(255) DEFAULT NULL,
  `research9_image_word` varchar(255) DEFAULT NULL,
  `research10_image_pdf` varchar(255) DEFAULT NULL,
  `research10_image_word` varchar(255) DEFAULT NULL,
  `acceptance_letter1` varchar(255) DEFAULT NULL,
  `acceptance_letter2` varchar(255) DEFAULT NULL,
  `acceptance_letter3` varchar(255) DEFAULT NULL,
  `acceptance_letter4` varchar(255) DEFAULT NULL,
  `acceptance_letter5` varchar(255) DEFAULT NULL,
  `acceptance_letter6` varchar(255) DEFAULT NULL,
  `acceptance_letter7` varchar(255) DEFAULT NULL,
  `acceptance_letter8` varchar(255) DEFAULT NULL,
  `acceptance_letter9` varchar(255) DEFAULT NULL,
  `acceptance_letter10` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `national_id` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `nationality` varchar(255) NOT NULL,
  `university` varchar(255) NOT NULL,
  `faculity` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `best_message_service`
--
ALTER TABLE `best_message_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formation_service`
--
ALTER TABLE `formation_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grant_service`
--
ALTER TABLE `grant_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `knowledge_bank_service`
--
ALTER TABLE `knowledge_bank_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `magazine_checking_service`
--
ALTER TABLE `magazine_checking_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ser-man` (`service_id`);

--
-- Indexes for table `personal_examination_service`
--
ALTER TABLE `personal_examination_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration_services`
--
ALTER TABLE `registration_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `submit`
--
ALTER TABLE `submit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reg` (`ser_reg`),
  ADD KEY `form` (`ser_formation`),
  ADD KEY `grant` (`ser_grant`),
  ADD KEY `knowledge` (`ser_knowledge`),
  ADD KEY `magazine` (`ser_magazine`),
  ADD KEY `per` (`ser_personal`),
  ADD KEY `upgrade` (`ser_upgrade`),
  ADD KEY `best` (`ser_best`),
  ADD KEY `user` (`user_id`),
  ADD KEY `ser` (`service_id`),
  ADD KEY `sub` (`role`),
  ADD KEY `man` (`manager_id`);

--
-- Indexes for table `sub_manager`
--
ALTER TABLE `sub_manager`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upgrade_service`
--
ALTER TABLE `upgrade_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `best_message_service`
--
ALTER TABLE `best_message_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `formation_service`
--
ALTER TABLE `formation_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `grant_service`
--
ALTER TABLE `grant_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `knowledge_bank_service`
--
ALTER TABLE `knowledge_bank_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `magazine_checking_service`
--
ALTER TABLE `magazine_checking_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_examination_service`
--
ALTER TABLE `personal_examination_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `registration_services`
--
ALTER TABLE `registration_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `submit`
--
ALTER TABLE `submit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `sub_manager`
--
ALTER TABLE `sub_manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `upgrade_service`
--
ALTER TABLE `upgrade_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `manager`
--
ALTER TABLE `manager`
  ADD CONSTRAINT `man-ser` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `submit`
--
ALTER TABLE `submit`
  ADD CONSTRAINT `best` FOREIGN KEY (`ser_best`) REFERENCES `best_message_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `form` FOREIGN KEY (`ser_formation`) REFERENCES `formation_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grant` FOREIGN KEY (`ser_grant`) REFERENCES `grant_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `knowledge` FOREIGN KEY (`ser_knowledge`) REFERENCES `knowledge_bank_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `magazine` FOREIGN KEY (`ser_magazine`) REFERENCES `magazine_checking_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `man` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `per` FOREIGN KEY (`ser_personal`) REFERENCES `personal_examination_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg` FOREIGN KEY (`ser_reg`) REFERENCES `registration_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ser` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `upgrade` FOREIGN KEY (`ser_upgrade`) REFERENCES `upgrade_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
