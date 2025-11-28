import Link from 'next/link';
import { Recycle, Mail, Linkedin, Instagram, ExternalLink, MapPin, ArrowUpRight } from 'lucide-react';

const navigation = {
    discover: [
        { name: 'Suppliers', href: '/suppliers' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Experts', href: '/experts' },
        { name: 'Scenarios', href: '/scenarios' },
    ],
    resources: [
        { name: 'Regulations', href: '/regulations' },
        { name: 'Certifications', href: '/certifications' },
        { name: 'Specifications', href: '/specifications' },
        { name: 'Templates', href: '/templates' },
    ],
    company: [
        { name: 'About Fyra', href: '/about' },
        { name: 'Contact', href: '/about#contact' },
    ],
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                    F
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-400 rounded-full flex items-center justify-center ring-2 ring-slate-900">
                                    <Recycle className="w-2.5 h-2.5 text-white" />
                                </div>
                            </div>
                            <div>
                                <span className="text-lg font-bold">Fyra Circular Platform</span>
                                <p className="text-xs text-slate-400">Nordic Circular Construction</p>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                            The B2B knowledge hub for circular construction in Nordic hospitality.
                            Find verified suppliers, proven case studies, and regulatory guidance.
                        </p>
                        <div className="flex items-center gap-3 text-sm text-slate-400 mb-4">
                            <MapPin className="w-4 h-4 text-teal-500" />
                            <span>Helsinki, Finland</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <a
                                href="mailto:info@fyra.fi"
                                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/company/fyra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com/fyrastudio"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-teal-600 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Discover Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Discover
                        </h3>
                        <ul className="space-y-3">
                            {navigation.discover.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Resources
                        </h3>
                        <ul className="space-y-3">
                            {navigation.resources.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {navigation.company.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <a
                                    href="https://fyra.fi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-teal-400 transition-colors"
                                >
                                    Fyra Studio
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500">
                            © {currentYear} Fyra. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                NCH Research Platform
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">Built for Nordic Circular Hotspot</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
