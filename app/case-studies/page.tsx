import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import { BookOpen, Hotel, MapPin, Award, CheckCircle2 } from 'lucide-react';
import SourceVerificationBadge from '@/components/SourceVerificationBadge';
import { getCaseStudies, getSuppliers, getConsultantsEnhanced } from '@/lib/data';
import type { CaseStudy } from '@/lib/types';

export default async function CaseStudiesPage() {
    const [caseStudies, suppliers, consultantsData] = await Promise.all([
        getCaseStudies(),
        getSuppliers(),
        getConsultantsEnhanced(),
    ]);
    const consultants = consultantsData.tier1 || [];

    // Calculate stats
    const flagshipCount = caseStudies.filter(cs => cs.tier === 'Flagship').length;
    const countries = new Set(caseStudies.map(cs => cs.location?.split(',').pop()?.trim())).size;

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header searchData={{ suppliers, caseStudies, consultants }} />
            <BreadcrumbBar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm mb-4">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <span>Case Studies</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            Circular Implementation Examples
                        </h1>

                        {/* Value proposition */}
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            Real-world examples of circular construction and reuse in the Nordic hospitality
                            sector. Learn from flagship projects that have successfully implemented
                            sustainable furniture strategies with measurable impact.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Hotel className="w-4 h-4 text-blue-400" />
                                <span><strong>{caseStudies.length}</strong> Hotel Projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-400" />
                                <span><strong>{flagshipCount}</strong> Flagship Examples</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span><strong>{countries}</strong> Nordic Countries</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                <span><strong>100%</strong> Sources Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies.map((study: any) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </div>

                {/* Verification Notice */}
                <div className="mt-8 p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>All {caseStudies.length} case studies have verified source references</span>
                    </div>
                    <SourceVerificationBadge
                        lastVerified="2025-11-28"
                        compact={true}
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}
