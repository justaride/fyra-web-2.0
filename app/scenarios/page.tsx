import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import { Clock, AlertTriangle, CheckCircle, Building2, Flame, Globe, Sparkles, ArrowRight, Info, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface Supplier {
    name: string;
    id: string;
    rationale?: string;
    rationaleNO?: string;
    condition?: string;
    capability?: string;
}

interface Risk {
    risk: string;
    riskNO?: string;
    timeline?: string;
    mitigation: string;
    mitigationNO?: string;
    cost?: string;
}

interface Scenario {
    id: string;
    title: string;
    titleNO: string;
    icon: string;
    description: string;
    descriptionNO?: string;
    context: string;
    contextNO?: string;
    recommendedSuppliers?: {
        primary?: Supplier;
        secondary?: Supplier;
        backup?: Supplier[];
        tier1and2?: Supplier[];
        rationale?: string;
    };
    recommendedApproach?: {
        strategy: string;
        strategyNO?: string;
        tier1?: Record<string, string>;
        tier2?: Record<string, string>;
        tier3?: Record<string, string>;
    };
    timeline: string;
    timelineNO?: string;
    estimatedCost: string;
    estimatedCostNO?: string;
    criticalSuccessFactors: string[];
    criticalSuccessFactorsNO?: string[];
    risks: Risk[];
    keyConsiderations: string[];
    keyConsiderationsNO?: string[];
    criticalGap?: {
        item: string;
        severity: string;
        budgetImpact: string;
        workaround: string;
    };
    precedents?: Array<{
        project: string;
        approach: string;
        outcome: string;
    }>;
}

const iconMap: Record<string, React.ReactNode> = {
    'rush_project': <Flame className="w-6 h-6" />,
    'large_hotel': <Building2 className="w-6 h-6" />,
    'boutique_hotel': <Sparkles className="w-6 h-6" />,
    'cross_border': <Globe className="w-6 h-6" />,
    'fire_critical': <AlertTriangle className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
    'rush_project': 'bg-orange-500',
    'large_hotel': 'bg-blue-500',
    'boutique_hotel': 'bg-purple-500',
    'cross_border': 'bg-teal-500',
    'fire_critical': 'bg-red-500',
};

async function getScenarios(): Promise<Scenario[]> {
    const filePath = path.join(process.cwd(), 'data', 'scenarios.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
    const bgColor = colorMap[scenario.id] || 'bg-slate-500';
    const icon = iconMap[scenario.id] || <Building2 className="w-6 h-6" />;

    return (
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            {/* Header */}
            <div className={`${bgColor} text-white p-6`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                        {icon}
                    </div>
                    <span className="text-3xl">{scenario.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{scenario.title}</h3>
                <p className="text-white/90 text-sm">{scenario.description}</p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Context */}
                <div>
                    <p className="text-slate-600 text-sm">{scenario.context}</p>
                </div>

                {/* Timeline & Cost */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                            <Clock className="w-3 h-3" />
                            <span>Timeline</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900">{scenario.timeline}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                        <div className="text-slate-500 text-xs mb-1">Est. Cost</div>
                        <p className="text-sm font-medium text-slate-900">{scenario.estimatedCost}</p>
                    </div>
                </div>

                {/* Recommended Suppliers */}
                {scenario.recommendedSuppliers && (
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3">Recommended Partners</h4>
                        <div className="space-y-2">
                            {scenario.recommendedSuppliers.primary && (
                                <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-3">
                                    <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Primary</span>
                                    <span className="text-sm font-medium text-slate-900">{scenario.recommendedSuppliers.primary.name}</span>
                                </div>
                            )}
                            {scenario.recommendedSuppliers.secondary && (
                                <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3">
                                    <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">Secondary</span>
                                    <span className="text-sm font-medium text-slate-900">{scenario.recommendedSuppliers.secondary.name}</span>
                                </div>
                            )}
                            {scenario.recommendedSuppliers.backup && Array.isArray(scenario.recommendedSuppliers.backup) && scenario.recommendedSuppliers.backup.map((supplier, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                                    <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded">Backup</span>
                                    <span className="text-sm text-slate-700">{supplier.name}</span>
                                    {supplier.condition && (
                                        <span className="text-xs text-slate-500">({supplier.condition})</span>
                                    )}
                                </div>
                            ))}
                            {scenario.recommendedSuppliers.backup && !Array.isArray(scenario.recommendedSuppliers.backup) && (
                                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3">
                                    <span className="text-xs font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded">Backup</span>
                                    <span className="text-sm text-slate-700">{(scenario.recommendedSuppliers.backup as Supplier).name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Fire Safety Tiers (for fire_critical scenario) */}
                {scenario.recommendedApproach && (
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-3">{scenario.recommendedApproach.strategy}</h4>
                        <div className="space-y-2">
                            {scenario.recommendedApproach.tier1 && (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-emerald-700">TIER 1 - Low Risk</span>
                                    </div>
                                    <p className="text-xs text-slate-600">{scenario.recommendedApproach.tier1.furniture}</p>
                                    <p className="text-xs text-emerald-600 mt-1">{scenario.recommendedApproach.tier1.cost}</p>
                                </div>
                            )}
                            {scenario.recommendedApproach.tier2 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-yellow-700">TIER 2 - Medium Risk</span>
                                    </div>
                                    <p className="text-xs text-slate-600">{scenario.recommendedApproach.tier2.furniture}</p>
                                    <p className="text-xs text-yellow-600 mt-1">{scenario.recommendedApproach.tier2.cost}</p>
                                </div>
                            )}
                            {scenario.recommendedApproach.tier3 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-red-700">TIER 3 - High Risk</span>
                                    </div>
                                    <p className="text-xs text-slate-600">{scenario.recommendedApproach.tier3.furniture}</p>
                                    <p className="text-xs text-red-600 mt-1">{scenario.recommendedApproach.tier3.recommendation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Critical Gap (for large hotel) */}
                {scenario.criticalGap && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-semibold text-amber-800">Critical Gap: {scenario.criticalGap.item}</span>
                        </div>
                        <p className="text-xs text-slate-600 mb-1">Budget Impact: {scenario.criticalGap.budgetImpact}</p>
                        <p className="text-xs text-amber-700"><strong>Workaround:</strong> {scenario.criticalGap.workaround}</p>
                    </div>
                )}

                {/* Key Considerations */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Considerations</h4>
                    <ul className="space-y-1">
                        {scenario.keyConsiderations.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                <CheckCircle className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Risks */}
                <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Key Risks</h4>
                    <div className="space-y-2">
                        {scenario.risks.slice(0, 2).map((risk, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-lg p-3">
                                <p className="text-xs font-medium text-slate-700">{risk.risk}</p>
                                <p className="text-xs text-slate-500 mt-1"><span className="text-emerald-600">Mitigation:</span> {risk.mitigation}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Precedents (for fire_critical) */}
                {scenario.precedents && scenario.precedents.length > 0 && (
                    <div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-2">Precedents</h4>
                        <div className="space-y-2">
                            {scenario.precedents.map((precedent, idx) => (
                                <div key={idx} className="bg-blue-50 rounded-lg p-3">
                                    <p className="text-xs font-medium text-blue-900">{precedent.project}</p>
                                    <p className="text-xs text-slate-600 mt-1">{precedent.approach}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default async function ScenariosPage() {
    const scenarios = await getScenarios();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />
            <BreadcrumbBar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm mb-4">
                            <Sparkles className="w-4 h-4 text-green-400" />
                            <span>Project Scenarios</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            Project Scenario Guides
                        </h1>

                        {/* Value proposition */}
                        <p className="text-lg text-slate-300 leading-relaxed mb-6">
                            Tailored guidance for common circular hospitality project types. Each scenario
                            includes recommended partners, timelines, costs, and risk mitigation strategies
                            based on real Nordic project experience.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-green-400" />
                                <span><strong>{scenarios.length}</strong> Scenarios</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-green-400" />
                                <span>Timeline Guidance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-green-400" />
                                <span>Risk Mitigation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Context Block - How Scenarios Fit into NCH Framework */}
            <section className="py-6 bg-blue-50 border-b border-blue-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-2">How Scenarios Support Your Project</h3>
                                <p className="text-sm text-slate-600 mb-3">
                                    These scenarios are decision frameworks that connect <strong>market players</strong> (suppliers, consultants)
                                    with <strong>regulatory requirements</strong> (fire safety, certifications). They help you choose the right
                                    approach based on your project&apos;s budget, timeline, and sustainability targets.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Link href="/suppliers" className="inline-flex items-center gap-1 text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg border hover:border-blue-300 transition-colors">
                                        <LinkIcon className="w-3 h-3" /> Find Suppliers
                                    </Link>
                                    <Link href="/regulations" className="inline-flex items-center gap-1 text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg border hover:border-blue-300 transition-colors">
                                        <LinkIcon className="w-3 h-3" /> Check Regulations
                                    </Link>
                                    <Link href="/case-studies" className="inline-flex items-center gap-1 text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg border hover:border-blue-300 transition-colors">
                                        <LinkIcon className="w-3 h-3" /> See Examples
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Quick Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {scenarios.map((scenario) => (
                        <a
                            key={scenario.id}
                            href={`#${scenario.id}`}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full text-sm hover:bg-slate-50 transition-colors"
                        >
                            <span>{scenario.icon}</span>
                            <span className="font-medium text-slate-700">{scenario.title}</span>
                        </a>
                    ))}
                </div>

                {/* Scenarios Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {scenarios.map((scenario) => (
                        <div key={scenario.id} id={scenario.id}>
                            <ScenarioCard scenario={scenario} />
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-3">Need Help Choosing?</h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Every project is unique. Contact Fyra for a personalized assessment of your
                        circular hospitality project requirements.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/suppliers"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        >
                            Browse Suppliers
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/experts"
                            className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors"
                        >
                            Find Experts
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
