'use client';

import { Printer, FileText } from 'lucide-react';

export function PrintControls() {
    return (
        <div className="print:hidden bg-slate-900 text-white py-4 px-6 sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-teal-400" />
                    <span className="font-semibold">Fyra Circular Platform Report</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400">Use Ctrl/Cmd + P to print</span>
                    <button
                        onClick={() => window.print()}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                        <Printer className="w-4 h-4" />
                        Print / Save PDF
                    </button>
                </div>
            </div>
        </div>
    );
}
