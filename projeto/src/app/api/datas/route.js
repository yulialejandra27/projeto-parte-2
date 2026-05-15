import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'public', 'datas.json');

async function getDatas() {
  try {
    const data = await readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveDatas(datas) {
  await writeFile(dataFilePath, JSON.stringify(datas, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const datas = await getDatas();
    return Response.json({ datas });
  } catch (error) {
    return Response.json({ error: 'Erro ao ler datas' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, data: novaData, index } = body;

    let datas = await getDatas();

    if (action === 'add') {
      datas.push(novaData);
      datas.sort((a, b) => new Date(a.data) - new Date(b.data));
    } else if (action === 'remove') {
      datas = datas.filter((_, i) => i !== index);
    }

    await saveDatas(datas);
    return Response.json({ datas });
  } catch (error) {
    return Response.json({ error: 'Erro ao processar datas' }, { status: 500 });
  }
}
