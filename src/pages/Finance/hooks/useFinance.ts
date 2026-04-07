import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Transaction } from '../types';

const COLLECTION = 'transactions';

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
      setTransactions(docs);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addTransaction = useCallback(async (transaction: Omit<Transaction, 'id'>) => {
    await addDoc(collection(db, COLLECTION), { ...transaction, createdAt: Date.now() });
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
  }, []);

  const togglePaid = useCallback(async (id: string, isPaid: boolean) => {
    await updateDoc(doc(db, COLLECTION, id), { isPaid });
  }, []);

  const updateTransaction = useCallback(async (id: string, data: Omit<Transaction, 'id'>) => {
    await updateDoc(doc(db, COLLECTION, id), { ...data });
  }, []);

  const getByMonth = useCallback(
    (year: number, month: number) =>
      transactions.filter((t) => {
        const d = new Date(t.date + 'T00:00:00');
        return d.getFullYear() === year && d.getMonth() + 1 === month;
      }),
    [transactions],
  );

  const getTotals = useCallback((list: Transaction[]) => {
    const income = list.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = list.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, []);

  // Copies fixed expenses from previous month into current month if not yet present
  const seedFixedExpenses = useCallback(
    async (year: number, month: number) => {
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;

      const prevFixed = transactions.filter((t) => {
        const d = new Date(t.date + 'T00:00:00');
        return (
          d.getFullYear() === prevYear &&
          d.getMonth() + 1 === prevMonth &&
          t.isFixed === true
        );
      });

      if (prevFixed.length === 0) return;

      const currFixed = transactions.filter((t) => {
        const d = new Date(t.date + 'T00:00:00');
        return d.getFullYear() === year && d.getMonth() + 1 === month && t.isFixed === true;
      });

      for (const fixed of prevFixed) {
        const alreadyExists = currFixed.some(
          (t) => t.description === fixed.description && t.category === fixed.category,
        );
        if (!alreadyExists) {
          const day = fixed.date.split('-')[2];
          const newDate = `${year}-${String(month).padStart(2, '0')}-${day}`;
          await addDoc(collection(db, COLLECTION), {
            type: fixed.type,
            amount: fixed.amount,
            description: fixed.description,
            category: fixed.category,
            date: newDate,
            isFixed: true,
          });
        }
      }
    },
    [transactions],
  );

  return { transactions, loading, addTransaction, updateTransaction, deleteTransaction, togglePaid, getByMonth, getTotals, seedFixedExpenses };
}
