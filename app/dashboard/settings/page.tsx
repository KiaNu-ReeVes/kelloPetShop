'use client';

import React from "react"

import { useState } from 'react';
import { Lock, Bell, Eye, EyeOff, Shield, LogOut, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'privacy'>('security');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailOrders: true,
    emailPromotions: false,
    emailNewsletter: true,
    smsOrders: true,
    pushNotifications: true,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change:', passwordData);
    alert('رمز عبور شما با موفقیت تغییر کرد');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const tabs = [
    { id: 'security', label: 'امنیت حساب', icon: Lock },
    { id: 'notifications', label: 'اطلاعیه‌ها', icon: Bell },
    { id: 'privacy', label: 'حریم خصوصی', icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">تنظیمات</h1>
        <p className="text-muted-foreground mt-2">مدیریت حساب، امنیت و اطلاعیه‌های شما</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            {/* Change Password */}
            <div>
              <h3 className="text-2xl font-bold mb-6">تغییر رمز عبور</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">رمز عبور فعلی</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      placeholder="رمز عبور فعلی"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">رمز عبور جدید</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="رمز عبور جدید"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium mb-2">تأیید رمز عبور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="تأیید رمز عبور جدید"
                      className="w-full px-4 py-3 pr-10 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3"
                >
                  به‌روزرسانی رمز عبور
                </Button>
              </form>
            </div>

            <hr className="border-border" />

            {/* Two Factor Authentication */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">احراز هویت دو مرحله‌ای</h3>
                  <p className="text-sm text-muted-foreground mt-1">امنیت حساب خود را افزایش دهید</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">فعال‌سازی</Button>
              </div>
            </div>

            <hr className="border-border" />

            {/* Active Sessions */}
            <div>
              <h3 className="text-lg font-bold mb-4">دستگاه‌های فعال</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Chrome - لپتاپ</p>
                    <p className="text-sm text-muted-foreground">آخرین فعالیت: ۱۵ دقیقه پیش</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full">
                    فعال
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <p className="font-medium">Safari - گوشی</p>
                    <p className="text-sm text-muted-foreground">آخرین فعالیت: ۲ ساعت پیش</p>
                  </div>
                  <button className="text-destructive text-sm font-medium hover:underline">
                    خروج
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">تنظیمات اطلاعیه</h3>
            <div className="space-y-4">
              {[
                {
                  key: 'emailOrders',
                  label: 'اطلاعیه‌های سفارش',
                  description: 'دریافت ایمیل هنگام تایید و ارسال سفارش',
                },
                {
                  key: 'emailPromotions',
                  label: 'پیشنهادات و تخفیف‌ها',
                  description: 'اطلاع از تخفیف‌های ویژه و پیشنهادات محصول',
                },
                {
                  key: 'emailNewsletter',
                  label: 'خبرنامه',
                  description: 'دریافت آخرین اخبار و محصولات جدید',
                },
                {
                  key: 'smsOrders',
                  label: 'پیام‌های SMS',
                  description: 'دریافت پیام کوتاه برای سفارشات',
                },
                {
                  key: 'pushNotifications',
                  label: 'اطلاعیه‌های فشاری',
                  description: 'اطلاعیه‌های فوری در مرورگر',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(item.key as any)}
                    className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
                      notificationSettings[item.key as any]
                        ? 'bg-green-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        notificationSettings[item.key as any]
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">حریم خصوصی و امنیت</h3>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
              <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">درخواست داده‌های شخصی</p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  می‌توانید یک کپی از تمام اطلاعات شخصی خود را دانلود کنید.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">به‌اشتراک‌گذاری داده</p>
                  <p className="text-sm text-muted-foreground">اجازه دادن به شرکای معتمد برای بهبود سرویس</p>
                </div>
                <button className="relative inline-block w-12 h-6 rounded-full bg-green-600">
                  <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium">تحلیل استفاده</p>
                  <p className="text-sm text-muted-foreground">اجازه جمع‌آوری اطلاعات برای بهبود تجربه</p>
                </div>
                <button className="relative inline-block w-12 h-6 rounded-full bg-green-600">
                  <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full" />
                </button>
              </div>
            </div>

            <hr className="border-border" />

            {/* Delete Account */}
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-red-900 dark:text-red-100">حذف حساب</h4>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                    حذف دائمی حساب کاربری و تمام اطلاعات مرتبط. این عمل قابل بازگشت نیست.
                  </p>
                </div>
                <button className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-white font-medium rounded-lg transition-colors">
                  حذف حساب
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
