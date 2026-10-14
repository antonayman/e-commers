import { create } from 'zustand';
import { Product } from '@/types';

interface UINotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
  time: string;
}

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  quickPreviewProduct: Product | null;
  notifications: UINotification[];
  cursorType: 'default' | 'hover' | 'pointer' | 'drag';
  cursorText: string;
  
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setQuickPreviewProduct: (product: Product | null) => void;
  setCursorType: (type: 'default' | 'hover' | 'pointer' | 'drag', text?: string) => void;
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
  markNotificationsAsRead: () => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  quickPreviewProduct: null,
  cursorType: 'default',
  cursorText: '',
  notifications: [
    {
      id: 'n-1',
      title: 'Welcome to LuxeCommerce',
      message: 'Explore our ultra-futuristic clothing, audio, and watch collections.',
      type: 'info',
      read: false,
      time: 'Just now',
    }
  ],

  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setQuickPreviewProduct: (product) => set({ quickPreviewProduct: product }),
  setCursorType: (type, text = '') => set({ cursorType: type, cursorText: text }),
  
  addNotification: (title, message, type = 'info') => {
    set((state) => ({
      notifications: [
        {
          id: `n-${Date.now()}`,
          title,
          message,
          type,
          read: false,
          time: 'Just now',
        },
        ...state.notifications,
      ],
    }));
  },

  markNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  clearNotifications: () => set({ notifications: [] }),
}));
