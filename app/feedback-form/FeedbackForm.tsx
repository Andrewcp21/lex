'use client';

import { useState } from 'react';
import { submitFeedback, type FeedbackPayload } from './actions';

const FEATURES = [
  { id: 'search', label: 'Pencarian istilah' },
  { id: 'az', label: 'Browse A–Z' },
  { id: 'explore', label: 'Jelajahi per seksi' },
  { id: 'ai', label: 'Generate istilah dengan AI' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 border-t border-[#0A0A0A]/10" />
    </div>
  );
}

function RatingRow({
  max,
  value,
  onChange,
  labelMin,
  labelMax,
}: {
  max: number;
  value: number | null;
  onChange: (v: number) => void;
  labelMin?: string;
  labelMax?: string;
}) {
  return (
    <div>
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`w-9 h-9 text-sm font-semibold border border-[#0A0A0A] transition-colors duration-100 ${
              value === n ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {(labelMin || labelMax) && (
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-medium opacity-30">{labelMin}</span>
          <span className="text-[10px] font-medium opacity-30">{labelMax}</span>
        </div>
      )}
    </div>
  );
}

function ChoiceRow({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase border border-[#0A0A0A] transition-colors duration-100 ${
            value === opt ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function CheckboxRow({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => toggle(opt.id)}
          className={`flex items-center gap-3 px-4 py-3 border border-[#0A0A0A] text-left transition-colors duration-100 ${
            value.includes(opt.id) ? 'bg-[#0A0A0A] text-white' : 'hover:bg-[#0A0A0A]/5'
          }`}
        >
          <span
            className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center ${
              value.includes(opt.id) ? 'border-white' : 'border-[#0A0A0A]'
            }`}
          >
            {value.includes(opt.id) && (
              <span className="block w-2 h-2 bg-white" />
            )}
          </span>
          <span className="text-sm font-medium">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  multiline,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const base =
    'w-full border border-[#0A0A0A] px-4 py-3 text-sm font-medium placeholder-[#0A0A0A]/30 outline-none bg-white focus:ring-1 focus:ring-[#0A0A0A] transition-shadow';
  return multiline ? (
    <textarea
      rows={3}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${base} resize-none`}
    />
  ) : (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={base}
    />
  );
}

const QUESTION_LABEL = 'text-sm font-semibold mb-3 block';
const OPTIONAL = ' text-[10px] font-medium opacity-30 ml-2 normal-case tracking-normal';

export default function FeedbackForm() {
  const [overall, setOverall] = useState<number | null>(null);
  const [ease, setEase] = useState<number | null>(null);
  const [useAgain, setUseAgain] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [aiUsefulness, setAiUsefulness] = useState<number | null>(null);
  const [aiAccuracy, setAiAccuracy] = useState('');
  const [contentScore, setContentScore] = useState<number | null>(null);
  const [missingTerms, setMissingTerms] = useState('');
  const [incorrectEntries, setIncorrectEntries] = useState('');
  const [bugs, setBugs] = useState('');
  const [liked, setLiked] = useState('');
  const [change, setChange] = useState('');
  const [nama, setNama] = useState('');
  const [wa, setWa] = useState('');

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid =
    overall !== null &&
    ease !== null &&
    useAgain !== '' &&
    features.length > 0 &&
    aiUsefulness !== null &&
    aiAccuracy !== '' &&
    contentScore !== null &&
    liked.trim() !== '' &&
    change.trim() !== '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setStatus('loading');
    try {
      await submitFeedback({
        overall_rating: overall!,
        ease_of_navigation: ease!,
        would_use_again: useAgain,
        features_tried: features,
        ai_usefulness: aiUsefulness!,
        ai_accuracy: aiAccuracy,
        content_completeness: contentScore!,
        missing_terms: missingTerms,
        incorrect_entries: incorrectEntries,
        bugs,
        liked,
        change,
        nama,
        wa,
      } as FeedbackPayload);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[#0A0A0A] p-12 flex flex-col items-center justify-center gap-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase opacity-40">
          Terima kasih
        </span>
        <p className="text-2xl font-bold uppercase tracking-tight">Feedback diterima.</p>
        <p className="text-sm font-medium opacity-50 max-w-xs leading-relaxed">
          Masukan kamu sangat berarti untuk pengembangan Kosa Rupa. Sampai jumpa di versi berikutnya!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">

      {/* Section 1 */}
      <div>
        <SectionLabel>Kesan Pertama</SectionLabel>
        <div className="flex flex-col gap-8">
          <div>
            <label className={QUESTION_LABEL}>
              1. Nilai aplikasi ini secara keseluruhan
            </label>
            <RatingRow max={10} value={overall} onChange={setOverall} labelMin="Sangat Buruk" labelMax="Sangat Baik" />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              2. Seberapa mudah menavigasi aplikasi ini?
            </label>
            <RatingRow max={5} value={ease} onChange={setEase} labelMin="Sangat Sulit" labelMax="Sangat Mudah" />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              3. Apakah kamu akan pakai Kosa Rupa lagi?
            </label>
            <ChoiceRow options={['Ya', 'Mungkin', 'Tidak']} value={useAgain} onChange={setUseAgain} />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <SectionLabel>Fitur</SectionLabel>
        <div className="flex flex-col gap-8">
          <div>
            <label className={QUESTION_LABEL}>
              4. Fitur mana yang kamu coba?
              <span className={OPTIONAL}>(pilih semua yang berlaku)</span>
            </label>
            <CheckboxRow options={FEATURES} value={features} onChange={setFeatures} />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              5. Fitur AI (generate istilah) — seberapa useful?
            </label>
            <RatingRow max={5} value={aiUsefulness} onChange={setAiUsefulness} labelMin="Tidak Berguna" labelMax="Sangat Berguna" />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              6. Apakah hasil generate AI terasa akurat dan membantu?
            </label>
            <ChoiceRow options={['Ya', 'Kurang', 'Tidak']} value={aiAccuracy} onChange={setAiAccuracy} />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div>
        <SectionLabel>Konten</SectionLabel>
        <div className="flex flex-col gap-8">
          <div>
            <label className={QUESTION_LABEL}>
              7. Seberapa lengkap istilah yang ada untuk kebutuhan kuliahmu?
            </label>
            <RatingRow max={5} value={contentScore} onChange={setContentScore} labelMin="Sangat Kurang" labelMax="Sangat Lengkap" />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              8. Ada istilah penting yang belum ada?
              <span className={OPTIONAL}>(opsional)</span>
            </label>
            <TextInput value={missingTerms} onChange={setMissingTerms} placeholder="Contoh: fenestration, rustication..." multiline />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              9. Ada entri yang menurutmu salah atau membingungkan?
              <span className={OPTIONAL}>(opsional)</span>
            </label>
            <TextInput value={incorrectEntries} onChange={setIncorrectEntries} placeholder="Sebutkan istilahnya dan apa yang salah..." multiline />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div>
        <SectionLabel>Bug & Masalah</SectionLabel>
        <div>
          <label className={QUESTION_LABEL}>
            10. Ada yang error atau tidak berfungsi?
            <span className={OPTIONAL}>(opsional)</span>
          </label>
          <TextInput value={bugs} onChange={setBugs} placeholder="Jelaskan apa yang terjadi..." multiline />
        </div>
      </div>

      {/* Section 5 */}
      <div>
        <SectionLabel>Terbuka</SectionLabel>
        <div className="flex flex-col gap-8">
          <div>
            <label className={QUESTION_LABEL}>
              11. Satu hal yang paling kamu suka dari Kosa Rupa
            </label>
            <TextInput value={liked} onChange={setLiked} placeholder="..." />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              12. Satu hal yang ingin kamu ubah atau tambahkan
            </label>
            <TextInput value={change} onChange={setChange} placeholder="..." />
          </div>
        </div>
      </div>

      {/* Section 6 */}
      <div>
        <SectionLabel>Kontak</SectionLabel>
        <p className="text-xs font-medium opacity-40 mb-6 -mt-2">
          Opsional — isi jika kamu mau kami hubungi untuk diskusi lebih lanjut.
        </p>
        <div className="flex flex-col gap-6">
          <div>
            <label className={QUESTION_LABEL}>
              Nama<span className={OPTIONAL}>(opsional)</span>
            </label>
            <TextInput value={nama} onChange={setNama} placeholder="Nama kamu..." />
          </div>
          <div>
            <label className={QUESTION_LABEL}>
              No. WhatsApp<span className={OPTIONAL}>(opsional)</span>
            </label>
            <TextInput value={wa} onChange={setWa} placeholder="08xxxxxxxxxx" />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4 border-t border-[#0A0A0A]/10">
        {status === 'error' && (
          <p className="text-xs font-medium text-red-600 mb-4">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className="px-8 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase border border-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Mengirim...' : 'Kirim Feedback'}
        </button>
        {!isValid && (
          <p className="text-[10px] font-medium opacity-30 mt-3">
            Lengkapi semua pertanyaan wajib untuk mengirim.
          </p>
        )}
      </div>

    </form>
  );
}
