'use client';
import { useAuth } from '@/hooks/auth';
import { useTagContext } from '@/hooks/tag';
import { useFetchArchivedBookmarks, useFetchBookmarks } from '@/utils/queries';
import { Archive, House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo, useState } from 'react';
const MobileSideBar = () => {
    const pathname = usePathname();
    const {user} = useAuth();
    const {tags, setTags} = useTagContext()
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
      } = useFetchBookmarks(user?.uid || '');

      const allBookmarks = useMemo(() => {
          return data?.pages.flatMap(page => page.bookmarks) ;
        }, [data]);

        const uniqueTags = [...new Set(allBookmarks?.map((bm) => bm.tags).flat())];
        const flattenedTags = allBookmarks?.map((bm) => bm.tags).flat()
        console.log('tags:', tags);
        console.log('unique:', uniqueTags);

        const toggleTag = (tag: string, checked: boolean) => {
            if (checked) {
                 setTags(tags.includes(tag) ? tags : [...tags, tag]);
              } else {
                setTags(tags.filter(t => t !== tag));
              }
          };
          console.log('selected tags:', tags);

  return (
    <div className='w-[85%] z-30 h-full p-4 bg-white border-r border-gray-300'>
        <div className="flex items-center justify-start gap-2">
            <Link className='flex items-center justify-center size-[35px] rounded-md overflow-hidden shadow-xs' href='/'><Image src='/icon-512.png' width={35} height={35} alt='Logo' className='object-center object-cover size-full'/></Link>
            <h4 className='text-[24px] font-semibold text-dark-blue font-raleway'>Briefly</h4>
        </div>
        <div className='mt-8'>
            <Link className={`${pathname == '/' ? 'bg-light-blue' : 'bg-transparent'} w-full py-2 px-3 rounded-lg group hover:bg-light-blue transition-colors duration-300 ease-in-out flex items-center gap-2`} href='/'>
            <House strokeWidth={2} className={`${pathname == '/' ? 'text-black' : 'text-gray-600'} size-[20px] group-hover:text-black transition-colors duration-300 ease-in-out`} />
            <p className={`${pathname == '/' ? 'text-black' : 'text-gray-600' } text-[16px] group-hover:text-black transition-colors duration-300 ease-in-out font-medium font-raleway`}>Home</p>
            </Link>
        </div>
        <div className='mt-2'>
            <Link className={`${pathname == '/archived' ? 'bg-light-blue' : 'bg-transparent'} w-full py-2 px-3 rounded-lg group hover:bg-light-blue transition-colors duration-300 ease-in-out flex items-center gap-2`} href='/archived'>
            <Archive strokeWidth={2} className={`${pathname == '/archived' ? 'text-black' : 'text-gray-600'} size-[20px] group-hover:text-black transition-colors duration-300 ease-in-out`}/>
            <p className={`${pathname == '/archived' ? 'text-black' : 'text-gray-600' } text-[16px] group-hover:text-black transition-colors duration-300 ease-in-out font-medium font-raleway`}>Archived</p>
            </Link>
        </div>
        <div className="mt-2">
            <h6 className='text-gray-600 text-[14px] group-hover:text-black transition-colors duration-300 ease-in-out font-semibold font-raleway uppercase py-2 px-3'>Tags</h6>
            <div className="mt-2 flex flex-col gap-4 h-[500px] overflow-auto scrollbar-hide">
                {uniqueTags?.map((tag) => {
                    const filteredTags = flattenedTags?.filter((ftag) => ftag === tag);
                    console.log('Filtered tags:', filteredTags);
                    return (
                    <div className='w-full flex items-center justify-between px-3'>
                        <div className="flex items-center gap-1">
                            <input
                            onChange={(e) => toggleTag(tag, e.target.checked)}
                             type="checkbox" />
                            <p className='text-xs font-medium text-gray-600 font-raleway'>{tag}</p>
                        </div>

                        <span className='size-[20px] flex items-center justify-center rounded-full bg-light-blue text-gray-800 text-[10px] font-raleway'>
                            {filteredTags?.length}
                        </span>
                    </div>)
                })}
            </div>
        </div>
    </div>
  )
}

export default MobileSideBar