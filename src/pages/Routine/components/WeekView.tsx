import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../types';

const Grid = styled.div`background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden`;
const Header = styled.div`display:grid;grid-template-columns:36px repeat(7,1fr);background:#f9f9f9;border-bottom:1px solid #e5e5e5`;
const DayLabel = styled.div`padding:0.4rem 0.2rem;text-align:center`;
const DayName = styled.div`font-size:0.6rem;font-weight:600;color:#888;text-transform:uppercase`;
const DayNum = styled.div<{ today?: boolean }>`font-size:0.85rem;font-weight:600;color:${({today})=>today?'#fff':'#555'};background:${({today})=>today?'#111':'transparent'};width:${({today})=>today?'26px':'auto'};height:${({today})=>today?'26px':'auto'};border-radius:${({today})=>today?'50%':'0'};display:flex;align-items:center;justify-content:center;margin:0.1rem auto 0`;
const Body = styled.div`display:grid;grid-template-columns:36px repeat(7,1fr);max-height:400px;overflow-y:auto`;
const TimeCol = styled.div`border-right:1px solid #f0f0f0`;
const TimeSlot = styled.div`height:40px;padding:0 0.25rem;display:flex;align-items:flex-start;padding-top:3px`;
const TimeLabel = styled.span`font-size:0.58rem;color:#bbb;white-space:nowrap`;
const DayCol = styled.div`border-right:1px solid #f0f0f0;position:relative;&:last-child{border-right:none}`;
const HourCell = styled.div`height:40px;border-bottom:1px solid #f8f8f8;cursor:pointer;&:hover{background:#fafafa}`;
const WeekEvent = styled.div<{ color:string; top:number }>`position:absolute;left:1px;right:1px;top:${({top})=>top}px;height:38px;border-radius:3px;padding:0.15rem 0.25rem;font-size:0.62rem;font-weight:500;overflow:hidden;cursor:pointer;background:${({color})=>color+'22'};color:${({color})=>color}`;

function pad(n:number){return String(n).padStart(2,'0')}
function ds(d:Date){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}

interface Props { weekStart:Date; events:CalendarEvent[]; onSlotClick:(date:string)=>void; onEventClick:(ev:CalendarEvent)=>void; }

export default function WeekView({ weekStart, events, onSlotClick, onEventClick }: Props) {
  const todayS = ds(new Date());
  const days = Array.from({length:7},(_,i)=>{const d=new Date(weekStart);d.setDate(d.getDate()+i);return d});
  const names = ['D','S','T','Q','Q','S','S'];
  return (
    <Grid>
      <Header>
        <div style={{borderRight:'1px solid #f0f0f0'}}/>
        {days.map((d,i)=><DayLabel key={i}><DayName>{names[d.getDay()]}</DayName><DayNum today={ds(d)===todayS}>{d.getDate()}</DayNum></DayLabel>)}
      </Header>
      <Body>
        <TimeCol>{Array.from({length:24},(_,h)=><TimeSlot key={h}><TimeLabel>{pad(h)}h</TimeLabel></TimeSlot>)}</TimeCol>
        {days.map((d,i)=>{
          const s=ds(d); const evs=events.filter(e=>e.date===s&&e.startTime);
          return (
            <DayCol key={i}>
              {Array.from({length:24},(_,h)=><HourCell key={h} onClick={()=>onSlotClick(s)}/>)}
              {evs.map(ev=>{const h=parseInt(ev.startTime!.split(':')[0]);return <WeekEvent key={ev.id} color={ev.color} top={h*40+1} onClick={e=>{e.stopPropagation();onEventClick(ev)}}>{ev.title}</WeekEvent>})}
            </DayCol>
          );
        })}
      </Body>
    </Grid>
  );
}
