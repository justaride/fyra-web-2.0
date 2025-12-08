'use client';

import { ReactNode } from 'react';
import { Search, Package, Building2, Users, FileText, Filter, RefreshCw } from 'lucide-react';
import Link from 'next/link';

type EmptyStateType = 'search' | 'filter' | 'suppliers' | 'case-studies' | 'consultants' | 'general';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  secondaryAction?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

const defaultContent: Record<EmptyStateType, { icon: ReactNode; title: string; description: string }> = {
  search: {
    icon: <Search className="w-8 h-8 text-slate-400" />,
    title: 'Ingen resultater',
    description: 'Vi fant ingen resultater for søket ditt. Prøv et annet søkeord eller sjekk stavemåten.',
  },
  filter: {
    icon: <Filter className="w-8 h-8 text-slate-400" />,
    title: 'Ingen treff',
    description: 'Ingen elementer matcher de valgte filtrene. Prøv å fjerne noen filtre for å se flere resultater.',
  },
  suppliers: {
    icon: <Package className="w-8 h-8 text-slate-400" />,
    title: 'Ingen leverandører funnet',
    description: 'Det finnes ingen leverandører som matcher kriteriene dine. Prøv å justere filtrene.',
  },
  'case-studies': {
    icon: <Building2 className="w-8 h-8 text-slate-400" />,
    title: 'Ingen case studies funnet',
    description: 'Det finnes ingen hotellprosjekter som matcher søket ditt.',
  },
  consultants: {
    icon: <Users className="w-8 h-8 text-slate-400" />,
    title: 'Ingen konsulenter funnet',
    description: 'Det finnes ingen konsulenter som matcher kriteriene dine.',
  },
  general: {
    icon: <FileText className="w-8 h-8 text-slate-400" />,
    title: 'Ingen data tilgjengelig',
    description: 'Det er ingen data å vise akkurat nå.',
  },
};

/**
 * Empty State Component
 * Displays a helpful message when lists/searches have no results
 */
export function EmptyState({
  type = 'general',
  title,
  description,
  icon,
  action,
  secondaryAction,
}: EmptyStateProps) {
  const defaults = defaultContent[type];

  return (
    <div className="py-12 px-4 text-center" role="status" aria-live="polite">
      <div className="max-w-sm mx-auto">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon || defaults.icon}
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          {title || defaults.title}
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          {description || defaults.description}
        </p>

        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {action && (
              action.href ? (
                <Link
                  href={action.href}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  {action.label}
                </Link>
              ) : (
                <button
                  onClick={action.onClick}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" />
                  {action.label}
                </button>
              )
            )}
            {secondaryAction && (
              secondaryAction.href ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  {secondaryAction.label}
                </Link>
              ) : (
                <button
                  onClick={secondaryAction.onClick}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
                >
                  {secondaryAction.label}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Inline empty state for smaller containers
 */
export function EmptyStateInline({
  message = 'Ingen resultater',
  className = '',
}: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={`py-8 text-center text-slate-500 text-sm ${className}`} role="status">
      <Search className="w-5 h-5 mx-auto mb-2 opacity-50" />
      {message}
    </div>
  );
}

export default EmptyState;
