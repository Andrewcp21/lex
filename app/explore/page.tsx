import { getAllEntries, getAllSections } from '@/lib/entries';
import ExploreGrid from '@/components/ExploreGrid';

export default async function ExplorePage() {
  const entries = await getAllEntries();
  const sections = await getAllSections();

  return (
    <div>
      <ExploreGrid entries={entries} sections={sections} />
    </div>
  );
}
