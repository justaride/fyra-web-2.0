import { loadJsonFile, getSuppliers, getCaseStudies, getConsultantsEnhanced } from '@/lib/data';
import { FileText, CheckCircle, AlertTriangle, Info, Armchair, Shirt, Lightbulb, Hammer, Flame, FlaskConical, Recycle, ArrowRight, ExternalLink, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrintButton } from '@/components/PrintButton';
import { Header } from '@/components/Header';
import { BreadcrumbBar } from '@/components/Breadcrumb';

interface SpecificationOption {
    id: string;
    name: string;
    description?: string;
    alternatives?: string[];
    requirements?: Array<{ name: string; detail: string }>;
}

interface SpecificationTemplate {
    id: string;
    category: string;
    examples: string;
    options: SpecificationOption[];
    circularDesignCriteria?: string[];
    circularContent?: string[];
    mandatoryRequirements: {
        fireSafety?: Record<string, string>;
        vocEmissions?: Record<string, string>;
        electrical?: string;
        efficiency?: string;
    };
}

interface BVBRatingLevel {
    name: string;
    color: string;
    criteria: string;
}

interface SpecificationsData {
    bvbSystem: {
        name: string;
        description: string;
        administrator: string;
        status: string;
        adoptionRate: string;
        website: string;
        ratingSystem: {
            levels: BVBRatingLevel[];
        };
        assessmentProcess: {
            applicant: string;
            documentation: string[];
            timeline: string;
            cost: Record<string, string>;
        };
        circularEconomyCriteria: {
            recycledContent: { criterion: string; recommended: string; accepted: string; notes: string };
            recyclability: { criterion: string; recommended: string; accepted: string; toBeAvoided: string };
            gaps: string[];
        };
        hospitalitySectorUsage: {
            adoption: string;
            alternatives: string[];
            requirement: string;
        };
        productCoverage: Record<string, string[]>;
        criticalGap: {
            title: string;
            issue: string;
            barriers: string[];
            fyraImplication: string;
        };
    };
    specificationTemplates: SpecificationTemplate[];
    equivalencyFramework: {
        title: string;
        purpose: string;
        pathways: Array<{
            name: string;
            description: string;
            requirements: string[];
            acceptedTools?: string[];
            testingLabs?: string[];
            successRate?: string;
            bestFor?: string;
        }>;
    };
    fireTestingResources: {
        primaryLab: {
            name: string;
            locations: string[];
            contact: string;
            services: Array<{ test: string; timeline: string; cost: string }>;
        };
        alternativeApproach: {
            name: string;
            description: string;
            cost: string;
            compliance: string;
            duration: string;
        };
    };
}

// Default fallback for specifications
const DEFAULT_SPECIFICATIONS: SpecificationsData = {
    bvbSystem: {
        name: '',
        description: '',
        administrator: '',
        status: '',
        adoptionRate: '',
        website: '',
        ratingSystem: { levels: [] },
        assessmentProcess: { applicant: '', documentation: [], timeline: '', cost: {} },
        circularEconomyCriteria: {
            recycledContent: { criterion: '', recommended: '', accepted: '', notes: '' },
            recyclability: { criterion: '', recommended: '', accepted: '', toBeAvoided: '' },
            gaps: []
        },
        hospitalitySectorUsage: { adoption: '', alternatives: [], requirement: '' },
        productCoverage: {},
        criticalGap: { title: '', issue: '', barriers: [], fyraImplication: '' }
    },
    specificationTemplates: [],
    equivalencyFramework: { title: '', purpose: '', pathways: [] },
    fireTestingResources: {
        primaryLab: { name: '', locations: [], contact: '', services: [] },
        alternativeApproach: { name: '', description: '', cost: '', compliance: '', duration: '' }
    }
};

async function getSpecifications(): Promise<SpecificationsData> {
    return loadJsonFile('specifications.json', DEFAULT_SPECIFICATIONS);
}

function getCategoryIcon(category: string) {
    switch (category) {
        case 'Furniture': return <Armchair className="w-5 h-5" />;
        case 'Textiles': return <Shirt className="w-5 h-5" />;
        case 'Lighting': return <Lightbulb className="w-5 h-5" />;
        case 'Building Materials': return <Hammer className="w-5 h-5" />;
        default: return <FileText className="w-5 h-5" />;
    }
}

function getRatingColor(color: string) {
    switch (color) {
        case 'green': return 'bg-green-500';
        case 'yellow': return 'bg-yellow-500';
        case 'red': return 'bg-red-500';
        default: return 'bg-slate-500';
    }
}

export default async function SpecificationsPage() {
    const [data, suppliers, caseStudies, consultantsData] = await Promise.all([
        getSpecifications(),
        getSuppliers(),
        getCaseStudies(),
        getConsultantsEnhanced(),
    ]);
    const consultants = consultantsData.tier1 || [];
    const { bvbSystem, specificationTemplates, equivalencyFramework, fireTestingResources } = data;

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
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span>Specifications</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            Specification Guide for Circular Materials
                        </h1>

                        {/* Value proposition */}
                        <p className="text-lg text-slate-300 leading-relaxed mb-4">
                            Navigate the BVB system and use specification templates to document reused
                            and circular products in Swedish hotel projects. Ensure compliance with
                            fire safety and sustainability standards.
                        </p>

                        {/* Quick nav hint */}
                        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                            <p className="text-blue-200 text-sm">
                                <strong>Start Here:</strong> The BVB (Byggvarubedömningen) system is Sweden&apos;s
                                leading building product assessment tool. Below you&apos;ll find rating criteria,
                                specification templates, and equivalency pathways for circular products.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-400" />
                                <span><strong>4</strong> Product Categories</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Recycle className="w-4 h-4 text-blue-400" />
                                <span><strong>3</strong> Equivalency Pathways</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-blue-400" />
                                <span>Fire Safety Compliance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">

                {/* BVB System Overview */}
                <section className="mb-12">
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-blue-50 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{bvbSystem.name}</h3>
                                <p className="text-xs text-slate-600">{bvbSystem.status}</p>
                            </div>
                            <a
                                href={bvbSystem.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Visit site <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-slate-600 mb-6">{bvbSystem.description}</p>

                            {/* Rating System */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3">Rating System (Traffic Light)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {bvbSystem.ratingSystem.levels.map((level) => (
                                        <div key={level.name} className="border rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={cn("w-4 h-4 rounded-full", getRatingColor(level.color))} />
                                                <span className="font-semibold text-sm text-slate-900">{level.name}</span>
                                            </div>
                                            <p className="text-xs text-slate-600">{level.criteria}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Circular Economy Criteria */}
                            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                                    <Recycle className="w-4 h-4" /> Circular Economy Criteria in BVB
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs font-medium text-green-800 mb-1">Recycled Content (Criterion 1.2)</p>
                                        <p className="text-xs text-green-700">
                                            <strong>Recommended:</strong> {bvbSystem.circularEconomyCriteria.recycledContent.recommended}
                                        </p>
                                        <p className="text-[10px] text-green-600 mt-1">{bvbSystem.circularEconomyCriteria.recycledContent.notes}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-green-800 mb-1">Recyclability (Criterion 5.2)</p>
                                        <p className="text-xs text-green-700">
                                            <strong>Recommended:</strong> {bvbSystem.circularEconomyCriteria.recyclability.recommended}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-amber-800 mb-2">Gaps in BVB Circular Criteria:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {bvbSystem.circularEconomyCriteria.gaps.map((gap, idx) => (
                                            <span key={idx} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                                                {gap}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Critical Gap Alert */}
                            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-red-900">{bvbSystem.criticalGap.title}</h4>
                                        <p className="text-xs text-red-800 mt-1">{bvbSystem.criticalGap.issue}</p>
                                        <ul className="mt-2 space-y-1">
                                            {bvbSystem.criticalGap.barriers.map((barrier, idx) => (
                                                <li key={idx} className="text-[10px] text-red-700 flex items-start gap-1.5">
                                                    <span className="mt-1.5 w-1 h-1 bg-red-400 rounded-full shrink-0" />
                                                    {barrier}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-red-900 mt-3 font-medium">
                                            Fyra Implication: {bvbSystem.criticalGap.fyraImplication}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specification Templates */}
                <section className="mb-12">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Specification Templates by Product Category</h3>
                    <p className="text-sm text-slate-600 mb-6 max-w-3xl">
                        Use these templates when specifying materials for hotel projects. Each template provides multiple pathways
                        including options for reclaimed/refurbished products.
                    </p>

                    <div className="space-y-6">
                        {specificationTemplates.map((template) => (
                            <div key={template.id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                <div className="px-6 py-4 border-b bg-slate-50 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                                        {getCategoryIcon(template.category)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{template.category}</h4>
                                        <p className="text-xs text-slate-500">{template.examples}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Options */}
                                    <div className="space-y-4 mb-6">
                                        {template.options.map((option, idx) => (
                                            <div key={option.id} className={cn(
                                                "border rounded-lg p-4",
                                                option.id === 'optionC' || option.id === 'optionD'
                                                    ? 'border-green-200 bg-green-50'
                                                    : 'border-slate-200'
                                            )}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={cn(
                                                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                                                        option.id === 'optionC' || option.id === 'optionD'
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-slate-200 text-slate-700'
                                                    )}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </span>
                                                    <span className="font-semibold text-sm text-slate-900">{option.name}</span>
                                                    {(option.id === 'optionC' || option.id === 'optionD') && (
                                                        <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded font-medium ml-2">
                                                            CIRCULAR PATH
                                                        </span>
                                                    )}
                                                </div>

                                                {option.description && (
                                                    <p className="text-xs text-slate-600 mb-2">{option.description}</p>
                                                )}

                                                {option.alternatives && (
                                                    <ul className="space-y-1 ml-4">
                                                        {option.alternatives.map((alt, altIdx) => (
                                                            <li key={altIdx} className="text-xs text-slate-600 flex items-start gap-2">
                                                                <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                                                                {alt}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {option.requirements && (
                                                    <ul className="space-y-2 mt-2">
                                                        {option.requirements.map((req, reqIdx) => (
                                                            <li key={reqIdx} className="text-xs">
                                                                <span className="font-medium text-slate-800">{req.name}:</span>
                                                                <span className="text-slate-600 ml-1">{req.detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Circular Design Criteria */}
                                    {(template.circularDesignCriteria || template.circularContent) && (
                                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="text-xs font-semibold text-blue-800 mb-2">Circular Design Criteria (Recommended)</h5>
                                            <ul className="space-y-1">
                                                {(template.circularDesignCriteria || template.circularContent || []).map((criteria, idx) => (
                                                    <li key={idx} className="text-[10px] text-blue-700 flex items-start gap-1.5">
                                                        <Recycle className="w-3 h-3 mt-0.5 shrink-0" />
                                                        {criteria}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Mandatory Requirements */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {template.mandatoryRequirements?.fireSafety && (
                                            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                                <h5 className="text-xs font-semibold text-red-800 mb-2 flex items-center gap-1.5">
                                                    <Flame className="w-3 h-3" /> Fire Safety (Mandatory)
                                                </h5>
                                                {Object.entries(template.mandatoryRequirements.fireSafety).map(([key, value]) => (
                                                    <p key={key} className="text-[10px] text-red-700 mb-1">
                                                        <span className="font-medium capitalize">{key}:</span> {value}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {template.mandatoryRequirements?.vocEmissions && (
                                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                                                <h5 className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                                                    <FlaskConical className="w-3 h-3" /> VOC Emissions (Mandatory)
                                                </h5>
                                                {Object.entries(template.mandatoryRequirements.vocEmissions).map(([key, value]) => (
                                                    <p key={key} className="text-[10px] text-amber-700 mb-1">
                                                        <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {value}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                        {template.mandatoryRequirements?.electrical && (
                                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <h5 className="text-xs font-semibold text-blue-800 mb-2 flex items-center gap-1.5">
                                                    <Lightbulb className="w-3 h-3" /> Electrical Safety (Mandatory)
                                                </h5>
                                                <p className="text-[10px] text-blue-700">{template.mandatoryRequirements.electrical}</p>
                                            </div>
                                        )}
                                        {template.mandatoryRequirements?.efficiency && (
                                            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                                <h5 className="text-xs font-semibold text-green-800 mb-2 flex items-center gap-1.5">
                                                    <Leaf className="w-3 h-3" /> Energy Efficiency (Mandatory)
                                                </h5>
                                                <p className="text-[10px] text-green-700">{template.mandatoryRequirements.efficiency}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Equivalency Framework */}
                <section className="mb-12">
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-green-50">
                            <h3 className="font-semibold text-slate-900">{equivalencyFramework.title}</h3>
                            <p className="text-xs text-slate-600 mt-1">{equivalencyFramework.purpose}</p>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {equivalencyFramework.pathways.map((pathway, idx) => (
                                    <div key={idx} className="border rounded-lg p-4 hover:border-green-300 transition-colors">
                                        <h4 className="font-semibold text-sm text-slate-900 mb-2">{pathway.name}</h4>
                                        <p className="text-xs text-slate-600 mb-3">{pathway.description}</p>
                                        <ul className="space-y-1.5 mb-3">
                                            {pathway.requirements.map((req, reqIdx) => (
                                                <li key={reqIdx} className="text-[10px] text-slate-700 flex items-start gap-1.5">
                                                    <ArrowRight className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                                                    {req}
                                                </li>
                                            ))}
                                        </ul>
                                        {pathway.successRate && (
                                            <p className="text-[10px] text-green-700 font-medium">
                                                Success rate: {pathway.successRate}
                                            </p>
                                        )}
                                        {pathway.bestFor && (
                                            <p className="text-[10px] text-slate-500 mt-1">
                                                Best for: {pathway.bestFor}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fire Testing Resources */}
                <section className="mb-8">
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b bg-red-50 flex items-center gap-3">
                            <Flame className="w-5 h-5 text-red-600" />
                            <h3 className="font-semibold text-slate-900">Fire Testing Resources</h3>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Primary Lab */}
                                <div className="border rounded-lg p-4">
                                    <h4 className="font-semibold text-sm text-slate-900 mb-1">{fireTestingResources.primaryLab.name}</h4>
                                    <p className="text-xs text-slate-500 mb-3">
                                        Locations: {fireTestingResources.primaryLab.locations.join(', ')}
                                    </p>
                                    <p className="text-xs text-slate-600 mb-4">
                                        Contact: {fireTestingResources.primaryLab.contact}
                                    </p>
                                    <table className="w-full text-xs">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 font-semibold text-slate-700">Test</th>
                                                <th className="text-center py-2 font-semibold text-slate-700">Timeline</th>
                                                <th className="text-right py-2 font-semibold text-slate-700">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fireTestingResources.primaryLab.services.map((service, idx) => (
                                                <tr key={idx} className="border-b last:border-0">
                                                    <td className="py-2 text-slate-600">{service.test}</td>
                                                    <td className="py-2 text-center text-slate-600">{service.timeline}</td>
                                                    <td className="py-2 text-right text-slate-600">{service.cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Alternative Approach */}
                                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                                    <h4 className="font-semibold text-sm text-green-900 mb-1">{fireTestingResources.alternativeApproach.name}</h4>
                                    <p className="text-xs text-green-700 mb-3">{fireTestingResources.alternativeApproach.description}</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] text-green-600 font-medium">Cost</p>
                                            <p className="text-xs text-green-800">{fireTestingResources.alternativeApproach.cost}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-green-600 font-medium">Compliance</p>
                                            <p className="text-xs text-green-800">{fireTestingResources.alternativeApproach.compliance}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating Print Button */}
            <PrintButton variant="floating" label="Print" />
        </main>
    );
}
