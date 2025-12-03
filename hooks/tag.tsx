'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface tagContextType {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const tagContext = createContext<tagContextType | null>(null);

export function useTagContext() {
  const context = useContext(tagContext);
  if (!context) {
    throw new Error('useTagContext must be used within SearchProvider');
  }
  return context;
}

export function TagProvider({ children }: { children: ReactNode }) {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <tagContext.Provider value={{ tags, setTags }}>
      {children}
    </tagContext.Provider>
  );
}