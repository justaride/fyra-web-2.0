'use client';

import { useState } from 'react';
import { Building, MapPin, Star, Users, ExternalLink, ChevronDown, ChevronUp, Briefcase, Shield, Leaf, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedProject {
    name: string;
    year?: number;
    location: string;
    client?: string;
    scope?: string;
    role?: string;
    achievement?: string;
    relevance: string;
    confidence?: string;
    outcomes?: {
        materialsReused?: string;
        co2Saved?: string;
        totalSavings?: string;
        certifications?: string[];
    };
}

interface KeyContact {
    role: string;
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    linkedin?: string;
    method?: string;
    note?: string;
}

interface SustainabilityRating {
    rating: string;
    description: string;
}

interface EnhancedConsultant {
    id: string;
    name: string;
    priority: string;
    tagline: string;
    description: string;
    headquarters: string;
    coverage: string;
    size: string;
    founded?: string | null;
    website: string;
    sourceRefs?: string[];
    businessModel?: string;
    keyContacts: KeyContact[];
    hospitalityProjects: {
        count: string;
        rating: string;
        description: string;
        featured: FeaturedProject[];
    };
    sustainability: {
        circularEconomy: SustainabilityRating;
        lca: SustainabilityRating;
        certifications: SustainabilityRating;
        fireSafety: SustainabilityRating;
        bvb?: SustainabilityRating;
        regulatory?: SustainabilityRating;
    };
    differentiators: string[];
    bestFor: string[];
    pricing: string;
    whyMatchForFyra?: {
        fit: string;
        reasons: string[];
    };
}

interface EnhancedConsultantCardProps {
    consultant: EnhancedConsultant;
}

function RatingStars({ rating }: { rating: string }) {
    const starCount = (rating.match(/★/g) || []).length;
    const emptyCount = (rating.match(/☆/g) || []).length;

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(starCount)].map((_, i) => (
                <Star key={`full-${i}`} className="w-3 h-3 text-amber-400 fill-amber-400" />
            ))}
            {[...Array(emptyCount)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-3 h-3 text-slate-300" />
            ))}
        </div>
    );
}

export function EnhancedConsultantCard({ consultant }: EnhancedConsultantCardProps) {
    const [expanded, setExpanded] = useState(false);

    const priorityColor = consultant.priority.includes('HIGHEST') ? 'emerald' :
                          consultant.priority.includes('VERY HIGH') ? 'blue' :
                          consultant.priority.includes('HIGH') ? 'amber' : 'slate';

    return (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            {/* Header */}
            <div className={cn(
                "p-6 border-b",
                priorityColor === 'emerald' ? "bg-emerald-50 border-emerald-100" :
                priorityColor === 'blue' ? "bg-blue-50 border-blue-100" :
                priorityColor === 'amber' ? "bg-amber-50 border-amber-100" :
                "bg-slate-50 border-slate-100"
            )}>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{consultant.name}</h3>
                            <RatingStars rating={consultant.priority} />
                        </div>
                        <p className="text-sm font-medium text-slate-600">{consultant.tagline}</p>
                    </div>
                    <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold",
                        priorityColor === 'emerald' ? "bg-emerald-100 text-emerald-700" :
                        priorityColor === 'blue' ? "bg-blue-100 text-blue-700" :
                        priorityColor === 'amber' ? "bg-amber-100 text-amber-700" :
                        "bg-slate-100 text-slate-700"
                    )}>
                        {consultant.priority.split(' ')[0]}
                    </span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {consultant.description}
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mt-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{consultant.headquarters}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span>{consultant.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        <span>{consultant.hospitalityProjects.count} hotel projects</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-5">
                {/* Sustainability Ratings */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Capabilities</h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                                <span className="text-xs font-medium text-slate-700">Circular Economy</span>
                            </div>
                            <RatingStars rating={consultant.sustainability.circularEconomy.rating} />
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Award className="w-3.5 h-3.5 text-blue-500" />
                                <span className="text-xs font-medium text-slate-700">Certifications</span>
                            </div>
                            <RatingStars rating={consultant.sustainability.certifications.rating} />
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Flame className="w-3.5 h-3.5 text-orange-500" />
                                <span className="text-xs font-medium text-slate-700">Fire Safety</span>
                            </div>
                            <RatingStars rating={consultant.sustainability.fireSafety.rating} />
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Building className="w-3.5 h-3.5 text-purple-500" />
                                <span className="text-xs font-medium text-slate-700">Hospitality</span>
                            </div>
                            <RatingStars rating={consultant.hospitalityProjects.rating} />
                        </div>
                    </div>
                </div>

                {/* Featured Project */}
                {consultant.hospitalityProjects.featured.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Featured Project</h4>
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-200">
                            <div className="flex justify-between items-start mb-2">
                                <h5 className="font-semibold text-slate-900">{consultant.hospitalityProjects.featured[0].name}</h5>
                                {consultant.hospitalityProjects.featured[0].year && (
                                    <span className="text-xs text-slate-500">{consultant.hospitalityProjects.featured[0].year}</span>
                                )}
                            </div>
                            <p className="text-xs text-slate-600 mb-2">{consultant.hospitalityProjects.featured[0].relevance}</p>
                            {consultant.hospitalityProjects.featured[0].outcomes && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {consultant.hospitalityProjects.featured[0].outcomes.materialsReused && (
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                                            {consultant.hospitalityProjects.featured[0].outcomes.materialsReused} reused
                                        </span>
                                    )}
                                    {consultant.hospitalityProjects.featured[0].outcomes.co2Saved && (
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                            {consultant.hospitalityProjects.featured[0].outcomes.co2Saved} CO2 saved
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Best For */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {consultant.bestFor.slice(0, 4).map((item, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-medium text-slate-900">Typical Pricing</span>
                    <span className="text-sm text-slate-600">{consultant.pricing}</span>
                </div>
            </div>

            {/* Expandable Section */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
                {expanded ? (
                    <>
                        <span>Show Less</span>
                        <ChevronUp className="w-4 h-4" />
                    </>
                ) : (
                    <>
                        <span>Show More Details</span>
                        <ChevronDown className="w-4 h-4" />
                    </>
                )}
            </button>

            {/* Expanded Content */}
            {expanded && (
                <div className="px-6 py-4 border-t border-slate-100 space-y-5 bg-slate-50">
                    {/* Differentiators */}
                    <div>
                        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Key Differentiators</h4>
                        <ul className="space-y-1.5">
                            {consultant.differentiators.map((diff, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                    {diff}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Detailed Sustainability */}
                    <div>
                        <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Detailed Capabilities</h4>
                        <div className="space-y-2">
                            <div className="bg-white rounded-lg p-3 border">
                                <div className="flex items-center gap-2 mb-1">
                                    <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-xs font-semibold text-slate-700">Circular Economy</span>
                                    <RatingStars rating={consultant.sustainability.circularEconomy.rating} />
                                </div>
                                <p className="text-xs text-slate-600">{consultant.sustainability.circularEconomy.description}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border">
                                <div className="flex items-center gap-2 mb-1">
                                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                                    <span className="text-xs font-semibold text-slate-700">Fire Safety</span>
                                    <RatingStars rating={consultant.sustainability.fireSafety.rating} />
                                </div>
                                <p className="text-xs text-slate-600">{consultant.sustainability.fireSafety.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    {consultant.keyContacts.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Contacts</h4>
                            <div className="space-y-2">
                                {consultant.keyContacts.slice(0, 3).map((contact, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-3 border text-xs">
                                        <span className="font-medium text-slate-700">{contact.role}</span>
                                        {contact.name && <span className="text-slate-600 ml-2">{contact.name}</span>}
                                        {contact.email && (
                                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline ml-2">
                                                {contact.email}
                                            </a>
                                        )}
                                        {contact.phone && <span className="text-slate-500 ml-2">{contact.phone}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Website Link */}
                    <a
                        href={consultant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            )}
        </div>
    );
}
