import { db } from "@/lib/firebase";
import { BookmarkType, fetchUserBookmarksParamType, fetchUserBookmarksReturnType } from "@/types";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";

const PAGE_SIZE = 10;
export const fetchUserBookmarks = async ({userId, pageParam} : fetchUserBookmarksParamType) : Promise<fetchUserBookmarksReturnType> => {
    const colRef = collection(db, "bookmarks");
    let q;
    if(!pageParam) {
        q = query(colRef, where('userId', '==', userId ), orderBy("createdAt", 'desc'), limit(PAGE_SIZE));
    } else {
        q = query(colRef, where('userId', '==', userId ), orderBy("createdAt", 'desc'), startAfter(pageParam), limit(PAGE_SIZE));
    }
    try {
        const querySnapshot = (await getDocs(q));
        
        if(!querySnapshot.empty){
            const bookmarks =  querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as BookmarkType[];
            return {
                bookmarks,
                lastVisible: pageParam
            }
        } else {
            return {
                bookmarks: [],
                lastVisible: pageParam
            };
        }
    } catch (error) {
        console.error('Error fetching  user bookmarks:', error);
        throw error;
    }
};
