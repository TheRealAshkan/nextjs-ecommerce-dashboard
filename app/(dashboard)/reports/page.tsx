"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { mockSalesData, mockDashboardStats } from "@/lib/mock-data";
import { formatPrice, formatNumber } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="گزارش‌ها"
        description="آمار و گزارش‌های فروش فروشگاه"
      />

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                فروش کل سال
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatPrice(mockDashboardStats.totalSales)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                تعداد سفارشات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatNumber(mockDashboardStats.totalOrders)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                میانگین سفارش
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {formatPrice(
                  Math.round(
                    mockDashboardStats.totalSales /
                      mockDashboardStats.totalOrders
                  )
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <SalesChart data={mockSalesData} />

        <Card>
          <CardHeader>
            <CardTitle>تعداد سفارشات ماهانه</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      direction: "rtl",
                    }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="hsl(var(--chart-2))"
                    radius={[4, 4, 0, 0]}
                    name="سفارشات"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
