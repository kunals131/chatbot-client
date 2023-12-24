import { cn } from "@/lib/utils";
import React from "react";
import { useChatContext } from "../Chat.context";
import MessageItem from "../MessageItem";

const MessagesContainer = () => {
  const { messages, tempMessage, sendMessageLoading } = useChatContext();
  return (
    <div className="min-h-full py-9 w-full overflow-y-auto">
      <div className="space-y-7">
        {messages.map((message, idx) => (
          <>
            <MessageItem key={message._id.$oid} text={message.message} isSelf />
            <MessageItem
              key={idx}
              text={message.response}
              additionalInfo={message}
            />
          </>
        ))}
        {tempMessage && <MessageItem text={tempMessage} isSelf />}
        {sendMessageLoading && (
          <MessageItem text={tempMessage} isSelf isPending />
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;
