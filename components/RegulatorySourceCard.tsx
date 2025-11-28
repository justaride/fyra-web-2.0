'use client';

import {
  ExternalLink,
  Scale,
  Flame,
  Leaf,
  Building2,
  ShieldCheck,
  FileCheck,
  Award,
  Key,
  FlaskConical,
  FileSearch
} from 'lucide-react';
import SourceVerificationBadge from './SourceVerificationBadge';
import OfficialSourceLink from './OfficialSourceLink';

interface RegulatorySource {
  id: string;
  name: string;
  nameEN?: string;
  shortName: string;
  type: string;
  jurisdiction: string;
  category: string;
  officialUrl: string;
  pdfUrl?: string;
  purchaseUrl?: string;
  criteriaUrl?: string;
  description: string;
  keyExcerpts?: {
    section: string;
    text: string;
    relevance: string;
  }[];
  verification: {
    lastChecked: string;
    urlValid: boolean;
  };
  icon: string;
  color: string;
}

interface RegulatorySourceCardProps {
  source: RegulatorySource;
  compact?: boolean;
  showExcerpts?: boolean;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck,
  Building2,
  Scale,
  Flame,
  Leaf,
  FileCheck,
  Award,
  Key,
  FlaskConical,
  FileSearch
};

// Color mapping for categories
const categoryColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  fire_safety: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    icon: 'text-rose-600'
  },
  procurement: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-800',
    icon: 'text-indigo-600'
  },
  environmental: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    icon: 'text-emerald-600'
  }
};

export default function RegulatorySourceCard({
  source,
  compact = false,
  showExcerpts = false
}: RegulatorySourceCardProps) {
  const Icon = iconMap[source.icon] || FileCheck;
  const colors = categoryColors[source.category] || categoryColors.environmental;

  // Jurisdiction badge
  const jurisdictionLabels: Record<string, string> = {
    SE: 'Sweden',
    NO: 'Norway',
    DK: 'Denmark',
    FI: 'Finland',
    EU: 'European Union',
    International: 'International',
    Nordic: 'Nordic'
  };

  if (compact) {
    return (
      <a
        href={source.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${colors.bg} ${colors.border}`}
      >
        <div className={`p-2 rounded-lg bg-white/80 ${colors.icon}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-slate-900 group-hover:text-teal-700 truncate">
            {source.shortName}
          </div>
          <div className="text-xs text-slate-500 truncate">{source.name}</div>
        </div>
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-600 flex-shrink-0" />
      </a>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${colors.border}`}>
      {/* Header */}
      <div className={`p-4 ${colors.bg}`}>
        <div className="flex items-start gap-3">
          <div className={`p-2.5 rounded-lg bg-white/90 shadow-sm ${colors.icon}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900">{source.shortName}</h3>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/80 text-slate-600">
                {jurisdictionLabels[source.jurisdiction] || source.jurisdiction}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-white/80 text-slate-500 capitalize">
                {source.type}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{source.name}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white">
        <p className="text-sm text-slate-600 mb-4">{source.description}</p>

        {/* Key Excerpts */}
        {showExcerpts && source.keyExcerpts && source.keyExcerpts.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Key Excerpts
            </h4>
            <div className="space-y-2">
              {source.keyExcerpts.map((excerpt, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs font-medium text-slate-500 mb-1">{excerpt.section}</div>
                  <blockquote className="text-sm text-slate-700 italic border-l-2 border-teal-400 pl-3">
                    &ldquo;{excerpt.text}&rdquo;
                  </blockquote>
                  <p className="text-xs text-slate-500 mt-2">{excerpt.relevance}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <OfficialSourceLink url={source.officialUrl} label="Official Source" type="primary" size="sm" />
            {source.pdfUrl && (
              <OfficialSourceLink url={source.pdfUrl} label="PDF" type="pdf" size="sm" />
            )}
            {source.purchaseUrl && (
              <OfficialSourceLink url={source.purchaseUrl} label="Purchase" type="secondary" size="sm" />
            )}
            {source.criteriaUrl && source.criteriaUrl !== source.officialUrl && (
              <OfficialSourceLink url={source.criteriaUrl} label="Criteria" type="secondary" size="sm" />
            )}
          </div>
          <SourceVerificationBadge
            lastVerified={source.verification.lastChecked}
            urlValid={source.verification.urlValid}
          />
        </div>
      </div>
    </div>
  );
}
