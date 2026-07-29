# پنل ادمین فروشگاه (مشابه OpenCart)

پنل مدیریت مدرن و کامل ساخته‌شده با **Next.js 16**، **shadcn/ui**، **Tailwind CSS v4** و **Zustand**.

## ویژگی‌ها

- ✅ طراحی مدرن RTL (فارسی)
- ✅ داشبورد با آمار و نمودارها
- ✅ مدیریت دسته‌بندی‌ها
- ✅ مدیریت محصولات
- ✅ مدیریت سفارشات
- ✅ مدیریت مشتریان
- ✅ مدیریت کاربران و نقش‌ها
- ✅ گزارش‌ها
- ✅ تنظیمات فروشگاه
- ✅ صفحه لاگین
- ✅ پشتیبانی Dark Mode
- ✅ State Management با Zustand
- ✅ Responsive

## صفحات

| مسیر | توضیح |
|------|-------|
| `/login` | ورود به پنل |
| `/` | داشبورد |
| `/categories` | دسته‌بندی‌ها |
| `/products` | محصولات |
| `/orders` | سفارشات |
| `/customers` | مشتریان |
| `/users` | کاربران |
| `/reports` | گزارش‌ها |
| `/settings` | تنظیمات |

## نصب و اجرا

```bash
# نصب وابستگی‌ها
npm install

# اجرای محیط توسعه
npm run dev

# بیلد تولید
npm run build
npm start
```

## ورود تست

```
ایمیل: admin@example.com
رمز عبور: admin123
```

## تکنولوژی‌ها

- **Next.js** 16.2+
- **React** 19
- **TypeScript**
- **Tailwind CSS** 4
- **shadcn/ui** (New York style)
- **Zustand** 5
- **Recharts** (نمودارها)
- **Lucide React** (آیکون‌ها)
- **next-themes** (دارک مود)

## ساختار پروژه

```
├── app/
│   ├── (auth)/login/     # صفحه لاگین
│   ├── (dashboard)/      # صفحات پنل
│   │   ├── page.tsx      # داشبورد
│   │   ├── categories/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── users/
│   │   ├── reports/
│   │   └── settings/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/               # کامپوننت‌های shadcn
│   ├── layout/           # سایدبار، هدر
│   └── dashboard/        # کارت‌ها و نمودارها
├── stores/               # Zustand stores
├── lib/                  # utils و mock data
└── types/                # TypeScript types
```

## لایسنس

MIT
