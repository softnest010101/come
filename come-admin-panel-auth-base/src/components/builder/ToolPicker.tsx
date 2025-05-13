'use client';

import { useRef, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { TOOL_REGISTRY } from '@/shared/tool-meta/tool.registry';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';

type DraggableToolProps = {
  toolType: ToolType;
  label: string;
  icon?: string;
};

export default function ToolPicker() {
  const [search, setSearch] = useState('');

  const filteredTools = TOOL_REGISTRY.filter((tool) =>
    tool.label.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(filteredTools.map((tool) => tool.category ?? 'Uncategorized')));

  return (
    <aside className="w-full sm:w-64 md:w-72 p-4 bg-white border-r border-gray-200 shadow-sm overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">🧰 Tool Picker</h3>

      {/* ✅ Search Input */}
      <input
        type="text"
        placeholder="Search tools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-2 py-1 mb-4"
      />

      {/* ✅ Render by categories */}
      {categories.map((category) => (
        <div key={category} className="mb-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">{category}</h4>
          <div className="flex flex-col gap-2">
            {filteredTools
              .filter((tool) => (tool.category ?? 'Uncategorized') === category)
              .map((tool) => (
                <DraggableTool
                  key={tool.type}
                  toolType={tool.type}
                  label={tool.label}
                  icon={tool.icon}
                />
              ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

function DraggableTool({ toolType, label, icon }: DraggableToolProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drag] = useDrag(() => ({
    type: 'TOOL',
    item: { toolType, fromPicker: true },
  }));

  useEffect(() => {
    if (ref.current) {
      drag(ref.current);

      // ✅ Ensure compatibility with native drag-and-drop API
      ref.current.addEventListener('dragstart', (e) => {
        e.dataTransfer?.setData(
          'application/json',
          JSON.stringify({ toolType, fromPicker: true })
        );
      });
    }
  }, [drag, toolType]);

  return (
    <div
      ref={ref}
      draggable
      className="flex items-center gap-2 px-3 py-2 rounded border bg-blue-50 text-blue-800 shadow-sm cursor-move transition hover:bg-blue-100"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
