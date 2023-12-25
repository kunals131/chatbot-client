import React, { useEffect } from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { verifyAuth } from "./RootLayout.api";
import { useRouter } from "next/router";
import useAppStore from "@/store";
import { ROUTES } from "@/utils/constants";
import { Toaster } from "react-hot-toast";
import { AxiosError } from "axios";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);
  const token = useAppStore((state) => state.authData?.token);

  const { mutate } = useMutation({
    mutationFn: verifyAuth,
    onError: (error: AxiosError) => {
      logout();
      console.log(error.message);
      if (
        error.code === "401" ||
        error.message.includes("Could not validate credentials")
      ) {
        router.push(ROUTES.AUTH);
      }
    },
    onSuccess: () => {
      if (router.pathname === ROUTES.AUTH) {
        router.push(ROUTES.CHAT);
      }
    },
  });

  useEffect(() => {
    if (token) {
      mutate();
    } else {
      router.push(ROUTES.AUTH);
    }
  }, []);

  return (
    <div
      className={cn(
        "min-h-screen w-full text-white bg-primaryBg font-sans",
        fontSans.variable
      )}
    >
      {children}
      <Toaster position="top-center" />
    </div>
  );
};

export default RootLayout;
