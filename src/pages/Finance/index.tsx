import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
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
  ColumnHeader,
  SeedButton,
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
  const [seeding, setSeeding] = useState(false);

  const { logOut } = useAuth();
  const { loading, addTransaction, updateTransaction, deleteTransaction, getByMonth, getTotals, seedFixedExpenses } = useFinance();

  const monthTransactions = getByMonth(year, month);
  const sorted = sortTransactions(monthTransactions, sortField, sortDir);
  const incomeTransactions = sorted.filter((t) => t.type === 'income');
  const expenseTransactions = sorted.filter((t) => t.type === 'expense');
  const { income, expense, balance } = getTotals(monthTransactions);

  function prevMonth() {
    if (month === 1) { setMonth(12); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 12) { setMonth(1); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  async function handleSeedFixed() {
    setSeeding(true);
    await seedFixedExpenses(year, month);
    setSeeding(false);
  }

  if (loading) return <PageWrapper><PageTitle>Carregando...</PageTitle></PageWrapper>;

  return (
    <PageWrapper>
      <ColumnHeader style={{ marginBottom: '2rem' }}>
        <PageTitle style={{ margin: 0 }}>Finanças</PageTitle>
        <SeedButton type="button" onClick={logOut}>Sair</SeedButton>
      </ColumnHeader>

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
          <ColumnHeader>
            <SectionTitle style={{ margin: 0 }}>Despesas</SectionTitle>
            <SeedButton type="button" onClick={handleSeedFixed} disabled={seeding}>
              {seeding ? 'Adicionando...' : '+ Despesas fixas'}
            </SeedButton>
          </ColumnHeader>
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
