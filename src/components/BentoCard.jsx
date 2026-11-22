import React from 'react';
import { motion } from 'framer-motion';

export const BentoCard = ({
  icon: Icon,
  title,
  actionText = "See All",
  onAction,
  children,
  className = "",
  headerExtra,
  delay = 0,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`bg-white rounded-2xl border border-neutral-200/90 p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] hover:shadow-[0_4px_12px_rgba(16,24,40,0.06)] transition-all duration-200 flex flex-col relative overflow-hidden ${className}`}
    >
      {(Icon || title || actionText || headerExtra) && (
        <div className="flex items-center justify-between mb-4 pb-0.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && (
              <div className="text-neutral-500 shrink-0 flex items-center justify-center">
                <Icon className="w-4 h-4 stroke-[2]" />
              </div>
            )}
            {title && (
              <h2 className="text-[14px] font-bold tracking-tight text-neutral-900 truncate">
                {title}
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {headerExtra}
            {actionText && (
              <button
                type="button"
                onClick={onAction}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-brand-500/20"
              >
                {actionText}
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">{children}</div>
    </motion.section>
  );
};
