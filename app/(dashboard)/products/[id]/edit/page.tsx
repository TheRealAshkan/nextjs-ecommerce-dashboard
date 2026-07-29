"use client";

import { use } from "react";
import { ProductForm } from "@/components/forms/product-form";
import { mockProducts } from "@/lib/mock-data";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        محصول یافت نشد
      </div>
    );
  }

  return <ProductForm product={product} mode="edit" />;
}
