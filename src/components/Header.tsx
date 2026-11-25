import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageRoute } from '../types';
import { PuraFlowLogo } from './PuraFlowLogo';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenInquiry: () => void;
}

const NAV_LINKS: { label: string; page: PageRoute['page']; route: PageRoute }[] = [
  { label: 'Our Water', page: 'water', route: { page: 'water' } },
  { label: 'Products', page: 'products', route: { page: 'products' } },
  { label: 'Sustainability', page: 'sustainability', route: { page: 'sustainability' } },
  { label: 'Our Story', page: 'story', route: { page: 'story' } },
  { label: 'News & Events', page: 'news', route: { page: 'news' } },
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    setMobileOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Clean single-element PuraFlow wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleNav({ page: 'home' });
          }}
          className="shrink-0 whitespace-nowrap hover:opacity-85 transition-opacity"
          aria-label="PuraFlow Home"
        >
          <PuraFlowLogo variant="dark" />
        </a>

        {/* Zone 2: 5 single-line Evian-aligned navigation links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {NAV_LINKS.map((item) => {
            const isActive = currentRoute.page === item.page;
            return (
              <a
                key={item.page}
                href={`#/${item.page}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(item.route);
                }}
                className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  isActive
                    ? 'text-[#0B1F3A]'
                    : 'text-[#4A5568] hover:text-[#0B1F3A]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#E41B5B] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#E41B5B] hover:bg-[#C8144D] rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            Find PuraFlow
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#0B1F3A] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-5 py-4 shadow-lg">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => {
              const isActive = currentRoute.page === item.page;
              return (
                <a
                  key={item.page}
                  href={`#/${item.page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.route);
                  }}
                  className={`py-3.5 px-2 text-base font-medium border-b border-slate-100 last:border-b-0 ${
                    isActive ? 'text-[#E41B5B]' : 'text-[#0B1F3A]'
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
