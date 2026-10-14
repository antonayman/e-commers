'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { MOCK_CATEGORIES } from '@/lib/data';
import { useUIStore } from '@/lib/store/useUIStore';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function CategoriesPage() {
  const { setCursorType } = useUIStore();

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
            ARCHIVE CLASSIFICATIONS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mt-2 text-foreground">
            Aesthetic Classes
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl font-light leading-relaxed">
            Navigate through our high-performance categories. Each class represents a distinct dimension of utility, aesthetics, and cybernetic synthesis.
          </p>
        </div>

        {/* ================= CATEGORIES COLUMN/GRID LIST ================= */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-96 rounded-3xl overflow-hidden border border-border/60 hover:border-accent/50 bg-secondary/20 flex flex-col justify-end p-8 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500 hover:-translate-y-1.5"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              {/* Image Frame */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Visual overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />

              {/* Meta information overlay */}
              <div className="relative space-y-4 z-10">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-accent border border-accent/40 bg-accent/5 px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="h-3 w-3" /> Class {idx + 1} {'// '}{cat.productCount} Specs
                </span>
                
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tracking-wide leading-none">
                  {cat.name}
                </h3>
                
                <p className="text-sm text-muted-foreground max-w-md leading-relaxed font-light">
                  {cat.description}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-accent font-bold group-hover:text-white transition-colors">
                    EXPEDITE CLASS REPOSITORY <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
