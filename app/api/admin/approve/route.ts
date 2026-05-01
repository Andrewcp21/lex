import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { updateEntryStatus } from '@/lib/pending-entries';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (cookieStore.get('access-granted')?.value !== 'true') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  await updateEntryStatus(id, 'approved');
  return NextResponse.json({ ok: true });
}
