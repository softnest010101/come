// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/widgets/[id]/page.tsx

"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import WidgetEditForm from "@/components/widgets/WidgetEditForm";

export default function WidgetDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface Widget {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [widget, setWidget] = useState<Widget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWidget = async () => {
      try {
        const res = await api.get(`/widgets/${id}`);
        setWidget(res.data);
      } catch (err) {
        console.error("❌ Error loading widget:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWidget();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!widget) return <p className="p-4">Widget not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={isEditMode ? "✏️ Edit Widget" : `🔍 ${widget.name}`}
        backLink="/widgets"
      />

      {isEditMode ? (
        <WidgetEditForm id={Number(widget.id)} initialData={widget} />
      ) : (
        <div className="space-y-2 mt-4 text-sm text-gray-700">
          {Object.entries(widget).map(([key, value]) => (
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
      )}
    </div>
  );
}
