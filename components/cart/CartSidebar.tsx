'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, Gift } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';

export default function CartSidebar() {
  const { cartOpen, setCartOpen, setCursorType } = useUIStore();
  const { items, updateQuantity, removeItem, discountPercentage, applyCoupon, getTotals } = useCartStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!cartOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={() => setCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md animate-in slide-in-from-right duration-400 ease-out">
          <div className="h-full flex flex-col bg-background/95 border-l border-border glass shadow-2xl">
            {/* Header */}
            <div className="px-6 py-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-accent" />
                <h3 className="font-display font-bold text-lg tracking-wide text-foreground">
                  Neural Cart
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/40 rounded-full transition-all duration-300"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4 stroke-1 animate-bounce" />
                  <p className="font-display font-medium text-foreground text-base">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                    Begin filling your cart with our premium collections.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      window.location.href = '/shop';
                    }}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-accent text-slate-950 font-display text-sm font-bold tracking-wider hover:bg-white hover:text-black transition-colors"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    Go Shop
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize || ''}-${item.selectedColor?.name || ''}-${index}`}
                    className="flex gap-4 p-3 rounded-xl bg-secondary/20 border border-border/60 hover:border-border/100 transition-colors"
                  >
                    {/* Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-secondary border border-border">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Meta details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-sm font-semibold tracking-wide text-foreground line-clamp-1">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground font-mono">
                          {item.selectedSize && (
                            <span className="border border-border/80 px-1 rounded">SZ: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              <span
                                className="h-2 w-2 rounded-full inline-block"
                                style={{ backgroundColor: item.selectedColor.value }}
                              />
                              {item.selectedColor.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border border-border rounded-lg bg-background p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor?.value)}
                            className="p-1 hover:text-accent text-muted-foreground transition-colors"
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold font-mono px-1 w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor?.value)}
                            className="p-1 hover:text-accent text-muted-foreground transition-colors"
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-semibold text-accent">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>

                    {/* Trash remove button */}
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedSize, item.selectedColor?.value)}
                      className="p-1 text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg self-start transition-colors"
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Totals summary */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border space-y-4 bg-secondary/10">
                {/* Coupon Code Panel */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. NEON25)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow px-3 py-2 bg-background border border-border rounded-xl text-xs uppercase font-mono text-foreground focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-secondary border border-border rounded-xl font-display text-xs font-semibold text-foreground hover:bg-border transition-colors flex items-center gap-1"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    <Gift className="h-3.5 w-3.5 text-accent" /> Apply
                  </button>
                </form>

                {couponSuccess && (
                  <p className="text-[11px] text-green-400 font-mono">Coupon Applied! {discountPercentage}% savings activated.</p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 font-mono">Invalid or expired syndicate code.</p>
                )}

                {/* Subtotals list */}
                <div className="space-y-1.5 text-sm font-sans">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-mono text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Syndicate Savings</span>
                      <span className="font-mono">-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Express Shipping</span>
                    <span className="font-mono text-foreground">
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Neural Tax (8%)</span>
                    <span className="font-mono text-foreground">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold border-t border-border/60 pt-3">
                    <span className="font-display">Total Charge</span>
                    <span className="font-mono text-accent text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-accent text-slate-950 font-display font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    <CreditCard className="h-4 w-4" /> Checkout Securely
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="w-full py-2.5 rounded-xl border border-border hover:border-foreground/45 text-center font-display text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors uppercase tracking-wider"
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    Full Cart Overview
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
