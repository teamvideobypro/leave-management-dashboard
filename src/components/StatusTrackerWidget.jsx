import React from 'react';
import { Laptop } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { statusTrackerData } from '../data/mockData';

export const StatusTrackerWidget = ({ onSeeAll }) => {
  return (
    <BentoCard
      icon={Laptop}
      title="Status Tracker"
      actionText="See All"
      onAction={onSeeAll}
      delay={0.12}
    >
      <div className="space-y-3.5">
        {/* Absent section matching reference */}
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            Absent
          </span>
          <div className="space-y-1.5">
            {statusTrackerData.absent.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-neutral-400 border border-white rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-neutral-900 truncate">
                        {item.name}
                      </span>
                      {item.emoji && <span className="text-xs shrink-0">{item.emoji}</span>}
                    </div>
                    <span className="text-[11px] text-neutral-500 block truncate">
                      Replaced by{' '}
                      <span className="underline decoration-neutral-300">
                        {item.replacement}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-neutral-900 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>{item.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Away section matching reference */}
        <div className="pt-2.5 border-t border-neutral-100">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
            Away
          </span>
          <div className="space-y-1">
            {statusTrackerData.away.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-amber-400 border border-white rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-neutral-900 truncate">
                        {item.name}
                      </span>
                      {item.emoji && <span className="text-xs shrink-0">{item.emoji}</span>}
                    </div>
                    <span className="text-[11px] text-neutral-500 block truncate">
                      {item.company}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/70 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
};
