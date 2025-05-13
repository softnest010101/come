'use client';

import { useState } from 'react';
import type { MultiStepFormStep } from '@/shared/tool-meta/tool-config.types';

type StepConfigModalProps = {
  initialSteps: MultiStepFormStep[];
  onClose: () => void;
  onSave: (steps: MultiStepFormStep[]) => void;
};

export default function StepConfigModal({
  initialSteps,
  onClose,
  onSave,
}: StepConfigModalProps) {
  const [steps, setSteps] = useState<MultiStepFormStep[]>(initialSteps);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange = (index: number, key: keyof MultiStepFormStep, value: string) => {
    setSteps((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleAddStep = () => {
    setSteps((prev) => [...prev, { title: '', description: '', fields: [] }]);
  };

  const handleDeleteStep = (index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const invalid = steps.find((s) => !s.title.trim());
    if (invalid) {
      setError('All steps must have a title.');
      return;
    }

    onSave(steps);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">🧭 Configure Steps</h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 px-4 py-2 rounded">{error}</div>
        )}

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="border p-4 rounded bg-gray-50 space-y-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Step Title"
                  value={step.title}
                  onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
                  className="border px-2 py-1 rounded w-1/2"
                />
                <input
                  type="text"
                  placeholder="Step Description"
                  value={step.description}
                  onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
                  className="border px-2 py-1 rounded w-1/2"
                />
                <button
                  onClick={() => handleDeleteStep(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  🗑 Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleAddStep}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ➕ Add Step
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
