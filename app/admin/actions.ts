'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { promotePendingEntry, updateEntryStatus } from '@/lib/pending-entries';

async function requireAdmin() {
  const cookieStore = await cookies();
  if (cookieStore.get('access-granted')?.value !== 'true') {
    redirect('/access');
  }
}

export async function approveEntry(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const id = formData.get('id') as string;
  await requireAdmin();
  try {
    await promotePendingEntry(id);
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
  revalidatePath('/admin');
  revalidatePath(`/entry/${id}`);
  revalidatePath('/', 'layout');
  return null;
}

export async function rejectEntry(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const id = formData.get('id') as string;
  await requireAdmin();
  try {
    await updateEntryStatus(id, 'rejected');
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
  revalidatePath('/admin');
  return null;
}
