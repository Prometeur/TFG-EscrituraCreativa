-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2022 a las 20:11:25
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

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
(1, 'fantástico maravilloso'),
(2, 'fantástico realismo mágico'),
(3, 'fantástico'),
(4, 'policíaco detectivesco'),
(5, ' policiaco negro'),
(6, ' policiaco thriller'),
(7, ' policiaco espionaje'),
(8, ' memoria autobiografía'),
(9, 'memoria'),
(10, 'memoria confesión'),
(11, 'memoria diario'),
(12, 'carnavelescos parodia '),
(13, 'carnavelescos humor'),
(14, 'carnavelescos sátira'),
(15, 'testimoniales crónica literaria'),
(16, 'testimoniales diario'),
(17, 'históricos'),
(18, 'bildungsroman'),
(19, 'literatura infantil'),
(20, 'ensayo creativo'),
(21, 'literaturas digitales literaturas expandidas'),
(22, 'literaturas digitales cibernarrativa'),
(23, 'literaturas digitales ciberpoesía'),
(24, 'literaturas transmediales'),
(25, 'cine'),
(26, 'storyboard');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coleccion`
--

CREATE TABLE `coleccion` (
  `id` int(9) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `idProfesor` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coleccion`
--

INSERT INTO `coleccion` (`id`, `nombre`, `activo`, `idProfesor`, `idGrupo`) VALUES
(3, 'Siglo XXI', 1, 4, 3),
(4, 'Análisis sintáctico', 1, 4, 4),
(6, 'Siglo XVIII', 1, 4, 3),
(7, 'Animales', 1, 4, 6),
(8, 'Modernismo', 0, 4, 8),
(29, 'Rosalía de Castro', 1, 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colecciondesafio`
--

CREATE TABLE `colecciondesafio` (
  `id` int(9) NOT NULL,
  `idColeccion` int(9) NOT NULL,
  `idDesafio` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `colecciondesafio`
--

INSERT INTO `colecciondesafio` (`id`, `idColeccion`, `idDesafio`) VALUES
(3, 3, 3),
(4, 6, 3),
(7, 4, 50),
(8, 3, 345);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desafio`
--

CREATE TABLE `desafio` (
  `id` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `descripcion` mediumtext NOT NULL,
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

INSERT INTO `desafio` (`id`, `idGrupo`, `titulo`, `descripcion`, `tipoCalificacion`, `idCategoria`, `colaborativo`, `fechaIni`, `fechaFin`, `activo`) VALUES
(3, 3, 'Relatar un Episodio Nacional', 'Narrar de forma satírica y breve uno de los Episodios Nacionales de Benito Pérez Galdós.', 0, 17, 1, '2021-11-29 16:09:45', '2022-11-30 16:04:51', 1),
(40, 5, 'Redacta un poema dadaísta.', 'Dada', 10, 23, 1, '2021-11-29 16:27:17', '2022-11-30 16:26:20', 1),
(50, 4, 'Desafío: resumen sobre la lingüística de Noam Chomsky.', 'Resumen donde el mejor texto será aquel que exprese con claridad y precisión las ideas aportadas al pensamiento y al lenguaje por Noam Chomsky.', 100, 20, 1, '2021-11-29 16:20:40', '2022-12-30 16:17:45', 1),
(67, 2, 'Noticia sensacionalista.', 'Se trata de escribir la noticia de la forma más sensacionalista posible, pero de forma sútil.', 5, 20, 1, '2021-11-29 16:24:59', '2022-11-30 16:20:57', 1),
(101, 1, 'Ensayo sobre el impacto de la movida madrileña en la escritura de Michi Panero.', 'Ensayo sobre el impacto que tuvo la movida madrileña, el fenómeno Almodóvar, etc. en la expresión y libros de Michi Panero.', 10, 20, 5, '2021-11-29 16:17:29', '2022-11-30 16:16:02', 1),
(213, 4, 'La Dalia Blanca', 'Eres un policía en África e inestigas la muerte de una joven negra albina, cuyo asesinato es exactamente igual al de la Dalia negra.', 5, 4, 3, '2021-11-29 16:40:31', '2022-11-30 16:36:51', 1),
(234, 6, 'Identifica y explica las diferencias entre un tiburón blanco y un tiburon martillo.', 'Hazlo de manera creativa empleando recursos y figuras literarias, para hacer alusión a su comportamiento y apariencia.', 50, 3, 1, '2021-11-29 16:30:06', '2022-12-30 16:27:23', 1),
(345, 3, 'Redactar una crónica de la historia presente en un mundo distópico', 'Narrar una historia del día a día basada en un mundo totalmente distópico y desolado, en la estética cyberpunk.', 5, 1, 2, '2021-11-29 16:34:09', '2024-10-31 16:30:23', 1),
(432, 1, 'Ponte en la piel de John Galt y redacta tu propio diario', 'Escribe un diario a través de los ojos de John Galt.', 10, 11, 1, '2021-11-29 16:36:20', '2022-12-28 16:34:17', 1),
(434, 5, 'C. Bukowski', '<p>Transforma el poema de Bukowski en un guion audiovisual que no sobrepase las dos páginas. Busca equivalentes semióticos visuales y sonoros. Presta atención a la transcripción de la voz narrativa (nivel y persona).</p>\n', 1, 21, 1, '2022-02-19 17:32:56', '2022-07-12 17:30:00', 1),
(435, 7, 'R. Bolaño', '<p>Transforma el fragmento de Llamadas telefónicas de Bolaño en un diálogo audiovisual (no literario). Utiliza un narrador silente (no uses voz off ni voz over).</p>\n', 1, 25, 1, '2022-02-19 17:38:42', '2022-06-13 17:37:00', 1),
(436, 7, 'Murakami', '<p>Transforma el fragmento de After Dark de Murakami en un storyboard que no sobrepase las dos páginas. Elige el número y la distribución de las viñetas. Puedes utilizar una viñeta multimagen. No puedes utilizar splash page. Utiliza distintos encuadres (angulación, planos, altura, movilidad y distancia).</p>\n', 1, 26, 1, '2022-02-19 17:41:01', '2022-08-15 17:40:00', 1),
(437, 1, 'C. Jung', '<p>Desarrolla el arquetipo jungueano del niño feral en un texto narrativo de no más de dos páginas. Utiliza focalización interna y cero, y al menos un narrador homodiegético.</p>\n', 2, 20, 1, '2022-02-19 17:42:53', '2022-08-14 17:41:00', 1),
(438, 8, 'Empleo de décadrage', '<p>Crea una imagen en décadrage (en ilustración, fotografía, collage, etc.) a partir de la siguiente imagen de Bencicova. Puedes utilizar plano errante, nómada, etc. Ten en cuenta los equivalentes semióticos de los existentes (espaciales y personajes).</p>\n', 1, 22, 1, '2022-02-19 17:45:48', '2022-06-08 17:45:00', 1),
(439, 7, 'Changes - D. Bowie', '<p>Crea un storyboard de Changes (Bowie: https://www.youtube.com/watch?v=4BgF7Y3q-as) que tenga, por lo menos, tres niveles narrativos distintos. Puedes usar metalepsis si la historia lo requiere.</p>\n', 2, 26, 2, '2022-02-19 17:47:40', '2022-07-12 17:46:00', 1),
(440, 8, 'Rui Palha', '<p>Desarrolla la historia de la fotografía de Rui Palha en no más de dos páginas. Utiliza una estructura no cronológica y diferentes subestructuras durativas (igualdad, inserción, expansión, compresión, elipsis).</p>\n', 1, 15, 2, '2022-02-19 17:49:42', '2022-07-12 17:48:00', 1),
(441, 8, 'Requiem - Mozart', '<p>Crea una historia de no más de dos páginas en la que el hipotexto sea Dies Irae del Requiem de Mozart: https://www.youtube.com/watch?v=Zi8vJ_lMxQI</p>\n', 1, 24, 1, '2022-02-19 17:52:22', '2022-09-13 17:50:00', 1),
(442, 7, 'Desarrollo de una historia', '<p>Desarrolla una historia de no más de dos páginas en la que existan por los menos tres textos en relación intertextual. Sólo puedes utilizar la repetición de contenido si aporta nueva información al texto. Considera los equivalentes semióticos presentes en todas las líneas diegéticas.</p>\n', 2, 21, 1, '2022-02-19 17:54:27', '2022-05-10 17:53:00', 1),
(443, 7, 'Elección de un cuento infantil y desarrollo de dos mundos conectados a él', '<p>Elige un cuento infantil y desarrolla dos mundos posibles asociados a él. Puedes usar imagen (fija o en movimiento), palabras o sonido. Las líneas narrativas de todos los mundos deben mantener relaciones semióticas (denotativas y connotativas).</p>\n', 1, 19, 1, '2022-02-19 17:56:10', '2022-05-01 17:54:00', 1),
(445, 3, 'Acontecimientos primera década', '<p>Narrar los acontecimientos más importantes de la primera década</p>\n', 2, 17, 2, '2022-05-12 18:19:25', '2022-12-08 18:17:00', 1);

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
(74, 'hipotenusa', 1, 6, 4),
(75, 'equilatero', 1, 16, 3),
(76, 'vector', 1, 6, 3),
(78, 'pollo', 1, 9, 3),
(80, 'yop', 1, 22, 3),
(81, 'Química', 1, 23, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipoestudiante`
--

CREATE TABLE `equipoestudiante` (
  `id` int(9) NOT NULL,
  `idEquipo` int(9) NOT NULL,
  `idEstudiante` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `equipoestudiante`
--

INSERT INTO `equipoestudiante` (`id`, `idEquipo`, `idEstudiante`) VALUES
(137, 74, 6),
(145, 75, 16),
(148, 76, 6),
(152, 78, 9),
(154, 80, 22),
(156, 81, 23),
(163, 81, 22),
(164, 80, 23);

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
  `registro` longtext NOT NULL,
  `puntuacion` float NOT NULL,
  `comentario` mediumtext NOT NULL,
  `colaborativo` tinyint(1) NOT NULL,
  `finalizado` tinyint(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `escrito`
--

INSERT INTO `escrito` (`id`, `idGrupo`, `idDesafio`, `idEscritor`, `nombre`, `texto`, `registro`, `puntuacion`, `comentario`, `colaborativo`, `finalizado`, `fecha`, `activo`) VALUES
(147, 1, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', '', 0, '', 1, 1, '2022-02-21 19:28:49', 1),
(151, 3, 3, 22, 'Prueba 4.4', '<p>4.4</p>\r\n\r\n', '', 0, '', 1, 0, '2022-02-27 19:13:27', 1),
(154, 8, 441, 22, 'Escrito Mozart', '<p>Érase una vez un escrito muy largo.</p>\n', '', 0, '', 1, 0, '2022-03-25 11:18:10', 1),
(155, 1, 432, 22, '2.1', '<p>Este el 2º escrito para este desafío.</p>\n', '', 0, '', 1, 0, '2022-04-03 09:43:07', 1),
(158, 3, 3, 23, 'Don Quijote de la Mancha', '<p>Done</p>\n', '', 0, '', 1, 0, '2022-04-20 12:52:18', 1),
(159, 1, 437, 22, 'w', '<p>a</p>\n', '', 0, '', 1, 0, '2022-04-23 17:41:30', 1),
(160, 5, 434, 22, 'a2', '<p>a2</p>\n', '', 0, '', 1, 0, '2022-04-24 00:02:23', 1),
(170, 3, 345, 80, 'Una vida anormal', '<p>Fin</p>\n', '', 0, '', 2, 0, '2022-05-11 20:36:46', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `id` int(9) NOT NULL,
  `idEquipo` int(9) NOT NULL,
  `creadorEquipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
(1, 4, 'Filosofía', 1),
(2, 4, 'Periodismo', 1),
(3, 4, 'Historia', 1),
(4, 4, 'Lengua', 1),
(5, 4, 'Poesía', 1),
(6, 4, 'Biología', 1),
(7, 4, 'Literatura', 1),
(8, 4, 'Arte', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupoestudiante`
--

CREATE TABLE `grupoestudiante` (
  `id` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL,
  `idEstudiante` int(9) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupoestudiante`
--

INSERT INTO `grupoestudiante` (`id`, `idGrupo`, `idEstudiante`, `activo`) VALUES
(1, 3, 6, 1),
(2, 3, 7, 1),
(3, 4, 9, 1),
(4, 3, 9, 1),
(5, 3, 16, 1),
(7, 4, 6, 1),
(9, 4, 16, 1),
(10, 1, 22, 1),
(11, 3, 22, 1),
(12, 5, 22, 1),
(13, 5, 23, 1),
(14, 1, 23, 1),
(15, 2, 23, 1),
(16, 3, 23, 1),
(17, 4, 23, 1),
(18, 6, 23, 1),
(19, 7, 23, 1),
(20, 2, 22, 1),
(21, 8, 22, 0),
(22, 6, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajeria`
--

CREATE TABLE `mensajeria` (
  `id` int(9) NOT NULL,
  `idGrupo` int(9) NOT NULL,
  `idEmisor` int(9) NOT NULL,
  `idReceptor` int(9) NOT NULL,
  `idCreador` int(9) NOT NULL,
  `mensaje` mediumtext CHARACTER SET utf8 NOT NULL,
  `tipo` int(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `mensajeria`
--

INSERT INTO `mensajeria` (`id`, `idGrupo`, `idEmisor`, `idReceptor`, `idCreador`, `mensaje`, `tipo`, `fecha`, `activo`) VALUES
(84, 5, 22, 23, 81, 'Veronica Calzada te envía una petición para unirse a tu equipo \'Química\' del Grupo \'Poesía\'', 2, '2022-04-18 17:14:36', 0),
(92, 3, 22, 23, 80, 'Veronica Calzada te envía una invitación para unirte a su equipo yop del Grupo de Historia', 0, '2022-04-19 09:39:35', 1),
(93, 3, 23, 22, 80, 'Jaime Madriñan te envía una petición para unirse a tu equipo \'yop\' del Grupo \'Historia\'', 2, '2022-04-19 09:50:35', 0),
(94, 5, 23, 22, 81, 'Jaime Madriñan te envía una invitación para unirte a su equipo Química del Grupo de Poesía', 0, '2022-04-19 09:52:28', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimediadesafio`
--

CREATE TABLE `multimediadesafio` (
  `id` int(11) NOT NULL,
  `idDesafio` int(9) NOT NULL,
  `ruta` text NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `multimediadesafio`
--

INSERT INTO `multimediadesafio` (`id`, `idDesafio`, `ruta`, `fecha`) VALUES
(250, 435, 'http://localhost:3001/multimedia/users/4/435/application/2. Llamadas telefónicas.pdf', '2022-02-19 18:00:09'),
(251, 436, 'http://localhost:3001/multimedia/users/4/436/application/3. After Dark.pdf', '2022-02-19 18:00:48'),
(252, 438, 'http://localhost:3001/multimedia/users/4/438/image/5. Evelyn Bencicova.jpg', '2022-02-19 18:01:21'),
(253, 440, 'http://localhost:3001/multimedia/users/4/440/image/7. Rui Palha.jpg', '2022-02-19 18:01:45'),
(256, 434, 'http://localhost:3001/multimedia/users/4/434/application/1. The Bluebird.pdf', '2022-04-03 11:23:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `multimediaescrito`
--

CREATE TABLE `multimediaescrito` (
  `id` int(9) NOT NULL,
  `idEscritor` int(11) NOT NULL,
  `idDesafio` int(11) NOT NULL,
  `ruta` text CHARACTER SET utf8 DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `multimediaescrito`
--

INSERT INTO `multimediaescrito` (`id`, `idEscritor`, `idDesafio`, `ruta`, `fecha`, `orden`) VALUES
(141, 22, 3, 'http://localhost:3001/multimedia/users/22/3/image/anadir-grupo.png', '2022-04-11 11:15:50', 0),
(143, 80, 345, 'http://localhost:3001/multimedia/teams/80/345/image/circuloVerde.png', '2022-04-11 12:46:48', 0),
(148, 22, 434, 'http://localhost:3001/multimedia/users/22/434/10/image/add-member.png', '2022-04-24 10:58:46', 0),
(149, 22, 432, 'http://localhost:3001/multimedia/users/22/432/19/image/add-user.png', '2022-04-26 11:32:58', 0);

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
  `foto` blob NOT NULL,
  `ruta` text NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `rol` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `correo`, `password`, `nombre`, `apellidos`, `foto`, `ruta`, `activo`, `rol`) VALUES
(4, 'cora@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'cora', 'cora2', '', '', 1, 'T'),
(6, 'genesis@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'Genesis', 'Duque', 0x433a5c66616b65706174685c6469676974616c2e6a7067, 'http://localhost:3001/multimedia/users/6/user6.jpg', 1, 'S'),
(7, 'gonzalo@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'Gonzalo', 'Rivas', '', '', 1, 'S'),
(8, 'adrian@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'adrian', 'riesco', '', '', 1, 'A'),
(9, 'luis@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'LuisJ', 'Jaramillo', 0x433a5c66616b65706174685c616c61736b612e6a7067, 'http://localhost:3001/multimedia/users/9/user9.jpg', 1, 'S'),
(10, 'stefano@ucm.es', '$2a$08$yobEY52jl8G2FpN6Nhd7nOLVjNdn96A1GWGQwHuJFREpmMcsUye9G', 'Stefano', 'Flores', '', '', 1, 'S'),
(16, 'pedro@ucm.es', '$2a$08$/fYrEGbexRF6udkEeon5CuNNhyzfex0iX/8rMafYfbW5YrayYwp6e', 'Pedro', 'Suárez', '', '', 0, 'S'),
(22, 'verocalz@ucm.es', '$2a$08$lgCGabRYw.tBLr1YpYvbhevYwqtR/4H0O1vLTojIE55hpU79OIBWu', 'Veronica', 'Calzada', '', '', 1, 'S'),
(23, 'jaime@ucm.es', '$2a$08$PIaxHyktmBi0.UOWUWjJDOJgNf1EHe7IkjvC.w3sK4g.CUnhGQ0Au', 'Jaime', 'Madriñan', '', '', 1, 'S');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versionescrito`
--

CREATE TABLE `versionescrito` (
  `idEscrito` int(11) NOT NULL,
  `idVersion` int(11) NOT NULL,
  `idDesafio` int(9) NOT NULL,
  `idEscritor` int(9) NOT NULL,
  `nombre` varchar(250) CHARACTER SET utf8 NOT NULL,
  `texto` longtext CHARACTER SET utf8 NOT NULL,
  `colaborativo` tinyint(1) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `versionescrito`
--

INSERT INTO `versionescrito` (`idEscrito`, `idVersion`, `idDesafio`, `idEscritor`, `nombre`, `texto`, `colaborativo`, `fecha`, `activo`) VALUES
(147, 1, 432, 22, '1', '2', 1, '2022-02-21 19:28:49', 1),
(151, 1, 3, 22, 'Prueba 4', '<p>123456</p>\n', 1, '2022-02-27 19:13:27', 0),
(152, 1, 345, 80, 'Prueba1', '<p>AAAA</p>\r\n', 2, '2022-03-19 12:31:40', 0),
(154, 1, 441, 22, 'Escrito Mozart', '<p>Érase una vez ...</p>\n', 1, '2022-03-25 11:18:10', 0),
(155, 1, 432, 22, '2.0', '<p>Este el 2º escrito para este desafío.</p>\n', 1, '2022-04-03 09:43:07', 0),
(158, 1, 3, 23, 'Don Quijote de la Mancha', '<p>Done</p>\n', 1, '2022-04-20 12:52:18', 0),
(159, 1, 437, 22, 'w', '<p>a</p>\n', 1, '2022-04-23 17:41:30', 0),
(160, 1, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:02:23', 0),
(147, 2, 432, 22, 'Hola', 'Me llamo Juan', 1, '2022-02-21 19:28:49', 1),
(151, 2, 3, 22, 'Prueba 4.2', '<p>12345678</p>\n', 1, '2022-02-27 20:14:59', 0),
(152, 2, 345, 80, 'Prueba2', '<p>BBBB</p>\n', 2, '2022-03-19 11:46:40', 0),
(154, 2, 441, 22, 'Escrito Mozart', '<p>Érase una vez  un escrito muy largo.</p>\n', 1, '2022-05-09 18:46:17', 0),
(155, 2, 432, 22, '2.1', '<p>Este el 2º escrito para este desafío.</p>\n', 1, '2022-04-11 13:56:10', 0),
(160, 2, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:04:04', 0),
(147, 3, 432, 22, 'H', '3', 1, '2022-02-23 19:19:13', 1),
(151, 3, 3, 22, 'Prueba 4.3', '<p>12</p>\n', 1, '2022-02-27 20:20:58', 0),
(152, 3, 345, 80, 'Prueba3', '<p>AABB</p>\n<p></p>\n', 2, '2022-03-19 11:47:03', 0),
(154, 3, 441, 22, 'Mozart', '<p>Érase una vez un escrito muy largo.</p>\n', 1, '2022-05-09 18:46:51', 0),
(160, 3, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:07:08', 0),
(147, 4, 432, 22, 'Hola J.A.', '<p>Me llamo Juan Antonio</p>\n', 1, '2022-02-26 12:12:45', 0),
(151, 4, 3, 22, 'Prueba 4.4', '<p>4.4</p>\n', 1, '2022-03-19 13:18:10', 0),
(152, 4, 345, 80, 'Prueba4', '<p>ABCD</p>\n', 2, '2022-03-19 12:18:14', 0),
(154, 4, 441, 22, 'Escrito Mozart', '<p>Érase una vez un escrito muy largo.</p>\n', 1, '2022-05-10 17:39:27', 0),
(160, 4, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:09:37', 0),
(147, 5, 432, 22, '1, 2', '<p>2, 3, 4, 5</p>\n', 1, '2022-02-26 12:14:17', 0),
(151, 5, 3, 22, 'Prueba 4.4', '<p>4.4</p>\r\n\r\n', 1, '2022-04-03 10:01:15', 0),
(152, 5, 345, 80, 'Prueba2', '<p>BBBB</p>\n', 2, '2022-03-19 12:19:12', 0),
(160, 5, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:10:33', 0),
(147, 6, 432, 22, 'Hola J.A.', '<p>Me llamo Juan Antonio</p>\n', 1, '2022-03-17 19:12:06', 0),
(151, 6, 3, 22, 'Prueba 4.4', '<p>4.4</p>\r\n\r\n', 1, '2022-04-11 11:15:50', 0),
(152, 6, 345, 80, 'Prueba5', '<p>AABB</p>\n<p></p>\n', 2, '2022-03-19 12:21:23', 0),
(160, 6, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 00:19:23', 0),
(147, 7, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-03-26 18:04:52', 0),
(152, 7, 345, 80, 'Prueba6.2', '<p>AACC</p>\n', 2, '2022-03-19 12:33:03', 0),
(160, 7, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 10:16:32', 0),
(147, 8, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-03 10:02:06', 0),
(152, 8, 345, 80, 'Prueba7', '<p>DDDD</p>\n', 2, '2022-03-19 12:55:49', 0),
(160, 8, 434, 22, 'a', '<p>a</p>\n', 1, '2022-04-24 10:20:05', 0),
(147, 9, 432, 22, '1', '<p>2</p>\n<p>2</p>\n', 1, '2022-04-04 17:17:11', 0),
(152, 9, 345, 80, 'Prueba7.2', '<p>ABCD</p>\n', 2, '2022-03-19 13:13:20', 0),
(160, 9, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 10:57:15', 0),
(147, 10, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-11 11:04:19', 0),
(160, 10, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 10:58:46', 0),
(147, 11, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-23 11:01:30', 0),
(152, 11, 345, 80, 'Prueba7.3', '<p>AACC</p>\n', 2, '2022-04-11 12:46:48', 0),
(160, 11, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:24:48', 0),
(147, 12, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-23 11:01:51', 0),
(152, 12, 345, 80, 'Prueba7.2', '<p>ABCD</p>\n', 2, '2022-04-11 13:35:33', 0),
(160, 12, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:29:09', 0),
(147, 13, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-23 11:12:07', 0),
(152, 13, 345, 80, 'Prueba7.2', '<p>ABCD</p>\n', 2, '2022-04-11 13:39:41', 0),
(160, 13, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:31:14', 0),
(147, 14, 432, 22, '1', '<p>2</p>\n', 1, '2022-04-23 12:10:29', 0),
(152, 14, 345, 80, 'Prueba7.3', '<p>ABCDEFGH</p>\n', 2, '2022-04-11 13:44:03', 0),
(160, 14, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:31:53', 0),
(147, 15, 432, 22, '', '<p></p>\n', 1, '2022-04-23 12:14:02', 0),
(152, 15, 345, 80, 'Prueba7.4', '<p>AB</p>\n', 2, '2022-04-11 13:48:22', 0),
(160, 15, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:33:20', 0),
(147, 16, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-04-23 12:20:29', 0),
(160, 16, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:34:49', 0),
(147, 17, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-04-24 00:14:50', 0),
(160, 17, 434, 22, 'a2', '<p>a2</p>\n', 1, '2022-04-24 11:35:52', 0),
(147, 18, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-04-24 00:17:09', 0),
(147, 19, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-04-26 11:32:58', 0),
(147, 20, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-04-26 11:33:36', 0),
(147, 21, 432, 22, '1', '<p>4.4</p>\n<p>2</p>\n<p>4.4</p>\n<p>2</p>\n', 1, '2022-05-09 12:59:37', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coleccion`
--
ALTER TABLE `coleccion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCreador` (`idProfesor`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indices de la tabla `colecciondesafio`
--
ALTER TABLE `colecciondesafio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idColeccion` (`idColeccion`),
  ADD KEY `idDesafio` (`idDesafio`);

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
  ADD PRIMARY KEY (`id`),
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
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEstudiante` (`idEstudiante`),
  ADD KEY `idGrupo` (`idGrupo`);

--
-- Indices de la tabla `mensajeria`
--
ALTER TABLE `mensajeria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indexEmisor` (`idEmisor`) USING BTREE,
  ADD KEY `indexReceptor` (`idReceptor`) USING BTREE,
  ADD KEY `indexGrupo` (`idGrupo`) USING BTREE;

--
-- Indices de la tabla `multimediadesafio`
--
ALTER TABLE `multimediadesafio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indexDesafio` (`idDesafio`);

--
-- Indices de la tabla `multimediaescrito`
--
ALTER TABLE `multimediaescrito`
  ADD PRIMARY KEY (`id`),
  ADD KEY `indexDesafio` (`idDesafio`) USING BTREE;

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- Indices de la tabla `versionescrito`
--
ALTER TABLE `versionescrito`
  ADD PRIMARY KEY (`idVersion`,`idEscrito`),
  ADD KEY `idDesafio` (`idDesafio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `coleccion`
--
ALTER TABLE `coleccion`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `colecciondesafio`
--
ALTER TABLE `colecciondesafio`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `desafio`
--
ALTER TABLE `desafio`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=446;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT de la tabla `equipoestudiante`
--
ALTER TABLE `equipoestudiante`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT de la tabla `escrito`
--
ALTER TABLE `escrito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `grupoestudiante`
--
ALTER TABLE `grupoestudiante`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `mensajeria`
--
ALTER TABLE `mensajeria`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `multimediadesafio`
--
ALTER TABLE `multimediadesafio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=257;

--
-- AUTO_INCREMENT de la tabla `multimediaescrito`
--
ALTER TABLE `multimediaescrito`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coleccion`
--
ALTER TABLE `coleccion`
  ADD CONSTRAINT `coleccion_ibfk_1` FOREIGN KEY (`idProfesor`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `coleccion_ibfk_2` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `colecciondesafio`
--
ALTER TABLE `colecciondesafio`
  ADD CONSTRAINT `colecciondesafio_ibfk_1` FOREIGN KEY (`idColeccion`) REFERENCES `coleccion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `colecciondesafio_ibfk_2` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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

--
-- Filtros para la tabla `mensajeria`
--
ALTER TABLE `mensajeria`
  ADD CONSTRAINT `grupo_ibfk_3` FOREIGN KEY (`idGrupo`) REFERENCES `grupo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajeria_ibfk_1` FOREIGN KEY (`idEmisor`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajeria_ibfk_2` FOREIGN KEY (`idReceptor`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `multimediadesafio`
--
ALTER TABLE `multimediadesafio`
  ADD CONSTRAINT `multimediadesafio_ibfk_1` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `multimediaescrito`
--
ALTER TABLE `multimediaescrito`
  ADD CONSTRAINT `multimediaescrito_ibfk_1` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `versionescrito`
--
ALTER TABLE `versionescrito`
  ADD CONSTRAINT `versionescrito_ibfk_1` FOREIGN KEY (`idDesafio`) REFERENCES `desafio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
