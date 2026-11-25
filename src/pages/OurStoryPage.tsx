import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PURAFLOW_IMAGES } from '../data/puraflowData';
import { PageRoute } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface OurStoryPageProps {
  onNavigate: (route: PageRoute) => void;
}

const HERITAGE_CHAPTERS = [
  {
    era: '1789',
    title: 'Discovery of the Alpine Spring',
    text: 'Travellers visiting the alpine lakeside town first documented the remarkable clarity and gentle minerality of the natural artesian spring emerging from glacial moraines.',
  },
  {
    era: '1826',
    title: 'First Bottling of PuraFlow',
    text: 'Authorization was granted to bottle the natural mineral water directly at the source, establishing two centuries of unbroken heritage and quality stewardship.',
  },
  {
    era: '1969',
    title: 'Sculptural Glass & Fine Dining',
    text: 'PuraFlow introduced its iconic slender glass silhouette to Michelin dining rooms across Paris, Geneva, and Tokyo, becoming a staple of culinary hospitality.',
  },
  {
    era: '2026',
    title: 'Over 200 Years Young',
    text: 'Celebrating more than two centuries of living young through designer limited editions, championship tennis partnerships, and circular rPET packaging.',
  },
];

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onNavigate }) => {
  const [activeEraIdx, setActiveEraIdx] = useState(3);

  return (
    <div className="bg-white">
      {/* Editorial Header */}
      <section className="bg-[#F4F8FC] border-b border-slate-200/80 py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
              Our Story · Over 200 Years Young
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-[#0B1F3A] leading-tight">
              A timeless alpine icon, always living young.
            </h1>
            <p className="text-base md:text-lg text-[#4A5568] leading-relaxed">
              Born in the heart of the French Alps over two centuries ago, PuraFlow connects natural glacial purity with contemporary gastronomy, sport, and design.
            </p>
          </div>

          <div className="lg:col-span-6 aspect-[16/9] rounded-3xl overflow-hidden shadow-md">
            <ResilientImage
              src={PURAFLOW_IMAGES.tennis}
              alt="PuraFlow summer championship heritage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Interactive Heritage Timeline */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-20">
        <div className="max-w-xl space-y-2 mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007CBB]">
            Brand Heritage
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
            Two Centuries of Alpine Purity
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {HERITAGE_CHAPTERS.map((chap, idx) => (
            <button
              key={chap.era}
              type="button"
              onClick={() => setActiveEraIdx(idx)}
              className={`p-5 text-left rounded-2xl border transition-all cursor-pointer ${
                idx === activeEraIdx
                  ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                  : 'bg-[#F4F8FC] text-[#0B1F3A] border-slate-200 hover:border-[#E41B5B]'
              }`}
            >
              <p className="font-mono text-xl font-semibold text-[#E41B5B]">{chap.era}</p>
              <p className="text-sm font-semibold mt-1">{chap.title}</p>
            </button>
          ))}
        </div>

        <div className="bg-[#F4F8FC] p-8 md:p-10 rounded-3xl border border-slate-200/80 max-w-3xl space-y-3">
          <span className="font-mono text-xs text-[#007CBB]">
            Chapter · {HERITAGE_CHAPTERS[activeEraIdx].era}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#0B1F3A]">
            {HERITAGE_CHAPTERS[activeEraIdx].title}
          </h3>
          <p className="text-base text-[#4A5568] leading-relaxed">
            {HERITAGE_CHAPTERS[activeEraIdx].text}
          </p>
        </div>
      </section>

      {/* Fine Dining & Global Sports Split */}
      <section className="bg-[#0B1F3A] text-white py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <div className="bg-white/6 border border-white/12 rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                Fine Dining & Sommeliers
              </p>
              <h2 className="font-display text-3xl font-semibold">
                At home on the world’s finest tables.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                With neutral pH 7.2 and refined minerality, PuraFlow Prestige Glass is curated by Michelin-starred chefs and sommeliers to accompany tasting menus without altering delicate wine notes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'products', category: 'Prestige Glass' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E41B5B] hover:underline self-start cursor-pointer"
            >
              <span>Explore Prestige Glass</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white/6 border border-white/12 rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
                Grand Slam Sports Heritage
              </p>
              <h2 className="font-display text-3xl font-semibold">
                Hydrating champions on grass and clay.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                From center-court player benches to spectator refill stations, PuraFlow champions healthy hydration and reusable glass systems across premier international tennis and golf tournaments.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'news' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E41B5B] hover:underline self-start cursor-pointer"
            >
              <span>Read Sports Partnerships</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
