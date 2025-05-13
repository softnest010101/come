"use client";

import PageHeader from "@/shared/PageHeader";
import ComponentCreateForm from "@/components/components/ComponentCreateForm";
import { useRouter } from "next/navigation";

export default function CreateComponentPage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/components");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Component" backLink="/components" />
      <ComponentCreateForm onCreated={handleCreated} />
    </div>
  );
}
