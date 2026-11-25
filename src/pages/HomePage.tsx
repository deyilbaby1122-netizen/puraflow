import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronDown, Droplets, Leaf, Recycle, Sparkles } from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import {
  JOURNEY_STAGES,
  MINERAL_COMPOSITION,
  NEWS_ARTICLES,
  PURAFLOW_IMAGES,
  PURAFLOW_PRODUCTS,
  SUSTAINABILITY_PILLARS,
} from '../data/puraflowData';
import { PageRoute } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenInquiry }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  const [activeStageIdx, setActiveStageIdx] = useState(1);
  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [activeMineralIdx, setActiveMineralIdx] = useState(0);

  const activeProduct = PURAFLOW_PRODUCTS[activeProductIdx];
  const activeMineral = MINERAL_COMPOSITION[activeMineralIdx];

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SECTION — Full-bleed French Alps with Parallax & Floating Bottle */}
      <section
        ref={heroRef}
        className="relative min-h-[86vh] md:min-h-[90vh] flex items-center bg-[#0B1F3A] text-white overflow-hidden"
      >
        <motion.div
          style={{ y: heroParallaxY, opacity: heroOpacity }}
          className="absolute inset-0 will-change-transform"
        >
          <ResilientImage
            src={PURAFLOW_IMAGES.heroAlps}
            alt="Snow-capped French Alps reflecting in a crystal glacier lake"
            fallbackTitle="PuraFlow French Alps Source"
            className="w-full h-[115%] object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/85 via-[#0B1F3A]/45 to-[#0B1F3A]/30"
            aria-hidden="true"
          />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <p className="text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-[#93C5FD]">
                French Alps Natural Mineral Water · Over 200 Years Young
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[64px] font-semibold leading-[1.06] tracking-tight text-white">
                Born in the Alps. Filtered by nature for 15 years.
              </h1>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed max-w-xl">
                Every drop of PuraFlow begins as alpine snow and rain, naturally mineralized through ancient glacial rocks to reach a balanced pH of 7.2 before bottling untouched at the source.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'water' })}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold bg-[#E41B5B] hover:bg-[#C8144D] text-white rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-[#E41B5B]/25"
                >
                  <span>Discover Our Water</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'products' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/35 backdrop-blur-xs rounded-full transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Bottles</span>
                </button>
              </div>
            </motion.div>

            {/* Hero Floating Bottle Showcase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end"
            >
              <div className="relative w-64 sm:w-72 md:w-80 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/25 bg-white/10 backdrop-blur-md">
                <ResilientImage
                  src={PURAFLOW_IMAGES.everyday}
                  alt="PuraFlow crystal-clear natural mineral water bottle"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/40 to-transparent">
                  <p className="text-xs font-medium text-[#93C5FD]">Source Purity</p>
                  <p className="font-display text-lg font-semibold text-white">
                    pH 7.2 · Naturally Balanced
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#alpine-journey"
          className="hidden md:inline-flex flex-col items-center gap-1 absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/75 hover:text-white transition-colors"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* 2. BRAND STORYTELLING — 15-Year Alpine Filtration Journey */}
      <section id="alpine-journey" className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-3 mb-12 md:mb-16"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
              15-Year Natural Filtration
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0B1F3A] leading-tight">
              A slow subterranean journey through protected glacial stone.
            </h2>
            <p className="text-base text-[#4A5568] leading-relaxed">
              Unlike treated tap or surface water, PuraFlow is slowly purified by nature across fifteen years beneath impermeable alpine clay beds, emerging crystal clear and naturally mineralized.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Interactive 4-Step Selector */}
            <div className="lg:col-span-6 space-y-3">
              {JOURNEY_STAGES.map((stage, idx) => {
                const isActive = idx === activeStageIdx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={`w-full text-left p-5 md:p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#F4F8FC] border-[#007CBB]/40 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-lg md:text-xl font-semibold text-[#0B1F3A]">
                        {stage.step}. {stage.title}
                      </span>
                      <span className="font-mono text-xs font-medium text-[#E41B5B] tabular-nums shrink-0">
                        {stage.metric}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#007CBB] mt-1">{stage.subtitle}</p>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-sm text-[#4A5568] leading-relaxed mt-3"
                      >
                        {stage.description}
                      </motion.p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Visual Stage Panel */}
            <div className="lg:col-span-6 relative min-h-[360px] rounded-3xl overflow-hidden bg-[#EEF4FA] border border-slate-200/70">
              <ResilientImage
                src={PURAFLOW_IMAGES.heroAlps}
                alt="French Alps recharge plateau and protected spring zone"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/85 via-[#0B1F3A]/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-7 md:p-9 text-white space-y-2">
                <p className="font-mono text-xs uppercase tracking-wider text-[#93C5FD]">
                  Stage {JOURNEY_STAGES[activeStageIdx].step} · {JOURNEY_STAGES[activeStageIdx].metric}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold">
                  {JOURNEY_STAGES[activeStageIdx].title}
                </h3>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'water' })}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#E41B5B] transition-colors pt-1 cursor-pointer"
                >
                  <span>Explore Geological Cross-Section</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MINERAL COMPOSITION — Signature Evian Ice-Blue / White Interactive Lab */}
      <section className="bg-[#F4F8FC] border-y border-slate-200/70 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#007CBB]">
                Natural Mineral Balance
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A] leading-tight">
                Pure electrolytes, naturally balanced at pH 7.2.
              </h2>
              <p className="text-base text-[#4A5568] leading-relaxed">
                Select any mineral element to inspect how PuraFlow’s 15-year glacial journey creates its signature clean, soft taste without added minerals.
              </p>

              {/* Highlighted Active Mineral Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-xs text-[#E41B5B]">{activeMineral.symbol}</span>
                    <h3 className="font-display text-2xl font-semibold text-[#0B1F3A]">
                      {activeMineral.name}
                    </h3>
                  </div>
                  <span className="font-mono text-2xl font-semibold text-[#007CBB] tabular-nums">
                    {activeMineral.mgPerLitre} mg/L
                  </span>
                </div>
                <p className="text-sm text-[#4A5568] leading-relaxed">{activeMineral.role}</p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate({ page: 'water' })}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#E41B5B] hover:underline cursor-pointer"
              >
                <span>View Full Water Quality Analysis</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Interactive Mineral Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {MINERAL_COMPOSITION.map((m, idx) => {
                const selected = idx === activeMineralIdx;
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setActiveMineralIdx(idx)}
                    className={`p-5 rounded-2xl text-left border transition-all duration-150 cursor-pointer ${
                      selected
                        ? 'bg-[#0B1F3A] text-white border-[#0B1F3A] shadow-md -translate-y-0.5'
                        : 'bg-white text-[#0B1F3A] border-slate-200 hover:border-[#007CBB]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className={selected ? 'text-[#93C5FD]' : 'text-slate-500'}>
                        {m.symbol}
                      </span>
                      <Droplets
                        className={`w-3.5 h-3.5 ${selected ? 'text-[#E41B5B]' : 'text-[#007CBB]'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="font-mono text-2xl font-semibold tabular-nums">
                      {m.mgPerLitre}
                      <span className="text-xs font-normal opacity-75 ml-1">mg/L</span>
                    </p>
                    <p className="text-sm font-medium mt-1">{m.name}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTLE COLLECTIONS — Animated Evian Product Range Showcase */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
                Our Bottles
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#0B1F3A]">
                A bottle for every table, court, and journey.
              </h2>
            </div>

            {/* Interactive Range Switcher */}
            <div
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4F8FC] rounded-full border border-slate-200/80"
              role="tablist"
              aria-label="Select PuraFlow range"
            >
              {PURAFLOW_PRODUCTS.map((product, idx) => {
                const active = idx === activeProductIdx;
                return (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveProductIdx(idx)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#0B1F3A] text-white'
                        : 'text-[#4A5568] hover:text-[#0B1F3A]'
                    }`}
                  >
                    {product.range}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Product Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#F4F8FC] rounded-3xl p-6 md:p-12 border border-slate-200/70"
            >
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-md border border-slate-200/60">
                  <ResilientImage
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E41B5B]">
                    {activeProduct.range} Collection
                  </p>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
                    {activeProduct.name}
                  </h3>
                  <p className="text-base text-[#4A5568] leading-relaxed max-w-xl">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Available Sizes */}
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Available Formats
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeProduct.variants.map((v) => (
                      <span
                        key={v.sizeLabel}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-medium text-[#0B1F3A] tabular-nums"
                      >
                        {v.sizeLabel}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Highlights */}
                <ul className="space-y-2 text-sm text-[#334155]">
                  {activeProduct.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#E41B5B] shrink-0" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ page: 'products', category: activeProduct.range })
                    }
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#E41B5B] hover:bg-[#C8144D] text-white rounded-full transition-colors cursor-pointer"
                  >
                    <span>Inspect {activeProduct.range} Formats</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="text-sm font-semibold text-[#0B1F3A] hover:text-[#E41B5B] transition-colors cursor-pointer"
                  >
                    Where to Find →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. SUSTAINABILITY & CIRCULARITY — Deep Alpine Navy Band */}
      <section className="bg-[#0B1F3A] text-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
                B Corp Certified · Circular Commitment
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
                Preserving the Alps for generations to come.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                From protecting alpine wetlands to bottling with 100% renewable electricity and recycled circular rPET, every stage of PuraFlow is accountable to people and planet.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'sustainability' })}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-white text-[#0B1F3A] hover:bg-slate-100 rounded-full transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Our Sustainability Actions</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SUSTAINABILITY_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/6 border border-white/12 rounded-3xl p-7 space-y-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-semibold text-[#E41B5B] tabular-nums">
                    {pillar.metric}
                  </span>
                  {i === 0 && <Leaf className="w-6 h-6 text-[#93C5FD]" aria-hidden="true" />}
                  {i === 1 && <Droplets className="w-6 h-6 text-[#93C5FD]" aria-hidden="true" />}
                  {i === 2 && <Recycle className="w-6 h-6 text-[#93C5FD]" aria-hidden="true" />}
                </div>
                <div>
                  <p className="text-xs font-medium text-[#93C5FD]">{pillar.metricLabel}</p>
                  <h3 className="font-display text-2xl font-semibold text-white mt-1">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{pillar.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LIFESTYLE, FINE DINING, SPORTS & NEWS EDITORIAL */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-2 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
                Live Young Universe
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
                Sportsmanship, gastronomy, and creative collaborations.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'news' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] hover:text-[#E41B5B] transition-colors cursor-pointer self-start md:self-auto"
            >
              <span>All News & Events</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <article
                key={article.slug}
                onClick={() => onNavigate({ page: 'news', slug: article.slug })}
                className="group bg-[#F4F8FC] rounded-2xl overflow-hidden border border-slate-200/70 flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-200">
                  <ResilientImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#E41B5B]">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#0B1F3A] leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[#4A5568] leading-relaxed">{article.excerpt}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] group-hover:text-[#E41B5B] transition-colors">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
