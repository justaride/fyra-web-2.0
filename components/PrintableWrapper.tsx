import { ReactNode } from 'react';
import { Recycle } from 'lucide-react';

interface PrintableWrapperProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
    showDate?: boolean;
}

export function PrintableWrapper({
    children,
    title,
    subtitle,
    showDate = true
}: PrintableWrapperProps) {
    const currentDate = new Date().toLocaleDateString('nb-NO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            {/* Print Header - Only visible when printing */}
            <div className="hidden print:block print:mb-8">
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                            <Recycle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-lg font-bold text-slate-900">Fyra Circular Platform</div>
                            <div className="text-xs text-slate-500">Nordic Circular Construction</div>
                        </div>
                    </div>
                    {showDate && (
                        <div className="text-right text-sm text-slate-500">
                            <div>Utskrift: {currentDate}</div>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                    {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
                </div>
            </div>

            {/* Main Content */}
            {children}

            {/* Print Footer - Only visible when printing */}
            <div className="hidden print:block print:mt-8 print:pt-4 print:border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <div>
                        <span className="font-medium">Fyra Circular Platform</span>
                        <span className="mx-2">"</span>
                        <span>fyra-web-2.0</span>
                    </div>
                    <div>
                        <span>Data verifisert november 2025</span>
                    </div>
                </div>
            </div>
        </>
    );
}

interface PrintSectionProps {
    children: ReactNode;
    title?: string;
    breakBefore?: boolean;
    breakAfter?: boolean;
}

export function PrintSection({
    children,
    title,
    breakBefore = false,
    breakAfter = false
}: PrintSectionProps) {
    return (
        <div className={`
            ${breakBefore ? 'print:break-before-page' : ''}
            ${breakAfter ? 'print:break-after-page' : ''}
            print:break-inside-avoid-page
        `}>
            {title && (
                <h2 className="hidden print:block text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
}
