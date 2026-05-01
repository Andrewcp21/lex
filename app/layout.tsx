import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

export const dynamic = 'force-dynamic';
import './globals.css';
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
            <span className="text-[10px] font-medium opacity-30">
              An architect&apos;s dictionary — {termCount} terms, {sectionCount} sections.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
