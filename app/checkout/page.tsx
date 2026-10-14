'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, ShieldCheck, MapPin, Send, CheckCircle, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export default function CheckoutPage() {
  const { setCursorType, addNotification } = useUIStore();
  const { items, clearCart, getTotals } = useCartStore();

  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping details state
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [deliveryMethod, setDeliveryMethod] = useState('express'); // 'express' or 'drone'

  // Payment details state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const totals = getTotals();
  const finalCharge = deliveryMethod === 'drone' ? totals.total + 20 : totals.total;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleConfirmOrder = () => {
    // Complete Order process
    const mockOrderId = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(mockOrderId);
    setOrderComplete(true);
    clearCart();
    addNotification('Order Confirmed', `Order ${mockOrderId} registered for delivery.`, 'success');
    
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#6366f1', '#8b5cf6', '#ffffff']
    });
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto stroke-1 mb-4" />
        <h3 className="font-display font-bold text-foreground text-lg">No active items for assembly</h3>
        <Link href="/shop" className="mt-6 px-6 py-2.5 rounded-xl bg-accent text-slate-950 font-display text-sm font-bold uppercase tracking-wider transition-colors">
          Browse Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ================= ORDER SUCCESS MODE ================= */}
        {orderComplete ? (
          <div className="mt-12 max-w-xl mx-auto py-16 px-6 text-center bg-secondary/15 border border-border glass rounded-3xl space-y-6 animate-in zoom-in-95 duration-400">
            <div className="h-16 w-16 bg-accent/20 border border-accent/60 text-accent rounded-2xl flex items-center justify-center mx-auto scale-110">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold">Transaction authorized</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
                Assembly Registered!
              </h2>
              <p className="text-xs text-muted-foreground font-mono">
                Order Reference Code: <span className="text-foreground font-bold">{orderId}</span>
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
              Your futuristic specifications are locked. Our automatic logistics system is currently calibrating your package assembly.
            </p>

            <div className="p-4 rounded-xl bg-background border border-border/80 text-left space-y-2 max-w-sm mx-auto font-mono text-[11px] text-muted-foreground">
              <p>DELIVERY PROTOCOL: <span className="text-foreground uppercase">{deliveryMethod}</span></p>
              <p>RECIPIENT: <span className="text-foreground">{fullName}</span></p>
              <p>COORDINATES: <span className="text-foreground">{address}, {city}</span></p>
            </div>

            <div className="pt-4 flex flex-col gap-2.5 max-w-sm mx-auto">
              <Link
                href={`/order-tracking?orderId=${orderId}`}
                className="w-full py-3.5 rounded-xl bg-accent text-slate-950 font-display font-bold text-xs tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                Track Live Drone Parcel
              </Link>
              <Link
                href="/shop"
                className="w-full py-2.5 border border-border rounded-xl font-display text-xs text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors uppercase tracking-wider"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                Return to Syndicate Archive
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* ================= STEPPED CHECKOUT HEADER ================= */}
            <div className="py-12 border-b border-border/60">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                SECURE CHECKOUT TERMINAL
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
                Final Assembly
              </h1>
              
              {/* Stepper Progress bar */}
              <div className="mt-8 flex gap-4 max-w-md">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-grow flex flex-col gap-2">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${
                      step >= s ? 'bg-accent shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'bg-secondary'
                    }`} />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground text-center">
                      {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================= LAYOUT COLUMNS ================= */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Stepped Form panels */}
              <div className="lg:col-span-8">
                
                {/* STEP 1: Shipping Addresses */}
                {step === 1 && (
                  <form onSubmit={handleNextStep} className="space-y-6 bg-secondary/15 border border-border glass p-6 sm:p-8 rounded-3xl">
                    <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                      <MapPin className="h-5 w-5 text-accent" /> Coordinates Destination
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Full Identity Name</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Sector Destination Country</label>
                        <input
                          type="text"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="e.g. United States"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Physical Coordinate Address</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Street, Sectors, Room#"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">City Grid</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Neo Tokyo"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Postal/Zip Code</label>
                        <input
                          type="text"
                          required
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="Zip"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    {/* Delivery Methods selection */}
                    <div className="space-y-3 pt-4 border-t border-border/60">
                      <label className="font-mono text-[10px] text-muted-foreground uppercase block">Delivery Channel Protocol</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('express')}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                            deliveryMethod === 'express' 
                              ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                              : 'border-border bg-background hover:bg-secondary/40'
                          }`}
                          onMouseEnter={() => handleHover(true)}
                          onMouseLeave={() => handleHover(false)}
                        >
                          <span className="font-display font-bold text-sm text-foreground">Quantum Express Courier</span>
                          <span className="font-mono text-xs text-accent">FREE OVER $150 (Or $15.00)</span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase">ETA: 2-3 Days</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('drone')}
                          className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                            deliveryMethod === 'drone' 
                              ? 'border-accent bg-accent/5 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                              : 'border-border bg-background hover:bg-secondary/40'
                          }`}
                          onMouseEnter={() => handleHover(true)}
                          onMouseLeave={() => handleHover(false)}
                        >
                          <span className="font-display font-bold text-sm text-foreground">Automated Drone Air Parcel</span>
                          <span className="font-mono text-xs text-accent">ADDITIONAL +$20.00</span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase">ETA: 1-3 Hours</span>
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                    >
                      PROCEED TO PAYMENT <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                )}

                {/* STEP 2: Payment Options */}
                {step === 2 && (
                  <form onSubmit={handleNextStep} className="space-y-6 bg-secondary/15 border border-border glass p-6 sm:p-8 rounded-3xl">
                    <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                      <CreditCard className="h-5 w-5 text-accent" /> Financial Authorization
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Credit Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                          placeholder="4111 2222 3333 4444"
                          className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Expiration MM/YY</label>
                          <input
                            type="text"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.substring(0, 5))}
                            placeholder="12/28"
                            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">CVC Code</label>
                          <input
                            type="password"
                            required
                            value={cardCVC}
                            onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, '').substring(0, 4))}
                            placeholder="***"
                            className="w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="py-3 px-6 border border-border rounded-xl font-display font-semibold text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                      >
                        <ArrowLeft className="h-4 w-4" /> BACK
                      </button>
                      <button
                        type="submit"
                        className="flex-grow py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                      >
                        REVIEW SPECIFICATIONS <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: Review and Place Order */}
                {step === 3 && (
                  <div className="space-y-6 bg-secondary/15 border border-border glass p-6 sm:p-8 rounded-3xl">
                    <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
                      <ShieldCheck className="h-5 w-5 text-accent" /> Review Final Calibers
                    </h3>

                    {/* Order summary checklist preview */}
                    <div className="space-y-3 font-sans text-xs text-muted-foreground leading-relaxed">
                      <p>SHIPPING IDENT: <span className="text-foreground font-bold">{fullName}</span></p>
                      <p>DELIVERY PROTOCOL: <span className="text-accent uppercase font-bold">{deliveryMethod} parcel</span></p>
                      <p>COORDINATES: <span className="text-foreground font-bold">{address}, {city}, {zipCode}</span></p>
                      <p>PAYMENT METHOD: <span className="text-foreground font-bold">Credit Card ending in *{cardNumber.slice(-4) || '4444'}</span></p>
                    </div>

                    <div className="flex gap-4 border-t border-border/60 pt-6">
                      <button
                        onClick={handlePrevStep}
                        className="py-3 px-6 border border-border rounded-xl font-display font-semibold text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                      >
                        <ArrowLeft className="h-4 w-4" /> BACK
                      </button>
                      
                      <button
                        onClick={handleConfirmOrder}
                        className="flex-grow py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                        onMouseEnter={() => handleHover(true)}
                        onMouseLeave={() => handleHover(false)}
                      >
                        <Send className="h-4 w-4" /> CONFIRM & AUTHORIZE ORDER
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: Interactive Cart Summary row */}
              <div className="lg:col-span-4 bg-secondary/15 border border-border glass p-6 rounded-3xl space-y-6">
                <h3 className="font-display font-bold text-base text-foreground border-b border-border/60 pb-3">
                  Assemble Checklist
                </h3>

                {/* Short items preview list */}
                <div className="space-y-3.5 max-h-60 overflow-y-auto pr-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <Image src={item.product.images[0]} alt={item.product.name} width={48} height={48} className="h-12 w-12 rounded-lg object-cover border border-border" />
                      <div className="flex-grow text-xs truncate">
                        <p className="text-foreground font-semibold truncate">{item.product.name}</p>
                        <p className="text-muted-foreground font-mono">Qty: {item.quantity} x {formatPrice(item.product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals breakdown summary */}
                <div className="space-y-3 pt-4 border-t border-border/60 text-xs font-sans">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Assembly Subtotal</span>
                    <span className="font-mono text-foreground">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {totals.discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Syndicate Coupon savings</span>
                      <span className="font-mono">-{formatPrice(totals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Standard Shipping</span>
                    <span className="font-mono text-foreground">{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}</span>
                  </div>
                  {deliveryMethod === 'drone' && (
                    <div className="flex justify-between text-accent font-semibold">
                      <span>Drone Air Dispatch surcharge</span>
                      <span className="font-mono">+$20.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Neural Tax (8%)</span>
                    <span className="font-mono text-foreground">{formatPrice(totals.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-border/60 pt-3">
                    <span className="font-display">Total Charged</span>
                    <span className="font-mono text-accent text-base">{formatPrice(finalCharge)}</span>
                  </div>
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
