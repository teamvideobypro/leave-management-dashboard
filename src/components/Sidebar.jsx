import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Briefcase,
  Users,
  FileText,
  Gift,
  FileCheck,
  Settings,
  Headphones,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  X,
} from 'lucide-react';
import { currentUser } from '../data/mockData';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
}) => {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'my-leaves', label: 'Time Off', icon: Clock },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'benefits', label: 'Benefits', icon: Gift, badge: 'NEW' },
    { id: 'documents', label: 'Documents', icon: FileCheck },
  ];

  const favorites = [
    { id: 'fav-1', label: 'Transket Team', color: 'bg-blue-500', shortcut: '⌘ 1' },
    { id: 'fav-2', label: 'Monday Redesign', color: 'bg-rose-500', shortcut: '⌘ 2' },
    { id: 'fav-3', label: 'Udemy Courses', color: 'bg-purple-500', shortcut: '⌘ 3' },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-white select-none">
      <div>
        {/* Workspace Brand Header matching reference R01 */}
        <div className="flex items-center justify-between pb-4 pt-1 px-1 border-b border-neutral-100">
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Custom Synergy Logo Burst */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="w-4 h-4"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M4.93 19.07l1.41-1.41" />
                <path d="M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="text-sm font-bold text-neutral-900 block leading-tight truncate">
                Transket
              </span>
              <span className="text-[11px] text-neutral-400 font-medium block leading-tight truncate">
                HR Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              aria-label="Workspace Options"
              className="text-neutral-400 hover:text-neutral-700 p-1 rounded-lg transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            {mobileOpen && (
              <button
                type="button"
                aria-label="Close Sidebar"
                onClick={() => setMobileOpen(false)}
                className="md:hidden text-neutral-500 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* MAIN NAVIGATION */}
        <div className="mt-5">
          <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase px-2.5 block mb-2">
            Main
          </span>
          <nav className="space-y-0.5">
            {mainNav.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all relative group cursor-pointer ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-900'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  {/* Purple Left Indicator on active */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-brand-600 rounded-r-full" />
                  )}

                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-neutral-900'
                          : 'text-neutral-400 group-hover:text-neutral-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-600 border border-orange-200">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* FAVORITES */}
        <div className="mt-5 pt-4 border-t border-neutral-100">
          <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase px-2.5 block mb-2">
            Favorites
          </span>
          <div className="space-y-0.5">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${fav.color}`} />
                  <span className="group-hover:text-neutral-900 truncate">
                    {fav.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-sm border border-neutral-200/60 shrink-0">
                  {fav.shortcut}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS & PROFILE */}
      <div className="pt-4 border-t border-neutral-100 space-y-3">
        {/* Settings & Support */}
        <div className="space-y-0.5">
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <Settings className="w-4 h-4 text-neutral-400" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            <Headphones className="w-4 h-4 text-neutral-400" />
            <span>Support</span>
          </button>
        </div>

        {/* User Card matching reference */}
        <div className="p-2 rounded-2xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-neutral-100/70 transition-colors flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="relative shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-neutral-900 truncate">
                  {currentUser.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-500 text-white shrink-0" />
              </div>
              <span className="text-[11px] text-neutral-400 truncate block">
                {currentUser.email}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 h-screen sticky top-0 border-r border-neutral-200/80 bg-white z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-out Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-xs"
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
