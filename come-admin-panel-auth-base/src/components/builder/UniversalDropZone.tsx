'use client';

import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useBuilderStore } from '@/store/useBuilderStore';
import { DropUtils } from '@/store/DropUtils';
import type { UniversalDropZoneProps, ToolDragItem } from './UniversalDropZoneProps';
import { createNewTool } from '@/lib/factory/createNewTool';

export function UniversalDropZone({
  containerId,
  tabId,
  label,
  itemId,
  sidebarId,
  slotIndex,
}: UniversalDropZoneProps) {
  const tools = useBuilderStore((state) => state.tools);
  const setTools = useBuilderStore((state) => state.setTools);

  const [{ isOver }, dropRef] = useDrop<ToolDragItem, void, { isOver: boolean }>({
    accept: 'TOOL',
    drop: (item) => {
      const newTool = createNewTool(item.toolType);

      if (tabId) {
        DropUtils.addToolToTab(tools, containerId, tabId, newTool);
      } else if (itemId) {
        DropUtils.addToolToAccordionItem(tools, containerId, itemId, newTool);
      } else if (sidebarId) {
        DropUtils.addToolToSidebar(tools, containerId, newTool);
      } else if (slotIndex !== undefined) {
        DropUtils.addToolToContainer(tools, containerId, newTool, slotIndex);
      } else {
        DropUtils.addToolToContainer(tools, containerId, newTool);
      }

      setTools([...tools]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const setDropRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        dropRef(node);
      }
    },
    [dropRef]
  );

  return (
    <div
      ref={setDropRef}
      className={`min-h-[100px] border-2 border-dashed rounded ${
        isOver ? 'border-green-400 bg-green-50' : 'border-gray-300'
      }`}
    >
      <div className="text-sm text-gray-500 text-center py-2">{label}</div>
    </div>
  );
}
