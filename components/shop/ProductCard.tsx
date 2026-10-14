'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const { setQuickPreviewProduct, setCartOpen, setCursorType, addNotification } = useUIStore();

  const wishlisted = hasItem(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Select default size and color if available
    const size = product.sizes ? product.sizes[0] : undefined;
    const color = product.colors ? product.colors[0] : undefined;
    
    addItem(product, 1, size, color);
    addNotification('Added to Cart', `${product.name} has been added.`, 'success');
    setCartOpen(true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    addNotification(
      wishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      wishlisted ? `${product.name} removed.` : `${product.name} saved successfully.`,
      wishlisted ? 'info' : 'success'
    );
  };

  const handleQuickPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickPreviewProduct(product);
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div 
      className="group relative rounded-2xl bg-secondary/10 border border-border/40 hover:border-accent/40 glass-card p-3 flex flex-col h-full overflow-hidden transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {/* Badge container */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-1.5 font-mono text-[9px] font-bold tracking-widest text-slate-950 uppercase">
        {product.discountPercentage && (
          <span className="bg-accent px-2 py-0.5 rounded-full">
            -{product.discountPercentage}%
          </span>
        )}
        {product.bestSeller && (
          <span className="bg-primary text-white px-2 py-0.5 rounded-full">
            HOT
          </span>
        )}
      </div>

      {/* Product Image Frame */}
      <Link 
        href={`/product/${product.slug}`} 
        className="relative block aspect-square w-full rounded-xl overflow-hidden bg-secondary/40 border border-border/60"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Hover interactive overlay layer */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          {/* Quick Preview Button */}
          <button
            onClick={handleQuickPreview}
            className="p-3 bg-background hover:bg-accent text-foreground hover:text-slate-950 rounded-full shadow-lg border border-border scale-90 group-hover:scale-100 transition-all duration-300"
            aria-label="Quick View"
          >
            <Eye className="h-4.5 w-4.5" />
          </button>

          {/* Add to Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "p-3 rounded-full shadow-lg border border-border scale-90 group-hover:scale-100 transition-all duration-300",
              wishlisted 
                ? "bg-primary text-white hover:bg-rose-600 hover:border-rose-600" 
                : "bg-background hover:bg-accent text-foreground hover:text-slate-950"
            )}
            aria-label="Add to Wishlist"
          >
            <Heart className={cn("h-4.5 w-4.5", wishlisted && "fill-current")} />
          </button>
        </div>
      </Link>

      {/* Product Description */}
      <div className="flex-grow flex flex-col pt-4 px-1 pb-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {product.category.replace('-', ' ')}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-yellow-400 font-mono font-bold">
              <Star className="h-3 w-3 fill-current" /> {product.rating}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h4 className="font-display text-sm font-semibold tracking-wide text-foreground hover:text-accent transition-colors line-clamp-1">
              {product.name}
            </h4>
          </Link>
        </div>

        {/* Price & Cart row */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[11px] text-muted-foreground line-through font-mono">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="font-mono text-base font-semibold text-accent">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-2.5 bg-secondary hover:bg-accent text-muted-foreground hover:text-slate-950 border border-border rounded-xl transition-all duration-300"
            aria-label="Quick Add to Cart"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
