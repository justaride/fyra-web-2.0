'use client';

import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface EnforcementItem {
  category: string;
  regulation: string;
  enforcementLevel: 'high' | 'medium' | 'low' | 'future';
  enforcementDescription: string;
  fyraRecommendation?: string;
}

const LEVEL_CONFIG = {
  high: {
    color: '#ef4444',
    bgColor: '#fef2f2',
    label: 'HIGH',
    icon: AlertTriangle,
    textColor: '#dc2626'
  },
  medium: {
    color: '#f59e0b',
    bgColor: '#fffbeb',
    label: 'MEDIUM',
    icon: Shield,
    textColor: '#d97706'
  },
  low: {
    color: '#10b981',
    bgColor: '#ecfdf5',
    label: 'LOW',
    icon: CheckCircle,
    textColor: '#059669'
  },
  future: {
    color: '#6b7280',
    bgColor: '#f9fafb',
    label: 'FUTURE',
    icon: Clock,
    textColor: '#4b5563'
  }
};

interface EnforcementHeatmapProps {
  data: EnforcementItem[];
  showDescriptions?: boolean;
}

export function EnforcementHeatmap({
  data,
  showDescriptions = true
}: EnforcementHeatmapProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left p-3 font-semibold text-slate-700">Category</th>
            <th className="text-left p-3 font-semibold text-slate-700">Regulation</th>
            <th className="text-center p-3 font-semibold text-slate-700 w-32">Enforcement</th>
            {showDescriptions && (
              <th className="text-left p-3 font-semibold text-slate-700">Practical Notes</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            const config = LEVEL_CONFIG[item.enforcementLevel];
            const Icon = config.icon;

            return (
              <tr
                key={i}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="p-3">
                  <span className="font-medium text-slate-900">{item.category}</span>
                </td>
                <td className="p-3">
                  <span className="text-slate-600 text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.regulation}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: config.bgColor,
                      color: config.textColor
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {config.label}
                  </span>
                </td>
                {showDescriptions && (
                  <td className="p-3">
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {item.enforcementDescription}
                    </p>
                    {item.fyraRecommendation && (
                      <p className="text-teal-700 text-xs mt-1 font-medium">
                        → {item.fyraRecommendation}
                      </p>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
        {Object.entries(LEVEL_CONFIG).map(([level, config]) => {
          const Icon = config.icon;
          return (
            <div key={level} className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: config.bgColor, color: config.textColor }}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </span>
              <span className="text-slate-500">
                {level === 'high' && '= Strictly enforced'}
                {level === 'medium' && '= Context-dependent'}
                {level === 'low' && '= Rarely checked'}
                {level === 'future' && '= Coming regulation'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
