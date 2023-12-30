import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { ChatMessage } from "../Chat.types";
import Loader from "react-spinners/BeatLoader";
import { useIsMounted } from "@/utils/hooks/useIsMounted";
import { useChatContext } from "../Chat.context";
import { DataTable } from "../FilteredEngineersTable";
import { prepareSuggestedRecords } from "./MessageItem.helpers";
import { motion } from "framer-motion";
import MessageControls from "./MessageControls";
import { TypeAnimation } from "react-type-animation";

const MessageItem = ({ isSelf, text, additionalInfo, isPending }: Props) => {
  const isMounted = useIsMounted();
  const { lastMessageId, setLastMessageId } = useChatContext();
  const isLastMessage = lastMessageId === additionalInfo?._id.$oid;
  console.log(additionalInfo);
  const isTableVisible =
    additionalInfo?.suggestedResults &&
    additionalInfo?.suggestedResults?.matches?.length &&
    additionalInfo?.populatedResults;

  const tableRecords = useMemo(() => {
    if (isTableVisible) {
      const combinedRecords = additionalInfo?.suggestedResults?.matches?.map(
        (match) => {
          const item =
            additionalInfo?.populatedResults?.find(
              (item) => item.resumeId === match.id
            ) || {};
          return {
            ...item,
            ...match,
          };
        }
      );
      return prepareSuggestedRecords(combinedRecords);
    } else {
      return [];
    }
  }, [
    additionalInfo?.suggestedResults?.matches,
    additionalInfo?.populatedResults,
  ]);

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
            <div className="flex items-center gap-3">
              <div className="font-semibold text-base">Mercor bot</div>
              <MessageControls data={additionalInfo} />
            </div>
            {isPending ? (
              <div>
                <Loader size={9} color="#ffff" />
              </div>
            ) : isLastMessage ? (
              <TypeAnimation
                sequence={[
                  text,
                  () => {
                    setTimeout(() => setLastMessageId(""));
                  },
                ]}
              />
            ) : (
              <div className="w-full">
                <div className="">
                  <div>{text}</div>
                </div>
                {Boolean(isTableVisible) && (
                  <motion.div
                    animate={isLastMessage ? { translateY: "0px" } : {}}
                    initial={isLastMessage ? { translateY: "50px" } : {}}
                    className="w-full mt-1"
                  >
                    <DataTable records={tableRecords} />
                  </motion.div>
                )}
                {additionalInfo?.suggestedResults?.matches?.length === 0 && (
                  <div className="text-xs text-gray-400 mt-2 py-1 border-t border-t-white/30">
                    Sorry I looked all over but didn{"'"}t find anything so far.
                  </div>
                )}
              </div>
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
