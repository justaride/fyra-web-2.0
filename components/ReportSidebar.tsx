'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
    FileText,
    Building2,
    Users,
    BookOpen,
    Shield,
    Award,
    ClipboardList,
    Compass,
    Briefcase,
    Recycle,
    ChevronLeft,
    ChevronUp
} from 'lucide-react';

interface TocSection {
    id: string;
    number: string;
    title: string;
    icon: React.ReactNode;
}

const sections: TocSection[] = [
    { id: 'executive-summary', number: '1', title: 'Executive Summary', icon: <FileText className="w-4 h-4" /> },
    { id: 'suppliers', number: '2', title: 'Supplier Directory', icon: <Building2 className="w-4 h-4" /> },
    { id: 'experts', number: '3', title: 'Expert Network', icon: <Users className="w-4 h-4" /> },
    { id: 'case-studies', number: '4', title: 'Case Studies', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'regulations', number: '5', title: 'Regulatory Compass', icon: <Shield className="w-4 h-4" /> },
    { id: 'certifications', number: '6', title: 'Certifications', icon: <Award className="w-4 h-4" /> },
    { id: 'specifications', number: '7', title: 'Specifications & BVB', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'scenarios', number: '8', title: 'Project Scenarios', icon: <Compass className="w-4 h-4" /> },
    { id: 'templates', number: '9', title: 'Templates & Tools', icon: <ClipboardList className="w-4 h-4" /> },
    { id: 'public-procurement', number: '10', title: 'Public Procurement', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'about', number: '11', title: 'About Fyra', icon: <Recycle className="w-4 h-4" /> },
    { id: 'sources', number: 'A', title: 'Sources & References', icon: <BookOpen className="w-4 h-4" /> },
];

// Context for sidebar state
const SidebarContext = createContext<{
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}>({
    isCollapsed: false,
    setIsCollapsed: () => {},
});

export function ReportLayoutWrapper({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className="flex print:block">
                <ReportSidebar />
                <div className={cn(
                    "flex-1 transition-all duration-300 print:ml-0",
                    isCollapsed ? "ml-16" : "ml-64"
                )}>
                    {children}
                </div>
            </div>
        </SidebarContext.Provider>
    );
}

export function ReportSidebar() {
    const { isCollapsed, setIsCollapsed } = useContext(SidebarContext);
    const [activeSection, setActiveSection] = useState<string>('executive-summary');
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;
            setShowScrollTop(window.scrollY > 500);

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const progressPercent = ((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100;

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 shadow-sm z-40 transition-all duration-300 print:hidden",
            isCollapsed ? "w-16" : "w-64"
        )}>
            {/* Header */}
            <div className={cn(
                "h-16 flex items-center border-b border-slate-100",
                isCollapsed ? "justify-center px-2" : "justify-between px-4"
            )}>
                {!isCollapsed && (
                    <div className="flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-teal-600" />
                        <span className="font-semibold text-slate-900 text-sm">Contents</span>
                    </div>
                )}
                {isCollapsed && (
                    <Recycle className="w-5 h-5 text-teal-600" />
                )}
            </div>

            {/* Toggle button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-slate-200 rounded-r-lg shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors",
                    isCollapsed ? "-right-6" : "-right-3"
                )}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                <ChevronLeft className={cn(
                    "w-4 h-4 text-slate-500 transition-transform",
                    isCollapsed && "rotate-180"
                )} />
            </button>

            {/* Navigation */}
            <nav className={cn(
                "overflow-y-auto",
                isCollapsed ? "p-2 h-[calc(100vh-8rem)]" : "p-3 h-[calc(100vh-10rem)]"
            )}>
                <ul className="space-y-1">
                    {sections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                            <li key={section.id}>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "w-full flex items-center gap-3 rounded-lg text-left transition-all",
                                        isCollapsed ? "p-2 justify-center" : "px-3 py-2.5",
                                        isActive
                                            ? "bg-teal-50 text-teal-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                    title={section.title}
                                >
                                    <span className={cn(
                                        "flex-shrink-0 flex items-center justify-center rounded text-xs font-bold transition-colors",
                                        isCollapsed ? "w-8 h-8" : "w-7 h-7",
                                        isActive ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500"
                                    )}>
                                        {section.number}
                                    </span>
                                    {!isCollapsed && (
                                        <span className={cn(
                                            "text-sm truncate",
                                            isActive && "font-medium"
                                        )}>{section.title}</span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Progress indicator & scroll to top */}
            <div className={cn(
                "absolute bottom-0 left-0 right-0 border-t border-slate-100 bg-white",
                isCollapsed ? "p-2" : "p-4"
            )}>
                {!isCollapsed && (
                    <>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                            <span>Progress</span>
                            <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-teal-500 transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </>
                )}

                {/* Scroll to top button */}
                <button
                    onClick={scrollToTop}
                    className={cn(
                        "flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-all",
                        !showScrollTop && "opacity-50 pointer-events-none"
                    )}
                    disabled={!showScrollTop}
                >
                    <ChevronUp className="w-4 h-4" />
                    {!isCollapsed && <span>Back to top</span>}
                </button>
            </div>
        </aside>
    );
}
