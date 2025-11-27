'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Fuse, { type FuseResult } from 'fuse.js';
import { Search as SearchIcon, X, MapPin, Building2, Hotel, Users } from 'lucide-react';
import {
  SearchableItem,
  createSearchIndex,
  getTypeDisplay,
  transformSuppliers,
  transformCaseStudies,
  transformConsultants,
  fuseOptions,
} from '@/lib/searchIndex';

interface SearchProps {
  suppliers: any[];
  caseStudies: any[];
  consultants: any[];
}

export function Search({ suppliers, caseStudies, consultants }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FuseResult<SearchableItem>[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Create search index once
  const fuse = useMemo(() => {
    return createSearchIndex(suppliers, caseStudies, consultants);
  }, [suppliers, caseStudies, consultants]);

  // Search on query change
  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = fuse.search(query, { limit: 8 });
      setResults(searchResults);
      setIsOpen(true);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, fuse]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].item.url);
            setQuery('');
            setIsOpen(false);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, selectedIndex, router]
  );

  // Global keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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

  return (
    <div ref={containerRef} className="relative">
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search suppliers, case studies, experts..."
          className="w-full pl-10 pr-10 py-2 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {!query && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-slate-200 dark:bg-slate-700 rounded">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          <div className="p-2">
            {results.map((result, index) => {
              const { label, bgColor, textColor } = getTypeDisplay(result.item.type);
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={result.item.id}
                  onClick={() => {
                    router.push(result.item.url);
                    setQuery('');
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-700'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 p-2 rounded-lg ${bgColor} ${textColor}`}
                    >
                      {getTypeIcon(result.item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                          {result.item.title}
                        </span>
                        <span
                          className={`flex-shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded ${bgColor} ${textColor}`}
                        >
                          {label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {result.item.description}
                      </p>
                      {result.item.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{result.item.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-xs text-slate-500">
            <span className="mr-2">↑↓ Navigate</span>
            <span className="mr-2">↵ Select</span>
            <span>Esc Close</span>
          </div>
        </div>
      )}

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 text-center z-50">
          <p className="text-slate-500 dark:text-slate-400">
            No results found for "{query}"
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
            Try searching for suppliers, hotels, or consultants
          </p>
        </div>
      )}
    </div>
  );
}
