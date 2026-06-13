import React from 'react';
import styled from 'styled-components';
import { Unit, UNIT_LABELS } from '../types';

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const ConverterLabel = styled.span`
  font-size: 0.75rem;
  color: #888;
  white-space: nowrap;
`;

const UnitBtn = styled.button<{ active: boolean }>`
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid ${({ active }) => (active ? '#111' : '#e5e5e5')};
  background: ${({ active }) => (active ? '#111' : 'none')};
  color: ${({ active }) => (active ? '#fff' : '#666')};
  cursor: pointer;
  transition: all 0.1s;
  font-family: inherit;
`;

const UNITS: Unit[] = ['g', 'ml', 'cs', 'cc', 'xic', 'un'];

interface Props {
  value: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitConverter({ value, onChange }: Props) {
  return (
    <Bar>
      <ConverterLabel>Visualizar em:</ConverterLabel>
      {UNITS.map((u) => (
        <UnitBtn key={u} active={value === u} onClick={() => onChange(u)}>
          {UNIT_LABELS[u]}
        </UnitBtn>
      ))}
    </Bar>
  );
}
