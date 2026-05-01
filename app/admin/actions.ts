'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { updateEntryStatus } from '@/lib/pending-entries';

async function requireAdmin() {
  const cookieStore = await cookies();
  if (cookieStore.get('access-granted')?.value !== 'true') {
    redirect('/access');
  }
}

export async function approveEntry(id: string) {
  await requireAdmin();
  await updateEntryStatus(id, 'approved');
  revalidatePath('/admin');
}

export async function rejectEntry(id: string) {
  await requireAdmin();
  await updateEntryStatus(id, 'rejected');
  revalidatePath('/admin');
}
