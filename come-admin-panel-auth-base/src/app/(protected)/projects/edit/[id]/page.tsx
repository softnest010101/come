"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PageHeader from "@/shared/PageHeader";
import ProjectEditForm from "@/components/projects/ProjectEditForm";

export default function ProjectDetailPage() {
  const { id } = useParams() as { id: string };
  const pathname = usePathname();
  const isEditMode = pathname.includes("/edit/");

  interface Project {
    id: string;
    name: string;
    description?: string;
    notes?: string;
    tags?: string[];
    visible?: boolean;
    [key: string]: unknown;
  }

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("❌ Error loading project:", err);
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
        title={isEditMode ? "✏️ Edit Project" : `🔍 ${project.name}`}
        backLink="/projects"
      />

      {isEditMode ? (
        <ProjectEditForm id={Number(project.id)} initialData={project} />
      ) : (
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
      )}
    </div>
  );
}
