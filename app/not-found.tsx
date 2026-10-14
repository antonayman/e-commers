'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function NotFound() {
  const { setCursorType } = useUIStore();

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <FloatingBlobs />

      {/* Warning symbol container */}
      <div className="h-16 w-16 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl flex items-center justify-center animate-bounce mb-6">
        <ShieldAlert className="h-8 w-8" />
      </div>

      <div className="space-y-4 max-w-md">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-rose-400 font-bold">
          ERROR DETECTED // PROTOCOL 404
        </span>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Coordinates Lost
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed font-light">
          The requested cybernetic visual coordinates could not be decrypted. The sector might have undergone cleanup or is non-existent.
        </p>
      </div>

      {/* Direct link actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Return to Grid Core
        </Link>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-xl border border-border hover:border-foreground/50 text-muted-foreground hover:text-foreground transition-all font-display font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-1.5"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          Explore Archive <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
