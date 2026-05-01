'use server';

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing');
  return createClient(url, key);
}

export type FeedbackPayload = {
  overall_rating: number;
  ease_of_navigation: number;
  would_use_again: string;
  features_tried: string[];
  ai_usefulness: number;
  ai_accuracy: string;
  content_completeness: number;
  missing_terms: string;
  incorrect_entries: string;
  bugs: string;
  liked: string;
  change: string;
  nama: string;
  wa: string;
};

async function sendTelegramNotification(data: FeedbackPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const featuresLabel = data.features_tried.join(', ') || '—';
  const message = [
    `📋 *Feedback Baru — Kosa Rupa*`,
    ``,
    `⭐ Overall: ${data.overall_rating}/10`,
    `🧭 Kemudahan: ${data.ease_of_navigation}/5`,
    `🔁 Pakai lagi: ${data.would_use_again}`,
    ``,
    `🔧 Fitur dicoba: ${featuresLabel}`,
    `🤖 AI usefulness: ${data.ai_usefulness}/5`,
    `✅ AI akurat: ${data.ai_accuracy}`,
    ``,
    `📚 Kelengkapan konten: ${data.content_completeness}/5`,
    data.missing_terms ? `➕ Istilah kurang: ${data.missing_terms}` : null,
    data.incorrect_entries ? `⚠️ Entri salah: ${data.incorrect_entries}` : null,
    data.bugs ? `🐛 Bug: ${data.bugs}` : null,
    ``,
    `👍 Suka: ${data.liked}`,
    `✏️ Ubah: ${data.change}`,
    ``,
    data.nama || data.wa ? `👤 Kontak:` : null,
    data.nama ? `   Nama: ${data.nama}` : null,
    data.wa ? `   WA: ${data.wa}` : null,
  ]
    .filter((line) => line !== null)
    .join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
  });
}

export async function submitFeedback(data: FeedbackPayload) {
  const supabase = getSupabase();
  const { error } = await supabase.from('feedback').insert([data]);
  if (error) throw new Error(error.message);
  await sendTelegramNotification(data);
}
