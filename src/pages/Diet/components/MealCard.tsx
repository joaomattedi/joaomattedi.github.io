import React, { useState } from 'react';
import styled from 'styled-components';
import { Meal, Food, Unit, UNIT_LABELS, UNIT_RATIOS } from '../types';
import FoodForm from './FoodForm';

const Card = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  cursor: pointer;
  user-select: none;
`;

const MealTitle = styled.p`font-size: 0.9rem; font-weight: 600; color: #111;`;

const HeaderRight = styled.div`display: flex; align-items: center; gap: 0.75rem;`;

const MacroBadges = styled.div`display: flex; gap: 0.75rem;`;
const Badge = styled.span`font-size: 0.7rem; color: #888;`;
const BadgeValue = styled.span`font-weight: 600; color: #111;`;

const DeleteBtn = styled.button`
  background: none; border: none; color: #ccc; cursor: pointer;
  font-size: 0.8rem; padding: 0; &:hover { color: #dc2626; }
`;

const Chevron = styled.span<{ open: boolean }>`
  font-size: 0.75rem; color: #888;
  display: inline-block;
  transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s;
`;

const Body = styled.div`
  border-top: 1px solid #f0f0f0;
  padding: 0 1rem 1rem;
`;

const FoodList = styled.div`display: flex; flex-direction: column; margin-top: 0.75rem;`;

const FoodItem = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  font-size: 0.82rem; color: #555;
  padding: 0.4rem 0;
  border-bottom: 1px solid #f5f5f5;
  &:last-child { border-bottom: none; }
`;

const FoodName = styled.span`flex: 1;`;
const FoodQty = styled.span`color: #888; margin: 0 0.75rem; white-space: nowrap;`;
const RemoveBtn = styled.button`
  background: none; border: none; color: #ccc; cursor: pointer;
  font-size: 0.75rem; &:hover { color: #dc2626; }
`;

function convertQty(quantity: number, fromUnit: Unit, toUnit: Unit): string {
  if (fromUnit === toUnit) return `${quantity} ${UNIT_LABELS[toUnit]}`;
  const inGrams = quantity * UNIT_RATIOS[fromUnit];
  const converted = inGrams / UNIT_RATIOS[toUnit];
  return `${converted % 1 === 0 ? converted : converted.toFixed(1)} ${UNIT_LABELS[toUnit]}`;
}

interface Props {
  meal: Meal;
  displayUnit: Unit;
  onDelete: (id: string) => void;
  onAddFood: (mealId: string, food: Omit<Food, 'id'>) => void;
  onDeleteFood: (mealId: string, foodId: string) => void;
}

export default function MealCard({ meal, displayUnit, onDelete, onAddFood, onDeleteFood }: Props) {
  const [open, setOpen] = useState(true);

  const totals = meal.foods.reduce(
    (acc, f) => ({ calories: acc.calories + f.calories, protein: acc.protein + f.protein, carbs: acc.carbs + f.carbs, fat: acc.fat + f.fat }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <Card>
      <Header onClick={() => setOpen((o) => !o)}>
        <MealTitle>{meal.name}</MealTitle>
        <HeaderRight>
          <MacroBadges>
            <Badge>Cal: <BadgeValue>{Math.round(totals.calories)}</BadgeValue></Badge>
            <Badge>P: <BadgeValue>{Math.round(totals.protein)}g</BadgeValue></Badge>
            <Badge>C: <BadgeValue>{Math.round(totals.carbs)}g</BadgeValue></Badge>
            <Badge>G: <BadgeValue>{Math.round(totals.fat)}g</BadgeValue></Badge>
          </MacroBadges>
          <DeleteBtn onClick={(e) => { e.stopPropagation(); onDelete(meal.id); }}>✕</DeleteBtn>
          <Chevron open={open}>▼</Chevron>
        </HeaderRight>
      </Header>

      {open && (
        <Body>
          {meal.foods.length > 0 && (
            <FoodList>
              {meal.foods.map((food) => (
                <FoodItem key={food.id}>
                  <FoodName>{food.name}</FoodName>
                  <FoodQty>{convertQty(food.quantity, food.unit, displayUnit)}</FoodQty>
                  <RemoveBtn onClick={() => onDeleteFood(meal.id, food.id)}>✕</RemoveBtn>
                </FoodItem>
              ))}
            </FoodList>
          )}
          <FoodForm onAdd={(food) => onAddFood(meal.id, food)} />
        </Body>
      )}
    </Card>
  );
}
