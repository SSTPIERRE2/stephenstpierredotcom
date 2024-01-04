'use client';

import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import LogRocket from 'logrocket';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('visitorId');
    const storedEmail = localStorage.getItem('email');

    if (storedId) {
      setVisitorId(storedId);
      LogRocket.identify(storedId);
    } else {
      const id = crypto.randomUUID();
      localStorage.setItem('visitorId', id);
      setVisitorId(id);

      LogRocket.identify(id);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const storeSetEmail = (email: string) => {
    localStorage.setItem('email', email);
    setEmail(email);
  };

  return (
    <AuthContext.Provider value={{ visitorId, email, setEmail: storeSetEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
