import React, { useState, useRef } from 'react';
import {
  FormCard,
  TypeToggle,
  TypeButton,
  Input,
  Select,
  SubmitButton,
  CheckboxRow,
} from './styles';
import { Transaction, TransactionType, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

const today = () => new Date().toISOString().split('T')[0];

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(today());
  const [isFixed, setIsFixed] = useState(false);

  const descriptionRef = useRef<HTMLInputElement>(null);
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount.replace(',', '.'));
    if (!parsed || parsed <= 0 || !description.trim() || !category || !date) return;
    onAdd({
      type,
      amount: parsed,
      description: description.trim(),
      category,
      date,
      ...(type === 'expense' && { isFixed }),
    });
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(today());
    setIsFixed(false);
    descriptionRef.current?.focus();
  }

  function handleTypeChange(newType: TransactionType) {
    setType(newType);
    setCategory('');
    setIsFixed(false);
  }

  return (
    <FormCard onSubmit={handleSubmit}>
      <TypeToggle>
        <TypeButton type="button" variant="income" active={type === 'income'} onClick={() => handleTypeChange('income')}>
          Receita
        </TypeButton>
        <TypeButton type="button" variant="expense" active={type === 'expense'} onClick={() => handleTypeChange('expense')}>
          Despesa
        </TypeButton>
      </TypeToggle>

      <Input
        ref={descriptionRef}
        type="text"
        placeholder="Descrição"
        autoCapitalize="true"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={60}
        required
      />

      <Input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0.01"
        step="0.01"
        required
      />

      <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Categoria</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      {type === 'expense' && (
        <CheckboxRow>
          <input
            type="checkbox"
            id="isFixed"
            checked={isFixed}
            onChange={(e) => setIsFixed(e.target.checked)}
          />
          <label htmlFor="isFixed">Despesa fixa (repete todo mês)</label>
        </CheckboxRow>
      )}

      <SubmitButton type="submit">Adicionar</SubmitButton>
    </FormCard>
  );
}
