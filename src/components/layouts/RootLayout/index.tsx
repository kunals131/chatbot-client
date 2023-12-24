import React from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { verifyAuth } from "./RootLayout.api";
import { useRouter } from "next/router";
import useAppStore from "@/store";
import { ROUTES } from "@/utils/constants";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["auth"],
    queryFn: verifyAuth,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 30 * 60 * 1000,
    enabled: router.pathname !== ROUTES.AUTH,
  });

  if (isError) {
    logout();
    router.push(ROUTES.AUTH);
  }

  if (data && !isError && !isLoading) {
    if (router.pathname === ROUTES.AUTH) {
      router.push(ROUTES.CHAT);
    }
  }

  return (
    <div
      className={cn(
        "min-h-screen w-full text-white bg-primaryBg font-sans",
        fontSans.variable
      )}
    >
      {children}
    </div>
  );
};

export default RootLayout;
