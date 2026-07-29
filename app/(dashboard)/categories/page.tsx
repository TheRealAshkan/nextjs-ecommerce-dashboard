"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, FolderTree } from "lucide-react";
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
import { mockCategories } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");
  const categories = mockCategories.filter((c) => c.name.includes(search));

  const getParentName = (parentId?: string | null) => {
    if (!parentId) return "—";
    return mockCategories.find((c) => c.id === parentId)?.name || "—";
  };

  return (
    <div>
      <PageHeader
        title="دسته‌بندی‌ها"
        description="سازماندهی محصولات در دسته‌بندی‌ها"
      >
        <Button asChild>
          <Link href="/categories/new">
            <Plus className="size-4" />
            افزودن دسته‌بندی
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو دسته‌بندی..."
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
                <TableHead>اسلاگ</TableHead>
                <TableHead>دسته والد</TableHead>
                <TableHead>تعداد محصول</TableHead>
                <TableHead>ترتیب</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FolderTree className="size-4 text-muted-foreground" />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs" dir="ltr">
                    {cat.slug}
                  </TableCell>
                  <TableCell>{getParentName(cat.parentId)}</TableCell>
                  <TableCell>{formatNumber(cat.productCount)}</TableCell>
                  <TableCell>{cat.sortOrder}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cat.status === "active" ? "success" : "secondary"
                      }
                    >
                      {cat.status === "active" ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="size-8" asChild>
                        <Link href={`/categories/${cat.id}/edit`}>
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
