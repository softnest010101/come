// 📁 src/app/(protected)/widgets/create/page.tsx

"use client";

import PageHeader from "@/shared/PageHeader";
import WidgetCreateForm from "@/components/widgets/WidgetCreateForm";
import { useRouter } from "next/navigation";

export default function CreateWidgetPage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/widgets");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Widget" backLink="/widgets" />
      <WidgetCreateForm onCreated={handleCreated} />
    </div>
  );
}
