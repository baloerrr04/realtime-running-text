import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import { adminLogin, adminLogout, getCurrentAdmin } from '../lib/auth';
import { onValue, ref } from 'firebase/database';
import { database } from '@/lib/firebase';

interface AuthContextType {
  admin: User | null;
  adminData: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialized: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType, );

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<User | null>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const auth = getAuth();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     console.log("user",user);
      
  //     if (user) {
  //       // Verifikasi apakah user adalah admin
  //       const adminRef = ref(database, `admins/${user.uid}`);
  //       onValue(adminRef, (snapshot) => {
  //         if (snapshot.exists()) {
  //           setAdmin(user);
  //           setAdminData(snapshot.val());
  //         }
  //       });
  

        
  //     } else {
  //       setAdmin(null);
  //       setAdminData(null);
  //     }
  //     setLoading(false);
  //     setInitialized(true); // Menandakan persistence sudah diverifikasi
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const adminRef = ref(database, `admins/${user?.uid}`);
        onValue(adminRef, (snapshot) => {
          if (snapshot.exists()) {
            setAdmin(user);
            setAdminData(snapshot.val());
          }
        });
      setLoading(false);
      setInitialized(true); // Menandakan persistence sudah diverifikasi
    });
    return () => unsubscribe();
  }, []);

  const value = {
    admin,
    adminData,
    loading :!initialized,
    login: async (email: string, password: string) => {
      await adminLogin(email, password);
    },
    logout: async () => {
      await adminLogout();
    },
    initialized
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}