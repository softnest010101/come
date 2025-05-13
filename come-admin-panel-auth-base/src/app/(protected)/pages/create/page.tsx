'use client';

import PageHeader from "@/shared/PageHeader";
import PageCreateForm from "@/components/pages/PageCreateForm";
import { useRouter } from "next/navigation";

export default function CreatePagePage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/pages");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Page" backLink="/pages" />
      <PageCreateForm onCreated={handleCreated} />
    </div>
  );
}
