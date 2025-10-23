# **Flujo de Usuario Detallado: Plataforma de Gestión de Rutinas (MVP)**

Este flujo se centra en el entrenador de un gimnasio ya registrado y autenticado, cubriendo las tareas principales de creación y despliegue de contenido en la sala.

## **1\. Inicio de Sesión y Acceso**

| Paso | Usuario | Acción | Sistema/App |
| :---- | :---- | :---- | :---- |
| **1.1** | Entrenador | Introduce credenciales (Email/Contraseña) o usa el token de autenticación (Firebase Custom Auth Token). | La App del Entrenador (Web/Móvil) valida credenciales contra Firebase Auth y Firestore. |
| **1.2** | Entrenador | Accede. | La App redirige al **Dashboard Principal**. |

## **2\. Gestión de Contenido: Biblioteca de Ejercicios**

Este paso es crítico para asegurar que la App tenga los videos internos y personalizados del gimnasio.

| Paso | Usuario | Acción | Sistema/App |
| :---- | :---- | :---- | :---- |
| **2.1** | Entrenador | Navega a "Biblioteca de Ejercicios". | El sistema muestra la lista de ejercicios ya cargados para este gimnasio. |
| **2.2** | Entrenador | Selecciona "Añadir Nuevo Ejercicio". | Se abre un formulario. |
| **2.3** | Entrenador | Sube un archivo de video (e.g., demostración del ejercicio). | La App carga el archivo de video al **CDN** y obtiene la URL de reproducción. |
| **2.4** | Entrenador | Rellena detalles: Nombre ("Sentadilla Libre"), Categoría ("Piernas"), Instrucciones. | El sistema almacena la metadata del ejercicio, incluyendo la URL del CDN, en la colección Ejercicios de Firestore. |
| **2.5** | Entrenador | Confirma la creación. | El ejercicio se añade a la biblioteca, listo para ser usado en cualquier rutina. |

## **3\. Creación y Asignación de Rutinas**

El entrenador utiliza el **Constructor de Rutinas** (el prototipo de UI que diseñamos).

| Paso | Usuario | Acción | Sistema/App |
| :---- | :---- | :---- | :---- |
| **3.1** | Entrenador | Selecciona "Crear Nueva Rutina". | Se abre el **Constructor de Rutinas**. |
| **3.2** | Entrenador | Nombra la rutina (e.g., "Full Body Principiante"). | El sistema actualiza el campo name del objeto Rutina. |
| **3.3** | Entrenador | Arrastra o selecciona ejercicios de la Biblioteca (lado izquierdo) y los añade al panel de la rutina (lado derecho). | El sistema añade un nuevo objeto al array exercises dentro del documento Rutina. |
| **3.4** | Entrenador | Configura los Sets/Reps/Pesos/Descansos para cada ejercicio añadido. | El sistema actualiza el array sets dentro del objeto de cada ejercicio en el documento Rutina. |
| **3.5** | Entrenador | Selecciona "Guardar Rutina". | El sistema persiste el documento completo en la colección Rutinas de Firestore. |
| **3.6** | Entrenador | Asigna la rutina al cliente X (Selección de cliente). | El sistema actualiza el documento del cliente en Clientes para referenciar el ID de la nueva rutina. |

## **4\. Despliegue en TV (Experiencia en Sala)**

Este es el paso final que conecta la acción del entrenador con la experiencia del usuario en el gimnasio.

| Paso | Usuario | Acción | Sistema/App |
| :---- | :---- | :---- | :---- |
| **4.1** | Entrenador | Va al área de clientes y selecciona al **Cliente X** al que se le acaba de asignar la rutina. | La App del Entrenador carga la rutina guardada. |
| **4.2** | Entrenador | Selecciona la opción **"Desplegar en TV"**. | La App del Entrenador (el "Controlador"): |
|  |  |  | 1\. Genera un **ID de Sesión Único** (e.g., 4 dígitos). |
|  |  |  | 2\. Almacena este ID de sesión en una colección temporal de Firestore (e.g., SesionesActivas) junto al ID de la rutina del Cliente X. |
| **4.3** | Cliente/Entrenador | En la TV de la sala, abren la aplicación de visualización (Web/Smart TV App). | La aplicación de la TV muestra una pantalla pidiendo el "Código de Sesión". |
| **4.4** | Entrenador | Ingresa el ID de Sesión (4 dígitos) en la TV. | La aplicación de la TV hace un onSnapshot a la colección SesionesActivas buscando ese código. Al encontrarlo: |
|  |  |  | 1\. Carga los datos de la rutina asociada. |
|  |  |  | 2\. Muestra la pantalla de espera del primer ejercicio. |
| **4.5** | Entrenador | Presiona **"Iniciar Rutina"** en su App móvil (el Controlador). | El Controlador envía una actualización a Firestore (al documento de la sesión) cambiando el estado a "EN CURSO" y el currentExerciseIndex a 0\. |
| **4.6** | Cliente/TV | La TV, escuchando el onSnapshot (en tiempo real), actualiza la vista: |  |
|  |  |  | 1\. Muestra el nombre del ejercicio (Sentadilla Libre). |
|  |  |  | 2\. Reproduce el video explicativo en loop desde el CDN. |
|  |  |  | 3\. Muestra las series y repeticiones (ej. 3 x 10). |
| **4.7** | Entrenador | Presiona **"Siguiente Ejercicio"** o **"Pausa"** en su App móvil. | El Controlador actualiza el currentExerciseIndex y/o el estado de la sesión en Firestore. La TV reacciona instantáneamente. |

