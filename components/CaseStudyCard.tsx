import Link from "next/link";
import { MapPin, Calendar, Building, ArrowUpRight, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Color themes for visual variety
const tierColors = {
    'Flagship': { gradient: 'from-teal-500 to-emerald-600', badge: 'bg-teal-100 text-teal-700' },
    'Proven': { gradient: 'from-blue-500 to-indigo-600', badge: 'bg-blue-100 text-blue-700' },
    'Emerging': { gradient: 'from-amber-500 to-orange-600', badge: 'bg-amber-100 text-amber-700' },
    'default': { gradient: 'from-slate-500 to-slate-700', badge: 'bg-slate-100 text-slate-700' },
};

interface CaseStudy {
    id: string;
    title: string;
    type: string;
    location: string;
    year: string;
    category: string;
    tier?: string;
    details: Record<string, string>;
    notes: string[];
    year_verified: number | string;
}

interface CaseStudyCardProps {
    study: CaseStudy;
    className?: string;
}

export function CaseStudyCard({ study, className }: CaseStudyCardProps) {
    // Extract key details safely
    const scope = study.details.scope || study.details.Scope || "Details available in full report";
    const size = study.details.size || study.details.Size || study.details["size:"] || "";
    const chain = study.details.chain || study.details.Chain || "";

    // Get tier-based colors
    const colors = tierColors[study.tier as keyof typeof tierColors] || tierColors.default;

    return (
        <Link
            href={`/case-studies/${study.id}`}
            className={cn("group rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden", className)}
        >
            {/* Gradient Header */}
            <div className={cn("h-2 bg-gradient-to-r", colors.gradient)} />

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                {study.type}
                            </span>
                            {study.tier && (
                                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", colors.badge)}>
                                    {study.tier}
                                </span>
                            )}
                        </div>
                        <h3 className="text-lg font-bold leading-tight tracking-tight group-hover:text-blue-700 transition-colors">
                            {study.title}
                        </h3>
                    </div>
                    <div className="shrink-0 bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded">
                        {study.year_verified}
                    </div>
                </div>

                <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {study.location}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {study.year}
                    </div>
                    {size && (
                        <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" /> {size}
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Project Scope</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                        {scope}
                    </p>
                </div>

                {chain && (
                    <p className="text-xs text-slate-500 mb-3">
                        <span className="font-semibold text-slate-700">Operator:</span> {chain}
                    </p>
                )}

                <div className="mt-auto pt-3 border-t">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Key Insights</h4>
                    <ul className="space-y-1.5">
                        {study.notes.slice(0, 2).map((note, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug">
                                <CheckCircle className="w-3 h-3 text-green-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{note}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bg-slate-50 p-3 border-t text-center">
                <span className="text-xs font-medium text-blue-600 group-hover:text-blue-800 flex items-center justify-center gap-1 w-full transition-colors">
                    View Full Case Study <ArrowUpRight className="w-3 h-3" />
                </span>
            </div>
        </Link>
    );
}
