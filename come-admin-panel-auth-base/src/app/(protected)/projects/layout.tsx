// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/projects/layout.tsx

import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}
