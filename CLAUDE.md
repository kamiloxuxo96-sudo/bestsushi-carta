# Carta Bestsushi — instrucciones para Claude

Sitio estático (HTML + JS, sin build) publicado en **bestsushi.cl** con Vercel.
Cada commit a la rama `main` se publica solo en 1–2 minutos. No hay que tocar Vercel.

## Archivos
- `menu.js` → **todo el contenido**: productos, precios, descripciones, fotos, opciones "a elección", horario, número de WhatsApp y destacados (Roll del mes). Casi todos los cambios se hacen aquí.
- `index.html` → diseño y funcionamiento. **No modificar** salvo que el usuario pida un cambio de diseño explícito.
- `fotos/` → fotos de productos (.jpg). `marca/` → logo (no tocar).

## Cómo hacer los cambios más comunes
- **Cambiar un precio:** en `menu.js`, busca el producto por su nombre (`n:'...'`) y cambia `p:`. Solo números, sin puntos ni `$` (ej. `p:6900`).
- **Ocultar un producto por un día** (se acabó un ingrediente): agrega `oculto:true` al producto. Para mostrarlo de nuevo, bórralo. No borres el producto.
- **Agregar un producto:** copia uno de la misma categoría, dale un `id` nuevo y único (ej. `e12`), nombre, precio y descripción.
- **Cambiar el Roll del mes:** en `FEATURED`, el primer elemento es el Roll del mes: `['id-del-producto','nombre-foto','Roll del mes']`. La cuenta regresiva de días es automática.
- **Horario:** `HOURS` (días: 0=domingo, 1=lunes … 6=sábado; horas `'HH:MM'`).
- **WhatsApp:** `WA_NUMBER` con código de país, sin `+` ni espacios.

## Fotos
- Antes de subir una foto nueva, **recórtala cuadrada y redúcela a 800×800 px, JPG calidad ~80** (las fotos del celular pesan 5–15 MB y harían lenta la página). Para destacados (`destacado-*.jpg`) usa 800×1000 px.
- Nombres en minúscula, sin tildes ni espacios, con guiones: `tiger-roll-salmon.jpg`.
- En `menu.js` se escribe el nombre **sin** `.jpg`: `img:'tiger-roll-salmon'`. Si hay varias fotos del mismo roll (variaciones), usa `imgs:['tiger-roll','tiger-roll-2']`; el cliente las desliza.
- Productos sin foto muestran el koi azul automáticamente.

## Reglas
- Responde y escribe en español.
- Haz cambios mínimos; no reformatees todo `menu.js`.
- Después de editar, revisa que `menu.js` siga siendo JavaScript válido (comas, comillas, llaves). Un error ahí deja la carta en blanco.
- Mensaje de commit claro, ej: `Precio Luco Roll a $6.900`.
