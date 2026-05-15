import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataFilePath = join(process.cwd(), 'public', 'datas.json');

async function getDatas() {
  const data = await readFile(dataFilePath, 'utf-8').catch(() => '[]');
  return JSON.parse(data);
}

async function saveDatas(datas) {
  await writeFile(dataFilePath, JSON.stringify(datas, null, 2), 'utf-8');
}

export async function GET() {
  const datas = await getDatas();
  return Response.json({ datas });
}

export async function POST(request) {
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
}
