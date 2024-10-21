"use client";

import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import clsx from "clsx";
import { Circle } from "lucide-react";
import * as React from "react";
import { FormLabel } from "./form";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string;
    children?: React.ReactNode;
  }
>(({ className, label, children, ...props }, ref) => {
  return (
    <div
      className={clsx(
        "flex items-center space-x-3 space-y-0 border p-3 rounded-sm hover:dark:text-black w-full",
        {
          ["border-black dark:border-[#C4C9D0]"]: props?.checked === true,
          ["border-[#C4C9D0] text-[#555555]"]: props?.checked === false,
        },
        "hover:bg-[#F1F5F9]",
      )}>
      <div className="flex items-center space-x-3 ">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            "aspect-square h-4 w-4 rounded-full border-2 border-solid size-5  border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
            clsx("", {
              ["border-black dark:border-[#C4C9D0]"]: props?.checked === true,
              ["border-[#C4C9D0]"]: props?.checked === false,
            }),
          )}
          {...props}>
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center ">
            <Circle className="h-2.5 w-2.5 fill-current text-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>

        <FormLabel className="font-normal text-nowrap">{label}</FormLabel>

        <div>{children}</div>
      </div>
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
