export type Unit = 'g' | 'ml' | 'cs' | 'cc' | 'xic' | 'un';

export const UNIT_LABELS: Record<Unit, string> = {
  g: 'g',
  ml: 'ml',
  cs: 'col. sopa',
  cc: 'col. chá',
  xic: 'xícara',
  un: 'unidade',
};

// Conversion ratios to grams
export const UNIT_RATIOS: Record<Unit, number> = {
  g: 1,
  ml: 1,
  cs: 15,
  cc: 5,
  xic: 240,
  un: 100,
};

export interface Food {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Meal {
  id: string;
  name: string;
  foods: Food[];
  createdAt: number;
}
