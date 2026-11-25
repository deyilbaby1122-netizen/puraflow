import React, { useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { IMAGES } from '../data/catalog';
import { CartItem } from '../types';

interface BespokePageProps {
  onAddToCart: (item: CartItem) => void;
}

const SILHOUETTES = [
  { id: 'monolith', name: 'Monolith Cylinder', priceDelta: 0, note: 'Smooth lathe-turned architectural cylinder' },
  { id: 'fluted', name: 'Fluted Architectural', priceDelta: 35, note: '24 precision-milled vertical tactile channels' },
] as const;

const MATERIALS = [
  { id: 'raw-ti', name: 'Raw Brushed Titanium', hex: '#A9ABA8', textHex: '#121417', price: 245, image: IMAGES.titanium },
  { id: 'obsidian', name: 'Obsidian DLC', hex: '#232629', textHex: '#ECEAE3', price: 265, image: IMAGES.obsidian },
  { id: 'travertine', name: 'Limestone Ceramic', hex: '#DDD6C7', textHex: '#121417', price: 230, image: IMAGES.ceramic },
  { id: 'smoked', name: 'Smoked Quartz Titanium', hex: '#636866', textHex: '#F6F5F1', price: 255, image: IMAGES.glass },
] as const;

const CAPS = [
  { id: 'ti-cap', name: 'Raw Titanium', hex: '#B4B6B2', priceDelta: 0 },
  { id: 'bronze-cap', name: 'Knurled Bronze', hex: '#8A6D4B', priceDelta: 25 },
  { id: 'obsidian-cap', name: 'Matte Obsidian', hex: '#1F2225', priceDelta: 15 },
] as const;

const CAPACITIES = [
  { ml: 500, label: '500 ml', priceDelta: 0, weight: 198, height: 224 },
  { ml: 750, label: '750 ml', priceDelta: 35, weight: 245, height: 262 },
  { ml: 1000, label: '1000 ml', priceDelta: 65, weight: 292, height: 294 },
] as const;

export const BespokePage: React.FC<BespokePageProps> = ({ onAddToCart }) => {
  const [silhouetteId, setSilhouetteId] = useState<(typeof SILHOUETTES)[number]['id']>('monolith');
  const [materialId, setMaterialId] = useState<(typeof MATERIALS)[number]['id']>('raw-ti');
  const [capId, setCapId] = useState<(typeof CAPS)[number]['id']>('bronze-cap');
  const [capMl, setCapMl] = useState<(typeof CAPACITIES)[number]['ml']>(750);
  const [monogram, setMonogram] = useState('P.F');
  const [engravingStyle, setEngravingStyle] = useState<'Atelier Serif' | 'Architectural Mono'>('Atelier Serif');
  const [commissioned, setCommissioned] = useState(false);

  const silhouette = SILHOUETTES.find((s) => s.id === silhouetteId) || SILHOUETTES[0];
  const material = MATERIALS.find((m) => m.id === materialId) || MATERIALS[0];
  const cap = CAPS.find((c) => c.id === capId) || CAPS[0];
  const capacity = CAPACITIES.find((c) => c.ml === capMl) || CAPACITIES[1];

  const totalPrice = material.price + silhouette.priceDelta + cap.priceDelta + capacity.priceDelta;
  const cleanMonogram = monogram.trim().toUpperCase().slice(0, 3);

  const handleCommission = () => {
    const item: CartItem = {
      cartItemId: `bespoke-${silhouette.id}-${material.id}-${cap.id}-${capacity.ml}-${cleanMonogram || 'none'}-${engravingStyle}`,
      productId: 'pf-bespoke-commission',
      name: `Bespoke ${silhouette.name}`,
      series: 'Zurich Custom Atelier',
      image: material.image,
      finishName: material.name,
      finishHex: material.hex,
      capacityLabel: capacity.label,
      unitPrice: totalPrice,
      quantity: 1,
      monogram: cleanMonogram || undefined,
      isBespoke: true,
      bespokeDetails: {
        silhouette: silhouette.name,
        capAlloy: cap.name,
        engravingStyle,
      },
    };
    onAddToCart(item);
    setCommissioned(true);
    window.setTimeout(() => setCommissioned(false), 1800);
  };

  const resetStudio = () => {
    setSilhouetteId('monolith');
    setMaterialId('raw-ti');
    setCapId('bronze-cap');
    setCapMl(750);
    setMonogram('');
    setEngravingStyle('Atelier Serif');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#121417]/10">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
            Zurich Bespoke Atelier
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#121417]">
            Commission Your Vessel
          </h1>
          <p className="text-sm md:text-base text-[#5A5E63] leading-relaxed">
            Configure body metallurgy, closure alloy, silhouette geometry, and precision fiber-laser monogramming.
          </p>
        </div>
        <button
          type="button"
          onClick={resetStudio}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#5A5E63] hover:text-[#121417] cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-10 items-start">
        {/* Left Live Architectural Blueprint & Vessel Preview */}
        <div className="lg:col-span-7 bg-[#ECEAE3] border border-[#121417]/8 rounded-sm p-6 md:p-10 lg:sticky lg:top-24">
          <div className="flex items-center justify-between text-xs text-[#5A5E63] mb-6">
            <span className="font-mono tabular-nums">
              Specification · {capacity.height}mm × {capacity.weight}g
            </span>
            <span>Lead Time: 4–6 Business Days</span>
          </div>

          {/* Live Dynamic SVG Architectural Rendering of the Configured Vessel */}
          <div className="flex items-center justify-center py-6 md:py-10 bg-[#F6F5F1] border border-[#121417]/8 rounded-sm relative">
            <svg
              viewBox="0 0 260 400"
              className="w-56 md:w-64 h-auto drop-shadow-md transition-all duration-300"
              role="img"
              aria-label={`Live preview of ${silhouette.name} in ${material.name} with ${cap.name} cap`}
            >
              <defs>
                <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={material.hex} stopOpacity="0.95" />
                  <stop offset="32%" stopColor="#FFFFFF" stopOpacity="0.28" />
                  <stop offset="65%" stopColor={material.hex} stopOpacity="1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
                </linearGradient>
                <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={cap.hex} />
                  <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor={cap.hex} />
                </linearGradient>
              </defs>

              {/* Floor shadow */}
              <ellipse cx="130" cy="372" rx="58" ry="8" fill="#121417" opacity="0.14" />

              {/* Cap */}
              <rect x="100" y="34" width="60" height="34" rx="4" fill={cap.hex} />
              <rect x="100" y="34" width="60" height="34" rx="4" fill="url(#capGrad)" opacity="0.45" />
              {/* Cap knurling accent if bronze */}
              {cap.id === 'bronze-cap' && (
                <line x1="102" y1="42" x2="158" y2="42" stroke="#121417" strokeOpacity="0.25" strokeWidth="1" />
              )}

              {/* Neck Collar */}
              <rect x="102" y="68" width="56" height="6" fill="#121417" opacity="0.7" />

              {/* Vessel Shoulder & Body */}
              <path
                d="M 102 74 C 102 88, 74 102, 74 128 L 74 350 C 74 362, 82 368, 94 368 L 166 368 C 178 368, 186 362, 186 350 L 186 128 C 186 102, 158 88, 158 74 Z"
                fill={material.hex}
              />
              <path
                d="M 102 74 C 102 88, 74 102, 74 128 L 74 350 C 74 362, 82 368, 94 368 L 166 368 C 178 368, 186 362, 186 350 L 186 128 C 186 102, 158 88, 158 74 Z"
                fill="url(#bodyGrad)"
              />

              {/* Fluted vertical channels if Fluted silhouette */}
              {silhouetteId === 'fluted' &&
                [84, 94, 104, 114, 124, 134, 144, 154, 164, 174].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="126"
                    x2={x}
                    y2="356"
                    stroke="#121417"
                    strokeOpacity="0.14"
                    strokeWidth="2"
                  />
                ))}

              {/* Subtle Base Rim */}
              <line x1="80" y1="355" x2="180" y2="355" stroke="#121417" strokeOpacity="0.12" strokeWidth="1" />

              {/* Live Engraved Monogram */}
              {cleanMonogram && (
                <text
                  x="130"
                  y="296"
                  textAnchor="middle"
                  fill={material.textHex}
                  fillOpacity="0.72"
                  fontSize="16"
                  letterSpacing="3"
                  fontFamily={
                    engravingStyle === 'Atelier Serif'
                      ? 'Cormorant Garamond, Georgia, serif'
                      : 'JetBrains Mono, monospace'
                  }
                >
                  {cleanMonogram}
                </text>
              )}
            </svg>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
            <div className="bg-white/70 p-3 rounded-sm">
              <p className="text-[#6B7075]">Body</p>
              <p className="font-medium text-[#121417] mt-0.5 truncate">{material.name}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-sm">
              <p className="text-[#6B7075]">Closure</p>
              <p className="font-medium text-[#121417] mt-0.5 truncate">{cap.name}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-sm">
              <p className="text-[#6B7075]">Thermal Rating</p>
              <p className="font-mono text-[#121417] mt-0.5 tabular-nums">36h Cold / 18h Hot</p>
            </div>
          </div>
        </div>

        {/* Right Interactive Configurator Controls */}
        <div className="lg:col-span-5 space-y-7">
          {/* 1. Silhouette */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#121417]">01. Architectural Silhouette</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SILHOUETTES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSilhouetteId(s.id)}
                  className={`p-4 text-left border rounded-sm transition-colors cursor-pointer ${
                    silhouetteId === s.id
                      ? 'border-[#14232B] bg-white'
                      : 'border-[#121417]/12 bg-white/50 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#121417]">{s.name}</span>
                    <span className="font-mono text-xs text-[#5A5E63] tabular-nums">
                      {s.priceDelta === 0 ? 'Included' : `+$${s.priceDelta}`}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7075] mt-1">{s.note}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Body Metallurgy */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#121417]">02. Shell Material & Finish</h2>
            <div className="grid grid-cols-2 gap-3">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterialId(m.id)}
                  className={`p-3.5 text-left border rounded-sm flex items-center gap-3 transition-colors cursor-pointer ${
                    materialId === m.id
                      ? 'border-[#14232B] bg-white'
                      : 'border-[#121417]/12 bg-white/50 hover:bg-white'
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full shrink-0 border border-[#121417]/15"
                    style={{ backgroundColor: m.hex }}
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#121417] truncate">{m.name}</p>
                    <p className="font-mono text-[11px] text-[#6B7075] tabular-nums">${m.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Closure Cap Alloy */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#121417]">03. Precision Cap Alloy</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {CAPS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCapId(c.id)}
                  className={`p-3 text-left border rounded-sm transition-colors cursor-pointer ${
                    capId === c.id
                      ? 'border-[#14232B] bg-white'
                      : 'border-[#121417]/12 bg-white/50 hover:bg-white'
                  }`}
                >
                  <span
                    className="block w-4 h-4 rounded-full mb-2 border border-[#121417]/15"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-xs font-medium text-[#121417]">{c.name}</p>
                  <p className="font-mono text-[11px] text-[#6B7075] tabular-nums">
                    {c.priceDelta === 0 ? 'Std' : `+$${c.priceDelta}`}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Volume Capacity */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#121417]">04. Vessel Volume</h2>
            <div className="grid grid-cols-3 gap-2.5">
              {CAPACITIES.map((c) => (
                <button
                  key={c.ml}
                  type="button"
                  onClick={() => setCapMl(c.ml)}
                  className={`py-2.5 px-3 text-xs font-mono border rounded-sm transition-colors cursor-pointer ${
                    capMl === c.ml
                      ? 'border-[#14232B] bg-[#14232B] text-[#F6F5F1]'
                      : 'border-[#121417]/15 bg-white text-[#121417]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Laser Monogramming */}
          <div className="space-y-3">
            <h2 className="font-serif text-xl font-medium text-[#121417]">05. Laser Monogram</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                maxLength={3}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="Initials (max 3)"
                aria-label="Monogram initials"
                className="bg-white border border-[#121417]/15 px-3.5 py-2.5 text-sm font-mono uppercase tracking-widest rounded-sm focus:border-[#14232B] focus:outline-none"
              />
              <div className="flex items-center gap-1 p-1 bg-[#ECEAE3] rounded-sm">
                {(['Atelier Serif', 'Architectural Mono'] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setEngravingStyle(style)}
                    className={`flex-1 py-2 text-[11px] font-medium rounded-sm transition-colors cursor-pointer ${
                      engravingStyle === style
                        ? 'bg-white text-[#121417] shadow-xs'
                        : 'text-[#5A5E63]'
                    }`}
                  >
                    {style === 'Atelier Serif' ? 'Serif' : 'Mono'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary & Commission CTA */}
          <div className="pt-5 border-t border-[#121417]/10 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-[#5A5E63]">Bespoke Commission Total</span>
              <span className="font-mono text-2xl font-medium text-[#121417] tabular-nums">
                ${totalPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCommission}
              className="w-full py-4 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {commissioned ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Bespoke Vessel Added to Bag</span>
                </>
              ) : (
                <span>Commission & Add to Bag</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
