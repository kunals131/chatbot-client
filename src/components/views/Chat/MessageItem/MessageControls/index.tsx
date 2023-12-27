import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { LuDownloadCloud } from "react-icons/lu";
import { ChatMessage } from "../../Chat.types";
import { readJson } from "../MessageItem.helpers";
import { useAsyncCallback } from "react-async-hook";
import { fetchMessageData } from "./MessageControls.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import Loader from "react-spinners/ClipLoader";
const MessageControlItem = ({
  Icon,
  label,
  onClick,
  disabled,
  loading,
}: {
  Icon: any;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  console.log(label, disabled);
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex hover:underline opacity-50 cursor-pointer hover:opacity-100 items-center gap-1",
        (disabled || loading) && "pointer-events-none"
      )}
    >
      <div className="text-xs">
        {loading ? <Loader size={14} color="white" /> : <Icon />}
      </div>
      <div className="text-white text-xs">{label}</div>
    </div>
  );
};

const ContextDialog = ({ data }: { data?: ChatMessage }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessageControlItem
          disabled={!data}
          Icon={BsFileEarmarkText}
          label="context"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Context</DialogTitle>
          <DialogDescription>Metadata used to fetch results</DialogDescription>
        </DialogHeader>
        <div className="w-full text-gray-200 bg-secondaryBg p-2 h-[250px] mt-2 rounded-lg">
          <pre
            className={`max-h-[250px] h-full overflow-auto p-4 text-left rounded-lg`}
          >
            <code>
              {readJson({
                entities: data?.entities,
                intent: data?.intent,
                candidatesFound: data?.suggestedResults?.matches?.length,
              })}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MessageControls = ({ data }: { data?: ChatMessage }) => {
  const queryClient = useQueryClient();
  const fetchSuggestionsApi = useAsyncCallback(fetchMessageData, {
    onError: (e: any) => {
      toast.error(e?.response?.data?.message || "Something went wrong!");
    },
    onSuccess: (data) => {
      console.log(data, "Message fetched!");
      queryClient.setQueryData(
        ["thread-messages", { activeThreadId: data?.message?.threadId }],
        (oldData: any) => {
          return {
            messages: oldData?.messages?.map((message: any) => {
              if (message._id.$oid === data?.message?._id.$oid) {
                return data?.message;
              }
              return message;
            }),
          };
        }
      );
    },
  });
  return (
    <div className="flex h-3 items-center space-x-3">
      <ContextDialog data={data} />
      <Separator orientation="vertical" />
      <MessageControlItem
        disabled={
          fetchSuggestionsApi.loading ||
          !data ||
          !data?.suggestedResults?.matches ||
          (data?.populatedResults?.length || 0) > 0
        }
        Icon={LuDownloadCloud}
        label="list suggestions"
        loading={fetchSuggestionsApi.loading}
        onClick={() => fetchSuggestionsApi.execute(data?._id?.$oid || "")}
      />
    </div>
  );
};

export default MessageControls;
