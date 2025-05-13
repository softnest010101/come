'use client';

import { useRef } from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import type { BuilderStore } from '@/store/useBuilderStore';
import { saveToLocalStorage, loadFromLocalStorage } from '@/lib/localStorage';
import type { GroupedPlacedTool } from '@/shared/tool-meta/tool-config.types';

export default function CanvasStorageMenu() {
  const tools = useBuilderStore((state: BuilderStore) => state.tools);
  const setTools = useBuilderStore((state: BuilderStore) => state.setTools);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    saveToLocalStorage(tools);
    alert('✅ Tools saved to localStorage!');
  };

  const handleLoad = () => {
    const stored = loadFromLocalStorage();
    if (Array.isArray(stored) && stored.every((t) => typeof t.id === 'string' && typeof t.type === 'string')) {
      setTools(stored as GroupedPlacedTool[]);
      alert('✅ Tools loaded from localStorage!');
    } else {
      alert('⚠️ Invalid data in localStorage.');
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(tools, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tools-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        if (Array.isArray(json) && json.every((t) => typeof t.id === 'string' && typeof t.type === 'string')) {
          setTools(json as GroupedPlacedTool[]);
          alert('✅ Tools imported from file!');
        } else {
          alert('⚠️ Invalid JSON format in file.');
        }
      } catch {
        alert('❌ Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleSave} className="px-3 py-1 bg-blue-400 text-white rounded">
        💾 Save
      </button>
      <button onClick={handleLoad} className="px-3 py-1 bg-green-400 text-white rounded">
        📂 Load
      </button>
      <button onClick={handleExportJson} className="px-3 py-1 bg-purple-500 text-white rounded">
        ⬇️ Export JSON
      </button>
      <label className="px-3 py-1 bg-purple-700 text-white rounded cursor-pointer">
        ⬆️ Import JSON
        <input
          type="file"
          accept="application/json"
          onChange={handleImportJson}
          ref={fileInputRef}
          className="hidden"
        />
      </label>
    </div>
  );
}
