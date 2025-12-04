'use client';
import Bookmark from "@/components/Bookmark";
import BookmarkSkeleton from "@/components/BookmarkSkeleton";
import EmptyArchive from "@/components/EmptyArchive";
import PinnedBookmarksSection from "@/components/PinnedBookmarksSection";
import { useAuth } from "@/hooks/auth";
import { useSearchContext } from "@/hooks/search";
import { useTagContext } from "@/hooks/tag";
import { useFetchArchivedBookmarks, useFetchBookmarks, useFetchPinnedBookmarks } from "@/utils/queries";
import { ArrowDownUp, LoaderCircle } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const {user} = useAuth();
  const { ref, inView } = useInView();
  const {searchQuery} = useSearchContext();
  const {tags, setTags} = useTagContext();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    } = useFetchArchivedBookmarks(user?.uid || '');

    useEffect(() => {
        if (inView && hasNextPage) {
          fetchNextPage();
        }
      }, [inView, hasNextPage, fetchNextPage]);

    console.log(data?.pageParams);    
    console.log(data?.pages);    
    const allBookmarks = useMemo(() => {
        return data?.pages.flatMap(page => page.bookmarks) ;
      }, [data]);
    
      const filteredBookmarks = useMemo(() => {
        if (!searchQuery.trim() && tags.length === 0) return allBookmarks;
      
        const q = searchQuery.trim().toLowerCase();
        const hasSearch = q.length > 0;
        const hasTags = tags.length > 0;
      
        const tagSet = new Set(tags);
      
        return allBookmarks?.filter(bookmark => {
          const matchesSearch =
            hasSearch &&
            (bookmark.url.toLowerCase().includes(q) ||
             bookmark.title.toLowerCase().includes(q));
      
          const matchesTags =
            hasTags && bookmark.tags.some(tag => tagSet.has(tag));
      
          if (hasSearch && hasTags) return matchesSearch && matchesTags;
          if (hasSearch) return matchesSearch;
          if (hasTags) return matchesTags;
        });
      }, [allBookmarks, searchQuery, tags]);
      console.log(filteredBookmarks);
    
  return (
    <div className="h-full bg-light-blue p-4 md:p-8 relative">
      {user ? (
        <>
        <div className="w-full flex justify-between items-start mb-3">
        <h4 className="font-raleway font-semibold text-xl text-black">Archive</h4>

        <button className="py-1.5 px-3 bg-white border-gray-200 border rounded-md font-raleway font-semibold text-[14px] text-black flex items-center gap-2">
          <ArrowDownUp className="text-black size-[18px]" />
          <span>Sort By</span>
        </button>
      </div>
      {isLoading && (
        <div className="w-full h-full max-h-full scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-between gap-5 pb-[100px]">
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
        </div>)}

        {filteredBookmarks && (
        <div className="w-full h-full max-h-full scrollbar-hide overflow-y-auto flex flex-wrap items-start justify-between gap-5 pb-[100px]">
          {filteredBookmarks.map((bm) => (
            <Bookmark key={bm.id} bookmark={bm} />
          ))}
           <div className='w-full flex items-center justify-center py-3' ref={ref}>
        {isFetchingNextPage ? <LoaderCircle className="animate-spin size-[26px] text-dark-blue" /> : null}
        </div>

        </div>)}
        {isError && (
         <div className='w-full h-full max-h-full flex items-center justify-center'>
         <p className="font-nunito-sans">Oops, Failed to load bookmarks.</p>
         </div>
        )}

        {filteredBookmarks && filteredBookmarks.length == 0 && searchQuery !== '' && (
        <div className='w-full h-full flex flex-col items-center justify-center z-[200] absolute top-0 left-0 bg-white/30 backdrop-blur-xs'>
        <p className="font-nunito-sans">Oops, No result for this search in archive.</p>
        </div>
        )}

        
        {allBookmarks && allBookmarks.length == 0 && isLoading == false && (
        <EmptyArchive />
        )}
        </>
      ) : (
        <div className='w-full h-full flex items-center justify-center'>
          <p className="font-raleway font-medium text-xl text-black">Please sign in to continue.</p>
        </div>
      )}
    </div>
  );
}
