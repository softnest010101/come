"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import ComponentEditForm from "@/components/components/ComponentEditForm";

export default function ComponentDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface Component {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [component, setComponent] = useState<Component | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchComponent = async () => {
      try {
        const res = await api.get(`/components/${id}`);
        setComponent(res.data);
      } catch (err) {
        console.error("❌ Error loading component:", err);
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
        title={isEditMode ? "✏️ Edit Component" : `🔍 ${component.name}`}
        backLink="/components"
      />

      {isEditMode ? (
        <ComponentEditForm id={Number(component.id)} initialData={component} />
      ) : (
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
      )}
    </div>
  );
}
