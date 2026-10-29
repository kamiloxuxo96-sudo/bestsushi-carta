// Dónde se guarda lo que Gaspar cambia en el panel: un archivo JSON en Vercel Blob.
import { get, put } from '@vercel/blob';

export const DOC = 'carta/carta.json';

export async function leer() {
  const r = await get(DOC, { access: 'public', useCache: false });
  if (!r || r.statusCode !== 200 || !r.stream) return null;
  return JSON.parse(await new Response(r.stream).text());
}

export async function escribir(data) {
  await put(DOC, JSON.stringify(data), {
    access: 'public', addRandomSuffix: false, allowOverwrite: true,
    contentType: 'application/json', cacheControlMaxAge: 60,
  });
}

export async function subirFoto(nombre, buf) {
  const slug = String(nombre || 'foto').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'foto';
  const r = await put(`fotos/${slug}.jpg`, buf, { access: 'public', contentType: 'image/jpeg', addRandomSuffix: true });
  return r.url;
}
