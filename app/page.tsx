'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Search, Menu, X, ChevronRight, Package, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: 'غذای خشک گربه',
      brand: 'دکتر هاس',
      price: '۲۵۰,۰۰۰',
      originalPrice: '۳۰۰,۰۰۰',
      image: '/images/image.png',
      badge: 'فروش',
    },
    {
      id: 2,
      name: 'اسباب بازی گربه رنگی',
      brand: 'فنبی',
      price: '۸۵,۰۰۰',
      originalPrice: '۱۱۰,۰۰۰',
      image: '/images/image.png',
      badge: 'جدید',
    },
    {
      id: 3,
      name: 'تشویقی سگ معلق',
      brand: 'ونپی',
      price: '۱۲۰,۰۰۰',
      originalPrice: '۱۵۰,۰۰۰',
      image: '/images/image.png',
      badge: 'فروش',
    },
    {
      id: 4,
      name: 'برس پرزگیر حرفه‌ای',
      brand: 'وینستون',
      price: '۱۴۰,۰۰۰',
      originalPrice: '۱۷۰,۰۰۰',
      image: '/images/image.png',
      badge: 'پرفروش',
    },
  ];

  const newProducts = [
    {
      id: 5,
      name: 'ظرف غذای طراح‌شده',
      brand: 'دکتر هاس',
      price: '۹۵,۰۰۰',
      image: '/images/image.png',
    },
    {
      id: 6,
      name: 'پرزگیر خودکار',
      brand: 'فنبی',
      price: '۲۸۰,۰۰۰',
      image: '/images/image.png',
    },
    {
      id: 7,
      name: 'تشویقی ماهی برای سگ',
      brand: 'ونپی',
      price: '۶۵,۰۰۰',
      image: '/images/image.png',
    },
    {
      id: 8,
      name: 'اسباب بازی سگ دایم',
      brand: 'وینستون',
      price: '۱۲۵,۰۰۰',
      image: '/images/image.png',
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground dark">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kellopet
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
              <Link href="/products" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                محصولات
              </Link>
              <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                تماس
              </Link>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors hidden sm:block">
                <Heart size={20} />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart size={20} />
              </button>
              <Link href="/login">
                <Button size="sm" className="hidden sm:flex bg-primary hover:bg-primary/90 text-white">
                  ورود
                </Button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2">
              <Link href="/products" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                محصولات
              </Link>
              <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                درباره ما
              </Link>
              <Link href="/contact" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                تماس
              </Link>
              <Link href="/login" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors">
                ورود
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-secondary/20 to-background py-12 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                <span className="text-primary">بهترین محصولات</span>
                <br />
                برای دوستان خطرناک‌تان
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Kellopet منتخب بهترین برندهای جهانی محصولات حیوان خانگی را برای شما فراهم می‌کند. کیفیت تضمین شده و ارسال سریع.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                    مشاهده محصولات
                    <ChevronRight className="mr-2" size={20} />
                  </Button>
                </Link>
                <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                  بیشتر بدانید
                </button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative w-full max-w-sm h-80 rounded-2xl overflow-hidden border-2 border-primary/30">
                <img
                  src="/images/image.png"
                  alt="محصولات Kellopet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">پربازدیدترین کالاها</h2>
              <p className="text-muted-foreground mt-2">محصولاتی که بیشتر مورد پسند مشتریان هستند</p>
            </div>
            <Link href="/products" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2">
              مشاهده همه
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative bg-muted overflow-hidden h-48 sm:h-56">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <p className="text-xs text-primary font-semibold mb-2">{product.brand}</p>
                  <h3 className="font-bold text-base mb-3 text-foreground line-clamp-2">{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">{product.price} تومان</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>

                  {/* Button */}
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    افزودن به سبد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newest Products */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">جدیدترین کالاها</h2>
              <p className="text-muted-foreground mt-2">محصولات تازه‌ای که اخیرا اضافه شده‌اند</p>
            </div>
            <Link href="/products" className="text-primary hover:text-primary/80 font-medium flex items-center gap-2">
              مشاهده همه
              <ChevronRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative bg-muted overflow-hidden h-48 sm:h-56">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-xs text-primary font-semibold mb-2">{product.brand}</p>
                  <h3 className="font-bold text-base mb-3 text-foreground line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">{product.price} تومان</span>
                  </div>
                  <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} />
                    افزودن به سبد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">چرا Kellopet؟</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ارسال ویژه</h3>
              <p className="text-muted-foreground">ارسال سریع و ایمن محصولات به سراسر کشور با بسته‌بندی مناسب</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Clock size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">پشتیبانی ۲۴ ساعته</h3>
              <p className="text-muted-foreground">تیم پشتیبانی ما شبانه روز آماده پاسخ‌گویی به سوالات‌تان است</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <CheckCircle size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">ضمانت اصالت کالا</h3>
              <p className="text-muted-foreground">تمام محصولات اصلی و معتبر با گارانتی رسمی است</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Kellopet</h3>
              <p className="text-muted-foreground text-sm">بهترین محصولات حیوان خانگی در یک جا</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">درباره ما</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">شرایط و قوانین</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">حریم خصوصی</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">دسته‌بندی</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">غذای حیوانات</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">اسباب بازی</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">بهداشتی</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">ارتباط با ما</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>تلفن: ۰۲۱-۹۹۹۹۹۹۹۹</li>
                <li>ایمیل: info@kellopet.ir</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-muted-foreground text-sm">
              © ۱۴۰۲ Kellopet. تمام حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
