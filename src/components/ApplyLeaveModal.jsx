import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ApplyLeaveModal = ({
  isOpen,
  onClose,
  onSubmit,
  balances,
  currentUser,
}) => {
  const [leaveType, setLeaveType] = useState('Casual Leave');
  const [startDate, setStartDate] = useState('2023-08-28');
  const [endDate, setEndDate] = useState('2023-08-30');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [handoverColleague, setHandoverColleague] = useState('Laura Perez');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  // Calculate days difference
  const calculateDays = () => {
    if (isHalfDay) return 0.5;
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const calculatedDays = calculateDays();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Please provide a short reason for your leave request.');
      return;
    }
    setError('');

    const newRequest = {
      id: `req-${Date.now()}`,
      employee: {
        name: currentUser.name,
        role: currentUser.role,
        avatar: currentUser.avatar,
      },
      leaveType,
      dates: isHalfDay
        ? `${startDate} (Half Day)`
        : `${startDate} - ${endDate}`,
      days: calculatedDays,
      reason: reason.trim(),
      status: 'Pending',
    };

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 55,
        origin: { y: 0.6 },
        colors: ['#6E44FF', '#12B76A', '#F79009', '#3B82F6'],
      });
    } catch {
      // fallback
    }

    onSubmit(newRequest);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Spring-based Animated Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-100 p-6 overflow-hidden z-10 max-h-[92vh] flex flex-col"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-purple-500 to-indigo-600" />

            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 border-b border-neutral-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 tracking-tight">
                    Apply for Leave
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Submit your time-off request for manager approval
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close Modal"
                onClick={onClose}
                className="w-8 h-8 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 overflow-y-auto flex-1 pr-1">
              {/* Applicant Card */}
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-neutral-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-neutral-900 block leading-tight truncate">
                      {currentUser.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 block leading-tight truncate">
                      {currentUser.role}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                    Available Balance
                  </span>
                  <span className="text-xs font-bold text-brand-700">
                    {balances.totalRemaining} days remaining
                  </span>
                </div>
              </div>

              {/* Leave Type Select */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Leave Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Casual Leave', code: 'Casual', daysLeft: 2 },
                    { id: 'Sick Leave', code: 'Sick', daysLeft: 3 },
                    { id: 'Earned Leave', code: 'Earned', daysLeft: 3 },
                  ].map((cat) => {
                    const isSelected = leaveType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setLeaveType(cat.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-brand-600 bg-brand-50 text-brand-900 ring-1 ring-brand-500'
                            : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700'
                        }`}
                      >
                        <span className="text-xs font-bold block">{cat.code}</span>
                        <span className="text-[10px] text-neutral-500 font-medium mt-0.5 block">
                          {cat.daysLeft}d left
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    disabled={isHalfDay}
                    className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500 disabled:opacity-50 font-medium"
                  />
                </div>
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isHalfDay}
                    onChange={(e) => setIsHalfDay(e.target.checked)}
                    className="w-4 h-4 text-brand-600 rounded-sm border-neutral-300 focus:ring-brand-500"
                  />
                  <span className="font-semibold text-neutral-700">
                    Half-day request only
                  </span>
                </label>

                <div className="flex items-center gap-1.5 bg-neutral-100 text-neutral-800 px-2.5 py-1 rounded-full text-[11px] font-bold">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  <span>
                    Total: {calculatedDays}{' '}
                    {calculatedDays === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>

              {/* Handover Colleague */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Work Handover / Backup Contact
                </label>
                <select
                  value={handoverColleague}
                  onChange={(e) => setHandoverColleague(e.target.value)}
                  className="w-full text-xs bg-white border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-hidden focus:ring-1 focus:ring-brand-500 font-medium"
                >
                  <option value="Laura Perez">Laura Perez (Engineering Director)</option>
                  <option value="Arthur Taylor">Arthur Taylor (Senior Engineer)</option>
                  <option value="Emma Wright">Emma Wright (Product Manager)</option>
                </select>
              </div>

              {/* Reason text area */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Taking time off for medical checkup / vacation..."
                  className="w-full text-xs bg-white border border-neutral-200 rounded-xl p-3 text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-brand-500 resize-none font-medium"
                />
                {error && (
                  <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </p>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Request</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
