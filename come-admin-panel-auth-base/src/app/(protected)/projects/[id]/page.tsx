"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";

export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const [project, setProject] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`); // ✅ baseURL already includes /api
        setProject(res.data);
      } catch (err) {
        console.error("❌ Failed to load project", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!project) return <p className="p-4">Project not found</p>;

  return (
    <div className="p-8">
      <PageHeader
        title={`🔍 ${project.name ?? "Project Details"}`}
        backLink="/projects"
      />
      <div className="space-y-2 mt-4 text-sm text-gray-700">
        {Object.entries(project).map(([key, value]) => (
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
