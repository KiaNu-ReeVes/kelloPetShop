'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, ChevronRight, Heart, Search } from 'lucide-react';
import ProductFilters from '@/components/ProductFilters';

export default function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    alert('محصول به سبد خرید اضافه شد!');
  };

  // Mock product data
  const allProducts = [
    {
      id: 1,
      name: 'غذای خشک گربه پرتوئین بالا',
      brand: 'دکتر هاس',
      price: 250000,
      originalPrice: 300000,
      image: '/images/image.png',
      category: 'cat-treats',
      stock: true,
      rating: 4.5,
      reviews: 48,
    },
    {
      id: 2,
      name: 'اسباب بازی گربه رنگی',
      brand: 'فنبی',
      price: 85000,
      originalPrice: 110000,
      image: '/images/image.png',
      category: 'cat-treats',
      stock: true,
      rating: 4.8,
      reviews: 32,
    },
    {
      id: 3,
      name: 'تشویقی سگ معلق',
      brand: 'ونپی',
      price: 120000,
      originalPrice: 150000,
      image: '/images/image.png',
      category: 'dog-treats',
      stock: true,
      rating: 4.6,
      reviews: 25,
    },
    {
      id: 4,
      name: 'برس پرزگیر حرفه‌ای',
      brand: 'وینستون',
      price: 140000,
      originalPrice: 170000,
      image: '/images/image.png',
      category: 'hygiene',
      stock: true,
      rating: 4.9,
      reviews: 61,
    },
    {
      id: 5,
      name: 'ظرف غذای طراح‌شده',
      brand: 'دکتر هاس',
      price: 95000,
      image: '/images/image.png',
      category: 'food-bowls',
      stock: true,
      rating: 4.3,
      reviews: 19,
    },
    {
      id: 6,
      name: 'پرزگیر خودکار',
      brand: 'فنبی',
      price: 280000,
      image: '/images/image.png',
      category: 'hygiene',
      stock: true,
      rating: 4.7,
      reviews: 44,
    },
    {
      id: 7,
      name: 'تشویقی ماهی برای سگ',
      brand: 'ونپی',
      price: 65000,
      image: '/images/image.png',
      category: 'dog-treats',
      stock: false,
      rating: 4.4,
      reviews: 28,
    },
    {
      id: 8,
      name: 'اسباب بازی سگ دایم',
      brand: 'وینستون',
      price: 125000,
      image: '/images/image.png',
      category: 'dog-treats',
      stock: true,
      rating: 4.5,
      reviews: 35,
    },
    {
      id: 9,
      name: 'شامپو حیوان خانگی',
      brand: 'دکتر هاس',
      price: 75000,
      originalPrice: 90000,
      image: '/images/image.png',
      category: 'hygiene',
      stock: true,
      rating: 4.6,
      reviews: 52,
    },
    {
      id: 10,
      name: 'غذای مرطوب گربه',
      brand: 'فنبی',
      price: 45000,
      image: '/images/image.png',
      category: 'cat-treats',
      stock: true,
      rating: 4.2,
      reviews: 31,
    },
    {
      id: 11,
      name: 'غذای خشک سگ',
      brand: 'ونپی',
      price: 180000,
      originalPrice: 220000,
      image: '/images/image.png',
      category: 'dog-treats',
      stock: true,
      rating: 4.8,
      reviews: 67,
    },
    {
      id: 12,
      name: 'ملزومات حمام',
      brand: 'وینستون',
      price: 110000,
      image: '/images/image.png',
      category: 'hygiene',
      stock: true,
      rating: 4.4,
      reviews: 22,
    },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts;

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.includes(searchQuery) ||
          p.brand.includes(searchQuery)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const ranges: Record<string, [number, number]> = {
        'under-50k': [0, 50000],
        '50k-100k': [50000, 100000],
        '100k-200k': [100000, 200000],
        'over-200k': [200000, Infinity],
      };
      const [min, max] = ranges[filters.priceRange] || [0, Infinity];
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // Apply stock filter
    if (filters.inStock) {
      result = result.filter((p) => p.stock);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'expensive':
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Kellopet
            </Link>

            <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                خانه
              </Link>
              <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors text-primary">
                محصولات
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block relative">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block relative">
                <Heart size={20} fill={favorites.size > 0 ? 'currentColor' : 'none'} className={favorites.size > 0 ? 'text-red-500' : ''} />
                {favorites.size > 0 && (
                  <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.size}
                  </span>
                )}
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <aside className={`w-64 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <ProductFilters onFilterChange={setFilters} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Top bar with search and sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="جستجو بین محصولات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                <option value="popular">پرفروش‌ترین</option>
                <option value="newest">جدیدترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>

              {/* Sidebar Toggle for Mobile */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
              >
                {isSidebarOpen ? 'پنهان کردن فیلتر' : 'نمایش فیلتر'}
              </button>
            </div>

            {/* Results info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredProducts.length} محصول یافت شد
              </p>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative bg-muted overflow-hidden h-56">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                          فروش
                        </span>
                      )}
                      {!product.stock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold">موجود نیست</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs text-primary font-semibold">{product.brand}</p>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <Heart
                            size={20}
                            fill={favorites.has(product.id) ? 'currentColor' : 'none'}
                            className={favorites.has(product.id) ? 'text-red-500' : 'text-muted-foreground'}
                          />
                        </button>
                      </div>
                      <h3 className="font-bold text-base mb-2 text-foreground line-clamp-2 h-14">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1 mb-3">
                        <span className="text-xs text-yellow-500">★</span>
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews} نظر)
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-primary">
                          {product.price.toLocaleString('fa-IR')} تومان
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('fa-IR')}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => product.stock && addToCart(product.id)}
                        disabled={!product.stock}
                        className={`w-full font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                          product.stock
                            ? 'bg-primary hover:bg-primary/90 text-white'
                            : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={18} />
                        {product.stock ? 'افزودن به سبد' : 'ناموجود'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">محصولی با این شرایط پیدا نشد</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({});
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
