"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "← Back" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-blue-600 hover:underline text-sm mb-4"
    >
      {label}
    </button>
  );
}
