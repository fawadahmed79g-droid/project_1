import { ArrowUpRight, Check, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { FABRIC_CATEGORIES, formatPKR } from '../data/products';
import { FabricCategory, Product } from '../types/store';
import { ResilientImage } from './ResilientImage';

interface CollectionSectionProps {
  products: Product[];
  selectedCategory: FabricCategory;
  onSelectCategory: (category: FabricCategory) => void;
  onOpenProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function CollectionSection({
  products,
  selectedCategory,
  onSelectCategory,
  onOpenProduct,
  onQuickAdd,
}: CollectionSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = products.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.colorway.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleAdd = (product: Product) => {
    onQuickAdd(product);
    setRecentlyAddedId(product.id);
    window.setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1500);
  };

  return (
    <section id="collection" className="py-16 md:py-24">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E7E3DC]">
          <div>
            <p className="text-xs font-medium tracking-wider text-[#57534E] mb-2">
              Unstitched Catalog
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-[#1C1917] tracking-tight text-balance">
              Seasonal &amp; Formal Fabrics
            </h2>
          </div>

          <p className="text-sm text-[#57534E] max-w-[42ch]">
            Select any ensemble to inspect cloth meterage, embroidery placement, and fabric care
            specifications.
          </p>
        </div>

        {/* Filter, Search, and Sort Toolbar */}
        <div className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter by fabric type"
            className="flex items-center gap-1 p-1 bg-[#F3F1ED] rounded-lg overflow-x-auto max-w-full"
          >
            {FABRIC_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[36px] ${
                    isActive
                      ? 'bg-white text-[#1C1917] shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fabric, color, or suit..."
                aria-label="Search fabrics"
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-sm bg-white border border-[#E7E3DC] rounded-md text-[#1C1917] placeholder:text-[#78716C] focus:border-[#113D32] focus:outline-none min-h-[40px]"
              />
            </div>

            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 text-sm bg-white border border-[#E7E3DC] rounded-md text-[#1C1917] focus:border-[#113D32] focus:outline-none cursor-pointer min-h-[40px]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center border border-[#E7E3DC] bg-white">
            <p className="font-display text-2xl text-[#1C1917]">No matching ensembles found</p>
            <p className="mt-2 text-sm text-[#57534E]">
              Try clearing your search term or viewing all fabric categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('All');
              }}
              className="mt-5 px-5 py-2.5 text-xs font-medium text-white bg-[#113D32] hover:bg-[#0B2B23] rounded-md transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group flex flex-col bg-white border border-[#E7E3DC] transition-transform duration-200 ease-out hover:-translate-y-0.5"
                >
                  {/* 3:4 Product Image Frame */}
                  <button
                    type="button"
                    onClick={() => onOpenProduct(product)}
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3F1ED] text-left cursor-pointer"
                    aria-label={`View details for ${product.name}`}
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.imageAlt}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  </button>

                  {/* Product Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      {/* Clean unboxed metadata with separator */}
                      <div className="flex items-center gap-2 text-xs text-[#78716C]">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.pieceCount}</span>
                      </div>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => onOpenProduct(product)}
                          className="text-left cursor-pointer group/title"
                        >
                          <h3 className="text-base font-semibold text-[#1C1917] group-hover/title:text-[#113D32] transition-colors">
                            {product.name}
                          </h3>
                        </button>
                        <span className="text-[15px] font-medium text-[#1C1917] tabular-nums whitespace-nowrap shrink-0">
                          {formatPKR(product.price)}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed line-clamp-2">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Consistent Baseline Actions */}
                    <div className="pt-3 border-t border-[#E7E3DC] flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenProduct(product)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer py-2 whitespace-nowrap shrink-0"
                      >
                        <span>Inspect Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 min-h-[38px] ${
                          isAdded
                            ? 'bg-[#1C1917] text-white'
                            : 'bg-[#113D32] hover:bg-[#0B2B23] text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <span>Add to Bag</span>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
