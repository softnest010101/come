"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import { useState, useMemo } from "react";
import { duplicatePage } from "@/lib/api";
import UniversalLinkModal from "@/shared/UniversalLinkModal";

type Page = Record<string, unknown>;

type PageListProps = {
  pages: Page[];
  onDelete: (id: number) => Promise<void>;
};

function formatValue(key: string, value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (key === "createdAt" || key === "updatedAt") {
    const date = new Date(value as string);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }
  if (key === "owner") {
    const owner = value as { firstName?: string; lastName?: string; email?: string };
    if (owner.firstName || owner.lastName) {
      return `${owner.firstName ?? ""} ${owner.lastName ?? ""}`.trim();
    }
    return owner.email ?? "[unknown]";
  }
  if (key === "components") return `${(value as unknown[]).length} component(s)`;
  if (key === "visible") return value === true ? "🟢 Visible" : "🔒 Hidden";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export default function PageList({ pages, onDelete }: PageListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);
  const [linkingId, setLinkingId] = useState<number | null>(null);

  const allFields = useMemo(() => {
    const fieldSet = new Set<string>();
    pages.forEach((page) => {
      Object.keys(page).forEach((key) => fieldSet.add(key));
    });
    return Array.from(fieldSet);
  }, [pages]);

  const toggleField = (field: string) => {
    setVisibleFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await onDelete(id);
      toast.success("✅ Page deleted");
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message = axiosErr.response?.data?.message ?? "❌ Failed to delete page";
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      const duplicated = await duplicatePage(id);
      toast.success(`✅ Duplicated: ${duplicated.name}`);
      router.refresh();
    } catch (err) {
      toast.error("❌ Failed to duplicate page");
      console.error(err);
    }
  };

  if (pages.length === 0) {
    return (
      <div className="text-center text-[#7d6f61] mt-8">
        <p>No pages found.</p>
        <Link href="/pages/create" className="mt-4 inline-block text-[#a67857] hover:underline">
          ➕ Create your first page
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-2">
        <details className="relative">
          <summary className="cursor-pointer text-sm text-[#a67857] hover:underline">
            🧩 Select Columns
          </summary>
          <div className="absolute z-10 bg-white border border-[#e4dccc] rounded shadow p-3 mt-1 w-56">
            {allFields.map((field) => (
              <label
                key={field}
                className="flex items-center gap-2 text-sm mb-1 text-[#4b3621]"
              >
                <input
                  type="checkbox"
                  checked={visibleFields.includes(field)}
                  onChange={() => toggleField(field)}
                />
                <span className="capitalize">{field}</span>
              </label>
            ))}
          </div>
        </details>
      </div>

      <table className="min-w-full border border-[#dfcbb9] rounded-md text-sm">
        <thead className="bg-[#f1e7dc] text-[#5b4636]">
          <tr>
            <th className="px-3 py-2 border">#</th>
            {allFields
              .filter((field) => visibleFields.length === 0 || visibleFields.includes(field))
              .map((field) => (
                <th key={field} className="px-3 py-2 border text-left capitalize">
                  {field}
                </th>
              ))}
            <th className="px-3 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page, index) => (
            <tr
              key={page.id as number}
              className="hover:bg-[#fbf6ef] cursor-pointer text-[#3e3e3e]"
              onClick={() => router.push(`/pages/${page.id}`)}
            >
              <td className="px-3 py-2 border text-center text-[#7d6f61]">{index + 1}</td>
              {Object.entries(page)
                .filter(([key]) => visibleFields.length === 0 || visibleFields.includes(key))
                .map(([key, value]) => (
                  <td key={key} className="px-3 py-2 border">
                    {formatValue(key, value)}
                  </td>
                ))}
              <td className="px-3 py-2 border text-right space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/pages/edit/${page.id}`);
                  }}
                  className="bg-yellow-100 border border-yellow-400 text-yellow-700 text-xs px-2 py-1 rounded hover:bg-yellow-200"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(page.id as number);
                  }}
                  disabled={deletingId === page.id}
                  className="bg-red-100 border border-red-400 text-red-700 text-xs px-2 py-1 rounded hover:bg-red-200 disabled:opacity-50"
                >
                  {deletingId === page.id ? "Deleting..." : "🗑️ Delete"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDuplicate(page.id as number);
                  }}
                  className="bg-blue-100 border border-blue-400 text-blue-700 text-xs px-2 py-1 rounded hover:bg-blue-200"
                >
                  📋 Duplicate
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLinkingId(page.id as number);
                  }}
                  className="bg-green-100 border border-green-400 text-green-700 text-xs px-2 py-1 rounded hover:bg-green-200"
                >
                  🔗 Link
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {linkingId !== null && (
        <UniversalLinkModal
          isOpen={true}
          sourceId={linkingId}
          sourceModel="page"
          onClose={() => setLinkingId(null)}
          onSuccess={() => {
            setLinkingId(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
