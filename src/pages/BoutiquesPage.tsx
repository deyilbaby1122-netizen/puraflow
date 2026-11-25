import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, PackageCheck, Search } from 'lucide-react';
import { BOUTIQUES, IMAGES } from '../data/catalog';
import { OrderRecord } from '../types';
import { ResilientImage } from '../components/ResilientImage';

interface BoutiquesPageProps {
  initialTab?: 'ateliers' | 'orders';
  orders: OrderRecord[];
}

export const BoutiquesPage: React.FC<BoutiquesPageProps> = ({
  initialTab = 'ateliers',
  orders,
}) => {
  const [tab, setTab] = useState<'ateliers' | 'orders'>(initialTab);
  const [selectedBoutiqueId, setSelectedBoutiqueId] = useState(BOUTIQUES[0].id);

  // Appointment Form
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-12-04');
  const [serviceType, setServiceType] = useState('Bespoke Engraving & Fitting');
  const [appointmentError, setAppointmentError] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<{
    boutique: string;
    date: string;
    name: string;
  } | null>(null);

  // Order Tracking
  const [orderLookup, setOrderLookup] = useState(orders[0]?.orderNumber || 'PF-1042');
  const matchedOrder = orders.find(
    (o) => o.orderNumber.toUpperCase() === orderLookup.trim().toUpperCase()
  );

  const activeBoutique =
    BOUTIQUES.find((b) => b.id === selectedBoutiqueId) || BOUTIQUES[0];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.includes('@')) {
      setAppointmentError('Please enter your full name and a valid email address.');
      return;
    }
    setAppointmentError('');
    setConfirmedAppointment({
      boutique: `${activeBoutique.city} — ${activeBoutique.district}`,
      date: preferredDate,
      name: clientName.trim(),
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-5 md:px-10 py-12 md:py-16 space-y-10">
      {/* Header + Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#121417]/10">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#6B7075]">
            Client Concierge
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-[#121417]">
            {tab === 'ateliers' ? 'Flagship Ateliers' : 'Order Verification & Tracking'}
          </h1>
        </div>

        <div className="flex items-center gap-1 p-1 bg-[#ECEAE3] rounded-sm self-start md:self-auto">
          <button
            type="button"
            onClick={() => setTab('ateliers')}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
              tab === 'ateliers'
                ? 'bg-white text-[#121417] shadow-xs'
                : 'text-[#5A5E63] hover:text-[#121417]'
            }`}
          >
            Boutiques & Appointments
          </button>
          <button
            type="button"
            onClick={() => setTab('orders')}
            className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer ${
              tab === 'orders'
                ? 'bg-white text-[#121417] shadow-xs'
                : 'text-[#5A5E63] hover:text-[#121417]'
            }`}
          >
            Order Tracking ({orders.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Boutiques & Private Concierge */}
      {tab === 'ateliers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* City Selector + Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BOUTIQUES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setSelectedBoutiqueId(b.id);
                    setConfirmedAppointment(null);
                  }}
                  className={`p-3.5 text-left border rounded-sm transition-colors cursor-pointer ${
                    b.id === selectedBoutiqueId
                      ? 'bg-[#14232B] text-[#F6F5F1] border-[#14232B]'
                      : 'bg-white text-[#121417] border-[#121417]/10 hover:border-[#121417]/30'
                  }`}
                >
                  <p className="font-serif text-lg font-medium">{b.city}</p>
                  <p
                    className={`text-xs ${
                      b.id === selectedBoutiqueId ? 'text-[#D8D2C5]' : 'text-[#6B7075]'
                    }`}
                  >
                    {b.district}
                  </p>
                </button>
              ))}
            </div>

            <div className="bg-white border border-[#121417]/10 rounded-sm overflow-hidden">
              <div className="aspect-[16/9] w-full bg-[#ECEAE3]">
                <ResilientImage
                  src={IMAGES.atelier}
                  alt={`Pure Flow ${activeBoutique.city} Atelier`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#121417]/8">
                  <h2 className="font-serif text-2xl font-medium text-[#121417]">
                    Pure Flow {activeBoutique.city}
                  </h2>
                  <span className="font-mono text-xs text-[#5A5E63]">{activeBoutique.phone}</span>
                </div>

                <p className="text-sm text-[#4A4E52] leading-relaxed">
                  {activeBoutique.architectNote}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#14232B] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-[#121417]">Address</p>
                      <p className="text-[#5A5E63] mt-0.5">{activeBoutique.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[#14232B] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-[#121417]">Atelier Hours</p>
                      <p className="text-[#5A5E63] mt-0.5">{activeBoutique.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#121417]/8 text-xs text-[#5A5E63]">
                  Services: {activeBoutique.services.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Private Concierge Appointment Form */}
          <div className="lg:col-span-5 bg-white border border-[#121417]/10 p-6 md:p-8 rounded-sm space-y-6">
            <div className="space-y-1.5">
              <h2 className="font-serif text-2xl font-medium text-[#121417]">
                Private Concierge Appointment
              </h2>
              <p className="text-sm text-[#5A5E63]">
                Reserve a one-on-one session at Pure Flow {activeBoutique.city} for bespoke engraving or alpine mineral tasting.
              </p>
            </div>

            {confirmedAppointment ? (
              <div className="p-5 bg-[#F6F5F1] border border-[#121417]/12 rounded-sm space-y-3">
                <div className="flex items-center gap-2 text-[#2B593F]">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  <span className="text-sm font-medium">Appointment Confirmed</span>
                </div>
                <p className="text-sm text-[#4A4E52]">
                  We look forward to welcoming <strong>{confirmedAppointment.name}</strong> at{' '}
                  {confirmedAppointment.boutique} on{' '}
                  <span className="font-mono">{confirmedAppointment.date}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmedAppointment(null)}
                  className="text-xs font-medium text-[#14232B] underline cursor-pointer"
                >
                  Schedule another visit
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="apt-name" className="block text-xs text-[#5A5E63] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="apt-name"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Sophia Laurent"
                    className="w-full bg-[#F6F5F1] border border-[#121417]/15 px-3.5 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="apt-email" className="block text-xs text-[#5A5E63] mb-1">
                    Email Address *
                  </label>
                  <input
                    id="apt-email"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="sophia@domain.com"
                    className="w-full bg-[#F6F5F1] border border-[#121417]/15 px-3.5 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="apt-date" className="block text-xs text-[#5A5E63] mb-1">
                      Preferred Date
                    </label>
                    <input
                      id="apt-date"
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-[#F6F5F1] border border-[#121417]/15 px-3 py-2.5 text-sm font-mono rounded-sm focus:border-[#14232B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="apt-service" className="block text-xs text-[#5A5E63] mb-1">
                      Consultation Focus
                    </label>
                    <select
                      id="apt-service"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-[#F6F5F1] border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                    >
                      <option>Bespoke Engraving & Fitting</option>
                      <option>Mineral Water Tasting</option>
                      <option>Gasket & Cap Servicing</option>
                    </select>
                  </div>
                </div>

                {appointmentError && (
                  <p className="text-xs text-[#9E3B2B]">{appointmentError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
                >
                  Confirm Atelier Visit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Order Tracking */}
      {tab === 'orders' && (
        <div className="max-w-3xl space-y-8">
          <div className="bg-white border border-[#121417]/10 p-6 rounded-sm space-y-4">
            <label htmlFor="order-lookup" className="block text-xs font-medium text-[#5A5E63]">
              Enter Order Reference Number
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-[#6B7075] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="order-lookup"
                  type="text"
                  value={orderLookup}
                  onChange={(e) => setOrderLookup(e.target.value)}
                  placeholder="PF-1042"
                  className="w-full bg-[#F6F5F1] border border-[#121417]/15 pl-10 pr-4 py-2.5 text-sm font-mono uppercase rounded-sm focus:border-[#14232B] focus:outline-none"
                />
              </div>
            </div>

            {orders.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B7075]">
                <span>Recent references:</span>
                {orders.map((o) => (
                  <button
                    key={o.orderNumber}
                    type="button"
                    onClick={() => setOrderLookup(o.orderNumber)}
                    className={`font-mono px-2 py-1 border rounded-sm cursor-pointer ${
                      o.orderNumber === matchedOrder?.orderNumber
                        ? 'border-[#14232B] bg-[#14232B] text-white'
                        : 'border-[#121417]/15 bg-[#F6F5F1] text-[#121417]'
                    }`}
                  >
                    #{o.orderNumber}
                  </button>
                ))}
              </div>
            )}
          </div>

          {matchedOrder ? (
            <div className="bg-white border border-[#121417]/10 p-6 md:p-8 rounded-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#121417]/10">
                <div className="flex items-center gap-3">
                  <PackageCheck className="w-5 h-5 text-[#14232B]" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs text-[#6B7075]">
                      ORDER #{matchedOrder.orderNumber} · {matchedOrder.createdAt}
                    </p>
                    <h2 className="font-serif text-2xl font-medium text-[#121417]">
                      {matchedOrder.status}
                    </h2>
                  </div>
                </div>
                <span className="font-mono text-lg font-medium tabular-nums">
                  ${matchedOrder.total}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="text-[#6B7075]">Client</p>
                  <p className="font-medium text-[#121417] mt-0.5">{matchedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-[#6B7075]">Destination</p>
                  <p className="font-medium text-[#121417] mt-0.5">
                    {matchedOrder.city}, {matchedOrder.country}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7075]">Dispatch Tier</p>
                  <p className="font-medium text-[#121417] mt-0.5">{matchedOrder.deliveryMethod}</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#121417]/10">
                <p className="text-xs font-medium text-[#6B7075]">Commissioned Items</p>
                {matchedOrder.items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between text-sm py-2 border-b border-[#121417]/6 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium text-[#121417]">
                        {item.quantity} × {item.name}
                      </p>
                      <p className="text-xs text-[#5A5E63]">
                        {item.finishName} · {item.capacityLabel}
                        {item.monogram ? ` · Monogram: ${item.monogram}` : ''}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#121417]/10 p-8 rounded-sm text-center space-y-2">
              <p className="font-serif text-xl text-[#121417]">No order found matching "{orderLookup}"</p>
              <p className="text-sm text-[#5A5E63]">
                Try sample order reference <span className="font-mono">PF-1042</span> or place a test order via the Shopping Bag.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
