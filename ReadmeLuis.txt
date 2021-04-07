Modificaciones en usuarios

	controllerAuth.js
		-signin //agregado campo surname
	
Modificaciones en profesores

	EditChallenge
		-Cargar ficheros multimedia
		
	CreateChallenge
		-Cargar ficheros multimedia
	
	TeacherService
		-sendMultimedia, agregado campo type como parametro para el almacenamiento de carpetas del usuario, dividiendo carpetas por usuarios y equipos
		
	ControllerTeacher
		-SendMultimedia 

Modificacioens de estudiantes

	
	App.js 
		-agregado mensajeria
	GroupStudent 
		-agregado selectores, desafios, escritos, equipos y sus respectivas componentes
	Sidebar.js
	
	Agregados 14 componentes referentes a mensajeria, desafios, equipos....
	
Cosas que no he conseguido corregir

	En estudiantes solapamiento con el sidebar con el container al seleccionar grupos
--------------------------------------------------------------------------------------------------------------------
Cambios Luis 31/03/2021

EditWriting
-Agregado modal para eliminarFichero
-ver un fichero multimedia del desafio te abre una nueva ventana
-Corregido variables en el estado que se usaban, borrado codigos comentados,etc

CreateWriting 

-Corregido variables que no se usaban, 
-abrir nueva ventana al visualizar fichero multimedia del desafio

ViewMultimedia 
-Agregado por el momento no se usa, problema si al crearEscrito/editarEscrito abrir una pagina que contenga el fichero multimedia 
del desafio, se pierde los campos actuales del escrito, al redirijirte a una nueva pagina de viewMultimedia

teamStudent 
-Quitando codigo comentado

--------------------------------------------------------------------------------------------------------------------
Cambios Luis 07/04/2021


Student 

ChallengesStudent
-Creada funcion "disabledButtonEdit" para desactivar boton editar desafio
-Creada funcion "disabledButtonCreate" para desactivar boton crearr desafio
-Desactivar el boton de crear/editar si la fecha del desafio expiro

	
ChallengesTeam

-Creada funcion "disabledButtonEdit" para desactivar boton editar desafio
-Creada funcion "disabledButtonCreate" para desactivar boton crearr desafio
-Desactivar boton si no tiene equipo 
-Desactivar boton editar/crear escrito si la fecha del desafio expiro
-Creada funcion que devuelve el nombre del equipo(Agregada campo nombre del equipo a la tabla)

Chat 
-Creado chat (todavia esta en desarrollo)

CreateWriting

-Agregado campo nombre y toda la funcionalidad que conlleva
-StudentService.getWritingWriter, se ha creado la funcionalidad de StudentService.getWritingWriter que comprueba si existe un escrito creado antes de poder crear
esta funcionalidad se ha hecho pensando cuando se crea un escrito colaborativo,para evitar que se creen varios escritos a la vez 
-creada funcion showTypeChallenge que devuelve el titulo del escrito si es colaborativo o individual
-scroolbar de forma momentanea en el editor de texto
-Agregado scrollbar a los ficheros multimedia desafio/escrito

EditWriting

-Agregado campo nombre y toda la funcionalidad que conlleva
-StudentService.getWritingWriter, se ha creado la funcionalidad de StudentService.getWritingWriter que comprueba si existe un escrito creado antes de poder crear
esta funcionalidad se ha hecho pensando cuando se crea un escrito colaborativo,para evitar que se creen varios escritos a la vez 
-creada funcion showTypeChallenge que devuelve el titulo del escrito si es colaborativo o individual
-scroolbar de forma momentanea en el editor de texto
-Corregido la carga de ficheros multimedia del escrito antes no cargaba bien debido a los anidamientos del callbacks en el componentdidmount
-Agregado scrollbar a los ficheros multimedia desafio/escrito

EditWritingTeam

-Se ha creado a modo de prueba con el chat, es una copia del editWriting aunque no tiene el titulo del escrito ni otras cosas,
mas bien la idea es de prueba de interaccion con el chat

TeamsGroup
-Agregado el campo apellido a los integrantes de un equipo porque puede ocurrir que varios usuarios tengan el mismo nombre

TeamsStudent
-Agregado el nombre de lider y agregado toda la funcionalidad que con ello conlleva(buscar en los integrantes del grupo y compararlo con el idCreador )

ViewWriting
-CReada esta componente se puede ver un escrito ya finalizado con comentario y puntuacion

WritingsStudent
-Corregido para que se visualice correctamente el nombre y el apellido del estudiante

WritingsTeam

-Agregada  para redirijir y visualizar el escrito en equipo

CreateChallenge
-corregido redireccion a teacher al crear/cancelar desafio

RoutesStudent
-Agregada viewWriting y editWritingTeam

-student-StudentService

-agregada getWritingWriter

-EditWriting/sendWriting  agregado campo title del escrito

App.Css 

-contiene estilo del chat

Writing.Css
-agregado el estilo del editor de texto , editorClassName1,etc

Socket
-Agregado socket para la interaccion entre el cliente y el server 

client/package.json
-agregado socket

server/package.json
-agregado socket

server/src/app.js

-agregado la comunicacion mediante el socket entre el server y el cliente

RouterStudent
-getWritingWriter

ControllerStudent

-sendWriting agregado campo title del escrito
-editWriting agregado campo title del escrito
-getWritingWriter
-sendMultimedia/deleteMultimedia  req.headers.host que me obtiene la url del server , y no como lo hacia antes a capon

modelStudent
-sendWriting agregado campo title del escrito
-editWriting agregado campo title del escrito
-getWritingWriter