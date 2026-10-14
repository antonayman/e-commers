'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, RefreshCw, Grid } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/data';
import { useUIStore } from '@/lib/store/useUIStore';
import ProductCard from '@/components/shop/ProductCard';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import { cn } from '@/lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();
  const { setCursorType } = useUIStore();

  const urlCategory = searchParams.get('category') ?? 'all';
  const [prevUrlCategory, setPrevUrlCategory] = useState(urlCategory);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);

  if (urlCategory !== prevUrlCategory) {
    setPrevUrlCategory(urlCategory);
    setSelectedCategory(urlCategory);
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(600);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags?.some(t => t.includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSale = searchParams.get('sale') === 'true' ? !!product.discountPercentage : true;

    return matchesSearch && matchesCategory && matchesPrice && matchesSale;
  }).sort((a, b) => {
    if (selectedSort === 'price-low') return a.price - b.price;
    if (selectedSort === 'price-high') return b.price - a.price;
    if (selectedSort === 'rating') return b.rating - a.rating;
    // Featured (default)
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedSort('featured');
    setMaxPrice(600);
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            NEURAL REPOSITORY
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Syndicate Shop
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light leading-relaxed">
            Search our comprehensive archive of smart exo-apparel, bio-wearable audio systems, crystalline titanium watches, and self-lacing cybernetic sneakers.
          </p>
        </div>

        {/* ================= FILTERS & SEARCH TOP BAR ================= */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4 justify-between items-center bg-secondary/10 border border-border/80 glass p-4 rounded-2xl">
          {/* Search box input */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search specifications by name, tags, or keys..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            {/* Filter Toggle Mobile */}
            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-secondary/40"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <SlidersHorizontal className="h-4 w-4 text-accent" /> Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">Sort:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none focus:border-accent"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                <option value="featured">Prime Priority</option>
                <option value="price-low">Price: Low - High</option>
                <option value="price-high">Price: High - Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= GRID CONTENT ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Filters (Desktop) */}
          <aside className={cn(
            "lg:col-span-3 space-y-6 lg:block",
            showFiltersMobile ? "block animate-in slide-in-from-top duration-300" : "hidden"
          )}>
            <div className="bg-secondary/10 border border-border/80 glass p-5 rounded-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="font-display font-bold text-sm tracking-wide text-foreground">
                  Refine Caliber
                </h3>
                <button
                  onClick={resetFilters}
                  className="font-mono text-[10px] text-muted-foreground hover:text-accent flex items-center gap-1 transition-colors uppercase"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  <RefreshCw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Category Options */}
              <div className="space-y-3">
                <label className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Category Index
                </label>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={cn(
                      "text-left px-3 py-2 rounded-xl text-xs transition-colors",
                      selectedCategory === 'all'
                        ? "bg-accent/15 border border-accent/40 text-accent font-semibold"
                        : "border border-transparent hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                    )}
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    All Classes
                  </button>
                  {MOCK_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={cn(
                        "text-left px-3 py-2 rounded-xl text-xs transition-colors",
                        selectedCategory === cat.slug
                          ? "bg-accent/15 border border-accent/40 text-accent font-semibold"
                          : "border border-transparent hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                      )}
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="flex justify-between items-baseline font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span>Price Cap</span>
                  <span className="text-accent">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="700"
                  step="20"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-accent bg-secondary/80 h-1 rounded"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                />
              </div>

              {/* Syndicate drop tag info */}
              {searchParams.get('sale') === 'true' && (
                <div className="pt-3 border-t border-border/60">
                  <span className="inline-block px-2.5 py-1 rounded bg-accent text-slate-950 font-mono text-[10px] font-bold tracking-widest uppercase">
                    Syndicate Drop Active
                  </span>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT PANEL: Product Grid */}
          <main className="lg:col-span-9 space-y-8">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-secondary/10 border border-border/80 glass rounded-2xl">
                <Grid className="h-12 w-12 text-muted-foreground/30 mx-auto stroke-1 mb-4" />
                <h4 className="font-display font-bold text-foreground text-lg">No Specs Found</h4>
                <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                  Adjust your caliber parameters or search triggers to locate relevant items.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-accent text-slate-950 font-display text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-all"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  Clear Parameters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
