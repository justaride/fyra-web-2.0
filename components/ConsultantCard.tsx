import { Building, MapPin, CheckCircle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Consultant {
    id: string;
    name: string;
    role: string;
    tier: string;
    category: string;
    description: string;
    locations: string[];
    services: string[];
    keyProjects: string[];
    contact?: {
        name?: string;
        title?: string;
        email?: string;
        phone?: string;
        website?: string;
    };
    collaborationType: string;
}

interface ConsultantCardProps {
    consultant: Consultant;
}

export function ConsultantCard({ consultant }: ConsultantCardProps) {
    const isPrimary = consultant.tier === 'Primary';
    const isSecondary = consultant.tier === 'Secondary';

    return (
        <div className={cn(
            "bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md",
            isPrimary ? "border-blue-200 shadow-sm ring-1 ring-blue-100" : "border-slate-200"
        )}>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{consultant.name}</h3>
                            {isPrimary && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                        </div>
                        <p className="text-sm font-medium text-blue-600">{consultant.role}</p>
                    </div>
                    <span className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        isPrimary ? "bg-blue-50 text-blue-700 border-blue-200" :
                            isSecondary ? "bg-slate-100 text-slate-700 border-slate-200" :
                                "bg-slate-50 text-slate-600 border-slate-200"
                    )}>
                        {consultant.category}
                    </span>
                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    {consultant.description}
                </p>

                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <Building className="w-3.5 h-3.5" /> Key Services
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {consultant.services.map((service, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border border-slate-100">
                                    {service}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" /> Proven Track Record
                        </h4>
                        <ul className="space-y-1">
                            {consultant.keyProjects.map((project, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                    <span className="block w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                    {project}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {consultant.locations.join(", ")}
                        </div>
                        {consultant.contact && (
                            <div className="font-medium text-slate-700">
                                {consultant.contact.name || consultant.contact.title}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-xs font-medium text-slate-600 flex justify-between items-center">
                <span>Collaboration: {consultant.collaborationType}</span>
                {isPrimary && <span className="text-blue-600">Strategic Partner</span>}
            </div>
        </div>
    );
}
