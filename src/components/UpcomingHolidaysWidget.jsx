import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Sparkles,
} from 'lucide-react';
import { BentoCard } from './BentoCard';
import { scheduleMeetings, companyHolidays } from '../data/mockData';

export const UpcomingHolidaysWidget = ({ onSeeAll }) => {
  const [activeTab, setActiveTab] = useState('Meetings'); // Matches reference R01 default active tab
  const [selectedDay, setSelectedDay] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');

  const days = [
    { name: 'Fri', dayNumber: 31 },
    { name: 'Sat', dayNumber: 1 },
    { name: 'Sun', dayNumber: 2 },
    { name: 'Mon', dayNumber: 3 },
    { name: 'Tue', dayNumber: 4 },
  ];

  return (
    <BentoCard
      icon={CalendarIcon}
      title="Schedule"
      actionText="See All"
      onAction={onSeeAll}
      delay={0.15}
      className="h-full"
    >
      <div className="space-y-3.5 flex flex-col flex-1">
        {/* Month switcher matching reference R01 */}
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            aria-label="Previous Month"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-neutral-900 tracking-tight">
            Aug, 2023
          </span>
          <button
            type="button"
            aria-label="Next Month"
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Days selector strip */}
        <div className="flex items-center justify-between gap-1">
          <button
            type="button"
            aria-label="Previous Week"
            className="text-neutral-300 hover:text-neutral-600 p-0.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 flex-1 justify-between">
            {days.map((d) => {
              const isSelected = selectedDay === d.dayNumber;
              return (
                <button
                  key={d.dayNumber}
                  type="button"
                  onClick={() => setSelectedDay(d.dayNumber)}
                  className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs font-semibold'
                      : 'text-neutral-600 hover:bg-neutral-100 font-medium'
                  }`}
                >
                  <span
                    className={`text-[9px] uppercase tracking-wider ${
                      isSelected ? 'text-purple-200' : 'text-neutral-400'
                    }`}
                  >
                    {d.name}
                  </span>
                  <span
                    className={`text-xs mt-0.5 ${
                      isSelected ? 'font-bold' : 'font-semibold text-neutral-800'
                    }`}
                  >
                    {d.dayNumber < 10 && d.dayNumber !== 31
                      ? `0${d.dayNumber}`
                      : d.dayNumber}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next Week"
            className="text-neutral-300 hover:text-neutral-600 p-0.5"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search bar with filter icon matching reference */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-8 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-brand-500 focus:bg-white transition-all"
          />
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Segmented Tabs matching reference */}
        <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
          {[
            { id: 'Meetings', label: 'Meetings', icon: Clock },
            { id: 'Events', label: 'Events', icon: CalendarIcon },
            { id: 'Holiday', label: 'Holiday', icon: Sparkles },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-1 px-2.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-brand-700 bg-brand-50/70'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeScheduleTab"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-brand-600 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content cards with soft pastel gradients */}
        <div className="space-y-2.5 flex-1 overflow-y-auto pr-0.5 max-h-[460px]">
          <AnimatePresence mode="wait">
            {activeTab === 'Meetings' && (
              <motion.div
                key="meetings"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                {scheduleMeetings
                  .filter((m) =>
                    m.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((meet) => (
                    <div
                      key={meet.id}
                      className={`p-3.5 rounded-2xl bg-gradient-to-br ${meet.gradient} border ${meet.border} shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:scale-[1.01] transition-transform`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-neutral-900 leading-tight truncate">
                            {meet.title}
                          </h4>
                          <span className="text-[11px] font-medium text-neutral-600 block mt-0.5">
                            {meet.time}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="w-5 h-5 rounded-full bg-white/70 flex items-center justify-center text-neutral-500 hover:text-neutral-800 shrink-0"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-2.5">
                        <div className="flex -space-x-1.5 overflow-hidden">
                          {meet.attendees.map((avatar, idx) => (
                            <img
                              key={idx}
                              src={avatar}
                              alt="Attendee"
                              className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                        </div>
                        {meet.extraAttendees && (
                          <span className="text-[10px] font-semibold text-neutral-600">
                            +{meet.extraAttendees}
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-neutral-600 truncate">
                          {meet.platform}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${meet.tagBg}`}
                        >
                          {meet.tag}
                        </span>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}

            {activeTab === 'Holiday' && (
              <motion.div
                key="holidays"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                {companyHolidays
                  .filter((h) =>
                    h.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((holiday) => (
                    <div
                      key={holiday.id}
                      className={`p-3.5 rounded-2xl bg-gradient-to-br ${holiday.gradient} border ${holiday.border} shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:scale-[1.01] transition-transform`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-neutral-900 leading-tight truncate">
                            {holiday.title}
                          </h4>
                          <span className="text-[11px] font-medium text-neutral-600 block mt-0.5">
                            {holiday.date} ({holiday.day})
                          </span>
                        </div>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${holiday.tagBg}`}
                        >
                          {holiday.tag}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-600 mt-2 leading-relaxed">
                        {holiday.description}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] text-neutral-500 font-medium">
                        <span>{holiday.type}</span>
                        <span className="font-semibold text-neutral-700">
                          {holiday.statusBadge}
                        </span>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}

            {activeTab === 'Events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-6 text-center text-neutral-400 text-xs bg-neutral-50 rounded-2xl border border-neutral-100"
              >
                <CalendarIcon className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                <p className="font-semibold text-neutral-700">No company events today</p>
                <p className="text-[11px] mt-1 text-neutral-500">
                  Check back next week for quarterly all-hands.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
};
