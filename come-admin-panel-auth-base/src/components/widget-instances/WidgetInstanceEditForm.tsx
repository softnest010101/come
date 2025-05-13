"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import api from "@/lib/api";

interface LinkableComponent {
  id: number;
  name: string;
}

type WidgetInstanceEditFormProps = {
  id: number;
  initialData: {
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
  };
};

export default function WidgetInstanceEditForm({
  id,
  initialData,
}: WidgetInstanceEditFormProps) {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description ?? "");
  const [notes, setNotes] = useState(initialData.notes ?? "");
  const [tags, setTags] = useState(initialData.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [visible, setVisible] = useState(initialData.visible ?? true);
  const [loading, setLoading] = useState(false);
  const [availableComponents, setAvailableComponents] = useState<LinkableComponent[]>([]);
  const [selectedComponentIds, setSelectedComponentIds] = useState<number[]>([]);

  const router = useRouter();

  useEffect(() => {
    api.get<LinkableComponent[]>("/components/my")
      .then((res) => setAvailableComponents(res.data))
      .catch(() => toast.error("❌ Failed to load components"));
  }, []);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("❌ Widget instance name is required");
      return;
    }

    setLoading(true);
    try {
      await api.patch(`/widget-instances/${id}`, {
        name,
        description,
        notes,
        tags,
        visible,
      });

      if (selectedComponentIds.length > 0) {
        await api.post(`/widget-instances/${id}/bulk-link`, {
          targetModel: "component",
          targetIds: selectedComponentIds,
        });
      }

      toast.success("✅ Widget instance updated successfully!");
      router.push("/widget-instances");
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>;
      const message =
        axiosErr.response?.data?.message ?? "❌ Failed to update widget instance";
      toast.error(message);
      console.error("❌ Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/widget-instances");
  };

  const toggleComponentSelection = (id: number) => {
    setSelectedComponentIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Widget Instance Name"
        className="p-2 border rounded w-full"
        disabled={loading}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="p-2 border rounded w-full"
        disabled={loading}
      />
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Additional notes (optional)"
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

      {/* Relationship: Select Components */}
      <div>
        <label className="text-sm text-gray-700">Attach Components:</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {availableComponents.map((comp) => (
            <label
              key={comp.id}
              className="inline-flex items-center gap-2 bg-sky-50 px-3 py-1 rounded border cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedComponentIds.includes(comp.id)}
                onChange={() => toggleComponentSelection(comp.id)}
              />
              <span className="text-sm">{comp.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        <button
          onClick={handleCancel}
          disabled={loading}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
