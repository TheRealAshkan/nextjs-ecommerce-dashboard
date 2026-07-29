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
import { mockProducts } from "@/lib/mock-data";
import { formatPrice, formatNumber } from "@/lib/utils";
import type { Product } from "@/types";

const statusMap = {
  active: { label: "فعال", variant: "success" as const },
  inactive: { label: "غیرفعال", variant: "secondary" as const },
  out_of_stock: { label: "ناموجود", variant: "destructive" as const },
};

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const products = mockProducts.filter(
    (p) =>
      p.name.includes(search) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="محصولات"
        description="مدیریت محصولات فروشگاه"
      >
        <Button asChild>
          <Link href="/products/new">
            <Plus className="size-4" />
            افزودن محصول
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو محصول یا SKU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام محصول</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>موجودی</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => {
                const status = statusMap[product.status];
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-mono text-xs" dir="ltr">
                      {product.sku}
                    </TableCell>
                    <TableCell>{product.categoryName}</TableCell>
                    <TableCell>
                      <div>
                        {product.specialPrice ? (
                          <>
                            <span className="font-medium">
                              {formatPrice(product.specialPrice)}
                            </span>
                            <span className="text-xs text-muted-foreground line-through mr-2">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          formatPrice(product.price)
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatNumber(product.quantity)}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-8" asChild>
                          <Link href={`/products/${product.id}/edit`}>
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
                );
              })}
            </TableBody>
          </Table>

          {products.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              محصولی یافت نشد
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
