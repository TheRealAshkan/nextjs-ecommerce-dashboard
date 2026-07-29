"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Save, Printer, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types";

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

interface OrderDetailProps {
  order: Order;
}

export function OrderDetail({ order }: OrderDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSaveStatus = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
  };

  const statusInfo = statusMap[status];

  return (
    <div>
      {/* Header */}
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 lg:-mx-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/orders")}
          >
            <ArrowRight className="size-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold" dir="ltr">
                {order.orderNumber}
              </h1>
              <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="size-4" />
            چاپ
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="size-4" />
            ارسال ایمیل
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle>اقلام سفارش</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>محصول</TableHead>
                    <TableHead>تعداد</TableHead>
                    <TableHead>قیمت واحد</TableHead>
                    <TableHead>جمع</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{formatPrice(item.price)}</TableCell>
                      <TableCell className="font-medium">
                        {formatPrice(item.total)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>جمع کل</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Update status */}
          <Card>
            <CardHeader>
              <CardTitle>تغییر وضعیت سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>وضعیت جدید</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as OrderStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(
                        Object.entries(statusMap) as [
                          OrderStatus,
                          (typeof statusMap)[OrderStatus],
                        ][]
                      ).map(([key, val]) => (
                        <SelectItem key={key} value={key}>
                          {val.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>یادداشت (اختیاری)</Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="توضیح تغییر وضعیت برای مشتری..."
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveStatus} disabled={saving}>
                <Save className="size-4" />
                {saving ? "در حال ذخیره..." : "ذخیره وضعیت"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اطلاعات مشتری</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">نام</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">ایمیل</p>
                <p className="font-medium" dir="ltr">
                  {order.customerEmail}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>آدرس ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{order.shippingAddress}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>پرداخت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">روش پرداخت</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground">مبلغ</p>
                <p className="font-medium text-lg">
                  {formatPrice(order.total)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
