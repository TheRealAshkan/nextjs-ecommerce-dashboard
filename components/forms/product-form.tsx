"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Plus, Trash2, ImageIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { mockCategories } from "@/lib/mock-data";
import type { Product } from "@/types";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    metaTitle: product?.name || "",
    metaDescription: "",
    metaKeywords: "",
    sku: product?.sku || "",
    model: "",
    price: product?.price?.toString() || "",
    specialPrice: product?.specialPrice?.toString() || "",
    quantity: product?.quantity?.toString() || "0",
    minQuantity: "1",
    subtractStock: true,
    stockStatus: "in_stock",
    categoryId: product?.categoryId || "",
    manufacturer: "",
    status: product?.status === "active" || !product,
    shipping: true,
    weight: "",
    length: "",
    width: "",
    height: "",
    sortOrder: "0",
    seoUrl: "",
    tags: "",
  });

  const [discounts, setDiscounts] = useState<
    { customerGroup: string; quantity: string; price: string; dateStart: string; dateEnd: string }[]
  >([]);

  const [specials, setSpecials] = useState<
    { customerGroup: string; priority: string; price: string; dateStart: string; dateEnd: string }[]
  >([
    product?.specialPrice
      ? {
          customerGroup: "عمومی",
          priority: "1",
          price: product.specialPrice.toString(),
          dateStart: "",
          dateEnd: "",
        }
      : null,
  ].filter(Boolean) as { customerGroup: string; priority: string; price: string; dateStart: string; dateEnd: string }[]);

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Mock save
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Action bar */}
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 lg:-mx-8 mb-6 flex items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8 py-3">
        <div>
          <h1 className="text-xl font-bold">
            {mode === "create" ? "افزودن محصول" : "ویرایش محصول"}
          </h1>
          {product && (
            <p className="text-sm text-muted-foreground">{product.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/products")}
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
        <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 w-full justify-start border-b rounded-none pb-0">
          {[
            { value: "general", label: "عمومی" },
            { value: "data", label: "داده" },
            { value: "links", label: "لینک‌ها" },
            { value: "attribute", label: "ویژگی‌ها" },
            { value: "option", label: "گزینه‌ها" },
            { value: "discount", label: "تخفیف" },
            { value: "special", label: "قیمت ویژه" },
            { value: "image", label: "تصاویر" },
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

        {/* ===== GENERAL TAB ===== */}
        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">
                    نام محصول <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    placeholder="نام محصول را وارد کنید"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={8}
                    placeholder="توضیحات کامل محصول..."
                    className="min-h-[160px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">عنوان متا (Meta Title)</Label>
                  <Input
                    id="metaTitle"
                    value={form.metaTitle}
                    onChange={(e) => update("metaTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">کلمات کلیدی متا</Label>
                  <Input
                    id="metaKeywords"
                    value={form.metaKeywords}
                    onChange={(e) => update("metaKeywords", e.target.value)}
                    placeholder="کلمه۱, کلمه۲, ..."
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="metaDescription">توضیحات متا</Label>
                  <Textarea
                    id="metaDescription"
                    value={form.metaDescription}
                    onChange={(e) => update("metaDescription", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tags">برچسب‌ها</Label>
                  <Input
                    id="tags"
                    value={form.tags}
                    onChange={(e) => update("tags", e.target.value)}
                    placeholder="برچسب‌ها را با کاما جدا کنید"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== DATA TAB ===== */}
        <TabsContent value="data">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="model">مدل</Label>
                  <Input
                    id="model"
                    value={form.model}
                    onChange={(e) => update("model", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">
                    SKU <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="sku"
                    value={form.sku}
                    onChange={(e) => update("sku", e.target.value)}
                    required
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">
                    قیمت <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    required
                    dir="ltr"
                    className="text-left"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">موجودی</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={(e) => update("quantity", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minQuantity">حداقل تعداد سفارش</Label>
                  <Input
                    id="minQuantity"
                    type="number"
                    value={form.minQuantity}
                    onChange={(e) => update("minQuantity", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
                <div className="space-y-2">
                  <Label>وضعیت موجودی</Label>
                  <Select
                    value={form.stockStatus}
                    onValueChange={(v) => update("stockStatus", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_stock">موجود</SelectItem>
                      <SelectItem value="out_of_stock">ناموجود</SelectItem>
                      <SelectItem value="preorder">پیش‌سفارش</SelectItem>
                      <SelectItem value="2_3_days">۲ تا ۳ روزه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>کاهش موجودی</Label>
                    <p className="text-xs text-muted-foreground">
                      با هر فروش از موجودی کم شود
                    </p>
                  </div>
                  <Switch
                    checked={form.subtractStock}
                    onCheckedChange={(v) => update("subtractStock", v)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>نیاز به ارسال</Label>
                    <p className="text-xs text-muted-foreground">
                      محصول فیزیکی است و نیاز به ارسال دارد
                    </p>
                  </div>
                  <Switch
                    checked={form.shipping}
                    onCheckedChange={(v) => update("shipping", v)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>وضعیت</Label>
                    <p className="text-xs text-muted-foreground">
                      محصول در فروشگاه نمایش داده شود
                    </p>
                  </div>
                  <Switch
                    checked={form.status}
                    onCheckedChange={(v) => update("status", v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">ترتیب نمایش</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => update("sortOrder", e.target.value)}
                    dir="ltr"
                    className="text-left"
                  />
                </div>
              </div>

              <Separator />
              <h3 className="font-semibold">ابعاد و وزن</h3>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>وزن (کیلوگرم)</Label>
                  <Input
                    value={form.weight}
                    onChange={(e) => update("weight", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label>طول (سانتی‌متر)</Label>
                  <Input
                    value={form.length}
                    onChange={(e) => update("length", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label>عرض (سانتی‌متر)</Label>
                  <Input
                    value={form.width}
                    onChange={(e) => update("width", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    type="number"
                    step="0.01"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ارتفاع (سانتی‌متر)</Label>
                  <Input
                    value={form.height}
                    onChange={(e) => update("height", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    type="number"
                    step="0.01"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== LINKS TAB ===== */}
        <TabsContent value="links">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>
                    دسته‌بندی <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={(v) => update("categoryId", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.parentId ? `— ${cat.name}` : cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>تولیدکننده</Label>
                  <Select
                    value={form.manufacturer}
                    onValueChange={(v) => update("manufacturer", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب تولیدکننده" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apple">اپل</SelectItem>
                      <SelectItem value="samsung">سامسونگ</SelectItem>
                      <SelectItem value="sony">سونی</SelectItem>
                      <SelectItem value="nike">نایک</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== ATTRIBUTE TAB ===== */}
        <TabsContent value="attribute">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  ویژگی‌های محصول (مثل رنگ، جنس، ابعاد فنی)
                </p>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="size-4" />
                  افزودن ویژگی
                </Button>
              </div>
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                هنوز ویژگی‌ای اضافه نشده است
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== OPTION TAB ===== */}
        <TabsContent value="option">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  گزینه‌های قابل انتخاب (سایز، رنگ، و غیره)
                </p>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="size-4" />
                  افزودن گزینه
                </Button>
              </div>
              <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                هنوز گزینه‌ای اضافه نشده است
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== DISCOUNT TAB ===== */}
        <TabsContent value="discount">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  تخفیف بر اساس تعداد خرید
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setDiscounts([
                      ...discounts,
                      {
                        customerGroup: "عمومی",
                        quantity: "2",
                        price: "",
                        dateStart: "",
                        dateEnd: "",
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  افزودن تخفیف
                </Button>
              </div>
              {discounts.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                  هنوز تخفیفی تعریف نشده
                </div>
              ) : (
                <div className="space-y-4">
                  {discounts.map((d, i) => (
                    <div
                      key={i}
                      className="grid gap-4 md:grid-cols-6 items-end rounded-lg border p-4"
                    >
                      <div className="space-y-2">
                        <Label>گروه مشتری</Label>
                        <Select defaultValue={d.customerGroup}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="عمومی">عمومی</SelectItem>
                            <SelectItem value="ویژه">ویژه</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>تعداد</Label>
                        <Input
                          type="number"
                          defaultValue={d.quantity}
                          dir="ltr"
                          className="text-left"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>قیمت</Label>
                        <Input
                          type="number"
                          defaultValue={d.price}
                          dir="ltr"
                          className="text-left"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>از تاریخ</Label>
                        <Input type="date" defaultValue={d.dateStart} dir="ltr" />
                      </div>
                      <div className="space-y-2">
                        <Label>تا تاریخ</Label>
                        <Input type="date" defaultValue={d.dateEnd} dir="ltr" />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() =>
                          setDiscounts(discounts.filter((_, j) => j !== i))
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== SPECIAL TAB ===== */}
        <TabsContent value="special">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  قیمت‌های ویژه زمانی
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSpecials([
                      ...specials,
                      {
                        customerGroup: "عمومی",
                        priority: "1",
                        price: "",
                        dateStart: "",
                        dateEnd: "",
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  افزودن قیمت ویژه
                </Button>
              </div>
              {specials.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                  هنوز قیمت ویژه‌ای تعریف نشده
                </div>
              ) : (
                <div className="space-y-4">
                  {specials.map((s, i) => (
                    <div
                      key={i}
                      className="grid gap-4 md:grid-cols-6 items-end rounded-lg border p-4"
                    >
                      <div className="space-y-2">
                        <Label>گروه مشتری</Label>
                        <Select defaultValue={s.customerGroup}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="عمومی">عمومی</SelectItem>
                            <SelectItem value="ویژه">ویژه</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>اولویت</Label>
                        <Input
                          type="number"
                          defaultValue={s.priority}
                          dir="ltr"
                          className="text-left"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>قیمت ویژه</Label>
                        <Input
                          type="number"
                          defaultValue={s.price}
                          dir="ltr"
                          className="text-left"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>از تاریخ</Label>
                        <Input type="date" defaultValue={s.dateStart} dir="ltr" />
                      </div>
                      <div className="space-y-2">
                        <Label>تا تاریخ</Label>
                        <Input type="date" defaultValue={s.dateEnd} dir="ltr" />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() =>
                          setSpecials(specials.filter((_, j) => j !== i))
                        }
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== IMAGE TAB ===== */}
        <TabsContent value="image">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <Label className="mb-3 block">تصویر اصلی</Label>
                <div className="flex items-center gap-4">
                  <div className="flex size-32 items-center justify-center rounded-lg border-2 border-dashed bg-muted/50">
                    <ImageIcon className="size-10 text-muted-foreground" />
                  </div>
                  <Button type="button" variant="outline">
                    <Upload className="size-4" />
                    آپلود تصویر
                  </Button>
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>تصاویر اضافی</Label>
                  <Button type="button" variant="outline" size="sm">
                    <Plus className="size-4" />
                    افزودن تصویر
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed bg-muted/30"
                    >
                      <ImageIcon className="size-8 text-muted-foreground/50" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== SEO TAB ===== */}
        <TabsContent value="seo">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seoUrl">آدرس SEO (URL)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap" dir="ltr">
                    /product/
                  </span>
                  <Input
                    id="seoUrl"
                    value={form.seoUrl}
                    onChange={(e) => update("seoUrl", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    placeholder="product-name"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  فقط حروف انگلیسی، عدد و خط تیره مجاز است
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
