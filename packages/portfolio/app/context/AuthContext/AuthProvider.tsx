'use client';

import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [visitorId, setVisitorId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  console.log(`authContext, visitorID: ${visitorId} email: ${email}`);

  useEffect(() => {
    const storedId = localStorage.getItem('visitorId');
    const storedEmail = localStorage.getItem('email');

    if (storedId) {
      setVisitorId(storedId);
    } else {
      const id = crypto.randomUUID();
      localStorage.setItem('visitorId', id);
      setVisitorId(id);
      console.log('set new visitor id', id);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ visitorId, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
