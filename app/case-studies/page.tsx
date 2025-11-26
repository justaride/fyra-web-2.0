import { promises as fs } from 'fs';
import path from 'path';
import { CaseStudyCard } from '@/components/CaseStudyCard';
import { Header } from '@/components/Header';

async function getCaseStudies() {
    const filePath = path.join(process.cwd(), 'data', 'caseStudies_clean.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export default async function CaseStudiesPage() {
    const caseStudies = await getCaseStudies();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 max-w-3xl">
                    <h2 className="text-2xl font-bold text-slate-900">Circular Implementation Examples</h2>
                    <p className="text-slate-600 mt-2">
                        Real-world examples of circular construction and reuse in the Nordic hospitality sector.
                        Filtered for recent relevance (2018+).
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies.map((study: any) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </div>
            </div>
        </main>
    );
}
