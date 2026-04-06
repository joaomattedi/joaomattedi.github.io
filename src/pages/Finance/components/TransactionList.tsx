import React from 'react';
import {
  TableWrapper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  ThRight,
  Td,
  TdMuted,
  TdRight,
  Amount,
  FixedBadge,
  EditButton,
  DeleteButton,
  EmptyState,
  TableTotal,
  TotalLabel,
  TotalValue,
} from './styles';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  type: TransactionType;
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  attached?: boolean;
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function TransactionList({ type, transactions, onEdit, onDelete, attached }: TransactionListProps) {
  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <TableWrapper attached={attached}>
      {transactions.length === 0 ? (
        <EmptyState>Nenhuma {type === 'income' ? 'receita' : 'despesa'} neste mês.</EmptyState>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Descrição</Th>
              <Th>Categoria</Th>
              {type === 'expense' && <Th>Conta</Th>}
              <Th>Data</Th>
              <ThRight>Valor</ThRight>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((t) => (
              <Tr key={t.id}>
                <Td>
                  {t.description}
                  {t.isFixed && <> <FixedBadge>fixa</FixedBadge></>}
                </Td>
                <TdMuted>{t.category}</TdMuted>
                {type === 'expense' && <TdMuted>{t.account ?? '—'}</TdMuted>}
                <TdMuted>{fmtDate(t.date)}</TdMuted>
                <TdRight>
                  <Amount type={type}>{fmt(t.amount)}</Amount>
                </TdRight>
                <Td style={{ whiteSpace: 'nowrap' }}>
                  <EditButton onClick={() => onEdit(t)} title="Editar">✎</EditButton>
                  <DeleteButton onClick={() => onDelete(t.id)} title="Excluir">×</DeleteButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <TableTotal>
        <TotalLabel>Total</TotalLabel>
        <TotalValue type={type}>{fmt(total)}</TotalValue>
      </TableTotal>
    </TableWrapper>
  );
}
