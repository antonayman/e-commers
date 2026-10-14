'use client';

import React, { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Compass, Truck, Package, CheckCircle2, HelpCircle } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/data';
import { useUIStore } from '@/lib/store/useUIStore';
import Image from 'next/image';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import { cn, formatPrice } from '@/lib/utils';

function OrderTrackingContent() {
  const searchParams = useSearchParams();
  const { setCursorType } = useUIStore();

  const findOrder = useCallback((id: string) => {
    const cleanedId = id.trim().toUpperCase();
    if (!cleanedId) return null;
    const matched = MOCK_ORDERS.find((o) => o.id === cleanedId);
    
    if (matched) {
      return matched;
    } else if (cleanedId.startsWith('LX-')) {
      return {
        id: cleanedId,
        date: new Date().toISOString().split('T')[0],
        status: 'processing' as const,
        items: [
          {
            productId: 'prod-mock',
            name: 'Futuristic Caliber Custom Specs',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
          }
        ],
        shippingAddress: {
          fullName: 'Syndicate Operative',
          address: 'Main Grid Highway, Block 12',
          city: 'New Chicago',
          postalCode: '60601',
          country: 'United States',
        },
        shippingMethod: 'Drone Air Delivery',
        paymentMethod: 'NeuroPay Secure',
        subtotal: 199.99,
        tax: 16.00,
        shippingCost: 0,
        discount: 0,
        total: 215.99,
      };
    }
    return null;
  }, []);

  const urlOrderId = searchParams.get('orderId') ?? '';
  const [prevUrlOrderId, setPrevUrlOrderId] = useState(urlOrderId);
  const [inputOrderId, setInputOrderId] = useState(urlOrderId);
  const [activeOrder, setActiveOrder] = useState<typeof MOCK_ORDERS[0] | null>(() => findOrder(urlOrderId));
  const [searched, setSearched] = useState(() => Boolean(urlOrderId));

  if (urlOrderId !== prevUrlOrderId) {
    setPrevUrlOrderId(urlOrderId);
    setInputOrderId(urlOrderId);
    setActiveOrder(findOrder(urlOrderId));
    setSearched(Boolean(urlOrderId));
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setActiveOrder(findOrder(inputOrderId));
  };


  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  // Status index mapping
  const getStatusStep = (status: string) => {
    if (status === 'processing') return 1;
    if (status === 'shipped') return 2;
    if (status === 'delivered') return 3;
    return 1;
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            LOGISTICS CENTRAL
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Track Drone Parcel
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light">
            Locate your drone package flight vectors and order processing timelines instantly.
          </p>
        </div>

        {/* ================= SEARCH INPUT BLOCK ================= */}
        <div className="mt-8 max-w-xl mx-auto bg-secondary/15 border border-border glass p-6 rounded-3xl space-y-4 text-center">
          <h3 className="font-display font-bold text-sm tracking-wider uppercase text-foreground">
            Enter Order Code
          </h3>
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g. LX-88902"
              value={inputOrderId}
              onChange={(e) => setInputOrderId(e.target.value)}
              className="flex-grow px-4 py-2.5 bg-background border border-border rounded-xl text-xs text-center uppercase font-mono text-foreground focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-accent text-slate-950 hover:bg-white hover:text-black font-display text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              LOCATE
            </button>
          </form>
          <p className="text-[10px] text-muted-foreground font-mono">
            Demo Codes: <span className="text-accent">LX-88902</span> (Processing), <span className="text-accent">LX-87239</span> (Delivered)
          </p>
        </div>

        {/* ================= RESULTS PANEL ================= */}
        {searched && (
          <div className="mt-12 max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-400">
            {activeOrder ? (
              <div className="bg-secondary/15 border border-border glass p-6 sm:p-8 rounded-3xl space-y-8">
                
                {/* Order Top Meta */}
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2 border-b border-border/60 pb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Order Identified</span>
                    <h3 className="font-display text-lg font-bold text-foreground font-mono">{activeOrder.id}</h3>
                  </div>
                  <div className="text-left sm:text-right font-mono text-xs text-muted-foreground">
                    <p>REGISTERED: {activeOrder.date}</p>
                    <p className="text-accent font-semibold uppercase mt-0.5">{activeOrder.shippingMethod}</p>
                  </div>
                </div>

                {/* Progress bar timeline */}
                <div className="space-y-6 pt-4">
                  <h4 className="font-display font-bold text-sm tracking-wide text-foreground uppercase">
                    Logistics Timeline
                  </h4>

                  <div className="relative grid grid-cols-3 text-center pt-8">
                    {/* Connecting Bar */}
                    <div className="absolute top-11 left-[16.6%] right-[16.6%] h-1 bg-secondary rounded -z-10">
                      <div
                        className="h-full bg-accent transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                        style={{
                          width: `${
                            getStatusStep(activeOrder.status) === 1
                              ? 0
                              : getStatusStep(activeOrder.status) === 2
                              ? 50
                              : 100
                          }%`,
                        }}
                      />
                    </div>

                    {/* Nodes */}
                    {[
                      { step: 1, label: 'Assembly', icon: Package, desc: 'Package being collected' },
                      { step: 2, label: 'In Transit', icon: Truck, desc: 'Drone dispatched to coordinates' },
                      { step: 3, label: 'Secured', icon: CheckCircle2, desc: 'Authorized delivery signature locked' },
                    ].map((node) => {
                      const isActive = getStatusStep(activeOrder.status) >= node.step;
                      const isCurrent = getStatusStep(activeOrder.status) === node.step;
                      return (
                        <div key={node.step} className="flex flex-col items-center gap-2">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-xl border flex items-center justify-center transition-all",
                              isCurrent
                                ? "bg-accent border-accent text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-110"
                                : isActive
                                ? "bg-primary border-primary text-white"
                                : "bg-background border-border text-muted-foreground"
                            )}
                          >
                            <node.icon className="h-4.5 w-4.5 animate-pulse" />
                          </div>
                          <span className={cn("font-display text-xs font-bold", isActive ? 'text-foreground' : 'text-muted-foreground')}>
                            {node.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground max-w-[120px] leading-relaxed hidden sm:inline">
                            {node.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Drone routing coordinate mockup */}
                {activeOrder.status === 'processing' && (
                  <div className="p-5 rounded-2xl border border-border/80 bg-background/50 space-y-3">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-full uppercase tracking-widest animate-pulse">
                      <Compass className="h-3 w-3" /> drone air dispatcher routing
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                      Parcel is undergoing quality verification before takeoff. Takeoff schedules estimate departures shortly. Flight telemetry coordinates will lock onto <span className="text-foreground font-bold">{activeOrder.shippingAddress.address}, {activeOrder.shippingAddress.city}</span>.
                    </p>
                  </div>
                )}

                {/* Items in Parcel list */}
                <div className="pt-4 border-t border-border/60 space-y-4">
                  <h4 className="font-display font-bold text-sm tracking-wide text-foreground uppercase">
                    Parcel Items
                  </h4>
                  <div className="space-y-3">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <Image src={item.image} alt={item.name} width={48} height={48} className="h-12 w-12 rounded-lg object-cover border border-border bg-secondary" />
                          <div>
                            <p className="text-xs text-foreground font-bold">{item.name}</p>
                            <p className="font-mono text-[10px] text-muted-foreground">QTY: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-accent font-semibold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-secondary/10 border border-border glass py-12 px-6 text-center rounded-3xl">
                <HelpCircle className="h-10 w-10 text-rose-400 mx-auto stroke-1 mb-2 animate-bounce" />
                <h4 className="font-display font-bold text-foreground text-base">Unrecognized Spec Reference</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                  The order code did not match our logs. Please check the spelling or search again.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    }>
      <OrderTrackingContent />
    </Suspense>
  );
}
