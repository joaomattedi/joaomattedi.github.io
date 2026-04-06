import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

const ALLOWED_EMAIL = 'joaommattedi@gmail.com';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAllowed = user?.email === ALLOWED_EMAIL;

  async function signIn() {
    await signInWithPopup(auth, googleProvider);
  }

  async function logOut() {
    await signOut(auth);
  }

  return { user, loading, isAllowed, signIn, logOut };
}
