import { ToolConfigMap } from "@/shared/tool-meta/tool-config.types";

// ✅ PlacedTool ტიპი — თითოეული Tool-ის გამოძახება Canvas-ზე Type-safe
export type PlacedTool = {
  [K in keyof ToolConfigMap]: {
    id: string;
    type: K;
    config: ToolConfigMap[K];
    groupId?: string;
  };
}[keyof ToolConfigMap];
