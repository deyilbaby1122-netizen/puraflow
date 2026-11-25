import React, { useEffect, useState } from 'react';
import { FindPuraFlowModal } from './components/FindPuraFlowModal';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { OurWaterPage } from './pages/OurWaterPage';
import { ProductsPage } from './pages/ProductsPage';
import { SustainabilityPage } from './pages/SustainabilityPage';
import { PageRoute, ProductRangeCategory } from './types';

function parseHash(hash: string): PageRoute {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) return { page: 'home' };
  const [seg, param] = clean.split('/');
  if (seg === 'water') return { page: 'water' };
  if (seg === 'products') {
    return {
      page: 'products',
      category: param ? (decodeURIComponent(param) as ProductRangeCategory) : 'All',
    };
  }
  if (seg === 'sustainability') return { page: 'sustainability' };
  if (seg === 'story') return { page: 'story' };
  if (seg === 'news') {
    return { page: 'news', slug: param ? decodeURIComponent(param) : undefined };
  }
  return { page: 'home' };
}

function toHash(route: PageRoute): string {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'water':
      return '#/water';
    case 'products':
      return route.category && route.category !== 'All'
        ? `#/products/${encodeURIComponent(route.category)}`
        : '#/products';
    case 'sustainability':
      return '#/sustainability';
    case 'story':
      return '#/story';
    case 'news':
      return route.slug ? `#/news/${encodeURIComponent(route.slug)}` : '#/news';
  }
}

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    parseHash(typeof window !== 'undefined' ? window.location.hash : '')
  );
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('INT');

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (next: PageRoute) => {
    const nextHash = toHash(next);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1A202C]">
      <Header
        currentRoute={route}
        onNavigate={navigate}
        onOpenInquiry={() => setInquiryOpen(true)}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage
            onNavigate={navigate}
            onOpenInquiry={() => setInquiryOpen(true)}
          />
        )}
        {route.page === 'water' && <OurWaterPage onNavigate={navigate} />}
        {route.page === 'products' && (
          <ProductsPage
            key={route.category || 'All'}
            initialCategory={route.category}
            onOpenInquiry={() => setInquiryOpen(true)}
          />
        )}
        {route.page === 'sustainability' && <SustainabilityPage />}
        {route.page === 'story' && <OurStoryPage onNavigate={navigate} />}
        {route.page === 'news' && (
          <NewsEventsPage activeSlug={route.slug} onNavigate={navigate} />
        )}
      </main>

      <Footer
        onNavigate={navigate}
        selectedRegion={selectedRegion}
        onChangeRegion={setSelectedRegion}
      />

      <FindPuraFlowModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        onNavigate={navigate}
      />
    </div>
  );
}
