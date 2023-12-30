import React, { useEffect } from "react";
import { PiChatCircleDuotone, PiDotsThreeOutlineFill } from "react-icons/pi";
import { CgMenuMotion } from "react-icons/cg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteThread, getMessageThreads } from "./ChatHistory.api";
import { convertToRelativeTime } from "@/utils/functions";
import { useChatContext } from "../Chat.context";
import { cn } from "@/lib/utils";
import { Thread } from "../Chat.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

type ThreadItemProps = {
  threadData: Thread;
};
const ThreadItem = ({ threadData }: ThreadItemProps) => {
  const { activeThread, setActiveThread } = useChatContext();
  const queryClient = useQueryClient();
  const handleThreadItemClick = () => {
    setActiveThread(threadData);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteThread(threadData?._id?.$oid),
    onSuccess: (data) => {
      queryClient.setQueryData(["message-threads"], (oldData: any) => {
        console.log(oldData, "Old threads!");
        return {
          threads: [
            ...(oldData?.threads?.filter(
              (thread: any) => thread?._id?.$oid !== threadData?._id?.$oid
            ) || []),
          ],
        };
      });
    },
    onError: (e: AxiosError<any, any>) => {
      toast.error(e?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleDelete = () => {
    mutate();
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
      <div className="flex items-center justify-between">
        <div className="cursor-pointer">
          <div className="text-xs opacity-80 font-semibold">
            {threadData?.title}
          </div>
          <div className="mt-1 text-sm">{threadData?.lastMessage}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-white/50 text-xs">
            {convertToRelativeTime(threadData.updatedAt)}
          </div>
          <div className="mt-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <PiDotsThreeOutlineFill />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font">Edit</DropdownMenuItem>
                <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
                  {isPending ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
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
