import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      toggleItem: (product) => {
        set((state) => {
          const index = state.items.findIndex((item) => item.id === product.id);
          const newItems = [...state.items];
          if (index > -1) {
            newItems.splice(index, 1);
          } else {
            newItems.push(product);
          }
          return { items: newItems };
        });
      },

      hasItem: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'luxecommerce-wishlist',
    }
  )
);
