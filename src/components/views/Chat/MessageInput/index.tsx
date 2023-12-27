import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { PiMagicWand } from "react-icons/pi";
import { TbChartBubble, TbGraph } from "react-icons/tb";
import { useChatContext } from "../Chat.context";
import Loader from 'react-spinners/ClipLoader'
import { QueryModes } from "../Chat.types";

const ActionButton = ({
  icon,
  label,
  active,
  onClick
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: ()=>void
}) => {
  return (
    <div
      onClick={onClick}
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


const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, queryMode,setQueryMode, sendMessageLoading, isSendMessageError } =
    useChatContext();
  const handleSend = (text: string) => {
    if (!text) return;
    sendMessage(text);
    setText("")
  };
  
  return (
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
          disabled={sendMessageLoading}
          onChange={(e) => setText(e.target.value)}
          className="py-6 text-white disabled:opacity-60 border-white/30 px-14 w-full bg-transparent rounded-3xl border"
        ></input>
        <div
          onClick={() => handleSend(text)}
          className="text-2xl text-white absolute right-5"
        >
          {sendMessageLoading?<Loader className="text-white" size={22} color="white"/>:<BiSolidSend />}
        </div>
      </form>
      <div className="mt-5 flex items-center gap-4">
        <ActionButton onClick={()=>setQueryMode(QueryModes.PERCISE)} active={QueryModes.PERCISE === queryMode} icon={<TbGraph />} label="Precise" />
        <ActionButton onClick={()=>setQueryMode(QueryModes.BALANCED)} active={QueryModes.BALANCED === queryMode} icon={<TbGraph />} label="Balanced" />
        <ActionButton onClick={()=>setQueryMode(QueryModes.BASIC)} active={QueryModes.BASIC === queryMode} icon={<TbGraph />} label="Basic" />
        <ActionButton  icon={<TbChartBubble />} label="Resync vectors" />
      </div>
    </div>
  );
};

export default MessageInput;
