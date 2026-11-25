import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS } from '../data/catalog';
import { Product, ProductCategory, RoutePath } from '../types';
import { ProductCard } from '../components/ProductCard';

interface CollectionPageProps {
  initialCategory?: string;
  onNavigate: (route: RoutePath) => void;
  onQuickAdd: (product: Product, finishIndex: number) => void;
}

const CATEGORIES: ('All' | ProductCategory)[] = ['All', 'Titanium', 'Glass', 'Ceramic', 'Accessories'];
type SortMode = 'featured' | 'price-asc' | 'price-desc' | 'cold-hours';

export const CollectionPage: React.FC<CollectionPageProps> = ({
  initialCategory,
  onNavigate,
  onQuickAdd,
}) => {
  const validInitial = CATEGORIES.includes(initialCategory as 'All' | ProductCategory)
    ? (initialCategory as 'All' | ProductCategory)
    : 'All';

  const [category, setCategory] = useState<'All' | ProductCategory>(validInitial);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortMode>('featured');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.materialSummary.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.basePrice - b.basePrice);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.basePrice - a.basePrice);
    if (sortBy === 'cold-hours') return [...list].sort((a, b) => b.coldHours - a.coldHours);
    return list;
  }, [category, searchQuery, sortBy]);

  const resetFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#121417]/10">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
            Complete Archive
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#121417]">
            Hydration Vessels & Hardware
          </h1>
          <p className="text-sm md:text-base text-[#5A5E63] leading-relaxed">
            Every Pure Flow vessel is serialized, pressure-tested in Zurich, and covered by our lifetime structural guarantee.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate({ page: 'bespoke' })}
          className="px-5 py-2.5 text-xs font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
        >
          Commission Bespoke Vessel
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Segmented Category Filter */}
        <div
          className="flex items-center gap-1 p-1 bg-[#ECEAE3] rounded-sm overflow-x-auto"
          role="tablist"
          aria-label="Filter vessels by material category"
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#121417] shadow-xs'
                    : 'text-[#5A5E63] hover:text-[#121417]'
                }`}
              >
                {cat === 'All' ? 'All Vessels' : cat}
              </button>
            );
          })}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search
              className="w-4 h-4 text-[#6B7075] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titanium, ceramic..."
              aria-label="Search collection"
              className="w-full bg-white border border-[#121417]/15 pl-9 pr-8 py-2 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6B7075] hover:text-[#121417] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="inline-flex items-center gap-2 bg-white border border-[#121417]/15 px-3 py-2 rounded-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6B7075]" aria-hidden="true" />
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortMode)}
              className="bg-transparent text-xs font-medium text-[#121417] focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="cold-hours">Thermal Retention</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="pb-6 text-xs text-[#6B7075] font-mono tabular-nums">
        Showing {filteredProducts.length} of {PRODUCTS.length} pieces
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#121417]/10 rounded-sm py-16 px-6 text-center space-y-4">
          <p className="font-serif text-2xl text-[#121417]">No matching vessels found</p>
          <p className="text-sm text-[#5A5E63] max-w-md mx-auto">
            Try clearing your search term or selecting another material series.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 text-xs font-medium bg-[#14232B] text-[#F6F5F1] rounded-sm hover:bg-[#1E333E] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={(slug) => onNavigate({ page: 'product', slug })}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
};
