'use client';

import { BarChart3 } from 'lucide-react';

interface ChartSkeletonProps {
    height?: number;
    title?: string;
}

export function ChartSkeleton({ height = 300, title }: ChartSkeletonProps) {
    return (
        <div
            className="w-full rounded-xl border border-slate-200 bg-slate-50 animate-pulse"
            style={{ height }}
        >
            <div className="flex flex-col items-center justify-center h-full">
                <BarChart3 className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-sm text-slate-400">
                    {title ? `Laster ${title}...` : 'Laster diagram...'}
                </p>
            </div>
        </div>
    );
}

export function RadarSkeleton() {
    return (
        <div className="w-full h-[350px] rounded-xl border border-slate-200 bg-slate-50 animate-pulse flex items-center justify-center">
            <div className="text-center">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-400">Laster radardiagram...</p>
            </div>
        </div>
    );
}
