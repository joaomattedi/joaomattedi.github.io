import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const LEGACY_COLLECTIONS = ['meals', 'transactions', 'workouts'];

// One-shot: copia docs de <collection>/{id} para users/{uid}/<collection>/{id} e apaga o original.
// Rodar uma vez (via ?migrate=1) antes de trocar as Firestore rules para o esquema por usuário.
export async function migrateLegacyData(uid: string) {
  const results: Record<string, number> = {};
  for (const name of LEGACY_COLLECTIONS) {
    const snap = await getDocs(collection(db, name));
    for (const d of snap.docs) {
      await setDoc(doc(db, 'users', uid, name, d.id), d.data());
      await deleteDoc(doc(db, name, d.id));
    }
    results[name] = snap.size;
  }
  return results;
}
