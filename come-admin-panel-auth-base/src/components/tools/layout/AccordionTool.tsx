'use client';

import { useState } from "react";
import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import { validateToolConfig } from "@/lib/validateToolConfig";
import { UniversalDropZone } from "@/components/builder/UniversalDropZone";

type Props = {
  config: ToolConfigMap[ToolType.Accordion];
  id: string;
};

export default function AccordionTool({ config, id }: Props) {
  const isValid = validateToolConfig(ToolType.Accordion, config);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isValid || !Array.isArray(config.items) || config.items.length === 0) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for AccordionTool.
      </div>
    );
  }

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="rounded border border-gray-300 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        📂 AccordionTool
      </h3>

      <div className="divide-y">
        {config.items.map((item, index) => (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full text-left py-2 font-medium text-gray-800 hover:text-blue-600 flex justify-between items-center"
            >
              <span>{item.title || `Item ${index + 1}`}</span>
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <UniversalDropZone
                containerId={id}
                itemId={item.id} // ✅ მიუთითებს კონკრეტულ itemId-ს DropUtils-ისთვის
                label={`Accordion Item: ${item.title}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
