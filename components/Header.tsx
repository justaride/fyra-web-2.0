import Link from 'next/link';
import { MobileNav } from './MobileNav';
import { Recycle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchWrapper } from './SearchWrapper';

interface HeaderProps {
    supplierCount?: number;
    searchData?: {
        suppliers: any[];
        caseStudies: any[];
        consultants: any[];
    };
}

export function Header({ supplierCount, searchData }: HeaderProps) {
    return (
        <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-700/80 sticky top-0 z-40 shadow-sm relative">
            <div className="container mx-auto px-4 py-3 lg:py-4">
                <div className="flex justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 lg:gap-4 group">
                        {/* Fyra Logo - Teal green for circularity */}
                        <div className="relative">
                            <div className="h-10 w-10 lg:h-11 lg:w-11 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg group-hover:from-teal-600 group-hover:to-teal-700 transition-all duration-200">
                                <span className="relative z-10">F</span>
                            </div>
                            {/* Circular economy indicator */}
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-white">
                                <Recycle className="w-2.5 h-2.5 text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                                Fyra Circular Platform
                            </h1>
                            <p className="text-[10px] lg:text-xs text-slate-500 font-medium uppercase tracking-wider hidden sm:block">
                                Nordic Circular Construction
                            </p>
                        </div>
                    </Link>

                    {/* Search Bar - Desktop */}
                    {searchData && (
                        <SearchWrapper
                            suppliers={searchData.suppliers}
                            caseStudies={searchData.caseStudies}
                            consultants={searchData.consultants}
                        />
                    )}

                    {/* Desktop Navigation */}
                    <nav className="hidden xl:flex items-center gap-1 text-sm font-medium">
                        <NavLink href="/suppliers">Suppliers</NavLink>
                        <NavLink href="/experts">Experts</NavLink>
                        <NavLink href="/scenarios">Scenarios</NavLink>
                        <NavLink href="/case-studies">Case Studies</NavLink>
                        <NavDivider />
                        <NavLink href="/regulations">Regulations</NavLink>
                        <NavLink href="/certifications">Certifications</NavLink>
                        <NavLink href="/specifications">Specs</NavLink>
                        <NavLink href="/templates">Templates</NavLink>
                        <NavDivider />
                        <NavLink href="/about">About</NavLink>
                    </nav>

                    {/* Right side: Supplier count (desktop) + Theme toggle + Mobile menu */}
                    <div className="flex items-center gap-2">
                        {supplierCount !== undefined && (
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-600/20 dark:bg-teal-900/30 dark:text-teal-300 dark:ring-teal-700">
                                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                                    {supplierCount} Verified Partners
                                </span>
                            </div>
                        )}
                        <ThemeToggle />
                        <MobileNav />
                    </div>
                </div>
            </div>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="px-3 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-150"
        >
            {children}
        </Link>
    );
}

function NavDivider() {
    return <span className="w-px h-5 bg-slate-200 mx-1" />;
}
