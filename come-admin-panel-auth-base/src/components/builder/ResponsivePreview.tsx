'use client';

import { useState } from 'react';

const VIEWPORTS = {
  mobile: { width: 'max-w-xs', scale: 'scale-90' },
  tablet: { width: 'max-w-md', scale: 'scale-100' },
  desktop: { width: 'max-w-full', scale: 'scale-100' },
} as const;

type Viewport = keyof typeof VIEWPORTS;

export default function ResponsivePreview({
  children,
  onBreakpointChange,
}: {
  children: React.ReactNode;
  onBreakpointChange?: (bp: Viewport) => void;
}) {
  const [current, setCurrent] = useState<Viewport>('desktop');

  const handleChange = (bp: Viewport) => {
    setCurrent(bp);
    onBreakpointChange?.(bp);
  };

  return (
    <div className="space-y-4">
      {/* 🔘 Breakpoint Selector */}
      <div className="flex gap-2">
        {(Object.keys(VIEWPORTS) as Viewport[]).map((bp) => (
          <button
            key={bp}
            onClick={() => handleChange(bp)}
            className={`px-3 py-1 rounded capitalize ${
              current === bp ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {bp}
          </button>
        ))}
      </div>

      {/* 🖼️ Preview Container */}
      <div className="flex justify-center">
        <div
          className={`transition-all duration-300 transform ${VIEWPORTS[current].scale} origin-top`}
        >
          <div
            className={`border rounded bg-white shadow-md p-4 ${VIEWPORTS[current].width}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
