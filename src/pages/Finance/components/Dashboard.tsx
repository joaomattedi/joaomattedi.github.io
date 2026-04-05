import React from 'react';
import { CardsRow, SummaryCard, CardLabel, CardValue } from './styles';

interface DashboardProps {
  income: number;
  expense: number;
  balance: number;
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Dashboard({ income, expense, balance }: DashboardProps) {
  return (
    <CardsRow>
      <SummaryCard>
        <CardLabel>Receitas</CardLabel>
        <CardValue variant="income">{fmt(income)}</CardValue>
      </SummaryCard>
      <SummaryCard>
        <CardLabel>Despesas</CardLabel>
        <CardValue variant="expense">{fmt(expense)}</CardValue>
      </SummaryCard>
      <SummaryCard>
        <CardLabel>Saldo</CardLabel>
        <CardValue variant="balance">{fmt(balance)}</CardValue>
      </SummaryCard>
    </CardsRow>
  );
}
