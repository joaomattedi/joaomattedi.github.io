export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO date string YYYY-MM-DD
  isFixed?: boolean; // only for expenses
  createdAt?: number; // ms timestamp for insertion-order sorting
}

export const EXPENSE_CATEGORIES = [
  'Mercado',
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Roupas',
  'Assinaturas',
  'Outros',
] as const;

export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Presente',
  'Outros',
] as const;
