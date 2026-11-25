import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Minus, Plus, Trash2, X } from 'lucide-react';
import { CartItem, OrderRecord } from '../types';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onPlaceOrder: (order: OrderRecord) => void;
  onViewOrderTracking: () => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmation';

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onViewOrderTracking,
}) => {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');

  // Checkout state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Switzerland');
  const [deliveryMethod, setDeliveryMethod] = useState<OrderRecord['deliveryMethod']>('Express Courier');
  const [paymentMethod, setPaymentMethod] = useState<OrderRecord['paymentMethod']>('Card');
  const [checkoutError, setCheckoutError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const freeShippingThreshold = 200;
  const shippingFee = subtotal - discount >= freeShippingThreshold || subtotal === 0 ? 0 : 18;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'PURE10') {
      setAppliedPromo(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try PURE10 for 10% Atelier Privilege.');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !email.trim() || !shippingAddress.trim() || !city.trim() || !postalCode.trim()) {
      setCheckoutError('Please complete all required shipping fields.');
      return;
    }
    if (!email.includes('@')) {
      setCheckoutError('Please provide a valid email address for receipt delivery.');
      return;
    }
    setCheckoutError('');

    const orderNum = `PF-${Math.floor(1100 + Math.random() * 8800)}`;
    const newOrder: OrderRecord = {
      orderNumber: orderNum,
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      status: 'Confirmed',
      customerName: customerName.trim(),
      email: email.trim(),
      shippingAddress: shippingAddress.trim(),
      city: city.trim(),
      postalCode: postalCode.trim(),
      country,
      deliveryMethod,
      paymentMethod,
      items: [...items],
      subtotal,
      discount,
      shippingFee,
      total,
      giftNote: giftNote.trim() || undefined,
    };

    onPlaceOrder(newOrder);
    setConfirmedOrder(newOrder);
    setStep('confirmation');
  };

  const resetAndClose = () => {
    setStep('bag');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
    >
      <div className="fixed inset-0" onClick={resetAndClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-[#F6F5F1] text-[#121417] h-full flex flex-col shadow-2xl border-l border-[#121417]/10">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#121417]/10 flex items-center justify-between gap-4 bg-white">
          <div className="flex items-center gap-3">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                className="p-1.5 text-[#5A5E63] hover:text-[#121417] cursor-pointer"
                aria-label="Back to bag"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-serif text-2xl font-medium text-[#121417]">
              {step === 'bag' && 'Your Bag'}
              {step === 'checkout' && 'Private Checkout'}
              {step === 'confirmation' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 text-[#5A5E63] hover:text-[#121417] rounded-sm cursor-pointer"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Bag View */}
        {step === 'bag' && (
          <>
            {items.length > 0 && (
              <div className="px-6 py-3 bg-[#ECEAE3] border-b border-[#121417]/10 text-xs text-[#4A4E52]">
                <div className="flex items-center justify-between mb-1.5">
                  <span>
                    {subtotal >= freeShippingThreshold
                      ? 'Complimentary Express Courier unlocked'
                      : `Add $${freeShippingThreshold - subtotal} more for complimentary Express Courier`}
                  </span>
                  <span className="font-mono tabular-nums">{progressPercent}%</span>
                </div>
                <div className="w-full h-1 bg-[#121417]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#14232B] transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <p className="font-serif text-2xl text-[#121417]">Your bag is empty</p>
                  <p className="text-sm text-[#5A5E63] max-w-xs">
                    Explore our Grade-5 titanium vessels, smoked borosilicate carafes, or design a bespoke monogrammed piece.
                  </p>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-5 py-2.5 text-xs font-medium bg-[#14232B] text-[#F6F5F1] rounded-sm hover:bg-[#1E333E] transition-colors cursor-pointer"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <>
                  <ul className="divide-y divide-[#121417]/10">
                    {items.map((item) => (
                      <li key={item.cartItemId} className="py-4 first:pt-0 flex gap-4">
                        <div className="w-20 h-20 bg-[#ECEAE3] rounded-sm overflow-hidden shrink-0">
                          <ResilientImage
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-serif text-lg font-medium text-[#121417] leading-tight">
                                {item.name}
                              </h3>
                              <span className="font-mono text-sm font-medium tabular-nums">
                                ${item.unitPrice * item.quantity}
                              </span>
                            </div>
                            <p className="text-xs text-[#5A5E63] mt-1">
                              {item.finishName} · {item.capacityLabel}
                            </p>
                            {item.monogram && (
                              <p className="text-xs text-[#8A6D4B] mt-0.5 font-mono">
                                Monogram: {item.monogram}
                                {item.bespokeDetails ? ` (${item.bespokeDetails.engravingStyle})` : ''}
                              </p>
                            )}
                            {item.bespokeDetails && (
                              <p className="text-xs text-[#6B7075] mt-0.5">
                                {item.bespokeDetails.silhouette} · {item.bespokeDetails.capAlloy} Cap
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-[#121417]/15 bg-white rounded-sm">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                                className="w-8 h-8 flex items-center justify-center text-[#5A5E63] hover:text-[#121417] cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center font-mono text-xs tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                                className="w-8 h-8 flex items-center justify-center text-[#5A5E63] hover:text-[#121417] cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.cartItemId)}
                              className="inline-flex items-center gap-1 text-xs text-[#6B7075] hover:text-[#121417] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Gift Note & Promo Code */}
                  <div className="pt-4 border-t border-[#121417]/10 space-y-4">
                    <div>
                      <label htmlFor="gift-note" className="block text-xs font-medium text-[#5A5E63] mb-1.5">
                        Complimentary Linen Card Message (Optional)
                      </label>
                      <input
                        id="gift-note"
                        type="text"
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="Add a personal dedication..."
                        className="w-full bg-white border border-[#121417]/15 px-3 py-2 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                      />
                    </div>

                    <form onSubmit={handleApplyPromo} className="space-y-1.5">
                      <label htmlFor="promo-code" className="block text-xs font-medium text-[#5A5E63]">
                        Atelier Privilege Code (Hint: PURE10)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="promo-code"
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="PURE10"
                          className="flex-1 bg-white border border-[#121417]/15 px-3 py-2 text-sm uppercase font-mono rounded-sm focus:border-[#14232B] focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 text-xs font-medium bg-[#ECEAE3] hover:bg-[#DFDCD2] text-[#121417] border border-[#121417]/15 rounded-sm transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {appliedPromo && (
                        <p className="text-xs text-[#2B593F]">10% Atelier Privilege applied.</p>
                      )}
                      {promoError && <p className="text-xs text-[#9E3B2B]">{promoError}</p>}
                    </form>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 bg-white border-t border-[#121417]/10 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5A5E63]">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#2B593F]">
                      <span>Privilege (10%)</span>
                      <span className="font-mono tabular-nums">-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5A5E63]">
                    <span>Courier Shipping</span>
                    <span className="font-mono tabular-nums">
                      {shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#121417]/10 text-base font-medium text-[#121417]">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">${total}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep('checkout')}
                  className="w-full py-3.5 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Checkout View */}
        {step === 'checkout' && (
          <form onSubmit={handleCompleteOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-medium text-[#121417]">
                  Client & Delivery Details
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label htmlFor="chk-name" className="block text-xs text-[#5A5E63] mb-1">
                      Full Name *
                    </label>
                    <input
                      id="chk-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Julian Mercer"
                      className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-email" className="block text-xs text-[#5A5E63] mb-1">
                      Email for Receipt & Tracking *
                    </label>
                    <input
                      id="chk-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@studio.ch"
                      className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="chk-address" className="block text-xs text-[#5A5E63] mb-1">
                      Street Address *
                    </label>
                    <input
                      id="chk-address"
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Bahnhofstrasse 42"
                      className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="chk-city" className="block text-xs text-[#5A5E63] mb-1">
                        City *
                      </label>
                      <input
                        id="chk-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Zurich"
                        className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="chk-postal" className="block text-xs text-[#5A5E63] mb-1">
                        Postal Code *
                      </label>
                      <input
                        id="chk-postal"
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="8001"
                        className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="chk-country" className="block text-xs text-[#5A5E63] mb-1">
                      Destination Country
                    </label>
                    <select
                      id="chk-country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white border border-[#121417]/15 px-3 py-2.5 text-sm rounded-sm focus:border-[#14232B] focus:outline-none"
                    >
                      <option>Switzerland</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Japan</option>
                      <option>Germany</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#121417]/10">
                <h3 className="font-serif text-lg font-medium text-[#121417]">
                  Delivery Tier
                </h3>
                {(['Express Courier', 'Private Concierge', 'Atelier Pickup'] as const).map((tier) => (
                  <label
                    key={tier}
                    className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer text-sm ${
                      deliveryMethod === tier
                        ? 'border-[#14232B] bg-white'
                        : 'border-[#121417]/15 bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        checked={deliveryMethod === tier}
                        onChange={() => setDeliveryMethod(tier)}
                        className="accent-[#14232B]"
                      />
                      <span>{tier}</span>
                    </div>
                    <span className="font-mono text-xs text-[#5A5E63]">
                      {tier === 'Atelier Pickup' ? 'Same Day' : '2–3 Days'}
                    </span>
                  </label>
                ))}
              </div>

              <div className="space-y-2.5 pt-2 border-t border-[#121417]/10">
                <h3 className="font-serif text-lg font-medium text-[#121417]">
                  Settlement Method
                </h3>
                {(['Card', 'Concierge Cash on Delivery'] as const).map((method) => (
                  <label
                    key={method}
                    className={`flex items-center justify-between p-3 border rounded-sm cursor-pointer text-sm ${
                      paymentMethod === method
                        ? 'border-[#14232B] bg-white'
                        : 'border-[#121417]/15 bg-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-[#14232B]"
                      />
                      <span>{method}</span>
                    </div>
                    <span className="text-xs text-[#6B7075]">
                      {method === 'Card' ? 'Encrypted' : 'Pay upon courier arrival'}
                    </span>
                  </label>
                ))}
              </div>

              {checkoutError && (
                <p className="text-xs text-[#9E3B2B] bg-[#9E3B2B]/10 p-3 rounded-sm">
                  {checkoutError}
                </p>
              )}
            </div>

            <div className="px-6 py-5 bg-white border-t border-[#121417]/10 space-y-3">
              <div className="flex justify-between text-base font-medium text-[#121417]">
                <span>Total Due</span>
                <span className="font-mono tabular-nums">${total}</span>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
              >
                Confirm & Commission Order
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation Receipt */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="flex items-start gap-3 pb-5 border-b border-[#121417]/10">
              <CheckCircle2 className="w-6 h-6 text-[#2B593F] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#5A5E63]">
                  Order #{confirmedOrder.orderNumber} Confirmed — Preparing Shipment
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#121417] mt-1">
                  Thank you, {confirmedOrder.customerName}
                </h3>
                <p className="text-sm text-[#5A5E63] mt-1">
                  A formal receipt has been logged for {confirmedOrder.email}.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#121417]/10 p-4 rounded-sm space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#5A5E63]">Destination</span>
                <span className="text-right font-medium">
                  {confirmedOrder.shippingAddress}, {confirmedOrder.city} {confirmedOrder.postalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5E63]">Courier</span>
                <span>{confirmedOrder.deliveryMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5E63]">Payment</span>
                <span>{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#121417]/10 font-medium">
                <span>Total Settled</span>
                <span className="font-mono tabular-nums">${confirmedOrder.total}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-xs font-medium uppercase tracking-wider text-[#5A5E63]">
                Commissioned Vessels
              </h4>
              <ul className="space-y-2">
                {confirmedOrder.items.map((item) => (
                  <li
                    key={item.cartItemId}
                    className="flex items-center justify-between text-sm bg-white p-3 border border-[#121417]/8 rounded-sm"
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
                    <span className="font-mono text-sm tabular-nums">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  onViewOrderTracking();
                }}
                className="w-full py-3 text-sm font-medium bg-[#14232B] text-[#F6F5F1] hover:bg-[#1E333E] rounded-sm transition-colors cursor-pointer"
              >
                Track Order #{confirmedOrder.orderNumber}
              </button>
              <button
                type="button"
                onClick={resetAndClose}
                className="w-full py-3 text-sm font-medium bg-white border border-[#121417]/15 text-[#121417] hover:bg-[#ECEAE3] rounded-sm transition-colors cursor-pointer"
              >
                Return to Atelier
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
