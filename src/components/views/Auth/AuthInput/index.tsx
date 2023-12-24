import { cn } from "@/lib/utils";
import React from "react";

const AuthInput = ({
  label,
  error,
  helperText,
  className,
  ...props
}: AuthInputProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm text-white/70">{label}</label>
      <input
        {...props}
        className={cn(
          "py-3 px-3 placeholder:text-white/20 mt-1 w-full rounded-md  bg-secondaryBgElevated",
          error && "border border-red-500",
          className
        )}
      />
      {error && (
        <div className="text-red-300 mt-[5px] italic text-xs">{error}</div>
      )}
    </div>
  );
};

type AuthInputProps = {
  label: string;
  error?: string;
  helperText?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default AuthInput;
