# Calculadora con Supabase Edge Function

Este proyecto es una aplicación web hecha con **Vite + React + TypeScript** que permite a usuarios autenticados realizar operaciones matemáticas básicas (suma, resta, multiplicación y división) usando una **Edge Function de Supabase**.

## ¿Qué hace este proyecto?

- Permite registrarse e iniciar sesión (incluyendo Google).
- Solo usuarios autenticados pueden acceder a la calculadora.
- La calculadora permite sumar, restar, multiplicar y dividir dos números.
- El cálculo se realiza en una Edge Function de Supabase (no en el frontend).
- El resultado se muestra en pantalla de forma clara y moderna.

## ¿Cómo funciona la Edge Function?

1. El frontend envía una petición a la función `calculator` en Supabase, indicando la operación y los números.
2. La Edge Function recibe la petición, realiza la operación y devuelve el resultado.
3. El frontend muestra el resultado al usuario.

### ¿Cómo logré que funcione la Edge Function?

- Creé la función en el dashboard de Supabase, en la sección **Edge Functions**.
- El código de la función responde correctamente a las peticiones CORS (incluye el header `Access-Control-Allow-Origin` y responde a OPTIONS).
- El frontend usa el cliente de Supabase para invocar la función de forma segura y autenticada.

## Instalación y uso

1. Cloná el repo:
   ```bash
   git clone https://github.com/FranciscoCardo09/calculadora-supabase.git
   cd calculadora-supabase
   ```

2. Instalá dependencias:
   ```bash
   npm install
   ```

3. Configurá las variables de entorno en `.env.local`:
   ```
   VITE_SUPABASE_URL=tu_url_supabase
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```

4. Iniciá el proyecto:
   ```bash
   npm run dev
   ```

5. ¡Listo! Registrate, logueate y usá la calculadora.
