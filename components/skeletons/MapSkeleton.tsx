'use client';

import { MapPin } from 'lucide-react';

export function MapSkeleton() {
    return (
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 animate-pulse">
            {/* Center loading indicator */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
                    <MapPin className="w-8 h-8 text-slate-400 animate-bounce" />
                    <p className="text-sm text-slate-500 mt-2">Laster kart...</p>
                </div>
            </div>

            {/* Fake legend */}
            <div className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-3 w-40">
                <div className="h-3 bg-slate-200 rounded w-20 mb-2" />
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="h-2 bg-slate-200 rounded w-12" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="h-2 bg-slate-200 rounded w-14" />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="h-2 bg-slate-200 rounded w-10" />
                    </div>
                </div>
            </div>

            {/* Fake stats */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 px-3 py-2 w-16">
                    <div className="h-5 bg-slate-200 rounded mb-1" />
                    <div className="h-2 bg-slate-200 rounded w-12" />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200 px-3 py-2 w-16">
                    <div className="h-5 bg-slate-200 rounded mb-1" />
                    <div className="h-2 bg-slate-200 rounded w-12" />
                </div>
            </div>
        </div>
    );
}
