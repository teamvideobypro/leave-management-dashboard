import React, { useState } from 'react';
import {
  Search,
  Bell,
  Calendar,
  Plus,
  Menu,
} from 'lucide-react';
import { currentUser } from '../data/mockData';

export const Header = ({
  onApplyLeave,
  onOpenSchedule,
  onToggleMobileSidebar,
}) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-neutral-200/60 px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle + User Greeting */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Open Navigation Menu"
          className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-200/60 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-neutral-200 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="min-w-0">
            <h1 className="text-base md:text-[17px] font-bold text-neutral-900 tracking-tight leading-tight truncate">
              {currentUser.name}
            </h1>
            <p className="text-xs text-neutral-500 font-medium flex items-center gap-1 leading-tight mt-0.5 truncate">
              <span>Welcome back to the Transket</span>
              <span>👋</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Search + Notifications + Schedule + Primary Action */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Search trigger button matching reference */}
        <div className="relative hidden xl:block w-56">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-white border border-neutral-200/80 rounded-xl pl-8 pr-12 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-xs"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 bg-neutral-100 border border-neutral-200 px-1 py-0.5 rounded-sm">
            ⌘K
          </span>
        </div>

        {/* Search icon for mobile/tablet */}
        <button
          type="button"
          aria-label="Search"
          className="xl:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-200/60 transition-colors"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setNotificationCount(0);
            }}
            className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-neutral-200/80 p-3 z-40 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 font-bold text-neutral-900">
                <span>Notifications</span>
                <span className="text-[10px] font-normal text-brand-600 cursor-pointer">
                  Mark all as read
                </span>
              </div>
              <div className="py-2 space-y-2">
                <div className="p-2 rounded-xl bg-purple-50/50 border border-purple-100/60">
                  <span className="font-semibold text-neutral-900 block">
                    Sick leave request received
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    Arthur Taylor requested 2 days off.
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-neutral-50">
                  <span className="font-semibold text-neutral-900 block">
                    Upcoming Holiday
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    National Day on Aug 15th.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Secondary "+ Schedule" button matching reference */}
        <button
          type="button"
          onClick={onOpenSchedule}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200/90 rounded-xl hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Calendar className="w-3.5 h-3.5 text-neutral-500" />
          <span>Schedule</span>
        </button>

        {/* Prominent Primary "+ Apply for Leave" Button */}
        <button
          type="button"
          onClick={onApplyLeave}
          className="flex items-center gap-1.5 px-3.5 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:scale-[0.98] rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Apply for Leave</span>
        </button>
      </div>
    </header>
  );
};
