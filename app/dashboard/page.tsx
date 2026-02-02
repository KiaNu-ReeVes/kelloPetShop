'use client';

import { ShoppingBag, Heart, MapPin, User, TrendingUp, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const user = {
    name: 'احمد علیزاده',
    email: 'ahmad@example.com',
    phone: '09123456789',
  };

  const recentOrders = [
    {
      id: '1001',
      date: '۱۴۰۳/۱۰/۱۵',
      total: '۲۵۰,۰۰۰ تومان',
      status: 'تحویل شده',
      items: 3,
    },
    {
      id: '1002',
      date: '۱۴۰۳/۱۰/۱۲',
      total: '۱۵۰,۰۰۰ تومان',
      status: 'درحال ارسال',
      items: 2,
    },
    {
      id: '1003',
      date: '۱۴۰۳/۱۰/۰۸',
      total: '۸۵,۰۰۰ تومان',
      status: 'تحویل شده',
      items: 1,
    },
  ];

  const stats = [
    { label: 'کل سفارشات', value: '۱۲', icon: ShoppingBag, color: 'from-primary to-orange-600' },
    { label: 'علاقه‌مندی‌ها', value: '۸', icon: Heart, color: 'from-red-500 to-pink-600' },
    { label: 'آدرس‌های ذخیره شده', value: '۳', icon: MapPin, color: 'from-blue-500 to-cyan-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-orange-600/10 border border-primary/20 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2">خوش آمدید، {user.name}</h1>
        <p className="text-muted-foreground">اینجا می‌توانید تمام اطلاعات و سفارشات خود را مدیریت کنید</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">آخرین سفارشات</h2>
          <Link
            href="/dashboard/orders"
            className="text-primary hover:text-orange-600 text-sm font-medium transition-colors"
          >
            مشاهده همه
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">سفارش #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-primary">{order.total}</p>
                <p className={`text-xs ${
                  order.status === 'تحویل شده' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/dashboard/profile"
          className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <User size={24} className="text-primary mb-3 group-hover:text-orange-600" />
          <h3 className="font-bold mb-2">پروفایل من</h3>
          <p className="text-sm text-muted-foreground">مشاهده و ویرایش اطلاعات شخصی</p>
        </Link>

        <Link
          href="/dashboard/wishlist"
          className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all group"
        >
          <Heart size={24} className="text-red-500 mb-3 group-hover:text-pink-600" />
          <h3 className="font-bold mb-2">علاقه‌مندی‌های من</h3>
          <p className="text-sm text-muted-foreground">محصولات مورد علاقه‌ای که ذخیره کردید</p>
        </Link>
      </div>
    </div>
  );
}
