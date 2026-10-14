'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import { useUIStore } from '@/lib/store/useUIStore';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function QuickPreviewModal() {
  const { quickPreviewProduct, setQuickPreviewProduct, setCartOpen, setCursorType, addNotification } = useUIStore();
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(null);
  const quantity = 1;

  if (!quickPreviewProduct) return null;

  const product = quickPreviewProduct;
  const wishlisted = hasItem(product.id);

  // Initialize selected values if empty
  if (product.sizes && product.sizes.length > 0 && !selectedSize) {
    setSelectedSize(product.sizes[0]);
  }
  if (product.colors && product.colors.length > 0 && !selectedColor) {
    setSelectedColor(product.colors[0]);
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined);
    addNotification('Added to Cart', `${product.name} has been added.`, 'success');
    setQuickPreviewProduct(null);
    setCartOpen(true);
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    addNotification(
      wishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      wishlisted ? `${product.name} removed.` : `${product.name} saved successfully.`,
      wishlisted ? 'info' : 'success'
    );
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={() => setQuickPreviewProduct(null)}
      />

      {/* Dialog Frame */}
      <div className="relative w-full max-w-4xl bg-background/95 border border-border glass rounded-3xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickPreviewProduct(null)}
          className="absolute right-4 top-4 p-2 rounded-full bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border/80 transition-all z-20"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Frame */}
          <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-secondary/20 p-6 flex items-center justify-center border-r border-border/60">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-2xl p-6"
            />
          </div>

          {/* Right Column: Meta details */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category, Rating */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {product.category.replace('-', ' ')}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-400 font-mono font-bold">
                  <Star className="h-3.5 w-3.5 fill-current" /> {product.rating} ({product.reviewsCount} reviews)
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="font-display text-2xl font-bold tracking-wide text-foreground">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="font-mono text-xl font-bold text-accent">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selectors: Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Select Aesthetic: <span className="text-foreground">{selectedColor?.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "h-7 w-7 rounded-full border flex items-center justify-center transition-all",
                          selectedColor?.name === color.name 
                            ? "border-accent scale-110 shadow-[0_0_10px_rgba(6,182,212,0.4)]" 
                            : "border-border hover:scale-105"
                        )}
                        style={{ backgroundColor: color.value }}
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                        aria-label={`Select color ${color.name}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selectors: Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">
                    Choose Caliber: <span className="text-foreground">{selectedSize}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "h-8 px-3 rounded-lg border font-mono text-xs font-bold transition-all",
                          selectedSize === size
                            ? "border-accent text-accent bg-accent/5"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/45"
                        )}
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Inventory status: <span className="text-accent">{product.inventory > 10 ? 'In Stock' : `Few Units Left (${product.inventory})`}</span>
                </label>
              </div>
            </div>

            {/* Actions Footer row */}
            <div className="flex gap-3 mt-8">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-grow py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                <ShoppingBag className="h-4 w-4" /> Assemble To Cart
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={handleWishlistToggle}
                className={cn(
                  "p-3.5 border border-border rounded-xl transition-colors",
                  wishlisted 
                    ? "bg-primary text-white hover:bg-rose-600 hover:border-rose-600" 
                    : "hover:border-accent hover:text-accent"
                )}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                aria-label="Add to Wishlist"
              >
                <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
