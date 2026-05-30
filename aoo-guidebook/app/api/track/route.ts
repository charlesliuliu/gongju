import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'stats.json');

type Stats = Record<string, number>;

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readStats(): Stats {
  ensureDir();
  if (!fs.existsSync(DATA_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeStats(stats: Stats) {
  ensureDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(stats, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { path: pagePath } = await req.json();
    if (!pagePath || typeof pagePath !== 'string') {
      return NextResponse.json({ error: 'path required' }, { status: 400 });
    }
    const stats = readStats();
    stats[pagePath] = (stats[pagePath] || 0) + 1;
    writeStats(stats);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  }
}

export async function GET() {
  const stats = readStats();
  const sorted = Object.entries(stats)
    .sort(([, a], [, b]) => b - a)
    .map(([path, views]) => ({ path, views }));
  return NextResponse.json({ total: sorted.reduce((s, i) => s + i.views, 0), pages: sorted });
}
