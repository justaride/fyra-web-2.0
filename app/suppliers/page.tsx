import { promises as fs } from 'fs';
import path from 'path';
import SupplierDirectory from '@/components/SupplierDirectory';
import { Header } from '@/components/Header';

async function getSuppliers() {
  const filePath = path.join(process.cwd(), 'data', 'suppliers_enhanced.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Header supplierCount={suppliers.length} />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Nordic Supplier Directory</h1>
          <p className="text-slate-600 max-w-2xl">
            Verified circular infrastructure partners capable of scaling operations across
            Norway, Sweden, Denmark, Finland, and Iceland. Filter by hospitality readiness
            and Nordic coverage.
          </p>
        </div>

        <SupplierDirectory suppliers={suppliers} />
      </div>
    </main>
  );
}
