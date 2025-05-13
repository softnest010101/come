import { ToolType } from './tool-type.enum';
import type { ToolDefinition } from './tool-config.types';
import { defaultStyleSchema } from './tool-config.types';

// ✅ თითოეული Tool ცალკე კონსტანტად
export const formTool: ToolDefinition<ToolType.Form> = {
  type: ToolType.Form,
  label: 'Form',
  icon: '📄',
  category: 'Form',
  defaultConfig: {
    fields: [],
    validation: true,
    submitEndpoint: '/api/submit',
    style: {},
  },
  inspectorSchema: [
    { key: 'validation', label: 'Enable Validation', type: 'checkbox' },
    { key: 'submitEndpoint', label: 'Submit Endpoint', type: 'text' },
  ],
  styleSchema: defaultStyleSchema,
};

export const chartTool: ToolDefinition<ToolType.Chart> = {
  type: ToolType.Chart,
  label: 'Chart',
  icon: '📊',
  category: 'Data',
  defaultConfig: {
    type: 'bar',
    data: [],
    options: {},
    style: {},
  },
  inspectorSchema: [
    { key: 'type', label: 'Chart Type', type: 'select', options: ['bar', 'line', 'pie'] },
  ],
  styleSchema: defaultStyleSchema,
};

export const gridTool: ToolDefinition<ToolType.Grid> = {
  type: ToolType.Grid,
  label: 'Grid',
  icon: '🔲',
  category: 'Layout',
  defaultConfig: {
    columns: 3,
    gap: 10,
    style: {},
  },
  inspectorSchema: [
    { key: 'columns', label: 'Columns', type: 'number' },
    { key: 'gap', label: 'Gap', type: 'number' },
  ],
  styleSchema: defaultStyleSchema,
  hasChildren: true,
};

export const tabsTool: ToolDefinition<ToolType.Tabs> = {
  type: ToolType.Tabs,
  label: 'Tabs',
  icon: '📑',
  category: 'Layout',
  defaultConfig: {
    tabs: [],
    style: {},
  },
  inspectorSchema: [{ key: 'tabs', label: 'Tabs', type: 'array' }],
  styleSchema: defaultStyleSchema,
  hasChildren: true,
};

export const accordionTool: ToolDefinition<ToolType.Accordion> = {
  type: ToolType.Accordion,
  label: 'Accordion',
  icon: '📂',
  category: 'Layout',
  defaultConfig: {
    items: [],
    style: {},
  },
  inspectorSchema: [{ key: 'items', label: 'Items', type: 'array' }],
  styleSchema: defaultStyleSchema,
  hasChildren: true,
};

export const sidebarTool: ToolDefinition<ToolType.Sidebar> = {
  type: ToolType.Sidebar,
  label: 'Sidebar',
  icon: '📋',
  category: 'Layout',
  defaultConfig: {
    width: 250,
    position: 'left',
    style: {},
  },
  inspectorSchema: [
    { key: 'width', label: 'Width', type: 'number' },
    { key: 'position', label: 'Position', type: 'select', options: ['left', 'right'] },
  ],
  styleSchema: defaultStyleSchema,
  hasChildren: true,
};

export const modalTool: ToolDefinition<ToolType.Modal> = {
  type: ToolType.Modal,
  label: 'Modal',
  icon: '🗔',
  category: 'Layout',
  defaultConfig: {
    title: 'Modal Title',
    closable: true,
    backdrop: true,
    style: {},
  },
  inspectorSchema: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'closable', label: 'Closable', type: 'checkbox' },
    { key: 'backdrop', label: 'Backdrop', type: 'checkbox' },
  ],
  styleSchema: defaultStyleSchema,
  hasChildren: true,
};

// ✅ Registry Map (ბაზაზე ჩამოწერილი, სწორი Import-safe)
export const TOOL_REGISTRY_MAP = {
  [ToolType.Form]: formTool,
  [ToolType.Chart]: chartTool,
  [ToolType.Grid]: gridTool,
  [ToolType.Tabs]: tabsTool,
  [ToolType.Accordion]: accordionTool,
  [ToolType.Sidebar]: sidebarTool,
  [ToolType.Modal]: modalTool,
} as const;

// ✅ Legacy Visual List (აითვისებს მინიმალურ meta-ს, გამოიყენება ToolPicker-ში, ToolRenderer-ში)
export const TOOL_REGISTRY = [
  { type: ToolType.Calendar, label: 'Calendar', icon: '📅', category: 'Layout' },
  { type: ToolType.Form, label: 'Form', icon: '📝', category: 'Form' },
  { type: ToolType.Chart, label: 'Chart', icon: '📊', category: 'Data' },
  { type: ToolType.Table, label: 'Table', icon: '📋', category: 'Data' },
  { type: ToolType.ChatBot, label: 'ChatBot', icon: '🤖', category: 'AI' },
  { type: ToolType.Calculator, label: 'Calculator', icon: '🧮', category: 'Utilities' },
  { type: ToolType.Condition, label: 'Condition', icon: '⚙️', category: 'Logic' },
  { type: ToolType.Grid, label: 'Grid', icon: '🔲', category: 'Layout' },
  { type: ToolType.Tabs, label: 'Tabs', icon: '📑', category: 'Layout' },
  { type: ToolType.Accordion, label: 'Accordion', icon: '📂', category: 'Layout' },
  { type: ToolType.Sidebar, label: 'Sidebar', icon: '📋', category: 'Layout' },
  { type: ToolType.Modal, label: 'Modal', icon: '🗔', category: 'Layout' },
] as const;
