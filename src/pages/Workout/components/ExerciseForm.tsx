import React, { useState } from 'react';
import styled from 'styled-components';
import { Exercise } from '../types';

const Wrapper = styled.div`
  background: #f9f9f9;
  border: 1px dashed #e5e5e5;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 0.75rem;
`;

const Title = styled.p`
  font-size: 0.72rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.75rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.75rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  font-size: 0.72rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const Input = styled.input`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  outline: none;
  background: #fff;
  font-family: inherit;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
  &[type=number] { -moz-appearance: textfield; }
  &[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
`;

const AddBtn = styled.button`
  background: #111;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  width: fit-content;
  font-family: inherit;
  &:hover { opacity: 0.8; }
`;

interface Props {
  onAdd: (exercise: Omit<Exercise, 'id'>) => void;
}

export default function ExerciseForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  function handleSubmit() {
    if (!name.trim() || !sets || !reps) return;
    onAdd({
      name: name.trim(),
      sets: Number(sets),
      reps: Number(reps),
      weight: weight ? Number(weight) : undefined,
    });
    setName(''); setSets(''); setReps(''); setWeight('');
  }

  return (
    <Wrapper>
      <Title>+ Adicionar exercício</Title>
      <Grid>
        <Field>
          <Label>Nome do exercício</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Supino Reto" />
        </Field>
        <Row>
          <Field>
            <Label>Séries</Label>
            <Input type="number" value={sets} onChange={(e) => setSets(e.target.value)} placeholder="4" />
          </Field>
          <Field>
            <Label>Repetições</Label>
            <Input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="10" />
          </Field>
          <Field>
            <Label>Carga (kg)</Label>
            <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Opcional" />
          </Field>
        </Row>
        <AddBtn type="button" onClick={handleSubmit}>Adicionar</AddBtn>
      </Grid>
    </Wrapper>
  );
}
