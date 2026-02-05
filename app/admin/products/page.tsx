'use client';

import React, { useState } from 'react';
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  X,
  Upload,
  AlertCircle,
} from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import productsData from '@/data/products.json';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: boolean | number;
  image?: string;
  rating?: number;
  status?: 'active' | 'inactive';
}

const initialProducts: Product[] = productsData.products.map(p => ({
  ...p,
  stock: p.stock ? 45 : 0,
  status: p.stock ? 'active' : 'inactive',
}));

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.includes(searchTerm) ||
        p.brand.includes(searchTerm) ||
        p.category.includes(searchTerm)
    )
    .sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditDialog(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Add product logic
    setShowAddDialog(false);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // Save product logic
    setShowEditDialog(false);
  };

  const lowStockProducts = products.filter((p) => p.stock < 10 && p.stock > 0);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت محصولات</h1>
          <p className="text-muted-foreground mt-1">
            مجموع {products.length} محصول
          </p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-primary hover:bg-primary/90 text-white gap-2"
        >
          <Plus size={20} />
          افزودن محصول جدید
        </Button>
      </div>

      {/* Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-yellow-800 text-sm">
                {lowStockProducts.length} محصول دارای موجودی کم
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                {lowStockProducts.map((p) => p.name).join('، ')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {outOfStockProducts.length > 0 && (
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-red-800 text-sm">
                {outOfStockProducts.length} محصول ناموجود است
              </p>
              <p className="text-xs text-red-700 mt-1">
                {outOfStockProducts.map((p) => p.name).join('، ')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            همه محصولات ({products.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            فعال ({products.filter((p) => p.status === 'active').length})
          </TabsTrigger>
          <TabsTrigger value="inactive">
            غیرفعال ({products.filter((p) => p.status === 'inactive').length})
          </TabsTrigger>
          <TabsTrigger value="lowstock">
            موجودی کم ({lowStockProducts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <Card className="p-6">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
                <Input
                  placeholder="جستجو در محصولات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-border rounded-lg text-sm"
              >
                <option value="name">نام</option>
                <option value="price">قیمت</option>
                <option value="stock">موجودی</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 hover:bg-muted rounded-lg border border-border"
              >
                {sortOrder === 'asc' ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-right py-3 px-4 font-semibold">محصول</th>
                    <th className="text-right py-3 px-4 font-semibold">برند</th>
                    <th className="text-right py-3 px-4 font-semibold">دسته‌بندی</th>
                    <th className="text-right py-3 px-4 font-semibold">قیمت</th>
                    <th className="text-right py-3 px-4 font-semibold">موجودی</th>
                    <th className="text-right py-3 px-4 font-semibold">امتیاز</th>
                    <th className="text-right py-3 px-4 font-semibold">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <div className="w-10 h-10 bg-muted rounded overflow-hidden shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={500}
                                height={500}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <p className="font-medium text-sm">{product.name}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        {product.brand}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        {product.category}
                      </td>
                      <td className="py-4 px-4 font-semibold text-sm">
                        {product.price.toLocaleString('fa-IR')} تومان
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            typeof product.stock === 'number' && product.stock > 10
                              ? 'bg-green-100 text-green-800'
                              : typeof product.stock === 'number' && product.stock > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {typeof product.stock === 'number' ? product.stock : (product.stock ? 'موجود' : 'ناموجود')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground text-sm">
                        ⭐ {product.rating}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-100"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Other tabs content would go here */}
        <TabsContent value="active">
          <Card className="p-6 text-center text-muted-foreground">
            محصولات فعال
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card className="p-6 text-center text-muted-foreground">
            محصولات غیرفعال
          </Card>
        </TabsContent>
        <TabsContent value="lowstock">
          <Card className="p-6 text-center text-muted-foreground">
            محصولات با موجودی کم
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Product Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>افزودن محصول جدید</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">نام محصول</label>
                <Input placeholder="نام محصول را وارد کنید" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">برند</label>
                <Input placeholder="برند محصول را وارد کنید" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">دسته‌بندی</label>
                <Input placeholder="دسته‌بندی را وارد کنید" className="mt-2" />
              </div>
              <div>
                <label className="text-sm font-medium">قیمت</label>
                <Input
                  placeholder="قیمت محصول"
                  type="number"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">موجودی</label>
                <Input
                  placeholder="موجودی"
                  type="number"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium">تصویر</label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-muted">
                  <Upload size={20} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    عکس محصول را اینجا بگذارید
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">توضیحات</label>
              <textarea
                placeholder="توضیحات محصول..."
                className="mt-2 w-full min-h-24 p-3 border border-border rounded-lg"
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
                افزودن محصول
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
