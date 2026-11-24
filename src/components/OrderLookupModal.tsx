import { Search, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { formatPKR, SAMPLE_ORDER } from '../data/products';
import { OrderRecord } from '../types/store';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export function OrderLookupModal({ isOpen, onClose, orders }: OrderLookupModalProps) {
  const [queryId, setQueryId] = useState('');
  const [result, setResult] = useState<OrderRecord | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lookupOrder = (idToFind: string) => {
    const normalized = idToFind.trim().replace(/^#/, '').toUpperCase();
    const allOrders = [SAMPLE_ORDER, ...orders];
    const match = allOrders.find((o) => o.orderId.toUpperCase() === normalized) || null;
    setResult(match);
    setSearched(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    lookupOrder(queryId);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-lookup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF9F7] border border-[#E7E3DC] shadow-xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7E3DC]">
          <div>
            <h2
              id="order-lookup-title"
              className="font-display text-2xl font-medium text-[#1C1917]"
            >
              Order Verification &amp; Lookup
            </h2>
            <p className="mt-1 text-xs text-[#57534E]">
              Enter your Khan Fabrics order number to review dispatch status and receipt details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close order lookup"
            className="w-9 h-9 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] rounded-md cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search
              className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={queryId}
              onChange={(e) => setQueryId(e.target.value)}
              placeholder="e.g. KF-10420"
              aria-label="Order reference number"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E7E3DC] rounded-md text-[#1C1917] focus:border-[#113D32] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Check Status
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#78716C]">
          <span>Try reference:</span>
          <button
            type="button"
            onClick={() => {
              setQueryId(SAMPLE_ORDER.orderId);
              lookupOrder(SAMPLE_ORDER.orderId);
            }}
            className="text-[#113D32] font-medium underline underline-offset-2 cursor-pointer tabular-nums"
          >
            {SAMPLE_ORDER.orderId}
          </button>
          {orders.slice(0, 2).map((order) => (
            <button
              key={order.orderId}
              type="button"
              onClick={() => {
                setQueryId(order.orderId);
                lookupOrder(order.orderId);
              }}
              className="text-[#113D32] font-medium underline underline-offset-2 cursor-pointer tabular-nums"
            >
              {order.orderId}
            </button>
          ))}
        </div>

        {searched && (
          <div className="mt-6 pt-5 border-t border-[#E7E3DC]">
            {result ? (
              <div className="bg-white border border-[#E7E3DC] p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-[#1C1917] tabular-nums">
                    Order #{result.orderId}
                  </span>
                  <span className="font-medium text-[#113D32]">{result.status}</span>
                </div>

                <div className="text-[#57534E] space-y-1">
                  <p>
                    Recipient: <span className="text-[#1C1917]">{result.customer.fullName}</span> (
                    {result.customer.city})
                  </p>
                  <p>
                    Payment:{' '}
                    <span className="text-[#1C1917]">
                      {result.customer.paymentMethod === 'COD'
                        ? 'Cash on Delivery'
                        : 'Bank Transfer'}
                    </span>
                  </p>
                </div>

                <div className="border-t border-[#E7E3DC] pt-3 space-y-1.5">
                  {result.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-[#1C1917]">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="tabular-nums text-[#1C1917]">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-[#E7E3DC] font-semibold text-[#1C1917]">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPKR(result.total)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#57534E]">
                No order found matching <span className="font-medium text-[#1C1917]">{queryId}</span>.
                Please verify your order ID and try again.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
