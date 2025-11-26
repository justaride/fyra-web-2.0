import { promises as fs } from 'fs';
import path from 'path';
import { SupplierCard } from '@/components/SupplierCard';
import SupplierDirectory from '@/components/SupplierDirectory';
import { Header } from '@/components/Header';

async function getSuppliers() {
  const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function Home() {
  const suppliers = await getSuppliers();

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header supplierCount={suppliers.length} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Nordic Supplier Directory</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Verified circular infrastructure partners capable of scaling operations across Norway, Sweden, Denmark, Finland, and Iceland.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Nordic Supplier Directory</h2>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Verified circular infrastructure partners capable of scaling operations across Norway, Sweden, Denmark, Finland, and Iceland.
          </p>
        </div>

        <SupplierDirectory suppliers={suppliers} />
      </div>
    </main>
  );
}
