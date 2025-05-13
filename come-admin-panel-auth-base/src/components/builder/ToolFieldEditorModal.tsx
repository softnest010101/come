'use client';

import { useState } from 'react';
import { useBuilderStore } from '@/store/useBuilderStore'; // ✅ Use named import!
import type { Field } from '@/shared/tool-meta/tool-config.types';

interface Props {
  toolId: string;
  initialFields: Field[] | { label: string; content: string }[] | { title: string; content: string }[];
  fieldKey?: 'fields' | 'tabs' | 'items';
  onClose: () => void;
}

export default function ToolFieldEditorModal({
  toolId,
  initialFields,
  fieldKey = 'fields',
  onClose,
}: Props) {
  const [items, setItems] = useState<typeof initialFields>(initialFields);
  const [error, setError] = useState<string | null>(null);

  const updateToolConfig = useBuilderStore((state) => state.updateToolConfig);

  const handleItemChange = (
    index: number,
    key: string,
    value: string | number | boolean
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated as typeof initialFields;
    });
    setError(null);
  };

  const handleAddItem = () => {
    let emptyItem: Field | { label: string; content: string } | { title: string; content: string };

    if (fieldKey === 'fields') {
      emptyItem = { name: '', label: '', type: 'text', required: false };
    } else if (fieldKey === 'tabs') {
      emptyItem = { label: '', content: '' };
    } else {
      emptyItem = { title: '', content: '' };
    }

    setItems((prev) => [...prev, emptyItem] as typeof initialFields);
  };

  const handleDeleteItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index) as typeof initialFields);
  };

  const handleSave = () => {
    const hasEmpty = items.some((item) =>
      Object.values(item).some(
        (val) => typeof val === 'string' && val.trim() === ''
      )
    );

    if (hasEmpty) {
      setError('All fields must be filled out.');
      return;
    }

    updateToolConfig(toolId, fieldKey, items);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <h3 className="text-lg font-bold mb-4">Edit {fieldKey}</h3>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-4 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-2 items-center">
              {Object.entries(item).map(([k, v]) => (
                <input
                  key={`${idx}-${k}`}
                  type="text"
                  placeholder={k}
                  value={String(v ?? '')}
                  onChange={(e) => handleItemChange(idx, k, e.target.value)}
                  className="border rounded px-2 py-1 col-span-1"
                />
              ))}
              <button
                onClick={() => handleDeleteItem(idx)}
                className="text-red-500 hover:text-red-700 text-sm col-span-1"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAddItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ➕ Add
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
