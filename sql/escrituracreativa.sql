-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-02-2021 a las 16:38:10
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `escrituracreativa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'fantásticos-maravilloso'),
(2, 'realismo mágico'),
(3, 'fantásticos'),
(4, 'policíacos-detectivesco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desafio`
--

CREATE TABLE `desafio` (
  `id` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `descripcion` mediumtext NOT NULL,
  `imagen` text DEFAULT NULL,
  `tipoCalificacion` int(11) NOT NULL,
  `idCategoria` int(9) NOT NULL,
  `colaborativo` tinyint(1) NOT NULL,
  `fechaIni` datetime NOT NULL DEFAULT current_timestamp(),
  `fechaFin` datetime NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `desafio`
--

INSERT INTO `desafio` (`id`, `idGrupo`, `titulo`, `descripcion`, `imagen`, `tipoCalificacion`, `idCategoria`, `colaborativo`, `fechaIni`, `fechaFin`, `activo`) VALUES
(80, 3, 'Desafio1', '<p><strong>Descripcíon</strong></p>\n<p>Desafio1</p>\n', 'http://localhost:3001/images/Captura.JPG', 0, 2, 2, '2021-01-20 22:09:33', '2021-02-25 18:38:03', 1),
(81, 3, 'Desafio2', '<p><strong>descripción del desafío 2</strong></p>\n<p>me parece genial</p>\n', 'http://localhost:3001/images/1540-1.jpg', 0, 2, 1, '2021-01-21 09:07:53', '2021-02-17 09:05:00', 1),
(83, 3, 'Gonzálo', '<p><strong>Hola gonzalo como estas?</strong></p>\n<p><em>-bien</em></p>\n', '', 0, 4, 2, '2021-01-21 13:47:35', '2021-02-24 11:57:25', 1),
(84, 3, 'singapur', '<p><strong>singapur</strong></p>\n<p>hhaaaaa</p>\n', '', 0, 2, 2, '2021-01-25 13:01:18', '2021-01-30 17:30:00', 1),
(85, 3, 'dsdsd', '<p>dsdsds</p>\n', 'undefined', 0, 1, 1, '2021-02-02 19:57:04', '2021-02-24 19:56:00', 1),
(86, 3, 'fdfdfdfererre', '<p>rerererere</p>\n', 'http://localhost:3001/images/seo2019.jpg', 0, 4, 2, '2021-02-02 19:58:03', '2021-02-24 19:57:00', 1),
(87, 3, 'Desafio10', '<p>Descripcion del desafio 10</p>\n', 'http://localhost:3001/images/Captura.JPG', 0, 4, 2, '2021-02-04 11:54:53', '2021-02-25 06:50:00', 1),
(88, 3, 'Desafio15', '<p><strong>Hoal desafio 15</strong></p>\n', 'http://localhost:3001/images/whatsapp.jpg', 0, 4, 2, '2021-02-04 13:52:05', '2021-02-28 17:51:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enlacedesafio`
--

CREATE TABLE `enlacedesafio` (
  `idDesafio` int(11) NOT NULL,
  `enlace` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id` int(9) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `idCreador` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id`, `nombre`, `activo`, `idCreador`, `idGrupo`) VALUES
(2, 'Los escribanos', 1, 6, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipoestudiante`
--

CREATE TABLE `equipoestudiante` (
  `idEquipo` int(9) NOT NULL,
  `idEstudiante` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `equipoestudiante`
--

INSERT INTO `equipoestudiante` (`idEquipo`, `idEstudiante`) VALUES
(2, 6),
(2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escrito`
--

CREATE TABLE `escrito` (
  `id` int(11) NOT NULL,
  `idGrupo` int(9) NOT NULL,
  `idDesafio` int(9) NOT NULL,
  `idEscritor` int(9) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `texto` longtext NOT NULL,
  `puntuacion` float NOT NULL,
  `colaborativo` tinyint(1) NOT NULL,
  `finalizado` tinyint(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `escrito`
--

INSERT INTO `escrito` (`id`, `idGrupo`, `idDesafio`, `idEscritor`, `nombre`, `texto`, `puntuacion`, `colaborativo`, `finalizado`, `fecha`, `activo`) VALUES
(1, 3, 83, 9, 'fdf', 'dfdf', 2, 0, 0, '2021-01-26 14:46:47', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(9) NOT NULL,
  `idEquipo` int(9) NOT NULL,
  `creadorEquipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`id`, `idEquipo`, `creadorEquipo`) VALUES
(6, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id` int(9) NOT NULL,
  `idprofesor` int(9) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id`, `idprofesor`, `nombre`, `activo`) VALUES
(3, 4, 'Grupo de Novela Negra', 1),
(4, 4, 'Grupo de Poesia', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupoestudiante`
--

CREATE TABLE `grupoestudiante` (
  `idGrupo` int(9) NOT NULL,
  `idEstudiante` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupoestudiante`
--

INSERT INTO `grupoestudiante` (`idGrupo`, `idEstudiante`) VALUES
(3, 6),
(3, 7),
(4, 9),
(3, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `media_desafio`
--

CREATE TABLE `media_desafio` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `tipo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `media_escrito`
--

CREATE TABLE `media_escrito` (
  `idEscritor` int(11) NOT NULL,
  `isDesafio` int(11) NOT NULL,
  `imagen` longblob NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(9) NOT NULL,
  `correo` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `foto` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `rol` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `password`, `nombre`, `apellidos`, `foto`, `activo`, `rol`) VALUES
(4, 'cora@ucm.es', 'cora', 'cora', 'cora2', '', 1, 'T'),
(6, 'genesis@ucm.es', 'genesis', 'genesis', 'genesis2', '', 1, 'S'),
(7, 'gonzalo@ucm.es', 'gonzalo', 'gonzalo', 'gonzalo2', '', 1, 'S'),
(8, 'adrian@ucm.es', 'adrian', 'adrian', 'riesco', '', 1, 'A'),
(9, 'luis@ucm.es', 'luis', 'luis', 'jaramillo', '', 1, 'S'),
(10, 'stefano@ucm.es', 'stefano', 'stefano', 'stefano2', '', 1, 'S'),
(12, 'pepito@ucm.es', '$2a$08$jjDVnTfJtCipUd/FhwKD4eC4ayGkyK8ZOipJFJf0bBzsd76MHWuFi', 'pepito', 'peperoni', '', 1, 'E'),
(14, 'rosa@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'rosa', 'rosa', '', 1, 'E');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `desafio`
--
ALTER TABLE `desafio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indexGrupo` (`idGrupo`) USING BTREE,
  ADD KEY `indexCategoria` (`idCategoria`) USING BTREE;

--
-- Indices de la tabla `enlacedesafio`
--
ALTER TABLE `enlacedesafio`
  ADD KEY `idDesafio` (`idDesafio`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idGrupo` (`idGrupo`),
  ADD KEY `idCreador` (`idCreador`);

--
-- Indices de la tabla `equipoestudiante`
--
ALTER TABLE `equipoestudiante`
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `idEstudiante` (`idEstudiante`);

--
-- Indices de la tabla `escrito`
--
ALTER TABLE `escrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indexDesafio` (`idDesafio`) USING BTREE,
  ADD KEY `indexGrupo` (`idGrupo`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD KEY `idEquipo` (`idEquipo`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idprofesor` (`idprofesor`);

--
-- Indices de la tabla `grupoestudiante`
--
ALTER TABLE `grupoestudiante`
  ADD KEY `idEstudiante` (`idEstudiante`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indices de la tabla `media_desafio`
--
ALTER TABLE `media_desafio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `desafio`
--
ALTER TABLE `desafio`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `escrito`
--
ALTER TABLE `escrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `media_desafio`
--
ALTER TABLE `media_desafio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `desafio`
--
ALTER TABLE `desafio`
  ADD CONSTRAINT `desafio_ibfk_1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `desafio_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `enlacedesafio`
--
ALTER TABLE `enlacedesafio`
  ADD CONSTRAINT `enlacedesafio_ibfk_1` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`);

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `equipo_ibfk_1` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipo_ibfk_2` FOREIGN KEY (`idCreador`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `equipoestudiante`
--
ALTER TABLE `equipoestudiante`
  ADD CONSTRAINT `equipoestudiante_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `equipoestudiante_ibfk_2` FOREIGN KEY (`idEstudiante`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `escrito`
--
ALTER TABLE `escrito`
  ADD CONSTRAINT `escrito_ibfk_1` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD CONSTRAINT `estudiante_ibfk_1` FOREIGN KEY (`idEquipo`) REFERENCES `equipo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_ibfk_2` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`idprofesor`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `grupoestudiante`
--
ALTER TABLE `grupoestudiante`
  ADD CONSTRAINT `grupoestudiante_ibfk_1` FOREIGN KEY (`idEstudiante`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `grupoestudiante_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
