import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Header } from '@/components/Header';
import {
  Recycle,
  Building2,
  Users,
  FileText,
  BookOpen,
  Award,
  ArrowRight,
  MapPin,
  Leaf,
  ShieldCheck,
  Sparkles,
  CheckCircle,
  TrendingUp,
  Hotel
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  title: string;
  type: string;
  tier: string;
  fyraRelevance: number;
  location: string;
  size?: string;
  year?: string;
  circularFeatures: string[];
  metrics?: {
    co2Impact?: string;
    circularContent?: string;
    certification?: string;
  };
  chain?: string;
}

interface Supplier {
  id: string;
  name: string;
  tagline: string;
  headquarters: string;
  hospitalityTier?: string;
}

async function getSuppliers(): Promise<Supplier[]> {
  const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  const filePath = path.join(process.cwd(), 'data', 'caseStudies_clean.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

async function getConsultantsCount(): Promise<number> {
  const filePath = path.join(process.cwd(), 'data', 'consultants_enhanced.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.length;
}

// Relevance score indicator
function RelevanceScore({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 h-4 rounded-sm",
            i <= score ? "bg-teal-500" : "bg-slate-200"
          )}
        />
      ))}
    </div>
  );
}

// Pathway card component
function PathwayCard({
  href,
  icon: Icon,
  title,
  description,
  count,
  color
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  count?: number | string;
  color: 'teal' | 'blue' | 'amber' | 'purple';
}) {
  const colorClasses = {
    teal: 'bg-teal-50 border-teal-200 hover:border-teal-400 group-hover:bg-teal-100',
    blue: 'bg-blue-50 border-blue-200 hover:border-blue-400 group-hover:bg-blue-100',
    amber: 'bg-amber-50 border-amber-200 hover:border-amber-400 group-hover:bg-amber-100',
    purple: 'bg-purple-50 border-purple-200 hover:border-purple-400 group-hover:bg-purple-100'
  };

  const iconColorClasses = {
    teal: 'text-teal-600 bg-teal-100',
    blue: 'text-blue-600 bg-blue-100',
    amber: 'text-amber-600 bg-amber-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  return (
    <Link href={href} className="group">
      <div className={cn(
        "rounded-xl border-2 p-6 transition-all duration-200",
        colorClasses[color]
      )}>
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconColorClasses[color]
          )}>
            <Icon className="w-6 h-6" />
          </div>
          {count && (
            <span className="text-2xl font-bold text-slate-900">{count}</span>
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-slate-900">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const suppliers = await getSuppliers();
  const caseStudies = await getCaseStudies();
  const consultantsCount = await getConsultantsCount();

  // Get featured case studies (Flagship tier with high relevance)
  const featuredCaseStudies = caseStudies
    .filter(cs => cs.tier === 'Flagship' && cs.fyraRelevance >= 4)
    .slice(0, 3);

  // Get top suppliers (hospitality-ready)
  const topSuppliers = suppliers
    .filter(s => s.hospitalityTier === 'Proven' || s.hospitalityTier === 'Experienced')
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header supplierCount={suppliers.length} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Recycle className="w-4 h-4 text-teal-400" />
              <span>Nordic Circular Construction Platform</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Build Sustainable Hotels
              <span className="block text-teal-400">with Circular Resources</span>
            </h1>

            {/* Value proposition */}
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              The B2B knowledge hub for circular construction in Nordic hospitality.
              Find verified suppliers, proven case studies, and regulatory guidance
              for reuse-first hotel projects.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span><strong>{suppliers.length}</strong> Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-teal-400" />
                <span><strong>{caseStudies.length}</strong> Case Studies</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span><strong>{consultantsCount}</strong> Expert Consultants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Circular? Explainer */}
      <section className="py-6 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-200" />
              <span className="font-medium">What is circular construction?</span>
            </div>
            <p className="text-teal-100 text-sm max-w-xl">
              Reusing, refurbishing, and recycling building materials and furniture instead of buying new.
              Reduces CO2 by 50-80% and cuts costs while meeting sustainability certifications.
            </p>
          </div>
        </div>
      </section>

      {/* Pathway Cards - "I want to..." */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What do you need?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Navigate directly to the resources that match your project needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <PathwayCard
              href="/suppliers"
              icon={Building2}
              title="Find Suppliers"
              description="Browse verified circular suppliers with Nordic reach and hospitality experience."
              count={suppliers.length}
              color="teal"
            />
            <PathwayCard
              href="/case-studies"
              icon={BookOpen}
              title="See Examples"
              description="Learn from real Nordic hotel projects that successfully implemented circular strategies."
              count={caseStudies.length}
              color="blue"
            />
            <PathwayCard
              href="/regulations"
              icon={ShieldCheck}
              title="Understand Regulations"
              description="Navigate fire safety tiers, BBR compliance, and EU material standards."
              color="amber"
            />
            <PathwayCard
              href="/experts"
              icon={Users}
              title="Find Experts"
              description="Connect with consultants specialized in circular hospitality projects."
              count={consultantsCount}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Featured Case Studies
              </h2>
              <p className="text-slate-600">
                Flagship Nordic hotel projects leading in circular design.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="hidden md:flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCaseStudies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.id}`}
                className="group bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Header with gradient */}
                <div className="h-32 bg-gradient-to-br from-teal-500 to-teal-700 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-medium text-white">
                      {cs.tier}
                    </span>
                    <RelevanceScore score={cs.fyraRelevance} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white line-clamp-2">
                      {cs.title.replace(/,.*$/, '')}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{cs.location}</span>
                    {cs.year && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span>{cs.year}</span>
                      </>
                    )}
                  </div>

                  {/* Key metrics */}
                  {cs.metrics && (
                    <div className="space-y-2 mb-3">
                      {cs.metrics.co2Impact && (
                        <div className="flex items-center gap-2 text-xs">
                          <Leaf className="w-3 h-3 text-green-500" />
                          <span className="text-slate-600">{cs.metrics.co2Impact}</span>
                        </div>
                      )}
                      {cs.metrics.certification && (
                        <div className="flex items-center gap-2 text-xs">
                          <Award className="w-3 h-3 text-amber-500" />
                          <span className="text-slate-600">{cs.metrics.certification}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chain badge */}
                  {cs.chain && (
                    <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                      {cs.chain}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-teal-600 font-medium"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Top Suppliers Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Hospitality-Ready Suppliers
              </h2>
              <p className="text-slate-600">
                Verified partners with proven experience in hotel circular projects.
              </p>
            </div>
            <Link
              href="/suppliers"
              className="hidden md:flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
            >
              View directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topSuppliers.map((supplier) => (
              <Link
                key={supplier.id}
                href={`/suppliers/${supplier.id}`}
                className="group p-4 bg-slate-50 rounded-xl border hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-semibold rounded">
                    {supplier.hospitalityTier}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 mb-1">
                  {supplier.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                  {supplier.tagline}
                </p>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3 h-3" />
                  <span>{supplier.headquarters}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link
              href="/suppliers"
              className="inline-flex items-center gap-2 text-teal-600 font-medium"
            >
              View full directory
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* More Resources */}
      <section className="py-12 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/certifications"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-teal-300 transition-colors"
            >
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <div className="font-medium text-slate-900 text-sm">Certifications</div>
                <div className="text-xs text-slate-500">Nordic Swan, BREEAM, etc.</div>
              </div>
            </Link>
            <Link
              href="/specifications"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-teal-300 transition-colors"
            >
              <FileText className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium text-slate-900 text-sm">BVB Specs</div>
                <div className="text-xs text-slate-500">Specification templates</div>
              </div>
            </Link>
            <Link
              href="/scenarios"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-teal-300 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-slate-900 text-sm">Scenarios</div>
                <div className="text-xs text-slate-500">Project guides</div>
              </div>
            </Link>
            <Link
              href="/templates"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border hover:border-teal-300 transition-colors"
            >
              <FileText className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium text-slate-900 text-sm">Templates</div>
                <div className="text-xs text-slate-500">Downloadable forms</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Fyra - Brief */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-500/25">
                    F
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">
                    Built by Fyra
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Fyra is a Helsinki-based interior architecture studio with 15+ years of experience
                    in hospitality design. As pioneers in circular economy methodology, we created this
                    platform to share our knowledge and connect the Nordic circular construction ecosystem.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border rounded-full text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Green Building Council Finland
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border rounded-full text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Finnish Circular Economy Green Deal
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border rounded-full text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      Multiple International Awards
                    </span>
                  </div>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
                  >
                    Learn more about Fyra
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to start your circular project?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Browse our supplier directory or connect with expert consultants
            to begin your sustainable hospitality journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/suppliers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/25"
            >
              <Building2 className="w-5 h-5" />
              Browse Suppliers
            </Link>
            <Link
              href="/experts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
            >
              <Users className="w-5 h-5" />
              Find Consultants
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
