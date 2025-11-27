import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

// Base skeleton component with shimmer animation
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-slate-200 dark:bg-slate-700',
        className
      )}
    />
  );
}

// Supplier card skeleton
export function SupplierCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-800 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      {/* Nordic Infrastructure */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Services */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-24" />
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>

      {/* View button */}
      <div className="border-t pt-3">
        <Skeleton className="h-4 w-28 mx-auto" />
      </div>
    </div>
  );
}

// Case study card skeleton
export function CaseStudyCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
      {/* Header gradient */}
      <Skeleton className="h-32 rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
    </div>
  );
}

// Expert/Consultant card skeleton
export function ExpertCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-800 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-16 w-16 rounded-xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Services */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>

      {/* Footer */}
      <Skeleton className="h-4 w-32" />
    </div>
  );
}

// Grid skeleton for loading multiple cards
export function SupplierGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SupplierCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CaseStudyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CaseStudyCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ExpertGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ExpertCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Text line skeleton
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-4/5' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

// Hero section skeleton
export function HeroSkeleton() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-8 w-40 rounded-full bg-slate-700" />
          <Skeleton className="h-12 w-3/4 bg-slate-700" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full bg-slate-700" />
            <Skeleton className="h-5 w-5/6 bg-slate-700" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32 bg-slate-700" />
            <Skeleton className="h-4 w-32 bg-slate-700" />
            <Skeleton className="h-4 w-32 bg-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
