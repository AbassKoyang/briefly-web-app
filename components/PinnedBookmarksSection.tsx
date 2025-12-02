'use client';

import { useAuth } from "@/hooks/auth";
import { useSearchContext } from "@/hooks/search";
import { useFetchPinnedBookmarks } from "@/utils/queries";
import Bookmark from "./Bookmark";
import BookmarkSkeleton from "./BookmarkSkeleton";

const PinnedBookmarksSection = () => {
    const {user} = useAuth();
    const {searchQuery} = useSearchContext();
    const {
        data: pinnedBookmarks,
        isLoading,
        isError,
        } = useFetchPinnedBookmarks(user?.uid || '');
        console.log('Pinned Bookmarks:', pinnedBookmarks)
    
        const filterBookmarks = () => {
               if (!searchQuery.trim()) return pinnedBookmarks;
              return pinnedBookmarks?.filter(bookmark => {
              const hasMatchingTitleOrUrl = bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) || bookmark.title.toLowerCase().includes(searchQuery.toLowerCase());
               return hasMatchingTitleOrUrl;
          });
        };
        const filteredBookmarks =  filterBookmarks();


  return (<>
    {filteredBookmarks && (
        <>
          {filteredBookmarks.map((bm) => (
            <Bookmark bookmark={bm} />
          ))}
     </>
     )}
     {isLoading && (
        <div className="w-full h-full max-h-full scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-between gap-5 pb-[100px]">
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
        </div>)}
  </>
)}

export default PinnedBookmarksSection