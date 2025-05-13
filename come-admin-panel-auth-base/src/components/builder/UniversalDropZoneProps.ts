import { ToolType } from '@/shared/tool-meta/tool-type.enum';

export type UniversalDropZoneProps = {
  containerId: string;
  label: string;
  tabId?: string;
  itemId?: string;
  sidebarId?: string;
  slotIndex?: number;
};

export type ToolDragItem = {
  toolType: ToolType;
};
