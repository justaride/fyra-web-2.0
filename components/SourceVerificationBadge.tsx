'use client';

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface SourceVerificationBadgeProps {
  lastVerified: string;
  urlValid?: boolean;
  compact?: boolean;
}

export default function SourceVerificationBadge({
  lastVerified,
  urlValid = true,
  compact = false
}: SourceVerificationBadgeProps) {
  // Calculate days since verification
  const verifiedDate = new Date(lastVerified);
  const now = new Date();
  const daysSince = Math.floor((now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24));

  // Status: green (<30 days), yellow (30-90 days), red (>90 days or invalid)
  const status = !urlValid ? 'invalid' : daysSince < 30 ? 'fresh' : daysSince < 90 ? 'recent' : 'stale';

  const statusConfig = {
    fresh: {
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      label: 'Verified'
    },
    recent: {
      icon: Clock,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      label: 'Verified'
    },
    stale: {
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      label: 'Needs review'
    },
    invalid: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      label: 'Link issue'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // Format date for display
  const formattedDate = verifiedDate.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short'
  });

  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${config.bgColor} ${config.color}`}
        title={`Last verified: ${formattedDate}`}
      >
        <Icon className="w-3 h-3" />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${config.bgColor} ${config.color} ${config.borderColor}`}
      title={`Last verified: ${lastVerified}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{config.label}</span>
      <span className="text-slate-500 font-normal">{formattedDate}</span>
    </span>
  );
}
