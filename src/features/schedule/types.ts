export type LectureType = 'lecture' | 'lab' | 'tutorial';

export type Day = 'sun' | 'mon' | 'tue' | 'wed' | 'thu';

export type Lecture = {
  id: string;
  courseCode: string;
  courseName: string;
  type: LectureType;
  locationId: string;
  room: string;
  day: Day;
  start: string;
  end: string;
  lecturer: string;
  reminderMinutes: number | null;
};
