import React, { useState, useEffect, useRef } from 'react';
import { useFinance } from './hooks/useFinance';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import EditModal from './components/EditModal';
import {
  PageWrapper,
  PageTitle,
  Section,
  SectionTitle,
  TwoColumns,
  Column,
  MonthRow,
  MonthButton,
  MonthLabel,
  SortRow,
  SortLabel,
  SortSelect,
  SortDirButton,
} from './components/styles';
import { Transaction } from './types';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

type SortField = 'date' | 'createdAt';
type SortDir = 'asc' | 'desc';

function sortTransactions(list: Transaction[], field: SortField, dir: SortDir) {
  return [...list].sort((a, b) => {
    let aVal: number;
    let bVal: number;
    if (field === 'date') {
      aVal = new Date(a.date + 'T00:00:00').getTime();
      bVal = new Date(b.date + 'T00:00:00').getTime();
    } else {
      // fall back to date for entries without createdAt
      aVal = a.createdAt ?? new Date(a.date + 'T00:00:00').getTime();
      bVal = b.createdAt ?? new Date(b.date + 'T00:00:00').getTime();
    }
    return dir === 'asc' ? aVal - bVal : bVal - aVal;
  });
}

export default function Finance() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const { loading, addTransaction, updateTransaction, deleteTransaction, getByMonth, getTotals, seedFixedExpenses } = useFinance();

  const monthTransactions = getByMonth(year, month);
  const sorted = sortTransactions(monthTransactions, sortField, sortDir);
  const incomeTransactions = sorted.filter((t) => t.type === 'income');
  const expenseTransactions = sorted.filter((t) => t.type === 'expense');
  const { income, expense, balance } = getTotals(monthTransactions);

  const isFirstLoad = useRef(true);
  useEffect(() => {
    if (loading) return;
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    seedFixedExpenses(year, month);
  }, [year, month, loading]);

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  if (loading) return <PageWrapper><PageTitle>Carregando...</PageTitle></PageWrapper>;

  return (
    <PageWrapper>
      <PageTitle>Finanças</PageTitle>

      <Section>
        <MonthRow>
          <MonthButton type="button" onClick={prevMonth}>‹</MonthButton>
          <MonthLabel>{MONTHS[month - 1]} {year}</MonthLabel>
          <MonthButton type="button" onClick={nextMonth}>›</MonthButton>
        </MonthRow>
        <Dashboard income={income} expense={expense} balance={balance} />
      </Section>

      <Section>
        <SectionTitle>Nova transação</SectionTitle>
        <TransactionForm onAdd={addTransaction} />
      </Section>

      <SortRow>
        <SortLabel>Ordenar por</SortLabel>
        <SortSelect value={sortField} onChange={(e) => setSortField(e.target.value as SortField)}>
          <option value="date">Data da transação</option>
          <option value="createdAt">Horário de cadastro</option>
        </SortSelect>
        <SortDirButton
          type="button"
          onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
          title={sortDir === 'asc' ? 'Mais antigo primeiro' : 'Mais recente primeiro'}
        >
          {sortDir === 'asc' ? '↑' : '↓'}
        </SortDirButton>
      </SortRow>

      <TwoColumns>
        <Column>
          <SectionTitle>Receitas</SectionTitle>
          <TransactionList
            type="income"
            transactions={incomeTransactions}
            onEdit={setEditing}
            onDelete={deleteTransaction}
          />
        </Column>
        <Column>
          <SectionTitle>Despesas</SectionTitle>
          <TransactionList
            type="expense"
            transactions={expenseTransactions}
            onEdit={setEditing}
            onDelete={deleteTransaction}
          />
        </Column>
      </TwoColumns>

      {editing && (
        <EditModal
          transaction={editing}
          onSave={updateTransaction}
          onClose={() => setEditing(null)}
        />
      )}
    </PageWrapper>
  );
}
