import { Check, Minus, Plus, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPKR, FREE_DELIVERY_THRESHOLD } from '../data/products';
import { Product } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsZoomed(false);
    setJustAdded(false);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 bg-[#1C1917]/50 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-full sm:max-h-[92vh] overflow-y-auto bg-[#FAF9F7] border border-[#E7E3DC] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#E7E3DC]">
          <div className="flex items-center gap-2 text-xs text-[#57534E]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{product.sku}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="inline-flex items-center justify-center w-9 h-9 text-[#1C1917] hover:bg-[#F3F1ED] rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2-Column Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sticky Gallery */}
          <div className="lg:col-span-6 p-6 md:p-8 bg-[#F3F1ED]/70 border-b lg:border-b-0 lg:border-r border-[#E7E3DC]">
            <div className="lg:sticky lg:top-20">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE6DF] border border-[#E7E3DC]">
                <ResilientImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackTitle={product.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ease-out ${
                    isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  aria-label={isZoomed ? 'Zoom out fabric view' : 'Zoom in to inspect weave'}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[#FAF9F7]/95 text-[#1C1917] border border-[#E7E3DC] rounded-md hover:bg-white transition-colors cursor-pointer"
                >
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Reset View</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Inspect Weave</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Purchase Module */}
          <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#57534E]">
                <span>{product.pieceCount}</span>
                <span aria-hidden="true">·</span>
                <span>{product.season}</span>
              </div>

              <h2
                id="pdp-title"
                className="mt-2 font-display text-3xl md:text-4xl font-medium text-[#1C1917] tracking-tight"
              >
                {product.name}
              </h2>

              <div className="mt-4 flex items-baseline justify-between gap-4 pb-5 border-b border-[#E7E3DC]">
                <span className="text-2xl font-semibold text-[#1C1917] tabular-nums">
                  {formatPKR(product.price)}
                </span>
                <span className="text-xs font-medium text-[#113D32]">
                  {product.inStock ? 'In Stock · Ships in 24–48 hrs' : 'Currently Out of Stock'}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#57534E]">
                {product.description}
              </p>

              {/* Cloth Specifications Table */}
              <div className="mt-6">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-[#1C1917] mb-3">
                  Unstitched Cloth Breakdown
                </h3>
                <div className="border border-[#E7E3DC] bg-white divide-y divide-[#E7E3DC]">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.piece}
                      className="px-4 py-3 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <p className="font-medium text-[#1C1917]">{spec.piece}</p>
                        <p className="text-[#78716C] mt-0.5">{spec.fabric}</p>
                      </div>
                      <span className="font-medium text-[#1C1917] tabular-nums whitespace-nowrap shrink-0">
                        {spec.measurement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Craft & Care Details */}
              <dl className="mt-6 space-y-3 text-xs border-t border-[#E7E3DC] pt-5">
                <div className="grid grid-cols-3 gap-3">
                  <dt className="text-[#78716C] font-medium">Colorway</dt>
                  <dd className="col-span-2 text-[#1C1917]">{product.colorway}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <dt className="text-[#78716C] font-medium">Craft Detail</dt>
                  <dd className="col-span-2 text-[#1C1917]">{product.embroideryDetail}</dd>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <dt className="text-[#78716C] font-medium">Care</dt>
                  <dd className="col-span-2 text-[#1C1917]">{product.careInstructions}</dd>
                </div>
              </dl>
            </div>

            {/* Sticky / Contiguous Purchase Controls */}
            <div className="pt-6 border-t border-[#E7E3DC] space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#57534E]">Quantity</span>
                <div className="inline-flex items-center border border-[#E7E3DC] bg-white rounded-md">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 inline-flex items-center justify-center text-[#1C1917] hover:bg-[#F3F1ED] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer min-h-[44px]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPKR(product.price * quantity)}</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onBuyNow(product, quantity)}
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[#1C1917] bg-white hover:bg-[#F3F1ED] border border-[#1C1917]/25 rounded-md transition-colors cursor-pointer min-h-[44px]"
                >
                  Buy Now (COD)
                </button>
              </div>

              <p className="text-xs text-[#78716C]">
                Cash on Delivery available nationwide · Complimentary shipping on orders over{' '}
                <span className="tabular-nums">{formatPKR(FREE_DELIVERY_THRESHOLD)}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
