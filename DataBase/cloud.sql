-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2025 a las 02:19:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloud`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteGame` (IN `p_id` INT)   BEGIN
  DELETE FROM games WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteGameScore` (IN `p_id` INT)   BEGIN
  DELETE FROM game_scores WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteStateType` (IN `p_id` TINYINT)   BEGIN
  DELETE FROM state_type WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUser` (IN `p_id` INT)   BEGIN
  DELETE FROM user WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteUserToken` (IN `p_id` INT)   BEGIN
  DELETE FROM user_tokens WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertGame` (IN `p_game_name` VARCHAR(100), IN `p_created_by` VARCHAR(100))   BEGIN
  INSERT INTO games (game_name, created_by)
  VALUES (p_game_name, p_created_by);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertGameScore` (IN `p_game_id` INT, IN `p_user_id` INT, IN `p_scene_time` TIME, IN `p_score` INT, IN `p_created_by` VARCHAR(100))   BEGIN
  INSERT INTO game_scores (game_id, user_id, scene_time, score, created_by)
  VALUES (p_game_id, p_user_id, p_scene_time, p_score, p_created_by);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertStateType` (IN `p_description` VARCHAR(100), IN `p_created_by` VARCHAR(100))   BEGIN
  INSERT INTO state_type (description, created_by)
  VALUES (p_description, p_created_by);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertUser` (IN `username` VARCHAR(50), IN `email` VARCHAR(100), IN `password` VARCHAR(255))   BEGIN
    INSERT INTO user (username, email, password) VALUES (username, email, password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertUserToken` (IN `p_user_id` INT, IN `p_token` VARCHAR(255), IN `p_login_attempt` INT, IN `p_created_by` VARCHAR(100))   BEGIN
  INSERT INTO user_tokens (user_id, token, login_attempt, created_by)
  VALUES (p_user_id, p_token, p_login_attempt, p_created_by);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListGames` ()   BEGIN
  SELECT * FROM games;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListGameScores` ()   BEGIN
  SELECT * FROM game_scores;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListStateTypes` ()   BEGIN
  SELECT * FROM state_type;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListUsers` ()   BEGIN
    SELECT id, username FROM user WHERE state = 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListUserTokens` ()   BEGIN
  SELECT * FROM user_tokens;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ActivateUser` (IN `p_user_id` INT, IN `p_modified_by` VARCHAR(100))   BEGIN
  UPDATE user
  SET state = 1, modified_by = p_modified_by
  WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loginUser` (IN `p_username` VARCHAR(50))   BEGIN
    SELECT password FROM user WHERE username = p_username;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registerUser` (IN `p_username` VARCHAR(50), IN `p_email` VARCHAR(100), IN `p_password` VARCHAR(255))   BEGIN
    INSERT INTO user (username, email, password) VALUES (p_username, p_email, p_password);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateGame` (IN `p_id` INT, IN `p_game_name` VARCHAR(100), IN `p_modified_by` VARCHAR(100))   BEGIN
  UPDATE games
  SET game_name = p_game_name, modified_by = p_modified_by
  WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateGameScore` (IN `p_id` INT, IN `p_scene_time` TIME, IN `p_score` INT, IN `p_modified_by` VARCHAR(100))   BEGIN
  UPDATE game_scores
  SET scene_time = p_scene_time, score = p_score,
      modified_by = p_modified_by
  WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateStateType` (IN `p_id` TINYINT, IN `p_description` VARCHAR(100), IN `p_modified_by` VARCHAR(100))   BEGIN
  UPDATE state_type
  SET description = p_description, modified_by = p_modified_by
  WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUser` (IN `p_id` INT, IN `p_email` VARCHAR(255), IN `p_password_hash` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_modified_by` VARCHAR(100), IN `p_state` TINYINT)   BEGIN
  UPDATE user
  SET email = p_email, password_hash = p_password_hash,
      username = p_username, modified_by = p_modified_by,
      state = p_state
  WHERE id = p_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateUserToken` (IN `p_id` INT, IN `p_token` VARCHAR(255), IN `p_login_attempt` INT, IN `p_last_login` DATETIME, IN `p_modified_by` VARCHAR(100))   BEGIN
  UPDATE user_tokens
  SET token = p_token, login_attempt = p_login_attempt,
      last_login = p_last_login, modified_by = p_modified_by
  WHERE id = p_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game1`
--

CREATE TABLE `game1` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game2`
--

CREATE TABLE `game2` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game3`
--

CREATE TABLE `game3` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game4`
--

CREATE TABLE `game4` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game5`
--

CREATE TABLE `game5` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `game_name` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_scores`
--

CREATE TABLE `game_scores` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `scene_time` time DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_time` datetime NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `attempt_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `state_type`
--

CREATE TABLE `state_type` (
  `id` tinyint(4) NOT NULL,
  `description` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `modified_at` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  `state` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `created_at`, `created_by`, `modified_at`, `modified_by`, `state`) VALUES
(1, 'demo', 'demo@email.com', '12345', '2025-05-24 23:36:41', NULL, NULL, '1', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'Test2', 'b2@email.com', '66789', '2025-05-25 04:25:52'),
(2, '', 'test@email.com', '123456', '2025-05-25 21:16:32'),
(3, 'VJCR', 'victor.collazos@tecsup.edu.pe', '$2y$10$/tp2CD2NWNC0iwYr3Y3sXuq1M14b02TGFTG.jzEbB8y96EI8xlpwm', '2025-05-25 21:40:13'),
(7, 'pablo', 'pablo@senati.edu.pe', '$2y$10$MrHsYZuG1BXvChtS4ocvyO3/jV8eH7elh7YxbhXF5L36LL/D8X/Qm', '2025-05-25 21:58:11'),
(8, 'MeganFox', 'megan@ulima.edu.pe', '$2y$10$nSCc0/gBHVRvVfLpyb.8TOJ1lG0vKMGybIAfSwIypaybIaNNNkgUq', '2025-05-25 22:03:01'),
(9, 'xd', 'gaaaa@tecsup', '$2y$10$FJmCEvzEZE3bSPXqU9PYZecrLGGcKhy6QeZj26AQ3zsrNBrG2zc0C', '2025-05-25 22:04:05'),
(10, 'a', 'a', '$2y$10$qTfMyofdJJeOLPS/dlELfuGdYt4YTkA/OXQUFrlubkn.n9ZHPg1lC', '2025-05-25 22:04:54'),
(11, 'c', 'c', '$2y$10$6r5/.J7qXVKMIdH2Nm4dLukoBrrRPMqFwz.Xu2YqmHjasoPv9um.a', '2025-05-25 22:08:49'),
(12, 'char', 'char@senati', '$2y$10$Es/eUydeLzXZzdTlUIn9GeUIDbWCGtC2S0v3YVrEuBRiW.K5T3UHG', '2025-05-25 22:10:33'),
(13, 'hunter', 'hunter@senati', '$2y$10$QFuzjs4QFgPkhp8bKhxDxuBpduog6C51ma4p5.q8qcgjQO6Ea3sim', '2025-05-25 22:11:37'),
(14, 'xd', 'xd', '$2y$10$ENZDYQhgAdKL2yf9i.jd8uqydEx.q/J8F9eUA2DKEsdUoPBVLkxr2', '2025-05-25 22:12:37'),
(18, 'hola', 'hola@tecsup', '$2y$10$punT0VMDuWpdJ9FjOg4FUOPl007FJaLnu/Xgy6heg3bh/cmEQSY0S', '2025-05-25 22:19:24'),
(20, 'b', 'b', '$2y$10$SuCyUNjSVpifMGD5KCYBLels5M/Bvtl7u2LQBthO0vYmYVoFj/QEu', '2025-05-25 22:21:24'),
(21, 'prueba', 'prueba@xd', '$2y$10$nOhZqlVkkMDQ5j.ZOR9dP.72oekc1HT.QDfrN6ZCqaqKZrwVxpcbW', '2025-05-25 22:27:44'),
(22, 'BillieEilish', 'aea', '$2y$10$tGIxhsGOmmcmaJ6VskKgE.JlbIWSl511Mwuerq4QJKKl4s0Yd6VtO', '2025-05-25 22:28:45'),
(23, 'Hatchimba', 'jorge.zuñiga@tecsup.edu.pe', '$2y$10$jak9IKWajx90avozwzvDCe8Vu943N6I.VC3FELYVWsYUJ4x2vwlgS', '2025-05-25 22:37:46'),
(24, 'DOTERO PRO', 'dota@uni', '$2y$10$dfHUbwVjJy0OoZjeWuokGu1clHPVtVUYC0buvDSOkyXeKsD0kAocO', '2025-05-25 22:47:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_tokens`
--

CREATE TABLE `user_tokens` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `login_attempt` int(11) DEFAULT 0,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `game1`
--
ALTER TABLE `game1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `game2`
--
ALTER TABLE `game2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `game3`
--
ALTER TABLE `game3`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `game4`
--
ALTER TABLE `game4`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `game5`
--
ALTER TABLE `game5`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `game_scores`
--
ALTER TABLE `game_scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `state_type`
--
ALTER TABLE `state_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `game1`
--
ALTER TABLE `game1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game2`
--
ALTER TABLE `game2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game3`
--
ALTER TABLE `game3`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game4`
--
ALTER TABLE `game4`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game5`
--
ALTER TABLE `game5`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `game_scores`
--
ALTER TABLE `game_scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `game_scores`
--
ALTER TABLE `game_scores`
  ADD CONSTRAINT `game_scores_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `game_scores_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
