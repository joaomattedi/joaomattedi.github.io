import React, { useState } from 'react';
import styled from 'styled-components';
import { useDiet } from './hooks/useDiet';
import MealCard from './components/MealCard';
import MacrosSummary from './components/MacrosSummary';
import UnitConverter from './components/UnitConverter';
import { Unit } from './types';

const PageWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
`;

const PageTitle = styled.h1`
  font-size: 1.1rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.25rem;
`;

const FormGrid = styled.div`display: grid; gap: 0.75rem;`;
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

export default function Diet() {
  const { meals, loading, addMeal, deleteMeal, addFood, deleteFood } = useDiet();
  const [displayUnit, setDisplayUnit] = useState<Unit>('g');
  const [mealName, setMealName] = useState('');

  async function handleAddMeal() {
    if (!mealName.trim()) return;
    await addMeal(mealName.trim());
    setMealName('');
  }

  if (loading) return <PageWrapper><PageTitle>Carregando...</PageTitle></PageWrapper>;

  return (
    <PageWrapper>
      <PageTitle>Dieta</PageTitle>

      <UnitConverter value={displayUnit} onChange={setDisplayUnit} />

      <SectionTitle>Total do dia</SectionTitle>
      <MacrosSummary meals={meals} />

      {meals.length > 0 && (
        <>
          <SectionTitle>Refeições</SectionTitle>
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              displayUnit={displayUnit}
              onDelete={deleteMeal}
              onAddFood={addFood}
              onDeleteFood={deleteFood}
            />
          ))}
        </>
      )}

      <SectionTitle style={{ marginTop: meals.length > 0 ? '1.5rem' : 0 }}>Nova refeição</SectionTitle>
      <Card>
        <FormGrid>
          <Field><Label>Nome da refeição</Label><Input value={mealName} onChange={(e) => setMealName(e.target.value)} placeholder="Ex: Café da manhã" /></Field>
          <SubmitBtn type="button" onClick={handleAddMeal}>Criar refeição</SubmitBtn>
        </FormGrid>
      </Card>
    </PageWrapper>
  );
}
