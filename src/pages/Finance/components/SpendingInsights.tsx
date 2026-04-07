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
  CategoryValue,
  BigExpenseCard,
  BigExpenseLabel,
  BigExpenseMeta,
  PaidProgressTrack,
  PaidProgressFill,
} from './styles';

interface SpendingInsightsProps {
  expenses: Transaction[];
  income: number;
  paidExpense: number;
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function SpendingInsights({ expenses, income, paidExpense }: SpendingInsightsProps) {
  if (expenses.length === 0) return null;

  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0);
  const paidPercent = totalExpense > 0 ? Math.round((paidExpense / totalExpense) * 100) : 0;

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

  const barColors = ['#334155', '#475569', '#64748b', '#94a3b8', '#94a3b8', '#94a3b8'];

  return (
    <InsightsCard>
      <InsightsGrid>
        <InsightsSection>
          <InsightsSectionTitle>Gastos por categoria</InsightsSectionTitle>
          {categories.map(([cat, catAmount], index) => {
            const pct = totalExpense > 0 ? (catAmount / totalExpense) * 100 : 0;
            return (
              <CategoryRow key={cat}>
                <CategoryName title={cat}>{cat}</CategoryName>
                <BarTrack>
                  <BarFill pct={pct} color={barColors[index]} />
                </BarTrack>
                <CategoryValue>{fmt(catAmount)}</CategoryValue>
              </CategoryRow>
            );
          })}
        </InsightsSection>

        <InsightsSection>
          <InsightsSectionTitle>Maior gasto</InsightsSectionTitle>
          <BigExpenseCard>
            <BigExpenseLabel>{biggest.category} · {biggest.date.split('-').reverse().join('/')}</BigExpenseLabel>
            <BigExpenseMeta style={{ color: '#111', fontSize: '0.9rem', fontWeight: 500, margin: '0.1rem 0' }}>
              {biggest.description}
            </BigExpenseMeta>
            <BigExpenseMeta>
              {fmt(biggest.amount)}
              {income > 0 && ` · ${biggestPctIncome.toFixed(1)}% da receita`}
            </BigExpenseMeta>
          </BigExpenseCard>

          <InsightsSectionTitle style={{ marginTop: '1rem' }}>Contas pagas</InsightsSectionTitle>
          <BigExpenseCard>
            <BigExpenseLabel style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{fmt(paidExpense)} de {fmt(totalExpense)}</span>
              <span style={{ fontWeight: 600, color: paidPercent >= 100 ? '#16a34a' : '#555' }}>{paidPercent}%</span>
            </BigExpenseLabel>
            <PaidProgressTrack>
              <PaidProgressFill pct={paidPercent} />
            </PaidProgressTrack>
            <BigExpenseMeta style={{ color: '#16a34a' }}>
              {totalExpense - paidExpense > 0 ? `${fmt(totalExpense - paidExpense)} restantes` : 'Tudo pago!'}
            </BigExpenseMeta>
          </BigExpenseCard>
        </InsightsSection>
      </InsightsGrid>
    </InsightsCard>
  );
}
