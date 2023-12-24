import React from "react";
import { PiChatCircleDuotone } from "react-icons/pi";
import { CgMenuMotion } from "react-icons/cg";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getMessageThreads } from "./ChatHistory.api";
import { Thread } from "./ChatHistory.types";
import { convertToRelativeTime } from "@/utils/functions";

type ThreadItemProps = {
  threadData: Thread;
};
const ThreadItem = ({ threadData }: ThreadItemProps) => {
  return (
    <div className="px-4 border cursor-pointer border-white/20 hover:border-white/90 transition-all py-3 hover:scale-x-105 hover:scale-110 rounded-md bg-secondaryBgElevated">
      <div className="text-xs flex items-center justify-between opacity-80 font-semibold cursor-pointer">
        <div className="">{threadData?.title}</div>
        <div className="text-white/50">
          {convertToRelativeTime(threadData.updatedAt)}
        </div>
      </div>
      <div className="mt-1 text-sm">{threadData?.lastMessage}</div>
    </div>
  );
};

const ChatHistory = () => {
  const {
    data: fetchedThreads,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getMessageThreads,
    queryKey: ["message-threads"],
    select: (data) => (data?.threads || []) as Thread[],
  });

  return (
    <div className="bg-secondaryBg min-h-screen w-full rounded-r-3xl py-10 px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[56px] h-[56px] rounded-full bg-white p-[1px]">
            <div
              style={{ background: `url(/robot.jpg) center center/cover` }}
              className="w-full h-full relative rounded-full"
            ></div>
          </div>
          <div className="text-white text-lg font-medium">Mercor Chat</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-primary text-sm  rounded-3xl text-secondaryBg px-6 font-medium py-3">
            {fetchedThreads?.length} Active Chats
          </button>
        </div>
      </div>
      <div className="mt-9 flex items-center gap-4">
        <div className="w-full relative flex items-center">
          <div className="text-primary text-3xl absolute left-4">
            <PiChatCircleDuotone />
          </div>
          <input
            placeholder="Start a new chat.."
            className="bg-secondaryBgElevated border border-gray-700 pl-14 placeholder:text-sm outline-none text-white placeholder:text-white/50 py-5 rounded-3xl w-full"
          />
        </div>
        <div className="w-16 text-white text-2xl h-16 shrink-0 bg-secondaryBgElevated rounded-full flex items-center justify-center">
          <CgMenuMotion />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        {fetchedThreads?.map((item) => (
          <ThreadItem threadData={item} key={item._id.$oid} />
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
