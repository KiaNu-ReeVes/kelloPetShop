'use client';

import React, { useState } from 'react';
import {
  Save,
  Lock,
  Bell,
  Shield,
  Users,
  Package,
  ShoppingCart,
  Mail,
  Eye,
  EyeOff,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Settings {
  shopName: string;
  shopEmail: string;
  shopPhone: string;
  taxId: string;
  address: string;
  city: string;
  zipCode: string;
  currency: string;
  language: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderNotifications: boolean;
  promotionalEmails: boolean;
  twoFactorAuth: boolean;
  sessionTimeout: number;
  autoBackup: boolean;
  backupFrequency: string;
}

const initialSettings: Settings = {
  shopName: 'KelloPet Pet Shop',
  shopEmail: 'info@kellopet.ir',
  shopPhone: '۰۲۱-۹۹۹۹۹۹۹۹',
  taxId: '۱۲۳۴۵۶۷۸۹۰',
  address: 'خیابان ولیعصر، پلاک ۱۲۳',
  city: 'تهران',
  zipCode: '۱۹۳۵۷',
  currency: 'IRR',
  language: 'fa',
  emailNotifications: true,
  smsNotifications: true,
  orderNotifications: true,
  promotionalEmails: false,
  twoFactorAuth: false,
  sessionTimeout: 30,
  autoBackup: true,
  backupFrequency: 'daily',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSettingChange = (key: keyof Settings, value: any) => {
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    setShowSuccessDialog(true);
    setHasChanges(false);
    setTimeout(() => setShowSuccessDialog(false), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      setShowPasswordDialog(false);
      setNewPassword('');
      setConfirmPassword('');
      setShowSuccessDialog(true);
      setTimeout(() => setShowSuccessDialog(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">تنظیمات</h1>
        <p className="text-muted-foreground mt-1">مدیریت تنظیمات فروشگاه و حساب</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">عمومی</TabsTrigger>
          <TabsTrigger value="notifications">اطلاعات</TabsTrigger>
          <TabsTrigger value="security">امنیت</TabsTrigger>
          <TabsTrigger value="backup">پشتیبان‌گیری</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">اطلاعات فروشگاه</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">نام فروشگاه</label>
                <Input
                  value={settings.shopName}
                  onChange={(e) =>
                    handleSettingChange('shopName', e.target.value)
                  }
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">ایمیل</label>
                  <Input
                    value={settings.shopEmail}
                    onChange={(e) =>
                      handleSettingChange('shopEmail', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">تلفن</label>
                  <Input
                    value={settings.shopPhone}
                    onChange={(e) =>
                      handleSettingChange('shopPhone', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">شناسه ملی</label>
                  <Input
                    value={settings.taxId}
                    onChange={(e) =>
                      handleSettingChange('taxId', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">کد پستی</label>
                  <Input
                    value={settings.zipCode}
                    onChange={(e) =>
                      handleSettingChange('zipCode', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">آدرس</label>
                <Input
                  value={settings.address}
                  onChange={(e) =>
                    handleSettingChange('address', e.target.value)
                  }
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">شهر</label>
                  <Input
                    value={settings.city}
                    onChange={(e) => handleSettingChange('city', e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">زبان</label>
                  <select
                    value={settings.language}
                    onChange={(e) =>
                      handleSettingChange('language', e.target.value)
                    }
                    className="mt-2 w-full px-3 py-2 border border-border rounded-lg"
                  >
                    <option value="fa">فارسی</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">تنظیمات اطلاعات</h2>
            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  label: 'اطلاعات ایمیلی',
                  icon: Mail,
                },
                {
                  key: 'smsNotifications',
                  label: 'اطلاعات پیامکی',
                  icon: Bell,
                },
                {
                  key: 'orderNotifications',
                  label: 'اطلاعات سفارشات',
                  icon: ShoppingCart,
                },
                {
                  key: 'promotionalEmails',
                  label: 'ایمیل‌های تبلیغاتی',
                  icon: Package,
                },
              ].map(({ key, label, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-muted-foreground" />
                    <label className="text-sm font-medium cursor-pointer">
                      {label}
                    </label>
                  </div>
                  <button
                    onClick={() =>
                      handleSettingChange(
                        key as keyof Settings,
                        !settings[key as keyof Settings]
                      )
                    }
                    className={`w-12 h-6 rounded-full transition-colors flex items-center ${
                      settings[key as keyof Settings]
                        ? 'bg-primary'
                        : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        settings[key as keyof Settings]
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">امنیت حساب</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg border-l-4 border-l-primary">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium">تغییر رمز عبور</p>
                    <p className="text-xs text-muted-foreground">
                      رمز عبور را هر ۹۰ روز یک بار تغییر دهید
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordDialog(true)}
                >
                  تغییر
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">احراز هویت دو مرحله‌ای</p>
                    <p className="text-xs text-muted-foreground">
                      اضافه کردن یک لایه امنیتی برای ورود
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange(
                      'twoFactorAuth',
                      !settings.twoFactorAuth
                    )
                  }
                  className={`w-12 h-6 rounded-full transition-colors flex items-center ${
                    settings.twoFactorAuth ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 border border-border rounded-lg bg-blue-50">
                <div className="flex gap-3">
                  <Bell className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      نشست فعال
                    </p>
                    <p className="text-xs text-blue-800 mt-1">
                      تایم‌اوت نشست: {settings.sessionTimeout} دقیقه
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-6">پشتیبان‌گیری و استرجاع</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">پشتیبان‌گیری خودکار</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    داده‌های فروشگاه را به طور خودکار پشتیبان بگیرید
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleSettingChange('autoBackup', !settings.autoBackup)
                  }
                  className={`w-12 h-6 rounded-full transition-colors flex items-center ${
                    settings.autoBackup ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoBackup ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {settings.autoBackup && (
                <div>
                  <label className="text-sm font-medium">
                    تکرار پشتیبان‌گیری
                  </label>
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) =>
                      handleSettingChange('backupFrequency', e.target.value)
                    }
                    className="mt-2 w-full px-3 py-2 border border-border rounded-lg"
                  >
                    <option value="daily">روزانه</option>
                    <option value="weekly">هفتگی</option>
                    <option value="monthly">ماهانه</option>
                  </select>
                </div>
              )}

              <div className="p-4 border border-border rounded-lg space-y-3">
                <p className="text-sm font-medium">آخرین پشتیبان‌گیری‌ها</p>
                {[
                  { date: '۱۴۰۲/۱۰/۱۸', size: '۲۳۵ MB', status: 'موفق' },
                  { date: '۱۴۰۲/۱۰/۱۷', size: '۲۳۲ MB', status: 'موفق' },
                  { date: '۱۴۰۲/۱۰/۱۶', size: '۲۳۰ MB', status: 'موفق' },
                ].map((backup, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-muted rounded"
                  >
                    <div>
                      <p className="text-sm font-medium">{backup.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {backup.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-600 font-semibold">
                        {backup.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        دانلود
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      {hasChanges && (
        <div className="fixed bottom-6 left-6 right-6 sm:right-auto flex gap-2">
          <Button variant="outline">انصراف</Button>
          <Button
            onClick={handleSaveSettings}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Save size={20} />
            ذخیره تغییرات
          </Button>
        </div>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-sm text-center">
          <div className="py-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">موفق</h2>
            <p className="text-muted-foreground text-sm">
              تنظیمات با موفقیت ذخیره شدند
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تغییر رمز عبور</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">رمز عبور جدید</label>
              <div className="relative mt-2">
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="رمز عبور جدید"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-3 top-3 text-muted-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">تکرار رمز عبور</label>
              <Input
                type="password"
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                <X size={16} />
                رمزهای عبور با هم مطابقت ندارند
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordDialog(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                انصراف
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={
                  newPassword.length < 6 ||
                  newPassword !== confirmPassword
                }
                className="bg-primary hover:bg-primary/90 text-white"
              >
                تغییر رمز
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
