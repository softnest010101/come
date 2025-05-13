'use client';

import { TOOL_REGISTRY } from '@/shared/tool-meta/tool.registry';
import type { GroupedPlacedTool, ToolConfigMap } from '@/shared/tool-meta/tool-config.types';
import { UniversalDropZone } from './UniversalDropZone';

export default function ToolRenderer({ tool }: { tool: GroupedPlacedTool }) {
  // 🧼 UseBuilderStore აღარ გვჭირდება აქედან ლოგიკა გამოტანილი გაქვს UniversalDropZone-ში და DropUtils-ში
  const toolDefinition = TOOL_REGISTRY.find((t) => t.type === tool.type);

  if (!toolDefinition || !('component' in toolDefinition)) {
    return <div>Unknown or unregistered tool: {tool.type}</div>;
  }

  const ToolComponent = toolDefinition.component as React.ComponentType<{
    config: ToolConfigMap[typeof tool.type];
    children?: React.ReactNode;
  }>;

  const isLayoutTool = 'hasChildren' in toolDefinition && toolDefinition.hasChildren;
  const hasChildren = isLayoutTool && Array.isArray(tool.children) && tool.children.length > 0;

  return (
    <ToolComponent config={tool.config as ToolConfigMap[typeof tool.type]}>
      {isLayoutTool && (
        <UniversalDropZone
          containerId={tool.id}
          label={`Drop inside ${toolDefinition.label}`}
        />
      )}
      {hasChildren &&
        tool.children!.map((child) => <ToolRenderer key={child.id} tool={child} />)}
    </ToolComponent>
  );
}
