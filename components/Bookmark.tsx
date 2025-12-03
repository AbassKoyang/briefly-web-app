
'use client';
import { BookmarkType } from "@/types"
import { archiveBookmark, deleteBoomark, incrementViews, pinToTop, unarchiveBookmark, unPinBookmark } from "@/utils/api";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Archive, ArchiveX, Calendar, Clock, Ellipsis, ExternalLink, Eye, LoaderCircle, Pin, PinOff, Trash } from "lucide-react"
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Bookmark = ({bookmark} : {bookmark: BookmarkType}) => {
    const queryClient = useQueryClient();

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isPinningToTop, setIsPinningToTop] = useState(false);
    const [isUnpinning, setIsUnpinning] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const [isUnarchiving, setIsUnarchiving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
  
    const dateCreated = new Date(bookmark.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });
    const lastViewed = new Date(bookmark.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });
    const title = bookmark.title.length > 15 ? bookmark.title.substring(0,15) + '...' : bookmark.title;
    const summary = bookmark.summary.length > 150 ? bookmark.summary.substring(0,150) + '...' : bookmark.summary;


    // const incrementViewsMutation = useMutation({
    //     mutationFn: (id: string) => incrementViews(id),
    //     onSuccess: () => {
    //         console.log("views incremented successfully");
    //         queryClient.invalidateQueries({ queryKey: ['bookmarks', 'pinned-bookmarks']});
    //     }
    // });

    const pinToTopMutation = useMutation({
        mutationFn: (id: string) => pinToTop(id),
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
          
            const previous = queryClient.getQueryData(["bookmarks"]);
          
            queryClient.setQueryData(["bookmarks"], (old: any) => {
              if (!old) return old; 
          
              return {
                ...old,
                bookmarks: old.bookmarks.map((b: BookmarkType) =>
                  b.id === id ? { ...b, pinned: true } : b
                )
              };
            });
          
            return { previous };
          },          
        onError: (_error, _id, context) => {
          queryClient.setQueryData(["bookmarks"], context?.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: ["pinned-bookmarks"] });
        },
        onSuccess: () => {
            toast.success("Bookmark Pinned");
            setIsOpen(false);
        }
      });
    // const unPinBookmarkMutation = useMutation({
    //     mutationFn: (id: string) => unPinBookmark(id),
    //     onSuccess: () => {
    //         console.log("Bookmark unpinned successfully");
    //         queryClient.invalidateQueries({ queryKey: ['bookmarks', 'pinned-bookmarks']});
    //         toast.success("Bookmark unpinned successfully")
    //         setIsOpen(false);
    //     }
    // });
    // const archiveBookmarkMutation = useMutation({
    //     mutationFn: (id: string) => archiveBookmark(id),
    //     onSuccess: () => {
    //         console.log("Bookmark archived successfully");
    //         queryClient.invalidateQueries({ queryKey: ['bookmarks', 'pinned-bookmarks']});
    //         toast.success("Bookmark archived successfully")
    //         setIsOpen(false)
    //     }
    // });
    // const unarchiveBookmarkMutation = useMutation({
    //     mutationFn: (id: string) => unarchiveBookmark(id),
    //     onSuccess: () => {
    //         console.log("Bookmark unarchived successfully");
    //         queryClient.invalidateQueries({ queryKey: ['bookmarks', 'pinned-bookmarks']});
    //         toast.success("Bookmark unarchived successfully")
    //         setIsOpen(false);
    //     }
    // });

    const incrementViewsMutation = useMutation({
        mutationFn: (id: string) => incrementViews(id),
        onMutate: async (id: string) => {
          await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
          const previous = queryClient.getQueryData(["bookmarks"]);
      
          queryClient.setQueryData(["bookmarks"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              bookmarks: old.bookmarks.map((b: BookmarkType) =>
                b.id === id
                  ? { ...b, views: (b.views || 0) + 1, lastViewed: Date.now() }
                  : b
              ),
            };
          });
      
          return { previous };
        },
        onError: (_err, _id, context: any) => {
          if (context?.previous) queryClient.setQueryData(["bookmarks"], context.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: ["pinned-bookmarks"] });
          setIsOpen(false);
        },
      });

      const unPinBookmarkMutation = useMutation({
        mutationFn: (id: string) => unPinBookmark(id),
        onMutate: async (id: string) => {
          await queryClient.cancelQueries({ queryKey: ["pinned-bookmarks"] });
          const previous = queryClient.getQueryData(["pinned-bookmarks"]);
      
          queryClient.setQueryData(["pinned-bookmarks"], (old: any) => {
            if (!old) return old;
            return old.map((b: BookmarkType) =>
                b.id === id ? { ...b, pinned: true } : b
              );
          });
      
          return { previous };
        },
        onError: (_err, _id, context: any) => {
            queryClient.setQueryData(["pinned-bookmarks"], context?.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: ["pinned-bookmarks"] });
        },
        onSuccess: () => {
            toast.success("Bookmark removed from Pinned")
            setIsOpen(false);
        }
      });

      const archiveBookmarkMutation = useMutation({
        mutationFn: (id: string) => archiveBookmark(id),
        onMutate: async (id: string) => {
          await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
          const previous = queryClient.getQueryData(["bookmarks"]);
      
          queryClient.setQueryData(["bookmarks"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              bookmarks: old.bookmarks.map((b: BookmarkType) =>
                b.id === id ? { ...b, archived: true } : b
              ),
            };
          });
      
          return { previous };
        },
        onError: (_err, _id, context: any) => {
          if (context?.previous) queryClient.setQueryData(["bookmarks"], context.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: ["archived-bookmarks"] });
        },
        onSuccess: () => {
            toast.success("Bookmark Archived")
            setIsOpen(false);
        }
      });

      const unarchiveBookmarkMutation = useMutation({
        mutationFn: (id: string) => unarchiveBookmark(id),
        onMutate: async (id: string) => {
          await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
          const previous = queryClient.getQueryData(["bookmarks"]);
      
          queryClient.setQueryData(["bookmarks"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              bookmarks: old.bookmarks.map((b: BookmarkType) =>
                b.id === id ? { ...b, archived: false } : b
              ),
            };
          });
      
          return { previous };
        },
        onError: (_err, _id, context: any) => {
          if (context?.previous) queryClient.setQueryData(["bookmarks"], context.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
          queryClient.invalidateQueries({ queryKey: ["archived-bookmarks"] });
        },
        onSuccess: () => {
            toast.success("Bookmark removed from archived")
            setIsOpen(false);
        }
      });

      const deleteBookmarkMutation = useMutation({
        mutationFn: (id: string) => deleteBoomark(id),
        onMutate: async (id: string) => {
          await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
          const previous = queryClient.getQueryData(["bookmarks"]);
      
          queryClient.setQueryData(["bookmarks"], (old: any) => {
            if (!old) return old;
            return {
              ...old,
              bookmarks: old.bookmarks.filter((b: BookmarkType) => b.id !== id),
            };
          });
      
          return { previous };
        },
        onError: (_err, _id, context: any) => {
          if (context?.previous) queryClient.setQueryData(["bookmarks"], context.previous);
        },
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        },
        onSuccess: () => {
          toast.success("Bookmark deleted")
          setIsOpen(false);
        }
      });


    const handleOpenBookmark = async (bookmark: BookmarkType) => {
        window.open(bookmark.url, "_blank");
        await incrementViewsMutation.mutateAsync(bookmark.id || '');
    }
    const handlePinToTop = async (bookmark: BookmarkType) => {
      setIsPinningToTop(true);
        await pinToTopMutation.mutateAsync(bookmark.id || '');
        setIsPinningToTop(false);
    }
    const handleUnPin = async (bookmark: BookmarkType) => {
        setIsUnpinning(true);
        await unPinBookmarkMutation.mutateAsync(bookmark.id || '');
        setIsUnpinning(false);
    }
    const handleArchiveBookmark = async (bookmark: BookmarkType) => {
        setIsArchiving(true);
        await archiveBookmarkMutation.mutateAsync(bookmark.id || '');
        setIsArchiving(false);
    }
    const handleUnarchiveBookmark = async (bookmark: BookmarkType) => {
        setIsUnarchiving(true);
        await unarchiveBookmarkMutation.mutateAsync(bookmark.id || '');
        setIsUnarchiving(false);
    }
    const handleDeleteBookmark = async (bookmark: BookmarkType) => {
        setIsDeleting(true);
        await deleteBookmarkMutation.mutateAsync(bookmark.id || '');
        setIsDeleting(false);
    }
  return (
    <div className="w-full md:w-[320px] p-4 bg-white border-gray-300 border rounded-[10px]">
            <div className="w-full flex items-start justify-between">
                <div className="flex gap-3">
                <div className="size-[40px] rounded-lg overflow-hidden">
                    <img src={bookmark.favicon} alt="Favicon" className="size-full object-cover object-center" />
                </div>
                <div className="flex flex-col">
                    <h4 className="text-xl font-raleway text-black font-medium">{title}</h4>
                    <p className="text-xs font-nunito-sans text-gray-500 font-normal">{bookmark.subTitle}</p>
                </div>
                </div>
                <button onClick={() => setIsOpen(true)} className="p-1 bg-white border border-gray-300 rounded-md relative cursor-pointer">
                    <Ellipsis className="size-[20px] text-gray-800 rotate-90" />
                    {isOpen && (
                        <div ref={containerRef} className="absolute bottom-[-110px] right-0 w-[200px] p-2 bg-white border-gray-300 border rounded-[10px] flex flex-col items-center justify-center">
                        <div onClick={() => handleOpenBookmark(bookmark)} className="w-full flex items-center justify-between pt-1 pb-1.5 px-3  border-b border-gray-200 cursor-pointer">
                            <p className="text-xs font-raleway text-gray-700 font-medium">Open</p>
                            <ExternalLink className="text-gray-700 size-[12px]" />
                        </div>
                        {bookmark.pinned ? (
                            <div onClick={() => handleUnPin(bookmark)} className="w-full flex items-center justify-between pt-1.5 pb-1.5 px-3  border-b border-gray-200 cursor-pointer">
                                <p className="text-xs font-raleway text-gray-700 font-medium">Remove from Pinned</p>
                                {isUnpinning ? (<LoaderCircle className="text-gray-700 size-[12px] animate-spin" />) : (
                                    <PinOff className="text-gray-700 size-[12px]" />
                                )}
                            </div>
                        ) : (
                            <div onClick={() => handlePinToTop(bookmark)} className="w-full flex items-center justify-between pt-1.5 pb-1.5 px-3  border-b border-gray-200 cursor-pointer">
                                <p className="text-xs font-raleway text-gray-700 font-medium">Pin to Top</p>
                                {isPinningToTop ? (<LoaderCircle className="text-gray-700 size-[12px] animate-spin" />) : (
                                    <Pin className="text-gray-700 size-[12px]" />
                                )}
                            </div>
                        )}
                        {bookmark.archived ? (
                            <div onClick={() => handleUnarchiveBookmark(bookmark)} className="w-full flex items-center justify-between pt-1.5 pb-1.5 px-3 border-b border-gray-200 cursor-pointer">
                                <p className="text-xs font-raleway text-gray-700 font-medium">Remove from Archive</p>
                                {isUnarchiving ? (<LoaderCircle className="text-gray-700 size-[12px] animate-spin" />) : (
                                    <ArchiveX className="text-gray-700 size-[12px]" />
                                )}
                            </div>
                        ) : (
                            <div onClick={() => handleArchiveBookmark(bookmark)} className="w-full flex items-center justify-between pt-1.5 pb-1.5 px-3 border-b border-gray-200 cursor-pointer">
                                <p className="text-xs font-raleway text-gray-700 font-medium">Archive</p>
                                {isArchiving ? (<LoaderCircle className="text-gray-700 size-[12px] animate-spin" />) : (
                                    <Archive className="text-gray-700 size-[12px]" />
                                )}
                            </div>
                        )}
                        <div onClick={() => handleDeleteBookmark(bookmark)} className="w-full flex items-center justify-between pt-1.5 pb-1.5 px-3 cursor-pointer">
                                <p className="text-xs font-raleway text-gray-700 font-medium">Delete</p>
                                {isDeleting ? (<LoaderCircle className="text-gray-700 size-[12px] animate-spin" />) : (
                                    <Trash className="text-gray-700 size-[12px]" />
                                )}
                            </div>
                    </div>
                    )}
                </button>
            </div>
            <div className="w-full mt-3 border-y border-gray-300 py-4">
                <p className="text-sm font-nunito-sans text-gray-700">{summary}</p>
                <div className="w-full flex items-center gap-3 mt-1.5">
                    {bookmark.tags.slice(0,3).map((tg) => {
                            const tag = tg.length > 8 ? tg.substring(0,8) + '...' : tg;

                        return <span className="px-2 py-1 bg-light-blue text-xs font-medium font-nunito-sans text-gray-700 rounded-sm">{tag}</span>
                        })}
                </div>
            </div>

            <div className="w-full flex items-center justify-between mt-2">
            <div className="w-full flex items-center gap-2">
                    {bookmark.views >= 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                            <Eye strokeWidth={2} className="text-gray-500 size-[12px]" />
                            <span className="text-xs font-semibold text-gray-500 font-nunito-sans">{bookmark.views}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                        <Clock strokeWidth={2} className="text-gray-500 size-[12px]" />
                        <span className="text-xs font-semibold text-gray-500 font-nunito-sans">{dateCreated}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                        <Calendar strokeWidth={2} className="text-gray-500 size-[12px]" />
                        <span className="text-xs font-semibold text-gray-500 font-nunito-sans">{lastViewed}</span>
                    </div>
            </div>
            {bookmark.pinned && (
                <button className="flex items-center justify-center">
                    <Pin  strokeWidth={2} className="text-gray-500 size-[16px]" />
                </button>
            )}
            </div>
    </div>  
  )
}

export default Bookmark