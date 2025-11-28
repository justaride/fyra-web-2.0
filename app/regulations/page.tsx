import { promises as fs } from 'fs';
import path from 'path';
import { Shield, FileText, AlertTriangle, CheckCircle, Info, Flame, Clock, Building2, ArrowRight, ExternalLink, ShieldCheck, ShieldAlert, CircleAlert, Landmark, Scale, Lightbulb, TrendingUp, BookOpen, Hammer, ClipboardCheck, Sparkles, Eye, EyeOff, Zap, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from '@/components/Header';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import Link from 'next/link';

interface FireSafetyTier {
    tier: number;
    name: string;
    nameNO: string;
    description: string;
    productTypes: string[];
    placement: string;
    testingRequired: string;
    testingStandards?: string[];
    operators: string[];
    cost: string;
    costRange: string;
    timeline: string;
    riskLevel: string;
    icon: string;
    color: string;
    strategy?: string;
    recommendation?: string;
    alternatives?: Array<{
        strategy: string;
        description: string;
    }>;
}

interface TestingLab {
    name: string;
    fullName: string;
    location: string;
    services: string[];
    costRange: string;
    timeline: string;
    website: string;
}

interface FireSafetyData {
    tiers: FireSafetyTier[];
    testingLabs: TestingLab[];
    fireConsultants: Array<{
        name: string;
        specialty: string;
        services: string[];
    }>;
    complianceFramework: {
        regulations: Array<{
            code: string;
            name: string;
            keyRequirements: string[];
        }>;
    };
    costImplications: Array<{
        scenario: string;
        cost: string;
        costIncrease: string;
    }>;
    bestPractices: Array<{
        title: string;
        description: string;
    }>;
    precedents: Array<{
        project: string;
        location: string;
        approach: string;
        outcome: string;
    }>;
}

interface ProcurementItem {
    title: string;
    description: string;
    scope?: string;
    confidence?: string;
    source?: string;
    actionable?: boolean;
    examples?: string[];
    insight?: string;
    advantage?: string;
    checklist?: string[];
    recommendation?: string;
    timeline?: string;
}

interface ProcurementSection {
    id: string;
    title: string;
    items: ProcurementItem[];
}

interface ProcurementResource {
    name: string;
    url: string;
    type: string;
}

interface PublicProcurementData {
    id: string;
    title: string;
    titleNO: string;
    description: string;
    descriptionNO: string;
    sections: ProcurementSection[];
    keyResources: ProcurementResource[];
}

interface EnforcementLevel {
    category: string;
    regulation: string;
    writtenRequirement: string;
    enforcementLevel: 'high' | 'medium' | 'low' | 'future';
    enforcementDescription: string;
    practicalNotes: string;
    riskIfIgnored: string;
    fyraRecommendation: string;
}

interface RenovationAdvantage {
    title: string;
    description: string;
    savings: string;
}

interface ChecklistItem {
    item: string;
    action: string;
    priority: 'high' | 'medium' | 'low';
}

interface ProjectType {
    type: string;
    description: string;
    timeline: string;
    compliance: string;
    permitRequired: boolean | string;
}

interface RegulatoryPracticeData {
    regulatoryPractice: {
        title: string;
        subtitle: string;
        description: string;
        enforcementLevels: EnforcementLevel[];
    };
    interiorRenovation: {
        title: string;
        subtitle: string;
        description: string;
        advantages: RenovationAdvantage[];
        scopeGuidelines: {
            included: string[];
            excluded: string[];
            grayArea: string[];
        };
        complianceChecklist: ChecklistItem[];
        projectTypes: ProjectType[];
    };
}

async function getRegulations() {
    const filePath = path.join(process.cwd(), 'data', 'regulations_filtered.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getFireSafety(): Promise<FireSafetyData> {
    const filePath = path.join(process.cwd(), 'data', 'fire_safety.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getPublicProcurement(): Promise<PublicProcurementData> {
    const filePath = path.join(process.cwd(), 'data', 'public_procurement.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getRegulatoryPractice(): Promise<RegulatoryPracticeData> {
    const filePath = path.join(process.cwd(), 'data', 'regulatory_practice.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

// Enforcement level badge component
function EnforcementBadge({ level }: { level: string }) {
    const config = {
        high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: Eye, label: 'Strictly Enforced' },
        medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', icon: Eye, label: 'Moderately Enforced' },
        low: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', icon: EyeOff, label: 'Rarely Checked' },
        future: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200', icon: Clock, label: 'Coming Soon' },
    };
    const c = config[level as keyof typeof config] || config.medium;
    const Icon = c.icon;
    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", c.bg, c.text, c.border)}>
            <Icon className="w-3.5 h-3.5" />
            {c.label}
        </span>
    );
}

// Professional tier icon component replacing emoji icons
function TierIcon({ tier, color }: { tier: number; color: string }) {
    const iconClasses = cn(
        "w-7 h-7",
        color === 'emerald' ? "text-emerald-600" :
        color === 'yellow' ? "text-yellow-600" :
        "text-red-600"
    );

    switch (tier) {
        case 1:
            return <ShieldCheck className={iconClasses} />;
        case 2:
            return <AlertTriangle className={iconClasses} />;
        case 3:
            return <ShieldAlert className={iconClasses} />;
        default:
            return <CircleAlert className={iconClasses} />;
    }
}

function FireSafetyTierCard({ tier }: { tier: FireSafetyTier }) {
    const colorClasses = {
        emerald: {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-700',
            badge: 'bg-emerald-100 text-emerald-700',
            icon: 'text-emerald-500'
        },
        yellow: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-700',
            badge: 'bg-yellow-100 text-yellow-700',
            icon: 'text-yellow-500'
        },
        red: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-700',
            icon: 'text-red-500'
        }
    };

    const colors = colorClasses[tier.color as keyof typeof colorClasses] || colorClasses.emerald;

    return (
        <div className={cn("rounded-xl border-2 overflow-hidden", colors.border)}>
            <div className={cn("p-5", colors.bg)}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "p-2 rounded-xl",
                            tier.color === 'emerald' ? "bg-emerald-100" :
                            tier.color === 'yellow' ? "bg-yellow-100" :
                            "bg-red-100"
                        )}>
                            <TierIcon tier={tier.tier} color={tier.color} />
                        </div>
                        <div>
                            <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold", colors.badge)}>
                                TIER {tier.tier}
                            </span>
                            <h3 className="text-lg font-bold text-slate-900 mt-1">{tier.name}</h3>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-slate-600">{tier.description}</p>
            </div>

            <div className="p-5 space-y-4">
                {/* Product Types */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Types</h4>
                    <ul className="space-y-1">
                        {tier.productTypes.map((type, idx) => (
                            <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                                <span className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", colors.icon, tier.color === 'emerald' ? 'bg-emerald-400' : tier.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400')} />
                                {type}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Placement */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Placement</h4>
                    <p className="text-sm text-slate-700">{tier.placement}</p>
                </div>

                {/* Testing Required */}
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Testing Required</h4>
                    <p className="text-sm text-slate-700">{tier.testingRequired}</p>
                    {tier.testingStandards && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {tier.testingStandards.map((std, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-mono">
                                    {std}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cost & Timeline */}
                <div className="flex gap-4 pt-3 border-t border-slate-100">
                    <div className="flex-1">
                        <span className="text-xs text-slate-500">Cost Range</span>
                        <p className="text-sm font-semibold text-slate-900">{tier.costRange}</p>
                    </div>
                    <div className="flex-1">
                        <span className="text-xs text-slate-500">Timeline</span>
                        <p className="text-sm font-semibold text-slate-900">{tier.timeline}</p>
                    </div>
                </div>

                {/* Recommendation for Tier 3 */}
                {tier.recommendation && (
                    <div className={cn("p-3 rounded-lg text-sm", colors.bg, colors.text)}>
                        <strong>Recommendation:</strong> {tier.recommendation}
                    </div>
                )}

                {/* Strategy for Tier 2 */}
                {tier.strategy && (
                    <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                        <strong>Strategy:</strong> {tier.strategy}
                    </div>
                )}

                {/* Qualified Operators */}
                {tier.operators.length > 0 && (
                    <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Qualified Operators</h4>
                        <div className="flex flex-wrap gap-2">
                            {tier.operators.map((op, idx) => (
                                <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                                    {op}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Section icon mapping for procurement
const procurementIconMap: Record<string, React.ReactNode> = {
    'louFramework': <Landmark className="w-5 h-5" />,
    'sustainabilityCriteria': <Scale className="w-5 h-5" />,
    'lifecycleCost': <TrendingUp className="w-5 h-5" />,
    'innovationProcurement': <Lightbulb className="w-5 h-5" />,
    'privateHotelRelevance': <Building2 className="w-5 h-5" />,
    'futureOutlook': <Clock className="w-5 h-5" />,
    'practicalGuidance': <CheckCircle className="w-5 h-5" />,
};

export default async function RegulationsPage() {
    const regulations = await getRegulations();
    const fireSafety = await getFireSafety();
    const publicProcurement = await getPublicProcurement();
    const regulatoryPractice = await getRegulatoryPractice();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />
            <BreadcrumbBar />

            <div className="container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-10 max-w-3xl">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Regulatory Compass</h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Navigate the complex landscape of EU and Nordic regulations for circular construction
                        in the hospitality sector. From fire safety to material standards.
                    </p>
                    <div className="mt-3 inline-flex items-center gap-2 text-xs bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        This guide provides navigation to official standards, not legal advice.
                    </div>
                </div>

                {/* Fire Safety Tier System */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Flame className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Fire Safety Tier System</h2>
                            <p className="text-sm text-slate-500">BBR Chapter 5 Compliance Framework for Reused Furniture</p>
                        </div>
                    </div>

                    {/* BBR Overview */}
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 mb-8 text-white">
                        <h3 className="text-lg font-bold mb-4">Hotel Classification: Verksamhetsklass 4</h3>
                        <p className="text-slate-300 text-sm mb-4">Hotels fall under the strictest fire requirements in Swedish building regulations.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {fireSafety.complianceFramework.regulations[0]?.keyRequirements.map((req, idx) => (
                                <div key={idx} className="bg-white/10 rounded-lg p-3">
                                    <p className="text-xs text-slate-200">{req}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tier Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {fireSafety.tiers.map((tier) => (
                            <FireSafetyTierCard key={tier.tier} tier={tier} />
                        ))}
                    </div>

                    {/* Cost Implications */}
                    <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
                        <h3 className="font-bold text-slate-900 mb-4">Cost Implications by Tier</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 pr-4 font-semibold text-slate-600">Scenario</th>
                                        <th className="text-left py-2 pr-4 font-semibold text-slate-600">Additional Cost</th>
                                        <th className="text-left py-2 font-semibold text-slate-600">Cost Increase</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fireSafety.costImplications.map((cost, idx) => (
                                        <tr key={idx} className="border-b border-slate-100">
                                            <td className="py-3 pr-4 font-medium text-slate-900">{cost.scenario}</td>
                                            <td className="py-3 pr-4 text-slate-600">{cost.cost}</td>
                                            <td className="py-3">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                                                    cost.costIncrease === "0%" ? "bg-green-100 text-green-700" :
                                                    cost.costIncrease.includes("40") || cost.costIncrease.includes("60") ? "bg-red-100 text-red-700" :
                                                    "bg-yellow-100 text-yellow-700"
                                                )}>
                                                    {cost.costIncrease}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Testing Labs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {fireSafety.testingLabs.map((lab, idx) => (
                            <div key={idx} className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{lab.name}</h4>
                                        <p className="text-sm text-slate-500">{lab.fullName}</p>
                                    </div>
                                    <a
                                        href={lab.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">{lab.location}</p>
                                <div className="space-y-2">
                                    {lab.services.map((service, sidx) => (
                                        <div key={sidx} className="text-xs text-slate-600 flex items-center gap-2">
                                            <CheckCircle className="w-3 h-3 text-emerald-500" />
                                            {service}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 mt-4 pt-3 border-t border-slate-100">
                                    <div>
                                        <span className="text-xs text-slate-500">Cost</span>
                                        <p className="text-sm font-medium text-slate-900">{lab.costRange}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500">Timeline</span>
                                        <p className="text-sm font-medium text-slate-900">{lab.timeline}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Testing Costs - Collapsible */}
                    <details className="bg-amber-50 rounded-xl border border-amber-200 mb-8 group">
                        <summary className="p-6 cursor-pointer list-none">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 rounded-lg">
                                        <Info className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-amber-900">Detailed Testing Cost Matrix</h3>
                                        <p className="text-xs text-amber-700">Click to expand indicative pricing from RISE/SP labs</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-amber-600 transition-transform group-open:rotate-90" />
                            </div>
                        </summary>
                        <div className="px-6 pb-6 border-t border-amber-200 pt-4">
                            {/* Disclaimer */}
                            <div className="bg-amber-100 rounded-lg p-3 mb-4 text-xs text-amber-800">
                                <strong>Disclaimer:</strong> Testing costs are indicative estimates from 2024-2025. Prices change annually and vary by sample complexity. Always verify current pricing directly with RISE (ri.se) or your testing lab before project budgeting. Contact RISE at +46 10 516 50 00 for current pricing.
                            </div>

                            {/* Cost Matrix Table */}
                            <div className="overflow-x-auto bg-white rounded-lg border border-amber-100">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-amber-50">
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Product Type</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Test Standard</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Cost (SEK)</th>
                                            <th className="text-left py-3 px-4 font-semibold text-slate-700">Timeline</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 text-slate-900">Upholstered chair</td>
                                            <td className="py-3 px-4 text-slate-600">EN 1021-1 (cigarette)</td>
                                            <td className="py-3 px-4 text-slate-600">15,000-18,000</td>
                                            <td className="py-3 px-4 text-slate-600">3-4 weeks</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 text-slate-900">Upholstered chair</td>
                                            <td className="py-3 px-4 text-slate-600">EN 1021-2 (match)</td>
                                            <td className="py-3 px-4 text-slate-600">18,000-25,000</td>
                                            <td className="py-3 px-4 text-slate-600">3-4 weeks</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 text-slate-900">Sofa / deep-seat</td>
                                            <td className="py-3 px-4 text-slate-600">BS 5852 Crib 5</td>
                                            <td className="py-3 px-4 text-slate-600">45,000-70,000</td>
                                            <td className="py-3 px-4 text-slate-600">6-8 weeks</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 text-slate-900">Curtain fabric</td>
                                            <td className="py-3 px-4 text-slate-600">EN 13501-1 Euroclass</td>
                                            <td className="py-3 px-4 text-slate-600">45,000-60,000</td>
                                            <td className="py-3 px-4 text-slate-600">6-8 weeks</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="py-3 px-4 text-slate-900">Wall covering</td>
                                            <td className="py-3 px-4 text-slate-600">EN 13501-1 B-s1,d0</td>
                                            <td className="py-3 px-4 text-slate-600">50,000-75,000</td>
                                            <td className="py-3 px-4 text-slate-600">6-8 weeks</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4 text-slate-900">Mattress</td>
                                            <td className="py-3 px-4 text-slate-600">EN 597-1/2</td>
                                            <td className="py-3 px-4 text-slate-600">60,000-90,000</td>
                                            <td className="py-3 px-4 text-slate-600">8-10 weeks</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Budget Guidance */}
                            <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-700">
                                <strong>Budget Guidance:</strong> For comprehensive hotel renovation fire testing (8-10 product types), budget 100,000-200,000 SEK.
                            </div>
                        </div>
                    </details>

                    {/* Best Practices */}
                    <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                        <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" />
                            Best Practices
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fireSafety.bestPractices.map((practice, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-emerald-100">
                                    <h4 className="font-semibold text-slate-900 text-sm mb-1">{practice.title}</h4>
                                    <p className="text-xs text-slate-600">{practice.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Precedents */}
                    {fireSafety.precedents && fireSafety.precedents.length > 0 && (
                        <div className="mt-8">
                            <h3 className="font-bold text-slate-900 mb-4">Successful Precedents</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {fireSafety.precedents.map((precedent, idx) => (
                                    <div key={idx} className="bg-white rounded-xl border p-5">
                                        <h4 className="font-semibold text-slate-900">{precedent.project}</h4>
                                        <p className="text-xs text-slate-500 mb-2">{precedent.location}</p>
                                        <p className="text-sm text-slate-600 mb-2">{precedent.approach}</p>
                                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                                            <CheckCircle className="w-3 h-3" />
                                            {precedent.outcome}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* Regulatory Practice Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Eye className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{regulatoryPractice.regulatoryPractice.title}</h2>
                            <p className="text-sm text-slate-500">{regulatoryPractice.regulatoryPractice.subtitle}</p>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl p-6 mb-8 text-white">
                        <p className="text-purple-200 text-sm mb-4">{regulatoryPractice.regulatoryPractice.description}</p>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-xs text-purple-100">
                                <strong>Key Insight:</strong> Understanding enforcement reality helps you prioritize compliance efforts and budget. Fire safety is non-negotiable; EPDs are nice-to-have.
                            </p>
                        </div>
                    </div>

                    {/* Enforcement Levels Table */}
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden mb-8">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 border-b">
                                        <th className="text-left py-4 px-5 font-semibold text-slate-600">Category</th>
                                        <th className="text-left py-4 px-5 font-semibold text-slate-600">Regulation</th>
                                        <th className="text-left py-4 px-5 font-semibold text-slate-600">Enforcement</th>
                                        <th className="text-left py-4 px-5 font-semibold text-slate-600 hidden lg:table-cell">Risk if Ignored</th>
                                        <th className="text-left py-4 px-5 font-semibold text-slate-600 hidden xl:table-cell">Fyra Recommendation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {regulatoryPractice.regulatoryPractice.enforcementLevels.map((item, idx) => (
                                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-4 px-5">
                                                <span className="font-medium text-slate-900">{item.category}</span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded">{item.regulation}</span>
                                            </td>
                                            <td className="py-4 px-5">
                                                <EnforcementBadge level={item.enforcementLevel} />
                                                <p className="text-xs text-slate-500 mt-2">{item.enforcementDescription}</p>
                                            </td>
                                            <td className="py-4 px-5 hidden lg:table-cell">
                                                <span className={cn(
                                                    "text-xs",
                                                    item.enforcementLevel === 'high' ? 'text-red-600 font-medium' : 'text-slate-600'
                                                )}>
                                                    {item.riskIfIgnored}
                                                </span>
                                            </td>
                                            <td className="py-4 px-5 hidden xl:table-cell">
                                                <span className="text-xs text-purple-700 font-medium">{item.fyraRecommendation}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile-friendly cards for enforcement details */}
                    <div className="lg:hidden space-y-4 mb-8">
                        {regulatoryPractice.regulatoryPractice.enforcementLevels.map((item, idx) => (
                            <div key={idx} className="bg-white rounded-xl border shadow-sm p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <h4 className="font-semibold text-slate-900">{item.category}</h4>
                                    <EnforcementBadge level={item.enforcementLevel} />
                                </div>
                                <p className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded inline-block mb-3">{item.regulation}</p>
                                <p className="text-sm text-slate-600 mb-3">{item.practicalNotes}</p>
                                <div className="pt-3 border-t border-slate-100 space-y-2">
                                    <div>
                                        <span className="text-xs text-slate-500">Risk if ignored:</span>
                                        <p className={cn(
                                            "text-sm",
                                            item.enforcementLevel === 'high' ? 'text-red-600 font-medium' : 'text-slate-700'
                                        )}>{item.riskIfIgnored}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-slate-500">Fyra says:</span>
                                        <p className="text-sm text-purple-700 font-medium">{item.fyraRecommendation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Interior Renovation Pathway Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-teal-100 rounded-lg">
                            <Hammer className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{regulatoryPractice.interiorRenovation.title}</h2>
                            <p className="text-sm text-slate-500">{regulatoryPractice.interiorRenovation.subtitle}</p>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-gradient-to-br from-teal-800 to-teal-900 rounded-2xl p-6 mb-8 text-white">
                        <p className="text-teal-200 text-sm mb-4">{regulatoryPractice.interiorRenovation.description}</p>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-xs text-teal-100">
                                <strong>The Fyra Advantage:</strong> Interior-focused FF&E updates typically avoid building permit requirements, reducing both timeline and cost significantly.
                            </p>
                        </div>
                    </div>

                    {/* Advantages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {regulatoryPractice.interiorRenovation.advantages.map((advantage, idx) => (
                            <div key={idx} className="bg-white rounded-xl border shadow-sm p-5">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-teal-100 rounded-lg shrink-0">
                                        <Zap className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-1">{advantage.title}</h4>
                                        <p className="text-sm text-slate-600 mb-2">{advantage.description}</p>
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                                            <CheckCircle className="w-3 h-3" />
                                            {advantage.savings}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Scope Guidelines */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Included */}
                        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-5">
                            <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Typically Included (No Permit)
                            </h4>
                            <ul className="space-y-2">
                                {regulatoryPractice.interiorRenovation.scopeGuidelines.included.map((item, idx) => (
                                    <li key={idx} className="text-sm text-emerald-800 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Excluded */}
                        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                            <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                                <X className="w-5 h-5" />
                                Requires Permit
                            </h4>
                            <ul className="space-y-2">
                                {regulatoryPractice.interiorRenovation.scopeGuidelines.excluded.map((item, idx) => (
                                    <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gray Area */}
                        <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                            <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Gray Area (Verify)
                            </h4>
                            <ul className="space-y-2">
                                {regulatoryPractice.interiorRenovation.scopeGuidelines.grayArea.map((item, idx) => (
                                    <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Project Types */}
                    <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
                        <h3 className="font-bold text-slate-900 mb-4">Project Types & Compliance Requirements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {regulatoryPractice.interiorRenovation.projectTypes.map((project, idx) => (
                                <div key={idx} className="bg-slate-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-slate-900 mb-1">{project.type}</h4>
                                    <p className="text-xs text-slate-500 mb-3">{project.description}</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Timeline</span>
                                            <span className="font-medium text-slate-700">{project.timeline}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500">Permit</span>
                                            <span className={cn(
                                                "font-medium",
                                                project.permitRequired === false ? "text-emerald-600" : "text-amber-600"
                                            )}>
                                                {project.permitRequired === false ? "Not Required" : String(project.permitRequired)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200">{project.compliance}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compliance Checklist */}
                    <div className="bg-teal-50 rounded-xl border border-teal-200 p-6">
                        <h3 className="font-bold text-teal-900 mb-4 flex items-center gap-2">
                            <ClipboardCheck className="w-5 h-5" />
                            Interior Renovation Compliance Checklist
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {regulatoryPractice.interiorRenovation.complianceChecklist.map((item, idx) => (
                                <div key={idx} className="bg-white rounded-lg p-4 border border-teal-100">
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "p-1 rounded shrink-0",
                                            item.priority === 'high' ? 'bg-red-100' :
                                            item.priority === 'medium' ? 'bg-amber-100' : 'bg-slate-100'
                                        )}>
                                            <CheckCircle className={cn(
                                                "w-4 h-4",
                                                item.priority === 'high' ? 'text-red-600' :
                                                item.priority === 'medium' ? 'text-amber-600' : 'text-slate-500'
                                            )} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-slate-900 text-sm">{item.item}</h4>
                                            <p className="text-xs text-slate-600 mt-1">{item.action}</p>
                                            <span className={cn(
                                                "inline-block mt-2 px-2 py-0.5 text-[10px] font-medium rounded-full",
                                                item.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                item.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                                            )}>
                                                {item.priority.toUpperCase()} PRIORITY
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Public Procurement Section (Obj 5) */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Landmark className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{publicProcurement.title}</h2>
                            <p className="text-sm text-slate-500">LOU Framework & Circular Procurement Best Practices</p>
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="bg-gradient-to-br from-indigo-800 to-indigo-900 rounded-2xl p-6 mb-8 text-white">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Scale className="w-5 h-5" />
                            Why This Matters for Private Hotels
                        </h3>
                        <p className="text-indigo-200 text-sm mb-4">{publicProcurement.description}</p>
                        <div className="bg-white/10 rounded-lg p-4">
                            <p className="text-xs text-indigo-100">
                                <strong>Key Insight:</strong> While LOU doesn&apos;t apply to private projects, public procurement standards increasingly influence private market expectations through investor ESG requirements, hotel chain policies, and municipal partnerships.
                            </p>
                        </div>
                    </div>

                    {/* Procurement Sections Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {publicProcurement.sections.slice(0, 4).map((section) => (
                            <div key={section.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                <div className="bg-indigo-50 px-5 py-4 border-b flex items-center gap-3">
                                    <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600">
                                        {procurementIconMap[section.id] || <FileText className="w-5 h-5" />}
                                    </div>
                                    <h3 className="font-semibold text-slate-900">{section.title}</h3>
                                </div>
                                <div className="p-5 space-y-4">
                                    {section.items.slice(0, 3).map((item, idx) => (
                                        <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                                                {item.actionable && (
                                                    <span className="shrink-0 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">
                                                        Actionable
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                                            {item.insight && (
                                                <p className="text-xs text-indigo-600 mt-2 italic">{item.insight}</p>
                                            )}
                                            {item.examples && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {item.examples.slice(0, 2).map((ex, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded">
                                                            {ex}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {section.items.length > 3 && (
                                        <p className="text-xs text-slate-400 pt-2">+{section.items.length - 3} more items</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Practical Guidance Highlight */}
                    {publicProcurement.sections.find(s => s.id === 'practicalGuidance') && (
                        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6 mb-8">
                            <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                Practical Guidance for Fyra Projects
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {publicProcurement.sections.find(s => s.id === 'practicalGuidance')?.items.map((item, idx) => (
                                    <div key={idx} className="bg-white rounded-lg p-4 border border-emerald-100">
                                        <h4 className="font-semibold text-slate-900 text-sm mb-2">{item.title}</h4>
                                        <p className="text-xs text-slate-600 mb-2">{item.description}</p>
                                        {item.checklist && (
                                            <ul className="space-y-1 mt-2">
                                                {item.checklist.slice(0, 3).map((check, i) => (
                                                    <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                                                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                                                        {check}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {item.recommendation && (
                                            <p className="text-xs text-emerald-700 mt-2 font-medium">{item.recommendation}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Resources */}
                    <div className="bg-white rounded-xl border shadow-sm p-6">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-indigo-600" />
                            Key Resources
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {publicProcurement.keyResources.map((resource, idx) => (
                                <a
                                    key={idx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors group"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-700">{resource.name}</p>
                                        <p className="text-xs text-slate-500">{resource.type}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Other Regulations */}
                <section>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Additional Regulatory Requirements</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {regulations.map((section: any) => (
                            <div key={section.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                <div className="bg-slate-50 px-6 py-4 border-b flex items-center gap-3">
                                    {section.id === 'fireSafety' && <Shield className="w-5 h-5 text-red-600" />}
                                    {section.id === 'buildingCodes' && <FileText className="w-5 h-5 text-blue-600" />}
                                    {section.id === 'materialStandards' && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                                    {section.id === 'documentation' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                    <h3 className="font-semibold text-slate-900">{section.title}</h3>
                                </div>
                                <div className="divide-y">
                                    {section.items.slice(0, 6).map((item: any, idx: number) => (
                                        <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
                                            <div className="flex justify-between items-start gap-4">
                                                <h4 className="text-sm font-medium text-slate-900 leading-snug">{item.title}</h4>
                                                <span className={cn(
                                                    "shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border",
                                                    item.scope.includes("EU")
                                                        ? "bg-blue-50 text-blue-700 border-blue-200"
                                                        : "bg-slate-100 text-slate-700 border-slate-200"
                                                )}>
                                                    {item.scope}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                                                {item.description}
                                            </p>
                                            {item.confidence === "High" && (
                                                <div className="mt-2 flex items-center gap-1 text-[10px] text-green-700 font-medium">
                                                    <CheckCircle className="w-3 h-3" /> Verified Standard
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {section.items.length > 6 && (
                                        <div className="p-3 text-center bg-slate-50 text-xs font-medium text-slate-500">
                                            +{section.items.length - 6} more requirements
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl font-bold mb-3">Need Regulatory Guidance?</h2>
                        <p className="text-slate-300 mb-6">
                            Navigate complex fire safety and building code requirements with expert support.
                            Our network includes certified fire consultants and testing lab partnerships.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/scenarios"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
                            >
                                Fire-Critical Scenario Guide
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/experts"
                                className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                            >
                                Find Fire Consultants
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
