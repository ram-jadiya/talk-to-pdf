import * as React from "react";
import { cn } from "../../utils/className";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, name, ...props }, ref) => {
  return (
    <input
      className={cn(
        "h-[52px] placeholder-grey bg-white/5 text-[#7B7874] leading-[26px] outline-none rounded-full px-5 py-[13px]",
        className
      )}
      type={type}
      ref={ref}
      name={name}
      placeholder="Email"
      autoComplete="off"
      {...props}
    />
  );
});

Input.displayName = "Input";
