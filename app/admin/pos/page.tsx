'use client';

import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Search,
  X,
  DollarSign,
  Percent,
  CreditCard,
  Banknote,
  Receipt,
  Printer,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import productsData from '@/data/products.json';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
  total: number;
}

const availableProducts = productsData.products.map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  price: p.price,
  stock: p.stock ? 999 : 0,
  category: p.category,
  image: p.image,
}));
const availableCategorys = productsData.categories.map(p => ({
  id: p.id,
  label: p.label,
  parent: p.parent,
}));

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [saleNumber, setSaleNumber] = useState(`POS-${Date.now().toString().slice(-6)}`);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [...new Set(availableProducts.map((p) => p.category))];
  const filteredProducts = availableProducts.filter((p) => {
    const matchesSearch =
      p.name.includes(searchTerm) || p.id.toString() === searchTerm;
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const categoryMap = Object.fromEntries(
    availableCategorys.map(cat => [cat.id, cat.label])
  );
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discountAmount =
    discountType === 'percent' ? (subtotal * discount) / 100 : discount;
  const total = Math.max(0, subtotal - discountAmount);

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  total: item.price * (item.quantity + 1),
                }
              : item
          )
        );
      }
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          quantity: 1,
          total: product.price,
        },
      ]);
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      const product = availableProducts.find((p) => p.id === id);
      if (product && quantity <= product.stock) {
        setCart(
          cart.map((item) =>
            item.id === id
              ? { ...item, quantity, total: item.price * quantity }
              : item
          )
        );
      }
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowPaymentDialog(true);
  };

  const handleCompletePayment = () => {
    // Process payment
    console.log('Payment completed:', {
      saleNumber,
      items: cart,
      subtotal,
      discount: discountAmount,
      total,
      paymentMethod,
    });
    
    setShowPaymentDialog(false);
    setShowSuccessDialog(true);
    
    // Reset after a delay
    setTimeout(() => {
      setCart([]);
      setDiscount(0);
      setSaleNumber(`POS-${Date.now().toString().slice(-6)}`);
      setShowSuccessDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">نقطه فروش (POS)</h1>
            <p className="text-muted-foreground mt-1">سیستم فروش برای فروشگاه فیزیکی</p>
          </div>

          {/* Search & Filter */}
          <Card className="p-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
                <Input
                  placeholder="جستجو در محصولات یا کد..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedCategory ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('')}
                >
                  همه
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryMap[category] ?? category}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative bg-muted h-32 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded font-bold ${
                      product.stock > 5
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock > 0 ? product.stock : 'تمام'}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-3 flex flex-col flex-grow">
                  <p className="font-semibold text-xs mb-1 line-clamp-2">{product.name}</p>
                  <p className="text-xs text-muted-foreground mb-3">{product.brand}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-base font-bold text-primary">
                      {(product.price / 1000).toFixed(0)}K
                    </p>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="bg-primary hover:bg-primary/90 text-white h-7 px-2"
                      size="sm"
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-6">
          {/* Cart Header */}
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-orange-600/10 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">سفارش شماره</p>
                <p className="font-bold text-primary">{saleNumber}</p>
              </div>
              <ShoppingCart className="text-primary" size={24} />
            </div>
          </Card>

          {/* Cart Items */}
          <Card className="p-4 max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart
                  className="mx-auto mb-3 text-muted-foreground"
                  size={32}
                />
                <p className="text-muted-foreground text-sm">سبد خالی است</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-3 bg-muted rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-12 h-12 bg-background rounded overflow-hidden shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.price.toLocaleString('fa-IR')} تومان
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-6 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus size={14} />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-600 hover:bg-red-100"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Discount Section */}
          {cart.length > 0 && (
            <Card className="p-4 space-y-3">
              <p className="font-semibold text-sm">تخفیف</p>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="مقدار"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="flex-1"
                />
                <select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value as any)}
                  className="px-3 py-2 border border-border rounded-lg text-sm"
                >
                  <option value="percent">درصد %</option>
                  <option value="fixed">ریالی</option>
                </select>
              </div>
            </Card>
          )}

          {/* Summary */}
          {cart.length > 0 && (
            <Card className="p-4 space-y-3 border-l-4 border-l-primary">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">جمع:</span>
                  <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>تخفیف:</span>
                    <span>-{discountAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>مجموع:</span>
                  <span className="text-primary text-lg">
                    {total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          {cart.length > 0 && (
            <div className="space-y-3">
              <Button
                onClick={handleCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-white h-10"
              >
                <DollarSign size={20} className="ml-2" />
                پرداخت
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCart([]);
                  setDiscount(0);
                }}
              >
                <X size={20} className="ml-2" />
                پاک کردن سبد
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>انجام پرداخت</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Payment Summary */}
            <Card className="p-4 bg-muted">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>جمع:</span>
                  <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>تخفیف:</span>
                    <span>-{discountAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>باید پرداخت:</span>
                  <span className="text-primary">
                    {total.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>
            </Card>

            {/* Payment Method */}
            <div className="space-y-2">
              <p className="font-semibold text-sm">روش پرداخت</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('cash')}
                  className="gap-2"
                >
                  <Banknote size={18} />
                  نقد
                </Button>
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="gap-2"
                >
                  <CreditCard size={18} />
                  کارت
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowPaymentDialog(false)}
              >
                انصراف
              </Button>
              <Button
                onClick={handleCompletePayment}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Check size={18} className="ml-2" />
                تکمیل پرداخت
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md text-center">
          <div className="py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">خرید موفق</h2>
            <p className="text-muted-foreground text-sm mb-4">
              شماره فیش: {saleNumber}
            </p>
            <p className="text-2xl font-bold text-primary">
              {total.toLocaleString('fa-IR')} تومان
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
