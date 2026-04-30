import { getAllEntries, getAllSections } from '@/lib/entries';
import ExploreGrid from '@/components/ExploreGrid';

export default function ExplorePage() {
  const entries = getAllEntries();
  const sections = getAllSections();

  return (
    <div>
      <ExploreGrid entries={entries} sections={sections} />
    </div>
  );
}
