import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  borderBottom?: boolean;
  variant?: "default" | "outline";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      borderBottom = true,
      variant = "default",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [hasValue, setHasValue] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(event.target.value !== "");
      if (props.onChange) props.onChange(event);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const baseClasses =
      "flex h-10 w-full bg-background px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

    const defaultClasses = borderBottom
      ? `border-b ${isFocused ? "border-b-2 border-black dark:border-white" : "border-b border-gray-400"}`
      : "rounded-md border border-input";

    const outlineClasses =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-slate-500 hover:border-slate-500 focus-visible:border-2 dark:border-slate-500 dark:hover:border-slate-300 dark:focus-visible:border-slate-300 dark:focus-visible:border-2";

    return (
      <input
        type={type}
        className={cn(
          baseClasses,
          variant === "outline" ? outlineClasses : defaultClasses,
          className,
        )}
        ref={ref}
        {...props}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  },
);

Input.displayName = "Input";

export { Input };
