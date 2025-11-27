import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Building2,
    ExternalLink,
    Phone,
    CheckCircle2,
    Leaf,
    Globe,
    TrendingUp,
    Users2,
    Recycle,
    Mail,
    Star,
    ArrowRight
} from 'lucide-react';
import SourceReferences from '@/components/SourceReferences';
import { JsonLd, generateArticleSchema } from '@/components/JsonLd';

interface CaseStudyContact {
    name?: string;
    title?: string;
    email?: string;
    note?: string;
}

interface CaseStudyMetrics {
    co2Impact?: string;
    circularContent?: string;
    materialReuse?: string;
    certification?: string;
}

interface CaseStudy {
    id: string;
    title: string;
    type: string;
    tier?: string;
    fyraRelevance?: number;
    details: Record<string, string>;
    contacts?: CaseStudyContact[];
    location: string;
    year: string;
    size?: string;
    category?: string;
    phone?: string;
    website?: string;
    notes?: string[];
    circularFeatures?: string[];
    metrics?: CaseStudyMetrics;
    chain?: string;
    chainPotential?: string;
    year_verified?: number;
    sourceRefs?: string[];
}

async function getCaseStudies(): Promise<CaseStudy[]> {
    const filePath = path.join(process.cwd(), 'data', 'caseStudies_clean.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    const caseStudies = await getCaseStudies();
    return caseStudies.find(study => study.id === id);
}

export async function generateStaticParams() {
    const caseStudies = await getCaseStudies();
    return caseStudies.map((study) => ({
        id: study.id,
    }));
}

// Tier badge component
function TierBadge({ tier }: { tier?: string }) {
    if (!tier) return null;

    const styles: Record<string, string> = {
        'Flagship': 'bg-amber-100 text-amber-800 ring-amber-600/20',
        'Showcase': 'bg-purple-100 text-purple-800 ring-purple-600/20',
        'Reference': 'bg-blue-100 text-blue-800 ring-blue-600/20',
        'Scale Reference': 'bg-slate-100 text-slate-700 ring-slate-600/20',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${styles[tier] || styles['Reference']}`}>
            <Star className="w-3 h-3" />
            {tier}
        </span>
    );
}

// Relevance score indicator
function RelevanceScore({ score }: { score?: number }) {
    if (!score) return null;

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Fyra Relevance:</span>
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-6 rounded-sm ${i <= score ? 'bg-teal-500' : 'bg-slate-200'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const study = await getCaseStudy(id);

    if (!study) {
        notFound();
    }

    const jsonLdData = generateArticleSchema({
        headline: study.title,
        description: study.details?.scope || `Circular construction case study: ${study.title} in ${study.location}`,
        datePublished: study.year,
        author: 'Fyra Circular Platform',
    });

    const chainInfo = study.details?.chain || study.chain;
    const websiteUrl = study.details?.website || study.website;

    return (
        <main className="min-h-screen bg-slate-50">
            <JsonLd data={jsonLdData} />
            <Header />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Back Link */}
                <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-6 text-sm font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Case Studies
                </Link>

                {/* Hero Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-900 text-white p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <TierBadge tier={study.tier} />
                                    {study.category && (
                                        <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium backdrop-blur-sm">
                                            {study.category}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                                    {study.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-teal-400" />
                                        <span>{study.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-teal-400" />
                                        <span>{study.year}</span>
                                    </div>
                                    {study.size && (
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-teal-400" />
                                            <span>{study.size}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <RelevanceScore score={study.fyraRelevance} />
                                {websiteUrl && (
                                    <a
                                        href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-teal-500/25"
                                    >
                                        <Globe className="w-4 h-4" />
                                        Visit Hotel Website
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        {study.metrics && (
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    {study.metrics.co2Impact && (
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-teal-300 mb-1">
                                                <Leaf className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase tracking-wider">CO2 Impact</span>
                                            </div>
                                            <p className="text-white font-semibold">{study.metrics.co2Impact}</p>
                                        </div>
                                    )}
                                    {study.metrics.circularContent && (
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-teal-300 mb-1">
                                                <Recycle className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase tracking-wider">Circular</span>
                                            </div>
                                            <p className="text-white font-semibold">{study.metrics.circularContent}</p>
                                        </div>
                                    )}
                                    {study.metrics.certification && (
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-teal-300 mb-1">
                                                <Star className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase tracking-wider">Certified</span>
                                            </div>
                                            <p className="text-white font-semibold">{study.metrics.certification}</p>
                                        </div>
                                    )}
                                    {study.year_verified && (
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                            <div className="flex items-center gap-2 text-teal-300 mb-1">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span className="text-xs font-medium uppercase tracking-wider">Verified</span>
                                            </div>
                                            <p className="text-white font-semibold">{study.year_verified}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Circular Features */}
                        {study.circularFeatures && study.circularFeatures.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center">
                                        <Recycle className="w-5 h-5 text-teal-600" />
                                    </div>
                                    Circular Features
                                </h2>
                                <ul className="space-y-4">
                                    {study.circularFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                                            </div>
                                            <span className="text-slate-700 leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Key Insights from Notes */}
                        {study.notes && study.notes.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                        <Leaf className="w-5 h-5 text-amber-600" />
                                    </div>
                                    Key Insights
                                </h2>
                                <ul className="space-y-4">
                                    {study.notes.filter(note => note && note.length > 10).map((note, idx) => (
                                        <li key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-700">
                                                {idx + 1}
                                            </span>
                                            <span className="text-slate-700 leading-relaxed">{note}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Project Details */}
                        {Object.keys(study.details).length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    Project Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(study.details)
                                        .filter(([key, value]) =>
                                            value &&
                                            typeof value === 'string' &&
                                            value.length > 0 &&
                                            !key.includes('email') &&
                                            !key.includes('phone')
                                        )
                                        .slice(0, 8)
                                        .map(([key, value]) => (
                                            <div key={key} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                                    {key.replace(/_/g, ' ').replace(/-/g, ' ')}
                                                </span>
                                                <p className="text-slate-900 font-medium mt-1">{value}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Users2 className="w-5 h-5 text-teal-600" />
                                Contact Information
                            </h3>

                            {study.contacts && study.contacts.length > 0 ? (
                                <div className="space-y-4">
                                    {study.contacts.map((contact, idx) => (
                                        <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                                            {contact.name && (
                                                <p className="font-semibold text-slate-900">{contact.name}</p>
                                            )}
                                            {contact.title && (
                                                <p className="text-sm text-slate-600">{contact.title}</p>
                                            )}
                                            {contact.email && (
                                                <a href={`mailto:${contact.email}`} className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1.5 mt-1">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {contact.email}
                                                </a>
                                            )}
                                            {contact.note && (
                                                <p className="text-xs text-slate-500 mt-2">{contact.note}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {study.phone && (
                                        <a
                                            href={`tel:${study.phone.replace(/\s/g, '')}`}
                                            className="flex items-center gap-3 text-sm text-slate-600 hover:text-teal-600 transition-colors"
                                        >
                                            <Phone className="w-4 h-4" />
                                            <span>{study.phone}</span>
                                        </a>
                                    )}
                                    {websiteUrl && (
                                        <a
                                            href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 text-sm text-slate-600 hover:text-teal-600 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span className="truncate">{websiteUrl}</span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Chain & Scalability */}
                        {(chainInfo || study.chainPotential) && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-teal-600" />
                                    Scalability Potential
                                </h3>

                                {chainInfo && (
                                    <div className="mb-4">
                                        <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Hotel Chain</span>
                                        <p className="text-slate-900 font-medium mt-1">{chainInfo}</p>
                                    </div>
                                )}

                                {study.chainPotential && (
                                    <div className="p-4 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            {study.chainPotential.includes('MAXIMUM') || study.chainPotential.includes('HIGH') ? (
                                                <span className="px-2.5 py-0.5 bg-teal-100 text-teal-800 text-xs font-bold rounded-full">
                                                    HIGH POTENTIAL
                                                </span>
                                            ) : study.chainPotential.includes('MEDIUM') ? (
                                                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                                                    MEDIUM POTENTIAL
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                                                    LIMITED
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-teal-800">{study.chainPotential}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sources */}
                        {study.sourceRefs && study.sourceRefs.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <SourceReferences sourceRefs={study.sourceRefs} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Links Footer */}
                <div className="mt-12 bg-gradient-to-br from-slate-800 to-teal-900 rounded-2xl p-8 lg:p-10 text-white">
                    <h2 className="text-xl font-bold mb-2">Explore Related Content</h2>
                    <p className="text-slate-300 mb-6">Find more inspiration and resources for your circular construction project.</p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Case Studies
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-400 transition-colors text-sm"
                        >
                            Find Suppliers
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/experts"
                            className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-white/20 transition-colors text-sm backdrop-blur-sm"
                        >
                            Connect with Experts
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
