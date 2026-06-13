import React from 'react';
import styled from 'styled-components';
import { Workout, Exercise } from '../types';
import ExerciseForm from './ExerciseForm';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Info = styled.div``;
const CardTitle = styled.p`font-size: 0.95rem; font-weight: 600; color: #111;`;
const CardMeta = styled.p`font-size: 0.8rem; color: #888; margin-top: 0.1rem;`;

const DeleteBtn = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #888;
  cursor: pointer;
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  font-family: inherit;
  &:hover { border-color: #dc2626; color: #dc2626; }
`;

const ExerciseList = styled.div`display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.5rem;`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 0.6rem 0.75rem;
`;

const ExerciseInfo = styled.div`flex: 1;`;
const ExerciseName = styled.p`font-size: 0.875rem; font-weight: 500; color: #111;`;
const ExerciseMeta = styled.p`font-size: 0.75rem; color: #888; margin-top: 0.1rem;`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 0.25rem;
  &:hover { color: #dc2626; }
`;

interface Props {
  workout: Workout;
  onDelete: (id: string) => void;
  onAddExercise: (workoutId: string, exercise: Omit<Exercise, 'id'>) => void;
  onDeleteExercise: (workoutId: string, exerciseId: string) => void;
}

export default function WorkoutCard({ workout, onDelete, onAddExercise, onDeleteExercise }: Props) {
  return (
    <Card>
      <Header>
        <Info>
          <CardTitle>{workout.name}{workout.muscleGroup ? ` — ${workout.muscleGroup}` : ''}</CardTitle>
          <CardMeta>{workout.exercises.length} exercício{workout.exercises.length !== 1 ? 's' : ''}</CardMeta>
        </Info>
        <DeleteBtn onClick={() => onDelete(workout.id)}>Excluir</DeleteBtn>
      </Header>

      {workout.exercises.length > 0 && (
        <ExerciseList>
          {workout.exercises.map((ex) => (
            <ExerciseItem key={ex.id}>
              <ExerciseInfo>
                <ExerciseName>{ex.name}</ExerciseName>
                <ExerciseMeta>
                  {ex.sets} séries · {ex.reps} reps{ex.weight ? ` · ${ex.weight} kg` : ''}
                </ExerciseMeta>
              </ExerciseInfo>
              <RemoveBtn onClick={() => onDeleteExercise(workout.id, ex.id)}>✕</RemoveBtn>
            </ExerciseItem>
          ))}
        </ExerciseList>
      )}

      <ExerciseForm onAdd={(ex) => onAddExercise(workout.id, ex)} />
    </Card>
  );
}
