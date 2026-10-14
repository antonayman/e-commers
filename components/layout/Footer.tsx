'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, Globe } from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';

// Custom Premium inline SVG Social Icons
const TwitterIcon = () => (
  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const GithubIcon = () => (
  <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { setCursorType } = useUIStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <footer className="relative border-t border-border bg-background pt-20 pb-10 overflow-hidden">
      {/* Dynamic Background mesh */}
      <div className="absolute bottom-0 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-wider text-foreground"
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-accent">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent light:from-slate-900 light:to-primary">
                LUXE
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafting premium visual and kinetic products for the next generation. We merge luxury design aesthetics with futuristic cybernetic utility.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              {[
                { icon: TwitterIcon, href: 'https://twitter.com' },
                { icon: InstagramIcon, href: 'https://instagram.com' },
                { icon: GithubIcon, href: 'https://github.com' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/30 border border-border text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {/* Shop Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">
                Collections
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li><Link href="/shop?category=exo-apparel" className="hover:text-accent transition-colors">Exo Apparel</Link></li>
                <li><Link href="/shop?category=neural-wearables" className="hover:text-accent transition-colors">Neural Tech</Link></li>
                <li><Link href="/shop?category=chrono-tech" className="hover:text-accent transition-colors">Chrono Wear</Link></li>
                <li><Link href="/shop?category=cyber-footwear" className="hover:text-accent transition-colors">Cyber Shoes</Link></li>
              </ul>
            </div>

            {/* Assistance */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">
                Support
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li><Link href="/faq" className="hover:text-accent transition-colors">FAQS</Link></li>
                <li><Link href="/order-tracking" className="hover:text-accent transition-colors">Track Order</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition-colors">Secure Help</Link></li>
                <li><Link href="/faq#refunds" className="hover:text-accent transition-colors">Returns & Refunds</Link></li>
              </ul>
            </div>

            {/* Corporate */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">
                Platform
              </h4>
              <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition-colors">Our Ethos</Link></li>
                <li><Link href="/about#team" className="hover:text-accent transition-colors">Cyber Team</Link></li>
                <li><span className="text-accent text-[11px] font-mono border border-accent/30 px-1.5 py-0.5 rounded">ONLINE</span></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground uppercase">
              Join the Syndicate
            </h4>
            <p className="text-sm text-muted-foreground">
              Sign up to receive private drops, early access, and seasonal updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                placeholder="Enter neural email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-secondary/40 border border-border rounded-xl text-sm placeholder-muted-foreground/60 text-foreground focus:outline-none focus:border-accent transition-colors pr-12 font-sans"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 p-2 rounded-lg bg-accent text-slate-950 hover:bg-white hover:text-black transition-colors"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                {subscribed ? (
                  <span className="text-xs font-bold">OK</span>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="border-t border-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <p>© 2026 LUXE E-COMMERCE SYNDICATE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-accent" /> Neo-Tokyo / English</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
