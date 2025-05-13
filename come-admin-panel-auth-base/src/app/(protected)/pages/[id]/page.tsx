'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function PageDetailPage() {
  const { id } = useParams() as { id: string };
  const [page, setPage] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        const res = await api.get(`/pages/${id}`); // ✅ baseURL already includes /api
        setPage(res.data);
      } catch (err) {
        console.error("❌ Failed to load page", err);
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
        title={`🔍 ${page.name ?? "Page Details"}`}
        backLink="/pages"
      />
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
    </div>
  );
}
