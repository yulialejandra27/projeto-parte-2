import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'public', 'eventos.json');

async function getEventos() {
  try {
    const data = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Se o arquivo não existe, retorna array vazio
    return [];
  }
}

async function saveEventos(eventos) {
  await writeFile(dataFilePath, JSON.stringify(eventos, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const eventos = await getEventos();
    return Response.json({ eventos });
  } catch (error) {
    return Response.json({ error: 'Erro ao ler eventos' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
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
  } catch (error) {
    return Response.json({ error: 'Erro ao processar eventos' }, { status: 500 });
  }
}
