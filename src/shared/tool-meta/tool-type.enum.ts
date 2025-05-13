/**
 * Supported tool types used across the system.
 * Used for rendering, validation, configuration, and enum-safe comparisons.
 */
export enum ToolType {
  Calendar = "calendar",
  Form = "form",
  Chart = "chart",
  ChatBot = "chatbot", // ✅ standardized: lowercase + consistent
  Calculator = "calculator",
  Table = "table",
  Condition = "condition",
}
