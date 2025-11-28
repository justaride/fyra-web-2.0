'use client';

import { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

interface FireSafetyTier {
  tier: number;
  name: string;
  costRange: string;
  timeline: string;
  riskLevel: string;
}

interface ScatterDataPoint {
  name: string;
  tier: number;
  timeline: number;
  cost: number;
  costRange: string;
  timelineText: string;
  riskLevel: string;
}

const TIER_COLORS: Record<number, string> = {
  1: '#10b981', // emerald
  2: '#f59e0b', // amber
  3: '#ef4444'  // red
};

const TIER_LABELS: Record<number, string> = {
  1: 'Low Risk',
  2: 'Medium Risk',
  3: 'High Risk'
};

function parseTimeline(timeline: string): number {
  // Extract first number from strings like "1-2 weeks", "8-12 weeks", "6-8 weeks"
  const match = timeline.match(/(\d+)/);
  if (match) {
    const firstNum = parseInt(match[1]);
    // Return midpoint for ranges
    const rangeMatch = timeline.match(/(\d+)-(\d+)/);
    if (rangeMatch) {
      return (parseInt(rangeMatch[1]) + parseInt(rangeMatch[2])) / 2;
    }
    return firstNum;
  }
  return 4; // fallback
}

function parseCost(costRange: string): number {
  // Extract numbers from strings like "0-5,000 SEK", "18,000-30,000 SEK"
  const numbers = costRange.replace(/,/g, '').match(/(\d+)/g);
  if (numbers && numbers.length >= 2) {
    // Return midpoint
    return (parseInt(numbers[0]) + parseInt(numbers[1])) / 2;
  }
  if (numbers && numbers.length === 1) {
    return parseInt(numbers[0]);
  }
  return 10000; // fallback
}

interface CostTimelineScatterProps {
  tiers: FireSafetyTier[];
  height?: number;
}

export function CostTimelineScatter({
  tiers,
  height = 300
}: CostTimelineScatterProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data: ScatterDataPoint[] = tiers.map(tier => ({
    name: tier.name,
    tier: tier.tier,
    timeline: parseTimeline(tier.timeline),
    cost: parseCost(tier.costRange),
    costRange: tier.costRange,
    timelineText: tier.timeline,
    riskLevel: tier.riskLevel
  }));

  if (!mounted) {
    return (
      <div style={{ width: '100%', height }} className="flex items-center justify-center bg-slate-50 rounded-lg">
        <div className="text-slate-400 text-sm">Loading chart...</div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="timeline"
          type="number"
          name="Timeline"
          unit=" wks"
          domain={[0, 'dataMax + 2']}
          tick={{ fontSize: 11, fill: '#64748b' }}
          label={{
            value: 'Timeline (weeks)',
            position: 'bottom',
            offset: 0,
            style: { fontSize: 12, fill: '#64748b' }
          }}
        />
        <YAxis
          dataKey="cost"
          type="number"
          name="Cost"
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickFormatter={(v) => `${Math.round(v/1000)}k`}
          label={{
            value: 'Cost (SEK)',
            angle: -90,
            position: 'insideLeft',
            style: { fontSize: 12, fill: '#64748b' }
          }}
        />
        <Tooltip
          content={({ payload }) => {
            if (!payload?.[0]) return null;
            const d = payload[0].payload as ScatterDataPoint;
            return (
              <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                <p className="font-bold text-slate-900">{d.name}</p>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="font-medium">Timeline:</span> {d.timelineText}
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">Cost:</span> {d.costRange}
                </p>
                <p className="text-sm mt-1">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: TIER_COLORS[d.tier] }}
                  >
                    {TIER_LABELS[d.tier]}
                  </span>
                </p>
              </div>
            );
          }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          content={() => (
            <div className="flex justify-center gap-4 text-xs">
              {Object.entries(TIER_LABELS).map(([tier, label]) => (
                <div key={tier} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: TIER_COLORS[parseInt(tier)] }}
                  />
                  <span className="text-slate-600">{label}</span>
                </div>
              ))}
            </div>
          )}
        />
        <Scatter data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={TIER_COLORS[entry.tier]}
              r={entry.tier === 3 ? 12 : entry.tier === 2 ? 10 : 8}
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
