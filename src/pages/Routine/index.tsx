import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCalendar } from './hooks/useCalendar';
import UpcomingEvents from './components/UpcomingEvents';
import MonthView from './components/MonthView';
import WeekView from './components/WeekView';
import EventModal from './components/EventModal';
import { CalendarEvent, CalendarView } from './types';

const PageWrapper = styled.div`max-width:960px;margin:0 auto;padding:1.25rem 1rem 4rem;@media(min-width:641px){padding:2rem 1.5rem 4rem}`;
const PageTitle = styled.h1`font-size:1.1rem;font-weight:600;color:#111;margin-bottom:1.25rem`;
const SectionTitle = styled.p`font-size:0.7rem;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.65rem`;
const CalHeader = styled.div`display:flex;flex-direction:column;gap:0.75rem;margin-bottom:1rem;@media(min-width:480px){flex-direction:row;align-items:center;justify-content:space-between}`;
const CalNav = styled.div`display:flex;align-items:center;gap:0.5rem`;
const CalTitle = styled.span`font-size:0.9rem;font-weight:600;color:#111;flex:1;text-align:center`;
const NavBtn = styled.button`background:none;border:1px solid #e5e5e5;border-radius:4px;color:#555;cursor:pointer;font-size:0.85rem;padding:0.25rem 0.55rem;line-height:1.5;flex-shrink:0;font-family:inherit;&:hover{background:#f5f5f5}`;
const CalActions = styled.div`display:flex;align-items:center;gap:0.5rem`;
const ViewToggle = styled.div`display:flex;gap:2px;background:#f0f0f0;border-radius:6px;padding:2px`;
const ViewBtn = styled.button<{ active:boolean }>`background:${({active})=>active?'#fff':'none'};border:none;border-radius:4px;color:${({active})=>active?'#111':'#888'};cursor:pointer;font-size:0.75rem;font-weight:${({active})=>active?600:400};padding:0.25rem 0.65rem;transition:all 0.15s;font-family:inherit;box-shadow:${({active})=>active?'0 1px 2px rgba(0,0,0,0.1)':'none'}`;
const AddBtn = styled.button`background:#111;border:none;border-radius:4px;color:#fff;cursor:pointer;font-size:0.8rem;font-weight:500;padding:0.38rem 0.75rem;font-family:inherit;white-space:nowrap;&:hover{opacity:0.8}`;

const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
function pad(n:number){return String(n).padStart(2,'0')}
function getWeekStart(d:Date){const w=new Date(d);w.setDate(w.getDate()-w.getDay());return w}

export default function Routine() {
  const { events, upcomingEvents, loading, init, addEvent, updateEvent, deleteEvent } = useCalendar();
  const [view, setView] = useState<CalendarView>('month');
  const [current, setCurrent] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  useEffect(() => { init(); }, []);

  function prevPeriod() { const d=new Date(current); if(view==='month') d.setMonth(d.getMonth()-1); else d.setDate(d.getDate()-7); setCurrent(d); }
  function nextPeriod() { const d=new Date(current); if(view==='month') d.setMonth(d.getMonth()+1); else d.setDate(d.getDate()+7); setCurrent(d); }

  function getTitle() {
    if(view==='month') return `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
    const ws=getWeekStart(current); const we=new Date(ws); we.setDate(we.getDate()+6);
    return `${ws.getDate()} – ${we.getDate()} ${MONTHS[we.getMonth()].slice(0,3)}`;
  }

  function openNew(date?:string) { setSelectedEvent(null); setSelectedDate(date); setModalOpen(true); }
  function openEdit(ev:CalendarEvent) { setSelectedEvent(ev); setSelectedDate(undefined); setModalOpen(true); }

  async function handleSave(data: Omit<CalendarEvent,'id'|'googleEventId'>) {
    if(selectedEvent) await updateEvent(selectedEvent.id, data);
    else await addEvent(data);
  }

  if(loading) return <PageWrapper><PageTitle>Carregando...</PageTitle></PageWrapper>;

  return (
    <PageWrapper>
      <PageTitle>Rotina</PageTitle>
      <SectionTitle>Próximos eventos</SectionTitle>
      <UpcomingEvents events={upcomingEvents} onSelect={openEdit} />
      <CalHeader>
        <CalNav>
          <NavBtn onClick={prevPeriod}>‹</NavBtn>
          <CalTitle>{getTitle()}</CalTitle>
          <NavBtn onClick={nextPeriod}>›</NavBtn>
          <NavBtn style={{fontSize:'0.7rem'}} onClick={()=>setCurrent(new Date())}>Hoje</NavBtn>
        </CalNav>
        <CalActions>
          <ViewToggle>
            <ViewBtn active={view==='month'} onClick={()=>setView('month')}>Mês</ViewBtn>
            <ViewBtn active={view==='week'} onClick={()=>setView('week')}>Semana</ViewBtn>
          </ViewToggle>
          <AddBtn onClick={()=>openNew()}>+ Evento</AddBtn>
        </CalActions>
      </CalHeader>
      {view==='month'
        ? <MonthView year={current.getFullYear()} month={current.getMonth()} events={events} onDayClick={openNew} onEventClick={openEdit} />
        : <WeekView weekStart={getWeekStart(current)} events={events} onSlotClick={openNew} onEventClick={openEdit} />
      }
      <EventModal open={modalOpen} event={selectedEvent} initialDate={selectedDate} onClose={()=>setModalOpen(false)} onSave={handleSave} onDelete={deleteEvent} />
    </PageWrapper>
  );
}
