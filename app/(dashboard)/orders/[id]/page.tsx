"use client";

import { use } from "react";
import { OrderDetail } from "@/components/forms/order-detail";
import { mockOrders } from "@/lib/mock-data";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        سفارش یافت نشد
      </div>
    );
  }

  return <OrderDetail order={order} />;
}
