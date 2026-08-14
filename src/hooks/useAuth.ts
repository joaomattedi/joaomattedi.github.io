import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u?.email) {
        const snap = await getDoc(doc(db, 'allowlist', u.email));
        setIsAllowed(snap.exists());
      } else {
        setIsAllowed(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signIn() {
    await signInWithPopup(auth, googleProvider);
  }

  async function logOut() {
    await signOut(auth);
  }

  return { user, loading, isAllowed, signIn, logOut };
}
