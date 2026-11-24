import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderLookup: () => void;
  onSelectCategory: (category: 'All' | 'Swiss Voile Lawn' | 'Jacquard & Silk' | 'Winter Karandi' | 'Cambric') => void;
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenOrderLookup,
  onSelectCategory,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string, category?: 'All') => {
    setMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-sm border-b border-[#E7E3DC]">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
        >
          Khan Fabrics
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('collection', 'All');
            }}
            className="hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#113D32]"
          >
            Collections
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('collection');
            }}
            className="hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#113D32]"
          >
            Unstitched
          </a>
          <a
            href="#fabric-standards"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('fabric-standards');
            }}
            className="hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#113D32]"
          >
            Fabric Guide
          </a>
          <button
            type="button"
            onClick={onOpenOrderLookup}
            className="hover:text-[#1C1917] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#113D32] cursor-pointer"
          >
            Order Lookup
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag with ${cartCount} items`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Bag</span>
            <span className="tabular-nums">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#1C1917] border border-[#E7E3DC] rounded-md hover:bg-[#F3F1ED] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#E7E3DC] bg-[#FAF9F7] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[#1C1917]"
        >
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('collection', 'All');
            }}
            className="py-2 border-b border-[#E7E3DC]/60"
          >
            Collections
          </a>
          <a
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('collection');
            }}
            className="py-2 border-b border-[#E7E3DC]/60"
          >
            Unstitched
          </a>
          <a
            href="#fabric-standards"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('fabric-standards');
            }}
            className="py-2 border-b border-[#E7E3DC]/60"
          >
            Fabric Guide
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderLookup();
            }}
            className="py-2 text-left"
          >
            Order Lookup
          </button>
        </nav>
      )}
    </header>
  );
}
