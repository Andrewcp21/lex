'use client';

import { useActionState } from 'react';
import { approveEntry, rejectEntry } from './actions';

export default function EntryActions({ id }: { id: string }) {
  const [approveError, approveAction, approvePending] = useActionState(approveEntry, null);
  const [rejectError, rejectAction, rejectPending] = useActionState(rejectEntry, null);

  return (
    <div className="flex flex-col gap-2 pt-4 border-t border-[#0A0A0A]/10">
      <div className="flex gap-3">
        <form action={approveAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={approvePending}
            className="bg-[#0A0A0A] text-white px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#333] transition-colors disabled:opacity-40"
          >
            {approvePending ? 'Approving…' : 'Approve'}
          </button>
        </form>
        <form action={rejectAction}>
          <input type="hidden" name="id" value={id} />
          <button
            type="submit"
            disabled={rejectPending}
            className="border border-[#0A0A0A]/30 px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/50 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors disabled:opacity-40"
          >
            {rejectPending ? 'Rejecting…' : 'Reject'}
          </button>
        </form>
        <a
          href={`/entry/${id}`}
          target="_blank"
          className="ml-auto text-[10px] font-semibold tracking-[0.15em] uppercase text-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-colors self-center"
        >
          Preview →
        </a>
      </div>
      {(approveError || rejectError) && (
        <p className="text-[10px] font-semibold text-red-600 tracking-wide">
          Error: {approveError ?? rejectError}
        </p>
      )}
    </div>
  );
}
