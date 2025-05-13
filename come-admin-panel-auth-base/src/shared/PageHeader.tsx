"use client";

import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/ui/Breadcrumb";

type PageHeaderProps = {
  title: string;
  backLink?: string;
  breadcrumbs?: { label: string; href?: string }[];
};

export default function PageHeader({
  title,
  backLink,
  breadcrumbs,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 space-y-2">
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-sky-800">{title}</h1>
        {backLink && (
          <button
            onClick={() => router.push(backLink)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
