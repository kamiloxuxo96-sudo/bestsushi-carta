# Carta Bestsushi — instrucciones para Claude

Sitio estático (HTML + JS, sin build) publicado en **bestsushi.cl** con Vercel.
Cada commit a la rama `main` se publica solo en 1–2 minutos. No hay que tocar Vercel.

## Panel de Gaspar (bestsushi.cl/admin/) — lo que manda
- Gaspar maneja desde el panel (con clave): **precio, nombre, descripción, categoría, foto, opciones, agotado hoy, mostrar en carta, Roll del mes, productos nuevos** y **Hoy** (Automático / Abierto / Cerrado, horario y aviso).
- Eso se guarda en **Vercel Blob** (`carta/carta.json`) mediante las funciones `api/panel.js` (guardar, con la clave `PANEL_CLAVE`, variable de entorno en Vercel) y `api/carta.js` (la carta lo lee al abrir). Las fotos del panel quedan en Blob (`fotos/…`).
- **Lo que diga el panel manda sobre `menu.js`.** Si el usuario pide cambiar un precio, un agotado o el Roll del mes, dile que lo haga en el panel; cambiarlo en `menu.js` no se verá si el panel ya tiene ese producto guardado.
- `menu.js` sigue siendo la base: fotos originales, opciones de los productos originales, promociones (lista de rolls), sugerencias del carrito, y el respaldo si el panel no responde.
- Si agregas un producto en `menu.js`, también aparecerá en el panel recién cuando Gaspar lo guarde; avísale.
- No pongas la clave del panel en ningún archivo del repositorio.

## Archivos
- `menu.js` → **todo el contenido**: productos, precios, descripciones, fotos, opciones "a elección", horario, número de WhatsApp y destacados (Roll del mes). Casi todos los cambios se hacen aquí.
- `index.html` → diseño y funcionamiento. **No modificar** salvo que el usuario pida un cambio de diseño explícito.
- `fotos/` → fotos de productos (.jpg). `marca/` → logo (no tocar).

## Cómo hacer los cambios más comunes
- **Cambiar un precio:** en `menu.js`, busca el producto por su nombre (`n:'...'`) y cambia `p:`. Solo números, sin puntos ni `$` (ej. `p:6900`).
- **Se acabó por hoy:** agrega `agotado:true` al producto. Se ve en gris con "Agotado hoy" y no se puede pedir. Al día siguiente, bórralo.
- **Ocultar un producto** (ya no se vende o falta información): agrega `oculto:true`. Para mostrarlo de nuevo, bórralo. No borres el producto.
- **Agregados con precio** (ej. vegetal extra en handrolls): en `OPTS`, el grupo lleva `extra:500` y el precio se suma solo.
- **Agregar un producto:** copia uno de la misma categoría, dale un `id` nuevo y único (ej. `e12`), nombre, precio y descripción.
- **Cambiar el Roll del mes:** en `FEATURED`, el primer elemento es el Roll del mes: `['id-del-producto','nombre-foto','Roll del mes']`. La cuenta regresiva de días es automática.
- **Sugerencias del carrito ("¿Le sumas algo?"):** en `menu.js`, lista `SUGERIDOS`: `['id','opción','nombre corto']`. Solo aparecen si el cliente aún no los tiene en el pedido.
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
