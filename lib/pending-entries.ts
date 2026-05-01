import { createClient } from '@supabase/supabase-js';
import type { Entry, PendingEntry } from './types';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || url === 'your-supabase-url-here') return null;
  // Disable Next.js fetch cache so status changes reflect immediately
  return createClient(url, key, {
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });
}

export async function getPendingEntries(): Promise<PendingEntry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('pending_entries')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []).map(rowToEntry);
}

export async function getApprovedEntries(): Promise<Entry[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('pending_entries')
    .select('*')
    .eq('status', 'approved');

  if (error) throw error;
  return (data ?? []).map((row) => row.entry as Entry);
}

export async function findPendingEntry(id: string): Promise<PendingEntry | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('pending_entries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return rowToEntry(data);
}

export async function savePendingEntry(entry: Entry): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.from('pending_entries').insert({
    id: entry.id,
    entry,
    status: 'pending',
  });
  if (error) throw error;
}

export async function updateEntryStatus(
  id: string,
  status: 'approved' | 'rejected'
): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase
    .from('pending_entries')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

function rowToEntry(row: { id: string; entry: unknown; status: string; created_at: string }): PendingEntry {
  return {
    ...(row.entry as Entry),
    aiGenerated: true,
    status: row.status as PendingEntry['status'],
    createdAt: row.created_at,
  };
}
