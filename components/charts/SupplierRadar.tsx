'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Supplier {
  id: string;
  name: string;
  sourceRefs?: string[];
  b2bReadiness?: {
    volumeCapacity?: string;
    leadTimeStock?: string;
    stockAvailable?: boolean;
    sourcingService?: boolean;
    slaGuarantee?: boolean;
  };
  hospitalityReadiness?: {
    tier?: string;
  };
  services?: string[];
  regions?: string[];
}

interface RadarDataPoint {
  axis: string;
  value: number;
  fullMark: number;
}

function parseLeadTime(leadTime?: string): number {
  if (!leadTime) return 30;
  // Faster lead times = higher score (inverse)
  if (leadTime.includes('1-2') || leadTime.includes('1-3')) return 90;
  if (leadTime.includes('2-3') || leadTime.includes('2-4')) return 70;
  if (leadTime.includes('4-') || leadTime.includes('6-')) return 50;
  if (leadTime.includes('8-') || leadTime.includes('12-')) return 30;
  return 50;
}

function hasFireSafetyCapability(supplier: Supplier): boolean {
  const services = supplier.services || [];
  return services.some(s =>
    s.toLowerCase().includes('fire') ||
    s.toLowerCase().includes('rise') ||
    s.toLowerCase().includes('sp') ||
    s.toLowerCase().includes('testing')
  );
}

function transformSupplierToRadar(supplier: Supplier): RadarDataPoint[] {
  return [
    {
      axis: 'Volume',
      value: supplier.b2bReadiness?.volumeCapacity === 'enterprise' ? 100 :
             supplier.b2bReadiness?.volumeCapacity === 'large' ? 80 :
             supplier.b2bReadiness?.volumeCapacity === 'medium' ? 60 : 40,
      fullMark: 100
    },
    {
      axis: 'Lead Time',
      value: parseLeadTime(supplier.b2bReadiness?.leadTimeStock),
      fullMark: 100
    },
    {
      axis: 'Hospitality',
      value: supplier.hospitalityReadiness?.tier === 'Tier 1' ? 100 :
             supplier.hospitalityReadiness?.tier === 'Tier 2' ? 66 : 33,
      fullMark: 100
    },
    {
      axis: 'Nordic Reach',
      value: (supplier.regions?.length || 0) >= 4 ? 100 :
             (supplier.regions?.length || 0) >= 2 ? 70 : 40,
      fullMark: 100
    },
    {
      axis: 'Services',
      value: Math.min((supplier.services?.length || 0) * 10, 100),
      fullMark: 100
    },
    {
      axis: 'Fire Safety',
      value: hasFireSafetyCapability(supplier) ? 100 : 30,
      fullMark: 100
    }
  ];
}

interface SupplierRadarProps {
  supplier: Supplier;
  showLegend?: boolean;
  height?: number;
}

export function SupplierRadar({
  supplier,
  height = 300
}: SupplierRadarProps) {
  const data = transformSupplierToRadar(supplier);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="axis"
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickLine={false}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name={supplier.name}
          dataKey="value"
          stroke="#0d9488"
          fill="#0d9488"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          content={({ payload }) => {
            if (!payload?.[0]) return null;
            const d = payload[0].payload as RadarDataPoint;
            return (
              <div className="bg-white p-2 rounded shadow-lg border border-slate-200 text-sm">
                <p className="font-medium text-slate-900">{d.axis}</p>
                <p className="text-teal-600">{d.value}/100</p>
              </div>
            );
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
