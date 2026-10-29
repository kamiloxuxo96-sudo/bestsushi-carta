// GET /api/carta → lo que Gaspar configuró en el panel (la carta lo lee al abrir).
import { leer } from './_almacen.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=120');
  try {
    const d = await leer();
    res.status(200).json({ rows: d && Array.isArray(d.rows) ? d.rows : null });
  } catch (e) {
    res.status(200).json({ rows: null });
  }
}
