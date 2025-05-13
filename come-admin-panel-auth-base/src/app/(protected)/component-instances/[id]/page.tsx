// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/component-instances/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function ComponentInstanceDetailPage() {
  const { id } = useParams() as { id: string };
  const [componentInstance, setComponentInstance] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchComponentInstance = async () => {
      try {
        const res = await api.get(`/component-instances/${id}`); // ✅ baseURL already includes /api
        setComponentInstance(res.data);
      } catch (err) {
        console.error("❌ Failed to load component instance", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComponentInstance();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!componentInstance) return <p className="p-4">Component instance not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={`🔍 ${componentInstance.name ?? "Component Instance Details"}`}
        backLink="/component-instances"
      />
      <div className="space-y-2 mt-4 text-sm text-gray-700">
        {Object.entries(componentInstance).map(([key, value]) => (
          <div key={key}>
            <strong className="capitalize">{key}:</strong>{" "}
            <span>
              {typeof value === "object"
                ? JSON.stringify(value)
                : String(value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
