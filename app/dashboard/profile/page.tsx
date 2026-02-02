'use client';

import React from "react"

import { useState } from 'react';
import { Mail, Phone, User, MapPin, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'احمد علیزاده',
    email: 'ahmad@example.com',
    phone: '09123456789',
    city: 'تهران',
    state: 'تهران',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile saved:', formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">پروفایل من</h1>
        <p className="text-muted-foreground mt-2">مشاهده و ویرایش اطلاعات شخصی خود</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-8">
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{formData.fullName}</h2>
              <p className="text-muted-foreground">{formData.email}</p>
              <p className="text-sm text-muted-foreground mt-1">عضو Kellopet از تاریخ: ۱۴۰۲/۰۱/۱۵</p>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? 'outline' : 'default'}
            className="bg-primary hover:bg-primary/90"
          >
            {isEditing ? 'لغو' : 'ویرایش'}
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">نام و نام خانوادگی</label>
              <div className="relative">
                <User size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-border bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">آدرس ایمیل</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-border bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">شماره تلفن</label>
              <div className="relative">
                <Phone size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-border bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium mb-2">شهر</label>
              <div className="relative">
                <MapPin size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border border-border bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <Button
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-600/90 text-white font-bold py-3"
            >
              <Save size={20} className="ml-2" />
              ذخیره تغییرات
            </Button>
          )}
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-bold mb-4">وضعیت تایید</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800 rounded-lg">
            <span className="text-sm">ایمیل تایید شده</span>
            <span className="text-xs font-bold text-green-600">✓ تایید شده</span>
          </div>
          <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 rounded-lg">
            <span className="text-sm">شماره تلفن تایید شده</span>
            <span className="text-xs font-bold text-blue-600">✓ تایید شده</span>
          </div>
        </div>
      </div>
    </div>
  );
}
