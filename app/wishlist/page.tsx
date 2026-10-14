'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, RefreshCw } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';
import ProductCard from '@/components/shop/ProductCard';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const { setCursorType, addNotification } = useUIStore();

  const handleClearWishlist = () => {
    clearWishlist();
    addNotification('Wishlist Cleared', 'All saved specimens were discarded.', 'info');
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60 flex flex-col sm:flex-row justify-between items-baseline gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              SECURE SPEC INDEX
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
              Wishlist Specs
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light">
              Your private collection of high-caliber designs, saved for priority drop notifications or future acquisition phases.
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="px-4 py-2.5 bg-secondary/30 border border-border rounded-xl font-mono text-xs font-semibold text-muted-foreground hover:text-rose-500 hover:border-rose-500/30 transition-colors flex items-center gap-1.5"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <RefreshCw className="h-3.5 w-3.5" /> Discard All Saved
            </button>
          )}
        </div>

        {/* ================= GRID CONTENT ================= */}
        {items.length === 0 ? (
          <div className="mt-12 py-24 text-center bg-secondary/10 border border-border glass rounded-3xl max-w-2xl mx-auto">
            <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto stroke-1 mb-4 animate-pulse text-accent" />
            <h3 className="font-display font-bold text-foreground text-lg">No saved specifications</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              Scout our catalog archives and save elite specifications for future assembly drops.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block px-8 py-3.5 rounded-xl bg-accent text-slate-950 font-display text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              Examine Catalog
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
