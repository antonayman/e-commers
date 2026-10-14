'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_ADMIN_STATS } from '@/lib/data';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
  const { setCursorType, addNotification } = useUIStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  
  // Custom Product inventory edit state
  const [productsList, setProductsList] = useState(MOCK_PRODUCTS);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editInventory, setEditInventory] = useState(0);

  const handleUpdateInventory = (id: string) => {
    setProductsList(
      productsList.map((p) => (p.id === id ? { ...p, inventory: editInventory } : p))
    );
    setEditingProductId(null);
    addNotification('Inventory Updated', 'Stock count recalibrated successfully.', 'success');
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
              PLATFORM MANAGEMENT SHELL
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
              Admin Portal
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light">
              Audit secure visual platform telemetry, modify catalog inventory levels, and check customer transactions.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 bg-secondary/30 p-1 border border-border/80 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold">
            {(['overview', 'products', 'orders'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 rounded-lg transition-colors",
                  activeTab === tab ? "bg-accent text-slate-950" : "text-muted-foreground hover:text-foreground"
                )}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8 animate-in fade-in duration-300">
            
            {/* Stats Cards row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Gross Revenue</span>
                  <TrendingUp className="h-4.5 w-4.5 text-accent" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-foreground font-mono">
                  {formatPrice(MOCK_ADMIN_STATS.revenue)}
                </h4>
              </div>

              <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Secure Orders</span>
                  <ShoppingBag className="h-4.5 w-4.5 text-accent" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-foreground font-mono">
                  {MOCK_ADMIN_STATS.orders}
                </h4>
              </div>

              <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Active Specs</span>
                  <Package className="h-4.5 w-4.5 text-accent" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-foreground font-mono">
                  {MOCK_ADMIN_STATS.products}
                </h4>
              </div>

              <div className="bg-secondary/15 border border-border glass p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Operatives</span>
                  <Users className="h-4.5 w-4.5 text-accent" />
                </div>
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-foreground font-mono">
                  {MOCK_ADMIN_STATS.customers}
                </h4>
              </div>
            </div>

            {/* Glowing SVG Revenue Chart */}
            <div className="bg-secondary/15 border border-border glass p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-baseline border-b border-border/40 pb-3">
                <h3 className="font-display font-bold text-sm tracking-wide text-foreground uppercase">
                  Telemetry Revenue Flow
                </h3>
                <span className="font-mono text-[10px] text-accent font-semibold uppercase tracking-widest">USD ($) // MONTHLY</span>
              </div>

              {/* Render beautiful custom interactive SVG bar/line chart */}
              <div className="h-64 w-full relative pt-4">
                <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                  {/* Gradient Fill under line */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
                      <stop offset="100%" stopColor="rgba(6, 182, 212, 0.0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area fill */}
                  <path
                    d="M 50 170 C 150 140, 250 110, 350 130 C 450 80, 550 50, 550 50 L 550 200 L 50 200 Z"
                    fill="url(#chartGrad)"
                  />

                  {/* Glowing Line */}
                  <path
                    d="M 50 170 C 150 140, 250 110, 350 130 C 450 80, 550 50, 550 50"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.8))' }}
                  />

                  {/* Nodes */}
                  <circle cx="50" cy="170" r="5" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="170" cy="140" r="5" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="290" cy="120" r="5" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="410" cy="90" r="5" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" />
                  <circle cx="550" cy="50" r="5" fill="#ffffff" stroke="#06b6d4" strokeWidth="2.5" />
                </svg>

                {/* X Axis labels */}
                <div className="flex justify-between px-6 pt-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  <span>Q1 JAN</span>
                  <span>Q2 FEB</span>
                  <span>Q3 MAR</span>
                  <span>Q4 APR</span>
                  <span>Q5 MAY</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PRODUCTS TAB (Inventory editor) ================= */}
        {activeTab === 'products' && (
          <div className="mt-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-base text-foreground uppercase border-b border-border/60 pb-3">
              Spec Inventory Modifiers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/60 text-muted-foreground uppercase tracking-widest text-[9px]">
                    <th className="py-3 px-4">Spec Item</th>
                    <th className="py-3 px-4">Class</th>
                    <th className="py-3 px-4">Standard Price</th>
                    <th className="py-3 px-4">Stock Level</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {productsList.map((product) => (
                    <tr key={product.id} className="hover:bg-secondary/10 transition-colors">
                      {/* Name */}
                      <td className="py-3.5 px-4 font-display font-bold text-foreground">
                        {product.name}
                      </td>
                      
                      {/* Category */}
                      <td className="py-3.5 px-4 text-muted-foreground uppercase text-[10px]">
                        {product.category}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 text-accent font-semibold">
                        {formatPrice(product.price)}
                      </td>

                      {/* Stock Level */}
                      <td className="py-3.5 px-4">
                        {editingProductId === product.id ? (
                          <input
                            type="number"
                            value={editInventory}
                            onChange={(e) => setEditInventory(Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 bg-background border border-border rounded text-center text-foreground font-mono"
                          />
                        ) : (
                          <span className={cn(
                            "font-bold",
                            product.inventory <= 10 ? 'text-amber-400' : 'text-foreground'
                          )}>
                            {product.inventory} UNITS
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right">
                        {editingProductId === product.id ? (
                          <button
                            onClick={() => handleUpdateInventory(product.id)}
                            className="px-2.5 py-1 bg-green-500 text-slate-950 rounded font-bold hover:bg-green-400 transition-colors"
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                          >
                            SAVE
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingProductId(product.id);
                              setEditInventory(product.inventory);
                            }}
                            className="px-2.5 py-1 bg-secondary border border-border text-muted-foreground hover:text-foreground rounded font-bold transition-colors"
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                          >
                            EDIT STOCK
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= ORDERS TAB ================= */}
        {activeTab === 'orders' && (
          <div className="mt-8 space-y-6 animate-in fade-in duration-300">
            <h3 className="font-display font-bold text-base text-foreground uppercase border-b border-border/60 pb-3">
              Release Transactions Ledger
            </h3>

            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-secondary/15 border border-border glass flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 font-mono text-xs">
                    <p className="font-bold text-foreground">{order.id} {'// '}{order.shippingAddress.fullName}</p>
                    <p className="text-muted-foreground">COORDINATES: {order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p className="text-accent font-semibold">{formatPrice(order.total)}</p>
                  </div>

                  <span className={cn(
                    "font-mono text-[9px] px-2.5 py-1 rounded font-bold uppercase",
                    order.status === 'processing' ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-green-400/10 text-green-400 border border-green-400/20'
                  )}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
