'use client';

import { useEffect } from 'react';
import { evaluateCondition, dispatchEvaluation } from '@/lib/logicEngine';

export type ConditionConfig = {
  if: string;
  then: string;
  else: string;
};

type Props = {
  config: ConditionConfig;
};

export default function ConditionTool({ config }: Props) {
  const { if: ifCondition, then, else: elseCondition } = config;

  useEffect(() => {
    const handleSubmit = () => {
      const outcome = evaluateCondition(ifCondition, then, elseCondition);
      dispatchEvaluation('condition-tool', outcome);
    };

    window.addEventListener('trigger-condition', handleSubmit);
    return () => {
      window.removeEventListener('trigger-condition', handleSubmit);
    };
  }, [ifCondition, then, elseCondition]);

  return (
    <div className="rounded border border-yellow-300 bg-yellow-50 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2 flex items-center gap-2">
        🔀 Condition Tool
      </h3>

      <div className="text-sm text-yellow-900 space-y-1">
        <p>
          <strong>If:</strong>{' '}
          <code className="bg-white px-1 py-0.5 rounded">{ifCondition}</code>
        </p>
        <p>
          <strong>Then:</strong>{' '}
          <code className="bg-white px-1 py-0.5 rounded">{then}</code>
        </p>
        <p>
          <strong>Else:</strong>{' '}
          <code className="bg-white px-1 py-0.5 rounded">{elseCondition}</code>
        </p>
      </div>

      <div className="mt-4 italic text-xs text-gray-600">
        This is a static preview. Logic will be evaluated dynamically at runtime.
      </div>
    </div>
  );
}
