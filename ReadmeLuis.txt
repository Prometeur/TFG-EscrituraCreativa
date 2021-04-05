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
