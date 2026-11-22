import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Check, X, Plus } from 'lucide-react';
import { BentoCard } from './BentoCard';

export const RecentRequestsTable = ({
  requests,
  onApprove,
  onReject,
  onApplyLeave,
}) => {
  const [filter, setFilter] = useState('All');

  const filteredRequests = requests.filter((req) => {
    if (filter === 'All') return true;
    return req.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <BentoCard
      icon={FileText}
      title="Recent Leave Requests"
      actionText=""
      headerExtra={
        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200/70">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                filter === status
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      }
      delay={0.1}
      className="flex-1"
    >
      <div className="w-full overflow-hidden flex-1">
        <table className="w-full text-left table-fixed border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              <th className="pb-2 pl-1 w-[38%] font-semibold">Employee</th>
              <th className="pb-2 px-2 w-[24%] font-semibold">Leave Type</th>
              <th className="pb-2 px-2 w-[20%] font-semibold">Dates</th>
              <th className="pb-2 pr-1 w-[18%] font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            <AnimatePresence initial={false}>
              {filteredRequests.map((req) => {
                const isPending = req.status.toLowerCase() === 'pending';
                const isApproved = req.status.toLowerCase() === 'approved';

                return (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="group hover:bg-neutral-50/80 transition-colors"
                  >
                    {/* Employee */}
                    <td className="py-2.5 pl-1 pr-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={req.employee.avatar}
                          alt={req.employee.name}
                          className="w-7 h-7 rounded-full object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-neutral-900 truncate leading-tight">
                            {req.employee.name}
                          </div>
                          <div className="text-[11px] text-neutral-500 truncate leading-tight mt-0.5">
                            {req.employee.role}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Leave Type */}
                    <td className="py-2.5 px-2">
                      <span className="font-semibold text-neutral-800 block truncate">
                        {req.leaveType}
                      </span>
                      {req.reason && (
                        <span
                          className="text-[11px] text-neutral-400 block truncate mt-0.5"
                          title={req.reason}
                        >
                          {req.reason}
                        </span>
                      )}
                    </td>

                    {/* Dates */}
                    <td className="py-2.5 px-2">
                      <div className="font-medium text-neutral-800 truncate">
                        {req.dates}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-medium">
                        {req.days} {req.days === 1 ? 'day' : 'days'}
                      </div>
                    </td>

                    {/* Status Badge + Inline Quick Action */}
                    <td className="py-2.5 pr-1 pl-2 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border shrink-0 ${
                            isPending
                              ? 'bg-amber-50 text-amber-700 border-amber-200/80'
                              : isApproved
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                              : 'bg-rose-50 text-rose-700 border-rose-200/80'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPending
                                ? 'bg-amber-500'
                                : isApproved
                                ? 'bg-emerald-500'
                                : 'bg-rose-500'
                            }`}
                          />
                          <span>{req.status}</span>
                        </span>

                        {isPending && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => onApprove(req.id)}
                              title="Approve"
                              className="p-1 rounded-md text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onReject(req.id)}
                              title="Reject"
                              className="p-1 rounded-md text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>

            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-neutral-400 text-xs">
                  No leave requests found for &ldquo;{filter}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500 shrink-0">
        <span className="font-medium">
          Showing {filteredRequests.length} requests
        </span>
        <button
          onClick={onApplyLeave}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Apply for Leave</span>
        </button>
      </div>
    </BentoCard>
  );
};
