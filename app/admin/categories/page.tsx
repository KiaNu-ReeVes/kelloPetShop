'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, MoreVertical, Search } from 'lucide-react';
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

interface Category {
  id: number;
  label: string;
  categoryId: string;
  parentId?: string;
  productCount: number;
}

const mockCategories: Category[] = [
  {
    id: 1,
    label: 'غذای گربه',
    categoryId: 'cat-food',
    parentId: 'food',
    productCount: 12,
  },
  {
    id: 2,
    label: 'تشویقی گربه',
    categoryId: 'cat-treats',
    parentId: 'treats',
    productCount: 8,
  },
  {
    id: 3,
    label: 'غذای سگ',
    categoryId: 'dog-food',
    parentId: 'food',
    productCount: 15,
  },
  {
    id: 4,
    label: 'تشویقی سگ',
    categoryId: 'dog-treats',
    parentId: 'treats',
    productCount: 10,
  },
  {
    id: 5,
    label: 'بهداشتی',
    categoryId: 'hygiene',
    productCount: 20,
  },
  {
    id: 6,
    label: 'اکسسوری',
    categoryId: 'accessories',
    productCount: 25,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ label: '', categoryId: '', parentId: '' });

  const filteredCategories = categories.filter(
    (c) =>
      c.label.includes(searchTerm) ||
      c.categoryId.includes(searchTerm)
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      ...formData,
      productCount: 0,
    };
    setCategories([...categories, newCategory]);
    setShowAddDialog(false);
    setFormData({ label: '', categoryId: '', parentId: '' });
  };

  const handleEditCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id
            ? { ...c, ...formData }
            : c
        )
      );
      setShowEditDialog(false);
      setSelectedCategory(null);
      setFormData({ label: '', categoryId: '', parentId: '' });
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      label: category.label,
      categoryId: category.categoryId,
      parentId: category.parentId || '',
    });
    setShowEditDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت دسته‌بندی‌ها</h1>
          <p className="text-muted-foreground mt-1">
            مجموع {categories.length} دسته‌بندی
          </p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Plus size={20} />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
          <Input
            placeholder="جستجو در دسته‌بندی‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">{category.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {category.categoryId}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {category.parentId && (
                <div>
                  <p className="text-xs text-muted-foreground">دسته‌ی پدر</p>
                  <p className="font-medium">{category.parentId}</p>
                </div>
              )}
              <div className="bg-muted rounded-lg p-3 mt-4">
                <p className="text-xs text-muted-foreground">محصولات</p>
                <p className="text-2xl font-bold text-primary">
                  {category.productCount}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>افزودن دسته‌بندی جدید</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="text-sm font-medium">نام دسته‌بندی</label>
              <Input
                placeholder="مثلا: غذای گربه"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">شناسه دسته‌بندی</label>
              <Input
                placeholder="مثلا: cat-food"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">دسته‌ی پدر (اختیاری)</label>
              <Input
                placeholder="شناسه دسته‌ی پدر"
                value={formData.parentId}
                onChange={(e) =>
                  setFormData({ ...formData, parentId: e.target.value })
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

      {/* Edit Category Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditCategory} className="space-y-4">
            <div>
              <label className="text-sm font-medium">نام دسته‌بندی</label>
              <Input
                placeholder="نام دسته‌بندی"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">شناسه دسته‌بندی</label>
              <Input
                placeholder="شناسه"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">دسته‌ی پدر</label>
              <Input
                placeholder="دسته‌ی پدر"
                value={formData.parentId}
                onChange={(e) =>
                  setFormData({ ...formData, parentId: e.target.value })
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
                  setSelectedCategory(null);
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
