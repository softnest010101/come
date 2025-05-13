import { create } from 'zustand';
import type { GroupedPlacedTool } from '@/shared/tool-meta/tool-config.types';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';

export type BuilderStore = {
  tools: GroupedPlacedTool[];
  selectedTool: string | null;
  setTools: (tools: GroupedPlacedTool[]) => void;
  setSelectedTool: (toolId: string) => void;
  reorderTools: (fromId: string, toId: string) => void;
  addTool: (type: ToolType) => void;
  createGroup: (toolIds: string[]) => void;
  cloneTool: (toolId: string) => void;
  deleteTool: (toolId: string) => void;
  updateToolConfig: (toolId: string, fieldKey: string, items: unknown) => void; // ✅ safer unknown
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  tools: [],
  selectedTool: null,

  setTools: (tools) => set({ tools }),

  setSelectedTool: (toolId) => set({ selectedTool: toolId }),

  reorderTools: (fromId, toId) => {
    const state = get();
    const fromIndex = state.tools.findIndex((tool) => tool.id === fromId);
    const toIndex = state.tools.findIndex((tool) => tool.id === toId);
    if (fromIndex === -1 || toIndex === -1) return;
    const updated = [...state.tools];
    const [movedTool] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedTool);
    set({ tools: updated });
  },

  addTool: (type) => {
    const newTool: GroupedPlacedTool = {
      id: Date.now().toString(),
      type,
      config: type === ToolType.Calendar
        ? { showWeekends: true, startHour: 9, endHour: 17 }
        : {},
    } as GroupedPlacedTool;
    set((state) => ({ tools: [...state.tools, newTool] }));
  },

  createGroup: (toolIds) => {
    const state = get();
    const groupTool: GroupedPlacedTool = {
      id: Date.now().toString(),
      type: ToolType.Container,
      config: { slots: toolIds.length, layout: 'vertical' },
      children: state.tools.filter((tool) => toolIds.includes(tool.id)),
    } as GroupedPlacedTool;
    const remainingTools = state.tools.filter((tool) => !toolIds.includes(tool.id));
    set({ tools: [...remainingTools, groupTool] });
  },

  cloneTool: (toolId) => {
    const state = get();
    const toolToClone = state.tools.find((tool) => tool.id === toolId);
    if (toolToClone) {
      const clonedTool: GroupedPlacedTool = {
        ...structuredClone(toolToClone),
        id: Date.now().toString(),
      };
      set({ tools: [...state.tools, clonedTool] });
    }
  },

  deleteTool: (toolId) => {
    const state = get();
    set({ tools: state.tools.filter((tool) => tool.id !== toolId) });
  },

  updateToolConfig: (toolId, fieldKey, items) => {
    set((state) => ({
      tools: state.tools.map((tool) => {
        if (tool.id === toolId) {
          return {
            ...tool,
            config: {
              ...(tool.config as Record<string, unknown>),
              [fieldKey]: items,
            },
          } as GroupedPlacedTool;
        }
        return tool;
      }),
    }));
  },
}));
