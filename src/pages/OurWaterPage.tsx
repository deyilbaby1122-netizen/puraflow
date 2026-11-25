import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Droplets } from 'lucide-react';
import { motion } from 'motion/react';
import { JOURNEY_STAGES, MINERAL_COMPOSITION, PURAFLOW_IMAGES } from '../data/puraflowData';
import { PageRoute } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface OurWaterPageProps {
  onNavigate: (route: PageRoute) => void;
}

const AQUIFER_LAYERS = [
  {
    id: 'impluvium',
    name: 'Alpine Recharge Plateau (2,200 m)',
    depth: '0 – 15 m',
    detail:
      'Pure rain and snow melt across a protected 35 km² alpine reserve free from industrial runoff.',
  },
  {
    id: 'clay',
    name: 'Protective Glacial Clay Cap',
    depth: '15 – 85 m',
    detail:
      'An ancient, impermeable layer of compacted moraine clay shields the aquifer from all surface contaminants.',
  },
  {
    id: 'sand',
    name: 'Mineral-Rich Glacial Sands',
    depth: '85 – 240 m',
    detail:
      'Over 15 years of slow percolation, water dissolves balanced calcium, magnesium, silica, and bicarbonates.',
  },
  {
    id: 'spring',
    name: 'Natural Artesian Emergence',
    depth: 'Source Valve',
    detail:
      'Water rises under natural pressure at a constant 11.6°C and pH 7.2, piped directly to sterile bottling lines.',
  },
];

export const OurWaterPage: React.FC<OurWaterPageProps> = ({ onNavigate }) => {
  const [selectedLayerId, setSelectedLayerId] = useState(AQUIFER_LAYERS[2].id);
  const activeLayer = AQUIFER_LAYERS.find((l) => l.id === selectedLayerId) || AQUIFER_LAYERS[0];

  return (
    <div className="bg-white">
      {/* Page Hero */}
      <section className="relative bg-[#0B1F3A] text-white py-20 md:py-28 overflow-hidden">
        <ResilientImage
          src={PURAFLOW_IMAGES.heroAlps}
          alt="French Alps recharge zone"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
              Our Water & Purity
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
              Fifteen years in the making. Nothing added, nothing removed.
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              Every bottle of PuraFlow carries the identical mineral equilibrium shaped by its 15-year voyage through the French Alps.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Journey Grid */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNEY_STAGES.map((stage, i) => (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-[#F4F8FC] border border-slate-200/80 space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-[#E41B5B]">{stage.step}</span>
                <span className="font-mono text-[#007CBB] tabular-nums">{stage.metric}</span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-[#0B1F3A]">
                {stage.title}
              </h2>
              <p className="text-xs font-medium text-slate-500">{stage.subtitle}</p>
              <p className="text-sm text-[#4A5568] leading-relaxed">{stage.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Geological Aquifer Explorer */}
      <section className="bg-[#F4F8FC] border-y border-slate-200/80 py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007CBB]">
              Hydrogeology
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
              Inside the Alpine Glacial Filter
            </h2>
            <div className="space-y-2.5 pt-2">
              {AQUIFER_LAYERS.map((layer) => {
                const active = layer.id === selectedLayerId;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                        : 'bg-white text-[#0B1F3A] border-slate-200 hover:border-[#007CBB]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-semibold text-sm">{layer.name}</span>
                      <span className="font-mono text-xs opacity-75 tabular-nums">{layer.depth}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-3 text-[#E41B5B]">
              <Droplets className="w-6 h-6" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-wider">{activeLayer.depth}</span>
            </div>
            <h3 className="font-display text-3xl font-semibold text-[#0B1F3A]">
              {activeLayer.name}
            </h3>
            <p className="text-base text-[#4A5568] leading-relaxed">{activeLayer.detail}</p>
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-500">Natural Temperature</p>
                <p className="font-mono text-lg font-semibold text-[#0B1F3A] tabular-nums">11.6°C</p>
              </div>
              <div>
                <p className="text-slate-500">Neutral pH</p>
                <p className="font-mono text-lg font-semibold text-[#0B1F3A] tabular-nums">7.2</p>
              </div>
              <div>
                <p className="text-slate-500">Dry Residue (180°C)</p>
                <p className="font-mono text-lg font-semibold text-[#0B1F3A] tabular-nums">345 mg/L</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Mineral Composition Table */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
              Laboratory Verified
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
              Typical Mineral Composition (mg/L)
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>300+ Microbiological & Chemical Checks Daily</span>
          </div>
        </div>

        <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F8FC] border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                <th className="py-4 px-6">Mineral</th>
                <th className="py-4 px-6">Symbol</th>
                <th className="py-4 px-6 text-right">Concentration</th>
                <th className="py-4 px-6">Role in Natural Hydration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {MINERAL_COMPOSITION.map((m) => (
                <tr key={m.name} className="hover:bg-[#F4F8FC]/60 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#0B1F3A]">{m.name}</td>
                  <td className="py-4 px-6 font-mono text-xs text-[#007CBB]">{m.symbol}</td>
                  <td className="py-4 px-6 font-mono font-semibold text-right text-[#0B1F3A] tabular-nums">
                    {m.mgPerLitre} mg/L
                  </td>
                  <td className="py-4 px-6 text-[#4A5568]">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'products' })}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#E41B5B] hover:bg-[#C8144D] text-white rounded-full transition-colors cursor-pointer"
          >
            <span>Explore PuraFlow Bottles</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
