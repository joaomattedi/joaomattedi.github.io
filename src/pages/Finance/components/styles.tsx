import styled from 'styled-components';
import { TransactionType } from '../types';

/* ─── Layout ─────────────────────────────────────────────────── */

export const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 2rem;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
`;

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div``;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const SeedButton = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  font-size: 0.72rem;
  padding: 0.25rem 0.6rem;
  white-space: nowrap;
  transition: all 0.1s;

  &:hover {
    background: #f5f5f5;
    border-color: #bbb;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const SortLabel = styled.span`
  font-size: 0.75rem;
  color: #888;
`;

export const SortSelect = styled.select`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  background: #fff;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2563eb;
  }
`;

export const SortDirButton = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  line-height: 1;

  &:hover {
    background: #f5f5f5;
  }
`;

/* ─── Dashboard Cards ─────────────────────────────────────────── */

export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1rem;
`;

export const CardLabel = styled.p`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.35rem;
`;

interface CardValueProps {
  variant?: 'income' | 'expense' | 'balance';
}

const valueColors = { income: '#16a34a', expense: '#dc2626', balance: '#111' };

export const CardValue = styled.p<CardValueProps>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ variant }) => (variant ? valueColors[variant] : '#111')};
`;

/* ─── Month Selector ──────────────────────────────────────────── */

export const MonthRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const MonthButton = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.6rem;
  line-height: 1.5;

  &:hover {
    background: #f5f5f5;
  }
`;

export const MonthLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #111;
  min-width: 130px;
`;

/* ─── Form ────────────────────────────────────────────────────── */

export const FormCard = styled.form`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding: 1.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  align-items: end;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  grid-column: 1 / -1;
`;

interface TypeButtonProps {
  active: boolean;
  variant: TransactionType;
}

export const TypeButton = styled.button<TypeButtonProps>`
  border: 1px solid ${({ variant }) => (variant === 'income' ? '#16a34a' : '#dc2626')};
  border-radius: 4px;
  background: ${({ active, variant }) =>
    active ? (variant === 'income' ? '#16a34a' : '#dc2626') : 'transparent'};
  color: ${({ active, variant }) => {
    if (active) return '#fff';
    return variant === 'income' ? '#16a34a' : '#dc2626';
  }};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem;
  transition: all 0.1s;
`;

export const Input = styled.input`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  outline: none;
  background: #fff;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const Select = styled.select`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
  width: 100%;
  outline: none;
  background: #fff;
  cursor: pointer;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  grid-column: 1 / -1;

  label {
    font-size: 0.85rem;
    color: #555;
    cursor: pointer;
  }

  input[type='checkbox'] {
    cursor: pointer;
    width: 15px;
    height: 15px;
  }
`;

export const SubmitButton = styled.button`
  background: #111;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  transition: opacity 0.1s;
  white-space: nowrap;

  &:hover {
    opacity: 0.8;
  }
`;

/* ─── Transaction Table ───────────────────────────────────────── */

export const TableWrapper = styled.div`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const Thead = styled.thead`
  background: #f9f9f9;
`;

export const Th = styled.th`
  color: #888;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.6rem 0.75rem;
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const ThRight = styled(Th)`
  text-align: right;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-top: 1px solid #f0f0f0;

  &:hover {
    background: #fafafa;
  }
`;

export const Td = styled.td`
  color: #111;
  padding: 0.6rem 0.75rem;
  vertical-align: middle;
`;

export const TdMuted = styled(Td)`
  color: #aaa;
  font-size: 0.8rem;
`;

export const TdRight = styled(Td)`
  text-align: right;
  white-space: nowrap;
`;

interface AmountProps {
  type: TransactionType;
}

export const Amount = styled.span<AmountProps>`
  color: ${({ type }) => (type === 'income' ? '#16a34a' : '#dc2626')};
  font-weight: 500;
`;

export const FixedBadge = styled.span`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 99px;
  color: #2563eb;
  font-size: 0.65rem;
  font-weight: 500;
  padding: 1px 6px;
  white-space: nowrap;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0 0.25rem;
  transition: color 0.1s;

  &:hover {
    color: #dc2626;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 1;
  padding: 0 0.25rem;
  transition: color 0.1s;

  &:hover {
    color: #2563eb;
  }
`;

/* ─── Modal ───────────────────────────────────────────────────── */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

export const ModalCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 480px;
  display: grid;
  gap: 0.75rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
`;

export const ModalTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #111;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0;

  &:hover {
    color: #111;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.25rem;
`;

export const CancelButton = styled.button`
  background: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  transition: background 0.1s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const SaveButton = styled.button`
  background: #111;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: opacity 0.1s;

  &:hover {
    opacity: 0.8;
  }
`;

export const EmptyState = styled.p`
  color: #aaa;
  font-size: 0.875rem;
  padding: 1.5rem;
  text-align: center;
`;

export const TableTotal = styled.div`
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.75rem;
  font-size: 0.875rem;
`;

export const TotalLabel = styled.span`
  color: #888;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

interface TotalValueProps {
  type: TransactionType;
}

export const TotalValue = styled.span<TotalValueProps>`
  color: ${({ type }) => (type === 'income' ? '#16a34a' : '#dc2626')};
  font-weight: 600;
`;
