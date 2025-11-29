import { promises as fs } from 'fs';
import path from 'path';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbBar } from '@/components/Breadcrumb';
import {
    Award, Building2, Users, Leaf, Globe, Hotel, Landmark,
    Trophy, Calendar, MapPin, ArrowRight, ExternalLink,
    Recycle, FlaskConical, Target, Sparkles, CheckCircle,
    Mail, Linkedin, Instagram, BookOpen, FileText, Scale,
    Briefcase, HelpCircle, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FyraProfile {
    company: {
        name: string;
        tagline: string;
        founded: number;
        location: string;
        employeeCount: string;
        website: string;
        description: string;
        mission: string;
        vision: string;
        values: Array<{ title: string; description: string }>;
        memberships: string[];
    };
    founders: Array<{
        id: string;
        name: string;
        role: string;
        title: string;
        specialization: string;
        description: string;
        email: string;
    }>;
    team: Array<{
        name: string;
        role: string;
        title: string;
    }>;
    expertise: Array<{
        id: string;
        title: string;
        description: string;
        icon: string;
    }>;
    projects: Array<{
        id: string;
        name: string;
        type: string;
        location: string;
        year: string;
        client: string;
        area: string | null;
        description: string;
        approach: string;
        awards: Array<{ name: string; category: string; year: number }>;
        featured: boolean;
        sustainability?: {
            certification: string;
            furnitureReused: string;
            furnitureRefurbished: string;
            features: string[];
        };
    }>;
    awards: {
        studioAwards: Array<{ name: string; category: string; year: number }>;
        projectAwards: Array<{ project: string; name: string; category: string; year: number }>;
    };
    sustainability: {
        approach: string;
        nineRs: {
            description: string;
            strategies: Array<{ code: string; name: string; description: string }>;
        };
        lca: {
            title: string;
            description: string;
            achievements: string[];
            findings: string[];
        };
        greenDeal: {
            title: string;
            description: string;
            commitments: string[];
        };
    };
    methodology: {
        lifeCentric: { title: string; description: string; goal: string };
        researchBased: { title: string; description: string; methods: string[] };
        piloting: { title: string; description: string; benefits: string[] };
        digitalTwins: { title: string; description: string; uses: string[] };
    };
    clients: string[];
    contact: {
        address: string;
        email: string;
        website: string;
        social: { linkedin: string; instagram: string };
    };
}

async function getProfile(): Promise<FyraProfile> {
    const filePath = path.join(process.cwd(), 'data', 'fyra-profile.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getSuppliers() {
    const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getCaseStudies() {
    const filePath = path.join(process.cwd(), 'data', 'caseStudies_clean.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function getConsultants() {
    const filePath = path.join(process.cwd(), 'data', 'consultants_enhanced.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

function getExpertiseIcon(icon: string) {
    switch (icon) {
        case 'Hotel': return <Hotel className="w-6 h-6" />;
        case 'Building2': return <Building2 className="w-6 h-6" />;
        case 'Landmark': return <Landmark className="w-6 h-6" />;
        case 'Leaf': return <Leaf className="w-6 h-6" />;
        default: return <Building2 className="w-6 h-6" />;
    }
}

export default async function AboutPage() {
    const [profile, suppliers, caseStudies, consultants] = await Promise.all([
        getProfile(),
        getSuppliers(),
        getCaseStudies(),
        getConsultants(),
    ]);
    const featuredProjects = profile.projects.filter(p => p.featured);
    const currentYear = new Date().getFullYear();

    return (
        <main className="min-h-screen bg-slate-50 font-sans">
            <Header searchData={{ suppliers, caseStudies, consultants }} />
            <BreadcrumbBar />

            {/* Platform Credits */}
            <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/20">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                                    NCC
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">About This Platform</h2>
                                    <p className="text-teal-100 text-sm leading-relaxed">
                                        This platform is developed by <strong className="text-white">Nordic Circular Hotspot</strong> and <strong className="text-white">Natural State</strong> as
                                        part of the <strong className="text-white">Nordic Circular Construction</strong> project.
                                        Created as a knowledge hub for Fyra to support their circular hospitality design work.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/20">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm">
                                    <CheckCircle className="w-4 h-4 text-teal-400" />
                                    Nordic Circular Hotspot
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm">
                                    <CheckCircle className="w-4 h-4 text-teal-400" />
                                    Natural State
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm">
                                    <CheckCircle className="w-4 h-4 text-teal-400" />
                                    Nordic Circular Construction
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fyra Profile Hero */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>{profile.company.tagline}</span>
                        </div>
                        <p className="text-sm text-blue-300 mb-4">Platform built for</p>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                            {profile.company.name}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            {profile.company.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-400" />
                                <span>Founded {profile.company.founded}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span>{profile.company.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                <span>{profile.company.employeeCount} Team Members</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats */}
            <section className="py-8 bg-white border-b">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-3xl font-bold text-slate-900">{currentYear - profile.company.founded}+</div>
                            <div className="text-sm text-slate-500">Years of Excellence</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">{profile.awards.studioAwards.length + profile.awards.projectAwards.length}+</div>
                            <div className="text-sm text-slate-500">International Awards</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">{profile.clients.length}+</div>
                            <div className="text-sm text-slate-500">Notable Clients</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-900">4</div>
                            <div className="text-sm text-slate-500">Founding Partners</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NCH Platform Guide - How This Platform Answers Research Questions */}
            <section className="py-12 bg-gradient-to-b from-slate-100 to-white border-b">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm mb-4">
                                <BookOpen className="w-4 h-4" />
                                <span>Platform Guide</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">How This Platform Maps to NCH Objectives</h2>
                            <p className="text-slate-600">This platform is the deliverable for the Nordic Circular Hotspot (NCH) collaboration agreement. Here&apos;s how each section answers the research objectives.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Objective 2 */}
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-teal-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1">Objective 2: Segment Analysis</h3>
                                        <p className="text-sm text-slate-600 mb-3">Who are the key players in circular hospitality construction?</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a href="/suppliers" className="inline-flex items-center gap-1 text-sm bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Suppliers Directory
                                            </a>
                                            <a href="/experts" className="inline-flex items-center gap-1 text-sm bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Expert Consultants
                                            </a>
                                            <a href="/case-studies" className="inline-flex items-center gap-1 text-sm bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Case Studies
                                            </a>
                                            <a href="/certifications" className="inline-flex items-center gap-1 text-sm bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Certifications
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Objective 3 */}
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <Scale className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1">Objective 3: Nordic Upscaling Strategy</h3>
                                        <p className="text-sm text-slate-600 mb-3">What regulations and approaches enable circular construction across the Nordics?</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a href="/regulations" className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Regulatory Guide
                                            </a>
                                            <a href="/scenarios" className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Project Scenarios
                                            </a>
                                            <a href="/specifications" className="inline-flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> BVB Specifications
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Objective 4 */}
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                                        <Briefcase className="w-5 h-5 text-amber-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1">Objective 4: Implementation Support</h3>
                                        <p className="text-sm text-slate-600 mb-3">What practical tools help execute circular hotel projects?</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a href="/templates" className="inline-flex items-center gap-1 text-sm bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Templates &amp; Tools
                                            </a>
                                            <a href="/experts" className="inline-flex items-center gap-1 text-sm bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Consultant Contacts
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Objective 5 */}
                            <div className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-900 mb-1">Objective 5: Public Procurement Best Practice</h3>
                                        <p className="text-sm text-slate-600 mb-3">How does Swedish public procurement (LOU) support circular approaches?</p>
                                        <div className="flex flex-wrap gap-2">
                                            <a href="/regulations#public-procurement" className="inline-flex items-center gap-1 text-sm bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                                                <ArrowRight className="w-3 h-3" /> Public Procurement Section
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="flex items-start gap-3">
                                <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                                <div className="text-sm text-slate-600">
                                    <strong className="text-slate-700">About Scenarios:</strong> The Scenarios section provides decision frameworks for different project types, helping you choose the right approach based on budget, timeline, and sustainability targets. They connect market players (Obj 2) with regulatory requirements (Obj 3).
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16">
                {/* Mission & Vision */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-2xl border shadow-sm p-8">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Mission</h3>
                            <p className="text-slate-600 leading-relaxed">{profile.company.mission}</p>
                        </div>
                        <div className="bg-white rounded-2xl border shadow-sm p-8">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                                <Globe className="w-6 h-6 text-amber-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Vision</h3>
                            <p className="text-slate-600 leading-relaxed">{profile.company.vision}</p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profile.company.values.map((value, idx) => (
                            <div key={idx} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold mb-4">
                                    {idx + 1}
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">{value.title}</h4>
                                <p className="text-sm text-slate-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Expertise Areas */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Areas of Expertise</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profile.expertise.map((area) => (
                            <div key={area.id} className="bg-white rounded-xl border p-6 hover:border-blue-300 transition-colors">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4">
                                    {getExpertiseIcon(area.icon)}
                                </div>
                                <h4 className="font-semibold text-slate-900 mb-2">{area.title}</h4>
                                <p className="text-sm text-slate-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Founders */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Founding Partners</h2>
                    <p className="text-slate-600 text-center mb-8">The four visionaries behind Fyra</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profile.founders.map((founder) => (
                            <div key={founder.id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600" />
                                <div className="p-6">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 mx-auto">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <h4 className="font-semibold text-slate-900 text-center">{founder.name}</h4>
                                    <p className="text-sm text-blue-600 text-center mb-2">{founder.role}</p>
                                    <p className="text-xs text-slate-500 text-center mb-3">{founder.specialization}</p>
                                    <p className="text-xs text-slate-600 text-center">{founder.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Projects */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Featured Projects</h2>
                    <p className="text-slate-600 text-center mb-8">Award-winning work across hospitality, workplace, and heritage renovation</p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {featuredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-xl border shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                                <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-slate-400">{project.name.charAt(0)}</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900">{project.name}</h3>
                                            <p className="text-sm text-slate-500">{project.type} • {project.location}</p>
                                        </div>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                                            {project.year}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">{project.description}</p>

                                    {project.sustainability && (
                                        <div className="bg-green-50 rounded-lg p-3 mb-4 border border-green-200">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Leaf className="w-4 h-4 text-green-600" />
                                                <span className="text-xs font-semibold text-green-800">{project.sustainability.certification}</span>
                                            </div>
                                            <div className="flex gap-4 text-xs text-green-700">
                                                <span>{project.sustainability.furnitureReused} furniture reused</span>
                                                <span>{project.sustainability.furnitureRefurbished} refurbished</span>
                                            </div>
                                        </div>
                                    )}

                                    {project.awards.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {project.awards.map((award, idx) => (
                                                <span key={idx} className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200">
                                                    <Trophy className="w-3 h-3" />
                                                    {award.name} {award.year}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Awards Timeline */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Awards & Recognition</h2>
                    <p className="text-slate-600 text-center mb-8">International acclaim for design excellence</p>

                    {/* Studio Awards */}
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 mb-8">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Studio Recognition
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {profile.awards.studioAwards.map((award, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
                                    <div className="text-2xl font-bold">{award.year}</div>
                                    <div className="font-medium">{award.name}</div>
                                    <div className="text-sm text-amber-100">{award.category}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Project Awards by Year */}
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="divide-y">
                            {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => {
                                const yearAwards = profile.awards.projectAwards.filter(a => a.year === year);
                                if (yearAwards.length === 0) return null;
                                return (
                                    <div key={year} className="p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 text-center">
                                                <div className="text-lg font-bold text-slate-900">{year}</div>
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {yearAwards.map((award, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <Trophy className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                                                        <div>
                                                            <div className="text-sm font-medium text-slate-900">{award.name}</div>
                                                            <div className="text-xs text-slate-500">{award.category}</div>
                                                            <div className="text-xs text-blue-600">{award.project}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Sustainability - 9Rs */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Sustainability & Circular Economy</h2>
                    <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">{profile.sustainability.approach}</p>

                    <div className="bg-white rounded-xl border shadow-sm p-8 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Recycle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">The 9R Framework</h3>
                                <p className="text-sm text-slate-500">{profile.sustainability.nineRs.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {profile.sustainability.nineRs.strategies.slice(0, 5).map((strategy) => (
                                <div key={strategy.code} className={cn(
                                    "rounded-lg p-3 text-center",
                                    ['R0', 'R1', 'R2'].includes(strategy.code)
                                        ? 'bg-green-100 border-2 border-green-300'
                                        : 'bg-slate-50 border border-slate-200'
                                )}>
                                    <div className={cn(
                                        "text-xs font-bold mb-1",
                                        ['R0', 'R1', 'R2'].includes(strategy.code) ? 'text-green-700' : 'text-slate-500'
                                    )}>
                                        {strategy.code}
                                    </div>
                                    <div className="text-sm font-medium text-slate-900">{strategy.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                            {profile.sustainability.nineRs.strategies.slice(5).map((strategy) => (
                                <div key={strategy.code} className="bg-slate-50 rounded-lg p-3 text-center border border-slate-200">
                                    <div className="text-xs font-bold text-slate-500 mb-1">{strategy.code}</div>
                                    <div className="text-sm font-medium text-slate-900">{strategy.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LCA & Green Deal */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <FlaskConical className="w-5 h-5 text-blue-600" />
                                <h3 className="font-bold text-slate-900">{profile.sustainability.lca.title}</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{profile.sustainability.lca.description}</p>
                            <div className="space-y-2">
                                {profile.sustainability.lca.achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-600">{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Leaf className="w-5 h-5 text-green-600" />
                                <h3 className="font-bold text-slate-900">{profile.sustainability.greenDeal.title}</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{profile.sustainability.greenDeal.description}</p>
                            <div className="space-y-2">
                                {profile.sustainability.greenDeal.commitments.map((commitment, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                        <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-600">{commitment}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Methodology */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Methodology</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                            <h3 className="font-bold text-slate-900 mb-2">{profile.methodology.lifeCentric.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{profile.methodology.lifeCentric.description}</p>
                            <p className="text-xs text-blue-700 font-medium">{profile.methodology.lifeCentric.goal}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 border border-amber-200">
                            <h3 className="font-bold text-slate-900 mb-2">{profile.methodology.researchBased.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{profile.methodology.researchBased.description}</p>
                            <div className="flex flex-wrap gap-1">
                                {profile.methodology.researchBased.methods.map((method, idx) => (
                                    <span key={idx} className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
                                        {method}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                            <h3 className="font-bold text-slate-900 mb-2">{profile.methodology.piloting.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{profile.methodology.piloting.description}</p>
                            <div className="space-y-1">
                                {profile.methodology.piloting.benefits.map((benefit, idx) => (
                                    <div key={idx} className="text-xs text-green-700 flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> {benefit}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                            <h3 className="font-bold text-slate-900 mb-2">{profile.methodology.digitalTwins.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{profile.methodology.digitalTwins.description}</p>
                            <div className="space-y-1">
                                {profile.methodology.digitalTwins.uses.map((use, idx) => (
                                    <div key={idx} className="text-xs text-purple-700 flex items-center gap-1">
                                        <ArrowRight className="w-3 h-3" /> {use}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Clients */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Trusted By Industry Leaders</h2>
                    <p className="text-slate-600 text-center mb-8">Selected clients across hospitality, corporate, and public sectors</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {profile.clients.map((client, idx) => (
                            <span key={idx} className="px-4 py-2 bg-white border rounded-lg text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                                {client}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Memberships */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Memberships & Commitments</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {profile.company.memberships.map((membership, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-3 bg-white border rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-medium text-slate-700">{membership}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Get in Touch</h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                        Ready to transform your space with sustainable, life-centric design?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <a href={`mailto:${profile.contact.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Mail className="w-4 h-4" />
                            {profile.contact.email}
                        </a>
                        <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            Visit Website
                        </a>
                    </div>
                    <div className="flex justify-center gap-4">
                        <a href={profile.contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href={profile.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
