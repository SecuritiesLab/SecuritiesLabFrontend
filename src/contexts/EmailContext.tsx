import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EmailContextProps {
  email: string | null;
  setEmail: (email: string) => void;
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};