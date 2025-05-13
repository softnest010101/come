// src/app/(protected)/dashboard/page.tsx
"use client";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard 🚀</h1>
      <p className="mt-2">
        You are logged in and can manage your platform here.
      </p>
    </div>
  );
}
