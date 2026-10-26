import type { PropsWithChildren } from 'react';

import { ScheduleContext } from '../contexts/ScheduleContext';
import { SAMPLE_LECTURES } from '../data/samples';
import type { Day } from '../types';

export function ScheduleProvider({ children }: PropsWithChildren) {
  const lectures = SAMPLE_LECTURES;

  const getLecture = (id: string) => lectures.find((l) => l.id === id);
  const lecturesOn = (day: Day) =>
    lectures.filter((l) => l.day === day).sort((a, b) => a.start.localeCompare(b.start));

  return (
    <ScheduleContext.Provider value={{ lectures, getLecture, lecturesOn }}>{children}</ScheduleContext.Provider>
  );
}
