import React from "react";
import ChatHistory from "./ChatHistory";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import { ChatContextProvider, useChatContext } from "./Chat.context";

const Chat = () => {
  const { fetchThreadMessagesError, fetchThreadMessagesLoading } =
    useChatContext();
  return (
    <div className="grid w-full min-h-screen grid-cols-[1.4fr_3fr]">
      <ChatHistory />
      {fetchThreadMessagesLoading ? (
        <div className="flex items-center justify-center text-white/70">
          Fetching messages...
        </div>
      ) : fetchThreadMessagesError ? (
        <div className="flex items-center justify-center text-red-300">
          Something went wrong!
        </div>
      ) : (
        <div className="px-12 w-full h-full flex flex-col">
          <div className="flex-[0.82] h-full w-full">
            <MessagesContainer />
          </div>
          <MessageInput />
        </div>
      )}
    </div>
  );
};

const ChatWithContext = () => {
  return (
    <ChatContextProvider>
      <Chat />
    </ChatContextProvider>
  );
};

export default ChatWithContext;
