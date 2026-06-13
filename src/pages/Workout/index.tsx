import React, { useState } from 'react';
import styled from 'styled-components';
import { useWorkout } from './hooks/useWorkout';
import WorkoutCard from './components/WorkoutCard';

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
`;

const PageTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
`;

const WorkoutList = styled.div`display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem;`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.25rem;
`;

const FormGrid = styled.div`display: grid; gap: 0.75rem;`;
const FormRow = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;`;
const Field = styled.div`display: flex; flex-direction: column; gap: 0.3rem;`;
const Label = styled.label`font-size: 0.72rem; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.06em;`;
const Input = styled.input`
  border: 1px solid #e5e5e5; border-radius: 4px; color: #111;
  font-size: 0.875rem; padding: 0.5rem 0.75rem; width: 100%;
  outline: none; background: #fff; font-family: inherit;
  &:focus { border-color: #2563eb; box-shadow: 0 0 0 2px rgba(37,99,235,0.1); }
`;
const SubmitBtn = styled.button`
  background: #111; border: none; border-radius: 4px; color: #fff;
  cursor: pointer; font-size: 0.875rem; font-weight: 500;
  padding: 0.55rem 1rem; width: fit-content; font-family: inherit;
  &:hover { opacity: 0.8; }
`;

export default function Workout() {
  const { workouts, loading, addWorkout, deleteWorkout, addExercise, deleteExercise } = useWorkout();
  const [name, setName] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');

  async function handleAdd() {
    if (!name.trim()) return;
    await addWorkout(name.trim(), muscleGroup.trim());
    setName(''); setMuscleGroup('');
  }

  if (loading) return <PageWrapper><PageTitle>Carregando...</PageTitle></PageWrapper>;

  return (
    <PageWrapper>
      <PageTitle>Treinos</PageTitle>

      {workouts.length > 0 && (
        <>
          <SectionTitle>Meus treinos</SectionTitle>
          <WorkoutList>
            {workouts.map((w) => (
              <WorkoutCard
                key={w.id}
                workout={w}
                onDelete={deleteWorkout}
                onAddExercise={addExercise}
                onDeleteExercise={deleteExercise}
              />
            ))}
          </WorkoutList>
        </>
      )}

      <SectionTitle>Novo treino</SectionTitle>
      <Card>
        <FormGrid>
          <FormRow>
            <Field><Label>Nome do treino</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Treino A" /></Field>
            <Field><Label>Grupo muscular</Label><Input value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)} placeholder="Ex: Peito e Tríceps" /></Field>
          </FormRow>
          <SubmitBtn type="button" onClick={handleAdd}>Criar treino</SubmitBtn>
        </FormGrid>
      </Card>
    </PageWrapper>
  );
}
