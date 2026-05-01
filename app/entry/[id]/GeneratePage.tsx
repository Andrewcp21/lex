'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GeneratePage({ termId }: { termId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const displayTerm = toTitleCase(termId);

  async function handleGenerate() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: displayTerm }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Generation failed');
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[720px] mx-auto px-6 py-12">
      <div className="mt-6 mb-8 pb-8 border-b border-[#0A0A0A]">
        <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold uppercase leading-tight tracking-tight text-[#0A0A0A]">
          {displayTerm}
        </h1>
        <p className="mt-4 text-sm font-medium text-[#0A0A0A]/50">
          This term isn&apos;t in our glossary yet.
        </p>
      </div>

      <div className="flex flex-col items-start gap-4">
        {!loading ? (
          <button
            onClick={handleGenerate}
            className="border border-[#0A0A0A] px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            Generate Definition
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="inline-block w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#0A0A0A]/60">
              Writing definition…
            </span>
          </div>
        )}

        {error && (
          <p className="text-[11px] font-semibold text-red-600 tracking-[0.1em]">{error}</p>
        )}
      </div>
    </div>
  );
}
