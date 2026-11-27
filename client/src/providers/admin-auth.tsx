"use client";

import { UserRole } from "@/enum/user-role.enum";
import { useAppSelector } from "@/features/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminAuth(WrappedContent: any) {
  return function WithAuth(prop: any) {
    const { current_user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    useEffect(() => {
      if (current_user?.role !== UserRole.ADMIN) {
        router.replace("/login");
      }
    }, [current_user, router]);

    if (current_user?.role !== UserRole.ADMIN) {
      return null;
    }
    return <WrappedContent {...prop} />;
  };
}
