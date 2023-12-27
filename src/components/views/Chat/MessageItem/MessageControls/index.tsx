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
import { readJson } from "../../Chat.helpers";

const MessageControlItem = ({
  Icon,
  label,
  onClick,
}: {
  Icon: any;
  label: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex hover:underline opacity-50 cursor-pointer hover:opacity-100 items-center gap-1"
    >
      <div className="text-xs">
        <Icon />
      </div>
      <div className="text-white text-xs">{label}</div>
    </div>
  );
};

const ContextDialog = ({ data }: { data?: ChatMessage }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MessageControlItem Icon={BsFileEarmarkText} label="context" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Context</DialogTitle>
          <DialogDescription>Metadata used to fetch results</DialogDescription>
        </DialogHeader>
        <div className="w-full text-gray-200 bg-secondaryBg p-2 h-[250px] mt-2 rounded-lg">
          <pre className={`max-h-[250px] h-full overflow-auto p-4 text-left rounded-lg`}>
            <code>
              {readJson({
                entities: data?.entities,
                intent: data?.intent,
              })}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const MessageControls = ({ data }: { data?: ChatMessage }) => {
  return (
    <div className="flex h-3 items-center space-x-3">
      <ContextDialog data={data} />
      <Separator orientation="vertical" />
      <MessageControlItem Icon={LuDownloadCloud} label="list suggestions" />
    </div>
  );
};

export default MessageControls;
