import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import Link from 'next/link';
import {
    FileText,
    Shield,
    Flame,
    ShoppingCart,
    ClipboardCheck,
    Scale,
    Download,
    Printer,
    ArrowRight,
    CheckCircle,
    Info
} from 'lucide-react';

interface TemplateSection {
    title: string;
    fields: string[];
}

interface TemplateClause {
    id: string;
    title: string;
    text: string;
}

interface Template {
    id: string;
    title: string;
    category: string;
    description: string;
    sections?: TemplateSection[];
    clauses?: TemplateClause[];
    usage?: string;
    costs?: Record<string, string>;
    labs?: string[];
    gradeDefinitions?: Record<string, string>;
    sourceRef?: string;
}

async function getTemplates(): Promise<Template[]> {
    const filePath = path.join(process.cwd(), 'data', 'templates.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

const categoryIcons: Record<string, React.ReactNode> = {
    'Documentation': <FileText className="w-5 h-5" />,
    'Compliance': <Shield className="w-5 h-5" />,
    'Safety': <Flame className="w-5 h-5" />,
    'Procurement': <ShoppingCart className="w-5 h-5" />,
    'Quality Assurance': <ClipboardCheck className="w-5 h-5" />,
    'Legal': <Scale className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
    'Documentation': 'bg-blue-50 text-blue-700 border-blue-200',
    'Compliance': 'bg-purple-50 text-purple-700 border-purple-200',
    'Safety': 'bg-red-50 text-red-700 border-red-200',
    'Procurement': 'bg-green-50 text-green-700 border-green-200',
    'Quality Assurance': 'bg-amber-50 text-amber-700 border-amber-200',
    'Legal': 'bg-slate-50 text-slate-700 border-slate-200',
};

export default async function TemplatesPage() {
    const templates = await getTemplates();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
                            P6 - Downloadable Resources
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Templates & Forms
                        </h1>
                        <p className="text-slate-300 text-lg leading-relaxed mb-6">
                            Standardized documentation for circular furniture procurement.
                            These templates help ensure compliance with Swedish building regulations,
                            BVB requirements, and fire safety standards.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                                <Printer className="w-4 h-4" />
                                Print-ready formats
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                                <Download className="w-4 h-4" />
                                Save as PDF
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg text-sm">
                                <CheckCircle className="w-4 h-4" />
                                BBR & BVB compliant
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Navigation</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {templates.map((template) => (
                            <a
                                key={template.id}
                                href={`#${template.id}`}
                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors text-center group"
                            >
                                <div className={`p-2 rounded-lg border ${categoryColors[template.category]}`}>
                                    {categoryIcons[template.category]}
                                </div>
                                <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900 leading-tight">
                                    {template.title.replace(' Template', '').replace(' Form', '')}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="space-y-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            id={template.id}
                            className="bg-white rounded-xl border shadow-sm overflow-hidden scroll-mt-24"
                        >
                            {/* Template Header */}
                            <div className="p-6 border-b bg-slate-50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl border ${categoryColors[template.category]}`}>
                                            {categoryIcons[template.category]}
                                        </div>
                                        <div>
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-1 ${categoryColors[template.category]}`}>
                                                {template.category}
                                            </span>
                                            <h2 className="text-xl font-bold text-slate-900">
                                                {template.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                                                {template.description}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/templates/${template.id}`}
                                        className="shrink-0 inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                                    >
                                        <Printer className="w-4 h-4" />
                                        Open Form
                                    </Link>
                                </div>
                            </div>

                            {/* Template Content Preview */}
                            <div className="p-6">
                                {/* Sections Preview */}
                                {template.sections && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                        {template.sections.map((section, idx) => (
                                            <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                                    {section.title}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {section.fields.slice(0, 4).map((field, fIdx) => (
                                                        <li key={fIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                                            <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                                            {field}
                                                        </li>
                                                    ))}
                                                    {section.fields.length > 4 && (
                                                        <li className="text-xs text-slate-400 italic">
                                                            +{section.fields.length - 4} more fields
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Clauses Preview (for Legal template) */}
                                {template.clauses && (
                                    <div className="space-y-3 mb-6">
                                        {template.clauses.slice(0, 3).map((clause) => (
                                            <div key={clause.id} className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                                                <h4 className="text-sm font-semibold text-slate-900 mb-1">
                                                    {clause.id}. {clause.title}
                                                </h4>
                                                <p className="text-xs text-slate-600 line-clamp-2">
                                                    {clause.text}
                                                </p>
                                            </div>
                                        ))}
                                        {template.clauses.length > 3 && (
                                            <p className="text-xs text-slate-400 italic px-4">
                                                +{template.clauses.length - 3} more clauses in full template
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Additional Info */}
                                <div className="flex flex-wrap gap-4">
                                    {template.costs && (
                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 flex-1 min-w-[200px]">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                                                Testing Costs
                                            </h4>
                                            <ul className="space-y-1">
                                                {Object.entries(template.costs).map(([key, value]) => (
                                                    <li key={key} className="text-xs text-amber-800">
                                                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                                        <span className="font-medium">{value}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {template.labs && (
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 flex-1 min-w-[200px]">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
                                                Testing Laboratories
                                            </h4>
                                            <ul className="space-y-1">
                                                {template.labs.map((lab, idx) => (
                                                    <li key={idx} className="text-xs text-blue-800">{lab}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {template.gradeDefinitions && (
                                        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex-1 min-w-[200px]">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                                                Grade Definitions
                                            </h4>
                                            <ul className="space-y-1">
                                                {Object.entries(template.gradeDefinitions).map(([grade, def]) => (
                                                    <li key={grade} className="text-xs text-emerald-800">
                                                        <span className="font-bold">Grade {grade}:</span> {def}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Usage Note */}
                                {template.usage && (
                                    <div className="mt-4 flex items-start gap-2 p-3 bg-slate-100 rounded-lg">
                                        <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                                        <p className="text-xs text-slate-600">{template.usage}</p>
                                    </div>
                                )}
                            </div>

                            {/* Template Footer */}
                            <div className="px-6 py-4 bg-slate-50 border-t flex items-center justify-between">
                                <span className="text-xs text-slate-400">
                                    Source: {template.sourceRef}
                                </span>
                                <Link
                                    href={`/templates/${template.id}`}
                                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Open printable form <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* How to Use Section */}
                <div className="mt-12 bg-white rounded-xl border shadow-sm p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">How to Use These Templates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">Select Template</h3>
                                <p className="text-sm text-slate-600">
                                    Choose the appropriate template for your documentation needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">Print or Save</h3>
                                <p className="text-sm text-slate-600">
                                    Use browser print function (Ctrl/Cmd+P) to print or save as PDF.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 mb-1">Complete & Submit</h3>
                                <p className="text-sm text-slate-600">
                                    Fill in the form and attach to project documentation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Links */}
                <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-white">
                    <h2 className="text-xl font-bold mb-4">Related Resources</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/regulations"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors text-sm"
                        >
                            <Flame className="w-4 h-4" />
                            Fire Safety Guide
                        </Link>
                        <Link
                            href="/specifications"
                            className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                        >
                            <Shield className="w-4 h-4" />
                            BVB Specifications
                        </Link>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Find Suppliers
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
