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
    Users,
    ExternalLink,
    Phone,
    CheckCircle,
    AlertTriangle,
    Leaf,
    Globe
} from 'lucide-react';
import SourceReferences from '@/components/SourceReferences';

interface CaseStudy {
    id: string;
    title: string;
    type: string;
    details: Record<string, string>;
    location: string;
    year: string;
    size?: string;
    category: string;
    phone?: string;
    website?: string;
    scope?: string;
    notes: string[];
    chain?: string;
    year_verified?: number;
    co2Savings?: string;
    architect?: string;
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

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const study = await getCaseStudy(id);

    if (!study) {
        notFound();
    }

    // Extract key details
    const chainInfo = study.details?.chain || study.chain;
    const operatorInfo = study.details?.['operatør'] || study.details?.['eier/operatør'] || study.details?.operatør;
    const websiteUrl = study.details?.website || study.website;
    const hotelWebsite = study.details?.['hotel website'] || study.details?.['hotel-specific'];
    const contactInfo = study.details?.contact;

    // Filter out empty or redundant notes
    const meaningfulNotes = study.notes?.filter(note =>
        note &&
        note.length > 10 &&
        !note.includes('←') &&
        !note.startsWith('Contact')
    ) || [];

    // Extract contacts from notes
    const contactNotes = study.notes?.filter(note =>
        note.includes('Contact') || note.includes('PRIORITY CONTACT')
    ) || [];

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Back Link */}
                <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Case Studies
                </Link>

                {/* Header */}
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-3">
                                    {study.category}
                                </span>
                                <h1 className="text-3xl font-bold mb-2">{study.title}</h1>
                                <div className="flex flex-wrap items-center gap-4 text-slate-300 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" />
                                        <span>{study.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span>{study.year}</span>
                                    </div>
                                    {study.size && (
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-4 h-4" />
                                            <span>{study.size}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {websiteUrl && (
                                <a
                                    href={websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Scope */}
                        {study.scope && (
                            <div className="mb-6">
                                <h2 className="text-lg font-bold text-slate-900 mb-2">Project Scope</h2>
                                <p className="text-slate-600">{study.scope}</p>
                            </div>
                        )}

                        {/* Key Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {chainInfo && (
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Chain</span>
                                    <p className="text-sm font-semibold text-slate-900 mt-1">{chainInfo}</p>
                                </div>
                            )}
                            {operatorInfo && (
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Operator</span>
                                    <p className="text-sm font-semibold text-slate-900 mt-1">{operatorInfo}</p>
                                </div>
                            )}
                            {study.year_verified && (
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">Verified</span>
                                    <p className="text-sm font-semibold text-slate-900 mt-1">{study.year_verified}</p>
                                </div>
                            )}
                            {study.co2Savings && (
                                <div className="bg-emerald-50 rounded-lg p-4">
                                    <span className="text-xs text-emerald-600 uppercase tracking-wider">CO2 Impact</span>
                                    <p className="text-sm font-semibold text-emerald-900 mt-1">{study.co2Savings}</p>
                                </div>
                            )}
                        </div>

                        {/* Architect */}
                        {study.architect && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-semibold text-blue-900">Architect</span>
                                </div>
                                <p className="text-sm text-blue-700">{study.architect}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Key Insights */}
                        {meaningfulNotes.length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Leaf className="w-5 h-5 text-emerald-600" />
                                    Key Insights
                                </h2>
                                <ul className="space-y-3">
                                    {meaningfulNotes.slice(0, 8).map((note, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                            <span className="text-sm text-slate-600">{note}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Additional Details */}
                        {Object.keys(study.details).length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h2 className="text-lg font-bold text-slate-900 mb-4">Project Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(study.details)
                                        .filter(([key, value]) =>
                                            value &&
                                            typeof value === 'string' &&
                                            value.length > 0 &&
                                            !key.includes('email') &&
                                            !key.includes('phone') &&
                                            !key.includes('linkedin')
                                        )
                                        .slice(0, 10)
                                        .map(([key, value]) => (
                                            <div key={key} className="bg-slate-50 rounded-lg p-3">
                                                <span className="text-xs text-slate-500 capitalize">
                                                    {key.replace(/_/g, ' ').replace(/-/g, ' ')}
                                                </span>
                                                <p className="text-sm font-medium text-slate-900 mt-0.5">{value}</p>
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
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                {study.phone && (
                                    <a
                                        href={`tel:${study.phone.replace(/\s/g, '')}`}
                                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600"
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
                                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span className="truncate">{websiteUrl}</span>
                                    </a>
                                )}
                                {study.details?.email && (
                                    <a
                                        href={`mailto:${study.details.email}`}
                                        className="flex items-center gap-3 text-sm text-slate-600 hover:text-blue-600"
                                    >
                                        <span className="w-4 h-4 text-center">@</span>
                                        <span className="truncate">{study.details.email}</span>
                                    </a>
                                )}
                            </div>

                            {contactNotes.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Key Contacts</h4>
                                    {contactNotes.map((note, idx) => (
                                        <p key={idx} className="text-xs text-slate-600 mb-1">{note}</p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Scalability Indicator */}
                        {study.chain && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h3 className="font-bold text-slate-900 mb-3">Scalability Potential</h3>
                                <div className="flex items-center gap-2">
                                    {study.chain.includes('HIGH') || study.chain.includes('MAXIMUM') || study.chain.includes('HIGHEST') ? (
                                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                                            High Scalability
                                        </span>
                                    ) : study.chain.includes('MEDIUM') ? (
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                                            Medium Scalability
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                                            Limited Scalability
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500 mt-2">{study.chain}</p>
                            </div>
                        )}

                        {/* Sources */}
                        {study.sourceRefs && study.sourceRefs.length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <SourceReferences sourceRefs={study.sourceRefs} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Links */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
                    <h2 className="text-xl font-bold mb-4">Explore Related Content</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Case Studies
                        </Link>
                        <Link
                            href="/scenarios"
                            className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                        >
                            Project Scenarios
                        </Link>
                        <Link
                            href="/experts"
                            className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                        >
                            Find Consultants
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
