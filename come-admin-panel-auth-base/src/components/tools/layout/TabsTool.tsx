'use client';

import { useState } from "react";
import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import { validateToolConfig } from "@/lib/validateToolConfig";
import { UniversalDropZone } from "@/components/builder/UniversalDropZone";

type Props = {
  config: ToolConfigMap[ToolType.Tabs];
  id: string;
};

export default function TabsTool({ config, id }: Props) {
  const isValid = validateToolConfig(ToolType.Tabs, config);
  const [activeTab, setActiveTab] = useState(0);

  if (!isValid || !Array.isArray(config.tabs) || config.tabs.length === 0) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for TabsTool.
      </div>
    );
  }

  return (
    <div className="rounded border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        🗂️ TabsTool
      </h3>

      {/* Tab headers */}
      <div className="flex border-b mb-4 overflow-x-auto">
        {config.tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 whitespace-nowrap border-b-2 text-sm font-medium transition ${
              activeTab === index
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label || `Tab ${index + 1}`}
          </button>
        ))}
      </div>

      {/* UniversalDropZone with tabId */}
      <UniversalDropZone
        containerId={id}
        tabId={config.tabs[activeTab].id} // ✅ critical for DropUtils.addToolToTab usage
        label={`Tab: ${config.tabs[activeTab].label}`}
      />
    </div>
  );
}
