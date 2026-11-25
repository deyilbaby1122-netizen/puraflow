import React, { useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { SAMPLE_ORDERS } from './data/catalog';
import { BespokePage } from './pages/BespokePage';
import { BoutiquesPage } from './pages/BoutiquesPage';
import { CollectionPage } from './pages/CollectionPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { HomePage } from './pages/HomePage';
import { JournalPage } from './pages/JournalPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartItem, OrderRecord, Product, RoutePath } from './types';

function parseHashToRoute(hash: string): RoutePath {
  const clean = hash.replace(/^#\/?/, '').trim();
  if (!clean) return { page: 'home' };

  const [segment, param] = clean.split('/');
  if (segment === 'collection') {
    return { page: 'collection', category: param ? decodeURIComponent(param) : undefined };
  }
  if (segment === 'product' && param) {
    return { page: 'product', slug: decodeURIComponent(param) };
  }
  if (segment === 'bespoke') return { page: 'bespoke' };
  if (segment === 'engineering') return { page: 'engineering' };
  if (segment === 'journal') {
    return { page: 'journal', slug: param ? decodeURIComponent(param) : undefined };
  }
  if (segment === 'boutiques') {
    return {
      page: 'boutiques',
      tab: param === 'orders' ? 'orders' : 'ateliers',
    };
  }
  return { page: 'home' };
}

function routeToHash(route: RoutePath): string {
  switch (route.page) {
    case 'home':
      return '#/';
    case 'collection':
      return route.category
        ? `#/collection/${encodeURIComponent(route.category)}`
        : '#/collection';
    case 'product':
      return `#/product/${encodeURIComponent(route.slug)}`;
    case 'bespoke':
      return '#/bespoke';
    case 'engineering':
      return '#/engineering';
    case 'journal':
      return route.slug ? `#/journal/${encodeURIComponent(route.slug)}` : '#/journal';
    case 'boutiques':
      return route.tab === 'orders' ? '#/boutiques/orders' : '#/boutiques';
  }
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() =>
    parseHashToRoute(typeof window !== 'undefined' ? window.location.hash : '')
  );
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pure_flow_bag');
      return saved ? (JSON.parse(saved) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pure_flow_orders');
      return saved ? (JSON.parse(saved) as OrderRecord[]) : SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_flow_bag', JSON.stringify(cartItems));
    } catch {
      // ignore storage quota failures
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pure_flow_orders', JSON.stringify(orders));
    } catch {
      // ignore storage quota failures
    }
  }, [orders]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashToRoute(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute: RoutePath) => {
    const nextHash = routeToHash(nextRoute);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    setRoute(nextRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (incoming: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === incoming.cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === incoming.cartItemId
            ? { ...item, quantity: item.quantity + incoming.quantity }
            : item
        );
      }
      return [...prev, incoming];
    });
    setCartOpen(true);
  };

  const handleQuickAdd = (product: Product, finishIndex: number) => {
    const finish = product.finishes[finishIndex] || product.finishes[0];
    const cap = product.capacities[0];
    handleAddToCart({
      cartItemId: `${product.id}-${finish.id}-${cap.ml}-plain`,
      productId: product.id,
      name: product.name,
      series: product.series,
      image: finish.image,
      finishName: finish.name,
      finishHex: finish.hex,
      capacityLabel: cap.label,
      unitPrice: product.basePrice + cap.priceDelta,
      quantity: 1,
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handlePlaceOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F5F1] text-[#121417]">
      <Header
        currentRoute={route}
        onNavigate={navigate}
        cartCount={totalBagCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {route.page === 'home' && (
          <HomePage onNavigate={navigate} onQuickAdd={handleQuickAdd} />
        )}
        {route.page === 'collection' && (
          <CollectionPage
            key={route.category || 'all'}
            initialCategory={route.category}
            onNavigate={navigate}
            onQuickAdd={handleQuickAdd}
          />
        )}
        {route.page === 'product' && (
          <ProductDetailPage
            slug={route.slug}
            onNavigate={navigate}
            onAddToCart={handleAddToCart}
          />
        )}
        {route.page === 'bespoke' && (
          <BespokePage onAddToCart={handleAddToCart} />
        )}
        {route.page === 'engineering' && (
          <EngineeringPage onNavigate={navigate} />
        )}
        {route.page === 'journal' && (
          <JournalPage activeSlug={route.slug} onNavigate={navigate} />
        )}
        {route.page === 'boutiques' && (
          <BoutiquesPage
            key={route.tab || 'ateliers'}
            initialTab={route.tab}
            orders={orders}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
        onViewOrderTracking={() => navigate({ page: 'boutiques', tab: 'orders' })}
      />
    </div>
  );
}
