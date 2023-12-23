import React, { useState } from "react";
import ChatHistory from "./ChatHistory";
import { PiMagicWand } from "react-icons/pi";
import { BiSolidSend } from "react-icons/bi";
import { TbChartBubble } from "react-icons/tb";
import { TbGraph } from "react-icons/tb";
import { cn } from "@/lib/utils";
import MessagesContainer from "./MessagesContainer";
const ActionButton = ({
  icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => {
  return (
    <div
      className={cn(
        "bg-secondaryBg cursor-pointer flex items-center gap-3 text-white rounded-3xl py-4 px-5",
        active && "bg-primary text-secondaryBg"
      )}
    >
      <div className="text-lg">{icon}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const [text, setText] = useState("");
  const handleSend = (text: string) => {
    if (!text) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text,
      },
    ]);
    setText("");
  };
  return (
    <div className="grid w-full min-h-screen grid-cols-[1.4fr_3fr]">
      <ChatHistory />
      <div className="px-12 w-full h-full flex flex-col">
        <div className="flex-[0.82] h-full w-full">
          <MessagesContainer messages={messages} />
        </div>
        <div className="flex-[0.18]  h-full w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(text);
            }}
            className="relative flex items-center  w-full"
          >
            <div className="flex absolute left-4 items-center gap-3">
              <div className="text-2xl text-primary">
                <PiMagicWand />
              </div>
            </div>
            <input
              placeholder="Type.."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="py-6 text-white border-white/30 px-14 w-full bg-transparent rounded-3xl border"
            ></input>
            <div
              onClick={() => handleSend(text)}
              className="text-2xl text-white absolute right-5"
            >
              <BiSolidSend />
            </div>
          </form>
          <div className="mt-5 flex items-center gap-4">
            <ActionButton active icon={<TbGraph />} label="Precise" />
            <ActionButton icon={<TbGraph />} label="Balanced" />
            <ActionButton icon={<TbGraph />} label="Mid" />
            <ActionButton icon={<TbChartBubble />} label="Resync vectors" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
