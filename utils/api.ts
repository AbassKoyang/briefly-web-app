import { db } from "@/lib/firebase";
import { BookmarkType, fetchUserBookmarksParamType, fetchUserBookmarksReturnType } from "@/types";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";

export const fetchUserBookmarks = async ({userId, pageParam} : fetchUserBookmarksParamType) : Promise<fetchUserBookmarksReturnType> => {
    try {

    const res = await fetch(`http://localhost:4000/api/bookmarks/${userId}?pageParam=${pageParam}`, 
        {
            method: 'GET',
        }
    );
    const data = await res.json();
    console.log(data.data);
    return data.data as fetchUserBookmarksReturnType;

    } catch (error) {
        console.error('Error fetching  user bookmarks:', error);
        throw error;
    }
};
