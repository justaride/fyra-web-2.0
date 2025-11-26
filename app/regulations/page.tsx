import { promises as fs } from 'fs';
import path from 'path';
import { Shield, FileText, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from '@/components/Header';

async function getRegulations() {
    const filePath = path.join(process.cwd(), 'data', 'regulations_filtered.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function RegulationsPage() {
    const regulations = await getRegulations();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 max-w-3xl">
                    <h2 className="text-2xl font-bold text-slate-900">Common Barriers & Requirements</h2>
                    <p className="text-slate-600 mt-2">
                        Navigate the complex landscape of EU and National regulations for circular construction.
                        <br />
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mt-2 inline-block font-medium">
                            Note: This guide provides navigation to official standards, not legal advice.
                        </span>
                    </p>
                </div>

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
                                    <div className="p-3 text-center bg-slate-50 text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer">
                                        View {section.items.length - 6} more requirements...
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
