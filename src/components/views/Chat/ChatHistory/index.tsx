import React, { useEffect } from "react";
import { PiChatCircleDuotone } from "react-icons/pi";
import { CgMenuMotion } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import { getMessageThreads } from "./ChatHistory.api";
import { convertToRelativeTime } from "@/utils/functions";
import { useChatContext } from "../Chat.context";
import { cn } from "@/lib/utils";
import { Thread } from "../Chat.types";

type ThreadItemProps = {
  threadData: Thread;
};
const ThreadItem = ({ threadData }: ThreadItemProps) => {
  const { activeThread, setActiveThread } = useChatContext();
  const handleThreadItemClick = () => {
    setActiveThread(threadData);
  };
  const isActive = activeThread?._id?.$oid === threadData._id.$oid;
  return (
    <div
      onClick={handleThreadItemClick}
      className={cn(
        "px-4 border cursor-pointer border-white/20 hover:border-white/90 transition-all py-4  rounded-md bg-secondaryBgElevated",
        isActive && "border-white/90"
      )}
    >
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

  const { setActiveThread, isNewThread, setIsNewThread } = useChatContext();

  useEffect(() => {
    if (fetchedThreads?.length) {
      setActiveThread(fetchedThreads[0]);
    }
  }, [fetchedThreads]);

  const isFallbackUI = isLoading || isError;
  const fallbackUI = (
    <div className="my-16 text-sm text-white/70 text-center">
      {isLoading ? "Fetching threads.." : "Something went wrong!"}
    </div>
  );

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
            {fetchedThreads?.length} Active Threads
          </button>
        </div>
      </div>
      <div className="mt-9 flex items-center gap-4">
        <div className="w-full relative flex items-center">
          <div className="text-primary text-3xl absolute left-4">
            <PiChatCircleDuotone />
          </div>
          <div
            onClick={() => setIsNewThread(true)}
            className="bg-secondaryBgElevated border cursor-pointer border-gray-700 pl-14 placeholder:text-sm outline-none text-white/70 hover:text-white  hover:border-gray-300 transition-all placeholder:text-white/50 py-5 rounded-2xl w-full"
          >
            Start a new conversation
          </div>
        </div>
        <div className="w-16 text-white text-2xl h-16 shrink-0 bg-secondaryBgElevated rounded-full flex items-center justify-center">
          <CgMenuMotion />
        </div>
      </div>
      <div className="h-[650px] overflow-y-auto">
        <div className="mt-6 space-y-4">
          {isFallbackUI
            ? fallbackUI
            : fetchedThreads?.map((item) => (
                <ThreadItem threadData={item} key={item._id.$oid} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
