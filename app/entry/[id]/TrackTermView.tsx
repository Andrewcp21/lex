'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/gtag';

export default function TrackTermView({ termId, termName }: { termId: string; termName: string }) {
  useEffect(() => {
    trackEvent('term_view', { term_id: termId, term_name: termName });
  }, [termId, termName]);

  return null;
}
