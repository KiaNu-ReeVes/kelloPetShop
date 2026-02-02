'use client';

import React, { useState } from 'react';
import {
  Search,
  Edit2,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
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

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
  segment: 'vip' | 'regular' | 'new';
}

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: 'احمد رضایی',
    email: 'ahmad@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'خیابان ولیعصر، پلاک ۱۲۳',
    city: 'تهران',
    joinDate: '۱۴۰۲/۵/۱۵',
    totalOrders: 15,
    totalSpent: 3500000,
    lastOrder: '۱۴۰۲/۱۰/۱۵',
    status: 'active',
    segment: 'vip',
  },
  {
    id: 2,
    name: 'فاطمه حسینی',
    email: 'fateme@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'خیابان قائم، پلاک ۴۵۶',
    city: 'تهران',
    joinDate: '۱۴۰۲/۷/۲۰',
    totalOrders: 8,
    totalSpent: 1850000,
    lastOrder: '۱۴۰۲/۱۰/۱۶',
    status: 'active',
    segment: 'regular',
  },
  {
    id: 3,
    name: 'علی محمدی',
    email: 'ali@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'خیابان چاپخانه، پلاک ۷۸۹',
    city: 'اصفهان',
    joinDate: '۱۴۰۲/۹/۱۰',
    totalOrders: 3,
    totalSpent: 520000,
    lastOrder: '۱۴۰۲/۱۰/۱۷',
    status: 'active',
    segment: 'new',
  },
  {
    id: 4,
    name: 'سارا کریمی',
    email: 'sara@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    address: 'خیابان زند، پلاک ۲۱۰',
    city: 'شیراز',
    joinDate: '۱۴۰۱/۱۲/۲۵',
    totalOrders: 5,
    totalSpent: 1200000,
    lastOrder: '۱۴۰۲/۸/۱۰',
    status: 'inactive',
    segment: 'regular',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'totalOrders'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [segmentFilter, setSegmentFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredCustomers = customers
    .filter(
      (c) =>
        c.name.includes(searchTerm) ||
        c.email.includes(searchTerm) ||
        c.phone.includes(searchTerm)
    )
    .filter((c) => !segmentFilter || c.segment === segmentFilter)
    .filter((c) => !statusFilter || c.status === statusFilter)
    .sort((a, b) => {
      let aVal: any = a[sortBy];
      let bVal: any = b[sortBy];

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const vipCustomers = customers.filter((c) => c.segment === 'vip').length;
  const activeCustomers = customers.filter((c) => c.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت مشتریان</h1>
          <p className="text-muted-foreground mt-1">
            مجموع {customers.length} مشتری - {totalRevenue.toLocaleString('fa-IR')} تومان
            درآمد
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Mail size={20} className="ml-2" />
          ارسال پیام
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'کل مشتریان',
            value: customers.length,
            color: 'bg-blue-100 text-blue-800',
            icon: ShoppingCart,
          },
          {
            label: 'مشتریان فعال',
            value: activeCustomers,
            color: 'bg-green-100 text-green-800',
            icon: TrendingUp,
          },
          {
            label: 'مشتریان VIP',
            value: vipCustomers,
            color: 'bg-yellow-100 text-yellow-800',
            icon: MessageSquare,
          },
          {
            label: 'درآمد کل',
            value: `${(totalRevenue / 1000000).toFixed(1)}M`,
            color: 'bg-purple-100 text-purple-800',
            icon: TrendingUp,
          },
        ].map((stat, idx) => (
          <Card key={idx} className={`p-4 ${stat.color}`}>
            <p className="text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-3 text-muted-foreground" size={20} />
            <Input
              placeholder="جستجو بر اساس نام، ایمیل یا شماره تلفن..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={segmentFilter}
            onChange={(e) => setSegmentFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="">همه دسته‌بندی‌ها</option>
            <option value="vip">VIP</option>
            <option value="regular">معمولی</option>
            <option value="new">جدید</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="active">فعال</option>
            <option value="inactive">غیرفعال</option>
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
      </Card>

      {/* Customers Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-right py-3 px-4 font-semibold">نام</th>
                <th className="text-right py-3 px-4 font-semibold">تماس</th>
                <th className="text-right py-3 px-4 font-semibold">شهر</th>
                <th className="text-right py-3 px-4 font-semibold">سفارشات</th>
                <th className="text-right py-3 px-4 font-semibold">مخارج کل</th>
                <th className="text-right py-3 px-4 font-semibold">دسته‌بندی</th>
                <th className="text-right py-3 px-4 font-semibold">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium">{customer.name}</td>
                  <td className="py-4 px-4 text-muted-foreground text-xs">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Phone size={14} />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail size={14} />
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      {customer.totalOrders}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-primary">
                    {customer.totalSpent.toLocaleString('fa-IR')}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        customer.segment === 'vip'
                          ? 'bg-yellow-100 text-yellow-800'
                          : customer.segment === 'regular'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {customer.segment === 'vip'
                        ? 'VIP'
                        : customer.segment === 'regular'
                        ? 'معمولی'
                        : 'جدید'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {customer.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowDetailsDialog(true);
                        }}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:bg-red-100"
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

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>جزئیات مشتری</DialogTitle>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="border-b border-border pb-6">
                <h3 className="font-bold mb-4">معلومات شخصی</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">نام</p>
                    <p className="font-semibold">{selectedCustomer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      ایمیل
                    </p>
                    <p className="font-semibold">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      تلفن
                    </p>
                    <p className="font-semibold">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      شهر
                    </p>
                    <p className="font-semibold">{selectedCustomer.city}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      آدرس
                    </p>
                    <p className="font-semibold">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="font-bold mb-4">آمار خریدی</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-muted text-center">
                    <p className="text-2xl font-bold text-primary">
                      {selectedCustomer.totalOrders}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      مجموع سفارشات
                    </p>
                  </Card>
                  <Card className="p-4 bg-muted text-center">
                    <p className="text-2xl font-bold text-primary">
                      {(selectedCustomer.totalSpent / 1000000).toFixed(1)}M
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      مخارج کل
                    </p>
                  </Card>
                  <Card className="p-4 bg-muted text-center">
                    <p className="text-2xl font-bold text-primary">
                      {(selectedCustomer.totalSpent / selectedCustomer.totalOrders).toLocaleString('fa-IR')}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      میانگین خرید
                    </p>
                  </Card>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">ارسال پیام</Button>
                <Button variant="outline">مشاهده سفارشات</Button>
              </div>

              <DialogFooter>
                <Button variant="outline">بستن</Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  ویرایش
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
