'use client';

import { useState } from 'react';
import { Printer, Check, FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrintButtonProps {
    variant?: 'floating' | 'inline' | 'header';
    label?: string;
    className?: string;
}

export function PrintButton({
    variant = 'floating',
    label = 'Print',
    className
}: PrintButtonProps) {
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 100);
    };

    if (variant === 'floating') {
        return (
            <div className={cn(
                "fixed bottom-6 right-6 z-50 print:hidden",
                className
            )}>
                <button
                    onClick={handlePrint}
                    disabled={isPrinting}
                    className={cn(
                        "group flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-200",
                        "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-xl hover:scale-105",
                        "border border-slate-700",
                        isPrinting && "opacity-75 cursor-wait"
                    )}
                    title="Skriv ut eller lagre som PDF"
                >
                    {isPrinting ? (
                        <Check className="w-5 h-5 text-teal-400" />
                    ) : (
                        <Printer className="w-5 h-5 text-teal-400" />
                    )}
                    <span className="text-sm font-medium">{isPrinting ? 'Forbereder...' : label}</span>
                </button>
            </div>
        );
    }

    if (variant === 'header') {
        return (
            <button
                onClick={handlePrint}
                disabled={isPrinting}
                className={cn(
                    "print:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
                    "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                    isPrinting && "opacity-75 cursor-wait",
                    className
                )}
                title="Skriv ut eller lagre som PDF"
            >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">{isPrinting ? 'Forbereder...' : label}</span>
            </button>
        );
    }

    // inline variant
    return (
        <button
            onClick={handlePrint}
            disabled={isPrinting}
            className={cn(
                "print:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200",
                isPrinting && "opacity-75 cursor-wait",
                className
            )}
            title="Skriv ut eller lagre som PDF"
        >
            {isPrinting ? (
                <Check className="w-4 h-4 text-teal-600" />
            ) : (
                <Printer className="w-4 h-4" />
            )}
            <span>{isPrinting ? 'Forbereder...' : label}</span>
        </button>
    );
}

interface PrintInfoBannerProps {
    itemCount: number;
    itemType: string;
    isFiltered?: boolean;
    className?: string;
}

export function PrintInfoBanner({
    itemCount,
    itemType,
    isFiltered = false,
    className
}: PrintInfoBannerProps) {
    return (
        <div className={cn(
            "print:hidden flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm",
            className
        )}>
            <div className="flex items-center gap-2 text-slate-600">
                <FileDown className="w-4 h-4 text-slate-400" />
                <span>
                    {isFiltered ? (
                        <>Viser <strong>{itemCount}</strong> {itemType} (filtrert). Print inkluderer kun disse.</>
                    ) : (
                        <>Viser alle <strong>{itemCount}</strong> {itemType}.</>
                    )}
                </span>
            </div>
            <PrintButton variant="inline" label="Skriv ut liste" />
        </div>
    );
}
