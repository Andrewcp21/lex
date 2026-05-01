import HomeScreen from '@/components/HomeScreen';
import { getAllEntries, getAllSections } from '@/lib/entries';

export default async function HomePage() {
  const [entries, sections] = await Promise.all([getAllEntries(), getAllSections()]);
  return <HomeScreen entries={entries} sections={sections} />;
}
