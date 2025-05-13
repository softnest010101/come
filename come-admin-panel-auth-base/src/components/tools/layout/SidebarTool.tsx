'use client';

import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import { validateToolConfig } from "@/lib/validateToolConfig";
import { UniversalDropZone } from "@/components/builder/UniversalDropZone";

type Props = {
  config: ToolConfigMap[ToolType.Sidebar];
  id: string;
};

export default function SidebarTool({ config, id }: Props) {
  const isValid = validateToolConfig(ToolType.Sidebar, config);

  if (!isValid) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for SidebarTool.
      </div>
    );
  }

  const { width, position } = config;
  const isLeft = position === "left";

  return (
    <div className="relative w-full min-h-[200px] border rounded bg-gray-50 overflow-hidden shadow-sm">
      {/* ✅ DropZone გარეთ, შიგნით UI */}
      <UniversalDropZone
        containerId={id}
        sidebarId={id}
        label={`Sidebar (${position}, ${width}px)`}
      />

      <div
        className="absolute top-0 h-full bg-white border-r shadow-md p-4"
        style={{
          width: `${width}px`,
          left: isLeft ? 0 : "auto",
          right: isLeft ? "auto" : 0,
        }}
      >
        <h3 className="text-md font-bold mb-2">
          📚 Sidebar ({position}, {width}px)
        </h3>
        <p className="text-sm text-gray-600">Sidebar content goes here.</p>
      </div>

      <div className="pl-[260px] pr-[260px] py-8 text-center text-gray-400 italic">
        Main content area (behind sidebar)
      </div>
    </div>
  );
}
