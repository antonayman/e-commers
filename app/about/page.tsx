'use client';

import React from 'react';
import { Shield, Compass, Eye, Zap } from 'lucide-react';

import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function AboutPage() {
  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="py-12 border-b border-border/60 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
            PLATFORM SYNAPSE
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Our Cybernetic Ethos
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto font-light leading-relaxed">
            Merging luxury fashion visual aesthetics with high-grade carbon fabrics and spatial technologies.
          </p>
        </div>

        {/* ================= STORY BLOCK ================= */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="font-display text-2xl font-bold tracking-wide text-foreground">
              Visual Archetypes For the Digital Nomad.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              Founded in Sector 9 in 2024, LUXE represents the culmination of cybernetic fashion. Our mission was simple: eliminate the compromise between protective utility and premium luxury aesthetics. 
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              We construct all garments using liquid-crystal arrays, self-charging mechanical micro-grids, and ballistic nylon meshes. All watch models house crystals of crystalline titanium alloys.
            </p>
          </div>

          {/* Decorative grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="p-6 bg-secondary/15 border border-border glass rounded-2xl text-center space-y-2">
              <Zap className="h-6 w-6 text-accent mx-auto" />
              <h4 className="font-display font-bold text-sm text-foreground">KINETIC ENERGY</h4>
              <p className="text-[11px] text-muted-foreground">Self-charging shoe cushions</p>
            </div>
            <div className="p-6 bg-secondary/15 border border-border glass rounded-2xl text-center space-y-2">
              <Eye className="h-6 w-6 text-accent mx-auto" />
              <h4 className="font-display font-bold text-sm text-foreground">LCD COLOR SHIFT</h4>
              <p className="text-[11px] text-muted-foreground">Adaptive lighting visual panels</p>
            </div>
            <div className="p-6 bg-secondary/15 border border-border glass rounded-2xl text-center space-y-2">
              <Shield className="h-6 w-6 text-accent mx-auto" />
              <h4 className="font-display font-bold text-sm text-foreground">EMP SHIELDING</h4>
              <p className="text-[11px] text-muted-foreground">Ballistic compartment dividers</p>
            </div>
            <div className="p-6 bg-secondary/15 border border-border glass rounded-2xl text-center space-y-2">
              <Compass className="h-6 w-6 text-accent mx-auto" />
              <h4 className="font-display font-bold text-sm text-foreground">DRONE PARCELS</h4>
              <p className="text-[11px] text-muted-foreground">Instant dispatch logistics</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
