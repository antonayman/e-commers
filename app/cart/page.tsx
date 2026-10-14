'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Gift } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function CartPage() {
  const { setCursorType, addNotification } = useUIStore();
  const { items, updateQuantity, removeItem, discountPercentage, applyCoupon, getTotals } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const { subtotal, discount, shipping, tax, total } = getTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    setCouponSuccess(false);
    if (couponInput.trim()) {
      const success = applyCoupon(couponInput);
      if (success) {
        setCouponSuccess(true);
      } else {
        setCouponError(true);
      }
    }
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
            ASSEMBLY TERMINAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Shopping Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 py-24 text-center bg-secondary/10 border border-border glass rounded-3xl max-w-2xl mx-auto">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto stroke-1 mb-4 animate-bounce" />
            <h3 className="font-display font-bold text-foreground text-lg">Your assembly is empty</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs mx-auto">
              Return to our index drops and acquire premium components.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-block px-8 py-3.5 rounded-xl bg-accent text-slate-950 font-display text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              Browse Shop Catalog
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Cart Items list */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}-${index}`}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-secondary/15 border border-border glass items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    {/* Image */}
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-xl object-cover border border-border bg-secondary"
                    />

                    {/* Metadata details */}
                    <div className="space-y-1">
                      <h3 className="font-display text-sm sm:text-base font-bold text-foreground line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="font-mono text-xs text-accent font-semibold">
                        {formatPrice(item.product.price)}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground font-mono">
                        {item.selectedSize && (
                          <span className="border border-border/80 px-1 rounded uppercase">SZ: {item.selectedSize}</span>
                        )}
                        {item.selectedColor && (
                          <span className="flex items-center gap-1 border border-border/80 px-1 rounded">
                            <span
                              className="h-1.5 w-1.5 rounded-full inline-block"
                              style={{ backgroundColor: item.selectedColor.value }}
                            />
                            {item.selectedColor.name.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and removal controllers */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-border/60">
                    {/* Controls */}
                    <div className="flex items-center gap-2.5 border border-border rounded-xl bg-background p-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor?.value)}
                        className="p-1 hover:text-accent text-muted-foreground transition-colors"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor?.value)}
                        className="p-1 hover:text-accent text-muted-foreground transition-colors"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Total Row */}
                    <span className="font-mono text-sm font-bold text-accent min-w-[70px] text-right">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={() => {
                        removeItem(item.product.id, item.selectedSize, item.selectedColor?.value);
                        addNotification('Item Removed', 'The item was discarded from assembly.', 'info');
                      }}
                      className="p-2 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors"
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT COLUMN: Total Summary Block */}
            <div className="lg:col-span-4 bg-secondary/15 border border-border glass p-6 rounded-3xl space-y-6">
              <h3 className="font-display font-bold text-lg text-foreground border-b border-border/60 pb-3">
                Assembly Summary
              </h3>

              {/* Coupon form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Syndicate Code"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-grow px-3 py-2.5 bg-background border border-border rounded-xl text-xs uppercase font-mono text-foreground focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-secondary border border-border rounded-xl font-display text-xs font-semibold text-foreground hover:bg-border transition-colors flex items-center gap-1.5"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  <Gift className="h-3.5 w-3.5 text-accent" /> Verify
                </button>
              </form>

              {couponSuccess && (
                <p className="text-[11px] text-green-400 font-mono">Syndicate verified: {discountPercentage}% savings active.</p>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-400 font-mono">syndicate code unknown or terminated.</p>
              )}

              {/* Totals Summary */}
              <div className="space-y-3.5 text-sm font-sans">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono text-foreground">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount code applied</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Express Drone Delivery</span>
                  <span className="font-mono text-foreground">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Neural Tax (8%)</span>
                  <span className="font-mono text-foreground">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold border-t border-border/60 pt-4">
                  <span className="font-display">Total Charge</span>
                  <span className="font-mono text-accent text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                <CreditCard className="h-4 w-4" /> SECURE ASSEMBLY CHECKOUT
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
