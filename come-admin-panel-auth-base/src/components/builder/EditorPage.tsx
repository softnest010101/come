'use client';

import Canvas from "./Canvas";
import ToolInspector from "./ToolInspector";
import ToolPicker from "./ToolPicker";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function EditorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen">
        {/* Tool Picker */}
        <div className="w-64 border-r bg-white p-4">
          <ToolPicker />
        </div>

        {/* Canvas */}
        <div className="flex-1">
          <Canvas />
        </div>

        {/* Inspector */}
        <div className="w-72 border-l bg-gray-50 p-4">
          <ToolInspector id="inspector-1">
            <div>Inspector Content</div>
          </ToolInspector>
        </div>
      </div>
    </DndProvider>
  );
}
