'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
} from 'lucide-react';

const monthlyData = [
  { month: 'فروردین', revenue: 4000, orders: 240, customers: 120 },
  { month: 'اردیبهشت', revenue: 3000, orders: 221, customers: 110 },
  { month: 'خرداد', revenue: 2000, orders: 229, customers: 100 },
  { month: 'تیر', revenue: 2780, orders: 200, customers: 95 },
  { month: 'مرداد', revenue: 1890, orders: 229, customers: 105 },
  { month: 'شهریور', revenue: 2390, orders: 200, customers: 115 },
  { month: 'مهر', revenue: 3490, orders: 310, customers: 140 },
];

const productPerformance = [
  { name: 'غذای خشک گربه', sales: 52, revenue: 1300000 },
  { name: 'برس پرزگیری', sales: 38, revenue: 532000 },
  { name: 'اسباب بازی', sales: 31, revenue: 263500 },
  { name: 'غذای سگ', sales: 28, revenue: 1176000 },
  { name: 'اکسسوری', sales: 22, revenue: 176000 },
];

const categoryData = [
  { name: 'غذا', value: 35 },
  { name: 'تشویقی', value: 25 },
  { name: 'بهداشتی', value: 20 },
  { name: 'اکسسوری', value: 20 },
];

const COLORS = ['#ef6820', '#f97d35', '#fda858', '#fdb984'];

const StatCard = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        <div className="flex items-center gap-1 mt-2 text-xs">
          {trend.includes('+') ? (
            <TrendingUp className="text-green-600" size={16} />
          ) : (
            <TrendingDown className="text-red-600" size={16} />
          )}
          <span className={trend.includes('+') ? 'text-green-600' : 'text-red-600'}>
            {trend}
          </span>
        </div>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>{Icon}</div>
    </div>
  </Card>
);

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">تحلیلات</h1>
          <p className="text-muted-foreground mt-2">آمار کامل عملکرد فروشگاه</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={20} />
          دانلود گزارش
        </Button>
      </div>

      {/* Date Range Selector */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {['week', 'month', 'quarter', 'year'].map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange(range)}
              className="gap-2"
            >
              <Calendar size={16} />
              {range === 'week'
                ? 'این هفته'
                : range === 'month'
                ? 'این ماه'
                : range === 'quarter'
                ? 'این سه ماهه'
                : 'این سال'}
            </Button>
          ))}
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="کل درآمد"
          value="۲۳M تومان"
          trend="↑ 12% نسبت به دوره قبل"
          icon={<DollarSign className="text-white" size={24} />}
          color="bg-gradient-to-br from-primary to-orange-600"
        />
        <StatCard
          title="کل سفارشات"
          value="۲۸۵"
          trend="↑ 8% نسبت به دوره قبل"
          icon={<ShoppingCart className="text-white" size={24} />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="مشتریان جدید"
          value="۳۲"
          trend="↑ 15% نسبت به دوره قبل"
          icon={<Users className="text-white" size={24} />}
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="فروش متوسط"
          value="۸۰,۷۰۰"
          trend="↓ 3% نسبت به دوره قبل"
          icon={<Package className="text-white" size={24} />}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">روند درآمد</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef6820" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef6820" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ef6820"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Orders vs Customers */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">سفارشات و مشتریان</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#0ea5e9"
                strokeWidth={2}
                name="سفارشات"
              />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#10b981"
                strokeWidth={2}
                name="مشتریان"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* More Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">پرفروش‌ترین محصولات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#ef6820" name="تعداد فروش" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-6">توزیع دسته‌بندی</h2>
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

      {/* Detailed Stats Table */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-6">آمار تفصیلی</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-right py-3 px-4 font-semibold">ماه</th>
                <th className="text-right py-3 px-4 font-semibold">درآمد</th>
                <th className="text-right py-3 px-4 font-semibold">سفارشات</th>
                <th className="text-right py-3 px-4 font-semibold">مشتریان</th>
                <th className="text-right py-3 px-4 font-semibold">متوسط سفارش</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium">{data.month}</td>
                  <td className="py-3 px-4 font-semibold text-primary">
                    {data.revenue.toLocaleString('fa-IR')}
                  </td>
                  <td className="py-3 px-4">{data.orders}</td>
                  <td className="py-3 px-4">{data.customers}</td>
                  <td className="py-3 px-4 font-semibold">
                    {(data.revenue / data.orders).toLocaleString('fa-IR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
