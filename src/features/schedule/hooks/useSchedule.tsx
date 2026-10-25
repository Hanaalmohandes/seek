import { createContext, useContext, type PropsWithChildren } from 'react';

import { SAMPLE_LECTURES } from '../data/samples';
import type { Day, Lecture } from '../types';

type ScheduleValue = {
  lectures: Lecture[];
  getLecture: (id: string) => Lecture | undefined;
  lecturesOn: (day: Day) => Lecture[];
};

const ScheduleContext = createContext<ScheduleValue | null>(null);

export function ScheduleProvider({ children }: PropsWithChildren) {
  const lectures = SAMPLE_LECTURES;

  const getLecture = (id: string) => lectures.find((l) => l.id === id);
  const lecturesOn = (day: Day) =>
    lectures.filter((l) => l.day === day).sort((a, b) => a.start.localeCompare(b.start));

  return (
    <ScheduleContext.Provider value={{ lectures, getLecture, lecturesOn }}>{children}</ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const value = useContext(ScheduleContext);
  if (!value) throw new Error('useSchedule must be inside ScheduleProvider');
  return value;
}
