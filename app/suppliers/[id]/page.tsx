import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    MapPin,
    Phone,
    Mail,
    Globe,
    Building2,
    Users,
    CheckCircle,
    AlertTriangle,
    Star,
    Clock,
    Package,
    Truck,
    Shield,
    Award,
    ExternalLink,
    Briefcase
} from 'lucide-react';
import SourceReferences from '@/components/SourceReferences';
import { cn } from '@/lib/utils';

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

function TierBadge({ tier }: { tier: string }) {
    const tierNum = tier.includes('1') ? 1 : tier.includes('2') ? 2 : 3;
    const colors = {
        1: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        2: 'bg-blue-100 text-blue-700 border-blue-200',
        3: 'bg-amber-100 text-amber-700 border-amber-200'
    };

    return (
        <span className={cn("px-3 py-1 rounded-full text-sm font-semibold border", colors[tierNum as keyof typeof colors])}>
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

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 text-sm font-medium"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Suppliers
                </Link>

                {/* Header */}
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden mb-8">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <TierBadge tier={supplier.hospitalityReadiness.tier} />
                                    <span className="text-blue-200 text-sm">{supplier.confidenceLevel}</span>
                                </div>
                                <h1 className="text-3xl font-bold mb-2">{supplier.name}</h1>
                                <p className="text-blue-100 max-w-2xl">{supplier.description}</p>
                            </div>
                            {supplier.contact.website && (
                                <a
                                    href={supplier.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    Visit Website
                                </a>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4 mt-6 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                                <MapPin className="w-4 h-4" />
                                <span>{supplier.location.split('.')[0]}</span>
                            </div>
                            {supplier.employees && (
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                                    <Users className="w-4 h-4" />
                                    <span>{supplier.employees} employees</span>
                                </div>
                            )}
                            {supplier.founded && (
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                                    <Building2 className="w-4 h-4" />
                                    <span>Founded {supplier.founded}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Bar */}
                    <div className="bg-slate-50 px-8 py-4 border-t flex flex-wrap items-center gap-6">
                        {supplier.contact.name && (
                            <span className="text-sm font-medium text-slate-700">{supplier.contact.name}</span>
                        )}
                        {supplier.contact.phone && (
                            <a href={`tel:${supplier.contact.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
                                <Phone className="w-4 h-4" />
                                {supplier.contact.phone}
                            </a>
                        )}
                        {supplier.contact.email && (
                            <a href={`mailto:${supplier.contact.email.split(',')[0]}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600">
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
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-blue-600" />
                                Capabilities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Volume</span>
                                    </div>
                                    <p className="text-sm text-slate-700">{supplier.capabilities.volume}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Lead Time</span>
                                    </div>
                                    <p className="text-sm text-slate-700">{supplier.capabilities.leadTime}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Inventory</span>
                                    </div>
                                    <p className="text-sm text-slate-700">{supplier.capabilities.inventory}</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Truck className="w-4 h-4 text-slate-500" />
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Logistics</span>
                                    </div>
                                    <p className="text-sm text-slate-700">{supplier.capabilities.logistics}</p>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-emerald-600" />
                                Services
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {supplier.services.map((service, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths & Gaps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                                <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5" />
                                    Key Strengths
                                </h3>
                                <ul className="space-y-2">
                                    {supplier.strengths.slice(0, 6).map((strength, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-emerald-800">
                                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6">
                                <h3 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    Known Gaps
                                </h3>
                                <ul className="space-y-2">
                                    {supplier.gaps.slice(0, 6).map((gap, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-amber-800">
                                            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                            <span>{gap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Project Examples */}
                        {supplier.projectExamples && supplier.projectExamples.length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Award className="w-5 h-5 text-purple-600" />
                                    Project Examples
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {supplier.projectExamples.map((project, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-lg p-3 text-sm text-slate-700">
                                            {project}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Hospitality Readiness */}
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                Hospitality Readiness
                            </h3>
                            <div className="mb-4">
                                <TierBadge tier={supplier.hospitalityReadiness.tier} />
                                <p className="text-sm text-slate-600 mt-2">{supplier.hospitalityReadiness.score}</p>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Hospitality Strengths</h4>
                                    <ul className="space-y-1">
                                        {supplier.hospitalityReadiness.strengths.slice(0, 4).map((s, idx) => (
                                            <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                                                <span>{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Best For */}
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-3">Best For</h3>
                            <ul className="space-y-2">
                                {supplier.bestFor.map((item, idx) => (
                                    <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Pricing */}
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <h3 className="font-bold text-slate-900 mb-3">Pricing</h3>
                            <p className="text-sm text-slate-600">{supplier.pricing}</p>
                        </div>

                        {/* Certifications */}
                        {supplier.certifications && supplier.certifications.length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <h3 className="font-bold text-slate-900 mb-3">Certifications</h3>
                                <div className="space-y-2">
                                    {supplier.certifications.map((cert, idx) => (
                                        <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1.5 rounded">
                                            {cert}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sources */}
                        {supplier.sourceRefs && supplier.sourceRefs.length > 0 && (
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <SourceReferences sourceRefs={supplier.sourceRefs} />
                            </div>
                        )}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-bold mb-2">Ready to Connect?</h2>
                            <p className="text-slate-300 text-sm">
                                Contact {supplier.name} directly or explore related scenarios for your project.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {supplier.contact.website && (
                                <a
                                    href={supplier.contact.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors text-sm"
                                >
                                    Contact Supplier
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            <Link
                                href="/scenarios"
                                className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                            >
                                View Scenarios
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
