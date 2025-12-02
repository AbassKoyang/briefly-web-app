export type UserType = {
createdAt: Date;
email: string;
name: string;
photo: string;
uid: string;
}
export type BookmarkType = {
    id?: string;
    url: string;
    title: string;
    subTitle: string;
    tags: string[];
    summary: string;
    userId: string;
    favicon: string;
    createdAt: number;
    pinned: false;
    lastViewed: number;
    views: number;
    archived: boolean;
};
export type PageParam = unknown;

export interface fetchUserBookmarksParamType {
    userId: string;
  pageParam: PageParam;
}
export interface fetchUserBookmarksReturnType {
  bookmarks: BookmarkType[],
  lastVisible: any,
}