import { ToolType } from "@/shared/tool-meta/tool-type.enum";
import type { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";

/**
 * Validate a tool config based on its ToolType.
 */
export function validateToolConfig(
  type: ToolType,
  config: unknown
): boolean {
  if (typeof config !== "object" || config === null) return false;

  switch (type) {
    case ToolType.Form: {
      const cfg = config as ToolConfigMap[ToolType.Form];
      return (
        Array.isArray(cfg.fields) &&
        typeof cfg.submitEndpoint === "string"
      );
    }

    case ToolType.Chart: {
      const cfg = config as ToolConfigMap[ToolType.Chart];
      return (
        Array.isArray(cfg.data) &&
        typeof cfg.type === "string"
      );
    }

    case ToolType.Table: {
      const cfg = config as ToolConfigMap[ToolType.Table];
      return (
        Array.isArray(cfg.columns) &&
        Array.isArray(cfg.rows)
      );
    }

    case ToolType.Calendar: {
      const cfg = config as ToolConfigMap[ToolType.Calendar];
      return (
        typeof cfg.startHour === "number" &&
        typeof cfg.endHour === "number"
      );
    }

    case ToolType.Calculator: {
      const cfg = config as ToolConfigMap[ToolType.Calculator];
      return typeof cfg.formula === "string";
    }

    case ToolType.ChatBot: {
      const cfg = config as ToolConfigMap[ToolType.ChatBot];
      return typeof cfg.welcomeMessage === "string";
    }

    case ToolType.Condition: {
      const cfg = config as ToolConfigMap[ToolType.Condition];
      return (
        typeof cfg.if === "string" &&
        typeof cfg.then === "string"
      );
    }

    case ToolType.Container: {
      const cfg = config as ToolConfigMap[ToolType.Container];
      return (
        typeof cfg.slots === "number" &&
        (cfg.layout === "horizontal" || cfg.layout === "vertical")
      );
    }

    default:
      return false;
  }
}
