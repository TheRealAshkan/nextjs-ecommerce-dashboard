"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Plus, Trash2 } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import type { Customer } from "@/types";

interface CustomerFormProps {
  customer?: Customer;
  mode: "create" | "edit";
}

export function CustomerForm({ customer, mode }: CustomerFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: customer?.name?.split(" ")[0] || "",
    lastName: customer?.name?.split(" ").slice(1).join(" ") || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    password: "",
    confirmPassword: "",
    group: customer?.group || "عمومی",
    status: customer?.status === "active" || !customer,
    newsletter: false,
    safe: true,
  });

  const [addresses, setAddresses] = useState<
    {
      title: string;
      address: string;
      city: string;
      province: string;
      postalCode: string;
      isDefault: boolean;
    }[]
  >(
    mode === "edit"
      ? [
          {
            title: "منزل",
            address: "خیابان ولیعصر، پلاک ۱۲۳",
            city: "تهران",
            province: "تهران",
            postalCode: "1234567890",
            isDefault: true,
          },
        ]
      : []
  );

  const update = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    router.push("/customers");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-16 z-30 -mx-4 md:-mx-6 lg:-mx-8 mb-6 flex items-center justify-between gap-4 border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8 py-3">
        <div>
          <h1 className="text-xl font-bold">
            {mode === "create" ? "افزودن مشتری" : "ویرایش مشتری"}
          </h1>
          {customer && (
            <p className="text-sm text-muted-foreground">{customer.name}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/customers")}
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
            { value: "address", label: "آدرس‌ها" },
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
                <div className="space-y-2">
                  <Label>
                    نام <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    نام خانوادگی <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
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
                  <Label>تلفن</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    dir="ltr"
                    className="text-left"
                    placeholder="09121234567"
                  />
                </div>
                {mode === "create" && (
                  <>
                    <div className="space-y-2">
                      <Label>
                        رمز عبور <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        required={mode === "create"}
                        dir="ltr"
                        className="text-left"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        تکرار رمز عبور <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                          update("confirmPassword", e.target.value)
                        }
                        required={mode === "create"}
                        dir="ltr"
                        className="text-left"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label>گروه مشتری</Label>
                  <Select
                    value={form.group}
                    onValueChange={(v) => update("group", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="عمومی">عمومی</SelectItem>
                      <SelectItem value="ویژه">ویژه</SelectItem>
                      <SelectItem value="عمده">عمده</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>وضعیت</Label>
                    <p className="text-xs text-muted-foreground">
                      حساب مشتری فعال باشد
                    </p>
                  </div>
                  <Switch
                    checked={form.status}
                    onCheckedChange={(v) => update("status", v)}
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Label>خبرنامه</Label>
                    <p className="text-xs text-muted-foreground">
                      عضویت در خبرنامه ایمیلی
                    </p>
                  </div>
                  <Switch
                    checked={form.newsletter}
                    onCheckedChange={(v) => update("newsletter", v)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  آدرس‌های ثبت‌شده مشتری
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setAddresses([
                      ...addresses,
                      {
                        title: "",
                        address: "",
                        city: "",
                        province: "",
                        postalCode: "",
                        isDefault: addresses.length === 0,
                      },
                    ])
                  }
                >
                  <Plus className="size-4" />
                  افزودن آدرس
                </Button>
              </div>
              {addresses.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                  هنوز آدرسی ثبت نشده
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr, i) => (
                    <div
                      key={i}
                      className="rounded-lg border p-4 space-y-4 relative"
                    >
                      <div className="absolute top-3 left-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8 text-destructive"
                          onClick={() =>
                            setAddresses(addresses.filter((_, j) => j !== i))
                          }
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>عنوان آدرس</Label>
                          <Input
                            defaultValue={addr.title}
                            placeholder="منزل، محل کار، ..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>استان</Label>
                          <Select defaultValue={addr.province || undefined}>
                            <SelectTrigger>
                              <SelectValue placeholder="انتخاب استان" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="تهران">تهران</SelectItem>
                              <SelectItem value="اصفهان">اصفهان</SelectItem>
                              <SelectItem value="فارس">فارس</SelectItem>
                              <SelectItem value="خراسان رضوی">
                                خراسان رضوی
                              </SelectItem>
                              <SelectItem value="آذربایجان شرقی">
                                آذربایجان شرقی
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>آدرس کامل</Label>
                          <Input defaultValue={addr.address} />
                        </div>
                        <div className="space-y-2">
                          <Label>شهر</Label>
                          <Input defaultValue={addr.city} />
                        </div>
                        <div className="space-y-2">
                          <Label>کد پستی</Label>
                          <Input
                            defaultValue={addr.postalCode}
                            dir="ltr"
                            className="text-left"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
