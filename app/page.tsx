'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Compass
} from 'lucide-react';
import { useUIStore } from '@/lib/store/useUIStore';
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_TESTIMONIALS, MOCK_BRANDS } from '@/lib/data';
import Image from 'next/image';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import ProductCard from '@/components/shop/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function LandingPage() {
  const { setCursorType } = useUIStore();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Flash Sale Countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 44 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.bestSeller);

  const handleHover = (type: 'hover' | 'drag' | 'pointer' | 'default', text: string = '') => {
    setCursorType(type, text);
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Decorative Blobs */}
      <FloatingBlobs />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center pt-8 md:pt-16 pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold tracking-widest text-accent uppercase animate-pulse">
              <Sparkles className="h-3.5 w-3.5" /> Private Drop 08 Activated
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-foreground">
              Aesthetic <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-indigo-400 to-primary bg-clip-text text-transparent">
                Archetypes
              </span> <br />
              For The Future.
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience the convergence of high-end cybernetic fashion, spatial wearables, and chronological mechanics. Engineered with liquid-crystal smart fabrics and titanium alloys.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group"
                onMouseEnter={() => handleHover('hover')}
                onMouseLeave={() => handleHover('default')}
              >
                Access Collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 rounded-xl border border-border hover:border-foreground/45 text-center font-display font-bold text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-all"
                onMouseEnter={() => handleHover('hover')}
                onMouseLeave={() => handleHover('default')}
              >
                Our Ethos
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-border/40 max-w-md mx-auto lg:mx-0 font-mono">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground font-display">40+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Unique Specs</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground font-display">100%</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Bio-Recycled</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground font-display">3HR</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Drone Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            {/* Glowing Aura back */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full w-[80%] h-[80%] -z-10 animate-pulse" />
            
            <div 
              className="relative aspect-[3/4] w-full max-w-[340px] rounded-3xl overflow-hidden bg-secondary/20 border border-border glass p-4 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-2 group"
              onMouseEnter={() => handleHover('pointer', 'SPEC')}
              onMouseLeave={() => handleHover('default')}
            >
              <Image
                src={MOCK_PRODUCTS[0].images[0]}
                alt="Apex Jacket"
                fill
                className="w-full h-full object-cover rounded-2xl border border-border/60 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-background/80 backdrop-blur border border-border/80 flex justify-between items-center font-mono">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Smart Fabric</p>
                  <p className="text-sm font-bold text-foreground font-display">Apex Jacket v4</p>
                </div>
                <span className="text-accent font-bold font-mono">$349.99</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= BRAND PARTNERS INFINITE MARQUEE ================= */}
      <section className="py-12 border-y border-border/60 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            AESTHETIC PARTNERS & TECHNOLOGY SYNDICATES
          </p>
        </div>
        <div className="relative w-full overflow-hidden flex">
          <div className="flex gap-16 py-2 animate-marquee whitespace-nowrap text-xl font-display font-bold tracking-wider text-muted-foreground/40">
            {MOCK_BRANDS.concat(MOCK_BRANDS).map((brand, idx) => (
              <span 
                key={idx} 
                className="hover:text-accent hover:scale-105 transition-all inline-block duration-300"
                onMouseEnter={() => handleHover('hover')}
                onMouseLeave={() => handleHover('default')}
              >
                {brand.name.toUpperCase()} {'//'}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES GRID SECTION ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
              PLATFORM INDEX
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-foreground">
              Select Your Class
            </h2>
          </div>
          <Link href="/categories" className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
            VIEW ALL CLASSES <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden border border-border/40 hover:border-accent/40 bg-secondary/30 flex flex-col justify-end p-6 hover:shadow-[0_0_25px_rgba(99,102,241,0.15)] transition-all duration-500"
              onMouseEnter={() => handleHover('hover')}
              onMouseLeave={() => handleHover('default')}
            >
              {/* Blur Image background */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              
              <div className="relative space-y-2 z-10">
                <span className="font-mono text-[9px] font-bold text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-full">
                  {cat.productCount} SPECS
                </span>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS DRAG SLIDER ================= */}
      <section className="py-24 bg-secondary/5 border-y border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                PRIVATE ARCHIVE
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-foreground">
                Featured Releases
              </h2>
            </div>
            <Link href="/shop" className="font-mono text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
              FULL SHOP ARCHIVE <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            onMouseEnter={() => handleHover('drag', 'SLIDE')}
            onMouseLeave={() => handleHover('default')}
          >
            {featuredProducts.slice(0, 3).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= FLASH SALE countdown section ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative rounded-3xl bg-secondary/20 border border-border glass overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 justify-between">
          {/* Neon shadow back */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="space-y-6 max-w-xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent uppercase tracking-widest">
              <Flame className="h-4 w-4" /> FLASH drop active
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight leading-none text-foreground">
              Neo Syndicate <br className="hidden md:inline" /> Drop: 25% Off
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Secure elite specifications including apex apparel and cybernetic footgear. Apply discount coupon code <span className="text-accent font-mono font-bold">NEON25</span> during assembly phase to save.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                href="/shop?sale=true"
                className="px-8 py-3.5 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-xs tracking-widest uppercase transition-colors"
                onMouseEnter={() => handleHover('hover')}
                onMouseLeave={() => handleHover('default')}
              >
                REDEEM SPECS
              </Link>
            </div>
          </div>

          {/* Countdown Clock Widget */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">TERMINATION IN</p>
            <div className="flex gap-3 sm:gap-6 font-mono text-3xl sm:text-5xl font-extrabold text-foreground">
              <div className="text-center p-3 sm:p-5 rounded-2xl bg-background border border-border min-w-[70px] sm:min-w-[100px]">
                <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">HRS</p>
              </div>
              <div className="text-center p-3 sm:p-5 rounded-2xl bg-background border border-border min-w-[70px] sm:min-w-[100px]">
                <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">MIN</p>
              </div>
              <div className="text-center p-3 sm:p-5 rounded-2xl bg-background border border-border min-w-[70px] sm:min-w-[100px] text-accent">
                <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">SEC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS LIST ================= */}
      <section className="py-24 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                COMMERCE HIGH-POINT
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mt-2 text-foreground">
                Prime Demanded Items
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS CAROUSEL ================= */}
      <section className="py-24 bg-secondary/5 border-y border-border/30 overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
            NEURAL REVIEWS
          </span>
          
          <div className="mt-12 min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="font-display text-lg sm:text-2xl font-medium leading-relaxed text-foreground italic">
                  &ldquo;{MOCK_TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                
                {/* Author Info */}
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={MOCK_TESTIMONIALS[activeTestimonial].avatar}
                    alt={MOCK_TESTIMONIALS[activeTestimonial].author}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border border-accent/80"
                  />
                  <div>
                    <h4 className="font-display text-sm font-bold text-foreground">
                      {MOCK_TESTIMONIALS[activeTestimonial].author}
                    </h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                      {MOCK_TESTIMONIALS[activeTestimonial].title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selector Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {MOCK_TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeTestimonial === idx ? 'w-6 bg-accent' : 'w-2 bg-border'
                }`}
                aria-label={`Show review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= PLATFORM REASSURANCES ================= */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center font-mono">
        <div className="p-6 space-y-3">
          <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-accent rounded-xl flex items-center justify-center mx-auto">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Syndicate Shield</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All visual transactions are encoded with secure cryptographic layers. Privacy index locked.
          </p>
        </div>

        <div className="p-6 space-y-3">
          <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-accent rounded-xl flex items-center justify-center mx-auto">
            <Flame className="h-5 w-5" />
          </div>
          <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Dynamic Exchange</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            30-day effortless swap interface. Return items via automatic drone collection nodes.
          </p>
        </div>

        <div className="p-6 space-y-3">
          <div className="h-10 w-10 bg-primary/10 border border-primary/20 text-accent rounded-xl flex items-center justify-center mx-auto">
            <Compass className="h-5 w-5" />
          </div>
          <h4 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">Universal Travel</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Worldwide shipping lanes active. Fully integrated flight tracking for drone parcels.
          </p>
        </div>
      </section>

    </div>
  );
}
