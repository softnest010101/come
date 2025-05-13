import type { ToolStyleConfig } from "@/shared/tool-meta/tool-config.types";

/**
 * 🧩 Convert style config into a Tailwind-compatible class string
 */
export function generateStyleClass(style?: ToolStyleConfig): string {
  if (!style) return "";

  const {
    margin,
    padding,
    backgroundColor,
    textColor,
    fontSize,
    fontWeight,
    textAlign,
  } = style;

  return [
    margin ? `m-${margin}` : "",
    padding ? `p-${padding}` : "",
    backgroundColor ? `bg-[${backgroundColor}]` : "",
    textColor ? `text-[${textColor}]` : "",
    fontSize ? `text-${fontSize}` : "",
    fontWeight ? `font-${fontWeight}` : "",
    textAlign ? `text-${textAlign}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
