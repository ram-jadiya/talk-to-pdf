import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../utils/className";

const buttonVariants = cva(
  "inline-flex items-center gap-2 justify-center whitespace-nowrap text-base text-white rounded-full font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary",
        ghost: "bg-white/5",
      },
      size: {
        default: "h-[52px] px-5 py-[13px]",
        sm: "h-[42px] px-8 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
