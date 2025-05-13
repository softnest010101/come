"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import api from "@/lib/api";

type Props = {
  onCreated?: () => void;
};

export default function ProjectCreateForm({ onCreated }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("❌ Project name is required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/projects", {
        name,
        description,
        notes,
        tags,
        visible,
      });

      toast.success("✅ Project created successfully!");
      setName("");
      setDescription("");
      setNotes("");
      setTags([]);
      setVisible(true);

      if (onCreated) onCreated();
      else router.push("/projects");
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ?? "❌ Failed to create project",
      );
      console.error("❌ Create error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded w-full"
        disabled={loading}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded w-full"
        disabled={loading}
      />
      <textarea
        placeholder="Additional notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="p-2 border rounded w-full"
        rows={3}
        disabled={loading}
      />

      {/* Tags */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="p-2 border rounded w-full"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleAddTag}
            disabled={loading || !tagInput.trim()}
            className="bg-gray-200 px-4 rounded text-sm hover:bg-gray-300"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Visibility */}
      <div className="flex items-center gap-2">
        <input
          id="visible"
          type="checkbox"
          checked={visible}
          onChange={(e) => setVisible(e.target.checked)}
          className="cursor-pointer"
        />
        <label htmlFor="visible" className="text-sm text-gray-700">
          Visible to users
        </label>
      </div>

      <button
        onClick={handleCreate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
}
