import { createContext } from 'react';

import type { Day, Lecture } from '../types';

export type ScheduleValue = {
  lectures: Lecture[];
  getLecture: (id: string) => Lecture | undefined;
  lecturesOn: (day: Day) => Lecture[];
};

export const ScheduleContext = createContext<ScheduleValue | null>(null);
