'use client'
import { LoaderCircle, Plus, Search, UserRoundPlus } from 'lucide-react'
import React, { useState } from 'react'
import RetryToast from './RetryToast';
import { toast } from 'sonner';
import { toastStyles } from '@/utils';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';

const NavBar = () => {
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const provider = new GoogleAuthProvider();
    console.log(user);
    const handleSignUp = async () => {
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
                    const res = await fetch("http://localhost:4000/api/add-user", {
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
                        toast.success(result.message);
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
    <header className='w-full bg-white py-2 px-8 flex items-center justify-between'>
        <div className="border-1 border-gray-300 rounded-lg overflow-hidden w-[300px] group focus-within:border-gray-600 flex items-center justify-between px-4 transition-all duration-200 ease-in-out">
            <Search className='group-focus-within:text-gray-800 text-gray-500 size-[16px] transition-all duration-200 ease-in-out' />
            <input type="text" className="w-[90%] h-[40px] px-2 text-sm text-gray-800 font-nunito-sans placeholder:text-gray-500 border-0 stroke-0 outline-0 transition-all duration-200 ease-in-out" placeholder='Search by title...'/>
        </div>

        <div className="">
            {user ? (
                    <div className='flex items-center gap-2'>
                        <button className='px-4 py-2 rounded-md bg-dark-blue text-white font-medium font-raleway text-sm flex items-center gap-1.5 cursor-pointer'>
                            <Plus className='size-[18px] text-white' />
                            <span>Add Bookmark</span>
                        </button>
                        <div className='size-[40px] rounded-full overflow-hidden'>
                        <Image src={user.photo} width={40} height={40} alt='Profile picture' className='object-cover object-center' />
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
                            <span>Sign In</span></>
                    )}
                    </button>
            )}
        </div>
    </header>
  )
}

export default NavBar