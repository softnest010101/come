import type { GroupedPlacedTool, ToolConfigMap } from '@/shared/tool-meta/tool-config.types';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';

/** Helper: Ensure children exists safely */
function ensureChildren<T extends object>(target: T): T & { children: GroupedPlacedTool[] } {
  if (!('children' in target) || !Array.isArray((target as Partial<{ children: GroupedPlacedTool[] }>).children)) {
    (target as T & { children: GroupedPlacedTool[] }).children = [];
  }
  return target as T & { children: GroupedPlacedTool[] };
}

export class DropUtils {
  /** Generic container or grid slot */
  static addToolToContainer(tools: GroupedPlacedTool[], containerId: string, toolToAdd: GroupedPlacedTool, slotIndex?: number) {
    const target = tools.find((t) => t.id === containerId);
    if (!target) return;
    const safeTarget = ensureChildren(target);
    if (slotIndex !== undefined) {
      (toolToAdd as GroupedPlacedTool & { slot?: number }).slot = slotIndex;
    }
    safeTarget.children.push(toolToAdd);
  }

  /** Add to specific tab inside TabsTool */
  static addToolToTab(tools: GroupedPlacedTool[], tabsToolId: string, tabId: string, toolToAdd: GroupedPlacedTool) {
    const target = tools.find((t) => t.id === tabsToolId && t.type === ToolType.Tabs);
    if (!target) return;
    const config = target.config as ToolConfigMap[ToolType.Tabs];
    const targetTab = config.tabs.find((tab) => tab.id === tabId);
    if (!targetTab) return;
    const safeTab = ensureChildren(targetTab);
    safeTab.children.push(toolToAdd);
  }

  /** Add to specific item inside AccordionTool */
  static addToolToAccordionItem(tools: GroupedPlacedTool[], accordionToolId: string, itemId: string, toolToAdd: GroupedPlacedTool) {
    const target = tools.find((t) => t.id === accordionToolId && t.type === ToolType.Accordion);
    if (!target) return;
    const config = target.config as ToolConfigMap[ToolType.Accordion];
    const targetItem = config.items.find((item) => item.id === itemId);
    if (!targetItem) return;
    const safeItem = ensureChildren(targetItem);
    safeItem.children.push(toolToAdd);
  }

  /** Add to SidebarTool directly */
  static addToolToSidebar(tools: GroupedPlacedTool[], sidebarId: string, toolToAdd: GroupedPlacedTool) {
    const target = tools.find((t) => t.id === sidebarId && t.type === ToolType.Sidebar);
    if (!target) return;
    const safeTarget = ensureChildren(target);
    safeTarget.children.push(toolToAdd);
  }
}
