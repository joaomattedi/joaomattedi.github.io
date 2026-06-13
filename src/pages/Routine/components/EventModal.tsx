import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CalendarEvent, EVENT_COLORS } from '../types';

const Overlay = styled.div<{ open: boolean }>`
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: flex-end; justify-content: center;
  z-index: 100; opacity: ${({ open }) => open ? 1 : 0};
  pointer-events: ${({ open }) => open ? 'all' : 'none'}; transition: opacity 0.15s;
  @media(min-width:480px){ align-items: center; padding: 1rem; }
`;

const Modal = styled.div`
  background: #fff; border-radius: 16px 16px 0 0; padding: 1.25rem;
  width: 100%; display: grid; gap: 0.65rem; max-height: 92vh; overflow-y: auto;
  @media(min-width:480px){ border-radius: 8px; max-width: 420px; }
`;

const Handle = styled.div`width:36px;height:4px;background:#e5e5e5;border-radius:99px;margin:0 auto 0.5rem;@media(min-width:480px){display:none}`;
const Header = styled.div`display:flex;align-items:center;justify-content:space-between`;
const Title = styled.p`font-size:0.95rem;font-weight:600;color:#111`;
const CloseBtn = styled.button`background:none;border:none;color:#aaa;cursor:pointer;font-size:1.2rem;&:hover{color:#111}`;
const Field = styled.div`display:flex;flex-direction:column;gap:0.3rem`;
const Label = styled.label`font-size:0.7rem;font-weight:600;color:#888;text-transform:uppercase;letter-spacing:0.06em`;
const Input = styled.input`border:1px solid #e5e5e5;border-radius:4px;color:#111;font-size:0.875rem;padding:0.5rem 0.75rem;width:100%;outline:none;background:#fff;font-family:inherit;&:focus{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,0.1)}`;
const TextArea = styled.textarea`border:1px solid #e5e5e5;border-radius:4px;color:#111;font-size:0.875rem;padding:0.5rem 0.75rem;width:100%;outline:none;background:#fff;font-family:inherit;resize:vertical;min-height:70px;&:focus{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,0.1)}`;
const Row = styled.div`display:grid;grid-template-columns:1fr 1fr;gap:0.65rem`;
const ColorRow = styled.div`display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap`;
const ColorDot = styled.button<{ color: string; selected: boolean }>`width:24px;height:24px;border-radius:50%;cursor:pointer;background:${({ color }) => color};border:2px solid ${({ selected }) => selected ? '#111' : 'transparent'};padding:0;transition:border-color 0.1s`;
const Actions = styled.div`display:flex;gap:0.5rem;justify-content:flex-end;margin-top:0.25rem`;
const BtnCancel = styled.button`background:none;border:1px solid #e5e5e5;border-radius:4px;color:#555;cursor:pointer;font-size:0.875rem;padding:0.5rem 1rem;font-family:inherit;&:hover{background:#f5f5f5}`;
const BtnDelete = styled.button`background:none;border:1px solid #fecaca;border-radius:4px;color:#dc2626;cursor:pointer;font-size:0.875rem;padding:0.5rem 1rem;font-family:inherit;&:hover{background:#fef2f2}`;
const BtnSave = styled.button`background:#111;border:none;border-radius:4px;color:#fff;cursor:pointer;font-size:0.875rem;font-weight:500;padding:0.5rem 1rem;font-family:inherit;flex:1;&:hover{opacity:0.8}@media(min-width:480px){flex:none}`;

function todayStr() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

interface Props {
  open: boolean; event?: CalendarEvent | null; initialDate?: string;
  onClose: () => void;
  onSave: (data: Omit<CalendarEvent, 'id' | 'googleEventId'>) => void;
  onDelete?: (id: string) => void;
}

export default function EventModal({ open, event, initialDate, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(todayStr());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(EVENT_COLORS[0]);

  useEffect(() => {
    if (event) { setTitle(event.title); setDate(event.date); setStartTime(event.startTime || '08:00'); setEndTime(event.endTime || '09:00'); setDescription(event.description || ''); setColor(event.color); }
    else { setTitle(''); setDate(initialDate || todayStr()); setStartTime('08:00'); setEndTime('09:00'); setDescription(''); setColor(EVENT_COLORS[0]); }
  }, [event, initialDate, open]);

  function handleSave() {
    if (!title.trim()) return;
    onSave({ title: title.trim(), date, startTime, endTime, description, color });
    onClose();
  }

  return (
    <Overlay open={open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <Handle />
        <Header><Title>{event ? 'Editar evento' : 'Novo evento'}</Title><CloseBtn onClick={onClose}>×</CloseBtn></Header>
        <Field><Label>Título</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Academia" /></Field>
        <Field><Label>Data</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></Field>
        <Row>
          <Field><Label>Início</Label><Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /></Field>
          <Field><Label>Fim</Label><Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></Field>
        </Row>
        <Field><Label>Cor</Label><ColorRow>{EVENT_COLORS.map((c) => <ColorDot key={c} color={c} selected={color === c} onClick={() => setColor(c)} />)}</ColorRow></Field>
        <Field><Label>Descrição</Label><TextArea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Opcional" /></Field>
        <Actions>
          {event && onDelete && <BtnDelete onClick={() => { onDelete(event.id); onClose(); }}>Excluir</BtnDelete>}
          <BtnCancel onClick={onClose}>Cancelar</BtnCancel>
          <BtnSave onClick={handleSave}>Salvar</BtnSave>
        </Actions>
      </Modal>
    </Overlay>
  );
}
