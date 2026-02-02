'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const salesData = [
  { month: 'فروردین', sales: 4000, orders: 240 },
  { month: 'اردیبهشت', sales: 3000, orders: 221 },
  { month: 'خرداد', sales: 2000, orders: 229 },
  { month: 'تیر', sales: 2780, orders: 200 },
  { month: 'مرداد', sales: 1890, orders: 229 },
  { month: 'شهریور', sales: 2390, orders: 200 },
  { month: 'مهر', sales: 3490, orders: 310 },
];

const categoryData = [
  { name: 'غذای حیوانات', value: 35 },
  { name: 'اسباب بازی', value: 25 },
  { name: 'بهداشتی', value: 20 },
  { name: 'اکسسوری', value: 20 },
];

const COLORS = ['#ef6820', '#f97d35', '#fda858', '#fdb984'];

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
}) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <p className="text-xs text-green-600 mt-2">{trend}</p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{Icon}</div>
    </div>
  </Card>
);

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('monthly');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">داشبورد</h1>
        <p className="text-muted-foreground mt-2">خوش‌آمدید به پنل مدیریت فروشگاه</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="کل فروش"
          value="۲۳ میلیون"
          icon={<TrendingUp className="text-white" size={24} />}
          trend="↑ 12% نسبت به ماه قبل"
          color="bg-gradient-to-br from-primary to-orange-600"
        />
        <StatCard
          title="سفارشات"
          value="۲۸۵"
          icon={<ShoppingCart className="text-white" size={24} />}
          trend="↑ 8% نسبت به ماه قبل"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="مشتریان فعال"
          value="۱۲۳"
          icon={<Users className="text-white" size={24} />}
          trend="↑ 15% نسبت به ماه قبل"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="محصولات موجود"
          value="۱۰۸"
          icon={<Package className="text-white" size={24} />}
          trend="۱۲ محصول کمخریدار"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold">نمودار فروش</h2>
              <p className="text-sm text-muted-foreground">فروش ماهانه</p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical size={20} />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ef6820"
                strokeWidth={2}
                name="فروش (تومان)"
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#0ea5e9"
                strokeWidth={2}
                name="تعداد سفارش"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">توزیع دسته‌بندی</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">آخرین سفارشات</h2>
            <Button variant="ghost" size="sm">
              مشاهده همه
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                id: '۱۰۰۵',
                customer: 'احمد رضایی',
                amount: '۲۵۰,۰۰۰',
                status: 'تحویل شده',
              },
              {
                id: '۱۰۰۴',
                customer: 'فاطمه حسینی',
                amount: '۴۵۰,۰۰۰',
                status: 'در حال ارسال',
              },
              {
                id: '۱۰۰۳',
                customer: 'علی محمدی',
                amount: '۱۸۵,۰۰۰',
                status: 'آماده شده',
              },
              {
                id: '۱۰۰۲',
                customer: 'سارا کریمی',
                amount: '۳۲۰,۰۰۰',
                status: 'درانتظار تایید',
              },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">{order.customer}</p>
                  <p className="text-xs text-muted-foreground"># {order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{order.amount} تومان</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'تحویل شده'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'در حال ارسال'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'آماده شده'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">پرفروش‌ترین محصولات</h2>
            <Button variant="ghost" size="sm">
              مشاهده همه
            </Button>
          </div>
          <div className="space-y-4">
            {[
              {
                name: 'غذای خشک گربه',
                sales: '۵۲',
                revenue: '۱۳,۰۰۰,۰۰۰',
              },
              {
                name: 'برس پرزگیر',
                sales: '۳۸',
                revenue: '۵,۳۲۰,۰۰۰',
              },
              {
                name: 'اسباب بازی گربه',
                sales: '۳۱',
                revenue: '۲,۶۳۵,۰۰۰',
              },
              {
                name: 'غذای سگ درجه یک',
                sales: '۲۸',
                revenue: '۱۱,۷۶۰,۰۰۰',
              },
            ].map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.sales} فروش</p>
                </div>
                <p className="font-semibold text-sm text-primary">{product.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-orange-600/10">
        <h2 className="text-xl font-bold mb-4">اقدامات سریع</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="justify-start bg-primary hover:bg-primary/90 text-white">
            <Package size={20} className="ml-2" />
            افزودن محصول جدید
          </Button>
          <Button variant="outline" className="justify-start">
            <ShoppingCart size={20} className="ml-2" />
            پردازش سفارشات
          </Button>
          <Button variant="outline" className="justify-start">
            <Users size={20} className="ml-2" />
            مدیریت مشتریان
          </Button>
          <Button variant="outline" className="justify-start">
            <TrendingUp size={20} className="ml-2" />
            مشاهده تقارير
          </Button>
        </div>
      </Card>
    </div>
  );
}
