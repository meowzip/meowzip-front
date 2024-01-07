'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextState {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextState | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [email, setEmail] = useState('');

  const contextValue = { email, setEmail };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
