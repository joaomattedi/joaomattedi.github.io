import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../types';

const Grid = styled.div`background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden`;
const Weekdays = styled.div`display:grid;grid-template-columns:repeat(7,1fr);background:#f9f9f9;border-bottom:1px solid #e5e5e5`;
const Weekday = styled.div`font-size:0.62rem;font-weight:600;color:#888;text-transform:uppercase;padding:0.5rem 0;text-align:center`;
const DaysGrid = styled.div`display:grid;grid-template-columns:repeat(7,1fr)`;
const DayCell = styled.div`min-height:52px;border-right:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;padding:0.3rem;cursor:pointer;transition:background 0.1s;&:hover{background:#fafafa}&:nth-child(7n){border-right:none}@media(min-width:480px){min-height:80px}`;
const DayNum = styled.div<{ today?: boolean; other?: boolean }>`font-size:0.72rem;font-weight:500;color:${({ today, other }) => today ? '#fff' : other ? '#ccc' : '#555'};background:${({ today }) => today ? '#111' : 'transparent'};width:22px;height:22px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin-bottom:0.2rem`;
const DayEvent = styled.div<{ color: string }>`font-size:0.62rem;font-weight:500;background:${({ color }) => color+'22'};color:${({ color }) => color};padding:0.12rem 0.25rem;border-radius:3px;margin-bottom:0.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;@media(max-width:380px){font-size:0;padding:0;height:5px;border-radius:99px;background:${({ color }) => color}}`;

function pad(n: number){return String(n).padStart(2,'0')}
function ds(d: Date){return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`}

interface Props { year:number; month:number; events:CalendarEvent[]; onDayClick:(date:string)=>void; onEventClick:(ev:CalendarEvent)=>void; }

export default function MonthView({ year, month, events, onDayClick, onEventClick }: Props) {
  const todayS = ds(new Date());
  const first = new Date(year, month, 1);
  const last = new Date(year, month+1, 0);
  const cells: {date:Date;other:boolean}[] = [];
  for(let i=first.getDay()-1;i>=0;i--){const d=new Date(first);d.setDate(d.getDate()-i-1);cells.push({date:d,other:true})}
  for(let d=1;d<=last.getDate();d++) cells.push({date:new Date(year,month,d),other:false});
  for(let i=1;i<=42-cells.length;i++) cells.push({date:new Date(year,month+1,i),other:true});
  return (
    <Grid>
      <Weekdays>{['D','S','T','Q','Q','S','S'].map((d,i)=><Weekday key={i}>{d}</Weekday>)}</Weekdays>
      <DaysGrid>
        {cells.map(({date,other},i)=>{
          const s=ds(date); const evs=events.filter(e=>e.date===s);
          return (
            <DayCell key={i} onClick={()=>onDayClick(s)}>
              <DayNum today={s===todayS} other={other}>{date.getDate()}</DayNum>
              {evs.slice(0,3).map(ev=><DayEvent key={ev.id} color={ev.color} onClick={e=>{e.stopPropagation();onEventClick(ev)}}>{ev.title}</DayEvent>)}
            </DayCell>
          );
        })}
      </DaysGrid>
    </Grid>
  );
}
