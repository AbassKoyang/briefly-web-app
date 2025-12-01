import { BookmarkType } from "@/types"
import { Calendar, Clock, Ellipsis, Eye, Pin } from "lucide-react"

const Bookmark = ({bookmark} : {bookmark: BookmarkType}) => {
    console.log(bookmark);
    const date = new Date(bookmark.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short"
    });
    console.log(date);
    const title = bookmark.title.length > 15 ? bookmark.title.substring(0,15) + '...' : bookmark.title;
    const summary = bookmark.summary.length > 150 ? bookmark.summary.substring(0,150) + '...' : bookmark.summary;
  return (
    <div className="w-[320px] p-4 bg-white border-gray-300 border rounded-[10px]">
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
                <button className="p-1 bg-white border border-gray-300 rounded-md">
                    <Ellipsis className="size-[20px] text-gray-800 rotate-90" />
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
                    <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                        <Eye strokeWidth={2} className="text-gray-500 size-[12px]" />
                        <span className="text-xs font-semibold text-gray-500 font-nunito-sans">152</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                        <Clock strokeWidth={2} className="text-gray-500 size-[12px]" />
                        <span className="text-xs font-semibold text-gray-500 font-nunito-sans">{date}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-sm">
                        <Calendar strokeWidth={2} className="text-gray-500 size-[12px]" />
                        <span className="text-xs font-semibold text-gray-500 font-nunito-sans">15 Jan</span>
                    </div>
            </div>
            <button className="flex items-center justify-center">
            <Pin  strokeWidth={2} className="text-gray-500 size-[16px]" />
            </button>
            </div>
    </div>  
  )
}

export default Bookmark