# Issues propuestas extraídas de `flujo_vistas.md`

Este archivo lista las issues propuestas (títulos, descripciones breves y labels sugeridos). Revísalas y dime qué quieres ajustar.

---

[X] 1. **Login — pantalla inicial (UI)**

- Descripción: Diseño limpio con logo del gimnasio. Formulario de login (email/contraseña). Botones para autenticación con Google. Link a recuperación de clave.
- Labels sugeridos: `type:feature`, `area:frontend`, `priority:high`

2. **Pop-up de error de credenciales (Login)**

- Descripción: Mostrar un popup cuando las credenciales sean incorrectas. Opción “Recuperar clave” y botón “Volver”.
- Labels: `type:feature`, `area:frontend`, `priority:medium`

3. **Recuperación de clave / usuario (UI y flujo)**

- Descripción: Pantalla para solicitar recuperación (email). Integrar con backend/email o instrucción para reset. Mostrar feedback de éxito/fallo.
- Labels: `type:feature`, `area:frontend`, `area:backend`, `priority:high`

4. **Mensaje de error en recuperación de clave**

- Descripción: Pantalla o popup que indique el fallo en recuperación. Texto sugiriendo contactar soporte y botón “Volver” al Login.
- Labels: `type:feature`, `area:frontend`, `priority:low`

5. **Dashboard Coach — pantalla principal**

- Descripción: Franja superior con nombre y avatar del coach. Cuadro central con hasta 10 “rutinas más usadas”. Barra inferior con: Inicio, Rutinas, TV. Diseño móvil.
- Labels: `type:feature`, `area:frontend`, `priority:high`

6. **Pop-up al seleccionar rutina rápida (desde Dashboard)**

- Descripción: Modal deslizable con opciones: “Proyectar a TV” y “Volver”. Bloquear fondo.
- Labels: `type:feature`, `area:frontend`, `priority:medium`

7. **Lista de Rutinas — pantalla de gestión**

- Descripción: Lista desplazable de rutinas; pestañas “Funcional” y “Musculación”; orden por fecha; botón “Crear Nueva Rutina”.
- Labels: `type:feature`, `area:frontend`, `priority:high`

8. **Pop-up de opciones en la lista de rutinas**

- Descripción: Popup con: editar, eliminar, proyectar, volver. Mostrar nombre de la rutina.
- Labels: `type:feature`, `area:frontend`, `priority:medium`

9. **Editar Rutina — UI**

- Descripción: Interfaz para modificar una rutina existente (reordenar, editar ejercicios).
- Labels: `type:feature`, `area:frontend`, `priority:high`

10. **Crear Rutina — selección de ejercicios (UI)**

- Descripción: Flujo para crear nueva rutina: nombre, contador de ejercicios, switch de calentamiento, pestañas por parte del cuerpo, checkbox por ejercicio, barra Funcional/Musculación.
- Labels: `type:feature`, `area:frontend`, `priority:high`

11. **Configuración de ejercicios y guardado (flujo de creación)**

- Descripción: Ajustes por ejercicio (reps/series/rounds), eliminar ejercicio, botones Guardar y Volver. Rutina guardada aparece como más reciente.
- Labels: `type:feature`, `area:frontend`, `area:backend`, `priority:high`

12. **Vista de Proyección en TV (pantalla Coach)**

- Descripción: Pantalla TV accesible desde nav inferior; muestra transmisión activa o mensaje “Aún no se ha iniciado la transmisión”.
- Labels: `type:feature`, `area:frontend`, `priority:high`

13. **Reproductor de ejercicio en TV (loop) + metadatos**

- Descripción: Reproductor en loop del ejercicio actual; mostrar nombre y series/repeticiones; controles mínimos (play/pause/next).
- Labels: `type:feature`, `area:frontend`, `area:backend`, `priority:high`

14. **Comando “Proyectar a TV” (acción)**

- Descripción: Endpoint/acción para iniciar transmisión a TV objetivo; definir comportamiento (eventos, sockets).
- Labels: `type:task`, `area:backend`, `priority:high`

15. **Manejo de sesiones de TV / sincronización**

- Descripción: Persistir sesiones activas (coach, rutina, posición). Endpoints para iniciar/detener/estado. Considerar WebSocket/Realtime.
- Labels: `type:task`, `area:backend`, `priority:high`

16. **Guardado y modelo de datos básicos (tarea técnica)**

- Descripción: Definir esquema para `routines`, `exercises`, `users`, `tv_displays`. Crear endpoints CRUD para rutinas.
- Labels: `type:task`, `area:backend`, `priority:high`

17. **Tests básicos de UI y flujo crítico (tarea)**

- Descripción: Pruebas mínimas (E2E/unit) para login, crear/guardar rutina, iniciar proyección.
- Labels: `type:task`, `area:frontend`, `priority:medium`

18. **Documentación del flujo de vistas (archivo)**

- Descripción: Añadir `flujo_vistas.md` en `docs/` o Wiki y referenciar en README. Incluir diagramas/wireframes si hay.
- Labels: `type:task`, `area:documentation`, `priority:low`

19. **Crear Project clásico (Kanban) y columnas**

- Descripción: Crear Project clásico con columnas: To do / In progress / Done. Agregar issues iniciales a To do.
- Labels: `type:task`, `area:infra`, `priority:low`

20. **Crear labels y milestone (infra)**

- Descripción: Crear labels y milestone `MVP v1` (due: 2025-12-31).
- Labels: `type:task`, `area:infra`, `priority:low`

---

> Nota: Si quieres que cree ya las labels/milestone antes de las issues, indícalo. Para la prueba crearé las 2–3 issues que confirmes (o una, como pediste).
