import Fuse, { type IFuseOptions } from 'fuse.js';

// Types for searchable items
export interface SearchableItem {
  id: string;
  type: 'supplier' | 'case-study' | 'expert';
  title: string;
  description: string;
  location?: string;
  url: string;
  tier?: string;
  tags: string[];
}

// Transform suppliers to searchable items
export function transformSuppliers(suppliers: any[]): SearchableItem[] {
  if (!Array.isArray(suppliers)) return [];
  return suppliers.map((s) => ({
    id: s.id || '',
    type: 'supplier' as const,
    title: s.name || '',
    description: s.description?.slice(0, 200) || '',
    location: typeof s.location === 'string' ? s.location : s.mapLocations?.[0]?.address || '',
    url: `/suppliers#${s.id}`,
    tier: s.hospitalityReadiness?.tier,
    tags: [
      ...(Array.isArray(s.services) ? s.services.slice(0, 3) : []),
      ...(Array.isArray(s.certifications) ? s.certifications.slice(0, 2) : []),
      s.hospitalityReadiness?.tier,
    ].filter(Boolean),
  }));
}

// Transform case studies to searchable items
export function transformCaseStudies(caseStudies: any[]): SearchableItem[] {
  if (!Array.isArray(caseStudies)) return [];
  return caseStudies.map((c) => ({
    id: c.id || '',
    type: 'case-study' as const,
    title: c.title || c.details?.name || '',
    description: c.details?.scope || (Array.isArray(c.circularFeatures) ? c.circularFeatures.join(', ') : '') || '',
    location: c.location || '',
    url: `/case-studies#${c.id}`,
    tier: c.tier,
    tags: [
      c.tier,
      c.type,
      c.details?.category,
      ...(Array.isArray(c.circularFeatures) ? c.circularFeatures.slice(0, 2) : []),
    ].filter(Boolean),
  }));
}

// Transform consultants to searchable items
export function transformConsultants(consultants: any[]): SearchableItem[] {
  if (!Array.isArray(consultants)) return [];
  return consultants.map((c) => ({
    id: c.id || '',
    type: 'expert' as const,
    title: c.name || '',
    description: c.description?.slice(0, 200) || '',
    location: Array.isArray(c.locations) ? c.locations.join(', ') : (c.locations || ''),
    url: `/experts#${c.id}`,
    tier: c.tier,
    tags: [
      c.tier,
      c.category,
      c.role,
      ...(Array.isArray(c.services) ? c.services.slice(0, 2) : []),
    ].filter(Boolean),
  }));
}

// Fuse.js options optimized for fuzzy search
export const fuseOptions: IFuseOptions<SearchableItem> = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.25 },
    { name: 'tags', weight: 0.2 },
    { name: 'location', weight: 0.15 },
  ],
  threshold: 0.4, // Lower = more strict matching
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
  includeMatches: true,
};

// Create a Fuse instance with all searchable data
export function createSearchIndex(
  suppliers: any[],
  caseStudies: any[],
  consultants: any[]
): Fuse<SearchableItem> {
  const allItems: SearchableItem[] = [
    ...transformSuppliers(suppliers),
    ...transformCaseStudies(caseStudies),
    ...transformConsultants(consultants),
  ];

  return new Fuse(allItems, fuseOptions);
}

// Get type label and color for display
export function getTypeDisplay(type: SearchableItem['type']): {
  label: string;
  bgColor: string;
  textColor: string;
} {
  switch (type) {
    case 'supplier':
      return {
        label: 'Supplier',
        bgColor: 'bg-teal-100 dark:bg-teal-900/30',
        textColor: 'text-teal-700 dark:text-teal-300',
      };
    case 'case-study':
      return {
        label: 'Case Study',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        textColor: 'text-blue-700 dark:text-blue-300',
      };
    case 'expert':
      return {
        label: 'Expert',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-700 dark:text-purple-300',
      };
  }
}
