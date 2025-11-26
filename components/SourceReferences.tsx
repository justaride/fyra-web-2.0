'use client';

import { ExternalLink, FileText } from 'lucide-react';
import { getSourcesByIds, Source } from '@/lib/sources';

interface SourceReferencesProps {
  sourceRefs: string[];
  compact?: boolean;
}

const sourceTypeIcons: Record<string, string> = {
  project_page: '🏗️',
  press_release: '📰',
  company_website: '🏢',
  certification_website: '✓',
  regulation: '⚖️',
  standard: '📐',
  research_report: '📊',
  news_article: '📰',
  social_media: '💬',
  profile_page: '👤',
};

export default function SourceReferences({ sourceRefs, compact = false }: SourceReferencesProps) {
  const sources = getSourcesByIds(sourceRefs);

  if (sources.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1 text-xs text-slate-500">
        <FileText className="h-3 w-3" />
        <span>{sources.length} source{sources.length !== 1 ? 's' : ''}</span>
      </div>
    );
  }

  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
        <FileText className="h-4 w-4" />
        Sources ({sources.length})
      </h4>
      <ul className="space-y-2">
        {sources.map((source: Source) => (
          <li key={source.id} className="text-sm">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 text-slate-600 hover:text-emerald-600"
            >
              <span className="flex-shrink-0 mt-0.5">
                {sourceTypeIcons[source.type] || '📄'}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-medium group-hover:underline line-clamp-1">
                  {source.title}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{source.publisher}</span>
                  {source.date && (
                    <>
                      <span>•</span>
                      <span>{source.date}</span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
