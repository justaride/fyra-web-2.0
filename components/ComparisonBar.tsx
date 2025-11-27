'use client';

import { X, Scale, ChevronUp } from 'lucide-react';
import { useComparison } from '@/lib/ComparisonContext';
import { cn } from '@/lib/utils';

export function ComparisonBar() {
  const {
    selectedSuppliers,
    removeSupplier,
    clearAll,
    setIsComparing,
    maxSelections,
  } = useComparison();

  if (selectedSuppliers.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-4 pointer-events-auto">
          <div className="flex items-center justify-between gap-4">
            {/* Selected suppliers */}
            <div className="flex items-center gap-3 flex-1 overflow-x-auto">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Scale className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-medium text-white">
                  Compare ({selectedSuppliers.length}/{maxSelections})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="flex items-center gap-2 bg-slate-800 pl-3 pr-2 py-1.5 rounded-lg group"
                  >
                    <span className="text-sm text-white font-medium truncate max-w-[120px]">
                      {supplier.name}
                    </span>
                    <button
                      onClick={() => removeSupplier(supplier.id)}
                      className="p-0.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: maxSelections - selectedSuppliers.length }).map(
                  (_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="w-24 h-8 border-2 border-dashed border-slate-700 rounded-lg"
                    />
                  )
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={clearAll}
                className="px-3 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsComparing(true)}
                disabled={selectedSuppliers.length < 2}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                  selectedSuppliers.length >= 2
                    ? "bg-teal-500 text-white hover:bg-teal-600"
                    : "bg-slate-700 text-slate-500 cursor-not-allowed"
                )}
              >
                <ChevronUp className="w-4 h-4" />
                Compare Now
              </button>
            </div>
          </div>

          {selectedSuppliers.length < 2 && (
            <p className="text-xs text-slate-500 mt-2 text-center">
              Select at least 2 suppliers to compare
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
