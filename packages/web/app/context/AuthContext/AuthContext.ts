import { createContext } from 'react';

const AuthContext = createContext<
  | {
      visitorId: string | null;
      email: string | null;
      setEmail: (email: string) => void;
    }
  | undefined
>(undefined);

export default AuthContext;
