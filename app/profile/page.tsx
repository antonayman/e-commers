'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Package, Heart, Sparkles, Sliders, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { MOCK_ORDERS } from '@/lib/data';
import { formatPrice, cn } from '@/lib/utils';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function UserProfilePage() {
  const router = useRouter();
  const { setCursorType, addNotification } = useUIStore();
  const wishlistItems = useWishlistStore((state) => state.items);

  // Mock user settings state
  const [name, setName] = useState('Alexander Mercer');
  const [email, setEmail] = useState('alex.mercer@neural.net');
  const [role] = useState('Syndicate Prime');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification('Profile Upgraded', 'Your biometric identity information was updated.', 'success');
  };

  const handleLogout = () => {
    addNotification('Logged Out', 'Your neural session was closed.', 'info');
    router.push('/login');
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
              SECURITY PROTOCOLS
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
              User Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light">
              Manage your biometric address coordinates, active drops, and financial authorizations.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl font-mono text-xs font-semibold text-rose-400 transition-colors flex items-center gap-1.5"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <LogOut className="h-3.5 w-3.5" /> Disconnect Session
          </button>
        </div>

        {/* ================= STATS WIDGETS ROW ================= */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl flex items-center gap-4">
            <div className="h-12 w-12 bg-primary/20 text-accent rounded-xl flex items-center justify-center border border-accent/20">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Active Orders</span>
              <h4 className="font-display text-lg font-bold text-foreground font-mono">{MOCK_ORDERS.length}</h4>
            </div>
          </div>

          <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl flex items-center gap-4">
            <div className="h-12 w-12 bg-primary/20 text-accent rounded-xl flex items-center justify-center border border-accent/20">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Saved Items</span>
              <h4 className="font-display text-lg font-bold text-foreground font-mono">{wishlistItems.length}</h4>
            </div>
          </div>

          <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl flex items-center gap-4">
            <div className="h-12 w-12 bg-primary/20 text-accent rounded-xl flex items-center justify-center border border-accent/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Syndicate Level</span>
              <h4 className="font-display text-xs font-bold text-accent uppercase tracking-widest mt-0.5">{role}</h4>
            </div>
          </div>
        </div>

        {/* ================= LAYOUT COLUMNS ================= */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Recent Orders table */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <Package className="h-5 w-5 text-accent" /> Logistics Releases History
            </h3>

            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-secondary/15 border border-border glass space-y-4">
                  <div className="flex justify-between items-baseline flex-wrap gap-2 border-b border-border/60 pb-3">
                    <span className="font-mono text-xs font-bold text-foreground">{order.id}</span>
                    <span className={cn(
                      "font-mono text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                      order.status === 'processing' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-green-400/10 text-green-400 border border-green-400/20'
                    )}>
                      {order.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-sans">
                    <div className="space-y-1">
                      <p className="text-muted-foreground font-mono">Date: {order.date}</p>
                      <p className="text-foreground font-semibold">Total Charge: {formatPrice(order.total)}</p>
                    </div>

                    <button
                      onClick={() => router.push(`/order-tracking?orderId=${order.id}`)}
                      className="px-4 py-2 border border-border hover:border-accent text-[11px] font-mono font-bold hover:text-accent rounded-xl transition-colors uppercase tracking-wider"
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                    >
                      Audit Telemetry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Biometric parameters settings */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground flex items-center gap-2 border-b border-border/60 pb-3">
              <Sliders className="h-5 w-5 text-accent" /> Identity Settings
            </h3>

            <form onSubmit={handleUpdateProfile} className="space-y-4 bg-secondary/15 border border-border glass p-5 rounded-2xl">
              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Identity Tag</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-sans"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Neural Email Communication Channel</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-sans"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Syndicate Level Clearance</label>
                <input
                  type="text"
                  disabled
                  value={role}
                  className="w-full px-3 py-2 bg-background/50 border border-border rounded-xl text-xs text-muted-foreground font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-accent text-slate-950 font-display text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-white hover:text-black transition-colors"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                Upgrade Identity
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
