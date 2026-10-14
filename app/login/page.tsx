'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Mail, Lock } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import FloatingBlobs from '@/components/animations/FloatingBlobs';

export default function LoginPage() {
  const router = useRouter();
  const { setCursorType, addNotification } = useUIStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      addNotification('Session Opened', 'Welcome back, operative.', 'success');
      router.push('/profile');
    }
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 overflow-hidden">
      <FloatingBlobs />

      {/* Main card box */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-secondary/15 border border-border glass rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-400">

        {/* Left decoration panel */}
        <div className="hidden md:flex flex-col justify-between p-8 bg-gradient-to-tr from-primary/30 to-accent/20 border-r border-border/60 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/40 -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent -z-10" />

          <div className="flex items-center gap-2 font-display text-lg font-bold tracking-wider text-foreground">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-accent">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span>LUXE SYNDICATE</span>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-white leading-tight">
              Unlock the <br /> Next Era of <br /> Visual Utility.
            </h3>
            <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
              Secure identity credentials are required to decrypt premium specs, drone trajectories, and transaction ledgers.
            </p>
          </div>

          <div className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            SECURE INTEGRITY LOCKED // v4.0.0
          </div>
        </div>

        {/* Right login form column */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent font-bold">IDENTITY DECRYPTION</span>
            <h2 className="font-display text-2xl font-bold text-foreground">Operative Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Syndicate Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@neural.net"
                  className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Security Keyphrase</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              DECRYPT SESSION <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground">
            <Link href="/register" className="hover:text-accent transition-colors">CREATION MATRIX</Link>
            <Link href="/faq" className="hover:text-accent transition-colors">FORGOT KEY?</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
