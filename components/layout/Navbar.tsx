'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  User, 
  Sparkles
} from 'lucide-react';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);
  const { setCartOpen, setSearchOpen, setCursorType } = useUIStore();

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Categories', href: '/categories' },
    { name: 'FAQ', href: '/faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out px-4 md:px-8',
          scrolled ? 'top-2 md:top-4' : 'top-0'
        )}
      >
        <div
          className={cn(
            'mx-auto max-w-7xl transition-all duration-500 rounded-full',
            scrolled
              ? 'glass px-6 py-3 shadow-lg shadow-black/10'
              : 'bg-transparent py-5 px-4'
          )}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-bold tracking-wider text-foreground"
              onMouseEnter={() => handleLinkHover(true)}
              onMouseLeave={() => handleLinkHover(false)}
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-accent">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-accent bg-clip-text text-transparent light:from-slate-900 light:to-primary">
                LUXE
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors hover:text-accent',
                    pathname === link.href ? 'text-accent font-semibold' : 'text-muted-foreground'
                  )}
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-accent rounded-full" />
                  )}
                </Link>
              ))}

              {/* Admin Special Link */}
              <Link
                href="/admin"
                className={cn(
                  'text-xs px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider transition-colors',
                  pathname.startsWith('/admin')
                    ? 'border-accent text-accent bg-accent/10'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                )}
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
              >
                Admin
              </Link>
            </nav>

            {/* Desktop Action Icons */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300"
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                aria-label="Search items"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                className="relative p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300"
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white scale-110">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Toggle */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300"
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-slate-950 scale-110 animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Dark/Light mode theme switch */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300"
                  onMouseEnter={() => handleLinkHover(true)}
                  onMouseLeave={() => handleLinkHover(false)}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              {/* Profile Link */}
              <Link
                href="/profile"
                className="p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300 hidden md:block"
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                aria-label="User Profile"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Mobile Hamburger menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-full hover:bg-secondary/40 text-muted-foreground hover:text-foreground transition-all duration-300 md:hidden"
                onMouseEnter={() => handleLinkHover(true)}
                onMouseLeave={() => handleLinkHover(false)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col bg-background/95 backdrop-blur-lg md:hidden pt-28 px-8 pb-12 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'pb-2 border-b border-border transition-colors',
                  pathname === link.href ? 'text-accent' : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="pb-2 border-b border-border text-muted-foreground flex items-center gap-2"
            >
              <User className="h-5 w-5" /> Account Profile
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="pb-2 border-b border-border text-primary font-bold tracking-wider"
            >
              ADMIN PORTAL
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-4">
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 w-full p-4 rounded-xl bg-secondary/50 border border-border text-sm font-medium"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-5 w-5 text-yellow-400" /> Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5 text-indigo-400" /> Switch to Dark Mode
                </>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground font-mono">
              LUXE-COMMERCE v4.0.0
            </p>
          </div>
        </div>
      )}
    </>
  );
}
