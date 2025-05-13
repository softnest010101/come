import { ToolType } from "./tool-type.enum";

// Default style schema
export const defaultStyleSchema: Record<string, boolean | string[]> = {
  margin: true,
  padding: true,
  backgroundColor: true,
  textColor: true,
  fontSize: ['sm', 'base', 'lg', 'xl', '2xl'],
  fontWeight: ['light', 'normal', 'medium', 'bold', 'semibold'],
  textAlign: ['left', 'center', 'right'],
};

// Shared style config
export type ToolStyleConfig = {
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
};

// Shared field types
export type FieldType = 'text' | 'email' | 'number' | 'date' | 'checkbox';
export type Field = { name: string; label: string; type: FieldType; required: boolean };
export type MultiStepFormStep = { title: string; description?: string; fields: Field[] };

// Master Config map
export type ToolConfigMap = {
  [ToolType.Calendar]: { showWeekends: boolean; startHour: number; endHour: number; style?: ToolStyleConfig };
  [ToolType.Form]: { fields: Field[]; validation: boolean; submitEndpoint: string; style?: ToolStyleConfig };
  [ToolType.Chart]: { type: 'bar' | 'line' | 'pie'; data: { name: string; value: number }[]; options?: Record<string, unknown>; style?: ToolStyleConfig };
  [ToolType.ChatBot]: { welcomeMessage: string; model: string; style?: ToolStyleConfig };
  [ToolType.Calculator]: { formula: string; variables: Record<string, number>; style?: ToolStyleConfig };
  [ToolType.Table]: { columns: string[]; rows: (string | number | boolean | null)[][]; pagination: boolean; sortable: boolean; style?: ToolStyleConfig };
  [ToolType.Condition]: { if: string; then: string; else: string; style?: ToolStyleConfig };
  [ToolType.Container]: { slots: number; layout: 'horizontal' | 'vertical'; style?: ToolStyleConfig };
  [ToolType.Grid]: { columns: number; gap: number; style?: ToolStyleConfig };
  [ToolType.Tabs]: { tabs: { id: string; label: string; content: string }[]; style?: ToolStyleConfig };
  [ToolType.Accordion]: { items: { id: string; title: string; content: string }[]; style?: ToolStyleConfig };
  [ToolType.Sidebar]: { width: number; position: 'left' | 'right'; style?: ToolStyleConfig };
  [ToolType.Modal]: { title: string; closable: boolean; backdrop: boolean; style?: ToolStyleConfig };
  [ToolType.MultiStepForm]: { steps: MultiStepFormStep[]; submitEndpoint: string; validation: boolean; showProgress: boolean; style?: ToolStyleConfig };
  [ToolType.FileUpload]: { accept: string[]; maxSizeMB: number; multiple: boolean; style?: ToolStyleConfig };
};

// Base Tool type
export type BaseTool<K extends keyof ToolConfigMap> = {
  id: string;
  type: K;
  config: ToolConfigMap[K];
  groupId?: string;
  children?: GroupedPlacedTool[];
};

// Discriminated Union for all tools
export type GroupedPlacedTool = {
  [K in keyof ToolConfigMap]: BaseTool<K>
}[keyof ToolConfigMap];

export interface ToolDefinition<K extends keyof ToolConfigMap> {
  type: K;
  label: string;
  icon: string;
  /** ✅ დამატებული category */
  category?: string;
  description?: string;
  defaultConfig: ToolConfigMap[K];
  example?: Partial<ToolConfigMap[K]>;
  inspectorSchema: Array<{
    key: keyof ToolConfigMap[K];
    label: string;
    type: 'text' | 'number' | 'checkbox' | 'select' | 'textarea' | 'array';
    options?: string[];
  }>;
  triggerLogic?: { onSubmit?: string };
  styleSchema?: Record<string, boolean | string[]>;
  hasChildren?: boolean;
}

// ✅ Explicit Export for ContainerConfig
export type ContainerConfig = {
  slots: number;
  layout: "horizontal" | "vertical";
  style?: ToolStyleConfig;
};
