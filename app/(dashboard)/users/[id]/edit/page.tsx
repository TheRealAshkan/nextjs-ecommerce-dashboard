"use client";

import { use } from "react";
import { UserForm } from "@/components/forms/user-form";
import { mockUsers } from "@/lib/mock-data";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        کاربر یافت نشد
      </div>
    );
  }

  return <UserForm user={user} mode="edit" />;
}
