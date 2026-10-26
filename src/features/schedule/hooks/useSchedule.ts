import { useContext } from 'react';

import { ScheduleContext } from '../contexts/ScheduleContext';

export function useSchedule() {
  const value = useContext(ScheduleContext);
  if (!value) throw new Error('useSchedule must be inside ScheduleProvider');
  return value;
}
