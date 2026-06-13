import React from 'react';
import styled from 'styled-components';
import { Meal } from '../types';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MacroCard = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
`;

const MacroLabel = styled.p`
  font-size: 0.65rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.25rem;
`;

const MacroValue = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: #111;
`;

const MacroUnit = styled.span`
  font-size: 0.65rem;
  color: #888;
  font-weight: 400;
`;

interface Props { meals: Meal[]; }

export default function MacrosSummary({ meals }: Props) {
  const totals = meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((f) => {
        acc.calories += f.calories;
        acc.protein += f.protein;
        acc.carbs += f.carbs;
        acc.fat += f.fat;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <Row>
      <MacroCard>
        <MacroLabel>Calorias</MacroLabel>
        <MacroValue>{Math.round(totals.calories)}<MacroUnit> kcal</MacroUnit></MacroValue>
      </MacroCard>
      <MacroCard>
        <MacroLabel>Proteína</MacroLabel>
        <MacroValue>{Math.round(totals.protein)}<MacroUnit> g</MacroUnit></MacroValue>
      </MacroCard>
      <MacroCard>
        <MacroLabel>Carboidrato</MacroLabel>
        <MacroValue>{Math.round(totals.carbs)}<MacroUnit> g</MacroUnit></MacroValue>
      </MacroCard>
      <MacroCard>
        <MacroLabel>Gordura</MacroLabel>
        <MacroValue>{Math.round(totals.fat)}<MacroUnit> g</MacroUnit></MacroValue>
      </MacroCard>
    </Row>
  );
}
