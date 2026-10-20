"use client";

import { useState } from "react";
import type { DisciplineSchedule } from "@/content/club";

export function ScheduleTabs({ schedule }: { schedule: DisciplineSchedule[] }) {
  const [active, setActive] = useState(0);
  const current = schedule[active];

  return (
    <div>
      <div role="tablist" aria-label="Sekcje" className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {schedule.map((s, i) => (
          <button
            key={s.discipline}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              i === active ? "border-accent bg-accent text-white" : "border-border hover:border-accent"
            }`}
          >
            {s.discipline}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="overflow-hidden rounded-xl border border-border bg-card">
        {current.days.map((day) => (
          <div
            key={day.day}
            className="grid gap-2 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
          >
            <p className="font-semibold text-accent-text">{day.day}</p>
            <ul className="space-y-1.5">
              {day.sessions.map((s) => (
                <li key={`${s.time}-${s.group}`} className="flex gap-3">
                  <span className="w-12 shrink-0 font-mono text-sm font-semibold tabular-nums">{s.time}</span>
                  <span className="text-sm">{s.group}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
