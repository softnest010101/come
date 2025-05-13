'use client';

import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import { useBuilderStore } from '@/store/useBuilderStore';
import type { GroupedPlacedTool } from '@/shared/tool-meta/tool-config.types';

/**
 * Handles tool drop from drag source
 */
export function handleDropEvent(e: React.DragEvent<HTMLDivElement>) {
  const addTool = useBuilderStore.getState().addTool;
  e.preventDefault();
  const data = e.dataTransfer.getData('application/json');
  try {
    const parsed = JSON.parse(data);
    if (parsed?.fromPicker && parsed?.toolType) {
      addTool(parsed.toolType as ToolType);
    }
  } catch (err) {
    console.error('❌ Failed to parse dropped data:', err);
  }
}

/**
 * Export tools as JSON string
 */
export function exportToolsToJson(): string {
  const tools = useBuilderStore.getState().tools;
  return JSON.stringify(tools, null, 2);
}

/**
 * Type guard to validate GroupedPlacedTool[]
 */
function isValidToolArray(data: unknown): data is GroupedPlacedTool[] {
  return (
    Array.isArray(data) &&
    data.every(
      (t) =>
        typeof t === 'object' &&
        t !== null &&
        'id' in t &&
        typeof t.id === 'string' &&
        'type' in t &&
        typeof t.type === 'string'
    )
  );
}

/**
 * Import tools from JSON string
 */
export function importToolsFromJson(json: string): void {
  try {
    const parsed = JSON.parse(json);
    if (isValidToolArray(parsed)) {
      useBuilderStore.getState().setTools(parsed);
    } else {
      console.error('❌ Invalid JSON format');
    }
  } catch (err) {
    console.error('❌ Failed to import tools from JSON:', err);
  }
}

/**
 * Clear all tools
 */
export function resetCanvasState(): void {
  useBuilderStore.getState().setTools([]);
  localStorage.removeItem('canvas-tools');
}
