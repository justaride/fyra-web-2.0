import { promises as fs } from 'fs';
import path from 'path';
import { Shield, FileText, AlertTriangle, CheckCircle, Info, Flame, Clock, Building2, ArrowRight, ExternalLink, ShieldCheck, ShieldAlert, CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from '@/components/Header';
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

export default async function RegulationsPage() {
    const regulations = await getRegulations();
    const fireSafety = await getFireSafety();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

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
