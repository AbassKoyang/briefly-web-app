'use client';
import { Archive, House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const SideBar = () => {
    const pathname = usePathname();
  return (
    <div className='w-[15%] h-full p-4 bg-white border-r border-gray-300'>
        <div className="flex items-center justify-start gap-2">
            <Link className='flex items-center justify-center size-[35px] rounded-xl overflow-hidden shadow-sm' href='#'><Image src='/icon-512.png' width={35} height={35} alt='Logo' className='object-center object-cover size-full'/></Link>
            <h4 className='text-[24px] font-semibold text-dark-blue font-raleway'>Briefly</h4>
        </div>
        <div className='mt-8'>
            <Link className={`${pathname == '/' ? 'bg-light-blue' : 'bg-transparent'} w-full py-2 px-3 rounded-lg group hover:bg-light-blue transition-colors duration-300 ease-in-out flex items-center gap-2`} href='#'>
            <House strokeWidth={2} className={`${pathname == '/' ? 'text-black' : 'text-gray-600'} size-[20px] text-gray-600 group-hover:text-black transition-colors duration-300 ease-in-out`} />
            <p className={`${pathname == '/' ? 'text-black' : 'text-gray-600' } text-[16px] group-hover:text-black transition-colors duration-300 ease-in-out font-medium font-raleway`}>Home</p>
            </Link>
        </div>
        <div className='mt-2'>
            <Link className={`${pathname == '/archived' ? 'bg-light-blue' : 'bg-transparent'} w-full py-2 px-3 rounded-lg group hover:bg-light-blue transition-colors duration-300 ease-in-out flex items-center gap-2`} href='#'>
            <Archive strokeWidth={2} className={`${pathname == '/archived' ? 'text-black' : 'text-gray-600'} size-[20px] group-hover:text-black transition-colors duration-300 ease-in-out`}/>
            <p className={`${pathname == '/archived' ? 'text-black' : 'text-gray-600' } text-[16px] group-hover:text-black transition-colors duration-300 ease-in-out font-medium font-raleway`}>Archived</p>
            </Link>
        </div>
    </div>
  )
}

export default SideBar