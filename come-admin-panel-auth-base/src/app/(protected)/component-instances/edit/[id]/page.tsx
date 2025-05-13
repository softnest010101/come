"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import ComponentInstanceEditForm from "@/components/component-instances/ComponentInstanceEditForm";

export default function ComponentInstanceDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface ComponentInstance {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [componentInstance, setComponentInstance] = useState<ComponentInstance | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchComponentInstance = async () => {
      try {
        const res = await api.get(`/component-instances/${id}`);
        setComponentInstance(res.data);
      } catch (err) {
        console.error("❌ Error loading component instance:", err);
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
        title={isEditMode ? "✏️ Edit Component Instance" : `🔍 ${componentInstance.name}`}
        backLink="/component-instances"
      />

      {isEditMode ? (
        <ComponentInstanceEditForm id={Number(componentInstance.id)} initialData={componentInstance} />
      ) : (
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
      )}
    </div>
  );
}
