'use client';

import { useState } from 'react';
import { SupplierCard } from '@/components/SupplierCard';
import Map from '@/components/Map';
import { Map as MapIcon, List, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierDirectoryProps {
    suppliers: any[];
}

export default function SupplierDirectory({ suppliers }: SupplierDirectoryProps) {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [filter, setFilter] = useState<'all' | 'nordic'>('all');

    const filteredSuppliers = filter === 'all'
        ? suppliers
        : suppliers.filter(s =>
            s.location.toLowerCase().includes('nordic') ||
            s.capabilities?.logistics?.toLowerCase().includes('nordic')
        );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('map')}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                            viewMode === 'map' ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        <MapIcon className="w-4 h-4" />
                        Map View
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                            viewMode === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        <List className="w-4 h-4" />
                        List View
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as 'all' | 'nordic')}
                        className="bg-slate-50 border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 border"
                    >
                        <option value="all">All Suppliers</option>
                        <option value="nordic">Nordic Reach Only</option>
                    </select>
                </div>
            </div>

            <div className="min-h-[500px]">
                {viewMode === 'map' ? (
                    <Map suppliers={filteredSuppliers} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSuppliers.map((supplier) => (
                            <SupplierCard key={supplier.id} supplier={supplier} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
