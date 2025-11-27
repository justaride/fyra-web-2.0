'use client';

import {
  ExternalLink,
  FileText,
  Building2,
  Newspaper,
  Building,
  BadgeCheck,
  Scale,
  Ruler,
  BarChart3,
  MessageCircle,
  User,
  File
} from 'lucide-react';
import { getSourcesByIds, Source } from '@/lib/sources';

interface SourceReferencesProps {
  sourceRefs: string[];
  compact?: boolean;
}

// Professional icon mapping using Lucide icons
const SourceTypeIcon = ({ type }: { type: string }) => {
  const iconClass = "w-4 h-4 text-slate-400";

  switch (type) {
    case 'project_page':
      return <Building2 className={iconClass} />;
    case 'press_release':
    case 'news_article':
      return <Newspaper className={iconClass} />;
    case 'company_website':
      return <Building className={iconClass} />;
    case 'certification_website':
      return <BadgeCheck className={iconClass} />;
    case 'regulation':
      return <Scale className={iconClass} />;
    case 'standard':
      return <Ruler className={iconClass} />;
    case 'research_report':
      return <BarChart3 className={iconClass} />;
    case 'social_media':
      return <MessageCircle className={iconClass} />;
    case 'profile_page':
      return <User className={iconClass} />;
    default:
      return <File className={iconClass} />;
  }
};

export default function SourceReferences({ sourceRefs, compact = false }: SourceReferencesProps) {
  const sources = getSourcesByIds(sourceRefs);

  if (sources.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <FileText className="h-3.5 w-3.5" />
        <span>{sources.length} source{sources.length !== 1 ? 's' : ''}</span>
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        <FileText className="h-4 w-4 text-teal-600" />
        Sources ({sources.length})
      </h4>
      <ul className="space-y-2">
        {sources.map((source: Source) => (
          <li key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 p-2 -mx-2 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
            >
              <span className="flex-shrink-0 mt-0.5">
                <SourceTypeIcon type={source.type} />
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium group-hover:underline line-clamp-1">
                  {source.title}
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>{source.publisher}</span>
                  {source.date && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{source.date}</span>
                    </>
                  )}
                </div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
