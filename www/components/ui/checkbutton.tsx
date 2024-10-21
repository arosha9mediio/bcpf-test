"use client";

import * as CheckboxPrimitives from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type CheckButtonProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
};

const Checkbutton = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitives.Root>,
  CheckButtonProps
>(({ checked, onChange, className, ...props }, ref) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <CheckboxPrimitives.Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "",
      )}
      {...props}
      ref={ref}
      checked={checked}
      onCheckedChange={handleChange}>
      <CheckboxPrimitives.Indicator
        className={cn("flex items-center justify-center text-current")}>
        {checked && <Check className="h-4 w-4" />}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
});

Checkbutton.displayName = CheckboxPrimitives.Root.displayName;

export { Checkbutton };
