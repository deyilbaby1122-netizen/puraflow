import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Product } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: Product;
  onOpenProduct: (slug: string) => void;
  onQuickAdd: (product: Product, finishIndex: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenProduct,
  onQuickAdd,
}) => {
  const [selectedFinishIdx, setSelectedFinishIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const activeFinish = product.finishes[selectedFinishIdx] || product.finishes[0];
  const defaultCap = product.capacities[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedFinishIdx);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      className="group flex flex-col bg-white border border-[#121417]/8 rounded-sm overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
      onClick={() => onOpenProduct(product.slug)}
    >
      {/* 4:3 Uniform Studio Image Area (65–75% visual emphasis) */}
      <div className="relative aspect-[4/3] w-full bg-[#ECEAE3] overflow-hidden">
        <ResilientImage
          src={activeFinish.image}
          alt={`${product.name} in ${activeFinish.name}`}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Card Body with identical field order across all items */}
      <div className="flex-1 flex flex-col justify-between p-5 md:p-6 gap-4">
        <div className="space-y-2">
          {/* Unboxed clean metadata line */}
          <div className="flex items-center justify-between gap-2 text-xs text-[#6B7075]">
            <span className="truncate">{product.series}</span>
            <span className="shrink-0">{product.availability}</span>
          </div>

          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-xl font-medium text-[#121417] leading-snug">
              {product.name}
            </h3>
            <span className="font-mono text-sm font-medium text-[#121417] tabular-nums shrink-0">
              ${product.basePrice}
            </span>
          </div>

          <p className="text-sm text-[#5A5E63] leading-relaxed line-clamp-2">
            {product.shortDescription}
          </p>
        </div>

        {/* Interactive Swatch & Quick Add Row */}
        <div className="pt-3 border-t border-[#121417]/8 flex items-center justify-between gap-3">
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
            role="group"
            aria-label={`Select finish for ${product.name}`}
          >
            {product.finishes.map((finish, idx) => (
              <button
                key={finish.id}
                type="button"
                onClick={() => setSelectedFinishIdx(idx)}
                title={finish.name}
                aria-label={finish.name}
                aria-pressed={idx === selectedFinishIdx}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  idx === selectedFinishIdx
                    ? 'ring-2 ring-[#14232B] ring-offset-2 scale-105'
                    : 'ring-1 ring-[#121417]/20 hover:scale-105'
                }`}
                style={{ backgroundColor: finish.hex }}
              />
            ))}
            <span className="text-xs text-[#6B7075] ml-1 hidden sm:inline truncate max-w-[105px]">
              {defaultCap.label}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#14232B] bg-[#F6F5F1] hover:bg-[#14232B] hover:text-[#F6F5F1] border border-[#121417]/15 rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[36px]"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
