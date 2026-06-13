import React, { useState } from 'react';
import styled from 'styled-components';
import { Food, Unit, UNIT_LABELS } from '../types';

const Wrapper = styled.div`
  background: #f9f9f9;
  border: 1px dashed #e5e5e5;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 0.75rem;
`;

const Title = styled.p`
  font-size: 0.72rem; font-weight: 600; color: #888;
  text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem;
`;

const Grid = styled.div`display: grid; gap: 0.75rem;`;
const Row = styled.div<{ cols?: number }>`
  display: grid;
  grid-template-columns: ${({ cols }) => cols === 2 ? '1fr 1fr' : '1fr 1fr 1fr'};
  gap: 0.75rem;
`;

const Field = styled.div`display: flex; flex-direction: column; gap: 0.3rem;`;
const Label = styled.label`
  font-size: 0.72rem; font-weight: 600; color: #888;
  text-transform: uppercase; letter-spacing: 0.06em;
`;

const baseInput = `
  border: 1px solid #e5e5e5; border-radius: 4px; color: #111;
  font-size: 0.875rem; padding: 0.5rem 0.75rem; width: 100%;
  outline: none; background: #fff; font-family: inherit;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;

const Input = styled.input`
  ${baseInput}
  &[type=number] { -moz-appearance: textfield; }
  &[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
`;

const Select = styled.select`${baseInput} cursor: pointer;`;

const AddBtn = styled.button`
  background: #111; border: none; border-radius: 4px; color: #fff;
  cursor: pointer; font-size: 0.75rem; font-weight: 500;
  padding: 0.3rem 0.7rem; width: fit-content; font-family: inherit;
  &:hover { opacity: 0.8; }
`;

interface Props { onAdd: (food: Omit<Food, 'id'>) => void; }

export default function FoodForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<Unit>('g');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [calories, setCalories] = useState('');

  function handleSubmit() {
    if (!name.trim() || !quantity) return;
    onAdd({
      name: name.trim(),
      quantity: Number(quantity),
      unit,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      calories: Number(calories) || 0,
    });
    setName(''); setQuantity(''); setProtein(''); setCarbs(''); setFat(''); setCalories('');
  }

  return (
    <Wrapper>
      <Title>+ Adicionar alimento</Title>
      <Grid>
        <Field><Label>Nome do alimento</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Arroz integral" /></Field>
        <Row cols={2}>
          <Field><Label>Quantidade</Label><Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="100" /></Field>
          <Field>
            <Label>Unidade</Label>
            <Select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
              {(Object.entries(UNIT_LABELS) as [Unit, string][]).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field><Label>Proteína (g)</Label><Input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="0" /></Field>
          <Field><Label>Carboidrato (g)</Label><Input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="0" /></Field>
          <Field><Label>Gordura (g)</Label><Input type="number" value={fat} onChange={(e) => setFat(e.target.value)} placeholder="0" /></Field>
        </Row>
        <Field><Label>Calorias (kcal)</Label><Input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="0" /></Field>
        <AddBtn type="button" onClick={handleSubmit}>Adicionar</AddBtn>
      </Grid>
    </Wrapper>
  );
}
