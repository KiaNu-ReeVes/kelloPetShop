'use client';

import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Users, Target, Award } from 'lucide-react';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              درباره <span className="text-primary">Kellopet</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              ما معتقد هستیم که حیوانات خانگی‌تان شایسته بهترین محصولات و خدمات هستند. Kellopet برای فراهم کردن کیفیت‌ترین محصولات حیوان‌خانگی تأسیس شد.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">ماموریت ما</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                در Kellopet، ما متعهد به فراهم‌کردن بهترین محصولات برای حیوانات خانگی‌تان هستیم. از غذای سالم و مغذی گرفته تا اسباب‌بازی‌های سرگرم‌کننده، ما همه چیز را دارا هستیم.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                تیم ما با سال‌ها تجربه در صنعت، دقیقاً می‌دانیم چه محصولاتی برای حیوانات خانگی‌تان بهتر است.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">فوکوس</h3>
                <p className="text-sm text-muted-foreground">تمرکز بر کیفیت و رضایت مشتری</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold mb-2">دغدغه</h3>
                <p className="text-sm text-muted-foreground">سلامت حیوانات خانگی‌تان</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Award className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold mb-2">کیفیت</h3>
                <p className="text-sm text-muted-foreground">محصولات اصل و معتبر</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">تیم</h3>
                <p className="text-sm text-muted-foreground">متخصصین و دلسوز</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-primary">اصالت</h3>
              <p className="text-muted-foreground leading-relaxed">
                تمام محصولات ما اصلی و از برندهای معتبر جهانی هستند. ما هیچوقت محصول تقلبی نمی‌فروشیم.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-secondary">سرعت</h3>
              <p className="text-muted-foreground leading-relaxed">
                ارسال سریع و ایمن به سراسر کشور با بسته‌بندی مناسب است. ما می‌دانیم مشتریان‌تان عجله دارند.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-accent">پشتیبانی</h3>
              <p className="text-muted-foreground leading-relaxed">
                تیم پشتیبانی ما ۲۴/۷ آماده است. هر سؤالی داشتید، ما برای کمک هستیم.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">تیم ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'محمد سالار',
                role: 'بنیان‌گذار و مدیرعامل',
                desc: 'با ۱۵ سال تجربه در صنعت حیوان‌خانگی',
              },
              {
                name: 'سارا خسرایی',
                role: 'مدیر محصولات',
                desc: 'متخصص در انتخاب و تدارک بهترین محصولات',
              },
              {
                name: 'علی احمدی',
                role: 'سرپرست پشتیبانی',
                desc: 'تیم پشتیبانی ما از این جانب نیاز رفع می‌شود',
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">بیایید شروع کنیم</h2>
          <p className="text-xl text-muted-foreground mb-8">
            اگر سوالی درباره Kellopet یا محصولات ما دارید، لطفاً تماس بگیرید.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
              تماس با ما
            </Button>
          </Link>
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
