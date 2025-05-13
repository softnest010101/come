'use client';

import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import { validateToolConfig } from "@/lib/validateToolConfig";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

type Props = {
  config: ToolConfigMap[ToolType.Modal];
};

export default function ModalTool({ config }: Props) {
  const isValid = validateToolConfig(ToolType.Modal, config);

  if (!isValid) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for ModalTool.
      </div>
    );
  }

  const { title, closable, backdrop } = config;

  return (
    <div className="relative z-10">
      {backdrop && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      )}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <ModalDropZone title={title}>
          <div className="bg-white rounded shadow-lg w-full max-w-md p-6 relative z-20 border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex gap-2 items-center">
                🪟 {title}
              </h3>
              {closable && (
                <button
                  className="text-gray-500 hover:text-red-500 transition"
                  disabled
                  title="Close disabled in preview"
                >
                  ✖
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600 italic">
              This is a simulated modal preview (static).
            </p>
          </div>
        </ModalDropZone>
      </div>
    </div>
  );
}

function ModalDropZone({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: "tool",
    drop: (item) => {
      console.log(`Dropped tool inside Modal (${title})`, item);
      // ➡️ აქ დაამატე future logic შენს builderStore-ში Modal context-ის მიხედვით
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const divRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={(node) => {
        drop(node);
        divRef.current = node;
      }}
      className={cn(
        "relative rounded border border-dashed transition-colors",
        isOver ? "bg-green-100 border-green-400" : "border-transparent"
      )}
    >
      <div className="text-xs text-gray-400 mb-2 text-center">
        Drop here inside Modal ({title})
      </div>
      {children}
    </div>
  );
}
