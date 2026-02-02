'use client';

import { ShoppingBag, Package, Truck, CheckCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders = [
    {
      id: '1001',
      date: '۱۴۰۳/۱۰/۱۵',
      total: '۲۵۰,۰۰۰ تومان',
      status: 'تحویل شده',
      items: [
        { id: 1, name: 'غذای خشک گربه', quantity: 2, price: '۱۲۵,۰۰۰ تومان' },
        { id: 2, name: 'اسباب بازی رنگی', quantity: 1, price: '۶۵,۰۰۰ تومان' },
      ],
      timeline: [
        { status: 'تایید سفارش', date: '۱۴۰۳/۱۰/۱۵', completed: true },
        { status: 'آماده‌سازی', date: '۱۴۰۳/۱۰/۱۶', completed: true },
        { status: 'ارسال', date: '۱۴۰۳/۱۰/۱۷', completed: true },
        { status: 'تحویل', date: '۱۴۰۳/۱۰/۱۹', completed: true },
      ],
    },
    {
      id: '1002',
      date: '۱۴۰۳/۱۰/۱۲',
      total: '۱۵۰,۰۰۰ تومان',
      status: 'درحال ارسال',
      items: [
        { id: 3, name: 'برس پرزگیر', quantity: 1, price: '۱۵۰,۰۰۰ تومان' },
      ],
      timeline: [
        { status: 'تایید سفارش', date: '۱۴۰۳/۱۰/۱۲', completed: true },
        { status: 'آماده‌سازی', date: '۱۴۰۳/۱۰/۱۳', completed: true },
        { status: 'ارسال', date: '۱۴۰۳/۱۰/۱۴', completed: true },
        { status: 'تحویل', date: '۱۴۰۳/۱۰/۱۹', completed: false },
      ],
    },
    {
      id: '1003',
      date: '۱۴۰۳/۱۰/۰۸',
      total: '۸۵,۰۰۰ تومان',
      status: 'تحویل شده',
      items: [
        { id: 4, name: 'تشویقی سگ', quantity: 1, price: '۸۵,۰۰۰ تومان' },
      ],
      timeline: [
        { status: 'تایید سفارش', date: '۱۴۰۳/۱۰/۰۸', completed: true },
        { status: 'آماده‌سازی', date: '۱۴۰۳/۱۰/۰۹', completed: true },
        { status: 'ارسال', date: '۱۴۰۳/۱۰/۱۰', completed: true },
        { status: 'تحویل', date: '۱۴۰۳/۱۰/۱۲', completed: true },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'تحویل شده':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'درحال ارسال':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'درحال پردازش':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'تحویل شده':
        return <CheckCircle size={16} />;
      case 'درحال ارسال':
        return <Truck size={16} />;
      case 'درحال پردازش':
        return <Package size={16} />;
      default:
        return <ShoppingBag size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">سفارشات من</h1>
        <p className="text-muted-foreground mt-2">تاریخچه و جزئیات تمام سفارشات شما</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full p-6 text-right hover:bg-muted/50 transition-colors flex items-center justify-between"
            >
              <ChevronDown
                size={20}
                className={`transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`}
              />

              <div className="flex-1 text-right">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">سفارش #{order.id}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{order.date} • {order.items.length} محصول</p>
              </div>

              <div className="text-right ml-4">
                <p className="font-bold text-primary">{order.total}</p>
              </div>
            </button>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <div className="border-t border-border p-6 space-y-6">
                {/* Items */}
                <div>
                  <h4 className="font-bold mb-4">محصولات</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">{item.name}</span>
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.price}</p>
                          <p className="text-xs text-muted-foreground">تعداد: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="font-bold mb-4">وضعیت سفارش</h4>
                  <div className="space-y-3">
                    {order.timeline.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${
                            step.completed ? 'bg-green-600' : 'bg-muted border-2 border-border'
                          }`} />
                          {index < order.timeline.length - 1 && (
                            <div className={`w-0.5 h-8 ${step.completed ? 'bg-green-600' : 'bg-border'}`} />
                          )}
                        </div>
                        <div className="flex-1 pb-2">
                          <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-muted-foreground">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button className="flex-1 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                    تکرار سفارش
                  </button>
                  <button className="flex-1 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium">
                    مشاهده فیس
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
