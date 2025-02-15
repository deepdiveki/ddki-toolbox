'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { saveModelId } from '@/app/(chat)/actions';
import { models } from '@/lib/ai/models';
import { CheckCircleFillIcon, ChevronDownIcon } from './icons';
import cx from 'classnames';

export function ModelSelector({
      selectedModelId,
      className,
    }: {
      selectedModelId: string;
      className?: string;
    }) {
      const [open, setOpen] = useState(false);
      const [optimisticModelId, setOptimisticModelId] =
        useOptimistic(selectedModelId);

      const selectedModel = useMemo(
        () => models.find((model) => model.id === optimisticModelId),
        [optimisticModelId]
      );

      const handleSelect = (modelId: string) => {
        setOpen(false);
        startTransition(() => {
          setOptimisticModelId(modelId);
          saveModelId(modelId);
        });
      };

      return (
        <div className="relative inline-block">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={cx(
              'md:px-2 md:h-[34px] w-fit flex items-center justify-between',
              'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
              className
            )}
          >
        {selectedModel?.label}
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-[300px] bg-white dark:bg-gray-800 border border-gray-300 rounded shadow-lg">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => handleSelect(model.id)}
              className={cx(
                'px-4 py-2 cursor-pointer flex justify-between items-center',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                {
                  'bg-gray-200 dark:bg-gray-700': model.id === optimisticModelId,
                }
              )}
            >
              <div className="flex flex-col">
                <span>{model.label}</span>
                {model.description && (
                  <span className="text-xs text-muted-foreground">
                    {model.description}
                  </span>
                )}
              </div>
              {model.id === optimisticModelId && (
                <div className="text-foreground dark:text-foreground">
                  <CheckCircleFillIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
