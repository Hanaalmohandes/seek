import type { Day, Lecture, LectureType } from '../types';

import { DEFAULT_REMINDER_MINUTES } from './reminders';

export const DAYS: { id: Day; short: string; long: string; date: number }[] = [
  { id: 'sun', short: 'Sun', long: 'Sunday', date: 25 },
  { id: 'mon', short: 'Mon', long: 'Monday', date: 26 },
  { id: 'tue', short: 'Tue', long: 'Tuesday', date: 27 },
  { id: 'wed', short: 'Wed', long: 'Wednesday', date: 28 },
  { id: 'thu', short: 'Thu', long: 'Thursday', date: 29 },
];

export const SAMPLE_WEEK = '25 – 29 October';
export const SAMPLE_TODAY: Day = 'sun';

export const TYPE_META: Record<LectureType, { label: string; icon: string }> = {
  lecture: { label: 'Lecture', icon: 'school-outline' },
  lab: { label: 'Lab', icon: 'flask-outline' },
  tutorial: { label: 'Tutorial', icon: 'people-outline' },
};

export const REMINDER_OPTIONS: (number | null)[] = [null, 5, 10, 15, 30];

export const ROOM_SUGGESTIONS = [
  { locationId: 'ics', room: 'H-201', label: 'H-201, ICS' },
  { locationId: 'ics', room: 'H Lab 3', label: 'H Lab 3, ICS' },
  { locationId: 'eng-labs', room: 'A-Lab 2', label: 'A-Lab 2, Engineering' },
  { locationId: 'baeps', room: 'G-105', label: 'G-105, BAEPS' },
];

export const SAMPLE_LECTURES: Lecture[] = [
  { id: 'l1', courseCode: 'CS 301', courseName: 'Mobile App Development', type: 'lecture', locationId: 'ics', room: 'H-201', day: 'sun', start: '09:00', end: '10:30', lecturer: 'Dr. Sara Adel', reminderMinutes: 15 },
  { id: 'l2', courseCode: 'CS 301', courseName: 'Mobile App Development', type: 'lab', locationId: 'ics', room: 'H Lab 3', day: 'sun', start: '11:00', end: '12:30', lecturer: 'Eng. Omar Fathy', reminderMinutes: 10 },
  { id: 'l3', courseCode: 'AI 320', courseName: 'Neural Networks', type: 'lecture', locationId: 'ics', room: 'H-104', day: 'sun', start: '14:00', end: '15:30', lecturer: 'Dr. Mona Hassan', reminderMinutes: null },
  { id: 'l4', courseCode: 'CS 310', courseName: 'Distributed Systems', type: 'lecture', locationId: 'ics', room: 'H-201', day: 'mon', start: '10:00', end: '11:30', lecturer: 'Dr. Karim Nabil', reminderMinutes: 15 },
  { id: 'l5', courseCode: 'BA 210', courseName: 'Entrepreneurship', type: 'lecture', locationId: 'baeps', room: 'G-105', day: 'mon', start: '13:00', end: '14:30', lecturer: 'Dr. Laila Samir', reminderMinutes: 15 },
  { id: 'l6', courseCode: 'AI 330', courseName: 'Robot Planning', type: 'lecture', locationId: 'ics', room: 'H-302', day: 'tue', start: '09:00', end: '10:30', lecturer: 'Dr. Youssef Amin', reminderMinutes: 30 },
  { id: 'l7', courseCode: 'AI 330', courseName: 'Robot Planning', type: 'lab', locationId: 'eng-labs', room: 'A-Lab 2', day: 'tue', start: '12:00', end: '13:30', lecturer: 'Eng. Nour Tarek', reminderMinutes: 15 },
  { id: 'l8', courseCode: 'AI 320', courseName: 'Neural Networks', type: 'lab', locationId: 'ics', room: 'H Lab 1', day: 'wed', start: '10:00', end: '11:30', lecturer: 'Eng. Hady Mostafa', reminderMinutes: 10 },
  { id: 'l9', courseCode: 'CS 301', courseName: 'Mobile App Development', type: 'tutorial', locationId: 'ics', room: 'H-105', day: 'wed', start: '13:00', end: '14:00', lecturer: 'Eng. Omar Fathy', reminderMinutes: null },
  { id: 'l10', courseCode: 'SE 412', courseName: 'Intelligent Agents', type: 'lecture', locationId: 'ics', room: 'H-201', day: 'thu', start: '11:00', end: '12:30', lecturer: 'Dr. Rania Fouad', reminderMinutes: 15 },
];

export const SAMPLE_DRAFT = {
  courseCode: '',
  courseName: '',
  type: 'lab' as LectureType,
  room: 'H-999',
  day: 'mon' as Day,
  start: '11:00',
  end: '10:30',
  reminderMinutes: DEFAULT_REMINDER_MINUTES as number | null,
};

export const SAMPLE_ERRORS = {
  course: 'Enter the course code and name.',
  room: 'This room isn’t on the campus map. Pick one from the list.',
  time: 'End time must be after the start time.',
  overlap: 'Overlaps with CS 310 Distributed Systems, Mon 10:00 – 11:30.',
};
