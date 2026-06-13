import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../types';

const Scroll = styled.div`
  display: flex; gap: 0.6rem; overflow-x: auto; padding-bottom: 0.5rem;
  margin-bottom: 1.75rem; scrollbar-width: none; -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
`;

const Chip = styled.div<{ color: string }>`
  flex-shrink: 0; background: #fff; border: 1px solid #e5e5e5;
  border-left: 3px solid ${({ color }) => color}; border-radius: 8px;
  padding: 0.65rem 0.875rem; min-width: 140px; max-width: 160px;
  cursor: pointer; transition: box-shadow 0.15s;
  &:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
`;

const ChipDate = styled.p`font-size: 0.66rem; color: #888; margin-bottom: 0.15rem;`;
const ChipTitle = styled.p`font-size: 0.8rem; font-weight: 600; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`;
const ChipTime = styled.p`font-size: 0.7rem; color: #888; margin-top: 0.1rem;`;
const Empty = styled.p`font-size: 0.875rem; color: #aaa; padding: 0.5rem 0 1.5rem;`;

function formatDate(str: string) {
  const d = new Date(str + 'T00:00:00');
  const t = new Date(); t.setHours(0,0,0,0);
  const tm = new Date(t); tm.setDate(tm.getDate()+1);
  if (d.getTime() === t.getTime()) return 'Hoje';
  if (d.getTime() === tm.getTime()) return 'Amanhã';
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
}

interface Props { events: CalendarEvent[]; onSelect: (ev: CalendarEvent) => void; }

export default function UpcomingEvents({ events, onSelect }: Props) {
  if (!events.length) return <Empty>Nenhum evento próximo.</Empty>;
  return (
    <Scroll>
      {events.map((ev) => (
        <Chip key={ev.id} color={ev.color} onClick={() => onSelect(ev)}>
          <ChipDate>{formatDate(ev.date)}</ChipDate>
          <ChipTitle>{ev.title}</ChipTitle>
          <ChipTime>{ev.allDay ? 'Dia todo' : `${ev.startTime}${ev.endTime ? ` – ${ev.endTime}` : ''}`}</ChipTime>
        </Chip>
      ))}
    </Scroll>
  );
}
