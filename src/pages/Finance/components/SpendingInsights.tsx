import React from 'react';
import { Transaction } from '../types';
import {
  InsightsCard,
  InsightsGrid,
  InsightsSection,
  InsightsSectionTitle,
  CategoryRow,
  CategoryName,
  BarTrack,
  BarFill,
  CategoryPct,
  BigExpenseCard,
  BigExpenseLabel,
  BigExpenseDesc,
  BigExpenseMeta,
} from './styles';

interface SpendingInsightsProps {
  expenses: Transaction[];
  income: number;
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function SpendingInsights({ expenses, income }: SpendingInsightsProps) {
  if (expenses.length === 0) return null;

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);

  // Group by category
  const byCategory = expenses.reduce<Record<string, number>>((acc, t) => {
    acc[t.category] = (acc[t.category] ?? 0) + t.amount;
    return acc;
  }, {});

  const categories = Object.entries(byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6); // top 6

  // Biggest single expense
  const biggest = [...expenses].sort((a, b) => b.amount - a.amount)[0];
  const biggestPctIncome = income > 0 ? (biggest.amount / income) * 100 : 0;

  return (
    <InsightsCard>
      <InsightsGrid>
        <InsightsSection>
          <InsightsSectionTitle>Gastos por categoria</InsightsSectionTitle>
          {categories.map(([cat, amount]) => {
            const pct = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
            return (
              <CategoryRow key={cat}>
                <CategoryName title={cat}>{cat}</CategoryName>
                <BarTrack>
                  <BarFill pct={pct} />
                </BarTrack>
                <CategoryPct>{Math.round(pct)}%</CategoryPct>
              </CategoryRow>
            );
          })}
        </InsightsSection>

        <InsightsSection>
          <InsightsSectionTitle>Maior gasto</InsightsSectionTitle>
          <BigExpenseCard>
            <BigExpenseLabel>{biggest.category} · {biggest.date.split('-').reverse().join('/')}</BigExpenseLabel>
            <BigExpenseDesc title={biggest.description}>{biggest.description}</BigExpenseDesc>
            <BigExpenseMeta>
              {fmt(biggest.amount)}
              {income > 0 && ` · ${biggestPctIncome.toFixed(1)}% da receita`}
            </BigExpenseMeta>
          </BigExpenseCard>
        </InsightsSection>
      </InsightsGrid>
    </InsightsCard>
  );
}
