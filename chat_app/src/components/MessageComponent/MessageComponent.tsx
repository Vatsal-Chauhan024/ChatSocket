import dayjs from "dayjs"
import type { SpecificMessageType } from "../../types/Chat"

interface MessageComponentProps{
    item: SpecificMessageType
    isLeft: boolean
}

const MessageComponent = ({item, isLeft}: MessageComponentProps) => {
  return (
    <div className={`bg-gray-200 w-1/2 p-2 m-2 rounded-md inline-block ${item?.user === 'Admin' ? 'relative -translate-x-1/2 left-1/2 bg-slate-300' : isLeft ? 'float-left bg-green-400' : 'float-right bg-lime-400'}`}>
      <p className="text-slate-700 font-semibold text-sm mb-1">{item?.user}</p>
      {item?.message}
      <p className="text-slate-500 font-semibold text-xs text-right">{dayjs(new Date()).format('h:mm A')}</p>
      </div>
  )
}

export default MessageComponent