import type { Difficulty } from '@/lib/types';

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: 'border-[#00E600] text-[#00A000]',
  intermediate: 'border-[#FFB800] text-[#9A6F00]',
  advanced: 'border-[#FF0000] text-[#CC0000]',
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
