import { useState, useCallback } from 'react';
import { CalendarEvent } from '../types';

declare global {
  interface Window { gapi: any; google: any; }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

function colorToId(color: string): string {
  const map: Record<string, string> = {
    '#2563eb': '1', '#16a34a': '2', '#7c3aed': '3',
    '#dc2626': '4', '#d97706': '5', '#db2777': '9',
  };
  return map[color] || '1';
}

function mapEvent(item: any): CalendarEvent {
  const allDay = !item.start?.dateTime;
  const start = item.start?.dateTime || item.start?.date || '';
  const end = item.end?.dateTime || item.end?.date || '';
  const colorMap: Record<string, string> = {
    '1': '#2563eb', '2': '#16a34a', '3': '#7c3aed',
    '4': '#dc2626', '5': '#d97706', '9': '#db2777',
  };
  return {
    id: item.id,
    googleEventId: item.id,
    title: item.summary || '(sem título)',
    date: allDay ? start : start.slice(0, 10),
    startTime: allDay ? undefined : start.slice(11, 16),
    endTime: allDay ? undefined : end.slice(11, 16),
    description: item.description,
    color: colorMap[item.colorId] || '#2563eb',
    allDay,
  };
}

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const init = useCallback(async () => {
    setLoading(true);
    await new Promise<void>((res) => {
      const s = document.createElement('script');
      s.src = 'https://apis.google.com/js/api.js';
      s.onload = () => res();
      document.body.appendChild(s);
    });
    await new Promise<void>((res) => window.gapi.load('client', () => res()));
    await window.gapi.client.init({ apiKey: API_KEY, discoveryDocs: [DISCOVERY_DOC] });

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: async () => {
        setReady(true);
        await fetch();
      },
    });
    tokenClient.requestAccessToken({ prompt: '' });
  }, []);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const now = new Date();
      const res = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
        timeMax: new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString(),
        singleEvents: true, orderBy: 'startTime', maxResults: 250,
      });
      setEvents((res.result.items || []).map(mapEvent));
    } finally {
      setLoading(false);
    }
  }, []);

  async function addEvent(ev: Omit<CalendarEvent, 'id' | 'googleEventId'>) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const resource: any = { summary: ev.title, description: ev.description, colorId: colorToId(ev.color) };
    if (ev.allDay) { resource.start = { date: ev.date }; resource.end = { date: ev.date }; }
    else { resource.start = { dateTime: `${ev.date}T${ev.startTime}:00`, timeZone: tz }; resource.end = { dateTime: `${ev.date}T${ev.endTime}:00`, timeZone: tz }; }
    await window.gapi.client.calendar.events.insert({ calendarId: 'primary', resource });
    await fetch();
  }

  async function updateEvent(id: string, data: Partial<CalendarEvent>) {
    const existing = events.find((e) => e.id === id);
    if (!existing) return;
    const merged = { ...existing, ...data };
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const resource: any = { summary: merged.title, description: merged.description, colorId: colorToId(merged.color) };
    if (merged.allDay) { resource.start = { date: merged.date }; resource.end = { date: merged.date }; }
    else { resource.start = { dateTime: `${merged.date}T${merged.startTime}:00`, timeZone: tz }; resource.end = { dateTime: `${merged.date}T${merged.endTime}:00`, timeZone: tz }; }
    await window.gapi.client.calendar.events.update({ calendarId: 'primary', eventId: id, resource });
    await fetch();
  }

  async function deleteEvent(id: string) {
    await window.gapi.client.calendar.events.delete({ calendarId: 'primary', eventId: id });
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  const upcomingEvents = [...events]
    .filter((e) => new Date(e.date + (e.startTime ? `T${e.startTime}` : 'T00:00')) >= new Date(new Date().setHours(0,0,0,0)))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 10);

  return { events, upcomingEvents, loading, ready, init, addEvent, updateEvent, deleteEvent };
}
