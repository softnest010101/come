"use client";

import PageHeader from "@/shared/PageHeader";
import WidgetInstanceCreateForm from "@/components/widget-instances/WidgetInstanceCreateForm";
import { useRouter } from "next/navigation";

export default function CreateWidgetInstancePage() {
  const router = useRouter();

  const handleCreated = () => {
    router.push("/widget-instances");
  };

  return (
    <div className="p-8">
      <PageHeader title="Create Widget Instance" backLink="/widget-instances" />
      <WidgetInstanceCreateForm onCreated={handleCreated} />
    </div>
  );
}
