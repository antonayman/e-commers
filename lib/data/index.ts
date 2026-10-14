import { Product, Category, Order, DashboardStats } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    slug: 'exo-apparel',
    name: 'Exo Apparel',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    description: 'Smart fabrics with integrated thermal control, cybernetic weave, and adaptive aesthetics.',
    productCount: 12,
  },
  {
    id: 'cat-2',
    slug: 'neural-wearables',
    name: 'Neural & Audio',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop',
    description: 'Immersive haptics, spatial audio arrays, and subtle biosensing cranial bands.',
    productCount: 8,
  },
  {
    id: 'cat-3',
    slug: 'chrono-tech',
    name: 'Chrono Tech',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    description: 'Quantum-synced chronometers crafted from crystalline titanium.',
    productCount: 9,
  },
  {
    id: 'cat-4',
    slug: 'cyber-footwear',
    name: 'Cyber Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
    description: 'Pneumatic compression arches, self-lacing meshes, and kinetic energy rebound soles.',
    productCount: 11,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'apex-cyber-jacket',
    name: 'Apex Cyber Jacket v4.0',
    price: 349.99,
    originalPrice: 499.99,
    description: 'The ultimate futuristic outerwear. Features adaptive thermal insulation, smart liquid-crystal paneling that reacts to ambient light, and integrated bio-feedback heating. Structured with high-density ballistic nylon and micro-fine carbon fiber threads.',
    category: 'exo-apparel',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviewsCount: 124,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aria Vance',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        rating: 5,
        comment: 'Absolutely spectacular. The ambient color-shifting is gorgeous, and it kept me perfectly warm in freezing winds.',
        date: '2026-05-10',
      },
      {
        id: 'rev-2',
        userName: 'Marcus K.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        rating: 4,
        comment: 'Amazing technology and fit. The only downside is the charging brick is slightly bulky, but the battery life is incredible.',
        date: '2026-05-18',
      }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Neon Violet', value: '#8b5cf6' },
      { name: 'Obsidian Black', value: '#0a0a0f' },
      { name: 'Quantum Cyan', value: '#06b6d4' }
    ],
    featured: true,
    trending: true,
    bestSeller: true,
    flashSale: true,
    inventory: 14,
    discountPercentage: 30,
    tags: ['cyberpunk', 'techwear', 'smart-fabric'],
  },
  {
    id: 'prod-2',
    slug: 'cortex-spatial-buds',
    name: 'Cortex Spatial Earbuds',
    price: 189.99,
    description: 'Immerse yourself in 3D spatial environments. Cortex Buds utilize bio-acoustic resonance algorithms to adapt audio to your unique ear canal architecture. Equipped with active neural isolation and deep bass response.',
    category: 'neural-wearables',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 88,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
        rating: 5,
        comment: 'These sound spatialized like nothing else. It honestly feels like the singer is floating in front of you.',
        date: '2026-05-12',
      }
    ],
    colors: [
      { name: 'Glacial White', value: '#f8fafc' },
      { name: 'Space Black', value: '#0f172a' }
    ],
    featured: true,
    trending: true,
    inventory: 45,
    tags: ['audio', 'spatial-sound', 'wearable-tech'],
  },
  {
    id: 'prod-3',
    slug: 'chronos-v-titanium',
    name: 'Chronos-V Crystalline Watch',
    price: 599.99,
    originalPrice: 699.99,
    description: 'Forged from aircraft-grade crystalline titanium. The Chronos-V houses a self-charging mechanical-quartz movement with dynamic hologram subdials that float 1.5mm above the physical dial.',
    category: 'chrono-tech',
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.95,
    reviewsCount: 32,
    reviews: [],
    colors: [
      { name: 'Crystalline Silver', value: '#cbd5e1' },
      { name: 'Gold Nebula', value: '#e2e8f0' }
    ],
    featured: true,
    bestSeller: true,
    inventory: 8,
    discountPercentage: 14,
    tags: ['luxury', 'chronograph', 'titanium'],
  },
  {
    id: 'prod-4',
    slug: 'orbit-stratos-sneakers',
    name: 'Orbit Stratos Rebound Sneakers',
    price: 249.99,
    description: 'Pneumatic sole shock absorbers combined with zero-gravity micro-foam midsoles. The self-lacing harness wraps securely around your feet via a touch-activated heel sensor.',
    category: 'cyber-footwear',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.7,
    reviewsCount: 201,
    reviews: [],
    sizes: ['8', '9', '10', '11', '12'],
    colors: [
      { name: 'Vibrant Crimson', value: '#ef4444' },
      { name: 'Ultraviolet', value: '#6366f1' },
      { name: 'Neon Green', value: '#22c55e' }
    ],
    featured: true,
    trending: true,
    inventory: 23,
    tags: ['sneakers', 'footwear', 'smart-lacing'],
  },
  {
    id: 'prod-5',
    slug: 'holographic-visor-h1',
    name: 'Holo-Visor H1 Adaptive Glasses',
    price: 159.99,
    description: 'Augment your reality subtly. A premium smart lens with photochromic auto-shading, HUD speed/health telemetry trackers (connected via BLE), and eye-strain protection.',
    category: 'neural-wearables',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.6,
    reviewsCount: 54,
    reviews: [],
    colors: [
      { name: 'Prism Rainbow', value: '#ec4899' },
      { name: 'Chrome Dark', value: '#1e293b' }
    ],
    inventory: 30,
    tags: ['glasses', 'visor', 'augmented-reality'],
  },
  {
    id: 'prod-6',
    slug: 'tactical-aegis-backpack',
    name: 'Aegis Hybrid Shield Backpack',
    price: 199.99,
    originalPrice: 229.99,
    description: 'Waterproof, slashproof, electro-magnetic pulse (EMP) shielding compartments. Features integrated USB-C external charging ports and dynamic solar panel grid.',
    category: 'exo-apparel',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 97,
    reviews: [],
    inventory: 19,
    discountPercentage: 13,
    tags: ['backpack', 'techwear', 'shielding'],
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'LX-88902',
    date: '2026-05-24',
    status: 'processing',
    items: [
      {
        productId: 'prod-1',
        name: 'Apex Cyber Jacket v4.0',
        price: 349.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop',
        selectedSize: 'M',
        selectedColor: 'Obsidian Black',
      }
    ],
    shippingAddress: {
      fullName: 'John Doe',
      address: '77 Cyberpunk Lane, Sector 9',
      city: 'Neo Tokyo',
      postalCode: '100-0001',
      country: 'Japan',
    },
    shippingMethod: 'Express Quantum Delivery',
    paymentMethod: 'NeuroPay Wallet',
    subtotal: 349.99,
    tax: 28.00,
    shippingCost: 15.00,
    discount: 50.00,
    total: 342.99,
  },
  {
    id: 'LX-87239',
    date: '2026-05-20',
    status: 'delivered',
    items: [
      {
        productId: 'prod-2',
        name: 'Cortex Spatial Earbuds',
        price: 189.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop',
        selectedColor: 'Glacial White',
      }
    ],
    shippingAddress: {
      fullName: 'Alice Mercer',
      address: '422 Orbit Ave, Floor 18',
      city: 'New York City',
      postalCode: '10012',
      country: 'USA',
    },
    shippingMethod: 'Drone Air Delivery',
    paymentMethod: 'Credit Card',
    subtotal: 379.98,
    tax: 30.40,
    shippingCost: 0.00,
    discount: 0.00,
    total: 410.38,
  }
];

export const MOCK_ADMIN_STATS: DashboardStats = {
  revenue: 849200.00,
  orders: 1482,
  products: 42,
  customers: 928,
  salesData: [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 61000 },
    { name: 'Apr', value: 58000 },
    { name: 'May', value: 89000 },
  ],
  revenueData: [
    { name: 'Jan', revenue: 38000 },
    { name: 'Feb', revenue: 47000 },
    { name: 'Mar', revenue: 54000 },
    { name: 'Apr', revenue: 51000 },
    { name: 'May', revenue: 84000 },
  ],
  categoryData: [
    { name: 'Exo Apparel', value: 45 },
    { name: 'Neural & Audio', value: 25 },
    { name: 'Chrono Tech', value: 15 },
    { name: 'Cyber Footwear', value: 15 },
  ]
};

export const MOCK_FAQS = [
  {
    question: 'How do the adaptive visual and heating panels in the apparel work?',
    answer: 'Our smart apparel incorporates custom flexible polymer visual arrays and thin-film carbon micro-heating grids. These run off dynamic low-voltage rechargeable cell batteries housed inside hidden compartments, which can be charged via magnetic USB-C charging cords.'
  },
  {
    question: 'What is NeuroPay and what payment methods do you support?',
    answer: 'NeuroPay is our simulated ultra-fast digital wallet system. In our luxury checkout simulator, we support simulated transactions using Apple Pay, mock credit cards, and instant crypto token deposits (BTC, ETH, USDC).'
  },
  {
    question: 'What are the delivery times for the Drone Air shipping option?',
    answer: 'For regions supported by our air hubs, Drone Air delivery takes approximately 1 to 3 hours from confirmation. Traditional Express Delivery takes 2 to 4 days.'
  },
  {
    question: 'Can I change or cancel my order after it has been placed?',
    answer: 'Yes! Orders in "processing" status can be cancelled or adjusted from your Order Tracking page, or by contacting our AI Support interface immediately.'
  }
];
export const MOCK_BRANDS = [
  { name: 'Nvidia', logo: 'https://cdn.worldvectorlogo.com/logos/nvidia.svg' },
  { name: 'Nike', logo: 'https://cdn.worldvectorlogo.com/logos/nike-11.svg' },
  { name: 'Apple', logo: 'https://cdn.worldvectorlogo.com/logos/apple.svg' },
  { name: 'Sony', logo: 'https://cdn.worldvectorlogo.com/logos/sony-logo.svg' },
  { name: 'SpaceX', logo: 'https://cdn.worldvectorlogo.com/logos/spacex.svg' },
  { name: 'Tesla', logo: 'https://cdn.worldvectorlogo.com/logos/tesla-motors.svg' },
];
export const MOCK_TESTIMONIALS = [
  {
    quote: "The visual paneling is literally out of this world. I walked down the street and people actually stopped to ask where I got this jacket.",
    author: "Zev Bennett",
    title: "Technologist & Fashion Futurist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
  },
  {
    quote: "Cortex Spatial Buds have completely changed the way I listen to ambient music. The bio-acoustics calibrate so neatly, and the spatial staging is absolutely vast.",
    author: "Lyra Thorne",
    title: "Synthesizer Artist",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop"
  },
  {
    quote: "Heavy-duty shielding combined with a gorgeous modular techwear aesthetic. Easily the finest daily backpack I have ever owned.",
    author: "Kai Vance",
    title: "Cyber Security Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
  }
];
