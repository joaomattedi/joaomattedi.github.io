import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Meal, Food } from '../types';

export function useDiet(uid: string) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    const unsub = onSnapshot(collection(db, 'users', uid, 'meals'), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Meal));
      setMeals(data.sort((a, b) => a.createdAt - b.createdAt));
      setLoading(false);
    });
    return unsub;
  }, [uid]);

  async function addMeal(name: string) {
    await addDoc(collection(db, 'users', uid, 'meals'), { name, foods: [], createdAt: Date.now() });
  }

  async function deleteMeal(id: string) {
    await deleteDoc(doc(db, 'users', uid, 'meals', id));
  }

  async function addFood(mealId: string, food: Omit<Food, 'id'>) {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;
    const newFood: Food = { ...food, id: crypto.randomUUID() };
    await updateDoc(doc(db, 'users', uid, 'meals', mealId), { foods: [...meal.foods, newFood] });
  }

  async function deleteFood(mealId: string, foodId: string) {
    const meal = meals.find((m) => m.id === mealId);
    if (!meal) return;
    await updateDoc(doc(db, 'users', uid, 'meals', mealId), {
      foods: meal.foods.filter((f) => f.id !== foodId),
    });
  }

  return { meals, loading, addMeal, deleteMeal, addFood, deleteFood };
}
