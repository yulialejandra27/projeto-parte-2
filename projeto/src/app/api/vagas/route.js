import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'public', 'vagas.json');

async function getVagas() {
  try {
    const data = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveVagas(vagas) {
  await writeFile(dataFilePath, JSON.stringify(vagas, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const vagas = await getVagas();
    return Response.json({ vagas });
  } catch (error) {
    return Response.json({ error: 'Erro ao ler vagas' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, vaga, index } = body;

    let vagas = await getVagas();

    if (action === 'add') {
      vagas.push(vaga);
      vagas.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (action === 'remove') {
      vagas = vagas.filter((_, i) => i !== index);
    }

    await saveVagas(vagas);
    return Response.json({ vagas });
  } catch (error) {
    return Response.json({ error: 'Erro ao processar vagas' }, { status: 500 });
  }
}
