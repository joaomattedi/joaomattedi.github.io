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
  PaidCheckbox,
} from './styles';
import { Transaction, TransactionType } from '../types';

interface TransactionListProps {
  type: TransactionType;
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  attached?: boolean;
  onTogglePaid?: (id: string, isPaid: boolean) => void;
}

function fmt(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export default function TransactionList({ type, transactions, onEdit, onDelete, attached, onTogglePaid }: TransactionListProps) {
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
              {type === 'expense' && <Th>Pagamento</Th>}
              <Th>Data</Th>
              <ThRight>Valor</ThRight>
              {type === 'expense' && <Th style={{ textAlign: 'center' }}>Pago</Th>}
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
                {type === 'expense' && (
                  <Td style={{ textAlign: 'center' }}>
                    <PaidCheckbox
                      type="checkbox"
                      checked={t.isPaid ?? false}
                      onChange={(e) => onTogglePaid?.(t.id, e.target.checked)}
                      title={t.isPaid ? 'Marcar como não pago' : 'Marcar como pago'}
                    />
                  </Td>
                )}
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
