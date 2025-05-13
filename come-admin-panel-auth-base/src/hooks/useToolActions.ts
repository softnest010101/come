'use client';

import { useEffect } from 'react';
import { useBuilderStore } from '@/store/useBuilderStore';
import { evaluateCondition, dispatchEvaluation } from '@/lib/logicEngine';
import { ToolType } from '@/shared/tool-meta/tool-type.enum';
import type { GroupedPlacedTool } from '@/shared/tool-meta/tool-config.types';

/**
 * ⛳ ჰუკი რომელიც იწერს trigger-ებს და ააქტიურებს შესაბამის condition tool-ებს
 */
export function useToolActions() {
  const tools = useBuilderStore((state) => state.tools);

  useEffect(() => {
    const handleSubmit = (): void => {
      const conditionTools = tools.filter((tool): tool is GroupedPlacedTool => tool.type === ToolType.Condition);

      conditionTools.forEach((tool) => {
        try {
          const { if: ifExpr, then, else: elseExpr } = tool.config as {
            if: string;
            then: string;
            else: string;
          };

          const result = evaluateCondition(ifExpr, then, elseExpr);
          dispatchEvaluation(tool.id, result);
        } catch (err) {
          console.error(`❌ Condition evaluation failed for tool ${tool.id}`, err);
        }
      });
    };

    window.addEventListener('trigger-submit', handleSubmit);

    return () => {
      window.removeEventListener('trigger-submit', handleSubmit);
    };
  }, [tools]);
}
