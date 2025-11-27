'use client';

import { useState, useMemo } from 'react';
import { SupplierCard } from '@/components/SupplierCard';
import Map from '@/components/Map';
import { Map as MapIcon, List, Filter, Building2, Globe, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierDirectoryProps {
    suppliers: any[];
}

export default function SupplierDirectory({ suppliers }: SupplierDirectoryProps) {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
    const [nordicOnly, setNordicOnly] = useState(false);

    // Calculate tier counts
    const tierCounts = useMemo(() => {
        return {
            'Tier 1': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 1').length,
            'Tier 2': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 2').length,
            'Tier 3': suppliers.filter(s => s.hospitalityReadiness?.tier === 'Tier 3').length,
            nordic: suppliers.filter(s => s.nordicReach).length,
        };
    }, [suppliers]);

    // Filter suppliers
    const filteredSuppliers = useMemo(() => {
        let result = suppliers;

        // Filter by tiers
        if (selectedTiers.length > 0) {
            result = result.filter(s => selectedTiers.includes(s.hospitalityReadiness?.tier));
        }

        // Filter by Nordic reach
        if (nordicOnly) {
            result = result.filter(s =>
                s.nordicReach ||
                s.location?.toLowerCase().includes('nordic') ||
                s.capabilities?.logistics?.toLowerCase().includes('nordic')
            );
        }

        return result;
    }, [suppliers, selectedTiers, nordicOnly]);

    const toggleTier = (tier: string) => {
        setSelectedTiers(prev =>
            prev.includes(tier)
                ? prev.filter(t => t !== tier)
                : [...prev, tier]
        );
    };

    const clearFilters = () => {
        setSelectedTiers([]);
        setNordicOnly(false);
    };

    const hasActiveFilters = selectedTiers.length > 0 || nordicOnly;

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
                        {/* Tier Filters */}
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-slate-400 font-medium mr-1">Tier:</span>
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
                                            {tierCounts[tier]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div className="w-px h-6 bg-slate-200 mx-1" />

                        {/* Nordic Reach Filter */}
                        <button
                            onClick={() => setNordicOnly(!nordicOnly)}
                            className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                nordicOnly
                                    ? 'bg-indigo-500 text-white border-indigo-500'
                                    : 'bg-white text-indigo-700 border-indigo-200 hover:border-indigo-400'
                            )}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            Nordic Reach
                            <span className={cn(
                                "px-1.5 py-0.5 rounded-full text-[10px]",
                                nordicOnly ? 'bg-white/20' : 'bg-slate-100'
                            )}>
                                {tierCounts.nordic}
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
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[600px]">
                {viewMode === 'map' ? (
                    <Map suppliers={filteredSuppliers} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredSuppliers.map((supplier) => (
                            <SupplierCard key={supplier.id} supplier={supplier} />
                        ))}

                        {/* Empty state */}
                        {filteredSuppliers.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                    <Filter className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No suppliers match your filters</h3>
                                <p className="text-sm text-slate-500 mb-4">Try adjusting your filter criteria</p>
                                <button
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
