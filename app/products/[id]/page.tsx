'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import productsData from '@/data/products.json';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const allProduct = productsData.products.find(p => p.id === parseInt(params.id));
  const product = allProduct ? {
    ...allProduct,
    inStock: allProduct.stock !== false,
    details: {
      weight: '۲ کیلوگرم',
      ingredients: 'گوشت مرغ، برنج، روغن ماهی، ویتامین‌ها و مواد معدنی',
      ageGroup: 'بالغین',
      lifeStage: 'نگهداری روزانه',
    },
    features: [
      'پرتوئین بالا برای عضلات قوی',
      'فرمولاسیون متوازن غذایی',
      'حاوی اسیدهای چرب ضروری',
      'درایت فلاکونی ایمنی سلامت',
    ],
  } : null;

  if (!product) {
    return (
      <div dir="rtl" className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">محصول یافت نشد</h1>
          <Link href="/products" className="text-primary hover:underline">
            بازگشت به محصولات
          </Link>
        </div>
      </div>
    );
  }
  const [quantity, setQuantity] = useState(1);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `${product.name} - ${product.price.toLocaleString('fa-IR')} تومان`,
        url: url,
      });
    } else {
      alert('لینک کپی شد: ' + url);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
          <Link href="/" className="hover:text-primary transition-colors whitespace-nowrap">
            خانه
          </Link>
          <span className="mx-1">/</span>
          <Link href="/products" className="hover:text-primary transition-colors whitespace-nowrap">
            محصولات
          </Link>
          <span className="mx-1">/</span>
          <span className="text-foreground line-clamp-1">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden border-2 border-primary/30 bg-muted">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Brand and Title */}
            <p className="text-sm text-primary font-semibold mb-2">{product.brand}</p>
            <h1 className="text-4xl font-bold mb-4 text-foreground">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg text-yellow-500">★</span>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} نظر)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="border-b border-border pb-4 sm:pb-6 mb-4 sm:mb-6">
              <div className="flex items-end gap-2 sm:gap-3 mb-2">
                <span className="text-2xl sm:text-4xl font-bold text-primary">
                  {product.price.toLocaleString('fa-IR')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-lg text-muted-foreground line-through pb-0 sm:pb-1">
                    {product.originalPrice.toLocaleString('fa-IR')}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs sm:text-sm text-accent font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{product.description}</p>

            {/* Quantity and Buttons */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">تعداد:</span>
                <div className="flex items-center border border-border rounded-lg bg-background">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 sm:p-2 hover:bg-muted transition-colors"
                  >
                    <Minus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                  <span className="px-3 sm:px-4 py-1 sm:py-2 font-semibold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 sm:p-2 hover:bg-muted transition-colors"
                  >
                    <Plus size={16} className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
                  title="اشتراک‌گذاری"
                >
                  <Share2 size={18} className="sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">اشتراک‌گذاری</span>
                  <span className="sm:hidden">اشتراک</span>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="p-3 sm:p-4 rounded-lg bg-muted/50 border border-border mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-semibold text-green-500">✓ موجود در انبار</p>
              <p className="text-xs text-muted-foreground mt-1">ارسال در ۱ تا ۲ روز کاری</p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              {product.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Shipping & Return Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">ارسال ویژه</p>
                  <p className="text-xs text-muted-foreground">ارسال رایگان برای خریدهای بالای ۵۰۰ هزار</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">ضمانت اصالت</p>
                  <p className="text-xs text-muted-foreground">تمام محصولات ۱۰۰% اصلی و معتبر</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">بازگرداندن آسان</p>
                  <p className="text-xs text-muted-foreground">بازگرداندن تا ۳۰ روز بدون دلیل</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="bg-card border border-border rounded-lg p-4 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">مشخصات محصول</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold mb-4 text-foreground">مشخصات تکنیکی</h3>
              <div className="space-y-3">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground text-sm capitalize">{key}</span>
                    <span className="font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-foreground">مزایای محصول</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1">●</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {[2, 3, 4, 5].map((id) => (
              <Link
                key={id}
                href={`/products/${id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-muted overflow-hidden h-48">
                  <img
                    src="/images/image.png"
                    alt="محصول مرتبط"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-semibold mb-2">برند</p>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">محصول مرتبط</h3>
                  <span className="text-primary font-bold text-sm">۹۵,۰۰۰ تومان</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
