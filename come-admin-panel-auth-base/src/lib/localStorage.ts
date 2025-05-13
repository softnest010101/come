import { GroupedPlacedTool, ToolConfigMap } from "@/shared/tool-meta/tool-config.types";
import { ToolType } from "@/shared/tool-meta/tool-type.enum";

const STORAGE_KEY = "canvas-tools";

/**
 * 💾 Save canvas tools to localStorage
 */
export const saveToLocalStorage = (tools: GroupedPlacedTool[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tools));
  } catch (err) {
    console.error("❌ Failed to save tools to localStorage:", err);
  }
};

/**
 * 📂 Load and validate canvas tools from localStorage
 */
export const loadFromLocalStorage = (): GroupedPlacedTool[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    const sanitized: GroupedPlacedTool[] = [];

    for (const tool of parsed) {
      if (
        typeof tool.id === "string" &&
        typeof tool.type === "string" &&
        typeof tool.config === "object" &&
        tool.config !== null
      ) {
        const groupId = typeof tool.groupId === "string" ? tool.groupId : undefined;

        switch (tool.type) {
          case ToolType.Calendar:
            sanitized.push({
              id: tool.id,
              type: ToolType.Calendar,
              config: tool.config as ToolConfigMap[ToolType.Calendar],
              groupId,
            });
            break;
          case ToolType.Form:
            sanitized.push({
              id: tool.id,
              type: ToolType.Form,
              config: tool.config as ToolConfigMap[ToolType.Form],
              groupId,
            });
            break;
          case ToolType.Chart:
            sanitized.push({
              id: tool.id,
              type: ToolType.Chart,
              config: tool.config as ToolConfigMap[ToolType.Chart],
              groupId,
            });
            break;
          case ToolType.ChatBot:
            sanitized.push({
              id: tool.id,
              type: ToolType.ChatBot,
              config: tool.config as ToolConfigMap[ToolType.ChatBot],
              groupId,
            });
            break;
          case ToolType.Calculator:
            sanitized.push({
              id: tool.id,
              type: ToolType.Calculator,
              config: tool.config as ToolConfigMap[ToolType.Calculator],
              groupId,
            });
            break;
          case ToolType.Table:
            sanitized.push({
              id: tool.id,
              type: ToolType.Table,
              config: tool.config as ToolConfigMap[ToolType.Table],
              groupId,
            });
            break;
          case ToolType.Condition:
            sanitized.push({
              id: tool.id,
              type: ToolType.Condition,
              config: tool.config as ToolConfigMap[ToolType.Condition],
              groupId,
            });
            break;
          case ToolType.Container:
            sanitized.push({
              id: tool.id,
              type: ToolType.Container,
              config: tool.config as ToolConfigMap[ToolType.Container],
              groupId,
            });
            break;
          default:
            console.warn("⛔ Unknown tool type", tool.type);
        }
      }
    }

    return sanitized;
  } catch (err) {
    console.error("❌ Failed to load tools from localStorage:", err);
    return [];
  }
};
