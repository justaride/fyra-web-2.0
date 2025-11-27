import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { EnhancedConsultantCard } from '@/components/EnhancedConsultantCard';
import { ConsultantCard } from '@/components/ConsultantCard';
import { Users, ShieldCheck, Lightbulb, Building2, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface DecisionCriteria {
    when: string[];
    typicalProject?: string;
}

interface ConsultantsEnhancedData {
    tier1: any[];
    decisionFramework: {
        useForsen: DecisionCriteria;
        useSweco: DecisionCriteria;
        useHifab: DecisionCriteria;
    };
    marketGap: {
        finding: string;
        breakdown: Record<string, string>;
        fyraOpportunity: string;
    };
}

async function getEnhancedConsultants(): Promise<ConsultantsEnhancedData> {
    const filePath = path.join(process.cwd(), 'data', 'consultants_enhanced.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getBasicConsultants() {
    const filePath = path.join(process.cwd(), 'data', 'consultants.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ExpertsPage() {
    const enhancedData = await getEnhancedConsultants();
    const basicConsultants = await getBasicConsultants();

    // Get specialist consultants from basic data (Kompanjonen, etc.)
    const specialists = basicConsultants.filter((c: any) => c.tier === 'Specialist');

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-10 max-w-3xl">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Expert Network</h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        A curated network of project managers, architects, and specialists with proven circular construction
                        capabilities. These partners have been vetted for their ability to navigate Nordic regulations and
                        deliver industrial-scale reuse in the hospitality sector.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">{enhancedData.tier1.length + specialists.length} Verified Firms</h3>
                            <p className="text-sm text-slate-500">Project Management & Specialists</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Regulatory Experts</h3>
                            <p className="text-sm text-slate-500">BBR, PBL & Fire Safety</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Circular Specialists</h3>
                            <p className="text-sm text-slate-500">Sourcing & Compliance</p>
                        </div>
                    </div>
                </div>

                {/* Market Gap Insight */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 mb-12 text-white">
                    <h2 className="text-lg font-bold mb-2">Market Insight</h2>
                    <p className="text-blue-100 mb-4">{enhancedData.marketGap.finding}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(enhancedData.marketGap.breakdown).map(([key, value]) => (
                            <div key={key} className="bg-white/10 rounded-lg p-3">
                                <span className="text-sm font-semibold">{key.replace('_', ' ').toUpperCase()}</span>
                                <p className="text-xs text-blue-100 mt-1">{value}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-blue-200 mt-4 italic">{enhancedData.marketGap.fyraOpportunity}</p>
                </div>

                {/* Decision Framework */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <span className="w-2 h-8 bg-emerald-500 rounded-sm"></span>
                        When to Use Each Consultant
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Forsen */}
                        <div className="bg-white rounded-xl border p-5">
                            <h3 className="font-bold text-slate-900 mb-3">Use FORSEN when...</h3>
                            <ul className="space-y-2">
                                {enhancedData.decisionFramework.useForsen.when.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {enhancedData.decisionFramework.useForsen.typicalProject && (
                                <p className="mt-3 text-xs text-slate-500 bg-slate-50 rounded p-2">
                                    <strong>Typical:</strong> {enhancedData.decisionFramework.useForsen.typicalProject}
                                </p>
                            )}
                        </div>

                        {/* Sweco */}
                        <div className="bg-white rounded-xl border p-5">
                            <h3 className="font-bold text-slate-900 mb-3">Use SWECO when...</h3>
                            <ul className="space-y-2">
                                {enhancedData.decisionFramework.useSweco.when.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {enhancedData.decisionFramework.useSweco.typicalProject && (
                                <p className="mt-3 text-xs text-slate-500 bg-slate-50 rounded p-2">
                                    <strong>Typical:</strong> {enhancedData.decisionFramework.useSweco.typicalProject}
                                </p>
                            )}
                        </div>

                        {/* Hifab */}
                        <div className="bg-white rounded-xl border p-5">
                            <h3 className="font-bold text-slate-900 mb-3">Use HIFAB when...</h3>
                            <ul className="space-y-2">
                                {enhancedData.decisionFramework.useHifab.when.slice(0, 4).map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            {enhancedData.decisionFramework.useHifab.typicalProject && (
                                <p className="mt-3 text-xs text-slate-500 bg-slate-50 rounded p-2">
                                    <strong>Typical:</strong> {enhancedData.decisionFramework.useHifab.typicalProject}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Tier 1 - Strategic Partners */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-600 rounded-sm"></span>
                            Strategic Project Management Partners
                        </h2>
                        <p className="text-slate-600 mb-6 -mt-2">
                            Tier 1 consultants with proven hospitality experience and circular construction capabilities.
                        </p>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {enhancedData.tier1.map((consultant: any) => (
                                <EnhancedConsultantCard key={consultant.id} consultant={consultant} />
                            ))}
                        </div>
                    </section>

                    {/* Specialists */}
                    {specialists.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-amber-500 rounded-sm"></span>
                                Specialist Partners
                            </h2>
                            <p className="text-slate-600 mb-6 -mt-2">
                                Specialized consultants for sourcing, compliance, and niche expertise.
                            </p>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {specialists.map((consultant: any) => (
                                    <ConsultantCard key={consultant.id} consultant={consultant} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold mb-3">Need Project Support?</h2>
                        <p className="text-slate-300 mb-6">
                            Fyra can help match your project with the right consultant based on scope,
                            timeline, and sustainability targets. Contact us for a personalized recommendation.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/scenarios"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                            >
                                View Project Scenarios
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                            >
                                Browse Suppliers
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
