'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SupplierCard } from '@/components/SupplierCard';
import { MapSkeleton } from '@/components/skeletons';
import { Map as MapIcon, List, Filter, Building2, Globe, Sparkles, X, MapPin, Star, Package, Truck, Printer } from 'lucide-react';

// Lazy load Map component (~180KB Leaflet bundle)
const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <MapSkeleton />,
    ssr: false,
});
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/EmptyState';
import type { Supplier } from '@/lib/types';

interface SupplierDirectoryProps {
    suppliers: Supplier[];
}

export default function SupplierDirectory({ suppliers }: SupplierDirectoryProps) {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
    const [stockholmOnly, setStockholmOnly] = useState(false);
    const [fyraRecommended, setFyraRecommended] = useState(false);
    const [stockAvailable, setStockAvailable] = useState(false);
    const [sourcingService, setSourcingService] = useState(false);

    // Calculate filter counts
    const filterCounts = useMemo(() => {
        return {
            'Tier 1': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 1').length,
            'Tier 2': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 2').length,
            'Tier 3': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 3').length,
            stockholm: suppliers.filter(s => s.stockholmPresence).length,
            fyraRecommended: suppliers.filter(s => s.fyraRecommended).length,
            stockAvailable: suppliers.filter(s => s.b2bReadiness?.stockAvailable).length,
            sourcingService: suppliers.filter(s => s.b2bReadiness?.sourcingService).length,
        };
    }, [suppliers]);

    // Filter suppliers
    const filteredSuppliers = useMemo(() => {
        let result = suppliers;

        // Filter by tiers
        if (selectedTiers.length > 0) {
            result = result.filter(s => selectedTiers.includes(s.hospitalityReadiness?.tier));
        }

        // Filter by Stockholm presence
        if (stockholmOnly) {
            result = result.filter(s => s.stockholmPresence);
        }

        // Filter by Fyra recommended
        if (fyraRecommended) {
            result = result.filter(s => s.fyraRecommended);
        }

        // Filter by stock available
        if (stockAvailable) {
            result = result.filter(s => s.b2bReadiness?.stockAvailable);
        }

        // Filter by sourcing service
        if (sourcingService) {
            result = result.filter(s => s.b2bReadiness?.sourcingService);
        }

        return result;
    }, [suppliers, selectedTiers, stockholmOnly, fyraRecommended, stockAvailable, sourcingService]);

    const toggleTier = (tier: string) => {
        setSelectedTiers(prev =>
            prev.includes(tier)
                ? prev.filter(t => t !== tier)
                : [...prev, tier]
        );
    };

    const clearFilters = () => {
        setSelectedTiers([]);
        setStockholmOnly(false);
        setFyraRecommended(false);
        setStockAvailable(false);
        setSourcingService(false);
    };

    const hasActiveFilters = selectedTiers.length > 0 || stockholmOnly || fyraRecommended || stockAvailable || sourcingService;

    return (
        <div className="space-y-6">
            {/* Enhanced Control Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    {/* View Toggle - Segmented Control */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode('map')}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    viewMode === 'map'
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                <MapIcon className="w-4 h-4" />
                                <span className="hidden sm:inline">Map</span>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    viewMode === 'list'
                                        ? "bg-white text-slate-900 shadow-sm"
                                        : "text-slate-500 hover:text-slate-700"
                                )}
                            >
                                <List className="w-4 h-4" />
                                <span className="hidden sm:inline">List</span>
                            </button>
                        </div>

                        {/* Results count */}
                        <div className="text-sm text-slate-500">
                            <span className="font-semibold text-slate-900">{filteredSuppliers.length}</span>
                            {' '}of {suppliers.length} suppliers
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Fyra Recommended - Highlighted */}
                        <button
                            onClick={() => setFyraRecommended(!fyraRecommended)}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                fyraRecommended
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-500 shadow-md'
                                    : 'bg-white text-purple-700 border-purple-200 hover:border-purple-400 hover:shadow-sm'
                            )}
                        >
                            <Star className="w-3.5 h-3.5" />
                            Recommended
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                fyraRecommended ? 'bg-white/20' : 'bg-purple-50'
                            )}>
                                {filterCounts.fyraRecommended}
                            </span>
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-slate-200 mx-1" />

                        {/* Tier Filters */}
                        <div className="flex items-center gap-1.5" role="group" aria-label="Filtrer etter leverandør-tier">
                            <span className="text-xs text-slate-400 font-medium mr-1" id="tier-filter-label">Tier:</span>
                            {(['Tier 1', 'Tier 2', 'Tier 3'] as const).map((tier) => {
                                const isActive = selectedTiers.includes(tier);
                                const colorClasses = {
                                    'Tier 1': isActive
                                        ? 'bg-teal-500 text-white border-teal-500'
                                        : 'bg-white text-teal-700 border-teal-200 hover:border-teal-400',
                                    'Tier 2': isActive
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400',
                                    'Tier 3': isActive
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : 'bg-white text-amber-700 border-amber-200 hover:border-amber-400',
                                };

                                return (
                                    <button
                                        key={tier}
                                        onClick={() => toggleTier(tier)}
                                        aria-pressed={isActive}
                                        aria-label={`Filter ${tier}: ${filterCounts[tier]} leverandører`}
                                        className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                            colorClasses[tier]
                                        )}
                                    >
                                        <span className={cn(
                                            "w-2 h-2 rounded-full",
                                            tier === 'Tier 1' && (isActive ? 'bg-white' : 'bg-teal-500'),
                                            tier === 'Tier 2' && (isActive ? 'bg-white' : 'bg-blue-500'),
                                            tier === 'Tier 3' && (isActive ? 'bg-white' : 'bg-amber-500'),
                                        )} />
                                        {tier.replace('Tier ', '')}
                                        <span className={cn(
                                            "px-1.5 py-0.5 rounded-full text-[10px]",
                                            isActive ? 'bg-white/20' : 'bg-slate-100'
                                        )}>
                                            {filterCounts[tier]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-slate-200 mx-1" />

                        {/* Stockholm Filter */}
                        <button
                            onClick={() => setStockholmOnly(!stockholmOnly)}
                            aria-pressed={stockholmOnly}
                            aria-label={`Stockholm-filter: ${filterCounts.stockholm} leverandører`}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                stockholmOnly
                                    ? 'bg-rose-500 text-white border-rose-500'
                                    : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400'
                            )}
                        >
                            <MapPin className="w-3.5 h-3.5" />
                            Stockholm
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                stockholmOnly ? 'bg-white/20' : 'bg-slate-100'
                            )}>
                                {filterCounts.stockholm}
                            </span>
                        </button>

                        {/* B2B Readiness Filters */}
                        <button
                            onClick={() => setStockAvailable(!stockAvailable)}
                            aria-pressed={stockAvailable}
                            aria-label={`Lager tilgjengelig: ${filterCounts.stockAvailable} leverandører`}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                stockAvailable
                                    ? 'bg-emerald-500 text-white border-emerald-500'
                                    : 'bg-white text-emerald-700 border-emerald-200 hover:border-emerald-400'
                            )}
                        >
                            <Package className="w-3.5 h-3.5" />
                            Ready Stock
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                stockAvailable ? 'bg-white/20' : 'bg-slate-100'
                            )}>
                                {filterCounts.stockAvailable}
                            </span>
                        </button>

                        <button
                            onClick={() => setSourcingService(!sourcingService)}
                            aria-pressed={sourcingService}
                            aria-label={`Sourcing-tjeneste: ${filterCounts.sourcingService} leverandører`}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                sourcingService
                                    ? 'bg-indigo-500 text-white border-indigo-500'
                                    : 'bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400'
                            )}
                        >
                            <Truck className="w-3.5 h-3.5" aria-hidden="true" />
                            Sourcing
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                sourcingService ? 'bg-white/20' : 'bg-slate-100'
                            )}>
                                {filterCounts.sourcingService}
                            </span>
                        </button>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                                Clear
                            </button>
                        )}

                        {/* Print Button */}
                        <div className="w-px h-6 bg-slate-200 mx-1 hidden lg:block" />
                        <button
                            onClick={() => window.print()}
                            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors print:hidden"
                            title="Skriv ut leverandørliste"
                        >
                            <Printer className="w-3.5 h-3.5" />
                            Print
                        </button>
                    </div>
                </div>

                {/* Print info banner */}
                {hasActiveFilters && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 print:hidden">
                        Print vil inkludere {filteredSuppliers.length} av {suppliers.length} leverandører basert på aktive filtre.
                    </div>
                )}
            </div>

            {/* Screen reader announcement for filter results */}
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
            >
                {`${filteredSuppliers.length} leverandører funnet`}
            </div>

            {/* Content Area */}
            <div className="min-h-[600px]">
                {viewMode === 'map' ? (
                    <Map suppliers={filteredSuppliers} />
                ) : (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        role="list"
                        aria-label="Liste over leverandører"
                    >
                        {filteredSuppliers.map((supplier) => (
                            <SupplierCard key={supplier.id} supplier={supplier} />
                        ))}

                        {/* Empty state */}
                        {filteredSuppliers.length === 0 && (
                            <div className="col-span-full">
                                <EmptyState
                                    type="filter"
                                    title="Ingen leverandører funnet"
                                    description="Ingen leverandører matcher de valgte filtrene. Prøv å fjerne noen filtre."
                                    action={{
                                        label: 'Fjern alle filtre',
                                        onClick: clearFilters
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
