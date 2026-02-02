'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  TrendingUp,
  Grid3X3,
  Tag,
  Receipt,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks: SidebarLink[] = [
    { href: '/admin', label: 'داشبورد', icon: <BarChart3 size={20} /> },
    { href: '/admin/products', label: 'محصولات', icon: <Package size={20} /> },
    { href: '/admin/categories', label: 'دسته‌بندی‌ها', icon: <Grid3X3 size={20} /> },
    { href: '/admin/brands', label: 'برندها', icon: <Tag size={20} /> },
    { href: '/admin/pos', label: 'نقطه فروش (POS)', icon: <Receipt size={20} />, badge: 'جدید' },
    { href: '/admin/orders', label: 'سفارشات', icon: <ShoppingCart size={20} /> },
    { href: '/admin/customers', label: 'مشتریان', icon: <Users size={20} /> },
    { href: '/admin/analytics', label: 'تحلیلات', icon: <TrendingUp size={20} /> },
    { href: '/admin/settings', label: 'تنظیمات', icon: <Settings size={20} /> },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-card border-l border-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:translate-x-0 lg:static lg:transform-none lg:shadow-none`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden p-4 border-b border-border flex items-center justify-between">
          <h1 className="font-bold text-lg text-primary">پنل ادمین</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-muted rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar logo */}
        <div className="hidden lg:flex p-6 border-b border-border items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-orange-600 rounded-lg flex items-center justify-center">
            <Home className="text-white" size={20} />
          </div>
          <div>
            <h1 className="font-bold text-primary">KelloPet</h1>
            <p className="text-xs text-muted-foreground">پنل مدیریت</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-between px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm font-medium">{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-xs bg-primary text-white px-2 py-1 rounded">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={20} />
            <span className="text-sm">خروج</span>
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-card border-b border-border sticky top-0 z-40 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">مدیر فروشگاه</p>
                <p className="text-xs text-muted-foreground">admin@kellopet.ir</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white font-bold">
                م
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
