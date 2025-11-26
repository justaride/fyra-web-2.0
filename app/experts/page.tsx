import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { ConsultantCard } from '@/components/ConsultantCard';
import { Users, ShieldCheck, Lightbulb } from 'lucide-react';

async function getConsultants() {
    const filePath = path.join(process.cwd(), 'data', 'consultants.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function ExpertsPage() {
    const consultants = await getConsultants();

    // Group consultants by tier
    const primary = consultants.filter((c: any) => c.tier === 'Primary');
    const secondary = consultants.filter((c: any) => c.tier === 'Secondary');
    const specialist = consultants.filter((c: any) => c.tier === 'Specialist');
    const reserve = consultants.filter((c: any) => c.tier === 'Reserve');

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-10 max-w-3xl">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Verified Experts Directory</h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        A curated network of architects, project managers, and specialists with proven circular construction capabilities.
                        These partners have been vetted for their ability to navigate Nordic regulations and deliver industrial-scale reuse.
                    </p>
                </div>

                {/* Stats / Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">{consultants.length} Verified Firms</h3>
                            <p className="text-sm text-slate-500">Across Sweden & Nordics</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Regulatory Experts</h3>
                            <p className="text-sm text-slate-500">BBR, PBL & Fire Safety</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 text-lg">Circular Specialists</h3>
                            <p className="text-sm text-slate-500">Sourcing & Logistics</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12">
                    {/* Strategic Partners */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-600 rounded-sm"></span>
                            Strategic Knowledge Partners
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {primary.map((consultant: any) => (
                                <ConsultantCard key={consultant.id} consultant={consultant} />
                            ))}
                            {secondary.map((consultant: any) => (
                                <ConsultantCard key={consultant.id} consultant={consultant} />
                            ))}
                        </div>
                    </section>

                    {/* Specialist Partners */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-amber-500 rounded-sm"></span>
                            Specialist Partners
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {specialist.map((consultant: any) => (
                                <ConsultantCard key={consultant.id} consultant={consultant} />
                            ))}
                        </div>
                    </section>

                    {/* Reserve Network */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-slate-400 rounded-sm"></span>
                            Extended Network
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reserve.map((consultant: any) => (
                                <ConsultantCard key={consultant.id} consultant={consultant} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
