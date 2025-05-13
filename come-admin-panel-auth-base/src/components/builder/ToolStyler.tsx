'use client';

import { useBuilderStore } from '@/store/useBuilderStore'; // ✅ შეცვალე NAMED IMPORT
import type { ToolStyleConfig } from '@/shared/tool-meta/tool-config.types';

const fields: {
  key: keyof ToolStyleConfig;
  label: string;
  type: 'text' | 'select';
  options?: string[];
}[] = [
  { key: 'margin', label: 'Margin', type: 'text' },
  { key: 'padding', label: 'Padding', type: 'text' },
  { key: 'backgroundColor', label: 'Background Color', type: 'text' },
  { key: 'textColor', label: 'Text Color', type: 'text' },
  { key: 'fontSize', label: 'Font Size', type: 'select', options: ['sm', 'base', 'lg', 'xl', '2xl'] },
  { key: 'fontWeight', label: 'Font Weight', type: 'select', options: ['light', 'normal', 'medium', 'bold', 'semibold'] },
  { key: 'textAlign', label: 'Text Align', type: 'select', options: ['left', 'center', 'right'] },
];

export default function ToolStyler() {
  const selectedToolId = useBuilderStore((state) => state.selectedTool);
  const tools = useBuilderStore((state) => state.tools);
  const updateToolConfig = useBuilderStore((state) => state.updateToolConfig);

  const selectedTool = tools.find((tool) => tool.id === selectedToolId);
  const style = (selectedTool?.config?.style ?? {}) as ToolStyleConfig;

  const handleChange = (key: keyof ToolStyleConfig, value: string) => {
    if (!selectedToolId) return;
    const newStyle: ToolStyleConfig = { ...style, [key]: value };
    updateToolConfig(selectedToolId, 'style', newStyle);
  };

  if (!selectedTool) return null;

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">🎨 Style Settings</h3>
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col text-sm">
          <label className="text-gray-600 mb-1">{field.label}</label>
          {field.type === 'select' ? (
            <select
              value={style[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">(default)</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={style[field.key] ?? ''}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder="e.g. 4, #fff, red-500"
              className="border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
            />
          )}
        </div>
      ))}
    </div>
  );
}
