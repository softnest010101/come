'use client';
import { validateToolConfig } from "@/lib/validateToolConfig";
import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import { UniversalDropZone } from "@/components/builder/UniversalDropZone";

type Props = {
  config: ToolConfigMap[ToolType.Grid];
  id: string;
};

export default function GridTool({ config, id }: Props) {
  const isValid = validateToolConfig(ToolType.Grid, config);

  if (!isValid) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for Grid Tool.
      </div>
    );
  }

  return (
    <div className="rounded border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">🔲 Grid Tool</h3>
      <div
        className="grid bg-gray-50 p-3 rounded"
        style={{
          gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,
          gap: `${config.gap}px`,
        }}
      >
        {Array.from({ length: config.columns }, (_, colIndex) => (
          <UniversalDropZone
            key={colIndex}
            containerId={id}
            slotIndex={colIndex} // ✅ important: enables DropUtils to know target slot
            label={`Column ${colIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
