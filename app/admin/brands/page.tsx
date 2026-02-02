'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Brand {
  id: number;
  label: string;
  brandId: string;
  productCount: number;
  revenue: number;
  lastUpdated: string;
}

const mockBrands: Brand[] = [
  {
    id: 1,
    label: 'دکتر هاس',
    brandId: 'doctor-haas',
    productCount: 8,
    revenue: 4200000,
    lastUpdated: '۱۴۰۲/۱۰/۱۵',
  },
  {
    id: 2,
    label: 'فنبی',
    brandId: 'fenbi',
    productCount: 6,
    revenue: 2850000,
    lastUpdated: '۱۴۰۲/۱۰/۱۲',
  },
  {
    id: 3,
    label: 'ونپی',
    brandId: 'vanpi',
    productCount: 7,
    revenue: 3500000,
    lastUpdated: '۱۴۰۲/۱۰/۱۳',
  },
  {
    id: 4,
    label: 'وینستون',
    brandId: 'winston',
    productCount: 5,
    revenue: 2100000,
    lastUpdated: '۱۴۰۲/۱۰/۱۴',
  },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(mockBrands);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [formData, setFormData] = useState({ label: '', brandId: '' });

  const filteredBrands = brands.filter(
    (b) =>
      b.label.includes(searchTerm) ||
      b.brandId.includes(searchTerm)
  );

  const totalRevenue = brands.reduce((sum, b) => sum + b.revenue, 0);
  const totalProducts = brands.reduce((sum, b) => sum + b.productCount, 0);

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const newBrand: Brand = {
      id: Math.max(...brands.map((b) => b.id), 0) + 1,
      ...formData,
      productCount: 0,
      revenue: 0,
      lastUpdated: new Date().toLocaleDateString('fa-IR'),
    };
    setBrands([...brands, newBrand]);
    setShowAddDialog(false);
    setFormData({ label: '', brandId: '' });
  };

  const handleEditBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBrand) {
      setBrands(
        brands.map((b) =>
          b.id === selectedBrand.id
            ? { ...b, ...formData, lastUpdated: new Date().toLocaleDateString('fa-IR') }
            : b
        )
      );
      setShowEditDialog(false);
      setSelectedBrand(null);
      setFormData({ label: '', brandId: '' });
    }
  };

  const handleDeleteBrand = (id: number) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormData({ label: brand.label, brandId: brand.brandId });
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت برندها</h1>
          <p className="text-muted-foreground mt-1">
            {brands.length} برند - {totalProducts} محصول - {totalRevenue.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Plus size={20} />
          افزودن برند
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'تعداد برندها', value: brands.length, color: 'bg-blue-100 text-blue-800' },
          { label: 'مجموع محصولات', value: totalProducts, color: 'bg-green-100 text-green-800' },
          { label: 'درآمد کل', value: `${(totalRevenue / 1000000).toFixed(1)}M`, color: 'bg-purple-100 text-purple-800' },
        ].map((stat, idx) => (
          <Card key={idx} className={`p-4 ${stat.color}`}>
            <p className="text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="جستجو در برندها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <Card
            key={brand.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{brand.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {brand.brandId}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(brand)}
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => handleDeleteBrand(brand.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">محصولات</p>
                  <p className="text-2xl font-bold text-primary">
                    {brand.productCount}
                  </p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">درآمد</p>
                  <p className="text-lg font-bold text-green-600">
                    {(brand.revenue / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                <span>آخرین بروزرسانی</span>
                <span>{brand.lastUpdated}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Brand Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن برند جدید</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddBrand} className="space-y-4">
            <div>
              <label className="text-sm font-medium">نام برند</label>
              <Input
                placeholder="مثلا: دکتر هاس"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">شناسه برند</label>
              <Input
                placeholder="مثلا: doctor-haas"
                value={formData.brandId}
                onChange={(e) =>
                  setFormData({ ...formData, brandId: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddDialog(false)}
              >
                انصراف
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                افزودن
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Brand Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ویرایش برند</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditBrand} className="space-y-4">
            <div>
              <label className="text-sm font-medium">نام برند</label>
              <Input
                placeholder="نام برند"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">شناسه برند</label>
              <Input
                placeholder="شناسه"
                value={formData.brandId}
                onChange={(e) =>
                  setFormData({ ...formData, brandId: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEditDialog(false);
                  setSelectedBrand(null);
                }}
              >
                انصراف
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
