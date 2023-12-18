-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 18 2023 г., 12:16
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `book_store`
--

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`id`, `name`, `cost`, `description`) VALUES
(1, 'Гарри Поттер и Философский камень', 750, ' '),
(2, 'Капитанская дочка', 500, ' '),
(7, 'Сборник стихотворений', 0, ' '),
(15, 'Сборник народных сказок', 250, 'Сборник');

-- --------------------------------------------------------

--
-- Структура таблицы `book_genre`
--

CREATE TABLE `book_genre` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `genre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `book_genre`
--

INSERT INTO `book_genre` (`id`, `book_id`, `genre_id`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 4),
(4, 2, 1),
(5, 2, 3),
(14, 7, 1),
(15, 7, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `book_writer`
--

CREATE TABLE `book_writer` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `writer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `book_writer`
--

INSERT INTO `book_writer` (`id`, `book_id`, `writer_id`) VALUES
(1, 1, 1),
(2, 2, 3),
(13, 7, 2),
(14, 7, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'Романтика'),
(2, 'Комедия'),
(3, 'Драма'),
(4, 'Фантастика'),
(5, 'Сёдзе-манга'),
(6, 'Научная фантастика');

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'Администратор'),
(2, 'Пользователь');

-- --------------------------------------------------------

--
-- Структура таблицы `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `discount_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `subscription`
--

INSERT INTO `subscription` (`id`, `name`) VALUES
(1, 'Стандартная'),
(2, 'Студенческая'),
(3, 'Премиум');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `subscription_id` int(11) DEFAULT NULL,
  `subscription_date` date DEFAULT NULL,
  `role_id` int(11) DEFAULT 2,
  `wallet_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `subscription_id`, `subscription_date`, `role_id`, `wallet_id`) VALUES
(2, 'qwe', '$2a$10$fEtHq7EE1BdoYJU7zgUuduTj9GCb3OAk90SDNpqvQqSrMQC1jDDZi', 1, '2023-12-18', 1, 7),
(3, 'asd', '$2a$10$FcdM.oj.YDdeaqJl/P0Vm.DHQPGrKe7tekJsmIZulEbry8gFPdcdi', NULL, NULL, 2, 8),
(4, 'zxc', '$2a$10$W9U7p9LnWksmjb.wJegO5e4d8X5xsXlL0jFH11hkQ/OBLdpGWF19q', NULL, NULL, 2, 9),
(9, 'asdasd', '$2a$10$s1PX3elZODFfNeE4Njw76O1OqOGu6VK7Gs1wlxWziajvMKAirNPO.', NULL, NULL, 2, 14),
(10, 'asdasdasd', '$2a$10$rfQHnYAOqwrB1IS69Xid4e7liz0f1qvjSuapA288NM3t3atI0tLT2', NULL, NULL, 2, 15);

-- --------------------------------------------------------

--
-- Структура таблицы `user_book`
--

CREATE TABLE `user_book` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `user_book`
--

INSERT INTO `user_book` (`id`, `book_id`, `user_id`) VALUES
(1, 2, 2),
(2, 1, 2),
(3, 7, 2),
(8, 15, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `wallet`
--

INSERT INTO `wallet` (`id`, `money`) VALUES
(7, 2154),
(8, 1000),
(9, 0),
(13, 0),
(14, 1000),
(15, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `writer`
--

CREATE TABLE `writer` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `writer`
--

INSERT INTO `writer` (`id`, `name`) VALUES
(1, 'Роулинг'),
(2, 'Лермонтов'),
(3, 'Пушкин'),
(4, 'Толстой'),
(5, 'Ахматова'),
(6, 'Ахматов');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `book_genre`
--
ALTER TABLE `book_genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Индексы таблицы `book_writer`
--
ALTER TABLE `book_writer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `writer_id` (`writer_id`);

--
-- Индексы таблицы `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscription_id` (`subscription_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `wallet_id` (`wallet_id`);

--
-- Индексы таблицы `user_book`
--
ALTER TABLE `user_book`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `writer`
--
ALTER TABLE `writer`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `book_genre`
--
ALTER TABLE `book_genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `book_writer`
--
ALTER TABLE `book_writer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT для таблицы `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `user_book`
--
ALTER TABLE `user_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `writer`
--
ALTER TABLE `writer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `book_genre`
--
ALTER TABLE `book_genre`
  ADD CONSTRAINT `book_genre_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `book_writer`
--
ALTER TABLE `book_writer`
  ADD CONSTRAINT `book_writer_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `book_writer_ibfk_2` FOREIGN KEY (`writer_id`) REFERENCES `writer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`subscription_id`) REFERENCES `subscription` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`wallet_id`) REFERENCES `wallet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_book`
--
ALTER TABLE `user_book`
  ADD CONSTRAINT `user_book_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_book_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
