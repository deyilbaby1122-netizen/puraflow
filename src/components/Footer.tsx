import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { RoutePath } from '../types';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#121417] text-[#F6F5F1] border-t border-[#121417]/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="font-serif text-3xl font-medium tracking-tight text-[#F6F5F1] cursor-pointer text-left"
            >
              Pure Flow
            </button>
            <p className="text-sm text-[#B7B9BC] leading-relaxed max-w-sm">
              Architectural hydration vessels machined in Zurich and glazed in Kyoto. Designed for zero-plastic contact, lifetime durability, and sensory stillness.
            </p>
            <p className="text-xs text-[#888C91] pt-1">
              Zurich · Tokyo · Paris · New York
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-medium tracking-wider uppercase text-[#888C91]">
              Vessels
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D5D7DA]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'collection' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'collection', category: 'Titanium' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grade-5 Titanium
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'collection', category: 'Glass' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Borosilicate Glass
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'bespoke' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bespoke Studio
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="font-sans text-xs font-medium tracking-wider uppercase text-[#888C91]">
              Maison
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D5D7DA]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'engineering' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thermal Engineering
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'journal' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Editorial Journal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'boutiques', tab: 'ateliers' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Flagship Boutiques
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'boutiques', tab: 'orders' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Private Dispatch Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-sans text-xs font-medium tracking-wider uppercase text-[#888C91]">
              Atelier Dispatch
            </h3>
            <p className="text-sm text-[#B7B9BC] leading-relaxed">
              Receive private notes on small-batch Kyoto glazes, numbered titanium runs, and boutique exhibitions.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2.5 py-3 px-4 bg-white/5 border border-white/15 rounded-sm text-sm text-[#F6F5F1]">
                <Check className="w-4 h-4 text-[#B69B78] shrink-0" aria-hidden="true" />
                <span>You are registered for Atelier Dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
                <div className="flex items-stretch gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="flex-1 min-w-0 bg-white/5 border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-[#888C91] rounded-sm focus:border-white/50 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium bg-[#F6F5F1] text-[#121417] hover:bg-[#E6E3DA] rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                {error && <p className="text-xs text-[#E29578]">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#888C91]">
          <p>© {new Date().getFullYear()} Pure Flow Atelier AG, Zurich. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Lifetime Structural Warranty</span>
            <span>Complimentary Global Courier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
