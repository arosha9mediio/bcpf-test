import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "underline";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const defaultClass =
      "flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-slate-500 hover:border-slate-500 focus-visible:border-2 dark:border-slate-500 dark:focus-visible:border-slate-300 dark:hover:border-slate-300 dark:focus-visible:border-2";
    const underlineClass =
      "flex min-h-[80px] w-full border-b border-gray-400 bg-transparent px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-black focus-visible:border-b-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-500 dark:focus-visible:border-white dark:focus-visible:border-b-2";

    return (
      <textarea
        className={cn(
          variant === "underline" ? underlineClass : defaultClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
