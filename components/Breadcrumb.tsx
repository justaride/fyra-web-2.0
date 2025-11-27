'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

// Route name mappings for better display
const routeNames: Record<string, string> = {
  suppliers: 'Suppliers',
  experts: 'Experts',
  scenarios: 'Scenarios',
  'case-studies': 'Case Studies',
  regulations: 'Regulations',
  certifications: 'Certifications',
  specifications: 'Specifications',
  templates: 'Templates',
  about: 'About',
};

interface BreadcrumbProps {
  className?: string;
  // Optional custom title for dynamic pages (e.g., supplier name)
  currentTitle?: string;
}

export function Breadcrumb({ className, currentTitle }: BreadcrumbProps) {
  const pathname = usePathname();

  // Don't show breadcrumb on home page
  if (pathname === '/') return null;

  // Split path and filter empty segments
  const segments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;

    // Use currentTitle for last segment if provided, otherwise use route name or segment
    let label: string;
    if (isLast && currentTitle) {
      label = currentTitle;
    } else {
      label = routeNames[segment] || segment.replace(/-/g, ' ').replace(/_/g, ' ');
      // Capitalize each word
      label = label
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm', className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 hover:text-teal-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-slate-300" />
            {item.isLast ? (
              <span className="text-slate-900 dark:text-slate-100 font-medium truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Pre-styled breadcrumb container for use in page headers
export function BreadcrumbBar({
  currentTitle,
  className,
}: {
  currentTitle?: string;
  className?: string;
}) {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === '/') return null;

  return (
    <div
      className={cn(
        'bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700',
        className
      )}
    >
      <div className="container mx-auto px-4 py-2">
        <Breadcrumb currentTitle={currentTitle} />
      </div>
    </div>
  );
}
