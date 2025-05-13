"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import WidgetInstanceEditForm from "@/components/widget-instances/WidgetInstanceEditForm";

export default function WidgetInstanceDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface WidgetInstance {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [widgetInstance, setWidgetInstance] = useState<WidgetInstance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWidgetInstance = async () => {
      try {
        const res = await api.get(`/widget-instances/${id}`);
        setWidgetInstance(res.data);
      } catch (err) {
        console.error("❌ Error loading widget instance:", err);
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
        title={isEditMode ? "✏️ Edit Widget Instance" : `🔍 ${widgetInstance.name}`}
        backLink="/widget-instances"
      />

      {isEditMode ? (
        <WidgetInstanceEditForm id={Number(widgetInstance.id)} initialData={widgetInstance} />
      ) : (
        <div className="space-y-2 mt-4 text-sm text-gray-700">
          {Object.entries(widgetInstance).map(([key, value]) => (
            <div key={key}>
              <strong className="capitalize">{key}:</strong>{" "}
              <span>
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
