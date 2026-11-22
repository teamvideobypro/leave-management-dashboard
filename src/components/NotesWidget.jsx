import React, { useState } from 'react';
import { FileText, CheckCircle2, Circle, Calendar } from 'lucide-react';
import { BentoCard } from './BentoCard';
import { notesData as initialNotes } from '../data/mockData';

export const NotesWidget = ({ onSeeAll }) => {
  const [notes, setNotes] = useState(initialNotes);

  const toggleNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, completed: !note.completed } : note
      )
    );
  };

  return (
    <BentoCard
      icon={FileText}
      title="Notes"
      actionText="See All"
      onAction={onSeeAll}
      delay={0.14}
    >
      <div className="space-y-2">
        {notes.map((note) => {
          return (
            <div
              key={note.id}
              onClick={() => toggleNote(note.id)}
              className="p-2.5 rounded-xl border border-neutral-100 hover:border-neutral-200 hover:bg-neutral-50/60 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-2.5">
                <button
                  type="button"
                  aria-label={`Toggle note: ${note.title}`}
                  className="mt-0.5 shrink-0 text-neutral-400 group-hover:text-neutral-600 focus:outline-hidden"
                >
                  {note.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                  ) : (
                    <Circle className="w-4 h-4 text-neutral-300" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-xs font-semibold leading-tight truncate ${
                      note.completed
                        ? 'line-through text-neutral-400'
                        : 'text-neutral-900'
                    }`}
                  >
                    {note.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {note.preview}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    {note.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] font-bold px-2 py-0.2 rounded-full ${
                          tag.color === 'rose'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200/60'
                            : tag.color === 'amber'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                            : tag.color === 'blue'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1 ml-auto font-medium">
                      <Calendar className="w-3 h-3" />
                      {note.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BentoCard>
  );
};
