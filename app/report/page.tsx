import { promises as fs } from 'fs';
import path from 'path';
import { Building2, Users, BookOpen, Shield, Award, ClipboardList, Recycle, FileText } from 'lucide-react';
import { PrintControls } from '@/components/PrintControls';

// Data loading functions
async function loadJson(filename: string) {
    const filePath = path.join(process.cwd(), 'data', filename);
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getAllData() {
    const [
        suppliers,
        consultantsEnhanced,
        consultants,
        caseStudies,
        regulations,
        certifications,
        specifications,
        fireSafety,
        regulatoryPractice,
        fyraProfile
    ] = await Promise.all([
        loadJson('suppliers_enhanced.json'),
        loadJson('consultants.json'),
        Promise.resolve([]), // consultants.json now contains enhanced data
        loadJson('caseStudies_clean.json'),
        loadJson('regulations_filtered.json'),
        loadJson('certifications.json'),
        loadJson('specifications.json'),
        loadJson('fire_safety.json'),
        loadJson('regulatory_practice.json'),
        loadJson('fyra-profile.json')
    ]);

    return {
        suppliers,
        consultantsEnhanced,
        consultants,
        caseStudies,
        regulations,
        certifications,
        specifications,
        fireSafety,
        regulatoryPractice,
        fyraProfile
    };
}

export default async function ReportPage() {
    const data = await getAllData();
    const currentDate = new Date().toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="min-h-screen bg-white print:bg-white">
            {/* Print Controls - Hidden when printing */}
            <PrintControls />

            {/* Report Content */}
            <div className="max-w-4xl mx-auto px-8 py-12 print:px-0 print:py-0 print:max-w-none">

                {/* Cover Page */}
                <section className="print:h-[100vh] print:flex print:flex-col print:justify-center mb-16 print:mb-0 print:page-break-after-always">
                    <div className="text-center py-20 print:py-0">
                        <div className="inline-flex items-center gap-3 mb-8">
                            <Recycle className="w-16 h-16 text-teal-600" />
                        </div>
                        <h1 className="text-5xl font-bold text-slate-900 mb-4">
                            Fyra Circular Platform
                        </h1>
                        <p className="text-2xl text-slate-600 mb-8">
                            Nordic Circular Construction for Hospitality
                        </p>
                        <div className="text-slate-500 mb-12">
                            <p>Comprehensive Research Report</p>
                            <p className="mt-2">{currentDate}</p>
                        </div>
                        <div className="inline-block border-t-2 border-teal-600 pt-8">
                            <p className="text-sm text-slate-500">
                                Suppliers &bull; Experts &bull; Case Studies &bull; Regulations &bull; Certifications
                            </p>
                        </div>
                    </div>
                </section>

                {/* Table of Contents */}
                <section className="mb-16 print:page-break-after-always">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b-2 border-slate-200">
                        Table of Contents
                    </h2>
                    <nav className="space-y-3">
                        <TocItem number="1" title="Executive Summary" page="3" />
                        <TocItem number="2" title="Supplier Directory" page="4" subtitle={`${data.suppliers.length} verified suppliers`} />
                        <TocItem number="3" title="Expert Network" page="15" subtitle={`${data.consultantsEnhanced.tier1?.length || 0} strategic partners`} />
                        <TocItem number="4" title="Case Studies" page="20" subtitle={`${data.caseStudies.length} hotel projects`} />
                        <TocItem number="5" title="Regulatory Compass" page="30" subtitle="Fire safety, building codes, standards" />
                        <TocItem number="6" title="Certifications" page="45" subtitle={`${data.certifications.length} certification systems`} />
                        <TocItem number="7" title="Specifications & BVB" page="50" subtitle="Technical requirements" />
                        <TocItem number="8" title="About Fyra" page="55" />
                    </nav>
                </section>

                {/* 1. Executive Summary */}
                <section id="executive-summary" className="mb-16 print:page-break-after-always">
                    <SectionHeader number="1" title="Executive Summary" icon={<FileText className="w-6 h-6" />} />

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-700 leading-relaxed mb-6">
                            The Fyra Circular Platform is a comprehensive resource for Nordic circular construction
                            in the hospitality sector. This report compiles research on suppliers, consultants,
                            case studies, and regulatory requirements for implementing circular furniture and
                            material strategies in hotel renovations and new builds.
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                            <StatBox label="Verified Suppliers" value={data.suppliers.length} />
                            <StatBox label="Case Studies" value={data.caseStudies.length} />
                            <StatBox label="Expert Firms" value={(data.consultantsEnhanced.tier1?.length || 0) + data.consultants.filter((c: any) => c.tier === 'Specialist').length} />
                            <StatBox label="Certifications" value={data.certifications.length} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Key Findings</h3>
                        <ul className="space-y-2 text-slate-700">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600 font-bold">•</span>
                                <span><strong>Market Gap:</strong> {data.consultantsEnhanced.marketGap?.finding || 'Significant opportunity for circular hospitality expertise'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600 font-bold">•</span>
                                <span><strong>Supplier Coverage:</strong> {data.suppliers.filter((s: any) => s.nordicReach).length} suppliers with Nordic-wide reach</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600 font-bold">•</span>
                                <span><strong>Hospitality Proven:</strong> {data.suppliers.filter((s: any) => s.hospitalityTier === 'Proven').length} suppliers with verified hotel project experience</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-600 font-bold">•</span>
                                <span><strong>Fire Safety:</strong> EN 1021 compliance critical for all hotel furniture</span>
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 2. Supplier Directory */}
                <section id="suppliers" className="mb-16">
                    <SectionHeader number="2" title="Supplier Directory" icon={<Building2 className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Verified circular infrastructure partners capable of scaling operations across the Nordic region.
                        Each supplier is assessed for hospitality readiness and B2B capabilities.
                    </p>

                    <div className="space-y-8">
                        {data.suppliers.map((supplier: any, index: number) => (
                            <div key={supplier.id} className="print:page-break-inside-avoid border border-slate-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{supplier.name}</h3>
                                        <p className="text-sm text-slate-500">{supplier.country} • {supplier.regions?.join(', ')}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        {supplier.hospitalityTier && (
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                supplier.hospitalityTier === 'Proven' ? 'bg-teal-100 text-teal-700' :
                                                supplier.hospitalityTier === 'Ready' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                                {supplier.hospitalityTier}
                                            </span>
                                        )}
                                        {supplier.fyraRecommended && (
                                            <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-700">
                                                Fyra Pick
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-sm text-slate-700 mb-4">{supplier.description}</p>

                                {supplier.services && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Services</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {supplier.services.slice(0, 6).map((service: string, i: number) => (
                                                <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                                    {service}
                                                </span>
                                            ))}
                                            {supplier.services.length > 6 && (
                                                <span className="text-xs text-slate-400">+{supplier.services.length - 6} more</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {supplier.b2bReadiness && (
                                    <div className="grid grid-cols-3 gap-4 text-xs mb-4 bg-slate-50 rounded p-3">
                                        <div>
                                            <span className="text-slate-500">Lead Time (Stock)</span>
                                            <p className="font-medium text-slate-900">{supplier.b2bReadiness.leadTimeStock || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Volume Capacity</span>
                                            <p className="font-medium text-slate-900 capitalize">{supplier.b2bReadiness.volumeCapacity || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">Hotel Capacity</span>
                                            <p className="font-medium text-slate-900">{supplier.b2bReadiness.hotelProjectCapacity || 'N/A'}</p>
                                        </div>
                                    </div>
                                )}

                                {supplier.contact && (
                                    <div className="text-xs text-slate-500 border-t pt-3">
                                        <span className="font-medium">{supplier.contact.name}</span>
                                        {supplier.contact.email && <span> • {supplier.contact.email}</span>}
                                        {supplier.contact.website && <span> • {supplier.contact.website}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Expert Network */}
                <section id="experts" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="3" title="Expert Network" icon={<Users className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Curated network of project managers, architects, and specialists with proven circular
                        construction capabilities in the Nordic hospitality sector.
                    </p>

                    {/* Decision Framework */}
                    {data.consultantsEnhanced.decisionFramework && (
                        <div className="mb-8 print:page-break-inside-avoid">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">When to Use Each Consultant</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {Object.entries(data.consultantsEnhanced.decisionFramework).map(([key, value]: [string, any]) => (
                                    <div key={key} className="border border-slate-200 rounded-lg p-4">
                                        <h4 className="font-bold text-slate-900 mb-2">
                                            Use {key.replace('use', '').toUpperCase()} when...
                                        </h4>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            {value.when?.slice(0, 4).map((item: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-teal-500">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tier 1 Consultants */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-slate-900">Strategic Partners</h3>
                        {data.consultantsEnhanced.tier1?.map((consultant: any) => (
                            <div key={consultant.id} className="print:page-break-inside-avoid border border-slate-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900">{consultant.name}</h4>
                                        <p className="text-sm text-slate-500">{consultant.type}</p>
                                    </div>
                                </div>

                                {consultant.circularCapabilities && (
                                    <div className="mb-4">
                                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Circular Capabilities</h5>
                                        <div className="flex flex-wrap gap-1">
                                            {consultant.circularCapabilities.map((cap: string, i: number) => (
                                                <span key={i} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded">
                                                    {cap}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {consultant.hospitalityProjects && consultant.hospitalityProjects.length > 0 && (
                                    <div className="text-sm text-slate-600">
                                        <span className="font-medium">Notable Projects:</span>{' '}
                                        {consultant.hospitalityProjects.slice(0, 3).join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. Case Studies */}
                <section id="case-studies" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="4" title="Case Studies" icon={<BookOpen className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Real-world examples of circular construction and reuse in the Nordic hospitality sector.
                    </p>

                    <div className="space-y-8">
                        {data.caseStudies.map((study: any) => (
                            <div key={study.id} className="print:page-break-inside-avoid border border-slate-200 rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">{study.title}</h3>
                                        <p className="text-sm text-slate-500">
                                            {study.location} • {study.size} • {study.year}
                                        </p>
                                    </div>
                                    {study.tier && (
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                                            study.tier === 'Flagship' ? 'bg-teal-100 text-teal-700' :
                                            study.tier === 'Proven' ? 'bg-blue-100 text-blue-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {study.tier}
                                        </span>
                                    )}
                                </div>

                                {study.circularFeatures && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Circular Features</h4>
                                        <ul className="text-sm text-slate-600 space-y-1">
                                            {study.circularFeatures.map((feature: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-teal-500">•</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {study.metrics && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs bg-slate-50 rounded p-3">
                                        {study.metrics.co2Impact && (
                                            <div>
                                                <span className="text-slate-500">CO2 Impact</span>
                                                <p className="font-medium text-slate-900">{study.metrics.co2Impact}</p>
                                            </div>
                                        )}
                                        {study.metrics.circularContent && (
                                            <div>
                                                <span className="text-slate-500">Circular Content</span>
                                                <p className="font-medium text-slate-900">{study.metrics.circularContent}</p>
                                            </div>
                                        )}
                                        {study.metrics.materialReuse && (
                                            <div>
                                                <span className="text-slate-500">Material Reuse</span>
                                                <p className="font-medium text-slate-900">{study.metrics.materialReuse}</p>
                                            </div>
                                        )}
                                        {study.metrics.certification && (
                                            <div>
                                                <span className="text-slate-500">Certification</span>
                                                <p className="font-medium text-slate-900">{study.metrics.certification}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {study.contacts && study.contacts.length > 0 && (
                                    <div className="mt-4 text-xs text-slate-500 border-t pt-3">
                                        <span className="font-medium">Contacts:</span>{' '}
                                        {study.contacts.map((c: any) => `${c.name} (${c.title})`).join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Regulatory Compass */}
                <section id="regulations" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="5" title="Regulatory Compass" icon={<Shield className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Essential regulations, building codes, and fire safety requirements for circular
                        construction in the Nordic hospitality sector.
                    </p>

                    {/* Fire Safety */}
                    {data.fireSafety && (
                        <div className="mb-8 print:page-break-inside-avoid">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Fire Safety Requirements</h3>
                            <div className="border border-slate-200 rounded-lg p-6">
                                <div className="prose prose-sm prose-slate max-w-none">
                                    {data.fireSafety.keyStandards && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-bold text-slate-900 mb-2">Key Standards</h4>
                                            <ul className="text-sm text-slate-600 space-y-1">
                                                {data.fireSafety.keyStandards.map((std: any, i: number) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <span className="text-red-500">•</span>
                                                        <span><strong>{std.name}:</strong> {std.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Regulatory Practice */}
                    {data.regulatoryPractice?.enforcementLevels && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Enforcement by Country</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100">
                                            <th className="text-left p-3 border">Country</th>
                                            <th className="text-left p-3 border">Fire Safety</th>
                                            <th className="text-left p-3 border">Building Codes</th>
                                            <th className="text-left p-3 border">Circular Requirements</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(data.regulatoryPractice.enforcementLevels).map(([country, levels]: [string, any]) => (
                                            <tr key={country}>
                                                <td className="p-3 border font-medium">{country}</td>
                                                <td className="p-3 border">{levels.fireSafety || '-'}</td>
                                                <td className="p-3 border">{levels.buildingCodes || '-'}</td>
                                                <td className="p-3 border">{levels.circularRequirements || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Key Regulations Summary */}
                    <div className="print:page-break-inside-avoid">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Regulations Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Array.isArray(data.regulations) && data.regulations.slice(0, 8).map((reg: any, i: number) => (
                                <div key={i} className="border border-slate-200 rounded p-4">
                                    <h4 className="font-bold text-slate-900 text-sm">{reg.name || reg.title}</h4>
                                    <p className="text-xs text-slate-500 mt-1">{reg.country || reg.jurisdiction}</p>
                                    <p className="text-sm text-slate-600 mt-2">{reg.description?.substring(0, 150)}...</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Certifications */}
                <section id="certifications" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="6" title="Certifications" icon={<Award className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Sustainability certification systems relevant to Nordic hospitality and circular construction.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.certifications.map((cert: any) => (
                            <div key={cert.id} className="print:page-break-inside-avoid border border-slate-200 rounded-lg p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="font-bold text-slate-900">{cert.name}</h3>
                                    {cert.type && (
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                            {cert.type}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{cert.description}</p>
                                {cert.relevance && (
                                    <p className="text-xs text-slate-500">
                                        <span className="font-medium">Relevance:</span> {cert.relevance}
                                    </p>
                                )}
                                {cert.website && (
                                    <p className="text-xs text-teal-600 mt-2">{cert.website}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. Specifications */}
                <section id="specifications" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="7" title="Specifications & BVB System" icon={<ClipboardList className="w-6 h-6" />} />

                    <p className="text-slate-600 mb-8">
                        Technical specifications and the BVB (Byggvarubedömningen) system for evaluating
                        building products in circular construction.
                    </p>

                    {data.specifications.bvbSystem && (
                        <div className="mb-8 print:page-break-inside-avoid border border-slate-200 rounded-lg p-6">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">BVB Rating System</h3>
                            <p className="text-sm text-slate-600 mb-4">{data.specifications.bvbSystem.description}</p>

                            {data.specifications.bvbSystem.levels && (
                                <div className="space-y-2">
                                    {data.specifications.bvbSystem.levels.map((level: any, i: number) => (
                                        <div key={i} className="flex items-center gap-3 text-sm">
                                            <span className={`w-8 h-8 rounded flex items-center justify-center font-bold ${
                                                level.name === 'Recommended' ? 'bg-green-100 text-green-700' :
                                                level.name === 'Accepted' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {level.name?.charAt(0)}
                                            </span>
                                            <div>
                                                <span className="font-medium">{level.name}</span>
                                                <span className="text-slate-500 ml-2">{level.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {data.specifications.templates && (
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Specification Templates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.specifications.templates.map((template: any, i: number) => (
                                    <div key={i} className="border border-slate-200 rounded p-4">
                                        <h4 className="font-medium text-slate-900">{template.name}</h4>
                                        <p className="text-sm text-slate-600 mt-1">{template.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* 8. About Fyra */}
                <section id="about" className="mb-16 print:page-break-before-always">
                    <SectionHeader number="8" title="About Fyra" icon={<Recycle className="w-6 h-6" />} />

                    {data.fyraProfile && (
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                {data.fyraProfile.mission || 'Fyra is building the infrastructure for circular hospitality in the Nordic region.'}
                            </p>

                            {data.fyraProfile.services && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Our Services</h3>
                                    <ul className="space-y-2 text-slate-700">
                                        {data.fyraProfile.services.map((service: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className="text-teal-600 font-bold">•</span>
                                                <span>{service}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {data.fyraProfile.contact && (
                                <div className="bg-slate-100 rounded-lg p-6">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Contact</h3>
                                    <div className="text-slate-700">
                                        {data.fyraProfile.contact.email && <p>Email: {data.fyraProfile.contact.email}</p>}
                                        {data.fyraProfile.contact.website && <p>Website: {data.fyraProfile.contact.website}</p>}
                                        {data.fyraProfile.contact.location && <p>Location: {data.fyraProfile.contact.location}</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="border-t-2 border-slate-200 pt-8 mt-16 text-center text-sm text-slate-500">
                    <p className="font-medium text-slate-900 mb-2">Fyra Circular Platform</p>
                    <p>Nordic Circular Construction for Hospitality</p>
                    <p className="mt-4">Report generated: {currentDate}</p>
                    <p className="mt-2">© {new Date().getFullYear()} Fyra. All rights reserved.</p>
                </footer>
            </div>
        </main>
    );
}

// Helper Components
function SectionHeader({ number, title, icon }: { number: string; title: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-slate-200">
            <div className="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-700 rounded-lg">
                {icon}
            </div>
            <div>
                <span className="text-sm text-teal-600 font-medium">Section {number}</span>
                <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            </div>
        </div>
    );
}

function TocItem({ number, title, page, subtitle }: { number: string; title: string; page: string; subtitle?: string }) {
    return (
        <div className="flex items-baseline border-b border-dotted border-slate-300 pb-2">
            <span className="text-teal-600 font-bold w-8">{number}.</span>
            <div className="flex-1">
                <span className="font-medium text-slate-900">{title}</span>
                {subtitle && <span className="text-sm text-slate-500 ml-2">— {subtitle}</span>}
            </div>
            <span className="text-slate-400 ml-4">{page}</span>
        </div>
    );
}

function StatBox({ label, value }: { label: string; value: number }) {
    return (
        <div className="bg-slate-100 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-teal-600">{value}</div>
            <div className="text-sm text-slate-600">{label}</div>
        </div>
    );
}
