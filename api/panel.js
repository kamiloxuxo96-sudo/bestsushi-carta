// POST /api/panel → acciones del panel de Gaspar. Protegido con la clave PANEL_CLAVE (variable de entorno en Vercel).
import { leer, escribir, subirFoto } from './_almacen.js';

const CAMPOS = { cat: 80, n: 120, d: 600, p: 12, ag: 4, ver: 4, rdm: 4, id: 40, foto: 1200, opc: 600 };
const limpiar = rows => rows.slice(0, 500).map(r => {
  const o = {};
  for (const [k, max] of Object.entries(CAMPOS)) {
    let v = r && r[k];
    if (v == null) continue;
    if (k === 'p') { v = Number(String(v).replace(/[^0-9]/g, '')) || 0; o[k] = v; continue; }
    o[k] = String(v).slice(0, max);
  }
  return o;
});

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Usa POST' });
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b || '{}'); } catch (e) { b = {}; } }
  b = b || {};
  const CLAVE = process.env.PANEL_CLAVE;
  if (!CLAVE) return res.status(500).json({ ok: false, error: 'Falta configurar la clave del panel en Vercel (PANEL_CLAVE).' });
  if (String(b.clave || '') !== CLAVE) { await new Promise(r => setTimeout(r, 700)); return res.status(200).json({ ok: false, error: 'Clave incorrecta' }); }
  try {
    if (b.accion === 'listar') {
      const d = await leer();
      return res.status(200).json({ ok: true, data: d && Array.isArray(d.rows) ? d.rows : null });
    }
    if (b.accion === 'guardar') {
      if (!Array.isArray(b.rows)) throw new Error('Datos inválidos');
      await escribir({ rows: limpiar(b.rows), actualizado: new Date().toISOString() });
      return res.status(200).json({ ok: true, data: true });
    }
    if (b.accion === 'foto') {
      const buf = Buffer.from(String(b.base64 || ''), 'base64');
      if (buf.length < 100 || buf[0] !== 0xFF || buf[1] !== 0xD8) throw new Error('La foto no es válida');
      if (buf.length > 3 * 1024 * 1024) throw new Error('La foto es muy pesada');
      return res.status(200).json({ ok: true, data: { url: await subirFoto(b.nombre, buf) } });
    }
    throw new Error('Acción desconocida');
  } catch (e) {
    return res.status(500).json({ ok: false, error: 'No se pudo guardar: ' + String(e && e.message || e).slice(0, 160) });
  }
}
