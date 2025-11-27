import Link from 'next/link';
import { MobileNav } from './MobileNav';

interface HeaderProps {
    supplierCount?: number;
}

export function Header({ supplierCount }: HeaderProps) {
    return (
        <header className="bg-white border-b sticky top-0 z-40 shadow-sm relative">
            <div className="container mx-auto px-4 py-4 lg:py-5">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 lg:gap-4 group">
                        <div className="h-9 w-9 lg:h-10 lg:w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg lg:text-xl group-hover:bg-blue-700 transition-colors">F</div>
                        <div>
                            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">Fyra Circular Platform</h1>
                            <p className="text-[10px] lg:text-xs text-slate-500 font-medium uppercase tracking-wide hidden sm:block">Nordic Circular Construction Infrastructure</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Suppliers</Link>
                        <Link href="/experts" className="hover:text-slate-900 transition-colors">Experts</Link>
                        <Link href="/scenarios" className="hover:text-slate-900 transition-colors">Scenarios</Link>
                        <Link href="/case-studies" className="hover:text-slate-900 transition-colors">Case Studies</Link>
                        <span className="text-slate-300">|</span>
                        <Link href="/regulations" className="hover:text-slate-900 transition-colors">Regulations</Link>
                        <Link href="/certifications" className="hover:text-slate-900 transition-colors">Certifications</Link>
                        <Link href="/specifications" className="hover:text-slate-900 transition-colors">Specifications</Link>
                        <Link href="/templates" className="hover:text-slate-900 transition-colors">Templates</Link>
                        <span className="text-slate-300">|</span>
                        <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
                    </nav>

                    {/* Right side: Supplier count (desktop) + Mobile menu */}
                    <div className="flex items-center gap-3">
                        {supplierCount !== undefined && (
                            <div className="hidden sm:block text-right">
                                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                    {supplierCount} Verified Partners
                                </span>
                            </div>
                        )}
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}
