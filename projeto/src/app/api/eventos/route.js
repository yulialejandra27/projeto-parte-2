import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'public', 'eventos.json');

async function getEventos() {
  const data = await readFile(dataFilePath, 'utf-8').catch(() => '[]');
  return JSON.parse(data);
}

async function saveEventos(eventos) {
  await writeFile(dataFilePath, JSON.stringify(eventos, null, 2), 'utf-8');
}

export async function GET() {
  const eventos = await getEventos();
  return Response.json({ eventos });
}

export async function POST(request) {
  const body = await request.json();
  const { action, evento, index } = body;

  let eventos = await getEventos();

  if (action === 'add') {
    eventos.push(evento);
    eventos.sort((a, b) => new Date(a.data) - new Date(b.data));
  } else if (action === 'remove') {
    eventos = eventos.filter((_, i) => i !== index);
  }

  await saveEventos(eventos);
  return Response.json({ eventos });
}
