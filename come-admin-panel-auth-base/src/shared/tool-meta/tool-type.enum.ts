/**
 * Supported tool types used across the system.
 * Used for rendering, validation, configuration, and enum-safe comparisons.
 */
export enum ToolType {
  // 📅 Basic Tools
  Calendar = "calendar",
  Form = "form",
  Chart = "chart",
  ChatBot = "chatbot",
  Calculator = "calculator",
  Table = "table",
  Condition = "condition",
  Container = "container",

  // 🧱 Layout Tools
  Grid = "grid",
  Tabs = "tabs",
  Accordion = "accordion",
  Sidebar = "sidebar",
  Modal = "modal",

  // 🧰 Advanced Tools
  MultiStepForm = "multiStepForm",
  FileUpload = "fileUpload",
}

