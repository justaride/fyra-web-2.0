import { promises as fs } from 'fs';
import path from 'path';
import SupplierDirectory from '@/components/SupplierDirectory';
import { Header } from '@/components/Header';
import { Building2, MapPin, CheckCircle, Globe } from 'lucide-react';

interface Supplier {
  id: string;
  hospitalityTier?: string;
  nordicReach?: boolean;
}

async function getSuppliers(): Promise<Supplier[]> {
  const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  // Calculate stats
  const provenCount = suppliers.filter(s => s.hospitalityTier === 'Proven').length;
  const nordicReachCount = suppliers.filter(s => s.nordicReach).length;

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header supplierCount={suppliers.length} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm mb-4">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Supplier Directory</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Nordic Supplier Directory
            </h1>

            {/* Value proposition */}
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Verified circular infrastructure partners capable of scaling operations
              across Norway, Sweden, Denmark, Finland, and Iceland. Each supplier is
              assessed for hospitality readiness and Nordic coverage.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                <span><strong>{suppliers.length}</strong> Verified Suppliers</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span><strong>{provenCount}</strong> Hospitality Proven</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" />
                <span><strong>{nordicReachCount}</strong> Nordic Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory */}
      <div className="container mx-auto px-4 py-8">
        <SupplierDirectory suppliers={suppliers} />
      </div>
    </main>
  );
}
