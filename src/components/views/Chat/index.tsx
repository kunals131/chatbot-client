import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { PiMagicWand } from "react-icons/pi";
import { BiSolidSend } from "react-icons/bi";
import { TbChartBubble } from "react-icons/tb";
import { TbGraph } from "react-icons/tb";
import { cn } from "@/lib/utils";
import MessagesContainer from "./MessagesContainer";
import MessageInput from "./MessageInput";
import { ChatContextProvider } from "./Chat.context";

const Chat = () => {
  return (
    <ChatContextProvider>
      <div className="grid w-full min-h-screen grid-cols-[1.4fr_3fr]">
        <ChatHistory />
        <div className="px-12 w-full h-full flex flex-col">
          <div className="flex-[0.82] h-full w-full">
            <MessagesContainer />
          </div>
          <MessageInput />
        </div>
      </div>
    </ChatContextProvider>
  );
};

export default Chat;
