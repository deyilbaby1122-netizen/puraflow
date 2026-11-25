import React, { useState } from 'react';
import { CheckCircle2, MapPin, X } from 'lucide-react';
import { PURAFLOW_PRODUCTS } from '../data/puraflowData';
import { PageRoute } from '../types';

interface FindPuraFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

const DISTRIBUTORS = [
  { region: 'United Kingdom & Europe', stockists: 'Waitrose, Selfridges, Harrods, Monoprix, Carrefour Gourmet' },
  { region: 'North America', stockists: 'Whole Foods Market, Erewhon, Dean & DeLuca, Fine Hotels' },
  { region: 'Asia Pacific', stockists: 'Isetan, Takashimaya, Meidi-Ya, Dean & DeLuca Tokyo' },
];

export const FindPuraFlowModal: React.FC<FindPuraFlowModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [inquiryType, setInquiryType] = useState<'Home Delivery' | 'Fine Dining & Hospitality'>('Home Delivery');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredRange, setPreferredRange] = useState(PURAFLOW_PRODUCTS[0].name);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@')) {
      setError('Please enter your name and a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1F3A]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Find PuraFlow Stockists and Hospitality Supply"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-[#0B1F3A]">
              Find PuraFlow
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Retail stockists, home case delivery & hospitality supply
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-[#0B1F3A] rounded-full cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Global Stockists */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E41B5B]" aria-hidden="true" />
              <span>Selected Global Retailers</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {DISTRIBUTORS.map((d) => (
                <div
                  key={d.region}
                  className="p-3.5 bg-[#F4F8FC] rounded-xl border border-slate-200/70"
                >
                  <p className="text-xs font-semibold text-[#0B1F3A]">{d.region}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{d.stockists}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Case / Hospitality Inquiry */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-full">
              {(['Home Delivery', 'Fine Dining & Hospitality'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setInquiryType(mode);
                    setSubmitted(false);
                  }}
                  className={`flex-1 py-2 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                    inquiryType === mode
                      ? 'bg-white text-[#0B1F3A] shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="p-5 bg-[#F4F8FC] rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Request Received</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our {inquiryType.toLowerCase()} team will contact <strong>{name}</strong> at{' '}
                  {email} regarding <strong>{preferredRange}</strong> availability.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate({ page: 'products' });
                  }}
                  className="text-xs font-semibold text-[#E41B5B] hover:underline cursor-pointer pt-1"
                >
                  Browse Full Bottle Catalog →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name or Venue"
                    aria-label="Full Name or Venue"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#E41B5B] focus:outline-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    aria-label="Email Address"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:border-[#E41B5B] focus:outline-none"
                  />
                </div>
                <select
                  value={preferredRange}
                  onChange={(e) => setPreferredRange(e.target.value)}
                  aria-label="Preferred bottle range"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:border-[#E41B5B] focus:outline-none"
                >
                  {PURAFLOW_PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.range})
                    </option>
                  ))}
                </select>
                {error && <p className="text-xs text-[#E41B5B]">{error}</p>}
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-[#E41B5B] hover:bg-[#C8144D] rounded-full transition-colors cursor-pointer"
                >
                  Request Stockist & Supply Details
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
