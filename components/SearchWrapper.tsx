'use client';

import { Search } from './Search';

interface SearchWrapperProps {
  suppliers: any[];
  caseStudies: any[];
  consultants: any[];
}

export function SearchWrapper({ suppliers, caseStudies, consultants }: SearchWrapperProps) {
  return (
    <div className="hidden md:block w-64 lg:w-80">
      <Search
        suppliers={suppliers}
        caseStudies={caseStudies}
        consultants={consultants}
      />
    </div>
  );
}
