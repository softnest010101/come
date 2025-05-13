'use client';

import type { ContainerConfig } from '@/shared/tool-meta/tool-config.types';
import { useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import React, { useRef } from 'react';

type Props = {
  config: ContainerConfig;
};

export default function ContainerTool({ config }: Props) {
  const { slots, layout } = config;
  const slotsArray = Array.from({ length: slots }, (_, i) => i);

  return (
    <div className="border p-4 bg-gray-50 rounded shadow-sm">
      <p className="text-gray-700 font-medium flex items-center gap-2 mb-2">
        🧱 Container Tool
      </p>
      <p className="text-sm text-gray-600 mb-4">
        Slots: <strong>{slots}</strong>, Layout: <strong>{layout}</strong>
      </p>

      <div
        className={cn(
          'flex gap-4',
          layout === 'horizontal' ? 'flex-row' : 'flex-col'
        )}
      >
        {slotsArray.map((slotIndex) => (
          <ContainerSlotDropZone key={slotIndex} slotIndex={slotIndex}>
            {/* Slot content will be dynamically inserted later */}
          </ContainerSlotDropZone>
        ))}
      </div>
    </div>
  );
}

function ContainerSlotDropZone({
  children,
  slotIndex,
}: {
  children?: React.ReactNode;
  slotIndex: number;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: 'tool',
    drop: (item) => {
      console.log(`Dropped tool in Container Slot ${slotIndex + 1}`, item);
      // ➡️ აქ დაამატე future logic შენს builderStore-ში slotIndex-ის მიხედვით
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
        'flex-1 min-h-[150px] border border-dashed rounded p-2 transition-colors',
        isOver ? 'bg-green-100 border-green-400' : 'bg-white border-gray-300'
      )}
    >
      <div className="text-xs text-gray-400 mb-2 text-center">
        Drop here (Slot {slotIndex + 1})
      </div>
      {children}
    </div>
  );
}
