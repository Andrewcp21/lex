export type SectionId =
  | 'architectural-terms-theory'
  | 'building-materials-construction'
  | 'structural-systems'
  | 'design-styles-movements'
  | 'tools-software-technology'
  | 'sustainability'
  | 'codes-standards'
  | 'urban-design'
  | 'key-figures'
  | 'geometry-mathematics'
  | 'building-history-typologies'
  | 'architecture-across-cultures'
  | 'professional-practice'
  | 'building-performance-physics'
  | 'representation-communication';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type GFSColor = 'red' | 'yellow' | 'green' | 'blue';

export interface Entry {
  id: string;
  term: string;
  phonetic?: string;
  abbreviation?: string;
  section: SectionId;
  difficulty: Difficulty;
  definition: string;
  example: string;
  keyFigures?: string[];
  relatedTerms: string[];
  tags?: string[];
}

export interface Section {
  id: SectionId;
  name: string;
  slug: string;
  color: GFSColor;
  icon: string;
  description: string;
  entryCount: number;
}
