import { cn } from "@/lib/utils";
import React from "react";
import { useChatContext } from "../Chat.context";
import MessageItem from "../MessageItem";

const MessagesContainer = () => {
  const { messages, tempMessage, sendMessageLoading } = useChatContext();
  return (
    <div className="h-[700px] overflow-y-scroll py-9 w-full">
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
        {(tempMessage || sendMessageLoading) && <MessageItem text={""} isPending />}
      </div>
      <div id="messages-container-end"></div>
    </div>
  );
};

export default MessagesContainer;
