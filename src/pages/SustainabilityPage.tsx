import React, { useState } from 'react';
import { Check, Leaf, Recycle, TrainFront } from 'lucide-react';
import { motion } from 'motion/react';
import { PURAFLOW_IMAGES, SUSTAINABILITY_PILLARS } from '../data/puraflowData';
import { ResilientImage } from '../components/ResilientImage';

const MILESTONES = [
  {
    year: '2020',
    title: 'B Corp Certification Achieved',
    detail:
      'PuraFlow earned B Corp verification across European operations, meeting stringent standards for environmental stewardship and transparency.',
  },
  {
    year: '2023',
    title: '100% Renewable Bottling Electricity',
    detail:
      'Our alpine bottling facility transitioned entirely to renewable hydroelectric and biogas energy alongside private freight rail dispatch.',
  },
  {
    year: '2026',
    title: 'Circular rPET & Refill Expansion',
    detail:
      'Core Everyday formats reach 100% recycled rPET (excluding cap and label) while tournament refill stations replace single-use plastic.',
  },
  {
    year: '2030',
    title: 'Full Loop Watershed & Circularity',
    detail:
      'Scaling deposit-return advocacy, wetland biodiversity corridors, and zero-virgin-plastic bottle-to-bottle recovery across every market.',
  },
];

export const SustainabilityPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const activeMilestone = MILESTONES.find((m) => m.year === selectedYear) || MILESTONES[2];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-[#0B1F3A] text-white py-20 md:py-28 overflow-hidden">
        <ResilientImage
          src={PURAFLOW_IMAGES.heroAlps}
          alt="Protected alpine wetlands and forest watershed"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
              Our Sustainability Actions · B Corp Certified
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight">
              Acting for a circular future rooted in alpine stewardship.
            </h1>
            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
              We protect our source watershed, power our bottling site with 100% renewable electricity, and design every PuraFlow bottle to stay inside the circular economy.
            </p>
          </div>
        </div>
      </section>

      {/* Three Core Pillars */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-20 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SUSTAINABILITY_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-8 rounded-3xl bg-[#F4F8FC] border border-slate-200/80 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-semibold text-[#E41B5B] tabular-nums">
                    {pillar.metric}
                  </span>
                  {i === 0 && <Leaf className="w-6 h-6 text-[#007CBB]" aria-hidden="true" />}
                  {i === 1 && <TrainFront className="w-6 h-6 text-[#007CBB]" aria-hidden="true" />}
                  {i === 2 && <Recycle className="w-6 h-6 text-[#007CBB]" aria-hidden="true" />}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {pillar.metricLabel}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-[#0B1F3A] mt-1">
                    {pillar.title}
                  </h2>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed">{pillar.summary}</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-slate-200 text-xs text-[#334155]">
                {pillar.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#E41B5B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Roadmap Timeline */}
      <section className="bg-[#F4F8FC] border-y border-slate-200/80 py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="max-w-xl space-y-2 mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007CBB]">
              Environmental Roadmap
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
              Measurable Milestones
            </h2>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {MILESTONES.map((m) => (
              <button
                key={m.year}
                type="button"
                onClick={() => setSelectedYear(m.year)}
                className={`px-6 py-3 font-mono text-sm font-semibold rounded-full border transition-colors cursor-pointer ${
                  selectedYear === m.year
                    ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                    : 'bg-white text-[#0B1F3A] border-slate-200 hover:border-[#E41B5B]'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 space-y-3 max-w-3xl">
            <p className="font-mono text-sm font-semibold text-[#E41B5B]">
              Milestone · {activeMilestone.year}
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#0B1F3A]">
              {activeMilestone.title}
            </h3>
            <p className="text-base text-[#4A5568] leading-relaxed">{activeMilestone.detail}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
