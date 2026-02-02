'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Home, User, ShoppingBag, Heart, MapPin, Settings, LogOut, Menu, X } from 'lucide-react';
import Header from '@/components/Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: 'خانه', href: '/dashboard', icon: Home },
    { name: 'پروفایل', href: '/dashboard/profile', icon: User },
    { name: 'سفارشات', href: '/dashboard/orders', icon: ShoppingBag },
    { name: 'علاقه‌مندی‌ها', href: '/dashboard/wishlist', icon: Heart },
    { name: 'آدرس‌ها', href: '/dashboard/addresses', icon: MapPin },
    { name: 'تنظیمات', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative w-64 bg-card border-l border-border h-screen overflow-y-auto transition-transform duration-300 z-40 ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
              داشبورد
            </h2>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Icon size={20} className="text-primary group-hover:text-orange-600" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}

              <hr className="my-4 border-border" />

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors group">
                <LogOut size={20} />
                <span className="text-sm font-medium">خروج</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
