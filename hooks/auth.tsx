'use client'
import React, {useContext, createContext, useState, useEffect} from 'react';
import { onAuthStateChanged, User} from 'firebase/auth';
import {auth, db} from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types';

interface AuthContextType {
    user: UserType | null ;
    loading: boolean
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false
})

const AuthProvider = ({children} : {children: React.ReactNode}) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: User | null) => {
        if (firebaseUser) {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setUser({ uid: firebaseUser.uid, ...docSnap.data() } as UserType);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);
    
  return (
    <AuthContext.Provider value={{user, loading}}>
        {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);
export default AuthProvider