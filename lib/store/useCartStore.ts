import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  couponCode: string;
  discountPercentage: number;
  discountAmount: number;
  shippingCost: number;
  taxPercentage: number;
  addItem: (product: Product, quantity?: number, size?: string, color?: { name: string; value: string }) => void;
  removeItem: (productId: string, size?: string, colorVal?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, colorVal?: string) => void;
  applyCoupon: (code: string) => boolean;
  clearCart: () => void;
  getTotals: () => {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      discountPercentage: 0,
      discountAmount: 0,
      shippingCost: 15,
      taxPercentage: 8,

      addItem: (product, quantity = 1, size, color) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor?.value === color?.value
          );

          const newItems = [...state.items];
          if (existingItemIndex > -1) {
            newItems[existingItemIndex].quantity += quantity;
          } else {
            newItems.push({ product, quantity, selectedSize: size, selectedColor: color });
          }

          return { items: newItems };
        });
      },

      removeItem: (productId, size, colorVal) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor?.value === colorVal
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, size, colorVal) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, colorVal);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor?.value === colorVal
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      applyCoupon: (code) => {
        const cleanedCode = code.toUpperCase().trim();
        if (cleanedCode === 'NEON25') {
          set({ couponCode: 'NEON25', discountPercentage: 25 });
          return true;
        } else if (cleanedCode === 'FUTURE') {
          set({ couponCode: 'FUTURE', discountPercentage: 15 });
          return true;
        }
        return false;
      },

      clearCart: () => {
        set({ items: [], couponCode: '', discountPercentage: 0, discountAmount: 0 });
      },

      getTotals: () => {
        const { items, discountPercentage, shippingCost, taxPercentage } = get();
        const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        const discount = (subtotal * discountPercentage) / 100;
        const shipping = subtotal > 150 ? 0 : items.length > 0 ? shippingCost : 0;
        const tax = ((subtotal - discount) * taxPercentage) / 100;
        const total = Math.max(0, subtotal - discount + shipping + tax);

        return {
          subtotal,
          discount,
          shipping,
          tax,
          total,
        };
      },
    }),
    {
      name: 'luxecommerce-cart',
    }
  )
);
