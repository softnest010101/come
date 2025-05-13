// 📁 my-platform/come-admin-panel-auth-base/src/app/(protected)/widgets/layout.tsx

import type { ReactNode } from "react";

export default function WidgetsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}
