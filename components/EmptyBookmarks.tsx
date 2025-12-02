'use client';
import Link from 'next/link';

const EmptyBookmarks = () => {
  return (
    <div className="w-full mt-6 flex flex-col items-center justify-center h-full">
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_2_7075)">
    <path d="M75 139C112.003 139 142 109.003 142 72C142 34.9969 112.003 5 75 5C37.9969 5 8 34.9969 8 72C8 109.003 37.9969 139 75 139Z" fill="white"/>
    </g>
    <g clip-path="url(#clip0_2_7075)">
    <g clip-path="url(#clip1_2_7075)">
    <path d="M75.0047 89.4793L72.6451 87.1029C63.9457 79.3608 58.1937 74.1378 58.1937 67.7224C58.1641 65.2637 59.1277 62.897 60.8664 61.1583C62.6051 59.4196 64.9718 58.4559 67.4305 58.4855C70.3434 58.5188 73.0994 59.811 74.9879 62.0291C76.8764 59.811 79.6324 58.5188 82.5453 58.4855C85.004 58.4559 87.3707 59.4196 89.1094 61.1583C90.8481 62.897 91.8118 65.2637 91.7822 67.7224C91.7822 74.1378 86.0721 79.3608 77.3307 87.1197L75.0047 89.4793Z" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M74.863 37.165V45.5622" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M57.3607 41.9849L61.5593 49.2568" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M44.6688 54.7744L51.9407 58.973" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 72.3105H48.3971" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M44.8199 89.8045L52.0919 85.606" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M57.6095 102.496L61.8081 95.2241" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M75.1453 107.165V98.7681" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M92.6394 102.353L88.4408 95.0815" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M105.331 89.5555L98.0593 85.3569" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M110 72.0283H101.603" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M105.188 54.5259L97.9165 58.7244" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M92.3905 41.834L88.1919 49.1059" stroke="#004CFF" stroke-width="3" stroke-linecap="round"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_2_7075" x="0" y="0" width="150" height="150" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="3"/>
    <feGaussianBlur stdDeviation="4"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.160784 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_7075"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_7075" result="shape"/>
    </filter>
    <clipPath id="clip0_2_7075">
    <rect width="70" height="70" fill="white" transform="translate(40 37.165)"/>
    </clipPath>
    <clipPath id="clip1_2_7075">
    <rect width="70" height="70" fill="white" transform="translate(40 37.165)"/>
    </clipPath>
    </defs>
    </svg>
     <h5 className='max-w-[320px] text-center text-[17px] font-semibold font-raleway mt-4'>You've not bookmarked any page yet</h5>
    <p className='max-w-[280px] text-center text-[12px] font-normal font-nunito-sans text-black/80 mt-2'>Pages you add to bookmark will appear here</p>
  </div>
  )
}

export default EmptyBookmarks;