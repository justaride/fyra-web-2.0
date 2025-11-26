import { MapPin, Star, Truck, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Supplier {
    id: string;
    name: string;
    description: string;
    location: string;
    hospitalityReadiness: {
        tier: string;
        score: string;
        strengths: string[];
        gaps: string[];
    };
    confidenceLevel: string;
    services: string[];
}

interface SupplierCardProps {
    supplier: Supplier;
    className?: string;
}

export function SupplierCard({ supplier, className }: SupplierCardProps) {
    return (
        <div className={cn("group rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full", className)}>
            <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h3 className="text-xl font-semibold leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                            {supplier.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{supplier.location}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border",
                            supplier.hospitalityReadiness.tier === "Tier 1"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        )}>
                            {supplier.hospitalityReadiness.tier}
                        </span>
                        {/* Placeholder for Nordic Reach if we parse it later, for now using Confidence */}
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-600 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            <Star className="w-3 h-3 fill-slate-400 text-slate-400" />
                            {supplier.confidenceLevel.split(' ')[0]}
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {supplier.description}
                </p>

                {/* Nordic Capability Highlight */}
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="flex justify-between items-start mb-1.5">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <Truck className="w-3 h-3" /> Nordic Infrastructure
                        </h4>
                        {/* Business Model Badge */}
                        <span className={cn(
                            "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border",
                            (supplier as any).businessModel === "Hybrid"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        )}>
                            {(supplier as any).businessModel || "Circular"}
                        </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-snug">
                        {/* We can try to extract specific logistic info or just show the first sentence of capabilities.logistics if available, 
                    but for now let's use a safe fallback or a specific field if we map it. 
                    Let's use the 'location' field more fully or part of description. 
                    Actually, let's look at 'capabilities.logistics' if it exists in the type. 
                    It's not in the interface yet, let's add it. */}
                        {(supplier as any).capabilities?.logistics || "Logistics coverage details available in full report."}
                    </p>
                </div>

                <div className="pt-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Core Services</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {supplier.services.slice(0, 4).map((service, i) => (
                            <span key={i} className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 shadow-sm">
                                {service}
                            </span>
                        ))}
                        {supplier.services.length > 4 && (
                            <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-muted-foreground bg-slate-50">
                                +{supplier.services.length - 4}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-50/50 border-t grid grid-cols-2 gap-4 rounded-b-xl text-xs">
                <div>
                    <h4 className="font-semibold text-green-700 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" /> Strengths
                    </h4>
                    <ul className="space-y-1 text-slate-600">
                        {supplier.hospitalityReadiness.strengths.slice(0, 2).map((s, i) => (
                            <li key={i} className="line-clamp-1 flex items-start gap-1">
                                <span className="block w-1 h-1 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-amber-700 mb-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Gaps
                    </h4>
                    <ul className="space-y-1 text-slate-600">
                        {supplier.hospitalityReadiness.gaps.slice(0, 2).map((s, i) => (
                            <li key={i} className="line-clamp-1 flex items-start gap-1">
                                <span className="block w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                {s}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
