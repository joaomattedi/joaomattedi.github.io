import { useState, useEffect } from 'react';
import { db } from '../../../lib/firebase';
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore';
import { Workout, Exercise } from '../types';

export function useWorkout() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'workouts'), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Workout));
      setWorkouts(data.sort((a, b) => a.createdAt - b.createdAt));
      setLoading(false);
    });
    return unsub;
  }, []);

  async function addWorkout(name: string, muscleGroup: string) {
    await addDoc(collection(db, 'workouts'), {
      name,
      muscleGroup,
      exercises: [],
      createdAt: Date.now(),
    });
  }

  async function deleteWorkout(id: string) {
    await deleteDoc(doc(db, 'workouts', id));
  }

  async function addExercise(workoutId: string, exercise: Omit<Exercise, 'id'>) {
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) return;
    const newExercise: Exercise = { ...exercise, id: crypto.randomUUID() };
    await updateDoc(doc(db, 'workouts', workoutId), {
      exercises: [...workout.exercises, newExercise],
    });
  }

  async function deleteExercise(workoutId: string, exerciseId: string) {
    const workout = workouts.find((w) => w.id === workoutId);
    if (!workout) return;
    await updateDoc(doc(db, 'workouts', workoutId), {
      exercises: workout.exercises.filter((e) => e.id !== exerciseId),
    });
  }

  return { workouts, loading, addWorkout, deleteWorkout, addExercise, deleteExercise };
}
