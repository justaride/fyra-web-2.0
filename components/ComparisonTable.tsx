'use client';

import { X, ExternalLink, CheckCircle, XCircle, Minus, MapPin, Building2 } from 'lucide-react';
import { useComparison } from '@/lib/ComparisonContext';
import { cn } from '@/lib/utils';

// Comparison row component
function ComparisonRow({
  label,
  values,
  type = 'text',
}: {
  label: string;
  values: (string | string[] | boolean | undefined)[];
  type?: 'text' | 'list' | 'boolean' | 'tier';
}) {
  return (
    <tr className="border-b border-slate-200 dark:border-slate-700">
      <td className="py-4 px-4 font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 w-48">
        {label}
      </td>
      {values.map((value, index) => (
        <td key={index} className="py-4 px-4 text-slate-900 dark:text-slate-100">
          {type === 'boolean' ? (
            value ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : value === false ? (
              <XCircle className="w-5 h-5 text-red-400" />
            ) : (
              <Minus className="w-5 h-5 text-slate-300" />
            )
          ) : type === 'list' && Array.isArray(value) ? (
            <ul className="space-y-1">
              {value.slice(0, 5).map((item, i) => (
                <li key={i} className="text-sm flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
              {value.length > 5 && (
                <li className="text-xs text-slate-500">+{value.length - 5} more</li>
              )}
            </ul>
          ) : type === 'tier' ? (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold',
                value === 'Tier 1' && 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
                value === 'Tier 2' && 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
                value === 'Tier 3' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              )}
            >
              {value || 'N/A'}
            </span>
          ) : (
            <span className="text-sm">{value || <span className="text-slate-400">N/A</span>}</span>
          )}
        </td>
      ))}
    </tr>
  );
}

export function ComparisonTable() {
  const { selectedSuppliers, removeSupplier, clearAll, isComparing, setIsComparing } =
    useComparison();

  if (!isComparing || selectedSuppliers.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-slate-900 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-teal-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Supplier Comparison
              </h2>
              <span className="text-sm text-slate-500">
                ({selectedSuppliers.length} suppliers)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearAll}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsComparing(false)}
                className="flex items-center gap-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Supplier Headers */}
            <thead>
              <tr>
                <th className="py-4 px-4 w-48"></th>
                {selectedSuppliers.map((supplier) => (
                  <th
                    key={supplier.id}
                    className="py-4 px-4 text-left min-w-[250px] max-w-[300px]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {supplier.name}
                        </h3>
                        {supplier.location && (
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[200px]">
                              {typeof supplier.location === 'string'
                                ? supplier.location.split('.')[0]
                                : supplier.location}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeSupplier(supplier.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Hospitality Tier */}
              <ComparisonRow
                label="Hospitality Tier"
                values={selectedSuppliers.map((s) => s.hospitalityReadiness?.tier)}
                type="tier"
              />

              {/* Readiness Score */}
              <ComparisonRow
                label="Readiness Score"
                values={selectedSuppliers.map((s) => s.hospitalityReadiness?.score)}
              />

              {/* Capabilities Section */}
              <tr className="bg-slate-100 dark:bg-slate-800">
                <td
                  colSpan={selectedSuppliers.length + 1}
                  className="py-2 px-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide"
                >
                  Capabilities
                </td>
              </tr>

              <ComparisonRow
                label="Volume Capacity"
                values={selectedSuppliers.map((s) => s.capabilities?.volume)}
              />

              <ComparisonRow
                label="Lead Time"
                values={selectedSuppliers.map((s) => s.capabilities?.leadTime)}
              />

              <ComparisonRow
                label="Inventory"
                values={selectedSuppliers.map((s) => s.capabilities?.inventory)}
              />

              <ComparisonRow
                label="Logistics"
                values={selectedSuppliers.map((s) => s.capabilities?.logistics)}
              />

              {/* Services Section */}
              <tr className="bg-slate-100 dark:bg-slate-800">
                <td
                  colSpan={selectedSuppliers.length + 1}
                  className="py-2 px-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide"
                >
                  Services & Certifications
                </td>
              </tr>

              <ComparisonRow
                label="Services"
                values={selectedSuppliers.map((s) => s.services)}
                type="list"
              />

              <ComparisonRow
                label="Certifications"
                values={selectedSuppliers.map((s) => s.certifications)}
                type="list"
              />

              {/* Strengths & Gaps Section */}
              <tr className="bg-slate-100 dark:bg-slate-800">
                <td
                  colSpan={selectedSuppliers.length + 1}
                  className="py-2 px-4 font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide"
                >
                  Hospitality Readiness
                </td>
              </tr>

              <ComparisonRow
                label="Strengths"
                values={selectedSuppliers.map((s) => s.hospitalityReadiness?.strengths)}
                type="list"
              />

              <ComparisonRow
                label="Gaps"
                values={selectedSuppliers.map((s) => s.hospitalityReadiness?.gaps)}
                type="list"
              />

              {/* Website */}
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="py-4 px-4 font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 w-48">
                  Website
                </td>
                {selectedSuppliers.map((supplier) => (
                  <td key={supplier.id} className="py-4 px-4">
                    {supplier.contact?.website ? (
                      <a
                        href={supplier.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-teal-600 hover:text-teal-700 text-sm font-medium"
                      >
                        Visit Website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-400 text-sm">N/A</span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setIsComparing(false)}
            className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
          >
            Back to Suppliers
          </button>
        </div>
      </div>
    </div>
  );
}
