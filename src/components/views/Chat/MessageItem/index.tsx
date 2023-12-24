import { cn } from "@/lib/utils";
import React from "react";
import { ChatMessage } from "../Chat.types";
import Loader from "react-spinners/BeatLoader";
import { useIsMounted } from "@/utils/hooks/useIsMounted";
import { useChatContext } from "../Chat.context";
import TypeWriterEffect from "@/components/common/TypeWriterEffect";

const MessageItem = ({ isSelf, text, additionalInfo, isPending }: Props) => {
  const isMounted = useIsMounted();
  const { lastMessageId, setLastMessageId } = useChatContext();
  const isLastMessage = lastMessageId === additionalInfo?._id.$oid;
  if (!isMounted) return null;
  return (
    <div className={cn("flex items-center")}>
      {isSelf ? (
        <div className="flex items-start gap-2">
          <div className="w-[35px] rounded-full flex items-center justify-center bg-[#aa5632] h-[35px]">
            <div className="text-white text-sm">KS</div>
          </div>
          <div className="">
            <div className="font-semibold text-base">You</div>
            <div className="">{text}</div>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <div className="w-[35px] rounded-full flex items-center justify-center bg-[#aa5632] h-[35px]">
            <div
              style={{ background: `url(/robot.jpg) center center/cover` }}
              className="w-full h-full relative rounded-full"
            ></div>
          </div>
          <div className="">
            <div className="font-semibold text-base">Mercor bot</div>
            {isPending ? (
              <div>
                <Loader size={9} color="#ffff" />
              </div>
            ) : isLastMessage ? (
              <TypeWriterEffect
                run
                onTextEnd={() => setLastMessageId("")}
                text={text}
              />
            ) : (
              <div className="">{text}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {
  isSelf?: boolean;
  text: string;
  additionalInfo?: ChatMessage;
  isPending?: boolean;
};

export default MessageItem;