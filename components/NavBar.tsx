import { Search } from 'lucide-react'
import React from 'react'

const NavBar = () => {
  return (
    <header className='w-full bg-white py-2 px-8 flex items-center justify-between'>
        <div className="border-1 border-gray-300 rounded-lg overflow-hidden w-[300px] group focus-within:border-gray-600 flex items-center justify-between px-4 transition-all duration-200 ease-in-out">
            <Search className='group-focus-within:text-gray-800 text-gray-500 size-[16px] transition-all duration-200 ease-in-out' />
            <input type="text" className="w-[90%] h-[40px] px-2 text-sm text-gray-800 font-nunito-sans placeholder:text-gray-500 border-0 stroke-0 outline-0 transition-all duration-200 ease-in-out" placeholder='Search by title...'/>
        </div>
    </header>
  )
}

export default NavBar