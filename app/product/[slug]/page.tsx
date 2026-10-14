'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  ArrowLeft, 
  Plus, 
  Minus,
  Zap
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/data';
import { useCartStore } from '@/lib/store/useCartStore';
import { useWishlistStore } from '@/lib/store/useWishlistStore';
import { useUIStore } from '@/lib/store/useUIStore';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/shop/ProductCard';
import FloatingBlobs from '@/components/animations/FloatingBlobs';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  
  // Resolve params promise
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;

  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, hasItem } = useWishlistStore();
  const { setCursorType, setCartOpen, addNotification } = useUIStore();

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] ?? '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '');
  const [selectedColor, setSelectedColor] = useState<{ name: string; value: string } | null>(product?.colors?.[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<{ id: string; userName: string; rating: number; comment: string; date: string; avatar?: string }[]>(product?.reviews ?? []);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setSelectedImage(product?.images[0] ?? '');
    setSelectedSize(product?.sizes?.[0] ?? '');
    setSelectedColor(product?.colors?.[0] ?? null);
    setLocalReviews(product?.reviews ?? []);
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">SCANNING RESOURCE</p>
        <h2 className="font-display font-bold text-lg text-foreground mt-2">Locating specimen...</h2>
      </div>
    );
  }

  const wishlisted = hasItem(product.id);
  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || undefined, selectedColor || undefined);
    addNotification('Added to Cart', `${product.name} has been added.`, 'success');
    setCartOpen(true);
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    addNotification(
      wishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      wishlisted ? `${product.name} removed.` : `${product.name} saved successfully.`,
      wishlisted ? 'info' : 'success'
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName.trim() && reviewComment.trim()) {
      const newReview = {
        id: `rev-${Date.now()}`,
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split('T')[0],
      };
      setLocalReviews([newReview, ...localReviews]);
      setReviewName('');
      setReviewComment('');
      addNotification('Review Registered', 'Your review feedback is live.', 'success');
    }
  };

  const handleHover = (hovering: boolean) => {
    setCursorType(hovering ? 'hover' : 'default');
  };

  return (
    <div className="relative min-h-screen pb-20">
      <FloatingBlobs />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors py-4 uppercase"
          onMouseEnter={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>

        {/* ================= PRODUCT MASTER COLUMNS ================= */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Product Gallery Grid */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary View */}
            <div className="aspect-square bg-secondary/15 border border-border glass rounded-3xl overflow-hidden flex items-center justify-center p-6 relative">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="w-full h-full object-cover rounded-2xl max-h-[500px] border border-border"
              />
              {product.discountPercentage && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-accent text-slate-950 font-mono text-xs font-bold tracking-widest uppercase rounded-full animate-pulse">
                  -{product.discountPercentage}% DROP
                </span>
              )}
            </div>

            {/* Thumbnail Navigation Row */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      "h-20 w-20 rounded-xl overflow-hidden bg-secondary/20 border transition-all",
                      selectedImage === img
                        ? "border-accent scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                        : "border-border hover:border-foreground/30 hover:scale-102"
                    )}
                    onMouseEnter={() => handleHover(true)}
                    onMouseLeave={() => handleHover(false)}
                  >
                    <Image src={img} alt="Thumbnail view" width={80} height={80} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Detail Metadata */}
          <div className="lg:col-span-6 space-y-6 bg-secondary/10 border border-border glass p-6 md:p-8 rounded-3xl">
            {/* Category / Rating */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {product.category.replace('-', ' ')}
              </span>
              <span className="flex items-center gap-1 text-xs text-yellow-400 font-mono font-bold">
                <Star className="h-3.5 w-3.5 fill-current" /> {product.rating} ({localReviews.length} Reviews)
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-2xl font-bold text-accent">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Selection Options: Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 border-t border-border/60 pt-4">
                <label className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Select Visual Theme: <span className="text-foreground">{selectedColor?.name}</span>
                </label>
                <div className="flex gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-8 w-8 rounded-full border flex items-center justify-center transition-all",
                        selectedColor?.name === color.name
                          ? "border-accent scale-110 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                          : "border-border hover:scale-105"
                      )}
                      style={{ backgroundColor: color.value }}
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                      aria-label={`Theme ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Selection Options: Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 border-t border-border/60 pt-4">
                <label className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                  Select Caliber Format: <span className="text-foreground">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-9 px-4 rounded-lg border font-mono text-xs font-bold transition-all",
                        selectedSize === size
                          ? "border-accent text-accent bg-accent/5"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/45"
                      )}
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity control */}
            <div className="space-y-2 border-t border-border/60 pt-4">
              <label className="font-mono text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">
                Quantify Assembly:
              </label>
              <div className="flex items-center gap-3 border border-border rounded-xl bg-background p-1.5 w-32 justify-between">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-accent text-muted-foreground transition-colors"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-mono text-sm font-bold w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                  className="p-1 hover:text-accent text-muted-foreground transition-colors"
                  onMouseEnter={() => handleHover(true)}
                  onMouseLeave={() => handleHover(false)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions Grid */}
            <div className="flex gap-4 pt-6 border-t border-border/60">
              <button
                onClick={handleAddToCart}
                className="flex-grow py-4 rounded-xl bg-accent text-slate-950 hover:bg-white hover:text-black font-display font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                <ShoppingBag className="h-4 w-4" /> Assemble to Cart
              </button>

              <button
                onClick={handleWishlistToggle}
                className={cn(
                  "p-4 border border-border rounded-xl transition-all",
                  wishlisted 
                    ? "bg-primary text-white hover:bg-rose-600 hover:border-rose-600" 
                    : "hover:border-accent hover:text-accent hover:bg-secondary/40"
                )}
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
                aria-label="Wishlist spec"
              >
                <Heart className={cn("h-5 w-5", wishlisted && "fill-current")} />
              </button>
            </div>

            {/* Reassurances list */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/60 font-mono text-[10px] text-muted-foreground uppercase">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> Secure Hashing</span>
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-accent" /> 3HR DRONE DELIVERY</span>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS FEEDBACK ================= */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border/40 pt-16">
          {/* Submit review */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                FEEDBACK SYNAPSE
              </span>
              <h3 className="font-display text-xl font-bold tracking-wide mt-1 text-foreground">
                Register Spec Review
              </h3>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4 bg-secondary/15 border border-border glass p-5 rounded-2xl">
              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Cranial Username</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Aesthetic Rating (1-5)</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={cn(
                        "p-1 rounded transition-colors",
                        star <= reviewRating ? "text-yellow-400" : "text-muted-foreground/30"
                      )}
                      onMouseEnter={() => handleHover(true)}
                      onMouseLeave={() => handleHover(false)}
                      aria-label={`Rate ${star} Stars`}
                    >
                      <Star className="h-4.5 w-4.5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-muted-foreground uppercase block mb-1">Review Statement</label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Feedback comments..."
                  className="w-full px-3 py-2 bg-background border border-border rounded-xl text-xs text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-accent text-slate-950 font-display text-xs font-bold tracking-widest uppercase rounded-xl hover:bg-white hover:text-black transition-colors"
                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
              >
                Submit Spec Report
              </button>
            </form>
          </div>

          {/* List Reviews */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="font-display text-xl font-bold tracking-wide text-foreground flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-accent" /> Logged Spec Reports ({localReviews.length})
            </h3>

            {localReviews.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No feedback registered yet for this specimen.</p>
            ) : (
              <div className="space-y-4">
                {localReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-secondary/10 border border-border/80 glass">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        {rev.avatar ? (
                          <Image src={rev.avatar} alt={rev.userName} width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                        ) : (
                          <div className="h-9 w-9 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center font-display font-bold text-xs uppercase">
                            {rev.userName.slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-display text-xs font-bold text-foreground">{rev.userName}</h4>
                          <span className="font-mono text-[9px] text-muted-foreground">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn("h-3 w-3", i < rev.rating ? "fill-current" : "text-muted-foreground/30")}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-border/40 pt-16">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground mb-8">
              Parallel Calibers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
