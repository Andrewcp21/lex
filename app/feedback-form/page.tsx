import type { Metadata } from 'next';
import FeedbackForm from './FeedbackForm';

export const metadata: Metadata = {
  title: 'Feedback — Kosa Rupa',
  robots: { index: false, follow: false },
};

export default function FeedbackFormPage() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-[640px] mx-auto">
        <div className="mb-12">
          <span className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40">
            Beta Feedback
          </span>
          <h1 className="text-4xl font-bold uppercase tracking-tight mt-2">Kosa Rupa</h1>
          <p className="text-sm font-medium opacity-50 mt-3 leading-relaxed max-w-md">
            Bantu kami tingkatkan Kosa Rupa dengan mengisi form ini. Butuh sekitar 3–5 menit.
          </p>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
