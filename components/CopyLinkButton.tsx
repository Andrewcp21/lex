'use client';

import { useState } from 'react';

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-30 hover:opacity-70 transition-opacity"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  );
}
