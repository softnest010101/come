'use client';

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import PageEditForm from "@/components/pages/PageEditForm";

export default function PageDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface Page {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        const res = await api.get(`/pages/${id}`);
        setPage(res.data);
      } catch (err) {
        console.error("❌ Error loading page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!page) return <p className="p-4">Page not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={isEditMode ? "✏️ Edit Page" : `🔍 ${page.name}`}
        backLink="/pages"
      />

      {isEditMode ? (
        <PageEditForm id={Number(page.id)} initialData={page} />
      ) : (
        <div className="space-y-2 mt-4 text-sm text-gray-700">
          {Object.entries(page).map(([key, value]) => (
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
