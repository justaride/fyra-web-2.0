import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Building2,
    Users,
    CheckCircle2,
    AlertTriangle,
    Star,
    Clock,
    Package,
    Truck,
    Shield,
    Award,
    ExternalLink,
    Briefcase,
    ArrowRight,
    Recycle
} from 'lucide-react';
import SourceReferences from '@/components/SourceReferences';
import { cn } from '@/lib/utils';
import { JsonLd, generateLocalBusinessSchema } from '@/components/JsonLd';
import { ChartWrapper, SupplierRadar } from '@/components/charts';

interface Supplier {
    id: string;
    name: string;
    description: string;
    location: string;
    services: string[];
    capabilities: {
        volume: string;
        leadTime: string;
        inventory: string;
        logistics: string;
    };
    contact: {
        name?: string;
        phone?: string;
        email?: string;
        website?: string;
    };
    certifications: string[];
    hospitalityReadiness: {
        tier: string;
        score: string;
        strengths: string[];
        gaps: string[];
    };
    b2bReadiness?: {
        stockAvailable?: boolean;
        sourcingService?: boolean;
        volumeCapacity?: string;
        slaGuarantee?: boolean;
        leadTimeStock?: string;
        leadTimeSourcing?: string;
        hotelProjectCapacity?: string;
    };
    regions?: string[];
    pricing: string;
    projectExamples: string[];
    strengths: string[];
    gaps: string[];
    founded?: string;
    employees?: string;
    bestFor: string[];
    avoidFor?: string[];
    confidenceLevel: string;
    sourceRefs?: string[];
    mapLocations?: Array<{
        name: string;
        address: string;
        lat: number;
        lng: number;
    }>;
}

async function getSuppliers(): Promise<Supplier[]> {
    const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getSupplier(id: string): Promise<Supplier | undefined> {
    const suppliers = await getSuppliers();
    return suppliers.find(s => s.id === id);
}

export async function generateStaticParams() {
    const suppliers = await getSuppliers();
    return suppliers.map((supplier) => ({
        id: supplier.id,
    }));
}

// Professional tier indicator using dots instead of emoji stars
function TierIndicator({ count, color }: { count: number; color: string }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={cn(
                        "w-2 h-2 rounded-full",
                        i <= count ? color : "bg-slate-200"
                    )}
                />
            ))}
        </div>
    );
}

function TierBadge({ tier }: { tier: string }) {
    const tierNum = tier.includes('1') ? 1 : tier.includes('2') ? 2 : 3;
    const styles = {
        1: 'bg-teal-100 text-teal-800 ring-teal-600/20',
        2: 'bg-blue-100 text-blue-800 ring-blue-600/20',
        3: 'bg-amber-100 text-amber-800 ring-amber-600/20'
    };
    const dotColors = {
        1: 'bg-teal-500',
        2: 'bg-blue-500',
        3: 'bg-amber-500'
    };

    return (
        <span className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ring-1 ring-inset", styles[tierNum as keyof typeof styles])}>
            <TierIndicator count={4 - tierNum} color={dotColors[tierNum as keyof typeof dotColors]} />
            {tier}
        </span>
    );
}

export default async function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supplier = await getSupplier(id);

    if (!supplier) {
        notFound();
    }

    const locationParts = supplier.location.split(',').map(s => s.trim());
    const locality = locationParts[0] || '';
    const region = locationParts[1] || '';

    const jsonLdData = generateLocalBusinessSchema({
        name: supplier.name,
        description: supplier.description,
        url: supplier.contact.website,
        email: supplier.contact.email?.split(',')[0],
        phone: supplier.contact.phone,
        address: {
            locality,
            region,
            country: 'SE',
        },
        priceRange: supplier.pricing.includes('40-70%') ? '$$' : '$$$',
        services: supplier.services,
    });

    return (
        <main className="min-h-screen bg-slate-50">
            <JsonLd data={jsonLdData} />
            <Header />
            <BreadcrumbBar currentTitle={supplier.name} />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Hero Section */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-teal-900 text-white p-8 lg:p-10">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <TierBadge tier={supplier.hospitalityReadiness.tier} />
                                    <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium backdrop-blur-sm">
                                        {supplier.confidenceLevel}
                                    </span>
                                </div>

                                <h1 className="text-2xl lg:text-3xl font-bold mb-3 leading-tight">
                                    {supplier.name}
                                </h1>

                                <p className="text-slate-300 max-w-2xl leading-relaxed mb-6">
                                    {supplier.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-300 text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-teal-400" />
                                        <span>{supplier.location.split('.')[0]}</span>
                                    </div>
                                    {supplier.employees && (
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-teal-400" />
                                            <span>{supplier.employees} employees</span>
                                        </div>
                                    )}
                                    {supplier.founded && (
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-teal-400" />
                                            <span>Founded {supplier.founded}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {supplier.contact.website && (
                                <a
                                    href={supplier.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-teal-500/25"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Website
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Contact Bar */}
                    <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex flex-wrap items-center gap-6">
                        {supplier.contact.name && (
                            <span className="text-sm font-semibold text-slate-700">{supplier.contact.name}</span>
                        )}
                        {supplier.contact.phone && (
                            <a href={`tel:${supplier.contact.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors">
                                <Phone className="w-4 h-4" />
                                {supplier.contact.phone}
                            </a>
                        )}
                        {supplier.contact.email && (
                            <a href={`mailto:${supplier.contact.email.split(',')[0]}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors">
                                <Mail className="w-4 h-4" />
                                {supplier.contact.email.split(',')[0]}
                            </a>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Capabilities */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-teal-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-teal-600" />
                                </div>
                                Capabilities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-4 h-4 text-teal-600" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Volume</span>
                                    </div>
                                    <p className="text-slate-800 font-medium">{supplier.capabilities.volume}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-teal-600" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead Time</span>
                                    </div>
                                    <p className="text-slate-800 font-medium">{supplier.capabilities.leadTime}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="w-4 h-4 text-teal-600" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Inventory</span>
                                    </div>
                                    <p className="text-slate-800 font-medium">{supplier.capabilities.inventory}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Truck className="w-4 h-4 text-teal-600" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Logistics</span>
                                    </div>
                                    <p className="text-slate-800 font-medium">{supplier.capabilities.logistics}</p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-emerald-600" />
                                </div>
                                Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {supplier.services.map((service, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-700">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths & Gaps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-6">
                                <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-emerald-600" />
                                    Key Strengths
                                </h3>
                                <ul className="space-y-3">
                                    {supplier.strengths.slice(0, 6).map((strength, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-emerald-900 text-sm leading-relaxed">{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
                                <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                                    Known Gaps
                                </h3>
                                <ul className="space-y-3">
                                    {supplier.gaps.slice(0, 6).map((gap, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-amber-900 text-sm leading-relaxed">{gap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Project Examples */}
                        {supplier.projectExamples && supplier.projectExamples.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <Award className="w-5 h-5 text-purple-600" />
                                    </div>
                                    Project Examples
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {supplier.projectExamples.map((project, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                            <p className="text-slate-700">{project}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Hospitality Readiness */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-teal-600" />
                                Hospitality Readiness
                            </h3>
                            <div className="mb-4">
                                <TierBadge tier={supplier.hospitalityReadiness.tier} />
                                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{supplier.hospitalityReadiness.score}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Hospitality Strengths</h4>
                                <ul className="space-y-2">
                                    {supplier.hospitalityReadiness.strengths.slice(0, 4).map((s, idx) => (
                                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                                            <span>{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Capability Profile Radar */}
                        <ChartWrapper
                            title="Capability Profile"
                            subtitle="Multi-dimensional assessment"
                            sourceRefs={supplier.sourceRefs}
                        >
                            <SupplierRadar supplier={supplier} height={280} />
                        </ChartWrapper>

                        {/* Best For */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Recycle className="w-5 h-5 text-teal-600" />
                                Best For
                            </h3>
                            <ul className="space-y-3">
                                {supplier.bestFor.map((item, idx) => (
                                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-3">Pricing</h3>
                            <p className="text-slate-700 leading-relaxed">{supplier.pricing}</p>
                        </div>

                        {/* Certifications */}
                        {supplier.certifications && supplier.certifications.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <h3 className="font-bold text-slate-900 mb-4">Certifications</h3>
                                <div className="flex flex-wrap gap-2">
                                    {supplier.certifications.map((cert, idx) => (
                                        <span key={idx} className="text-xs text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                                            {cert}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sources */}
                        {supplier.sourceRefs && supplier.sourceRefs.length > 0 && (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                                <SourceReferences sourceRefs={supplier.sourceRefs} />
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA Footer */}
                <div className="mt-12 bg-gradient-to-br from-slate-800 to-teal-900 rounded-2xl p-8 lg:p-10 text-white">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Ready to Connect?</h2>
                            <p className="text-slate-300">
                                Contact {supplier.name} directly or explore related scenarios for your project.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {supplier.contact.website && (
                                <a
                                    href={supplier.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-sm"
                                >
                                    Contact Supplier
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <Link
                                href="/scenarios"
                                className="inline-flex items-center gap-2 bg-teal-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-400 transition-colors text-sm"
                            >
                                View Scenarios
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
