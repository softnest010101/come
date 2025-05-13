import { ToolType } from "./tool-type.enum";
import {
  CalendarConfig,
  FormConfig,
  ChartConfig,
  ChatBotConfig,
  CalculatorConfig,
  TableConfig,
  ConditionConfig,
} from "./tool-config.types";

export interface ToolDefinition<T = any> {
  type: ToolType;
  label: string;
  icon?: string;
  description?: string;
  defaultConfig: T;
  example?: T;
}

export const TOOL_REGISTRY: ToolDefinition[] = [
  {
    type: ToolType.Calendar,
    label: "Calendar",
    icon: "🗓️",
    description:
      "Displays a calendar with customizable hours and event support.",
    defaultConfig: {
      showWeekends: true,
      startHour: 9,
      endHour: 18,
    } as CalendarConfig,
    example: {
      showWeekends: false,
      startHour: 10,
      endHour: 17,
    },
  },
  {
    type: ToolType.Form,
    label: "Form",
    icon: "📄",
    description:
      "Creates a customizable input form with fields and validation.",
    defaultConfig: {
      fields: [],
      validation: true,
      submitEndpoint: "/api/submit-form",
    } as FormConfig,
    example: {
      fields: [
        { label: "Name", type: "text", required: true },
        { label: "Email", type: "email", required: true },
      ],
    },
  },
  {
    type: ToolType.ChatBot,
    label: "ChatBot",
    icon: "🤖",
    defaultConfig: {
      welcomeMessage: "Hi! How can I help you today?",
      model: "gpt-4",
    },
  },
  {
    type: ToolType.Chart,
    label: "Chart",
    icon: "📊",
    description: "Visualizes data in bar, line, or pie chart format.",
    defaultConfig: {
      type: "bar",
      data: [],
      options: {
        responsive: true,
      },
    } as ChartConfig,
    example: {
      type: "line",
      data: [10, 20, 30],
    },
  },
  {
    type: ToolType.ChatBot,
    label: "Chat Bot",
    icon: "💬",
    description: "AI-powered chatbot with customizable greeting and logic.",
    defaultConfig: {
      welcomeMessage: "Hello! How can I help you?",
      model: "gpt-4",
    } as ChatBotConfig,
    example: {
      welcomeMessage: "Hi there 👋",
    },
  },
  {
    type: ToolType.Calculator,
    label: "Calculator",
    icon: "🧮",
    description: "Performs logic-based calculations using input variables.",
    defaultConfig: {
      formula: "",
      variables: {},
    } as CalculatorConfig,
    example: {
      formula: "(a + b) * c",
      variables: { a: 2, b: 3, c: 4 },
    },
  },
  {
    type: ToolType.Table,
    label: "Table",
    icon: "🗃️",
    description:
      "Displays data in a tabular format with pagination and sorting.",
    defaultConfig: {
      columns: [],
      rows: [],
      pagination: true,
      sortable: true,
    } as TableConfig,
    example: {
      columns: ["Name", "Age"],
      rows: [
        ["Alice", 30],
        ["Bob", 25],
      ],
    },
  },
  {
    type: ToolType.Condition,
    label: "Condition Block",
    icon: "🔀",
    description: "Triggers conditional logic (if/then/else) for automation.",
    defaultConfig: {
      if: "",
      then: "",
      else: "",
    } as ConditionConfig,
    example: {
      if: "user.age > 18",
      then: "showContent = true",
      else: "redirect = /underage",
    },
  },
];
