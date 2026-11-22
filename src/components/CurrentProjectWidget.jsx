import React from 'react';
import { Zap, Calendar } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { currentProjectData } from '../data/mockData';

export const CurrentProjectWidget = ({ onSeeAll }) => {
  return (
    <BentoCard
      icon={Zap}
      title="Current Project"
      actionText="See All"
      onAction={onSeeAll}
      delay={0.12}
    >
      <div className="space-y-3">
        {/* Project Title & Status */}
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Project Name
          </span>
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 bg-neutral-900 rounded-xs shrink-0" />
            <h3 className="text-xs font-bold text-neutral-900 truncate">
              {currentProjectData.name}
            </h3>
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/80 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {currentProjectData.status}
            </span>
          </div>
        </div>

        {/* Roles row */}
        <div className="grid grid-cols-2 gap-3 pt-0.5">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              Project Manager
            </span>
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={currentProjectData.manager.avatar}
                alt={currentProjectData.manager.name}
                className="w-5 h-5 rounded-full object-cover border border-neutral-200 shrink-0"
              />
              <span className="text-xs font-semibold text-neutral-800 truncate">
                {currentProjectData.manager.name}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
              Design Lead
            </span>
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={currentProjectData.designLead.avatar}
                alt={currentProjectData.designLead.name}
                className="w-5 h-5 rounded-full object-cover border border-neutral-200 shrink-0"
              />
              <span className="text-xs font-semibold text-neutral-800 truncate">
                {currentProjectData.designLead.name}
              </span>
            </div>
          </div>
        </div>

        {/* Team Avatar Stack */}
        <div className="pt-0.5">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
            Team
          </span>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5 overflow-hidden">
              {currentProjectData.team.map((avatarUrl, idx) => (
                <img
                  key={idx}
                  src={avatarUrl}
                  alt="Team member"
                  className="inline-block h-5 w-5 rounded-full ring-2 ring-white object-cover"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-neutral-500">
              +{currentProjectData.extraTeamCount} people
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="pt-0.5">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
            Timeline
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700">
            <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{currentProjectData.timeline}</span>
          </div>
        </div>

        {/* Description */}
        <div className="pt-2 border-t border-neutral-100">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
            Description
          </span>
          <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
            {currentProjectData.description}
          </p>
        </div>
      </div>
    </BentoCard>
  );
};
