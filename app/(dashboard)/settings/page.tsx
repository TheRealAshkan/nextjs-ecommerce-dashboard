"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="تنظیمات"
        description="پیکربندی فروشگاه و پنل مدیریت"
      />

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات فروشگاه</CardTitle>
            <CardDescription>نام و اطلاعات اصلی فروشگاه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">نام فروشگاه</Label>
              <Input id="store-name" defaultValue="فروشگاه من" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">ایمیل فروشگاه</Label>
              <Input id="store-email" type="email" defaultValue="info@store.com" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">تلفن</Label>
              <Input id="store-phone" defaultValue="021-12345678" dir="ltr" className="text-left" />
            </div>
            <Button>ذخیره تغییرات</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>واحد پول و مالیات</CardTitle>
            <CardDescription>تنظیمات مالی فروشگاه</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">واحد پول پیش‌فرض</Label>
              <Input id="currency" defaultValue="تومان (IRR)" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax">نرخ مالیات (%)</Label>
              <Input id="tax" type="number" defaultValue="9" dir="ltr" className="text-left" />
            </div>
            <Button>ذخیره تغییرات</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
