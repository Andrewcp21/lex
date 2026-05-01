import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPendingEntries } from '@/lib/pending-entries';

export const dynamic = 'force-dynamic';
import { getAllSections, COLOR_MAP } from '@/lib/entries';
import EntryActions from './EntryActions';

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (cookieStore.get('access-granted')?.value !== 'true') {
    redirect('/access');
  }

  const pending = await getPendingEntries();
  const sections = await getAllSections();

  return (
    <div className="max-w-[900px] mx-auto px-6 py-12">
      <div className="mb-10 pb-8 border-b border-[#0A0A0A]">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40 mb-2">
          Admin
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-tight text-[#0A0A0A]">
          Review Queue
        </h1>
        <p className="mt-2 text-sm text-[#0A0A0A]/50">
          {pending.length} {pending.length === 1 ? 'term' : 'terms'} awaiting review
        </p>
      </div>

      {pending.length === 0 ? (
        <p className="text-sm text-[#0A0A0A]/40 font-medium">No pending terms. All caught up.</p>
      ) : (
        <div className="space-y-6">
          {pending.map((entry) => {
            const section = sections.find((s) => s.id === entry.section);
            const colors = section ? COLOR_MAP[section.color] : COLOR_MAP.red;
            const createdAt = new Date(entry.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <div key={entry.id} className="border border-[#0A0A0A]/20 p-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-tight text-[#0A0A0A]">
                      {entry.term}
                    </h2>
                    {entry.indonesianTerm && (
                      <p className="text-xs text-[#0A0A0A]/40 mt-0.5">{entry.indonesianTerm}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {section && (
                      <span className={`px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] ${colors.bg} ${colors.text}`}>
                        {section.name.toUpperCase()}
                      </span>
                    )}
                    <span className="border border-[#0A0A0A]/30 px-2 py-0.5 text-[9px] font-semibold tracking-[0.15em] uppercase text-[#0A0A0A]/50">
                      {entry.difficulty}
                    </span>
                    <span className="text-[9px] text-[#0A0A0A]/30 font-medium">{createdAt}</span>
                  </div>
                </div>

                {/* Definition */}
                <p className="text-sm font-medium leading-relaxed text-[#0A0A0A] mb-2">
                  {entry.definition}
                </p>
                <p className="text-sm leading-relaxed text-[#0A0A0A]/60 mb-4">
                  {entry.example}
                </p>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-semibold tracking-[0.1em] uppercase border border-[#0A0A0A]/20 px-2 py-0.5 text-[#0A0A0A]/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <EntryActions id={entry.id} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
