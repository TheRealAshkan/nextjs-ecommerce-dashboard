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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { UserRole } from "@/types";

const roleMap: Record<UserRole, { label: string; variant: "default" | "secondary" | "info" | "warning" }> = {
  admin: { label: "مدیر کل", variant: "default" },
  manager: { label: "مدیر", variant: "info" },
  editor: { label: "ویرایشگر", variant: "secondary" },
  viewer: { label: "بازدیدکننده", variant: "warning" },
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const users = mockUsers.filter(
    (u) => u.name.includes(search) || u.email.includes(search)
  );

  return (
    <div>
      <PageHeader
        title="کاربران"
        description="مدیریت کاربران و دسترسی‌های پنل"
      >
        <Button asChild>
          <Link href="/users/new">
            <Plus className="size-4" />
            افزودن کاربر
          </Link>
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="جستجو نام یا ایمیل..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>کاربر</TableHead>
                <TableHead>نقش</TableHead>
                <TableHead>تاریخ عضویت</TableHead>
                <TableHead>آخرین ورود</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => {
                const role = roleMap[user.role];
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground" dir="ltr">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={role.variant}>{role.label}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      {user.lastLogin ? formatDate(user.lastLogin) : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "success" : "secondary"
                        }
                      >
                        {user.status === "active" ? "فعال" : "غیرفعال"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="size-8" asChild>
                          <Link href={`/users/${user.id}/edit`}>
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
        </CardContent>
      </Card>
    </div>
  );
}
