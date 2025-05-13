import type { ReactNode } from "react";

export default function ComponentsLayout({ children }: { children: ReactNode }) {
  return (
    <section className="p-6">
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        {children}
      </div>
    </section>
  );
}
