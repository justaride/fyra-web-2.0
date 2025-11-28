'use client';

import { ReactNode } from 'react';
import { Info } from 'lucide-react';

interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  sourceRefs?: string[];
  children: ReactNode;
  className?: string;
}

export function ChartWrapper({
  title,
  subtitle,
  sourceRefs,
  children,
  className = ''
}: ChartWrapperProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 print:break-inside-avoid print:shadow-none ${className}`}>
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>

      <div className="min-h-[280px]">
        {children}
      </div>

      {sourceRefs && sourceRefs.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400">
            Based on {sourceRefs.length} verified source{sourceRefs.length > 1 ? 's' : ''}: {' '}
            <span className="text-slate-500">
              {sourceRefs.slice(0, 3).join(', ')}
              {sourceRefs.length > 3 && ` +${sourceRefs.length - 3} more`}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
