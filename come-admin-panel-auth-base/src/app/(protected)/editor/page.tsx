'use client';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Canvas from '@/components/builder/Canvas';
import ToolInspector from '@/components/builder/ToolInspector';
import ToolPicker from '@/components/builder/ToolPicker'; // ✅ ToolPicker იმპორტი

export default function EditorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-6">
        <div className="flex-1 bg-gray-100 rounded-xl shadow p-4">
          <ToolPicker /> {/* ✅ ToolPicker ჩასმული Canvas-ზე ზემოთ */}
          <Canvas />
        </div>
        <div className="w-[400px] bg-white border rounded-xl shadow p-4">
          <ToolInspector />
        </div>
      </div>
    </DndProvider>
  );
}
