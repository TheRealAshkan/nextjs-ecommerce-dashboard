"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
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
import { mockCustomers } from "@/lib/mock-data";
import { formatPrice, formatNumber, formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const customers = mockCustomers.filter(
    (c) =>
      c.name.includes(search) ||
      c.email.includes(search) ||
      c.phone.includes(search)
  );

  return (
    <div>
      <PageHeader
        title="مشتریان"
        description="مدیریت مشتریان فروشگاه"
      >
        <Button asChild>
          <Link href="/customers/new">
            <Plus className="size-4" />
            افزودن مشتری
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو نام، ایمیل یا تلفن..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام</TableHead>
                <TableHead>ایمیل</TableHead>
                <TableHead>تلفن</TableHead>
                <TableHead>گروه</TableHead>
                <TableHead>سفارشات</TableHead>
                <TableHead>مجموع خرید</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell dir="ltr" className="text-sm">
                    {customer.email}
                  </TableCell>
                  <TableCell dir="ltr">{customer.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.group}</Badge>
                  </TableCell>
                  <TableCell>{formatNumber(customer.totalOrders)}</TableCell>
                  <TableCell>{formatPrice(customer.totalSpent)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.status === "active" ? "success" : "secondary"
                      }
                    >
                      {customer.status === "active" ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link href={`/customers/${customer.id}/edit`}>
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
