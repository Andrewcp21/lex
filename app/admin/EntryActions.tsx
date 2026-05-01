'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { approveEntry, rejectEntry } from './actions';

function SubmitButton({ label, pendingLabel, className }: { label: string; pendingLabel: string; className: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function EntryActions({ id }: { id: string }) {
  const [approveError, approveAction] = useFormState(approveEntry, null);
  const [rejectError, rejectAction] = useFormState(rejectEntry, null);

  return (
    <div className="flex flex-col gap-2 pt-4 border-t border-[#0A0A0A]/10">
      <div className="flex gap-3">
        <form action={approveAction}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            label="Approve"
            pendingLabel="Approving…"
            className="bg-[#0A0A0A] text-white px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#333] transition-colors disabled:opacity-40"
          />
        </form>
        <form action={rejectAction}>
          <input type="hidden" name="id" value={id} />
          <SubmitButton
            label="Reject"
            pendingLabel="Rejecting…"
            className="border border-[#0A0A0A]/30 px-5 py-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/50 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-colors disabled:opacity-40"
          />
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
