// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/projects/layout.tsx

import type { ReactNode } from "react";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      <div className="mb-6 border-b border-sky-100 pb-2">
        <h1 className="text-2xl font-semibold text-sky-700">Projects</h1>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}
