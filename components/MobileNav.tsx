'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: '/suppliers', label: 'Suppliers' },
    { href: '/experts', label: 'Experts' },
    { href: '/scenarios', label: 'Scenarios' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/regulations', label: 'Regulations' },
    { href: '/certifications', label: 'Certifications' },
    { href: '/about', label: 'About' },
];

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-slate-600" />
                ) : (
                    <Menu className="w-6 h-6 text-slate-600" />
                )}
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
                        <nav className="container mx-auto px-4 py-4">
                            <div className="grid grid-cols-2 gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
}
