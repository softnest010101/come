'use client';

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api";
import PageList from "@/components/pages/PageList";
import Link from "next/link";

type Page = {
  id: number;
  name: string;
  visible: boolean;
};

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [filteredPages, setFilteredPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [visibleOnly, setVisibleOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const fetchPages = async () => {
    try {
      const res = await api.get<Page[]>("/pages/my");
      setPages(res.data);
    } catch (err) {
      toast.error("❌ Failed to load pages");
      console.error("❌ Failed to load pages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/pages/${id}`);
      await fetchPages();
    } catch (err) {
      toast.error("❌ Failed to delete page");
      console.error("❌ Delete error:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    let result = [...pages];
    if (visibleOnly) result = result.filter((p) => p.visible !== false);
    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredPages(result);
  }, [pages, search, sortAsc, visibleOnly]);

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);
  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#fdfaf4] px-6 py-8 font-sans text-[#3e3e3e]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-[#5b4636]">📄 Pages</h1>
      </div>

      <div className="bg-[#f5ede2] border border-[#e4d4c2] rounded-md p-4 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
        <Link
          href="/pages/create"
          className="bg-[#a67c52] hover:bg-[#8c6643] text-white font-medium px-4 py-2 rounded-md shadow-sm transition duration-200"
        >
          ➕ Create Page
        </Link>
        <input
          type="text"
          placeholder="Search pages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 px-3 py-2 rounded-md border border-[#d8c3ad] focus:ring-2 focus:ring-[#c49b6c] outline-none"
        />
        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="bg-white border border-[#cdb9a2] text-sm px-3 py-2 rounded-md hover:bg-[#f7f0e5] transition"
        >
          Sort: {sortAsc ? "A → Z" : "Z → A"}
        </button>
        <button
          onClick={() => setVisibleOnly(!visibleOnly)}
          className="bg-white border border-[#cdb9a2] text-sm px-3 py-2 rounded-md hover:bg-[#f7f0e5] transition"
        >
          {visibleOnly ? "Show All" : "Show Visible Only"}
        </button>
      </div>

      <div className="bg-white border border-[#dfcbb9] rounded-md overflow-x-auto shadow-md">
        {loading ? (
          <p className="p-4 text-center italic text-[#8b7b6b]">Loading pages...</p>
        ) : (
          <PageList pages={paginatedPages} onDelete={handleDelete} />
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-[#4e3d30]">
        <div>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-[#cabaa9] bg-white text-[#4e3d30] hover:bg-[#f0e9e1] disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-[#cabaa9] bg-white text-[#4e3d30] hover:bg-[#f0e9e1] disabled:opacity-50"
          >
            Next ▶
          </button>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="ml-2 border border-[#d8c3ad] px-2 py-1 rounded-md focus:ring-2 focus:ring-[#c49b6c]"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                View {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
