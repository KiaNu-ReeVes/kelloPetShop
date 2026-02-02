'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, MapPin, Phone, User } from 'lucide-react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'خانه',
      fullName: 'احمد علیزاده',
      phone: '09123456789',
      street: 'خیابان انقلاب، پلاک 123',
      city: 'تهران',
      state: 'تهران',
      zipCode: '1234567890',
      isDefault: true,
    },
    {
      id: 2,
      type: 'محل کار',
      fullName: 'احمد علیزاده',
      phone: '09123456789',
      street: 'خیابان ولیعصر، پلاک 456',
      city: 'تهران',
      state: 'تهران',
      zipCode: '0987654321',
      isDefault: false,
    },
  ]);

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: 'خانه',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleAddNew = () => {
    setIsAddingNew(true);
    setFormData({
      type: 'خانه',
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses(addresses.map(addr =>
        addr.id === editingId ? { ...addr, ...formData } : addr
      ));
      setEditingId(null);
    } else {
      setAddresses([...addresses, { id: Date.now(), ...formData, isDefault: false }]);
      setIsAddingNew(false);
    }
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">آدرس‌های تحویل</h1>
          <p className="text-muted-foreground mt-2">مدیریت آدرس‌های تحویل سفارشات</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <Plus size={20} />
          افزودن آدرس جدید
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-card border-2 border-border rounded-2xl p-6 hover:border-primary/50 transition-colors relative"
          >
            {/* Default Badge */}
            {address.isDefault && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-bold px-3 py-1 rounded-full">
                پیش‌فرض
              </div>
            )}

            {/* Address Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{address.type[0]}</span>
                </div>
                <h3 className="text-lg font-bold">{address.type}</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User size={16} />
                  {address.fullName}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} />
                  {address.phone}
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <p>{address.street}</p>
                    <p>{address.city}، {address.state}</p>
                    <p>کد پستی: {address.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 border-t border-border pt-4">
              <button
                onClick={() => {
                  setEditingId(address.id);
                  setFormData(address);
                  setIsAddingNew(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
              >
                <Edit2 size={16} />
                ویرایش
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex-1 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                  تعیین به‌عنوان پیش‌فرض
                </button>
              )}
              <button
                onClick={() => handleDelete(address.id)}
                className="px-4 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      {(isAddingNew || editingId) && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6">
            {editingId ? 'ویرایش آدرس' : 'افزودن آدرس جدید'}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium mb-2">نوع آدرس</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>خانه</option>
                  <option>محل کار</option>
                  <option>دیگر</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">نام کامل</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="نام و نام خانوادگی"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">شماره تلفن</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09123456789"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">شهر</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="تهران"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium mb-2">استان</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="تهران"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-medium mb-2">کد پستی</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="1234567890"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium mb-2">خیابان و شماره پلاک</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="خیابان انقلاب، پلاک 123"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                onClick={handleSave}
                className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-colors"
              >
                ذخیره
              </button>
              <button
                onClick={() => {
                  setIsAddingNew(false);
                  setEditingId(null);
                }}
                className="flex-1 border border-border hover:bg-muted py-3 rounded-lg transition-colors font-medium"
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
