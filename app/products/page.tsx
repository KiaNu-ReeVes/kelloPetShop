'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductFilters from '@/components/ProductFilters';
import Header from '@/components/Header';
import productsData from '@/data/products.json';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Heart, ShoppingCart, X, Menu } from 'lucide-react';

export default function ProductsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Use products from JSON
  const allProducts = productsData.products.map((p: any) => ({
    ...p,
    stock: p.stock !== false,
  }));

  const filteredProducts = useMemo(() => {
    let result = allProducts;

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
  }, [filters, sortBy]);

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Header cartCount={cart.length} />
      <div className="flex justify-between items-center p-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block relative">
          <Heart size={20} fill={favorites.length > 0 ? 'currentColor' : 'none'} className={favorites.length > 0 ? 'text-red-500' : ''} />
          {favorites.length > 0 && (
            <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
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
        <ThemeSwitcher />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <aside className={`w-64 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
            <ProductFilters onFilterChange={setFilters} />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Top bar with sort and filter toggle */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
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
                      <p className="text-xs text-primary font-semibold mb-2">{product.brand}</p>
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
                          {product.price.toLocaleString('fa-IR')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {product.originalPrice.toLocaleString('fa-IR')}
                          </span>
                        )}
                      </div>

                      <Link href={`/products/${product.id}`}>
                        <button className="w-full font-medium py-2 rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors">
                          مشاهده جزئیات
                        </button>
                      </Link>

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
