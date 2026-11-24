import { ArrowRight } from 'lucide-react';
import { HERO_CAMPAIGN_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroProps {
  onExploreClick: () => void;
  onFabricGuideClick: () => void;
}

export function Hero({ onExploreClick, onFabricGuideClick }: HeroProps) {
  return (
    <section id="top" className="border-b border-[#E7E3DC]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider text-[#57534E] mb-4">
                Pakistani Unstitched Textiles · 3-Piece Ensembles
              </p>

              <h1
                className="font-display font-medium text-[#1C1917] tracking-[-0.02em] leading-[1.06] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 4.1vw, 4rem)' }}
              >
                Refined cloth, woven for tailored poise.
              </h1>

              <p className="mt-6 text-[15px] md:text-base leading-relaxed text-[#57534E] max-w-[46ch]">
                Discover Khan Fabrics’ curated unstitched 3-piece collections in Swiss voile lawn,
                cotton-silk jacquard, combed cambric, and winter karandi—cut to generous meterage for
                custom Pakistani tailoring.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 min-h-[44px]"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onFabricGuideClick}
                  className="text-sm font-medium text-[#1C1917] hover:text-[#113D32] py-2 border-b border-[#1C1917]/30 hover:border-[#113D32] transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Fabric Specifications
                </button>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-[#E7E3DC] grid grid-cols-2 gap-6 text-xs text-[#57534E]">
              <div>
                <p className="font-medium text-[#1C1917]">Complete 3-Piece Sets</p>
                <p className="mt-1 leading-relaxed">Shirt, trouser &amp; dupatta included with full cut yardage</p>
              </div>
              <div>
                <p className="font-medium text-[#1C1917]">Nationwide Delivery</p>
                <p className="mt-1 leading-relaxed">Cash on Delivery across Pakistan · Free over PKR 10,000</p>
              </div>
            </div>
          </div>

          {/* Campaign Visual Column */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[340px] lg:min-h-[520px] overflow-hidden bg-[#EAE6DF] border border-[#E7E3DC]">
              <ResilientImage
                src={HERO_CAMPAIGN_IMAGE}
                alt="Khan Fabrics emerald and antique gold embroidered unstitched lawn ensemble photographed in a sunlit travertine courtyard"
                fallbackTitle="Khan Fabrics Campaign"
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
