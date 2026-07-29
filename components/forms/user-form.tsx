"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User, UserRole } from "@/types";

interface UserFormProps {
  user?: User;
  mode: "create" | "edit";
}

export function UserForm({ user, mode }: UserFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    role: (user?.role || "editor") as UserRole,
    status: user?.status === "active" || !user,
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/users");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 lg:-mx-8 mb-6 flex items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8 py-3">
        <div>
          <h1 className="text-xl font-bold">
            {mode === "create" ? "افزودن کاربر" : "ویرایش کاربر"}
          </h1>
          {user && (
            <p className="text-sm text-muted-foreground">{user.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/users")}
          >
            <X className="size-4" />
            انصراف
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="size-4" />
            {saving ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>اطلاعات کاربر</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label>
                نام کامل <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>
                ایمیل <span className="text-destructive">*</span>
              </Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
                dir="ltr"
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label>
                رمز عبور{" "}
                {mode === "create" && (
                  <span className="text-destructive">*</span>
                )}
              </Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required={mode === "create"}
                dir="ltr"
                className="text-left"
                placeholder={mode === "edit" ? "خالی = بدون تغییر" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>
                تکرار رمز عبور{" "}
                {mode === "create" && (
                  <span className="text-destructive">*</span>
                )}
              </Label>
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                required={mode === "create"}
                dir="ltr"
                className="text-left"
              />
            </div>
            <div className="space-y-2">
              <Label>
                نقش <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.role}
                onValueChange={(v) => update("role", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">مدیر کل</SelectItem>
                  <SelectItem value="manager">مدیر</SelectItem>
                  <SelectItem value="editor">ویرایشگر</SelectItem>
                  <SelectItem value="viewer">بازدیدکننده</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label>وضعیت</Label>
                <p className="text-xs text-muted-foreground">
                  کاربر بتواند وارد پنل شود
                </p>
              </div>
              <Switch
                checked={form.status}
                onCheckedChange={(v) => update("status", v)}
              />
            </div>
          </div>

          {/* Permissions summary */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <p className="text-sm font-medium">دسترسی‌های نقش انتخاب‌شده:</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              {form.role === "admin" && (
                <>
                  <li>دسترسی کامل به تمام بخش‌ها</li>
                  <li>مدیریت کاربران و تنظیمات سیستم</li>
                </>
              )}
              {form.role === "manager" && (
                <>
                  <li>مدیریت محصولات، سفارشات و مشتریان</li>
                  <li>مشاهده گزارش‌ها</li>
                </>
              )}
              {form.role === "editor" && (
                <>
                  <li>ویرایش محصولات و دسته‌بندی‌ها</li>
                  <li>بدون دسترسی به سفارشات و کاربران</li>
                </>
              )}
              {form.role === "viewer" && (
                <>
                  <li>فقط مشاهده داشبورد و گزارش‌ها</li>
                  <li>بدون امکان ویرایش</li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
