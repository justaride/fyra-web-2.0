'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { MobileSearch } from './MobileSearch';

interface MobileSearchButtonProps {
  suppliers: any[];
  caseStudies: any[];
  consultants: any[];
}

export function MobileSearchButton({
  suppliers,
  caseStudies,
  consultants,
}: MobileSearchButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>

      <MobileSearch
        suppliers={suppliers}
        caseStudies={caseStudies}
        consultants={consultants}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
