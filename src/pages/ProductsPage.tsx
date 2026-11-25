import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PURAFLOW_PRODUCTS } from '../data/puraflowData';
import { ProductRangeCategory, PuraFlowProduct } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface ProductsPageProps {
  initialCategory?: ProductRangeCategory;
  onOpenInquiry: () => void;
}

const RANGES: ProductRangeCategory[] = [
  'All',
  'Everyday',
  'Sparkling',
  'Prestige Glass',
  'Limited Editions',
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'All',
  onOpenInquiry,
}) => {
  const [selectedRange, setSelectedRange] = useState<ProductRangeCategory>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});

  const filtered =
    selectedRange === 'All'
      ? PURAFLOW_PRODUCTS
      : PURAFLOW_PRODUCTS.filter((p) => p.range === selectedRange);

  const getActiveVariantIdx = (product: PuraFlowProduct) =>
    selectedSizes[product.id] ?? 0;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#F4F8FC] border-b border-slate-200/80 py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E41B5B]">
              Bottle Collections
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-[#0B1F3A]">
              PuraFlow Formats & Ranges
            </h1>
            <p className="text-base text-[#4A5568] leading-relaxed">
              From 100% recycled everyday rPET formats to sparkling refreshments, Michelin-table Prestige Glass, and annual designer collector bottles.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-full border border-slate-200"
            role="tablist"
            aria-label="Filter product ranges"
          >
            {RANGES.map((range) => {
              const active = selectedRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#E41B5B] text-white'
                      : 'text-[#4A5568] hover:text-[#0B1F3A]'
                  }`}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Range Showcase List */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 space-y-14">
        {filtered.map((product, index) => {
          const activeVarIdx = getActiveVariantIdx(product);
          const activeVariant = product.variants[activeVarIdx] || product.variants[0];

          return (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-6 md:p-10 rounded-3xl border border-slate-200/80 ${
                index % 2 === 0 ? 'bg-[#F4F8FC]' : 'bg-white'
              }`}
            >
              <div
                className={`lg:col-span-5 flex justify-center ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <div className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200/60">
                  <ResilientImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className={`lg:col-span-7 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#E41B5B]">
                    {product.range} Range
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
                    {product.name}
                  </h2>
                  <p className="text-sm font-medium text-[#007CBB]">{product.tagline}</p>
                  <p className="text-base text-[#4A5568] leading-relaxed">{product.description}</p>
                </div>

                {/* Interactive Format Selector */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Select Bottle Size & Specification
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, vIdx) => (
                      <button
                        key={variant.sizeLabel}
                        type="button"
                        onClick={() =>
                          setSelectedSizes((prev) => ({ ...prev, [product.id]: vIdx }))
                        }
                        className={`px-4 py-2 text-xs font-mono font-medium rounded-xl border transition-colors cursor-pointer ${
                          vIdx === activeVarIdx
                            ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                            : 'bg-white text-[#0B1F3A] border-slate-200 hover:border-[#007CBB]'
                        }`}
                      >
                        {variant.sizeLabel}
                      </button>
                    ))}
                  </div>

                  {/* Active Variant Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
                    <div>
                      <p className="text-slate-500">Packaging Material</p>
                      <p className="font-semibold text-[#0B1F3A] mt-0.5">{activeVariant.material}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Circularity</p>
                      <p className="font-semibold text-[#0B1F3A] mt-0.5">
                        {activeVariant.recycledContent}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Recommended Occasion</p>
                      <p className="font-semibold text-[#0B1F3A] mt-0.5">{activeVariant.idealFor}</p>
                    </div>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#334155]">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#E41B5B] shrink-0" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-[#E41B5B] hover:bg-[#C8144D] text-white rounded-full transition-colors cursor-pointer"
                >
                  <span>Find {activeVariant.sizeLabel} Near You</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          );
        })}
      </section>
    </div>
  );
};
