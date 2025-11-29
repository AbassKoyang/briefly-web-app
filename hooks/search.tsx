'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface searchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const searchContext = createContext<searchContextType | null>(null);

export function useSearchContext() {
  const context = useContext(searchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within SearchProvider');
  }
  return context;
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <searchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </searchContext.Provider>
  );
}