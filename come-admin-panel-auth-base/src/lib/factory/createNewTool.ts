import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import type { GroupedPlacedTool } from '@/shared/tool-meta/tool-config.types';
import { getDefaultConfigForToolType } from '@/lib/getDefaultConfigForToolType';

export function createNewTool(toolType: ToolType): GroupedPlacedTool {
  return {
    id: Date.now().toString(),
    type: toolType,
    config: getDefaultConfigForToolType(toolType),
  } as GroupedPlacedTool;
}
