import React from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Sidebar from "../common/Sidebar";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn("min-h-screen w-full flex bg-primaryBg font-sans", fontSans.variable)}
    >
      <Sidebar />
      <div className="pl-[120px] w-full">{children}</div>
    </div>
  );
};

export default BaseLayout;
