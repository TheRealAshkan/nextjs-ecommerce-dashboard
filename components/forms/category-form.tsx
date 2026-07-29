"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { mockCategories } from "@/lib/mock-data";
import type { Category } from "@/types";

interface CategoryFormProps {
  category?: Category;
  mode: "create" | "edit";
}

export function CategoryForm({ category, mode }: CategoryFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: category?.name || "",
    description: category?.description || "",
    metaTitle: category?.name || "",
    metaDescription: "",
    metaKeywords: "",
    parentId: category?.parentId || "none",
    sortOrder: category?.sortOrder?.toString() || "0",
    status: category?.status === "active" || !category,
    seoUrl: category?.slug || "",
  });

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/categories");
  };

  const parentOptions = mockCategories.filter(
    (c) => !c.parentId && c.id !== category?.id
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 lg:-mx-8 mb-6 flex items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8 py-3">
        <div>
          <h1 className="text-xl font-bold">
            {mode === "create" ? "افزودن دسته‌بندی" : "ویرایش دسته‌بندی"}
          </h1>
          {category && (
            <p className="text-sm text-muted-foreground">{category.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/categories")}
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

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex flex-row-reverse flex-wrap h-auto gap-1 bg-transparent p-0 w-full justify-start border-b rounded-none pb-0">
          {[
            { value: "general", label: "عمومی" },
            { value: "data", label: "داده" },
            { value: "seo", label: "سئو" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">
                    نام دسته‌بندی <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label>عنوان متا</Label>
                  <Input
                    value={form.metaTitle}
                    onChange={(e) => update("metaTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>کلمات کلیدی متا</Label>
                  <Input
                    value={form.metaKeywords}
                    onChange={(e) => update("metaKeywords", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>توضیحات متا</Label>
                  <Textarea
                    value={form.metaDescription}
                    onChange={(e) => update("metaDescription", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>دسته‌بندی والد</Label>
                  <Select
                    value={form.parentId}
                    onValueChange={(v) => update("parentId", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="بدون والد (اصلی)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون والد (اصلی)</SelectItem>
                      {parentOptions.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>ترتیب نمایش</Label>
                  <Input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => update("sortOrder", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
                  <div>
                    <Label>وضعیت</Label>
                    <p className="text-xs text-muted-foreground">
                      دسته‌بندی در فروشگاه نمایش داده شود
                    </p>
                  </div>
                  <Switch
                    checked={form.status}
                    onCheckedChange={(v) => update("status", v)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="mb-3 block">تصویر دسته‌بندی</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex size-24 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
                      <ImageIcon className="size-8 text-muted-foreground" />
                    </div>
                    <Button type="button" variant="outline">
                      <Upload className="size-4" />
                      آپلود تصویر
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label>آدرس SEO (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap" dir="ltr">
                    /category/
                  </span>
                  <Input
                    value={form.seoUrl}
                    onChange={(e) => update("seoUrl", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    placeholder="category-slug"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
