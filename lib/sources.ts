import sourcesData from '@/data/sources.json';

export interface Source {
  id: string;
  title: string;
  url: string;
  type: string;
  publisher: string;
  language?: string;
  date?: string;
  verifies: string[];
  keyFacts?: string[];
}

interface SourcesData {
  metadata: {
    version: string;
    lastUpdated: string;
    description: string;
    totalSources: number;
  };
  sources: Source[];
  sourceTypes: Record<string, string>;
}

const data = sourcesData as SourcesData;

/**
 * Get all sources from the registry
 */
export function getAllSources(): Source[] {
  return data.sources;
}

/**
 * Get a source by its ID
 */
export function getSourceById(id: string): Source | undefined {
  return data.sources.find(source => source.id === id);
}

/**
 * Get multiple sources by their IDs
 */
export function getSourcesByIds(ids: string[]): Source[] {
  return ids
    .map(id => getSourceById(id))
    .filter((source): source is Source => source !== undefined);
}

/**
 * Get sources that verify a specific entity
 */
export function getSourcesForEntity(entityId: string): Source[] {
  return data.sources.filter(source =>
    source.verifies.includes(entityId)
  );
}

/**
 * Get sources by type (e.g., 'press_release', 'project_page')
 */
export function getSourcesByType(type: string): Source[] {
  return data.sources.filter(source => source.type === type);
}

/**
 * Get source type description
 */
export function getSourceTypeDescription(type: string): string {
  return data.sourceTypes[type] || 'Unknown source type';
}

/**
 * Get metadata about the sources registry
 */
export function getSourcesMetadata() {
  return data.metadata;
}
