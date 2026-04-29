import type { Difficulty } from '@/lib/types';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: 'border-[#0A0A0A] text-[#0A0A0A]',
  intermediate: 'border-[#0A0A0A] text-[#0A0A0A]',
  advanced: 'border-[#0A0A0A] text-[#0A0A0A]',
};

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] uppercase ${DIFFICULTY_STYLES[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
