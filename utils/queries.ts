import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchArchivedBookmarks, fetchPinnedBookmarks, fetchUserBookmarks } from "./api";
import { fetchUserBookmarksReturnType } from "@/types";

const PAGE_SIZE = 6;
export const useFetchBookmarks= (userId: string) => {
    return useInfiniteQuery<fetchUserBookmarksReturnType, Error>({
      queryKey: ['bookmarks', userId],
      queryFn: ({pageParam}) => fetchUserBookmarks({userId, pageParam}),
      initialPageParam: null, 
      getNextPageParam: (lastPage: fetchUserBookmarksReturnType) => {
      if (!lastPage.lastVisible || lastPage.bookmarks.length < PAGE_SIZE) {
        return undefined;
      }
      return lastPage.lastVisible;
    },
    enabled: !!userId,
    });
};
export const useFetchArchivedBookmarks= (userId: string) => {
    return useInfiniteQuery<fetchUserBookmarksReturnType, Error>({
      queryKey: ['archived-bookmarks', userId],
      queryFn: ({pageParam}) => fetchArchivedBookmarks({userId, pageParam}),
      initialPageParam: null, 
      getNextPageParam: (lastPage: fetchUserBookmarksReturnType) => {
      if (!lastPage.lastVisible || lastPage.bookmarks.length < PAGE_SIZE) {
        return undefined;
      }
      return lastPage.lastVisible;
    },
    enabled: !!userId,
    });
};
export const useFetchPinnedBookmarks= (userId: string) => {
    return useQuery({
      queryKey: ['pinned-bookmarks', userId],
      queryFn: () => fetchPinnedBookmarks(userId),
      enabled: !!userId,
    });
};