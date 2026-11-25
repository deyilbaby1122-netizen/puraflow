import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RoutePath } from '../types';

interface EngineeringPageProps {
  onNavigate: (route: RoutePath) => void;
}

const LAYERS = [
  {
    id: 'outer-shell',
    index: '01',
    name: 'Outer Ti-6Al-4V Shell',
    thickness: '0.45 mm',
    metricLabel: 'Tensile Strength',
    metricValue: '950 MPa',
    summary:
      'Hydroformed from aerospace Grade-5 titanium billet, offering nearly twice the structural dent resistance of 18/8 stainless steel at 38% lower dry weight.',
  },
  {
    id: 'vacuum-cavity',
    index: '02',
    name: 'Deep Molecular Vacuum',
    thickness: '2.10 mm gap',
    metricLabel: 'Chamber Pressure',
    metricValue: '10⁻⁵ Pa',
    summary:
      'Sealed at 820°C in a vacuum furnace to eliminate gas molecules between walls, arresting conductive and convective heat transfer.',
  },
  {
    id: 'copper-shield',
    index: '03',
    name: 'Pure Copper Infrared Shield',
    thickness: '0.06 mm foil',
    metricLabel: 'Radiant Reflection',
    metricValue: '98.4%',
    summary:
      'A 99.9% oxygen-free copper sleeve wraps the inner core, reflecting thermal radiation outward in summer and inward during alpine winters.',
  },
  {
    id: 'electropolish',
    index: '04',
    name: 'Electropolished Mirror Chamber',
    thickness: '0.08 Ra finish',
    metricLabel: 'Ion Migration',
    metricValue: '0.00 mg/L',
    summary:
      'Electrochemical passivation smooths microscopic pores so dissolved minerals, tea tannins, and citrus acids never adhere or impart metallic flavor.',
  },
  {
    id: 'acoustic-cap',
    index: '05',
    name: 'Quarter-Turn Compression Closure',
    thickness: '0.02 mm tolerance',
    metricLabel: 'Seal Rating',
    metricValue: 'IPX8 · 4 bar',
    summary:
      'Single-point CNC-turned threads engage a medical fluoropolymer ring silently, eliminating thread squeak and plastic water contact.',
  },
] as const;

export const EngineeringPage: React.FC<EngineeringPageProps> = ({ onNavigate }) => {
  const [activeLayerId, setActiveLayerId] = useState<(typeof LAYERS)[number]['id']>('outer-shell');

  // Hydration Calculator State
  const [weightKg, setWeightKg] = useState(72);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'athletic'>('moderate');
  const [climate, setClimate] = useState<'temperate' | 'warm' | 'alpine'>('temperate');

  const activeLayer = LAYERS.find((l) => l.id === activeLayerId) || LAYERS[0];

  const hydrationPlan = useMemo(() => {
    const baseMl = weightKg * 33;
    const activityBonus = activityLevel === 'sedentary' ? 0 : activityLevel === 'moderate' ? 450 : 900;
    const climateBonus = climate === 'temperate' ? 0 : climate === 'warm' ? 400 : 550;
    const dailyMl = Math.round((baseMl + activityBonus + climateBonus) / 50) * 50;

    const recommendedMl = dailyMl >= 2800 ? 1000 : dailyMl >= 2100 ? 750 : 500;
    const recommendedSlug =
      recommendedMl === 1000
        ? 'monolith-titanium-01'
        : recommendedMl === 750
        ? 'nocturne-obsidian-vessel'
        : 'atelier-fluted-ceramic';
    const refills = (dailyMl / recommendedMl).toFixed(1);

    return { dailyMl, recommendedMl, recommendedSlug, refills };
  }, [weightKg, activityLevel, climate]);

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16 space-y-20">
      {/* Header */}
      <div className="space-y-3 max-w-3xl pb-8 border-b border-[#121417]/10">
        <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
          Zurich Metallurgy & Physics
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#121417]">
          Five-Layer Thermal Architecture
        </h1>
        <p className="text-sm md:text-base text-[#5A5E63] leading-relaxed">
          Inspect each structural layer of a Pure Flow vessel and calculate your daily mineral hydration cadence.
        </p>
      </div>

      {/* Interactive 5-Layer Cross-Section Explorer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Interactive Architectural Cutaway Diagram */}
        <div className="lg:col-span-6 bg-[#ECEAE3] border border-[#121417]/8 rounded-sm p-6 md:p-10">
          <p className="text-xs font-mono text-[#5A5E63] mb-4">
            Select a vessel layer to inspect engineering tolerances
          </p>
          <div className="bg-[#F6F5F1] border border-[#121417]/8 rounded-sm p-6 flex items-center justify-center">
            <svg
              viewBox="0 0 320 340"
              className="w-full max-w-xs h-auto"
              role="img"
              aria-label="Interactive five-layer cutaway of Pure Flow titanium bottle"
            >
              {/* Layer 05: Cap */}
              <g
                onClick={() => setActiveLayerId('acoustic-cap')}
                className="cursor-pointer transition-opacity hover:opacity-85"
              >
                <rect
                  x="116"
                  y="24"
                  width="88"
                  height="42"
                  rx="4"
                  fill={activeLayerId === 'acoustic-cap' ? '#14232B' : '#8A6D4B'}
                />
                <text x="220" y="48" fontSize="11" fontFamily="JetBrains Mono" fill="#121417">
                  05. Closure
                </text>
                <line x1="204" y1="45" x2="216" y2="45" stroke="#121417" strokeWidth="1" />
              </g>

              {/* Layer 01: Outer Ti Shell */}
              <g
                onClick={() => setActiveLayerId('outer-shell')}
                className="cursor-pointer"
              >
                <rect
                  x="86"
                  y="74"
                  width="148"
                  height="242"
                  rx="14"
                  fill={activeLayerId === 'outer-shell' ? '#14232B' : '#A9ABA8'}
                />
              </g>

              {/* Layer 02: Deep Vacuum */}
              <g
                onClick={() => setActiveLayerId('vacuum-cavity')}
                className="cursor-pointer"
              >
                <rect
                  x="96"
                  y="84"
                  width="128"
                  height="222"
                  rx="10"
                  fill={activeLayerId === 'vacuum-cavity' ? '#3B4D59' : '#232629'}
                />
              </g>

              {/* Layer 03: Copper Shield */}
              <g
                onClick={() => setActiveLayerId('copper-shield')}
                className="cursor-pointer"
              >
                <rect
                  x="105"
                  y="93"
                  width="110"
                  height="204"
                  rx="8"
                  fill={activeLayerId === 'copper-shield' ? '#C78A52' : '#9B7653'}
                />
              </g>

              {/* Layer 04: Electropolished Chamber */}
              <g
                onClick={() => setActiveLayerId('electropolish')}
                className="cursor-pointer"
              >
                <rect
                  x="113"
                  y="101"
                  width="94"
                  height="188"
                  rx="6"
                  fill={activeLayerId === 'electropolish' ? '#DCE7EC' : '#F6F5F1'}
                />
                <text
                  x="160"
                  y="196"
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="JetBrains Mono"
                  fill="#14232B"
                >
                  H₂O Chamber
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Layer Specification List & Readout */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            {LAYERS.map((layer) => {
              const active = layer.id === activeLayerId;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`w-full text-left p-4 border rounded-sm transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#14232B] text-[#F6F5F1] border-[#14232B]'
                      : 'bg-white text-[#121417] border-[#121417]/10 hover:border-[#121417]/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-serif text-lg font-medium">
                      {layer.index}. {layer.name}
                    </span>
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        active ? 'text-[#D8D2C5]' : 'text-[#6B7075]'
                      }`}
                    >
                      {layer.thickness}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Layer Detailed Readout */}
          <div className="bg-white border border-[#121417]/10 p-6 rounded-sm space-y-4">
            <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[#121417]/8">
              <h2 className="font-serif text-2xl font-medium text-[#121417]">
                {activeLayer.name}
              </h2>
              <span className="font-mono text-sm text-[#14232B] tabular-nums">
                {activeLayer.metricLabel}: {activeLayer.metricValue}
              </span>
            </div>
            <p className="text-sm text-[#4A4E52] leading-relaxed">{activeLayer.summary}</p>
          </div>
        </div>
      </section>

      {/* Interactive Hydration & Mineralization Calculator */}
      <section className="bg-[#ECEAE3] border border-[#121417]/8 rounded-sm p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
                Hydration Calibration
              </p>
              <h2 className="font-serif text-3xl font-medium text-[#121417]">
                Daily Volume & Vessel Sizing
              </h2>
              <p className="text-sm text-[#5A5E63]">
                Adjust body mass, daily movement, and ambient climate to calculate your optimal refill rhythm.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <label htmlFor="weight-range" className="font-medium text-[#121417]">
                    Body Mass
                  </label>
                  <span className="font-mono text-[#121417] tabular-nums">{weightKg} kg</span>
                </div>
                <input
                  id="weight-range"
                  type="range"
                  min={45}
                  max={120}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#14232B] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="block text-xs font-medium text-[#121417]">Daily Movement</span>
                  <div className="flex gap-1 p-1 bg-white rounded-sm border border-[#121417]/10">
                    {(['sedentary', 'moderate', 'athletic'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setActivityLevel(lvl)}
                        className={`flex-1 py-2 text-xs capitalize rounded-sm transition-colors cursor-pointer ${
                          activityLevel === lvl
                            ? 'bg-[#14232B] text-white'
                            : 'text-[#5A5E63] hover:text-[#121417]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-medium text-[#121417]">Ambient Climate</span>
                  <div className="flex gap-1 p-1 bg-white rounded-sm border border-[#121417]/10">
                    {(['temperate', 'warm', 'alpine'] as const).map((clm) => (
                      <button
                        key={clm}
                        type="button"
                        onClick={() => setClimate(clm)}
                        className={`flex-1 py-2 text-xs capitalize rounded-sm transition-colors cursor-pointer ${
                          climate === clm
                            ? 'bg-[#14232B] text-white'
                            : 'text-[#5A5E63] hover:text-[#121417]'
                        }`}
                      >
                        {clm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#121417]/10 p-6 md:p-8 rounded-sm space-y-6">
            <div className="space-y-1 pb-4 border-b border-[#121417]/10">
              <span className="text-xs text-[#6B7075]">Daily Still Water Target</span>
              <p className="font-mono text-4xl font-medium text-[#121417] tabular-nums">
                {hydrationPlan.dailyMl} ml
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-[#6B7075]">Recommended Vessel</p>
                <p className="font-mono text-lg font-medium text-[#121417] tabular-nums mt-0.5">
                  {hydrationPlan.recommendedMl} ml
                </p>
              </div>
              <div>
                <p className="text-xs text-[#6B7075]">Daily Refills</p>
                <p className="font-mono text-lg font-medium text-[#121417] tabular-nums mt-0.5">
                  {hydrationPlan.refills} fills
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate({ page: 'product', slug: hydrationPlan.recommendedSlug })}
              className="w-full py-3 text-xs font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Inspect Recommended {hydrationPlan.recommendedMl} ml Vessel</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
