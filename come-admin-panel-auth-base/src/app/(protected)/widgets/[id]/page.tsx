// 📁 src/app/(protected)/widgets/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function WidgetDetailPage() {
  const { id } = useParams() as { id: string };
  const [widget, setWidget] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchWidget = async () => {
      try {
        const res = await api.get(`/widgets/${id}`); // ✅ /api/widgets/:id
        setWidget(res.data);
      } catch (err) {
        console.error("❌ Failed to load widget", err);
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
        title={`🔍 ${widget.name ?? "Widget Details"}`}
        backLink="/widgets"
      />
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
    </div>
  );
}
