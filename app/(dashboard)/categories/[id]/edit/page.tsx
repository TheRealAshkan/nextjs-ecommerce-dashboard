"use client";

import { use } from "react";
import { CategoryForm } from "@/components/forms/category-form";
import { mockCategories } from "@/lib/mock-data";

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const category = mockCategories.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        دسته‌بندی یافت نشد
      </div>
    );
  }

  return <CategoryForm category={category} mode="edit" />;
}
