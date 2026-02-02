'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import productsData from '@/data/products.json';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  const allProducts = productsData.products;

  const cartProducts = useMemo(() => {
    return Object.entries(cartItems)
      .map(([id, quantity]) => {
        const product = allProducts.find(p => p.id === parseInt(id));
        return product ? { ...product, cartQuantity: quantity } : null;
      })
      .filter(Boolean);
  }, [cartItems]);

  const subtotal = useMemo(
    () => cartProducts.reduce((sum, item) => sum + (item!.price * item!.cartQuantity), 0),
    [cartProducts]
  );

  const shippingCost = subtotal > 500000 ? 0 : 50000;
  const tax = (subtotal + shippingCost) * 0.09;
  const total = subtotal + shippingCost + tax;

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Header cartCount={Object.values(cartItems).reduce((a, b) => a + b, 0)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            خانه
          </Link>
          <span>/</span>
          <span className="text-foreground">سبد خرید</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">سبد خرید</h1>

        {cartProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">سبد خرید شما خالی است</p>
            <Link href="/products">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                رفتن به محصولات
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg sm:rounded-xl overflow-hidden">
                {/* Headers - Hidden on mobile */}
                <div className="hidden sm:grid sm:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4 bg-muted/50 border-b border-border text-xs sm:text-sm font-semibold text-muted-foreground">
                  <div className="col-span-5">محصول</div>
                  <div className="col-span-2 text-center">قیمت</div>
                  <div className="col-span-2 text-center">تعداد</div>
                  <div className="col-span-2 text-center">جمع</div>
                  <div className="col-span-1"></div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-border">
                  {cartProducts.map(item => (
                    <div key={item!.id} className="p-3 sm:p-4 flex flex-col sm:grid sm:grid-cols-12 sm:gap-3 sm:gap-4 sm:items-center">
                      {/* Image and Name */}
                      <div className="col-span-5 flex gap-3 sm:gap-4 mb-3 sm:mb-0">
                        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted rounded overflow-hidden shrink-0">
                          <img
                            src={item!.image}
                            alt={item!.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xs sm:text-sm md:text-base mb-1 line-clamp-2">
                            {item!.name}
                          </h3>
                          <p className="text-xs text-primary">{item!.brand}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex justify-between sm:col-span-2 sm:text-center mb-2 sm:mb-0">
                        <span className="sm:hidden text-xs text-muted-foreground">قیمت:</span>
                        <span className="font-bold text-xs sm:text-sm md:text-base">
                          {item!.price.toLocaleString('fa-IR')}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex justify-between sm:col-span-2 sm:justify-center mb-2 sm:mb-0">
                        <span className="sm:hidden text-xs text-muted-foreground">تعداد:</span>
                        <div className="flex items-center border border-border rounded bg-background">
                          <button
                            onClick={() => updateQuantity(item!.id, item!.cartQuantity - 1)}
                            className="p-0.5 sm:p-1 hover:bg-muted transition-colors"
                            aria-label="کم کردن"
                          >
                            <Minus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <span className="px-2 sm:px-3 py-0.5 sm:py-1 font-bold text-xs sm:text-sm">
                            {item!.cartQuantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item!.id, item!.cartQuantity + 1)}
                            className="p-0.5 sm:p-1 hover:bg-muted transition-colors"
                            aria-label="افزایش"
                          >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between sm:col-span-2 sm:text-center mb-2 sm:mb-0">
                        <span className="sm:hidden text-xs text-muted-foreground">جمع:</span>
                        <span className="font-bold text-xs sm:text-sm md:text-base text-primary">
                          {(item!.price * item!.cartQuantity).toLocaleString('fa-IR')}
                        </span>
                      </div>

                      {/* Delete */}
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => removeFromCart(item!.id)}
                          className="p-1 sm:p-2 hover:bg-destructive/10 text-destructive rounded transition-colors"
                          aria-label="حذف از سبد"
                        >
                          <Trash2 size={16} className="sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 sticky top-20">
                <h2 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6">خلاصه سفارش</h2>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">جمع محصولات:</span>
                    <span className="font-bold">
                      {subtotal.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">هزینه ارسال:</span>
                    <span className={`font-bold ${shippingCost === 0 ? 'text-green-500' : ''}`}>
                      {shippingCost === 0 ? 'رایگان' : `${shippingCost.toLocaleString('fa-IR')} تومان`}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">مالیات (9%):</span>
                    <span className="font-bold">
                      {Math.round(tax).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-bold mb-4 sm:mb-6">
                  <span>مبلغ نهایی:</span>
                  <span className="text-primary">
                    {Math.round(total).toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                {subtotal > 500000 && (
                  <div className="bg-green-50 border border-green-200 rounded p-2 sm:p-3 mb-4 sm:mb-6 text-xs text-green-700">
                    ✓ شما از ارسال رایگان استفاده می‌کنید!
                  </div>
                )}

                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 sm:py-3 rounded-lg transition-colors mb-2 sm:mb-3 text-sm sm:text-base">
                  ادامه خریداری
                </button>

                <button className="w-full border border-border text-foreground hover:bg-muted font-medium py-2 rounded-lg transition-colors text-sm sm:text-base">
                  خریداری بعدی
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
