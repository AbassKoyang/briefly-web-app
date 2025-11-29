'use client';
import BookmarkSkeleton from "@/components/BookmarkSkeleton";
import { useAuth } from "@/hooks/auth";
import { useSearchContext } from "@/hooks/search";
import { useFetchBookmarks } from "@/utils/queries";
import { ArrowDownUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const {user} = useAuth();
  const { ref, inView } = useInView();
  const {searchQuery} = useSearchContext();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    } = useFetchBookmarks(user?.uid || '');

    useEffect(() => {
        if (inView && hasNextPage) {
          fetchNextPage();
        }
      }, [inView, hasNextPage, fetchNextPage]);

    console.log(data);    
    const allBookmarks = useMemo(() => {
        return data?.pages.flatMap(page => page.bookmarks) ;
      }, [data]);
    
      const filteredChats = useMemo(() => {
             if (!searchQuery.trim()) return allBookmarks;
            return allBookmarks?.filter(bookmark => {
            const hasMatchingTitleOrUrl = bookmark.url.toLowerCase().includes(searchQuery.toLowerCase()) || bookmark.title.toLowerCase().includes(searchQuery.toLowerCase());
             return hasMatchingTitleOrUrl;
        });
      }, [allBookmarks, searchQuery]);
    
  return (
    <div className="h-full bg-light-blue p-8">
      <div className="w-full flex justify-between items-start mb-5">
        <h4 className="font-raleway font-semibold text-xl text-black">All Bookmarks</h4>

        <button className="py-1.5 px-3 bg-white border-gray-400 border rounded-md font-raleway font-semibold text-[14px] text-black flex items-center gap-2">
          <ArrowDownUp className="text-black size-[18px]" />
          <span>Sort By</span>
        </button>
      </div>
        <div className="w-full h-full max-h-full scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-center gap-5">
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
          <BookmarkSkeleton />
        </div>
    </div>
  );
}
