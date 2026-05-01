import { notFound } from 'next/navigation';
import { getSection, getEntriesBySection } from '@/lib/entries';
import SectionClient from './SectionClient';

export default async function SectionPage({ params }: { params: { slug: string } }) {
  const section = await getSection(params.slug);
  if (!section) notFound();

  const allEntries = await getEntriesBySection(section.id);

  return <SectionClient section={section} allEntries={allEntries} />;
}
