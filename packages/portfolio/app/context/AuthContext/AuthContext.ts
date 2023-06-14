import { createContext } from 'react';

const AuthContext = createContext<
  | {
      visitorId: string | null;
      email: string | null;
      setEmail: React.Dispatch<React.SetStateAction<string | null>>;
    }
  | undefined
>(undefined);

export default AuthContext;
