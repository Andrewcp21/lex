import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

export const dynamic = 'force-dynamic';
import SiteHeader from '@/components/SiteHeader';
import SearchBar from '@/components/SearchBar';
import { getAllEntries, getAllSections } from '@/lib/entries';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export async function generateMetadata(): Promise<Metadata> {
  const [entries, sections] = await Promise.all([getAllEntries(), getAllSections()]);
  return {
    title: "Kosa Rupa — Architect's Dictionary",
    description: `A comprehensive, searchable dictionary for architecture students and beginners. ${entries.length} terms across ${sections.length} sections.`,
    robots: { index: false, follow: false },
    openGraph: {
      images: [{ url: '/og-image.png', width: 800, height: 800, alt: 'Kosa Rupa — Kamus Arsitektur' }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og-image.png'],
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [entries, sections] = await Promise.all([getAllEntries(), getAllSections()]);
  const termCount = entries.length;
  const sectionCount = sections.length;
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-[family-name:var(--font-space-grotesk)] bg-white text-[#0A0A0A] antialiased">
        <SiteHeader searchBar={<SearchBar entries={entries} sections={sections} />} />

        <main>{children}</main>

        <footer className="border-t border-[#0A0A0A] px-6 py-4 mt-16">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase opacity-40">
              Kosa Rupa
            </span>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/andrewc.putra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-medium opacity-30 hover:opacity-70 transition-opacity"
              >
                @andrewc.putra
              </a>
              <span className="text-[10px] font-medium opacity-30">
                An architect&apos;s dictionary — {termCount} terms, {sectionCount} sections.
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
