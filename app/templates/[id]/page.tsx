import { promises as fs } from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PrintButton } from '@/components/PrintButton';

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

async function getTemplate(id: string): Promise<Template | undefined> {
    const templates = await getTemplates();
    return templates.find(t => t.id === id);
}

export async function generateStaticParams() {
    const templates = await getTemplates();
    return templates.map((template) => ({
        id: template.id,
    }));
}

export default async function TemplatePrintPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const template = await getTemplate(id);

    if (!template) {
        notFound();
    }

    return (
        <>
            {/* Print-only styles */}
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    .print-break { page-break-before: always; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .print-container { padding: 0 !important; }
                }
                @media screen {
                    .print-only { display: none !important; }
                }
            `}</style>

            {/* Screen Navigation (hidden when printing) */}
            <div className="no-print bg-slate-100 border-b sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/templates"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Templates
                    </Link>
                    <PrintButton />
                </div>
            </div>

            {/* Printable Form */}
            <main className="print-container min-h-screen bg-white p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                                Fyra Circular Platform - {template.category}
                            </p>
                            <h1 className="text-2xl font-bold text-slate-900">
                                {template.title}
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-slate-500">Date:</p>
                            <div className="border-b border-slate-300 w-32 h-6"></div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                        {template.description}
                    </p>
                </div>

                {/* Form Sections */}
                {template.sections && (
                    <div className="space-y-6">
                        {template.sections.map((section, sIdx) => (
                            <div key={sIdx} className="border border-slate-200 rounded-lg overflow-hidden">
                                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                                        {sIdx + 1}. {section.title}
                                    </h2>
                                </div>
                                <div className="p-4">
                                    <table className="w-full">
                                        <tbody>
                                            {section.fields.map((field, fIdx) => (
                                                <tr key={fIdx} className="border-b border-slate-100 last:border-0">
                                                    <td className="py-2 pr-4 text-sm text-slate-700 w-1/3 align-top">
                                                        {field}:
                                                    </td>
                                                    <td className="py-2">
                                                        <div className="border-b border-slate-300 min-h-[24px]"></div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contract Clauses (for Legal template) */}
                {template.clauses && (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600 italic mb-4">
                            Select applicable clauses and insert into procurement contract. Adjust bracketed values as needed.
                        </p>
                        {template.clauses.map((clause) => (
                            <div key={clause.id} className="border border-slate-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 border-2 border-slate-400 rounded mt-0.5 shrink-0"></div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-1">
                                            Clause {clause.id}: {clause.title}
                                        </h3>
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            {clause.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Additional Info Boxes */}
                {(template.costs || template.labs || template.gradeDefinitions) && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 print-break">
                        {template.costs && (
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                    Reference: Testing Costs
                                </h3>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    {Object.entries(template.costs).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                            <span className="font-medium">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {template.labs && (
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                    Reference: Testing Laboratories
                                </h3>
                                <ul className="text-sm text-slate-700 space-y-1">
                                    {template.labs.map((lab, idx) => (
                                        <li key={idx}>{lab}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {template.gradeDefinitions && (
                            <div className="border border-slate-200 rounded-lg p-4 md:col-span-2">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                                    Reference: Grade Definitions
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {Object.entries(template.gradeDefinitions).map(([grade, def]) => (
                                        <div key={grade}>
                                            <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs font-bold mb-1">
                                                Grade {grade}
                                            </span>
                                            <p className="text-xs text-slate-600">{def}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Usage Note */}
                {template.usage && (
                    <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Usage Instructions
                        </h3>
                        <p className="text-sm text-slate-700">{template.usage}</p>
                    </div>
                )}

                {/* Signature Block */}
                <div className="mt-8 pt-8 border-t-2 border-slate-200">
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Prepared by:</p>
                            <div className="border-b border-slate-300 h-8 mb-2"></div>
                            <p className="text-xs text-slate-500">Name & Title</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Date:</p>
                            <div className="border-b border-slate-300 h-8 mb-2"></div>
                            <p className="text-xs text-slate-500">DD/MM/YYYY</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-6">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Approved by:</p>
                            <div className="border-b border-slate-300 h-8 mb-2"></div>
                            <p className="text-xs text-slate-500">Name & Title</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Approval Date:</p>
                            <div className="border-b border-slate-300 h-8 mb-2"></div>
                            <p className="text-xs text-slate-500">DD/MM/YYYY</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
                    <span>Fyra Circular Platform | fyra.no</span>
                    <span>Source: {template.sourceRef}</span>
                </div>
            </main>
        </>
    );
}
