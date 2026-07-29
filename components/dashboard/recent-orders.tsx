"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

const statusMap: Record<
  OrderStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "success" | "warning" | "info" }
> = {
  pending: { label: "در انتظار", variant: "warning" },
  processing: { label: "در حال پردازش", variant: "info" },
  shipped: { label: "ارسال شده", variant: "secondary" },
  delivered: { label: "تحویل شده", variant: "success" },
  cancelled: { label: "لغو شده", variant: "destructive" },
  refunded: { label: "بازگشت وجه", variant: "destructive" },
};

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>سفارشات اخیر</CardTitle>
        <Link
          href="/orders"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          مشاهده همه
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.slice(0, 5).map((order) => {
            const status = statusMap[order.status];
            return (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {order.customerName}
                  </p>
                </div>
                <div className="text-left shrink-0">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <Badge variant={status.variant} className="shrink-0">
                  {status.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
