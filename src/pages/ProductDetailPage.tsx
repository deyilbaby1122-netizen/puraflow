import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Minus, Plus, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { CartItem, RoutePath } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (route: RoutePath) => void;
  onAddToCart: (item: CartItem) => void;
}

type SpecTab = 'thermal' | 'dimensions' | 'care';

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  onNavigate,
  onAddToCart,
}) => {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [finishIdx, setFinishIdx] = useState(0);
  const [capIdx, setCapIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [monogram, setMonogram] = useState('');
  const [specTab, setSpecTab] = useState<SpecTab>('thermal');
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    setFinishIdx(0);
    setCapIdx(0);
    setQuantity(1);
    setMonogram('');
  }, [slug]);

  const activeFinish = product.finishes[finishIdx] || product.finishes[0];
  const activeCap = product.capacities[capIdx] || product.capacities[0];
  const unitPrice = product.basePrice + activeCap.priceDelta;

  const handleAdd = () => {
    const cleanMonogram = monogram.trim().toUpperCase().slice(0, 3);
    const cartItem: CartItem = {
      cartItemId: `${product.id}-${activeFinish.id}-${activeCap.ml}-${cleanMonogram || 'plain'}`,
      productId: product.id,
      name: product.name,
      series: product.series,
      image: activeFinish.image,
      finishName: activeFinish.name,
      finishHex: activeFinish.hex,
      capacityLabel: activeCap.label,
      unitPrice,
      quantity,
      monogram: cleanMonogram || undefined,
    };
    onAddToCart(cartItem);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-10 md:py-16">
      {/* Breadcrumb Back */}
      <button
        type="button"
        onClick={() => onNavigate({ page: 'collection' })}
        className="inline-flex items-center gap-2 text-xs font-medium text-[#5A5E63] hover:text-[#121417] mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Back to Collection</span>
      </button>

      {/* Contiguous PDP Split: Sticky Gallery Left / Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
          <div className="aspect-[4/3] w-full bg-[#ECEAE3] rounded-sm overflow-hidden border border-[#121417]/8">
            <ResilientImage
              src={activeFinish.image}
              alt={`${product.name} in ${activeFinish.name}`}
              fallbackTitle={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.finishes.length > 1 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {product.finishes.map((finish, idx) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishIdx(idx)}
                  className={`aspect-[4/3] rounded-sm overflow-hidden border transition-all cursor-pointer ${
                    idx === finishIdx
                      ? 'border-[#14232B] ring-1 ring-[#14232B]'
                      : 'border-[#121417]/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <ResilientImage
                    src={finish.image}
                    alt={finish.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-7">
          <div className="space-y-3 pb-6 border-b border-[#121417]/10">
            <div className="flex items-center gap-2 text-xs text-[#6B7075]">
              <span>{product.series}</span>
              <span aria-hidden="true">·</span>
              <span>{product.availability}</span>
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h1 className="font-serif text-3xl md:text-4xl font-medium text-[#121417]">
                {product.name}
              </h1>
              <span className="font-mono text-2xl font-medium text-[#121417] tabular-nums shrink-0">
                ${unitPrice}
              </span>
            </div>

            <p className="text-sm md:text-base text-[#4A4E52] leading-relaxed">
              {product.longDescription}
            </p>
          </div>

          {/* Finish Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#121417]">Finish</span>
              <span className="text-[#5A5E63]">{activeFinish.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {product.finishes.map((finish, idx) => (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => setFinishIdx(idx)}
                  aria-label={finish.name}
                  aria-pressed={idx === finishIdx}
                  className={`w-8 h-8 rounded-full transition-transform cursor-pointer ${
                    idx === finishIdx
                      ? 'ring-2 ring-[#14232B] ring-offset-2 scale-105'
                      : 'ring-1 ring-[#121417]/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: finish.hex }}
                />
              ))}
            </div>
          </div>

          {/* Capacity Selector */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#121417]">Capacity</span>
              <span className="font-mono text-[#5A5E63] tabular-nums">
                {activeCap.heightMm}mm × Ø{activeCap.diameterMm}mm · {activeCap.weightGrams}g
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {product.capacities.map((cap, idx) => (
                <button
                  key={cap.ml}
                  type="button"
                  onClick={() => setCapIdx(idx)}
                  className={`py-2.5 px-3 text-xs font-mono border rounded-sm transition-colors cursor-pointer ${
                    idx === capIdx
                      ? 'border-[#14232B] bg-[#14232B] text-[#F6F5F1]'
                      : 'border-[#121417]/15 bg-white text-[#121417] hover:border-[#121417]/40'
                  }`}
                >
                  {cap.label}
                </button>
              ))}
            </div>
          </div>

          {/* Complimentary Laser Monogram */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label htmlFor="pdp-monogram" className="font-medium text-[#121417]">
                Complimentary Laser Monogram
              </label>
              <span className="text-[#6B7075]">Up to 3 characters</span>
            </div>
            <input
              id="pdp-monogram"
              type="text"
              maxLength={3}
              value={monogram}
              onChange={(e) => setMonogram(e.target.value.toUpperCase())}
              placeholder="Optional initials (e.g. A.M)"
              className="w-full bg-white border border-[#121417]/15 px-3.5 py-2.5 text-sm font-mono uppercase tracking-widest rounded-sm focus:border-[#14232B] focus:outline-none"
            />
          </div>

          {/* Quantity + Primary Add CTA */}
          <div className="flex items-stretch gap-3 pt-2">
            <div className="inline-flex items-center border border-[#121417]/15 bg-white rounded-sm">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-12 flex items-center justify-center text-[#5A5E63] hover:text-[#121417] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono text-sm tabular-nums">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-12 flex items-center justify-center text-[#5A5E63] hover:text-[#121417] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span className="tabular-nums">Add to Bag — ${unitPrice * quantity}</span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2.5 text-xs text-[#5A5E63] pt-1">
            <ShieldCheck className="w-4 h-4 text-[#14232B] shrink-0" aria-hidden="true" />
            <span>Lifetime structural guarantee · Complimentary Zurich courier over $200</span>
          </div>

          {/* Technical Specifications Tabs */}
          <div className="pt-6 border-t border-[#121417]/10 space-y-4">
            <div className="flex items-center gap-1 p-1 bg-[#ECEAE3] rounded-sm">
              {(
                [
                  { id: 'thermal', label: 'Thermal Curve' },
                  { id: 'dimensions', label: 'Metallurgy & Size' },
                  { id: 'care', label: 'Origin & Care' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSpecTab(tab.id)}
                  className={`flex-1 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
                    specTab === tab.id
                      ? 'bg-white text-[#121417] shadow-xs'
                      : 'text-[#5A5E63] hover:text-[#121417]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {specTab === 'thermal' && (
              <div className="bg-white border border-[#121417]/8 p-4 rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5A5E63]">
                  <span>36h Cold Equilibrium (4°C start, 22°C ambient)</span>
                  <span className="font-mono text-[#121417] tabular-nums">
                    {product.coldHours}h Cold · {product.hotHours}h Hot
                  </span>
                </div>
                <svg
                  viewBox="0 0 320 110"
                  className="w-full h-28 overflow-visible"
                  role="img"
                  aria-label="Thermal retention curve comparing Pure Flow copper vacuum shield against standard single-wall bottles"
                >
                  {/* Gridlines */}
                  <line x1="28" y1="15" x2="310" y2="15" stroke="#E5E2D9" strokeWidth="1" />
                  <line x1="28" y1="50" x2="310" y2="50" stroke="#E5E2D9" strokeWidth="1" />
                  <line x1="28" y1="85" x2="310" y2="85" stroke="#E5E2D9" strokeWidth="1" />
                  {/* Axis labels */}
                  <text x="0" y="18" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">22°C</text>
                  <text x="0" y="53" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">12°C</text>
                  <text x="0" y="88" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">4°C</text>
                  <text x="28" y="103" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">0h</text>
                  <text x="160" y="103" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">18h</text>
                  <text x="292" y="103" fontSize="9" fill="#6B7075" fontFamily="JetBrains Mono">36h</text>
                  {/* Standard bottle curve */}
                  <path
                    d="M 28 85 Q 95 25, 190 17 T 310 15"
                    fill="none"
                    stroke="#B8B4AA"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  {/* Pure Flow Vacuum curve */}
                  <path
                    d={
                      product.coldHours >= 24
                        ? 'M 28 85 Q 150 82, 230 76 T 310 64'
                        : 'M 28 85 Q 110 60, 210 30 T 310 18'
                    }
                    fill="none"
                    stroke="#14232B"
                    strokeWidth="2.2"
                  />
                </svg>
                <div className="flex items-center gap-5 text-[11px] text-[#5A5E63]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#14232B] inline-block" /> Pure Flow Shield
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#B8B4AA] inline-block border-b border-dashed" /> Uninsulated Vessel
                  </span>
                </div>
              </div>
            )}

            {specTab === 'dimensions' && (
              <dl className="bg-white border border-[#121417]/8 p-4 rounded-sm space-y-2.5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Alloy & Shield</dt>
                  <dd className="text-[#121417] text-right">{product.specs.alloy}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Closure Seal</dt>
                  <dd className="text-[#121417] text-right">{product.specs.seal}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Mouth Aperture</dt>
                  <dd className="font-mono text-[#121417] tabular-nums">{product.specs.mouthDiameterMm} mm</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Height × Diameter</dt>
                  <dd className="font-mono text-[#121417] tabular-nums">
                    {activeCap.heightMm} × {activeCap.diameterMm} mm
                  </dd>
                </div>
              </dl>
            )}

            {specTab === 'care' && (
              <dl className="bg-white border border-[#121417]/8 p-4 rounded-sm space-y-2.5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Provenance</dt>
                  <dd className="text-[#121417] text-right">{product.specs.origin}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[#6B7075]">Daily Care</dt>
                  <dd className="text-[#121417] text-right max-w-xs">{product.specs.care}</dd>
                </div>
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
