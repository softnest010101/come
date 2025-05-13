'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';

type Props = {
  id: string;
  children: ReactNode;
};

export default function SortableTool({ id, children }: Props) {
  const { tools, setSelectedTool, cloneTool, deleteTool } = useBuilderStore();

  const tool = tools.find((t) => t.id === id);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const borderClass = tool?.groupId
    ? 'border-indigo-500 bg-indigo-50'
    : 'border-gray-200 bg-white';

  if (!tool) return null;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`cursor-move border rounded shadow-sm p-2 ${borderClass}`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">{children}</div>
        <div className="flex flex-col gap-1 text-sm">
          <button onClick={() => setSelectedTool(tool.id)} className="text-blue-600 hover:underline">
            ✏️ Edit
          </button>
          <button onClick={() => cloneTool(tool.id)} className="text-green-600 hover:underline">
            📋 Clone
          </button>
          <button onClick={() => deleteTool(tool.id)} className="text-red-600 hover:underline">
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
