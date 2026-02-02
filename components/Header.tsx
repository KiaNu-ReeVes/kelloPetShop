'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-orange-200/20 dark:border-orange-900/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
            Kellopet
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              }`}
            >
              خانه
            </Link>
            <Link
              href="/products"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/products') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              }`}
            >
              محصولات
            </Link>
            <Link
              href="/login"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/login') ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
              }`}
            >
              ورود
            </Link>
          </nav>

          {/* Right side - Icons and Theme */}
          <div className="flex items-center gap-3">
            <Link href="/products" className="relative">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ShoppingCart size={20} />
              </button>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <ThemeSwitcher />

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
            <Link href="/" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
              خانه
            </Link>
            <Link href="/products" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
              محصولات
            </Link>
            <Link href="/login" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted">
              ورود
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
