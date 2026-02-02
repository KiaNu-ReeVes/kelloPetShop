'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import ThemeSwitcher from '@/components/ThemeSwitcher'; // Import ThemeSwitcher

const productDetails: Record<string, any> = {
  1: {
    id: 1,
    name: 'غذای خشک گربه پرتوئین بالا',
    brand: 'دکتر هاس',
    price: 250000,
    originalPrice: 300000,
    rating: 4.5,
    reviews: 48,
    image: '/images/image.png',
    description:
      'غذای خشک گربه دکتر هاس با فرمولاسیون ویژه و پرتوئین بالا برای سلامتی و انرژی بهتر گربه‌های شما.',
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
    inStock: true,
  },
  2: {
    id: 2,
    name: 'اسباب بازی گربه رنگی',
    brand: 'فنبی',
    price: 85000,
    originalPrice: 110000,
    rating: 4.8,
    reviews: 32,
    image: '/images/image.png',
    description: 'اسباب بازی رنگی و جذاب برای سرگرمی گربه‌های شما با مواد ایمن.',
    details: {
      colors: 'قرمز، آبی، زرد، سبز',
      material: 'پلاستیک ایمن و غیر سمی',
      size: 'متوسط',
      weight: '۰.۵ کیلوگرم',
    },
    features: [
      'رنگ‌های جذاب برای توجه گربه',
      'مواد ایمن و غیر سمی',
      'طراحی ارگونومی',
      'آسان برای تمیز کردن',
    ],
    inStock: true,
  },
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = productDetails[params.id] || productDetails['1'];
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            خانه
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">
            محصولات
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
            <div className="border-b border-border pb-6 mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">
                  {product.price.toLocaleString('fa-IR')}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through pb-1">
                    {product.originalPrice.toLocaleString('fa-IR')}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-accent font-semibold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% تخفیف
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity and Buttons */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">تعداد:</span>
                <div className="flex items-center border border-border rounded-lg bg-card">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  title="اشتراک‌گذاری"
                >
                  <Share2 size={20} />
                  اشتراک‌گذاری
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border mb-6">
              <p className="text-sm font-semibold text-green-500">✓ موجود در انبار</p>
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
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">مشخصات محصول</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
