"use client";

export type CalculatorConfig = {
  formula: string;
  variables: Record<string, number>;
};

type Props = {
  config: CalculatorConfig;
};

export default function CalculatorTool({ config }: Props) {
  const { formula, variables } = config;

  return (
    <div className="rounded border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
        🧮 Calculator Tool
      </h3>

      <p className="text-sm text-yellow-900 mb-2">
        <strong>Formula:</strong> {formula}
      </p>

      <div className="text-sm text-yellow-900 space-y-1">
        <strong>Variables:</strong>
        <ul className="ml-4 list-disc">
          {Object.entries(variables).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
