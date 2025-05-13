'use client';

import { useBuilderStore } from '@/store/useBuilderStore';
import type { BuilderStore } from '@/store/useBuilderStore';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import {
  exportToolsToJson,
  importToolsFromJson,
  resetCanvasState,
} from './CanvasUtils';
import CanvasStorageMenu from './CanvasStorageMenu';

export default function CanvasToolbar() {
  const tools = useBuilderStore((state: BuilderStore) => state.tools);
  const addTool = useBuilderStore((state: BuilderStore) => state.addTool);
  const createGroup = useBuilderStore((state: BuilderStore) => state.createGroup);

  const handleExport = () => {
    const json = exportToolsToJson();
    navigator.clipboard.writeText(json).then(() => {
      alert('✅ Tools exported to clipboard!');
    });
  };

  const handleImport = () => {
    const json = prompt('📥 Paste tool JSON below:');
    if (json) {
      importToolsFromJson(json);
    }
  };

  return (
    <div className="flex gap-3 mb-6 flex-wrap">
      <CanvasStorageMenu />

      <button
        onClick={handleExport}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        📤 Export
      </button>
      <button
        onClick={handleImport}
        className="px-3 py-1 bg-green-600 text-white rounded"
      >
        📥 Import
      </button>
      <button
        onClick={resetCanvasState}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        🗑️ Reset
      </button>
      <button
        onClick={() => {
          const selectedIds = tools.map((t) => t.id);
          createGroup(selectedIds);
        }}
        className="px-3 py-1 bg-yellow-500 text-white rounded"
      >
        🗂 Group All
      </button>
      <button
        onClick={() => addTool(ToolType.Form)}
        className="px-3 py-1 bg-black text-white rounded"
      >
        ➕ Test Add Tool
      </button>
    </div>
  );
}
