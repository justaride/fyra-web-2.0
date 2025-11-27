'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Fuse, { type FuseResult } from 'fuse.js';
import { Search as SearchIcon, X, MapPin, Building2, Hotel, Users } from 'lucide-react';
import {
  SearchableItem,
  createSearchIndex,
  getTypeDisplay,
} from '@/lib/searchIndex';
import { cn } from '@/lib/utils';

interface MobileSearchProps {
  suppliers: any[];
  caseStudies: any[];
  consultants: any[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearch({
  suppliers,
  caseStudies,
  consultants,
  isOpen,
  onClose,
}: MobileSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchableItem>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Create search index
  const fuse = useMemo(() => {
    return createSearchIndex(suppliers, caseStudies, consultants);
  }, [suppliers, caseStudies, consultants]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Search on query change
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = fuse.search(query, { limit: 10 });
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  const getTypeIcon = (type: SearchableItem['type']) => {
    switch (type) {
      case 'supplier':
        return <Building2 className="w-4 h-4" />;
      case 'case-study':
        return <Hotel className="w-4 h-4" />;
      case 'expert':
        return <Users className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suppliers, case studies..."
            className="w-full pl-11 pr-4 py-3 text-base bg-slate-100 dark:bg-slate-800 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            autoComplete="off"
          />
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        {query.length < 2 ? (
          <div className="p-6 text-center text-slate-500">
            <SearchIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p>Start typing to search</p>
            <p className="text-sm mt-1">Find suppliers, case studies, and experts</p>
          </div>
        ) : results.length === 0 ? (
          <div className="p-6 text-center text-slate-500">
            <p>No results found for "{query}"</p>
            <p className="text-sm mt-1">Try different keywords</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {results.map((result) => {
              const { label, bgColor, textColor } = getTypeDisplay(result.item.type);

              return (
                <button
                  key={result.item.id}
                  onClick={() => handleSelect(result.item.url)}
                  className="w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn('p-2.5 rounded-xl', bgColor, textColor)}>
                      {getTypeIcon(result.item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {result.item.title}
                        </span>
                      </div>
                      <span
                        className={cn(
                          'inline-block text-[10px] font-medium px-1.5 py-0.5 rounded mb-1',
                          bgColor,
                          textColor
                        )}
                      >
                        {label}
                      </span>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {result.item.description}
                      </p>
                      {result.item.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{result.item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-center text-xs text-slate-500">
        Tap a result to navigate
      </div>
    </div>
  );
}
