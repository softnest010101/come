"use client";

import PageHeader from "@/shared/PageHeader";
import ProjectCreateForm from "@/components/projects/ProjectCreateForm";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/projects");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Project" backLink="/projects" />
      <ProjectCreateForm onCreated={handleCreated} />
    </div>
  );
}
