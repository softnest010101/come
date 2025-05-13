import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import type { ToolConfigMap } from '@/shared/tool-meta/tool-config.types';

export function getDefaultConfigForToolType<T extends ToolType>(toolType: T): ToolConfigMap[T] {
  switch (toolType) {
    case ToolType.Grid:
      return { columns: 3, gap: 16 } as ToolConfigMap[T];
    case ToolType.Tabs:
      return { tabs: [{ id: 'tab-1', label: 'Tab 1', content: '' }] } as ToolConfigMap[T];
    case ToolType.Accordion:
      return { items: [{ id: 'item-1', title: 'Item 1', content: '' }] } as ToolConfigMap[T];
    case ToolType.Sidebar:
      return { width: 250, position: 'left' } as ToolConfigMap[T];
    default:
      throw new Error(`Unsupported tool type: ${toolType}`);
  }
}
