'use client';

import { ExternalLink, FileText, Download } from 'lucide-react';

interface OfficialSourceLinkProps {
  url: string;
  label: string;
  type?: 'primary' | 'secondary' | 'pdf';
  size?: 'sm' | 'md';
}

export default function OfficialSourceLink({
  url,
  label,
  type = 'primary',
  size = 'md'
}: OfficialSourceLinkProps) {
  const isPdf = type === 'pdf' || url.toLowerCase().endsWith('.pdf');

  const baseClasses = "inline-flex items-center gap-2 font-medium transition-colors";

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5 rounded',
    md: 'text-sm px-3 py-2 rounded-lg'
  };

  const typeClasses = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200',
    pdf: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
  };

  const Icon = isPdf ? Download : (type === 'secondary' ? FileText : ExternalLink);
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${sizeClasses[size]} ${typeClasses[isPdf ? 'pdf' : type]}`}
    >
      <Icon className={iconSize} />
      <span>{label}</span>
    </a>
  );
}
