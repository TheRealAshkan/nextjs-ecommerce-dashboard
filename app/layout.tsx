import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "پنل مدیریت فروشگاه",
  description: "پنل ادمین مدرن مشابه OpenCart",
};

import localFont from "next/font/local";

const shabnam = localFont({
  src: [
    {
      path: "./fonts/shabnam/Shabnam-Light-FD.woff2",
      weight: "100",
      style: "light",
    },
    {
      path: "./fonts/shabnam/Shabnam-FD.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/shabnam/Shabnam-Bold-FD.woff2",
      weight: "600",
      style: "bold",
    },
  ],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`min-h-screen antialiased ${shabnam.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
