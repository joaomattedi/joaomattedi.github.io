export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
}

export interface Workout {
  id: string;
  name: string;
  muscleGroup: string;
  exercises: Exercise[];
  createdAt: number;
}
