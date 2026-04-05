import React, { useState } from 'react';
import {
  Overlay,
  ModalCard,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalActions,
  CancelButton,
  SaveButton,
  Input,
  Select,
  CheckboxRow,
  TypeToggle,
  TypeButton,
} from './styles';
import { Transaction, TransactionType, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../types';

interface EditModalProps {
  transaction: Transaction;
  onSave: (id: string, data: Omit<Transaction, 'id'>) => void;
  onClose: () => void;
}

export default function EditModal({ transaction, onSave, onClose }: EditModalProps) {
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [amount, setAmount] = useState(String(transaction.amount));
  const [description, setDescription] = useState(transaction.description);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [isFixed, setIsFixed] = useState(transaction.isFixed ?? false);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleTypeChange(newType: TransactionType) {
    setType(newType);
    setCategory('');
    setIsFixed(false);
  }

  function handleSave() {
    const parsed = parseFloat(amount.replace(',', '.'));
    if (!parsed || parsed <= 0 || !description.trim() || !category || !date) return;
    onSave(transaction.id, {
      type,
      amount: parsed,
      description: description.trim(),
      category,
      date,
      ...(type === 'expense' && { isFixed }),
    });
    onClose();
  }

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Editar lançamento</ModalTitle>
          <ModalCloseButton onClick={onClose}>×</ModalCloseButton>
        </ModalHeader>

        <TypeToggle>
          <TypeButton type="button" variant="income" active={type === 'income'} onClick={() => handleTypeChange('income')}>
            Receita
          </TypeButton>
          <TypeButton type="button" variant="expense" active={type === 'expense'} onClick={() => handleTypeChange('expense')}>
            Despesa
          </TypeButton>
        </TypeToggle>

        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={60}
        />

        <Input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
        />

        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categoria</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {type === 'expense' && (
          <CheckboxRow>
            <input
              type="checkbox"
              id="editIsFixed"
              checked={isFixed}
              onChange={(e) => setIsFixed(e.target.checked)}
            />
            <label htmlFor="editIsFixed">Despesa fixa (repete todo mês)</label>
          </CheckboxRow>
        )}

        <ModalActions>
          <CancelButton type="button" onClick={onClose}>Cancelar</CancelButton>
          <SaveButton type="button" onClick={handleSave}>Salvar</SaveButton>
        </ModalActions>
      </ModalCard>
    </Overlay>
  );
}
