import { ArrowLeft, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import {
  formatPKR,
  FREE_DELIVERY_THRESHOLD,
  PAKISTAN_CITIES,
  STANDARD_DELIVERY_FEE,
} from '../data/products';
import { CartItem, OrderFormData, OrderRecord } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: (formData: OrderFormData) => OrderRecord;
  initialStep?: 'bag' | 'checkout';
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  initialStep = 'bag',
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>(initialStep);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    city: 'Lahore',
    address: '',
    postalCode: '',
    paymentMethod: 'COD',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setErrorMessage('');
    }
  }, [isOpen, initialStep]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const remainingForFreeShipping = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMessage('Please enter your full name, mobile number, and complete street address.');
      return;
    }
    setErrorMessage('');
    const order = onPlaceOrder(formData);
    setConfirmedOrder(order);
    setStep('confirmed');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag and Checkout"
      className="fixed inset-0 z-50 flex justify-end bg-[#1C1917]/45 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#FAF9F7] border-l border-[#E7E3DC] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-[#E7E3DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('bag')}
                aria-label="Back to shopping bag"
                className="p-1.5 -ml-1.5 text-[#57534E] hover:text-[#1C1917] rounded-md cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="font-display text-2xl font-medium text-[#1C1917]">
              {step === 'bag' && 'Shopping Bag'}
              {step === 'checkout' && 'Delivery & Payment'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="w-9 h-9 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 'confirmed' && confirmedOrder ? (
            <div className="space-y-6">
              <div className="p-5 bg-white border border-[#E7E3DC]">
                <div className="flex items-center gap-2.5 text-[#113D32]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold">
                    Order #{confirmedOrder.orderId} Confirmed
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#57534E] leading-relaxed">
                  {confirmedOrder.status}. Save your order reference below to check dispatch
                  progress anytime via Order Lookup.
                </p>
              </div>

              <div className="border border-[#E7E3DC] bg-white p-5 space-y-4 text-xs">
                <h3 className="font-semibold text-[#1C1917] uppercase tracking-wider">
                  Receipt Summary
                </h3>

                <div className="space-y-2 border-b border-[#E7E3DC] pb-4">
                  {confirmedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <span className="text-[#1C1917]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium tabular-nums text-[#1C1917]">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-[#57534E]">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="text-[#1C1917] font-medium">
                      {confirmedOrder.customer.paymentMethod === 'COD'
                        ? 'Cash on Delivery'
                        : 'Bank Transfer'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination</span>
                    <span className="text-[#1C1917]">{confirmedOrder.customer.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="tabular-nums text-[#1C1917]">
                      {confirmedOrder.deliveryFee === 0
                        ? 'Complimentary'
                        : formatPKR(confirmedOrder.deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E7E3DC] text-sm font-semibold text-[#1C1917]">
                    <span>Total Payable</span>
                    <span className="tabular-nums">{formatPKR(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 text-sm font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <ShoppingBag className="w-8 h-8 text-[#78716C] mb-3" strokeWidth={1.25} />
              <p className="font-display text-2xl text-[#1C1917]">Your shopping bag is empty</p>
              <p className="mt-2 text-sm text-[#57534E] max-w-[28ch]">
                Explore our unstitched 3-piece lawn, karandi, and jacquard suites to add fabrics.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-5 py-2.5 text-xs font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-6">
              {/* Free Delivery Indicator */}
              <div className="p-4 bg-white border border-[#E7E3DC] text-xs">
                {remainingForFreeShipping === 0 ? (
                  <p className="font-medium text-[#113D32]">
                    Complimentary nationwide delivery unlocked.
                  </p>
                ) : (
                  <p className="text-[#57534E]">
                    Add{' '}
                    <span className="font-semibold text-[#1C1917] tabular-nums">
                      {formatPKR(remainingForFreeShipping)}
                    </span>{' '}
                    more for complimentary nationwide shipping.
                  </p>
                )}
                <div className="mt-2.5 h-1.5 w-full bg-[#F3F1ED] overflow-hidden">
                  <div
                    className="h-full bg-[#113D32] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Cart Items */}
              <ul className="divide-y divide-[#E7E3DC] border-t border-b border-[#E7E3DC] bg-white px-4">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="py-4 flex gap-4">
                    <div className="w-20 aspect-[3/4] bg-[#F3F1ED] border border-[#E7E3DC] overflow-hidden shrink-0">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        fallbackTitle={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-[#1C1917] truncate">
                            {product.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(product.id)}
                            aria-label={`Remove ${product.name}`}
                            className="text-[#78716C] hover:text-[#1C1917] p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-[#78716C] mt-0.5">
                          {product.category} · {product.sku}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center border border-[#E7E3DC] rounded-md">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                            className="w-8 h-8 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-sm font-medium text-[#1C1917] tabular-nums">
                          {formatPKR(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form id="cod-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3 text-xs text-red-900 bg-red-50 border border-red-200"
                >
                  {errorMessage}
                </div>
              )}

              <div>
                <label
                  htmlFor="checkout-name"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sana Tariq"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md focus:border-[#113D32] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-phone"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Mobile Number (for Courier SMS)
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md focus:border-[#113D32] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs font-medium text-[#1C1917] mb-1.5"
                  >
                    City
                  </label>
                  <select
                    id="checkout-city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md focus:border-[#113D32] focus:outline-none"
                  >
                    {PAKISTAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-postal"
                    className="block text-xs font-medium text-[#1C1917] mb-1.5"
                  >
                    Postal Code
                  </label>
                  <input
                    id="checkout-postal"
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="54000"
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md focus:border-[#113D32] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-medium text-[#1C1917] mb-1.5"
                >
                  Street Address
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House / Street / Sector or Phase"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md focus:border-[#113D32] focus:outline-none"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#1C1917] mb-2">
                  Payment Method
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['COD', 'Bank Transfer'] as const).map((method) => {
                    const active = formData.paymentMethod === method;
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: method })}
                        className={`px-3 py-2.5 text-xs font-medium border rounded-md transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#113D32] text-white border-[#113D32]'
                            : 'bg-white text-[#1C1917] border-[#E7E3DC] hover:bg-[#F3F1ED]'
                        }`}
                      >
                        {method === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="px-6 py-5 border-t border-[#E7E3DC] bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#1C1917]">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Nationwide Shipping</span>
                <span className="tabular-nums text-[#1C1917]">
                  {deliveryFee === 0 ? 'Complimentary' : formatPKR(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E7E3DC] text-sm font-semibold text-[#1C1917]">
                <span>Total</span>
                <span className="tabular-nums">{formatPKR(total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3 text-sm font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                Proceed to Checkout
              </button>
            ) : (
              <button
                type="submit"
                form="cod-checkout-form"
                className="w-full py-3 text-sm font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer min-h-[44px]"
              >
                Confirm Order · {formatPKR(total)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
