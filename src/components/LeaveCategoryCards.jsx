import React from 'react';
import { MiniCircularGauge } from './CircularGauge';

export const LeaveCategoryCards = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
      {categories.map((cat) => {
        return (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-neutral-200/90 p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] hover:shadow-[0_4px_12px_rgba(16,24,40,0.06)] hover:border-neutral-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-bold text-neutral-900 truncate">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-500 font-medium mt-0.5 truncate">
                  {cat.remaining} days left
                </p>
              </div>
              <MiniCircularGauge
                value={cat.used}
                total={cat.total}
                color={cat.color}
                size={44}
                strokeWidth={5}
              />
            </div>

            <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500 font-medium">
              <span>Used: <strong className="text-neutral-700 font-semibold">{cat.used}d</strong></span>
              <span>Total: <strong className="text-neutral-700 font-semibold">{cat.total}d</strong></span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
