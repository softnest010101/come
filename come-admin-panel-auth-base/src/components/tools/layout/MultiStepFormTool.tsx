'use client';

import { useState } from 'react';
import type { ToolConfigMap } from '@/shared/tool-meta/tool-config.types';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import { validateToolConfig } from '@/lib/validateToolConfig';

type Props = {
  config: ToolConfigMap[ToolType.MultiStepForm];
};

export default function MultiStepFormTool({ config }: Props) {
  const isValid = validateToolConfig(ToolType.MultiStepForm, config);
  const [step, setStep] = useState(0);

  if (!isValid || !Array.isArray(config.steps) || config.steps.length === 0) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 shadow-sm text-red-800">
        ⚠️ Invalid configuration for MultiStepFormTool.
      </div>
    );
  }

  const currentStep = config.steps[step];

  return (
    <div className="rounded border border-gray-300 bg-white p-4 shadow-sm w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          🧭 Multi-Step Form
        </h3>
        <button
          className="text-sm text-blue-600 hover:underline"
          disabled
          title="Step editor coming soon"
        >
          🛠 Step Config
        </button>
      </div>

      <div className="mb-4 text-gray-700">
        <p>
          <strong>Step {step + 1}</strong>: {currentStep?.title || 'Untitled Step'}
        </p>
        <p className="text-sm italic text-gray-500">
          {currentStep?.description || 'No description provided.'}
        </p>
      </div>

      {/* 🧩 Render fields */}
      <div className="space-y-3 mb-6">
        {Array.isArray(currentStep.fields) && currentStep.fields.length > 0 ? (
          currentStep.fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                {field.label || `Field ${index + 1}`}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name || `field_${index}`}
                className="border px-2 py-1 rounded text-sm"
                placeholder={`Enter ${field.label || field.name}`}
                disabled
              />
            </div>
          ))
        ) : (
          <p className="text-sm italic text-gray-500">No fields in this step.</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
          disabled={step === 0}
          className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          ⬅ Previous
        </button>
        <button
          onClick={() => setStep((prev) => Math.min(prev + 1, config.steps.length - 1))}
          disabled={step === config.steps.length - 1}
          className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>

      {config.showProgress && (
        <div className="mt-4 text-center text-xs text-gray-500">
          Step {step + 1} of {config.steps.length}
        </div>
      )}
    </div>
  );
}
