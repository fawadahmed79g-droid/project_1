import { FabricCategory } from '../types/store';

interface FooterProps {
  onSelectCategory: (category: FabricCategory) => void;
  onOpenOrderLookup: () => void;
}

export function Footer({ onSelectCategory, onOpenOrderLookup }: FooterProps) {
  const scrollToCollection = (category: FabricCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#E7E3DC] bg-[#FAF9F7]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E3DC]">
          <div className="md:col-span-5">
            <a href="#top" className="font-display text-2xl font-semibold text-[#1C1917]">
              Khan Fabrics
            </a>
            <p className="mt-3 text-sm text-[#57534E] leading-relaxed max-w-[38ch]">
              Pakistani unstitched textiles in Swiss voile lawn, cotton-silk jacquard, cambric, and
              winter karandi—cut to generous meterage for tailored wear.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-4">
              Fabric Categories
            </h3>
            <ul className="space-y-2.5 text-sm text-[#57534E]">
              {(
                [
                  'Swiss Voile Lawn',
                  'Jacquard & Silk',
                  'Winter Karandi',
                  'Cambric',
                ] as FabricCategory[]
              ).map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => scrollToCollection(cat)}
                    className="hover:text-[#1C1917] transition-colors cursor-pointer text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] mb-4">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-sm text-[#57534E]">
              <li>
                <button
                  type="button"
                  onClick={onOpenOrderLookup}
                  className="hover:text-[#1C1917] transition-colors cursor-pointer"
                >
                  Order Lookup &amp; Verification
                </button>
              </li>
              <li>
                <a href="#fabric-standards" className="hover:text-[#1C1917] transition-colors">
                  Yardage &amp; Weave Guide
                </a>
              </li>
              <li>
                <span>Cash on Delivery · Nationwide Pakistan</span>
              </li>
              <li>
                <span>Complimentary Delivery Over PKR 10,000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#78716C]">
          <p>© {new Date().getFullYear()} Khan Fabrics. All rights reserved.</p>
          <p>Unstitched 3-Piece Pakistani Textile Storefront</p>
        </div>
      </div>
    </footer>
  );
}
