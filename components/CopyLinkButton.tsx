'use client';

export default function CopyLinkButton() {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
      }}
      className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-30 hover:opacity-70 transition-opacity"
    >
      Copy link
    </button>
  );
}
