'use client'
import { LoaderCircle, LogOut, Menu, Plus, Search, UserRoundPlus } from 'lucide-react'
import React, { useRef, useEffect, useState } from 'react'
import RetryToast from './RetryToast';
import { toast } from 'sonner';
import { toastStyles } from '@/utils';
import { GoogleAuthProvider, signOut } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';
import { useSearchContext } from '@/hooks/search';
import Form from './Form';
import SideBar from './SideBar';
import MobileSideBar from './MobileSidebar';

const NavBar = () => {
    const {searchQuery, setSearchQuery} = useSearchContext();
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const [isSignOutOpen, setIsSignOutOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const provider = new GoogleAuthProvider();


    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsSignOutOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);


    const handleSignOut = async () => {
         await signOut(auth);
    }
    const handleSignUp = async () => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL!;

        try {
            console.log("Clickeddd")
            setLoading(true);
            const userCredential = await signInWithPopup(auth, provider);
            console.log(userCredential);
            const user = userCredential.user;
            if(user){
                try {
                    const idToken = await user.getIdToken();
                    console.log(idToken)
                    const res = await fetch(`${API_URL}/api/add-user`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${idToken}`
                        },
                        body: JSON.stringify({
                          uid: user.uid,
                          name: user.displayName,
                          email: user.email,
                          photo: user.photoURL
                        })
                      });
                      if(!res.ok){
                        console.error('Erorr while trying to save user to db')
                      }
                      const result = await res.json();
                      if(result.success){
                        toast.success('Signed In Successfully');
                      } else {
                        toast.error(result.message);
                      }
                } catch (dbError : any) {
                    if (dbError.code === 'unavailable' || dbError.message?.includes('network')) {
                        console.error('Error occured:', dbError);
                        toast.error(
                            <RetryToast label='Try again' message="Network error: Profile data couldn't be saved." retry={() => handleSignUp()} />,
                            toastStyles.error
                        );
                    } else {
                        toast.error(
                            <RetryToast label='Try again' message='Profile creation failed. Please contact support.' retry={() => handleSignUp()} />,
                            toastStyles.error
                        );
                    }
                }
            }
        } catch (error : any) {
            console.log('Error details:', error);
            if(error.code === 'auth/email-already-in-use'){
                toast.error(
                    <RetryToast label='Log in' message="This email is already registered. Please use a different email or try logging in." retry={() => {}} />, toastStyles.error);
            } else if (error.code === 'auth/weak-password') {
                toast.error('Password is too weak. Please choose a stronger password.', toastStyles.errorSimple);
            } else if (error.code === 'auth/network-request-failed') {
                toast.error(
                    <RetryToast label='Try again' message="Network error: Please check your internet connection and try again." retry={() => handleSignUp()} />, toastStyles.error
                );
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }; 
    
  return (
    <header className='w-full bg-white py-3 lg:py-2 px-4 lg:px-8 flex items-center justify-between'>
        <div className="flex items-center gap-2">
        <button onClick={() => setIsSidebarOpen(true)} className="block lg:hidden p-2.5 bg-white border border-gray-300 rounded-md relative cursor-pointer">
            <Menu className='size-[20px] text-gray-800' />
        </button>
            <div className="border-1 border-gray-300 rounded-lg overflow-hidden w-[200px] lg:w-[300px] group focus-within:border-gray-600 flex items-center justify-between px-4 transition-all duration-200 ease-in-out">
                <Search className='group-focus-within:text-gray-800 text-gray-500 size-[16px] transition-all duration-200 ease-in-out' />
                <input type="text"                 value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} className="w-[90%] h-[40px] px-2 text-sm text-gray-800 font-nunito-sans placeholder:text-gray-500 border-0 stroke-0 outline-0 transition-all duration-200 ease-in-out" placeholder='Search by title...'/>
            </div>
        </div>

        <div className="">
            {user ? (
                    <div className='flex items-center gap-2'>
                        <button onClick={() => setIsFormOpen(true)} className='px-2 lg:px-4 py-2 rounded-md bg-dark-blue text-white font-medium font-raleway text-sm flex items-center gap-1.5 cursor-pointer'>
                            <Plus className='size-[18px] text-white' />
                            <span className='hidden lg:block'>Add Bookmark</span>
                        </button>
                        <div ref={containerRef} onClick={() => setIsSignOutOpen(true)} className="relative">
                            <div className='size-[40px] rounded-full overflow-hidden'>
                            <Image src={user.photo} width={40} height={40} alt='Profile picture' className='object-cover object-center' />
                            </div>
                           {isSignOutOpen && (
                             <button onClick={handleSignOut} className='absolute right-0 bottom-[-45px] z-20 px-2 py-1.5 bg-white font-raleway font-medium text-red-500 text-sm flex items-center justify-center gap-2 rounded-md border-gray-200 border w-[100px] cursor-pointer'>
                             <span>Sign Out</span>
                             <LogOut className='size-[14px] text-red-500' />
                            </button>
                           )}
                        </div>
                    </div>
            ) : (
                    <button onClick={() => handleSignUp()} className='px-4 py-2 rounded-md bg-dark-blue text-white font-medium font-raleway text-sm flex items-center gap-1.5 cursor-pointer'>
                    {loading ? (
                            <>
                            <span>Signing In</span>
                            <LoaderCircle className='size-[18px] text-white animate-spin' />
                            </>
                        ) : (
                            <>
                            <UserRoundPlus className='size-[18px] text-white' />
                            <span className='hidden lg:block'>Sign In</span></>
                    )}
                    </button>
            )}
        </div>

        <Form isopen={isFormOpen} closeModal={() => setIsFormOpen(false)} />
        {isSidebarOpen && (
            <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-white/30 backdrop-blur-xs flex items-start justify-start z-[1000]">
                <div onClick={() => setIsSidebarOpen(false)} className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-white/30 backdrop-blur-xs z-10"></div>
                <MobileSideBar />
            </div>
        )}
    </header>
  )
}

export default NavBar