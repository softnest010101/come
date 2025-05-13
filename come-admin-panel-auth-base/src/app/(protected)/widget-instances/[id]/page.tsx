"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function WidgetInstanceDetailPage() {
  const { id } = useParams() as { id: string };
  const [widgetInstance, setWidgetInstance] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWidgetInstance = async () => {
      try {
        const res = await api.get(`/widget-instances/${id}`); // ✅ baseURL already includes /api
        setWidgetInstance(res.data);
      } catch (err) {
        console.error("❌ Failed to load widget instance", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgetInstance();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!widgetInstance) return <p className="p-4">Widget Instance not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={`🔍 ${widgetInstance.name ?? "Widget Instance Details"}`}
        backLink="/widget-instances"
      />
      <div className="space-y-2 mt-4 text-sm text-gray-700">
        {Object.entries(widgetInstance).map(([key, value]) => (
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
