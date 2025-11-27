'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Supplier {
  id: string;
  name: string;
  description?: string;
  hospitalityReadiness?: {
    tier: string;
    score?: string;
    strengths?: string[];
    gaps?: string[];
  };
  capabilities?: {
    volume?: string;
    leadTime?: string;
    inventory?: string;
    logistics?: string;
  };
  services?: string[];
  certifications?: string[];
  location?: string;
  contact?: {
    website?: string;
  };
}

interface ComparisonContextType {
  selectedSuppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  removeSupplier: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
  isComparing: boolean;
  setIsComparing: (value: boolean) => void;
  maxSelections: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_SELECTIONS = 4;

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedSuppliers, setSelectedSuppliers] = useState<Supplier[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const addSupplier = useCallback((supplier: Supplier) => {
    setSelectedSuppliers((prev) => {
      if (prev.length >= MAX_SELECTIONS) return prev;
      if (prev.find((s) => s.id === supplier.id)) return prev;
      return [...prev, supplier];
    });
  }, []);

  const removeSupplier = useCallback((id: string) => {
    setSelectedSuppliers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setSelectedSuppliers([]);
    setIsComparing(false);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedSuppliers.some((s) => s.id === id),
    [selectedSuppliers]
  );

  return (
    <ComparisonContext.Provider
      value={{
        selectedSuppliers,
        addSupplier,
        removeSupplier,
        clearAll,
        isSelected,
        isComparing,
        setIsComparing,
        maxSelections: MAX_SELECTIONS,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
