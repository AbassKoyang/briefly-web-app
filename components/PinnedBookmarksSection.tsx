'use client';

import { useAuth } from "@/hooks/auth";
import { useSearchContext } from "@/hooks/search";
import { useFetchPinnedBookmarks } from "@/utils/queries";
import Bookmark from "./Bookmark";
import BookmarkSkeleton from "./BookmarkSkeleton";
import { Pin } from "lucide-react";

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


  return (<div className="w-full py-4">
    <div className="flex items-center gap-1 mb-4">
      <Pin className="size-[14px] text-gray-500"/>
      <h6 className="text-sm font-medium text-gray-500 font-raleway">Pinned</h6>
    </div>
    {filteredBookmarks && (
        <div className="w-full h-fit scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-between gap-5 border-b border-gray-400 pb-4">
          {filteredBookmarks.map((bm) => (
            <Bookmark bookmark={bm} />
          ))}
     </div>
     )}
     {isLoading && (
        <div className="w-full h-full max-h-full scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-between gap-5 pb-[100px]">
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
        </div>)}
  </div>
)}

export default PinnedBookmarksSection