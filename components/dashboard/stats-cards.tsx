"use client";

import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPrice } from "@/lib/utils";
import type { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

const cards = [
  {
    key: "totalSales" as const,
    title: "فروش کل",
    icon: DollarSign,
    format: (v: number) => formatPrice(v),
    growthKey: "salesGrowth" as const,
  },
  {
    key: "totalOrders" as const,
    title: "سفارشات",
    icon: ShoppingCart,
    format: (v: number) => formatNumber(v),
    growthKey: "ordersGrowth" as const,
  },
  {
    key: "totalCustomers" as const,
    title: "مشتریان",
    icon: Users,
    format: (v: number) => formatNumber(v),
    growthKey: "customersGrowth" as const,
  },
  {
    key: "totalProducts" as const,
    title: "محصولات",
    icon: Package,
    format: (v: number) => formatNumber(v),
    growthKey: "productsGrowth" as const,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const growth = stats[card.growthKey];
        const isPositive = growth >= 0;

        return (
          <Card key={card.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {card.format(stats[card.key])}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs">
                {isPositive ? (
                  <TrendingUp className="size-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="size-3 text-red-500" />
                )}
                <span
                  className={
                    isPositive ? "text-emerald-500" : "text-red-500"
                  }
                >
                  {isPositive ? "+" : ""}
                  {growth}%
                </span>
                <span className="text-muted-foreground">نسبت به ماه قبل</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
