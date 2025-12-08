import { Award, Building2, Leaf, Recycle, CheckCircle, AlertCircle, ArrowRight, ExternalLink, FileCheck, FileSearch } from "lucide-react";
import { loadJsonFile, getSuppliers, getCaseStudies, getConsultantsEnhanced } from '@/lib/data';
import { cn } from "@/lib/utils";
import { Header } from '@/components/Header';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import SourceVerificationBadge from '@/components/SourceVerificationBadge';
import OfficialSourceLink from '@/components/OfficialSourceLink';
import RegulatorySourceCard from '@/components/RegulatorySourceCard';

interface Certification {
    id: string;
    name: string;
    shortName: string;
    type: string;
    scope: string;
    coverage: string;
    adoptionLevel: string;
    description: string;
    certificationLevels: string[];
    relevanceScore: number;
    interiorCriteria: {
        furniture: { strength: string; requirements: string; specifics: string[] };
        textiles: { strength: string; requirements: string; specifics: string[] };
        lighting: { strength: string; requirements: string; specifics: string[] };
        chemicals: { strength: string; requirements: string; specifics: string[] };
    };
    circularEconomy: {
        score: string;
        strengths: string[];
        gaps: string[];
    };
    marketAdoption: {
        sweden: string;
        trend: string;
        majorUsers: string[];
    };
    certificationProcess: {
        assessor: string;
        duration: string;
        validity: string;
        cost: string;
    };
    fyraRelevance: {
        opportunity: string;
        challenge: string;
    };
    website: string;
    officialDocs?: {
        regulatorySourceId: string;
        criteriaUrl: string;
        applicationUrl?: string;
        currentVersion?: string;
        lastVerified: string;
    };
}

interface RegulatorySource {
    id: string;
    name: string;
    shortName: string;
    type: string;
    jurisdiction: string;
    category: string;
    officialUrl: string;
    pdfUrl?: string;
    purchaseUrl?: string;
    criteriaUrl?: string;
    description: string;
    keyExcerpts?: { section: string; text: string; relevance: string }[];
    verification: { lastChecked: string; urlValid: boolean };
    icon: string;
    color: string;
}

async function getCertifications(): Promise<Certification[]> {
    return loadJsonFile('certifications.json', []);
}

async function getEnvironmentalSources(): Promise<RegulatorySource[]> {
    interface RegSourcesFile {
        sources: RegulatorySource[];
    }
    const data = await loadJsonFile<RegSourcesFile>('regulatory_sources.json', { sources: [] });
    return data.sources.filter((s: RegulatorySource) => s.category === 'environmental');
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'Operational': return <Building2 className="w-4 h-4" />;
        case 'Building': return <Award className="w-4 h-4" />;
        case 'Product': return <Recycle className="w-4 h-4" />;
        default: return <Leaf className="w-4 h-4" />;
    }
}

function getStrengthColor(strength: string) {
    switch (strength) {
        case 'Very High': return 'bg-green-100 text-green-800 border-green-200';
        case 'High': return 'bg-green-50 text-green-700 border-green-200';
        case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        case 'Low': return 'bg-slate-100 text-slate-600 border-slate-200';
        case 'Very Low': return 'bg-slate-50 text-slate-500 border-slate-200';
        default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
}

function getAdoptionColor(level: string) {
    switch (level) {
        case 'Very High': return 'bg-green-500';
        case 'High': return 'bg-green-400';
        case 'Medium': return 'bg-yellow-400';
        case 'Low': return 'bg-orange-400';
        case 'Very Low (new)': return 'bg-purple-400';
        default: return 'bg-slate-400';
    }
}

function RelevanceStars({ score }: { score: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <div
                    key={star}
                    className={cn(
                        "w-2 h-2 rounded-full",
                        star <= score ? "bg-blue-500" : "bg-slate-200"
                    )}
                />
            ))}
        </div>
    );
}

export default async function CertificationsPage() {
    const [certifications, environmentalSources, suppliers, caseStudies, consultantsData] = await Promise.all([
        getCertifications(),
        getEnvironmentalSources(),
        getSuppliers(),
        getCaseStudies(),
        getConsultantsEnhanced(),
    ]);
    const consultants = consultantsData.tier1 || [];

    // Sort by relevance score
    const sortedCertifications = [...certifications].sort((a, b) => b.relevanceScore - a.relevanceScore);

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header searchData={{ suppliers, caseStudies, consultants }} />
            <BreadcrumbBar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm mb-4">
                            <Award className="w-4 h-4 text-amber-400" />
                            <span>Certifications</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            Hotel Certifications & Sustainability Systems
                        </h1>

                        {/* Value proposition */}
                        <p className="text-lg text-slate-300 leading-relaxed mb-4">
                            Comprehensive mapping of certifications used in Sweden and the Nordics,
                            with focus on interior design and circular economy criteria.
                        </p>

                        {/* Key insight */}
                        <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4 mb-6">
                            <p className="text-amber-200 text-sm">
                                <strong>Key Finding:</strong> Most hotel certifications focus on operations (energy, water, waste),
                                not design and material selection. This creates a significant opportunity for circular interior design.
                            </p>
                        </div>

                        {/* Category badges */}
                        <div className="flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full">
                                <Building2 className="w-3 h-3" /> Operational
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full">
                                <Award className="w-3 h-3" /> Building
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full">
                                <Recycle className="w-3 h-3" /> Product
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sortedCertifications.map((cert) => (
                        <div key={cert.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                            {/* Header */}
                            <div className="px-6 py-4 border-b bg-slate-50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center",
                                            cert.type === 'Operational' ? 'bg-blue-100 text-blue-600' :
                                            cert.type === 'Building' ? 'bg-amber-100 text-amber-600' :
                                            cert.type === 'Product' ? 'bg-green-100 text-green-600' :
                                            'bg-slate-100 text-slate-600'
                                        )}>
                                            {getTypeIcon(cert.type)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900">{cert.name}</h3>
                                            <p className="text-xs text-slate-500">{cert.scope}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1.5 justify-end">
                                            <span className="text-[10px] text-slate-500">Fyra Relevance</span>
                                            <RelevanceStars score={cert.relevanceScore} />
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-1 justify-end">
                                            <div className={cn("w-2 h-2 rounded-full", getAdoptionColor(cert.adoptionLevel))} />
                                            <span className="text-[10px] text-slate-500">{cert.adoptionLevel} adoption</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-sm text-slate-600 mb-4">{cert.description}</p>

                                {/* Interior Criteria */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Interior Criteria Strength</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(['furniture', 'textiles', 'lighting', 'chemicals'] as const).map((area) => (
                                            <div key={area} className="text-center">
                                                <span className={cn(
                                                    "inline-block px-2 py-0.5 rounded text-[10px] font-medium border",
                                                    getStrengthColor(cert.interiorCriteria[area].strength)
                                                )}>
                                                    {cert.interiorCriteria[area].strength}
                                                </span>
                                                <p className="text-[10px] text-slate-500 mt-1 capitalize">{area}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Circular Economy Score */}
                                <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-xs font-semibold text-slate-700">Circular Economy</h4>
                                        <span className={cn(
                                            "text-xs font-medium px-2 py-0.5 rounded",
                                            cert.circularEconomy.score.includes('Very High') ? 'bg-green-100 text-green-700' :
                                            cert.circularEconomy.score.includes('High') ? 'bg-green-50 text-green-600' :
                                            cert.circularEconomy.score.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-slate-100 text-slate-600'
                                        )}>
                                            {cert.circularEconomy.score}
                                        </span>
                                    </div>
                                    {cert.circularEconomy.strengths.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {cert.circularEconomy.strengths.slice(0, 3).map((strength, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 text-[10px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                                                    <CheckCircle className="w-2.5 h-2.5" /> {strength}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {cert.circularEconomy.gaps.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {cert.circularEconomy.gaps.slice(0, 2).map((gap, idx) => (
                                                <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    Gap: {gap}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Market Adoption */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Sweden/Nordics</h4>
                                    <p className="text-xs text-slate-600">{cert.marketAdoption.sweden}</p>
                                    {cert.marketAdoption.majorUsers && cert.marketAdoption.majorUsers.length > 0 && (
                                        <p className="text-[10px] text-slate-500 mt-1">
                                            Used by: {cert.marketAdoption.majorUsers.slice(0, 3).join(', ')}
                                        </p>
                                    )}
                                </div>

                                {/* Fyra Relevance */}
                                <div className="border-t pt-4 mt-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <h5 className="text-[10px] font-semibold text-green-700 uppercase mb-1">Opportunity</h5>
                                            <p className="text-[10px] text-slate-600 leading-relaxed">{cert.fyraRelevance.opportunity}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-semibold text-amber-700 uppercase mb-1">Challenge</h5>
                                            <p className="text-[10px] text-slate-600 leading-relaxed">{cert.fyraRelevance.challenge}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="mt-4 pt-3 border-t">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-[10px] text-slate-500">
                                            <span className="font-medium">Process:</span> {cert.certificationProcess.duration}
                                        </div>
                                        {cert.officialDocs && (
                                            <SourceVerificationBadge
                                                lastVerified={cert.officialDocs.lastVerified}
                                                compact={true}
                                            />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {cert.officialDocs ? (
                                            <>
                                                <OfficialSourceLink
                                                    url={cert.officialDocs.criteriaUrl}
                                                    label="Criteria"
                                                    type="primary"
                                                    size="sm"
                                                />
                                                {cert.officialDocs.applicationUrl && (
                                                    <OfficialSourceLink
                                                        url={cert.officialDocs.applicationUrl}
                                                        label="Apply"
                                                        type="secondary"
                                                        size="sm"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={cert.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                                            >
                                                Learn more <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Table */}
                <div className="mt-12 bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b bg-slate-50">
                        <h3 className="font-semibold text-slate-900">Quick Comparison: Interior & Circular Criteria</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead className="bg-slate-50 border-b">
                                <tr>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-700">Certification</th>
                                    <th className="text-center px-3 py-3 font-semibold text-slate-700">Furniture</th>
                                    <th className="text-center px-3 py-3 font-semibold text-slate-700">Textiles</th>
                                    <th className="text-center px-3 py-3 font-semibold text-slate-700">Circular</th>
                                    <th className="text-center px-3 py-3 font-semibold text-slate-700">Reuse Path</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {sortedCertifications.map((cert) => (
                                    <tr key={cert.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-900">{cert.shortName}</td>
                                        <td className="px-3 py-3 text-center">
                                            <span className={cn(
                                                "inline-block px-2 py-0.5 rounded text-[10px] font-medium",
                                                getStrengthColor(cert.interiorCriteria.furniture.strength)
                                            )}>
                                                {cert.interiorCriteria.furniture.strength}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className={cn(
                                                "inline-block px-2 py-0.5 rounded text-[10px] font-medium",
                                                getStrengthColor(cert.interiorCriteria.textiles.strength)
                                            )}>
                                                {cert.interiorCriteria.textiles.strength}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            <span className={cn(
                                                "inline-block px-2 py-0.5 rounded text-[10px] font-medium",
                                                cert.circularEconomy.score.includes('Very High') ? 'bg-green-100 text-green-700' :
                                                cert.circularEconomy.score.includes('High') ? 'bg-green-50 text-green-600' :
                                                cert.circularEconomy.score.includes('Medium') ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-slate-100 text-slate-600'
                                            )}>
                                                {cert.circularEconomy.score}
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-center">
                                            {cert.circularEconomy.strengths.some(s =>
                                                s.toLowerCase().includes('reuse') ||
                                                s.toLowerCase().includes('reclaimed') ||
                                                s.toLowerCase().includes('take-back')
                                            ) ? (
                                                <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                                            ) : (
                                                <span className="text-slate-300">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Official Environmental Sources Section */}
                <section className="mt-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <FileSearch className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Official Certification Sources</h2>
                            <p className="text-sm text-slate-500">Verified links to certification criteria and application portals</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {environmentalSources.map((source) => (
                            <RegulatorySourceCard
                                key={source.id}
                                source={source}
                                compact={true}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
