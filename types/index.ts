export interface Review {
  id: string;
  userName: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  sizes?: string[];
  colors?: { name: string; value: string }[];
  featured?: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  flashSale?: boolean;
  inventory: number;
  discountPercentage?: number;
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; value: string };
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedSize?: string;
    selectedColor?: string;
  }[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface DashboardStats {
  revenue: number;
  orders: number;
  products: number;
  customers: number;
  salesData: { name: string; value: number }[];
  revenueData: { name: string; revenue: number }[];
  categoryData: { name: string; value: number }[];
}
