
const BookmarkSkeleton = () => {
  return (
    <div className="w-[300px] p-4 bg-gray-200 border-gray-300 border rounded-[10px]">
            <div className="w-full flex items-start justify-between">
                <div className="flex gap-3">
                <div className="size-[40px] rounded-lg skeleton"></div>
                <div className="flex flex-col">
                    <div className="w-[100px] h-[25px] rounded-[6px] skeleton"></div>
                    <div className="w-[80px] h-[15px] rounded-[6px] skeleton mt-1"></div>
                </div>
                </div>
                <div className="size-[30px] rounded-md skeleton"></div>
            </div>
            <div className="w-full mt-3 border-y border-gray-300 py-4">
                <div className="skeleton w-full h-[15px] rounded-[6px]"></div>
                <div className="skeleton w-full h-[15px] rounded-[6px] mt-1"></div>
                <div className="skeleton w-full h-[15px] rounded-[6px] mt-1"></div>
                <div className="w-full flex items-center gap-3 mt-1.5">
                    <div className="w-[60px] h-[20px] rounded-md skeleton"></div>
                    <div className="w-[60px] h-[20px] rounded-md skeleton"></div>
                    <div className="w-[60px] h-[20px] rounded-md skeleton"></div>
                </div>
            </div>

            <div className="w-full flex items-center gap-3 mt-3">
                    <div className="w-[30px] h-[20px] rounded-md skeleton"></div>
                    <div className="w-[30px] h-[20px] rounded-md skeleton"></div>
                    <div className="w-[30px] h-[20px] rounded-md skeleton"></div>
            </div>
    </div>  
  )
}

export default BookmarkSkeleton