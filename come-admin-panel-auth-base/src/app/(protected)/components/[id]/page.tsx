"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function ComponentDetailPage() {
  const { id } = useParams() as { id: string };
  const [component, setComponent] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchComponent = async () => {
      try {
        const res = await api.get(`/components/${id}`);
        setComponent(res.data);
      } catch (err) {
        console.error("❌ Failed to load component", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!component) return <p className="p-4">Component not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={`🔍 ${component.name ?? "Component Details"}`}
        backLink="/components"
      />
      <div className="space-y-2 mt-4 text-sm text-gray-700">
        {Object.entries(component).map(([key, value]) => (
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
