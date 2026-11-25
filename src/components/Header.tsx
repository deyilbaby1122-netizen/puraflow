import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { RoutePath } from '../types';

interface HeaderProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_ITEMS: { label: string; page: RoutePath['page']; route: RoutePath }[] = [
  { label: 'Collection', page: 'collection', route: { page: 'collection' } },
  { label: 'Bespoke', page: 'bespoke', route: { page: 'bespoke' } },
  { label: 'Engineering', page: 'engineering', route: { page: 'engineering' } },
  { label: 'Journal', page: 'journal', route: { page: 'journal' } },
  { label: 'Boutiques', page: 'boutiques', route: { page: 'boutiques' } },
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (route: RoutePath) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F5F1]/95 backdrop-blur-md border-b border-[#121417]/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick({ page: 'home' });
          }}
          className="font-serif text-2xl font-medium tracking-tight text-[#121417] whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          Pure Flow
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive =
              currentRoute.page === item.page ||
              (item.page === 'collection' && currentRoute.page === 'product');
            return (
              <a
                key={item.page}
                href={`#/${item.page}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.route);
                }}
                className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#121417]'
                    : 'text-[#5A5E63] hover:text-[#121417]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#14232B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Bag) + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-[#F6F5F1] bg-[#14232B] hover:bg-[#1E333E] rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            aria-label={`Open shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="tabular-nums">Bag ({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#121417] hover:bg-[#121417]/5 rounded-sm transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#121417]/10 bg-[#F6F5F1] px-5 py-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = currentRoute.page === item.page;
              return (
                <a
                  key={item.page}
                  href={`#/${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`py-3 px-2 text-base font-medium border-b border-[#121417]/6 last:border-b-0 ${
                    isActive ? 'text-[#14232B]' : 'text-[#5A5E63]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
