import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchUserBookmarks } from "./api";
import { fetchUserBookmarksReturnType } from "@/types";

const PAGE_SIZE = 5;
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