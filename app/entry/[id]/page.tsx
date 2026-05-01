import { getEntry, getAllEntries } from '@/lib/entries';
import { findPendingEntry } from '@/lib/pending-entries';
import EntryLayout from './EntryLayout';
import GeneratePage from './GeneratePage';

export default async function EntryPage({ params }: { params: { id: string } }) {
  const entry = getEntry(params.id);
  const allEntries = getAllEntries();

  if (entry) return <EntryLayout entry={entry} allEntries={allEntries} />;

  const pendingEntry = await findPendingEntry(params.id);
  if (pendingEntry && pendingEntry.status !== 'rejected') {
    return <EntryLayout entry={pendingEntry} allEntries={allEntries} unverified={pendingEntry.status === 'pending'} />;
  }

  return <GeneratePage termId={params.id} />;
}
