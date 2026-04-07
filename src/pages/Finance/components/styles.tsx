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

const chevronArrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

export const SortSelect = styled.select`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.8rem;
  padding: 0.3rem 2rem 0.3rem 0.5rem;
  background: #fff ${chevronArrow} no-repeat right 0.5rem center;
  cursor: pointer;
  outline: none;
  appearance: none;
  -webkit-appearance: none;

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

interface SummaryCardProps {
  variant?: 'income' | 'expense' | 'balance';
}

const cardAccentColors = { income: '#16a34a', expense: '#dc2626', balance: '#9ca3af' };

export const SummaryCard = styled.div<SummaryCardProps>`
  background: #fff;
  border-radius: 8px;
  border-left: 3px solid ${({ variant }) => (variant ? cardAccentColors[variant] : '#e5e5e5')};
  padding: 1rem 1rem 1rem 0.875rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
`;

export const CardLabel = styled.p`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.4rem;
`;

interface CardValueProps {
  variant?: 'income' | 'expense' | 'balance';
}

const valueColors = { income: '#16a34a', expense: '#dc2626', balance: '#111' };

export const CardValue = styled.p<CardValueProps>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ variant }) => (variant ? valueColors[variant] : '#111')};
  line-height: 1.2;
`;

export const CardSubLabel = styled.p`
  font-size: 0.7rem;
  color: #9ca3af;
  margin-top: 0.25rem;
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
  grid-template-columns: repeat(3, 1fr);
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
  appearance: none;
  -webkit-appearance: none;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  /* Hide number spinners */
  &[type='number'] {
    -moz-appearance: textfield;
  }
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Normalize date input */
  &[type='date'] {
    cursor: text;
  }
  &[type='date']::-webkit-calendar-picker-indicator {
    opacity: 0.4;
    cursor: pointer;
  }
`;

export const WideInput = styled(Input)`
  grid-column: span 2;

  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;

export const Select = styled.select`
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  color: #111;
  font-size: 0.9rem;
  padding: 0.5rem 2.25rem 0.5rem 0.75rem;
  width: 100%;
  outline: none;
  background: #fff ${chevronArrow} no-repeat right 0.75rem center;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;

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
    user-select: none;
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
  grid-column: 1 / -1;

  &:hover {
    opacity: 0.8;
  }
`;

/* ─── Spending Insights ───────────────────────────────────────── */

export const InsightsCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.25rem;
  display: grid;
  gap: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
`;

export const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InsightsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InsightsSectionTitle = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CategoryName = styled.span`
  font-size: 0.78rem;
  color: #555;
  width: 90px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarTrack = styled.div`
  flex: 1;
  background: #f0f0f0;
  border-radius: 99px;
  height: 6px;
  overflow: hidden;
`;

interface BarFillProps {
  pct: number;
  color?: string;
}

export const BarFill = styled.div<BarFillProps>`
  background: ${({ color }) => color ?? '#64748b'};
  border-radius: 99px;
  height: 100%;
  width: ${({ pct }) => pct}%;
  transition: width 0.4s ease;
`;

export const CategoryPct = styled.span`
  font-size: 0.75rem;
  color: #888;
  width: 32px;
  text-align: right;
  flex-shrink: 0;
`;

export const CategoryValue = styled.span`
  font-size: 0.72rem;
  color: #555;
  width: 80px;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const PaymentMethodName = styled(CategoryName)`
  width: 110px;
`;

export const InsightsDivider = styled.div`
  border-top: 1px solid #f0f0f0;
`;

export const InsightsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: 2px;
  background: #f0f0f0;
  border-radius: 6px;
  padding: 2px;
`;

interface ViewToggleBtnProps {
  active: boolean;
}

export const ViewToggleBtn = styled.button<ViewToggleBtnProps>`
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  border: none;
  border-radius: 4px;
  color: ${({ active }) => (active ? '#111' : '#888')};
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  padding: 0.2rem 0.5rem;
  transition: all 0.15s;
  box-shadow: ${({ active }) => (active ? '0 1px 2px rgba(0,0,0,0.1)' : 'none')};
  white-space: nowrap;

  &:hover {
    color: #111;
  }
`;

export const BigExpenseCard = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem 1rem;
`;

export const BigExpenseLabel = styled.p`
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

export const BigExpenseDesc = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  color: #111;
  margin-bottom: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BigExpenseMeta = styled.p`
  font-size: 0.78rem;
  color: #dc2626;
`;

export const PaidProgressTrack = styled.div`
  background: #e5e7eb;
  border-radius: 99px;
  height: 6px;
  overflow: hidden;
  margin: 0.5rem 0 0.35rem;
`;

interface PaidProgressFillProps {
  pct: number;
}

export const PaidProgressFill = styled.div<PaidProgressFillProps>`
  background: #16a34a;
  border-radius: 99px;
  height: 100%;
  width: ${({ pct }) => Math.min(pct, 100)}%;
  transition: width 0.4s ease;
`;

/* ─── Accordion ───────────────────────────────────────────────── */

export const AccordionHeader = styled.button<{ open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: ${({ open }) => (open ? '6px 6px 0 0' : '6px')};
  cursor: pointer;
  padding: 0.55rem 0.75rem;
  margin-bottom: 0;
  transition: background 0.15s;

  &:hover {
    background: #efefef;
  }

  span:first-child {
    font-size: 0.72rem;
    font-weight: 600;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  span:last-child {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-right: 1.5px solid #888;
    border-bottom: 1.5px solid #888;
    transform: rotate(${({ open }) => (open ? '45deg' : '-45deg')})
      translateY(${({ open }) => (open ? '-2px' : '0px')});
    transition: transform 0.2s;
    flex-shrink: 0;
  }
`;

/* ─── Transaction Table ───────────────────────────────────────── */

export const TableWrapper = styled.div<{ attached?: boolean }>`
  background: #fff;
  border: 1px solid #e5e5e5;
  border-top: ${({ attached }) => (attached ? 'none' : '1px solid #e5e5e5')};
  border-radius: ${({ attached }) => (attached ? '0 0 6px 6px' : '8px')};
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
  color: #6b7280;
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
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 99px;
  color: #92400e;
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

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  min-width: 15px;
  border: 1.5px solid #d0d0d0;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
  background: #fff;
  transition: border-color 0.1s, background 0.1s;
  flex-shrink: 0;

  &:checked {
    background: #111;
    border-color: #111;
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 0px;
    width: 5px;
    height: 9px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    transform: rotate(40deg);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

export const PaidCheckbox = styled(Checkbox)`
  &:checked {
    background: #16a34a;
    border-color: #16a34a;
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
