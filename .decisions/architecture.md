# Decisiones de Arquitectura - Gym Blackboard

Este archivo recoge las decisiones arquitectónicas tomadas para el proyecto Gym Blackboard. Se irá ampliando con justificativos, alternativas evaluadas y criterios de aceptación.

1. Backend: por defecto se evaluará Supabase como primera opción por su facilidad, precio y soporte para autenticación/DB/storage. Alternativa: Firebase o backend propio.

2. Frontend: Expo + React Native con `expo-router` y `nativewind` (ya presentes en el proyecto). Mantener como aplicación móvil para entrenadores.

3. Datos: Estructura principal: users (entrenadores), routines, exercises, schedules, tv_displays.

4. CI: GitHub Actions para lint y pruebas.

(Se documentarán decisiones específicas de cada componente en archivos separados.)
