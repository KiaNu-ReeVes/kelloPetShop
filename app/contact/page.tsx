'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      alert('پیام شما با موفقیت ارسال شد. شکریا!');
    }, 1500);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground dark">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kellopet
              </div>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <ArrowRight size={18} />
                بازگشت
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">تماس با ما</h1>
          <p className="text-xl text-muted-foreground">
            سوالی دارید؟ ما اینجا هستیم تا کمک کنیم.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Phone */}
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Phone size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">تلفن</h3>
              <p className="text-muted-foreground mb-4">
                برای سفارش‌های عجیل و مشاوره تلفنی
              </p>
              <a href="tel:+982199999999" className="text-primary hover:text-primary/80 font-semibold text-lg">
                ۰۲۱-۹۹۹۹۹۹۹۹
              </a>
            </div>

            {/* Email */}
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-secondary/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Mail size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">ایمیل</h3>
              <p className="text-muted-foreground mb-4">
                برای سؤالات‌تان ایمیل ارسال کنید
              </p>
              <a href="mailto:info@kellopet.ir" className="text-secondary hover:text-secondary/80 font-semibold text-lg">
                info@kellopet.ir
              </a>
            </div>

            {/* Address */}
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:border-accent/50 transition-all">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <MapPin size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">آدرس</h3>
              <p className="text-muted-foreground mb-4">
                برای بازدید و استعلام
              </p>
              <p className="text-accent hover:text-accent/80 font-semibold">
                تهران - خیابان ولیعصر
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 sm:p-10">
              <h2 className="text-3xl font-bold mb-8 text-center">فرم تماس</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">نام شما</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="نام کامل"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">ایمیل</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">تلفن (اختیاری)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-2">پیام</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="پیام خود را وارد کنید..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {isLoading ? 'در حال ارسال...' : 'ارسال پیام'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">ساعات کاری</h2>
            <div className="grid grid-cols-2 gap-6 text-start">
              <div>
                <p className="font-semibold text-primary mb-2">شنبه تا چهارشنبه</p>
                <p className="text-muted-foreground">۹:۰۰ - ۱۸:۰۰</p>
              </div>
              <div>
                <p className="font-semibold text-primary mb-2">پنج‌شنبه</p>
                <p className="text-muted-foreground">۱۰:۰۰ - ۱۶:۰۰</p>
              </div>
              <div>
                <p className="font-semibold text-secondary mb-2">جمعه</p>
                <p className="text-muted-foreground">تعطیل</p>
              </div>
              <div>
                <p className="font-semibold text-accent mb-2">تماس‌های عجیل</p>
                <p className="text-muted-foreground">۲۴/۷</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
            © ۱۴۰۲ Kellopet. تمام حقوق محفوظ است.
          </p>
        </div>
      </footer>
    </div>
  );
}
