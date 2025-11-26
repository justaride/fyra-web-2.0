import { Header } from '@/components/Header';
import { ArrowRight, Globe, Shield, Users, Building } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header />

            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        Enabling Circular Construction at Nordic Scale
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Fyra is the infrastructure layer connecting national reuse markets into a unified Nordic ecosystem.
                        We bridge the gap between fragmented local suppliers and enterprise-scale construction projects.
                    </p>
                </div>

                {/* Mission Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-white p-8 rounded-2xl border shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Cross-Border Scale</h3>
                        <p className="text-slate-600">
                            Moving beyond local "flea market" reuse to industrial-scale logistics.
                            Connecting Swedish supply with Finnish demand and Norwegian projects.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border shadow-sm">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Regulatory Compliance</h3>
                        <p className="text-slate-600">
                            Navigating the complex maze of BBR (Sweden), TEK (Norway), and EU regulations.
                            Ensuring every reused item meets strict fire and safety standards.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl border shadow-sm">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">Ecosystem Integration</h3>
                        <p className="text-slate-600">
                            Uniting architects, consultants, and suppliers.
                            Partnering with leaders like White Arkitekter and Forsen AB to deliver turnkey circular solutions.
                        </p>
                    </div>
                </div>

                {/* Strategic Context */}
                <div className="max-w-5xl mx-auto bg-white rounded-2xl border shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-10 lg:p-12 bg-slate-900 text-white flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-red-400 font-bold">1</span>
                                    </div>
                                    <p className="text-slate-300">Fragmented supply chains limited to local regions.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-red-400 font-bold">2</span>
                                    </div>
                                    <p className="text-slate-300">Inconsistent documentation for fire safety and environmental impact.</p>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-red-400 font-bold">3</span>
                                    </div>
                                    <p className="text-slate-300">Lack of standardized quality grading for reused materials.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="p-10 lg:p-12 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Fyra Solution</h2>
                            <p className="text-slate-600 mb-6">
                                We act as the "Circular Integrator," providing the digital and physical infrastructure to make reuse viable for large commercial projects.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
                                    <Building className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-slate-900">Verified Supplier Network</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium text-slate-900">Standardized Compliance Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Partners Section */}
                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-10">Strategic Partners</h2>
                    <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholder Logos - using text for now */}
                        <div className="px-8 py-4 bg-white border rounded-lg font-bold text-slate-400 text-xl">YLLW Factory</div>
                        <div className="px-8 py-4 bg-white border rounded-lg font-bold text-slate-400 text-xl">Input Interiör</div>
                        <div className="px-8 py-4 bg-white border rounded-lg font-bold text-slate-400 text-xl">White Arkitekter</div>
                        <div className="px-8 py-4 bg-white border rounded-lg font-bold text-slate-400 text-xl">Forsen AB</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
