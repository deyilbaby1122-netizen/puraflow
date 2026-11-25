import React, { useState } from 'react';
import { ArrowRight, Check, Globe } from 'lucide-react';
import { REGIONS } from '../data/puraflowData';
import { PageRoute } from '../types';
import { PuraFlowLogo } from './PuraFlowLogo';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  selectedRegion: string;
  onChangeRegion: (code: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  selectedRegion,
  onChangeRegion,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = email.trim();
    if (!cleaned || !cleaned.includes('@') || !cleaned.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#0B1F3A] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/15">
          {/* Brand Summary */}
          <div className="md:col-span-4 space-y-5">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'home' })}
              className="cursor-pointer text-left"
              aria-label="PuraFlow Home"
            >
              <PuraFlowLogo variant="light" />
            </button>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Natural mineral water filtered for 15 years through protected alpine rocks. Bottled at the source in the French Alps and B Corp certified.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe className="w-4 h-4 text-[#E41B5B]" aria-hidden="true" />
              <label htmlFor="region-select" className="sr-only">
                Region
              </label>
              <select
                id="region-select"
                value={selectedRegion}
                onChange={(e) => onChangeRegion(e.target.value)}
                className="bg-white/10 border border-white/20 text-white text-xs px-3 py-1.5 rounded-full focus:outline-none cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.code} value={r.code} className="text-[#0B1F3A]">
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Columns mirroring Evian.com */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Our Water
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'water' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  15-Year Journey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'water' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  Mineral Composition
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'story' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  Fine Dining & Chefs
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-200">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'products', category: 'Everyday' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  Everyday Range
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'products', category: 'Sparkling' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  PuraFlow Sparkling
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'products', category: 'Prestige Glass' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  Prestige & Glass
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'products', category: 'Limited Editions' })}
                  className="hover:text-[#E41B5B] transition-colors cursor-pointer"
                >
                  Limited Editions
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Stay Hydrated · #puraflowwater
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Receive updates on limited-edition designer collaborations, sustainability milestones, and sporting partnerships.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 py-3 px-4 bg-white/10 border border-white/20 rounded-full text-sm text-white">
                <Check className="w-4 h-4 text-[#E41B5B] shrink-0" aria-hidden="true" />
                <span>Thank you for joining the PuraFlow community.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
                <div className="flex items-center gap-2">
                  <label htmlFor="puraflow-newsletter" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="puraflow-newsletter"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 min-w-0 bg-white/10 border border-white/20 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 rounded-full focus:border-[#E41B5B] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold bg-[#E41B5B] hover:bg-[#C8144D] text-white rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                {error && <p className="text-xs text-rose-300 pl-3">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} PuraFlow Natural Mineral Water · French Alps. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate({ page: 'sustainability' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              B Corp Certification
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'news' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Press & Newsroom
            </button>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'story' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Source Heritage
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
