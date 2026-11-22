import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  X,
  Laptop,
  Maximize2,
  Layers,
  FileText,
} from 'lucide-react';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LeaveBalanceCards } from './components/LeaveBalanceCards';
import { LeaveCategoryCards } from './components/LeaveCategoryCards';
import { StatusTrackerWidget } from './components/StatusTrackerWidget';
import { RecentRequestsTable } from './components/RecentRequestsTable';
import { CurrentProjectWidget } from './components/CurrentProjectWidget';
import { NotesWidget } from './components/NotesWidget';
import { UpcomingHolidaysWidget } from './components/UpcomingHolidaysWidget';
import { ApplyLeaveModal } from './components/ApplyLeaveModal';

import {
  currentUser,
  initialLeaveBalances,
  initialRequestsData,
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [balances, setBalances] = useState(initialLeaveBalances);
  const [requests, setRequests] = useState(initialRequestsData);
  const [toast, setToast] = useState(null);
  const [browserFrameMode, setBrowserFrameMode] = useState(false);
  const [centerViewMode, setCenterViewMode] = useState('leaves'); // 'leaves' | 'projects'

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handler for applying new leave
  const handleApplyLeaveSubmit = (newRequest) => {
    // Add request to table
    setRequests((prev) => [newRequest, ...prev]);

    // Update balances
    const days = typeof newRequest.days === 'number' ? newRequest.days : 1;
    setBalances((prev) => {
      const newUsed = Math.min(prev.totalUsed + days, prev.totalAllocated);
      const newRemaining = Math.max(prev.totalAllocated - newUsed, 0);

      // Update specific category
      const updatedCategories = prev.categories.map((cat) => {
        if (
          cat.name.toLowerCase().includes('casual') &&
          newRequest.leaveType.toLowerCase().includes('casual')
        ) {
          const used = Math.min(cat.used + days, cat.total);
          return { ...cat, used, remaining: Math.max(cat.total - used, 0) };
        }
        if (
          cat.name.toLowerCase().includes('sick') &&
          newRequest.leaveType.toLowerCase().includes('sick')
        ) {
          const used = Math.min(cat.used + days, cat.total);
          return { ...cat, used, remaining: Math.max(cat.total - used, 0) };
        }
        if (
          cat.name.toLowerCase().includes('earned') &&
          (newRequest.leaveType.toLowerCase().includes('earned') ||
            newRequest.leaveType.toLowerCase().includes('annual'))
        ) {
          const used = Math.min(cat.used + days, cat.total);
          return { ...cat, used, remaining: Math.max(cat.total - used, 0) };
        }
        return cat;
      });

      // Add to mini history
      const newHistoryItem = {
        id: `mh-${Date.now()}`,
        date: newRequest.dates.split(' - ')[0],
        type: newRequest.leaveType.replace(' Leave', ''),
        status: 'Pending',
        statusColor: 'amber',
      };

      return {
        ...prev,
        totalUsed: newUsed,
        totalRemaining: newRemaining,
        categories: updatedCategories,
        miniHistory: [newHistoryItem, ...prev.miniHistory.slice(0, 2)],
      };
    });

    showToast('Leave request submitted successfully! Awaiting review.', 'success');
  };

  // Quick approve action from table
  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
    );
    showToast('Leave request marked as Approved.', 'success');
  };

  // Quick reject action from table
  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r))
    );
    showToast('Leave request marked as Rejected.', 'info');
  };

  const dashboardContent = (
    <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA] overflow-x-hidden">
      {/* Top Header */}
      <Header
        onApplyLeave={() => setIsApplyModalOpen(true)}
        onOpenSchedule={() => showToast('Calendar view opened', 'info')}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      {/* Main Bento Grid Area */}
      <main className="flex-1 p-4 md:p-6 lg:p-6 max-w-[1600px] w-full mx-auto">
        {/* Subtle quick subheader bar */}
        <div className="flex items-center justify-between mb-4 px-0.5">
          <div className="min-w-0">
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 truncate">
              Leave & Workforce Dashboard
            </h2>
            <p className="text-xs text-neutral-500 font-medium mt-0.5 truncate">
              Real-time leave balances, team availability, and company schedules.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Center column view toggle */}
            <div className="hidden sm:flex items-center bg-white border border-neutral-200/90 rounded-xl p-0.5 shadow-xs">
              <button
                onClick={() => setCenterViewMode('leaves')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  centerViewMode === 'leaves'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Leave Requests</span>
              </button>
              <button
                onClick={() => setCenterViewMode('projects')}
                className={`text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  centerViewMode === 'projects'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Projects & Notes</span>
              </button>
            </div>

            {/* AlignUI Frame View Toggle */}
            <button
              onClick={() => setBrowserFrameMode(!browserFrameMode)}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200/90 px-3 py-1.5 rounded-xl shadow-xs hover:bg-neutral-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {browserFrameMode ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Full Screen</span>
                </>
              ) : (
                <>
                  <Laptop className="w-3.5 h-3.5 text-neutral-500" />
                  <span>AlignUI Frame</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3-Column Bento Grid: Balanced 3:6:3 Grid for optimal data display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Column 1: Time Off Arc Overview + Status Tracker (Col 1-3) */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-5 flex flex-col">
            <LeaveBalanceCards
              balances={balances}
              onSeeAll={() => showToast('Viewing all leave balances', 'info')}
            />

            <StatusTrackerWidget
              onSeeAll={() => showToast('Opening team status tracker', 'info')}
            />
          </div>

          {/* Column 2: 3 Minimalist Leave Balance Bento Cards + Recent Requests Table (Col 4-9, Spacious & Clean) */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 flex flex-col">
            {centerViewMode === 'leaves' ? (
              <>
                {/* 3 Minimalist Bento Cards for Casual, Sick, and Earned Leave */}
                <LeaveCategoryCards categories={balances.categories} />

                {/* Recent Leave Requests Data Table */}
                <RecentRequestsTable
                  requests={requests}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onApplyLeave={() => setIsApplyModalOpen(true)}
                />
              </>
            ) : (
              <>
                <CurrentProjectWidget
                  onSeeAll={() => showToast('Opening Project details', 'info')}
                />

                <NotesWidget
                  onSeeAll={() => showToast('Opening notes board', 'info')}
                />
              </>
            )}
          </div>

          {/* Column 3: Schedule, Days Strip, Company Holidays Widget (Col 10-12) */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-5 flex flex-col h-full">
            <UpcomingHolidaysWidget
              onSeeAll={() => showToast('Viewing full company holiday calendar', 'info')}
            />
          </div>
        </div>
      </main>
    </div>
  );

  return (
    <div
      className={
        browserFrameMode
          ? 'min-h-screen bg-neutral-200/80 p-3 sm:p-5 lg:p-8 flex items-center justify-center'
          : 'min-h-screen bg-[#F8F9FA]'
      }
    >
      {/* AlignUI Browser Mockup Frame matching the reference image */}
      {browserFrameMode ? (
        <div className="w-full max-w-[1540px] bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-neutral-300/80 overflow-hidden flex flex-col max-h-[96vh]">
          {/* Browser Window Header with 3 dots & address bar */}
          <div className="bg-[#EDEDED] px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between select-none shrink-0">
            {/* Window control dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>

            {/* Address Bar */}
            <div className="w-full max-w-sm bg-white rounded-lg px-3 py-1 flex items-center justify-center gap-1.5 text-xs text-neutral-600 shadow-xs border border-neutral-200/60">
              <span className="text-[11px] text-neutral-400">🔒</span>
              <span className="font-semibold text-neutral-800">alignui.com</span>
            </div>

            {/* Browser Right Icons */}
            <div className="flex items-center gap-2.5 text-neutral-400 text-xs">
              <span className="hover:text-neutral-700 cursor-pointer">⬇</span>
              <span className="hover:text-neutral-700 cursor-pointer">＋</span>
            </div>
          </div>

          {/* App Body inside Mockup */}
          <div className="flex flex-1 overflow-y-auto">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              mobileOpen={mobileSidebarOpen}
              setMobileOpen={setMobileSidebarOpen}
            />
            {dashboardContent}
          </div>
        </div>
      ) : (
        /* Full Screen Native Dashboard View */
        <div className="flex min-h-screen">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            mobileOpen={mobileSidebarOpen}
            setMobileOpen={setMobileSidebarOpen}
          />
          {dashboardContent}
        </div>
      )}

      {/* Interactive Apply for Leave Modal */}
      <ApplyLeaveModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={handleApplyLeaveSubmit}
        balances={balances}
        currentUser={currentUser}
      />

      {/* Toast Notification Banner */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-neutral-800 text-xs max-w-sm"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
            )}
            <span className="font-semibold">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              aria-label="Dismiss toast"
              className="text-neutral-400 hover:text-white ml-auto cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
