'use client';

import { useState } from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from "next/image";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: 'غذای خشک گربه پرتوئین بالا',
      brand: 'دکتر هاس',
      price: 250000,
      originalPrice: 300000,
      image: '/images/image.png',
      inStock: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: 'اسباب بازی گربه رنگی',
      brand: 'فنبی',
      price: 85000,
      originalPrice: 110000,
      image: '/images/image.png',
      inStock: true,
      rating: 4.8,
    },
    {
      id: 3,
      name: 'تشویقی سگ معلق',
      brand: 'ونپی',
      price: 120000,
      originalPrice: 150000,
      image: '/images/image.png',
      inStock: false,
      rating: 4.6,
    },
    {
      id: 4,
      name: 'برس پرزگیر حرفه‌ای',
      brand: 'وینستون',
      price: 140000,
      originalPrice: 170000,
      image: '/images/image.png',
      inStock: true,
      rating: 4.9,
    },
  ]);

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const totalSavings = wishlist.reduce((sum, item) => sum + (item.originalPrice - item.price), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">علاقه‌مندی‌های من</h1>
        <p className="text-muted-foreground mt-2">محصولاتی که برای بعداً ذخیره کرده‌اید</p>
      </div>

      {wishlist.length > 0 ? (
        <>
          {/* Summary Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">کل علاقه‌مندی‌ها</p>
              <p className="text-2xl font-bold">{wishlist.length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">موجود</p>
              <p className="text-2xl font-bold text-green-600">{wishlist.filter(i => i.inStock).length}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">کل تخفیف</p>
              <p className="text-2xl font-bold text-primary">{totalSavings.toLocaleString('fa-IR')} تومان</p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative bg-muted overflow-hidden h-48">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                                width={500}
                                height={500}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white dark:bg-slate-900 rounded-full hover:bg-red-100 transition-colors shadow"
                  >
                    <Trash2 size={18} className="text-destructive" />
                  </button>
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold">ناموجود</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold mb-2">{product.brand}</p>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-xs text-yellow-500">★</span>
                    <span className="text-xs text-muted-foreground">{product.rating}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">
                      {product.price.toLocaleString('fa-IR')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString('fa-IR')}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Link href={`/products/${product.id}`}>
                      <button className="w-full py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                        مشاهده جزئیات
                      </button>
                    </Link>
                    <button
                      disabled={!product.inStock}
                      className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium ${
                        product.inStock
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <ShoppingBag size={16} />
                      {product.inStock ? 'افزودن به سبد' : 'ناموجود'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Heart size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">علاقه‌مندی شما خالی است</h2>
          <p className="text-muted-foreground mb-6">محصولات مورد علاقه‌تان را اینجا پیدا خواهید کرد</p>
          <Link href="/products">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              مرور محصولات
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
