"use client";

import { StatsCards } from "@/components/dashboard/stats-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { PageHeader } from "@/components/layout/page-header";
import {
  mockDashboardStats,
  mockSalesData,
  mockOrders,
} from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="داشبورد"
        description="خلاصه وضعیت فروشگاه شما"
      />

      <div className="space-y-6">
        <StatsCards stats={mockDashboardStats} />

        <div className="grid gap-6 lg:grid-cols-3">
          <SalesChart data={mockSalesData} />
          <RecentOrders orders={mockOrders} />
        </div>
      </div>
    </div>
  );
}
