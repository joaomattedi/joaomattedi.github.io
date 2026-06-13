export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  color: string;
  allDay?: boolean;
  googleEventId?: string;
}

export type CalendarView = 'month' | 'week';

export const EVENT_COLORS = [
  '#2563eb',
  '#16a34a',
  '#d97706',
  '#7c3aed',
  '#db2777',
  '#dc2626',
] as const;
