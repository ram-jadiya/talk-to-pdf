import * as React from "react";
import { cn } from "../../utils/className";

interface IconInput extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
  iconClassName?: string;
  preIcon?: boolean;
}

export const IconInput = React.forwardRef<HTMLInputElement, IconInput>(
  (
    { className, type, name, Icon, iconClassName, preIcon = true, ...props },
    ref
  ) => {
    return (
      <div className="relative text-grey ">
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            preIcon ? "left-5" : "right-[10px]"
          )}
        >
          <Icon className={iconClassName} />
        </div>
        <input
          className={cn(
            "h-[46px] bg-white/5 placeholder-grey leading-[26px] border-none outline-none rounded-full",
            preIcon ? "pl-[50px] pr-5 py-[13px]" : "px-5 py-3",
            className
          )}
          type={type}
          ref={ref}
          name={name}
          placeholder="Email"
          {...props}
        />
      </div>
    );
  }
);

IconInput.displayName = "PreIconInput";
