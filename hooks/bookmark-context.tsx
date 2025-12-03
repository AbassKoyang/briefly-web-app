'use client';
import { BookmarkType } from '@/types';
import { createContext, useContext, useState, ReactNode } from 'react';

interface bookmarkContextType {
  bookmarks: BookmarkType[];
  setBookmarks: (bm: BookmarkType[]) => void;
}

const bookmarkContext = createContext<bookmarkContextType | null>(null);

export function useBookmarkContext() {
  const context = useContext(bookmarkContext);
  if (!context) {
    throw new Error('usebookmarkContext must be used within SearchProvider');
  }
  return context;
}

export function BookMarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);

  return (
    <bookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </bookmarkContext.Provider>
  );
}