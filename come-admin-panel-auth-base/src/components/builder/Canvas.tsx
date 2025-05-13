'use client';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import ResponsivePreview from './ResponsivePreview';
import ToolRenderer from './ToolRenderer';
import SortableTool from './SortableTool';
import CanvasToolbar from './CanvasToolbar';

import { useBuilderStore } from '@/store/useBuilderStore';
import { handleDropEvent } from './CanvasUtils';

export default function Canvas() {
  const tools = useBuilderStore((state) => state.tools);
  const setSelectedTool = useBuilderStore((state) => state.setSelectedTool);
  const reorderTools = useBuilderStore((state) => state.reorderTools);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    reorderTools(active.id.toString(), over.id.toString());
  };

  return (
    <div
      className="flex-1 p-6 min-h-screen bg-gray-50"
      onDrop={(e) => handleDropEvent(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <h2 className="text-xl font-semibold mb-4">🧱 Canvas</h2>

      <CanvasToolbar />

      <ResponsivePreview>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tools.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tools.length === 0 ? (
              <p className="text-gray-400 italic">
                Drag a tool here to get started...
              </p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <SortableTool key={tool.id} id={tool.id}>
                    <div
                      onClick={() => setSelectedTool(tool.id)}
                      className={`p-4 border bg-white shadow rounded transition hover:bg-gray-50 relative group cursor-pointer ${
                        'groupId' in tool && tool.groupId
                          ? 'bg-indigo-50 border-indigo-400'
                          : ''
                      }`}
                    >
                      <ToolRenderer tool={tool} />
                    </div>
                  </SortableTool>
                ))}
              </ul>
            )}
          </SortableContext>
        </DndContext>
      </ResponsivePreview>
    </div>
  );
}
