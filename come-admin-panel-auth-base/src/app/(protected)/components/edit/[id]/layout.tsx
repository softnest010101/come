import type { ReactNode } from "react";

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      <div className="mb-6 border-b border-sky-100 pb-2">
        <h1 className="text-2xl font-semibold text-sky-700">Components</h1>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}
