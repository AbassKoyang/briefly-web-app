import { auth, db } from "@/lib/firebase";
import { BookmarkType, fetchUserBookmarksParamType, fetchUserBookmarksReturnType } from "@/types";
import { getAuth } from "firebase/auth";
import { collection, getDocs, limit, orderBy, query, startAfter, where, writeBatch } from "firebase/firestore";
const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const fetchUserBookmarks = async ({userId, pageParam} : fetchUserBookmarksParamType) : Promise<fetchUserBookmarksReturnType> => {
    console.log(API_URL);
    try {

    const res = await fetch(`${API_URL}/api/bookmarks/${userId}?pageParam=${pageParam}`, 
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
export const fetchArchivedBookmarks = async ({userId, pageParam} : fetchUserBookmarksParamType) : Promise<fetchUserBookmarksReturnType> => {
    try {

    const res = await fetch(`${API_URL}/api/bookmarks/${userId}/archived?pageParam=${pageParam}`, 
        {
            method: 'GET',
        }
    );
    const data = await res.json();
    console.log(data.data);
    return data.data as fetchUserBookmarksReturnType;

    } catch (error) {
        console.error('Error fetching archived bookmarks:', error);
        throw error;
    }
};
export const fetchPinnedBookmarks = async (userId : string) : Promise<BookmarkType[]> => {
    try {

    const res = await fetch(`${API_URL}/api/bookmarks/${userId}/pinned`, 
        {
            method: 'GET',
        }
    );
    const result = await res.json();
    console.log(result.data);
    return result.data;

    } catch (error) {
        console.error('Error fetching  user bookmarks:', error);
        throw error;
    }
};

export const incrementViews =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}/views`, {
            method: 'PATCH',
        })
        if(!res.ok) {
            console.error("Error incrementing views");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Views incremented successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error incrementing bookmark views", error);
    }
}

export const pinToTop =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}/pin`, {
            method: 'PATCH',
        })
        if(!res.ok) {
            console.error("Error pinning bookmark to top");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Bookmark pinned successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error pinning bookmark to top", error);
    }
}

export const unPinBookmark =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}/unpin`, {
            method: 'PATCH',
        })
        if(!res.ok) {
            console.error("Error unpinning bookmark to top");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Bookmark unpinned successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error unpinning bookmark to top", error);
    }
}
export const archiveBookmark =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}/archive`, {
            method: 'PATCH',
        })
        if(!res.ok) {
            console.error("Error archiving bookmark");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Bookmark archived successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error archiving bookmark", error);
    }
}

export const unarchiveBookmark =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}/unarchive`, {
            method: 'PATCH',
        })
        if(!res.ok) {
            console.error("Error unarchiving bookmark");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Bookmark unarchived successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error unarchiving bookmark", error);
    }
}
export const deleteBoomark =  async(id: string) => {
    try {
        const res = await fetch(`${API_URL}/api/bookmarks/${id}`, {
            method: 'DELETE',
        })
        if(!res.ok) {
            console.error("Error deleting bookmark");
            return;
        }
        const result = await res.json();
        if(result.success) {
            console.log("Bookmark deleted successfully");
            console.log(result);
        }
        return result;
    } catch (error) {
        console.error("Error deleting bookmark", error);
    }
}
export const bookmarkPage = async (url: string, userId: string) => {
    const user = auth.currentUser;

    if (user) {
    const idToken = await user.getIdToken();
    console.log("ID Token:", idToken);
    const res = await fetch(`${API_URL}/api/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`
        },
        body: JSON.stringify({
          url,
          userId
        })
      });
    const result = await res.json();
    if (!res.ok || !result.success) {
      console.error(result);
      return;
    }
    return result.data;
    }
}