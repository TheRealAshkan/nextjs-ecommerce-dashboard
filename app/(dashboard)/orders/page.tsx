"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { mockOrders } from "@/lib/mock-data";
import { formatPrice, formatDate } from "@/lib/utils";
import type { OrderStatus } from "@/types";

const statusMap: Record<
  OrderStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "success" | "warning" | "info";
  }
> = {
  pending: { label: "در انتظار", variant: "warning" },
  processing: { label: "در حال پردازش", variant: "info" },
  shipped: { label: "ارسال شده", variant: "secondary" },
  delivered: { label: "تحویل شده", variant: "success" },
  cancelled: { label: "لغو شده", variant: "destructive" },
  refunded: { label: "بازگشت وجه", variant: "destructive" },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const orders = mockOrders.filter(
    (o) =>
      o.orderNumber.includes(search) ||
      o.customerName.includes(search) ||
      o.customerEmail.includes(search)
  );

  return (
    <div>
      <PageHeader
        title="سفارشات"
        description="مدیریت و پیگیری سفارشات مشتریان"
      />

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو شماره سفارش یا مشتری..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>شماره سفارش</TableHead>
                <TableHead>مشتری</TableHead>
                <TableHead>مبلغ</TableHead>
                <TableHead>روش پرداخت</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const status = statusMap[order.status];
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-medium" dir="ltr">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-xs text-muted-foreground" dir="ltr">
                          {order.customerEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link href={`/orders/${order.id}`}>
                          <Eye className="size-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
