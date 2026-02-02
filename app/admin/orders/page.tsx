'use client';

import React, { useState } from 'react';
import {
  Search,
  Edit2,
  Eye,
  Printer,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  Package,
  Truck,
  CheckCircle,
  Clock,
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

interface Order {
  id: number;
  orderNumber: string;
  customer: string;
  email: string;
  phone: string;
  amount: number;
  itemCount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending';
  date: string;
  shippingAddress: string;
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: '۱۰۰۵',
    customer: 'احمد رضایی',
    email: 'ahmad@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    amount: 250000,
    itemCount: 2,
    status: 'delivered',
    paymentStatus: 'paid',
    date: '۱۴۰۲/۱۰/۱۵',
    shippingAddress: 'تهران، خیابان ولیعصر',
  },
  {
    id: 2,
    orderNumber: '۱۰۰۴',
    customer: 'فاطمه حسینی',
    email: 'fateme@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    amount: 450000,
    itemCount: 3,
    status: 'shipped',
    paymentStatus: 'paid',
    date: '۱۴۰۲/۱۰/۱۶',
    shippingAddress: 'تهران، خیابان قائم',
  },
  {
    id: 3,
    orderNumber: '۱۰۰۳',
    customer: 'علی محمدی',
    email: 'ali@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    amount: 185000,
    itemCount: 1,
    status: 'confirmed',
    paymentStatus: 'paid',
    date: '۱۴۰۲/۱۰/۱۷',
    shippingAddress: 'اصفهان، خیابان چاپخانه',
  },
  {
    id: 4,
    orderNumber: '۱۰۰۲',
    customer: 'سارا کریمی',
    email: 'sara@example.com',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    amount: 320000,
    itemCount: 2,
    status: 'pending',
    paymentStatus: 'pending',
    date: '۱۴۰۲/۱۰/۱۸',
    shippingAddress: 'شیراز، خیابان زند',
  },
];

const statusConfig = {
  pending: { label: 'درانتظار تایید', color: 'bg-red-100 text-red-800', icon: Clock },
  confirmed: { label: 'تایید شده', color: 'bg-blue-100 text-blue-800', icon: Package },
  shipped: { label: 'در حال ارسال', color: 'bg-yellow-100 text-yellow-800', icon: Truck },
  delivered: { label: 'تحویل شده', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'لغو شده', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredOrders = orders
    .filter(
      (order) =>
        order.orderNumber.includes(searchTerm) ||
        order.customer.includes(searchTerm) ||
        order.email.includes(searchTerm)
    )
    .filter((order) => !statusFilter || order.status === statusFilter)
    .sort((a, b) => {
      let aVal: any = sortBy === 'date' ? new Date(a.date) : a.amount;
      let bVal: any = sortBy === 'date' ? new Date(b.date) : b.amount;

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
  const deliveredAmount = orders
    .filter((o) => o.status === 'delivered')
    .reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">مدیریت سفارشات</h1>
          <p className="text-muted-foreground mt-1">
            مجموع {orders.length} سفارش - {totalAmount.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Printer size={20} />
          خروجی
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'مجموع سفارشات',
            value: orders.length,
            color: 'bg-blue-100 text-blue-800',
          },
          {
            label: 'درانتظار',
            value: orders.filter((o) => o.status === 'pending').length,
            color: 'bg-red-100 text-red-800',
          },
          {
            label: 'تایید شده',
            value: orders.filter((o) => o.status === 'confirmed').length,
            color: 'bg-yellow-100 text-yellow-800',
          },
          {
            label: 'تحویل شده',
            value: orders.filter((o) => o.status === 'delivered').length,
            color: 'bg-green-100 text-green-800',
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
              placeholder="جستجو بر اساس شماره سفارش، نام مشتری یا ایمیل..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="pending">درانتظار تایید</option>
            <option value="confirmed">تایید شده</option>
            <option value="shipped">در حال ارسال</option>
            <option value="delivered">تحویل شده</option>
            <option value="cancelled">لغو شده</option>
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

      {/* Orders Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-right py-3 px-4 font-semibold">شماره سفارش</th>
                <th className="text-right py-3 px-4 font-semibold">مشتری</th>
                <th className="text-right py-3 px-4 font-semibold">مقدار</th>
                <th className="text-right py-3 px-4 font-semibold">تعداد کالا</th>
                <th className="text-right py-3 px-4 font-semibold">وضعیت</th>
                <th className="text-right py-3 px-4 font-semibold">پرداخت</th>
                <th className="text-right py-3 px-4 font-semibold">تاریخ</th>
                <th className="text-right py-3 px-4 font-semibold">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const StatusIcon =
                  statusConfig[order.status as keyof typeof statusConfig].icon;
                return (
                  <tr
                    key={order.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-bold text-primary">
                      #{order.orderNumber}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold">
                      {order.amount.toLocaleString('fa-IR')} تومان
                    </td>
                    <td className="py-4 px-4">{order.itemCount} کالا</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${
                          statusConfig[order.status as keyof typeof statusConfig]
                            .color
                        }`}
                      >
                        <StatusIcon size={14} />
                        {
                          statusConfig[order.status as keyof typeof statusConfig]
                            .label
                        }
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.paymentStatus === 'paid'
                          ? 'پرداخت شده'
                          : 'درانتظار'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-xs">
                      {order.date}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailsDialog(true);
                          }}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>جزئیات سفارش #{selectedOrder?.orderNumber}</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">نام</p>
                  <p className="font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ایمیل
                  </p>
                  <p className="font-semibold">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    تلفن
                  </p>
                  <p className="font-semibold">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    تاریخ
                  </p>
                  <p className="font-semibold">{selectedOrder.date}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  آدرس تحویل
                </p>
                <p className="font-semibold">
                  {selectedOrder.shippingAddress}
                </p>
              </div>

              {/* Order Summary */}
              <Card className="p-4 bg-muted">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>مجموع:</span>
                    <span className="font-semibold">
                      {selectedOrder.amount.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                  <div className="flex justify-between text-primary font-bold">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>
                      {selectedOrder.amount.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                </div>
              </Card>

              <DialogFooter>
                <Button variant="outline">انصراف</Button>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  ویرایش سفارش
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
