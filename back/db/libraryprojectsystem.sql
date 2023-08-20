-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2023 at 05:15 PM
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
  `research8_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `best_message_service`
--

INSERT INTO `best_message_service` (`id`, `photo_college_letter`, `research_number`, `photo_payment_receipt`, `research1_image_pdf`, `research1_image_word`, `research2_image_pdf`, `research2_image_word`, `research3_image_pdf`, `research3_image_word`, `research4_image_pdf`, `research4_image_word`, `research5_image_pdf`, `research5_image_word`, `research6_image_pdf`, `research6_image_word`, `research7_image_pdf`, `research7_image_word`, `research8_image_pdf`, `research8_image_word`) VALUES
(1, '10_124406.jpg_1691550820009.jpg', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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

--
-- Dumping data for table `formation_service`
--

INSERT INTO `formation_service` (`id`, `level`, `photo_payment_receipt`, `photo_college_letter`, `message_word_ar`, `message_pdf_ar`, `message_word_en`, `message_pdf_en`, `quote_check_form`) VALUES
(1, 0, NULL, 'نادر ممدوح_124423.jpg_1691538652865.jpg', NULL, NULL, NULL, NULL, NULL),
(2, 0, '10_1692445355402.pdf', '10_124423.jpg_1691785956961.jpg', '10_1692445374408.docx', '10_1692445364907.pdf', NULL, NULL, '10_1692445375730.pdf'),
(3, 0, NULL, '10_1692495991337.docx', NULL, NULL, NULL, NULL, NULL),
(4, 0, NULL, '10_1692496021432.docx', NULL, NULL, NULL, NULL, NULL),
(5, 0, NULL, '10_1692496106088.docx', NULL, NULL, NULL, NULL, NULL);

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
  `decision_of_the_Judgment_and_discussion_committee` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_bank_service`
--

CREATE TABLE `knowledge_bank_service` (
  `id` int(11) NOT NULL,
  `subscription_status` tinyint(1) NOT NULL COMMENT 'حاله الاشتراك \r\nمش مشترك =0\r\nتفعيل =1\r\nافاده او اثبات انه مشترك =2',
  `proof_of_subscription` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `magazine_checking_service`
--

CREATE TABLE `magazine_checking_service` (
  `id` int(11) NOT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `research_title` varchar(255) NOT NULL,
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
  `research8_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `magazine_checking_service`
--

INSERT INTO `magazine_checking_service` (`id`, `photo_college_letter`, `research_title`, `research_number`, `photo_payment_receipt`, `research1_image_pdf`, `research1_image_word`, `research2_image_pdf`, `research2_image_word`, `research3_image_pdf`, `research3_image_word`, `research4_image_pdf`, `research4_image_word`, `research5_image_pdf`, `research5_image_word`, `research6_image_pdf`, `research6_image_word`, `research7_image_pdf`, `research7_image_word`, `research8_image_pdf`, `research8_image_word`) VALUES
(1, 'نادر ممدوح_124423.jpg_1691543292974.jpg', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '10_124423.jpg_1691548098620.jpg', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '10_124423.jpg_1691785963139.jpg', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`id`, `name`, `email`, `password`, `service_id`) VALUES
(1, 'nader', 'nader@', '1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_examination_service`
--

CREATE TABLE `personal_examination_service` (
  `id` int(11) NOT NULL,
  `photo_college_letter` varchar(255) DEFAULT NULL,
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
  `research8_image_word` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal_examination_service`
--

INSERT INTO `personal_examination_service` (`id`, `photo_college_letter`, `photo_payment_receipt`, `research1_image_pdf`, `research1_image_word`, `research2_image_pdf`, `research2_image_word`, `research3_image_pdf`, `research3_image_word`, `research4_image_pdf`, `research4_image_word`, `research5_image_pdf`, `research5_image_word`, `research6_image_pdf`, `research6_image_word`, `research7_image_pdf`, `research7_image_word`, `research8_image_pdf`, `research8_image_word`) VALUES
(3, '10_124423.jpg_1691785959903.jpg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '10_1692486858089.pdf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '10_1692496633292.docx', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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

--
-- Dumping data for table `registration_services`
--

INSERT INTO `registration_services` (`id`, `level`, `photo_payment_receipt`, `photo_college_letter`, `research_plan_ar_pdf`, `research_plan_ar_word`, `research_plan_en_pdf`, `research_plan_en_word`, `translation_paper`) VALUES
(7, 1, NULL, '10_124423.jpg_1691783190100.jpg', NULL, NULL, NULL, NULL, NULL),
(8, 1, NULL, '10_124423.jpg_1691783235123.jpg', NULL, NULL, NULL, NULL, NULL),
(9, 1, NULL, '10_124423.jpg_1691783263783.jpg', NULL, NULL, NULL, NULL, NULL),
(10, 1, NULL, '10_124423.jpg_1691783331435.jpg', NULL, NULL, NULL, NULL, NULL),
(11, 1, NULL, '10_124423.jpg_1691783360058.jpg', NULL, NULL, NULL, NULL, NULL),
(12, 1, '10_1692398888457.docx', '10_1692398889451.docx', '10_1692398890449.jpg', '10_1692398891440.jpg', NULL, NULL, '10_1692398892389.jpg'),
(13, 0, NULL, '10_124423.jpg_1691785950620.jpg', NULL, NULL, NULL, NULL, NULL),
(14, 0, NULL, '10_1692494743950.pdf', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_name_ar` varchar(255) NOT NULL,
  `pref` varchar(255) NOT NULL,
  `pref_ar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_name_ar`, `pref`, `pref_ar`) VALUES
(1, 'Extracting a statement that the title of the thesis plan is not previously registered', 'استخراج افادة بأن عنوان مخطط الرسالة ليس مسجل', 'Procedures for applying for issuance of statements with titles of academic plans (scientific theses under study) for the purpose of registration for master\'s and doctoral degrees for postgraduate students', 'اجراءات التقدم لإستخراج افادات بعناوين المخططات العلمية (الرسائل العلمية قيد الدراسة) بغرض التسجيل لدرجة الماجستير والدكتوراه لطلاب الدراسات العليا'),
(2, 'Examination of citation of scientific theses for the purpose of formation', 'فحص الاقتباس من الرسائل العلمية لغرض التشكيل', 'Procedures for applying for examining academic theses (Master\'s and PhD) for the purpose of formation and discussion for postgraduate students', 'اجراءات التقدم لفحص الرسائل العلمية (الماجستير والدكتوراه)  بغرض التشكيل و المناقشة  لطلاب الدراسات العليا'),
(3, 'Examination of scientific production for the purpose of personal examination', 'فحص الانتاج العلمي لغرض الفحص الشخصى', 'Examination of scientific production for the purpose of personal examination', 'فحص الانتاج العلمي لغرض الفحص الشخصى'),
(4, 'Examination of scientific research for the purpose of publication in scientific journals', 'فحص الابحاث العلمية بغرض النشر فى المجلات العلمية', 'Procedures for applying to examine scientific research for the purpose of publishing in scientific journals for faculty members and postgraduate students', 'اجراءات التقدم لفحص الابحاث العلمية بغرض النشر فى المجلات العلمية للسادة اعضاء هيئة التدريس وطلاب الدراسات العليا'),
(5, 'Examination of scientific research for the purpose of promotion', 'فحص الابحاث العلمية لغرض الترقية', 'Procedures for applying at Helwan University to examine scientific research for the purpose of promotion for faculty members', ' اجراءات التقدم بجامعة حلوان  لفحص الابحاث العلمية بغرض الترقية للسادة اعضاء هيئة التدريس'),
(6, 'Examination of the best scientific thesis', 'فحص احسن رساله علميه', 'Procedures for applying to examine scientific production for the purpose of applying for the best thesis competition', 'اجراءات التقدم لفحص الانتاج العلمي بغرض التقدم لمسابقة افضل رسالة'),
(7, 'Grant service', 'خدمة المنح', 'Procedures for submitting an electronic copy of theses (Master\'s and PhD) after discussion', 'اجراءات تسليم نسخة الكترونية من الرسائل العلمية (الماجستير والدكتوراه) بعد المناقشة'),
(8, 'Knowledge bank service', 'خدمة بنك المعرفة', 'Egyptian Knowledge Bank service', ' خدمة بنك المعرفة المصري');

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
  `payment_code` int(11) DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '0 => req code\r\n1 => sent code\r\n2 => req steptwo\r\n3 => edit step two\r\n4 => edit req code att\r\n5 => acc\r\n6 => reg',
  `files_numbers` int(11) DEFAULT NULL,
  `response_text` int(11) DEFAULT NULL,
  `response_pdf` int(11) DEFAULT NULL,
  `req_code_date` date NOT NULL DEFAULT current_timestamp(),
  `submit_date` date NOT NULL DEFAULT current_timestamp(),
  `edit_date` date NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `sub_manager_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submit`
--

INSERT INTO `submit` (`id`, `ser_reg`, `ser_formation`, `ser_grant`, `ser_personal`, `ser_upgrade`, `ser_knowledge`, `ser_magazine`, `ser_best`, `payment_code`, `status`, `files_numbers`, `response_text`, `response_pdf`, `req_code_date`, `submit_date`, `edit_date`, `user_id`, `service_id`, `sub_manager_id`) VALUES
(1, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2147483647, 1, NULL, NULL, NULL, '2023-08-18', '2023-08-19', '2023-08-11', 3, 1, NULL),
(2, 13, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 3, NULL, NULL, NULL, '2023-08-18', '2023-08-11', '2023-08-11', 3, 1, NULL),
(3, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL, NULL, NULL, '2023-08-18', '2023-08-19', '2023-08-11', 3, 2, NULL),
(4, NULL, NULL, NULL, 3, NULL, NULL, NULL, NULL, 0, 1, 5, NULL, NULL, '2023-08-18', '2023-08-11', '2023-08-11', 3, 3, NULL),
(5, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 0, 1, NULL, NULL, NULL, '2023-08-18', '2023-08-11', '2023-08-11', 3, 4, NULL),
(6, NULL, NULL, NULL, 4, NULL, NULL, NULL, NULL, 42452452, 1, 6, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 3, NULL),
(7, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 1, NULL),
(8, NULL, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 2, NULL),
(9, NULL, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 2, NULL),
(10, NULL, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 2, NULL),
(11, NULL, NULL, NULL, 5, NULL, NULL, NULL, NULL, NULL, 0, 3, NULL, NULL, '2023-08-20', '2023-08-20', '2023-08-20', 3, 3, NULL);

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
  `current_academic_degree` varchar(255) NOT NULL,
  `academic_degree_to_which_its_ promoted` varchar(255) NOT NULL,
  `photo_college_letter` varchar(255) NOT NULL,
  `photo_payment_receipt` varchar(255) DEFAULT NULL
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
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `national_id`, `phone`, `nationality`, `university`, `faculity`, `department`, `img`) VALUES
(1, 'nader', 'das@info.com', '5531', '56165606', 68165, 'klnklmk', 'cscsd', 'dsc', '', ''),
(2, 'v', 'dscsd@csc.css', '$2b$10$G7JMtmC/OcOJHenwtDhLruV3fprBbfZYO8iGR0Y3ySe7siDDIYe52', '452452', 45451, 'zdc', 'dcs', 'casc', '', ''),
(3, 'نادر ممدوح شاكر عبدالمحسن', 'nader@info.com', '$2b$10$eItknlVFspntipdZgd/WZOH/bK3c6ml1wff8VJ5MVPfXzqJYMfBuO', '10', 1000, 'مصري', '1', 'ري', 'يرر', '10_1692400750730.jpg');

--
-- Indexes for dumped tables
--

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
  ADD KEY `sub` (`sub_manager_id`);

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
-- AUTO_INCREMENT for table `best_message_service`
--
ALTER TABLE `best_message_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `formation_service`
--
ALTER TABLE `formation_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `grant_service`
--
ALTER TABLE `grant_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knowledge_bank_service`
--
ALTER TABLE `knowledge_bank_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `magazine_checking_service`
--
ALTER TABLE `magazine_checking_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_examination_service`
--
ALTER TABLE `personal_examination_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `registration_services`
--
ALTER TABLE `registration_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `submit`
--
ALTER TABLE `submit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sub_manager`
--
ALTER TABLE `sub_manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `upgrade_service`
--
ALTER TABLE `upgrade_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `submit`
--
ALTER TABLE `submit`
  ADD CONSTRAINT `best` FOREIGN KEY (`ser_best`) REFERENCES `best_message_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `form` FOREIGN KEY (`ser_formation`) REFERENCES `formation_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grant` FOREIGN KEY (`ser_grant`) REFERENCES `grant_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `knowledge` FOREIGN KEY (`ser_knowledge`) REFERENCES `knowledge_bank_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `magazine` FOREIGN KEY (`ser_magazine`) REFERENCES `magazine_checking_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `per` FOREIGN KEY (`ser_personal`) REFERENCES `personal_examination_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reg` FOREIGN KEY (`ser_reg`) REFERENCES `registration_services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ser` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sub` FOREIGN KEY (`sub_manager_id`) REFERENCES `sub_manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `upgrade` FOREIGN KEY (`ser_upgrade`) REFERENCES `upgrade_service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
