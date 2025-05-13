"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/useAuthStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !token) {
      router.replace("/login"); // გამოიყენე replace ნაცვლად push-ის, რათა თავიდან აირიდო redirect loop
    }
  }, [isHydrated, token, router]);

  if (!isHydrated) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      {/* Layout-იდან ამოღებულია დუბლირებული ნავიგაცია */}
      <main className="min-h-screen">{children}</main>

      {/* Toast for user feedback */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
