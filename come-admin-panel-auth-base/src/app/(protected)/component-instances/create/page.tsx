// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/component-instances/create/page.tsx

"use client";

import PageHeader from "@/shared/PageHeader";
import ComponentInstanceCreateForm from "@/components/component-instances/ComponentInstanceCreateForm";
import { useRouter } from "next/navigation";

export default function CreateComponentInstancePage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/component-instances");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Component Instance" backLink="/component-instances" />
      <ComponentInstanceCreateForm onCreated={handleCreated} />
    </div>
  );
}
