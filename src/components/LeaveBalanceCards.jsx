import React from 'react';
import { Clock } from 'lucide-react';
import { SemiCircleArcGauge } from './CircularGauge';
import { BentoCard } from './BentoCard';

export const LeaveBalanceCards = ({
  balances,
  onSeeAll,
}) => {
  return (
    <BentoCard
      icon={Clock}
      title="Time Off"
      actionText="See All"
      onAction={onSeeAll}
      delay={0.05}
    >
      {/* Semi-circular arc gauge matching reference R01 */}
      <div className="py-1 flex justify-center">
        <SemiCircleArcGauge
          value={balances.totalUsed}
          total={balances.totalAllocated}
          label="OUT OF"
          size={210}
          strokeWidth={14}
        />
      </div>

      {/* Mini recent history list below gauge */}
      <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2">
        {balances.miniHistory.map((item) => {
          const isPending = item.status.toLowerCase() === 'pending';
          const isConfirmed = item.status.toLowerCase() === 'confirmed' || item.status.toLowerCase() === 'approved';

          return (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs py-1.5 px-2 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    isPending
                      ? 'bg-amber-400 ring-2 ring-amber-100'
                      : isConfirmed
                      ? 'bg-emerald-500 ring-2 ring-emerald-100'
                      : 'bg-rose-500 ring-2 ring-rose-100'
                  }`}
                />
                <span className="font-semibold text-neutral-800 truncate">
                  {item.date}{' '}
                  <span className="font-normal text-neutral-500">
                    ({item.type})
                  </span>
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${
                  isPending
                    ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                    : isConfirmed
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                    : 'bg-rose-50 text-rose-700 border-rose-200/80'
                }`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
};
