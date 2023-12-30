import React from "react";
import { ChatTeardropText, Rows, Database } from "@phosphor-icons/react";
import { RiLogoutCircleLine } from "react-icons/ri";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import useAppStore from "@/store";

const SidebarIcon = ({
  icon,
  label,
  active,
  customClass,
  onClick = () => {},
}: {
  icon: any;
  label: string;
  active?: boolean;
  customClass?: string;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick} className="flex flex-col items-center">
      <div
        className={cn(
          "h-[54px] w-[54px] cursor-pointer hover:scale-105 transition-all hover:bg-secondaryBg hover:bg-opacity-50 hover:text-white text-black text-xl rounded-full flex items-center justify-center",
          active && "bg-secondaryBg text-white",
          customClass
        )}
      >
        {icon}
      </div>
      {label && <div className="text-sm mt-2 text-secondaryBg">{label}</div>}
    </div>
  );
};

const Sidebar = () => {
  const logout = useAppStore((state) => state.logout);
  return (
    <div className="px-8 fixed top-0 left-0 h-[100vh] pt-16 w-[120px] rounded-l-xl bg-primary py-3">
      <div className="flex flex-col space-y-8 items-center">
        <SidebarIcon
          active
          icon={<ChatTeardropText size={27} />}
          label={"Chat"}
        />
        <SidebarIcon icon={<Rows size={27} />} label={"Shortlisted"} />
        <SidebarIcon icon={<Database size={27} />} label={"SQL DB"} />
      </div>
      <div className="absolute bottom-9 w-full  left-0 flex items-center justify-center">
        <div className="text-red-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SidebarIcon
                  onClick={logout}
                  customClass="hover:bg-red-200 hover:text-red-700 "
                  icon={<RiLogoutCircleLine size={25} />}
                  label={""}
                />
              </TooltipTrigger>
              <TooltipContent
                side="left"
                sideOffset={3}
                className="bg-red-500 text-white"
              >
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
