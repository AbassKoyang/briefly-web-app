import { useAuth } from '@/hooks/auth';
import { bookmarkPage } from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import React, { useRef, useEffect, useState } from 'react'
import { toast } from 'sonner';

const Form = ({isopen, closeModal}: {isopen: boolean, closeModal: () => void}) => {
  const queryClient = useQueryClient();
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          closeModal();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
  const bookmarkPageMutation = useMutation({
    mutationFn: (url: string) => bookmarkPage(url, user?.uid || ''),
    onSuccess: () => {
      toast.success('Bookmark added successfully')
      queryClient.invalidateQueries({ queryKey: ['bookmarks', 'pinned-bookmarks'] });
      closeModal();
    },
    onError: () => {
      toast.error('Error adding bookmark')
    }
  });
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const url = e.currentTarget.url.value;
    await bookmarkPageMutation.mutateAsync(url);
    setLoading(false);
  }
  return (
   <>
   {isopen && ( <div className={`fixed w-[100vw] h-[100vh] top-0 left-0 bg-white/30 backdrop-blur-xs flex items-center justify-center z-[1000]`}>
        <form onSubmit={handleSubmit} ref={containerRef} className="w-full max-w-[320px] bg-white p-4 rounded-lg border border-gray-400">
        <input required type="url" className="w-full h-[45px] px-2 text-sm text-gray-800 font-nunito-sans placeholder:text-gray-500 border-1 rounded-md stroke-0 outline-0 transition-all duration-200 ease-in-out" placeholder='Enter a valid url..'/>
        <button type='submit' className='w-full py-3 rounded-md bg-dark-blue text-white text-sm font-raleway font-semibold mt-2'>Submit {loading ? <LoaderCircle className='size-[18px] text-white animate-spin' /> : null}</button>
        </form>
    </div>
   )}
   </>
  )
}

export default Form