// ✅ src/lib/logicEngine.ts

/**
 * Securely evaluates a basic if-then-else condition using a scoped function.
 */
export function evaluateCondition(
  condition: string,
  thenValue: string,
  elseValue: string
): string {
  try {
    if (!isSafeExpression(condition)) {
      throw new Error("Unsafe condition expression detected.");
    }

    const fn = new Function(`return (${condition});`);
    const result = fn();
    return result ? thenValue : elseValue;
  } catch (err) {
    console.error("❌ Failed to evaluate condition:", err);
    return elseValue;
  }
}

/**
 * Dispatches a custom event with evaluation result.
 */
export function dispatchEvaluation(toolId: string, result: string): void {
  window.dispatchEvent(
    new CustomEvent("condition-evaluated", {
      detail: { result, toolId },
    })
  );
}

/**
 * Safely evaluates a condition and dispatches the result.
 */
export function evaluateAndTrigger(
  toolId: string,
  condition: string,
  thenValue: string,
  elseValue: string
): void {
  const result = evaluateCondition(condition, thenValue, elseValue);
  dispatchEvaluation(toolId, result);
}

/**
 * Listens for condition evaluation results.
 */
export function registerEvaluationListener(
  callback: (toolId: string, result: string) => void
): () => void {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<{ toolId: string; result: string }>;
    callback(customEvent.detail.toolId, customEvent.detail.result);
  };

  window.addEventListener("condition-evaluated", handler);

  // Return unsubscribe function
  return () => window.removeEventListener("condition-evaluated", handler);
}

/**
 * Very basic expression sanitizer to prevent dangerous input.
 */
function isSafeExpression(expr: string): boolean {
  const forbidden = ["window", "document", "eval", "Function", "import", "require", "globalThis"];
  return !forbidden.some((keyword) => expr.includes(keyword));
}
