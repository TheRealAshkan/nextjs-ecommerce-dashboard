"use client";

import { use } from "react";
import { CustomerForm } from "@/components/forms/customer-form";
import { mockCustomers } from "@/lib/mock-data";

export default function EditCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const customer = mockCustomers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        مشتری یافت نشد
      </div>
    );
  }

  return <CustomerForm customer={customer} mode="edit" />;
}
