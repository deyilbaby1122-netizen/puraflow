import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES, PRODUCTS } from '../data/catalog';
import { Product, RoutePath } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (route: RoutePath) => void;
  onQuickAdd: (product: Product, finishIndex: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onQuickAdd }) => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  return (
    <div>
      {/* Section 1: Storefront Hero */}
      <section className="relative w-full bg-[#121417] text-[#F6F5F1] overflow-hidden">
        <div className="relative min-h-[580px] lg:min-h-[680px] flex items-end">
          <ResilientImage
            src={IMAGES.hero}
            alt="Pure Flow Monolith Grade-5 Titanium hydration vessel on travertine stone"
            fallbackTitle="Pure Flow Monolith"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Measured dark contrast scrim ensuring > 4.5:1 text contrast */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#121417]/90 via-[#121417]/45 to-[#121417]/25"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 md:px-10 py-14 md:py-20">
            <div className="max-w-2xl space-y-5">
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#D8D2C5]">
                Zurich Metallurgy · Series 01–05
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-medium leading-[1.06] tracking-tight text-white">
                Architectural stillness for pure mineral water.
              </h1>
              <p className="text-base md:text-lg text-[#E4E2DC] leading-relaxed max-w-xl">
                Machined from Grade-5 titanium, smoked laboratory borosilicate, and kiln-fired Kyoto ceramic for zero metallic taste and 36-hour thermal equilibrium.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'collection' })}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium bg-[#F6F5F1] text-[#121417] hover:bg-white rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'bespoke' })}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#F6F5F1] border border-white/30 hover:border-white/70 hover:bg-white/10 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Configure Bespoke</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Quantitative Strip below Hero */}
        <div className="border-t border-white/12 bg-[#16191D]">
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-1">
              <p className="font-mono text-lg md:text-xl text-white tabular-nums">Ti-6Al-4V</p>
              <p className="text-xs text-[#A5A9AE]">Aerospace Grade-5 Titanium Billet</p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-lg md:text-xl text-white tabular-nums">36h / 18h</p>
              <p className="text-xs text-[#A5A9AE]">Cold & Hot Thermal Equilibrium</p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-lg md:text-xl text-white tabular-nums">0.00%</p>
              <p className="text-xs text-[#A5A9AE]">Polymer or Plastic Water Contact</p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-lg md:text-xl text-white tabular-nums">0.08 Ra</p>
              <p className="text-xs text-[#A5A9AE]">Electropolished Mirror Interior</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Featured Collection Grid */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
              Flagship Editions
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#121417]">
              Three vessels built for decades of daily carry.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'collection' })}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#14232B] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>View Full Collection ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={(slug) => onNavigate({ page: 'product', slug })}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* Section 3: Materiality & Engineering Split */}
      <section className="bg-[#ECEAE3] border-y border-[#121417]/8">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8 py-2">
              <div className="space-y-5">
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
                  Materiality & Physics
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-[#121417] leading-tight">
                  Engineered for pure mineral neutrality, without coatings or resonance.
                </h2>
                <p className="text-base text-[#4A4E52] leading-relaxed">
                  Conventional steel bottles leach subtle metallic ions and ring loudly on stone tables. Each Pure Flow titanium vessel pairs a 0.45mm single-point machined shell with an internal 99.9% copper foil shield and silent acoustic compression seal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-[#121417]/10">
                <div>
                  <p className="font-mono text-2xl text-[#121417] tabular-nums">198 g</p>
                  <p className="text-xs text-[#5A5E63] mt-1">
                    Dry mass (500 ml Monolith), 38% lighter than steel
                  </p>
                </div>
                <div>
                  <p className="font-mono text-2xl text-[#121417] tabular-nums">0.02 mm</p>
                  <p className="text-xs text-[#5A5E63] mt-1">
                    CNC neck thread machining tolerance
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'engineering' })}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
                >
                  <span>Inspect Vessel Architecture</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'journal' })}
                  className="text-sm font-medium text-[#121417] hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Read Metallurgy Essays
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 min-h-[340px] lg:min-h-[480px] rounded-sm overflow-hidden bg-[#DCD8CE]">
              <ResilientImage
                src={IMAGES.atelier}
                alt="Water pouring cleanly from a crystal carafe inside the Pure Flow architectural studio"
                fallbackTitle="Pure Flow Zurich Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Provenance & Attributed Collector Reviews */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
              Verified Field Notes
            </p>
            <h2 className="font-serif text-3xl font-medium text-[#121417]">
              Tested across studios, flights, and alpine climbs.
            </h2>
          </div>
          <p className="text-xs text-[#5A5E63] font-mono tabular-nums">
            4.94 / 5.00 average across 1,420 registered vessels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <blockquote className="bg-white border border-[#121417]/8 p-6 md:p-7 rounded-sm flex flex-col justify-between gap-6">
            <p className="text-sm text-[#35383C] leading-relaxed">
              “Replacing plastic and stainless steel desk bottles with the Monolith 750 ml eliminated the metallic aftertaste I noticed by late afternoon. After fourteen months of daily studio travel, the brushed finish remains unmarked and holds ice water across two consecutive flights.”
            </p>
            <footer className="pt-4 border-t border-[#121417]/8">
              <p className="text-sm font-medium text-[#121417]">Henrik Lindholm</p>
              <p className="text-xs text-[#6B7075]">Principal Architect, Studio Nord · Copenhagen</p>
            </footer>
          </blockquote>

          <blockquote className="bg-white border border-[#121417]/8 p-6 md:p-7 rounded-sm flex flex-col justify-between gap-6">
            <p className="text-sm text-[#35383C] leading-relaxed">
              “As a tea sommelier, neutral vessel chemistry is essential. The Atelier Fluted Ceramic keeps cold-brewed Gyokuro crisp for over twenty-four hours without retaining aroma between steepings.”
            </p>
            <footer className="pt-4 border-t border-[#121417]/8">
              <p className="text-sm font-medium text-[#121417]">Aiko Watanabe</p>
              <p className="text-xs text-[#6B7075]">Tea Curator, Kissa Cha · Kyoto</p>
            </footer>
          </blockquote>

          <blockquote className="bg-white border border-[#121417]/8 p-6 md:p-7 rounded-sm flex flex-col justify-between gap-6">
            <p className="text-sm text-[#35383C] leading-relaxed">
              “The quarter-turn bronze closure on the Nocturne Edition opens cleanly without squeaking during client meetings. Weight savings over standard double-wall flasks are immediately noticeable in a carry-on brief.”
            </p>
            <footer className="pt-4 border-t border-[#121417]/8">
              <p className="text-sm font-medium text-[#121417]">Marc-Antoine Delacroix</p>
              <p className="text-xs text-[#6B7075]">Managing Partner, Delacroix Conseil · Paris</p>
            </footer>
          </blockquote>
        </div>
      </section>
    </div>
  );
};
