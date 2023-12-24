import { cn } from "@/lib/utils";
import React from "react";

const MessageItem = ({ isSelf, text }: { isSelf?: boolean; text: string }) => {
  return (
    <div
      className={cn(
        "flex items-center",
        isSelf && "justify-start",
        !isSelf && "justify-end"
      )}
    >
      <div
        className={cn(
          "px-5 py-4 rounded-[2rem] max-w-[80%] text-white",
          isSelf ? "bg-[#3a3939]" : "bg-primary text-secondaryBg"
        )}
      >
        {text}
      </div>
    </div>
  );
};

const MessagesContainer = () => {
  return (
    <div className="min-h-full py-9 w-full overflow-y-auto">
      <div className="space-y-4"></div>
    </div>
  );
};

export default MessagesContainer;
